# 15 — Arquitetura de IA, Módulo Admin e Agentes como Skills

> Como o UnioTorq controla o uso de IA, gerencia assinaturas e define agentes. Alimenta o CLAUDE-CODE-GUIDE. Princípio-mestre: **o usuário nunca toca na IA diretamente — o sistema comanda tudo.**

---

## 1. Princípio de controle: o sistema comanda a IA, nunca o usuário

O cliente jamais acessa API key, escolhe modelo ou fala direto com o LLM. Ele usa **funcionalidades** ("gerar orçamento", "perguntar ao Gestor"), nunca "a IA".

```
Usuário → Backend (NestJS) → Orquestrador de IA → Modelo → Backend → Usuário
```

Isso garante: controle total de custo, segurança (chave nunca exposta), e troca de modelo sem o cliente perceber.

**Regra absoluta:** nenhuma API key de IA vive no frontend. Toda chamada de modelo passa pelo backend, que aplica cota, registra uso e escolhe o modelo.

---

## 2. Controle de consumo: cotas por plano, medidas em ações (não em tokens)

O cliente nunca vê "tokens". Vê **ações** que entende. Internamente o sistema mede tokens e converte.

| Plano | Recepcionista | Consultor | Gestor | Retenção |
|---|---|---|---|---|
| Essencial | 500 conversas/mês | 100 orçamentos/mês | — | — |
| Profissional | 1.500 conversas | 300 orçamentos | 200 perguntas | incluído |
| Performance | fair use* | fair use* | fair use* | fair use* |

*fair use = teto técnico invisível para conter abuso, sem número exposto ao cliente.

**Comportamento ao aproximar do limite:**
- 80% → aviso no app ("você usou 80% das conversas do agente este mês")
- 100% → agente pausa a função OU oferece upgrade (nunca falha silenciosa)
- Vira gatilho de venda de upgrade, além de proteger a margem

**Medição interna (cada chamada registra):**
```
uso_ia { tenantId, agente, modelo, tokensIn, tokensOut,
         custoEstimado, acaoEquivalente, timestamp }
```
Isso alimenta o painel de custo do admin e a régua de cota do cliente.

---

## 3. Módulo Admin (seu posto de comando — construir junto com o core)

Justificativa de construir cedo: sem ele, gerenciar cliente/cota/modelo vira edição manual no banco. Assinatura e limite de IA são o mesmo assunto (o plano define o que a IA pode fazer), então construir junto evita retrabalho.

### 3a. Gestão de IA

```
Config de modelo por agente (dropdown editável no front):
  Recepcionista → [MiniMax M3 ▼]
  Consultor     → [MiniMax M3 ▼]
  Mecânico      → [DeepSeek Flash ▼]
  Gestor        → [Claude Sonnet ▼]   ← trocar por Kimi = 1 clique

Chaves de API por provedor (criptografadas no banco, nunca no front)
Painel de custo em tempo real: custo por oficina, por agente, por modelo
Alertas de custo: "oficina X passou de R$ 80 de IA no mês"
Fallback: se o modelo primário falhar, cai para o secundário automaticamente
```

**Como a troca de modelo é simples (o que você pediu):** a camada de provider é abstraída em formato **OpenAI-compatible**. DeepSeek, Kimi, GLM, MiniMax, OpenAI e outros aceitam esse formato. Trocar de modelo = editar dois campos no banco (`base_url` + `api_key`) + nome do modelo. O dropdown do admin edita exatamente esses campos. **Zero refatoração de código.**

```typescript
// modelo_config (por agente ou por tarefa)
ModeloConfig {
  id, escopo,          // 'agente:consultor' | 'tarefa:classificacao'
  provider,            // 'minimax' | 'kimi' | 'claude' | 'deepseek'
  baseUrl,             // https://api.provider.com/v1
  apiKeyRef,           // referência à chave criptografada (nunca a chave crua)
  modelName,           // 'minimax-m3' | 'kimi-k2' ...
  fallbackId,          // modelo reserva se este falhar
  ativo
}
```

### 3b. Gestão de assinaturas

```
Lista de oficinas: plano, status (trial/ativo/inadimplente/cancelado), MRR
Webhook Asaas: pagou → libera; não pagou → régua de cobrança automática
Ligar/desligar agentes add-on por cliente
Uso vs. limite de cada oficina (cota de IA consumida)
Métricas do negócio: MRR total, churn, uso de IA agregado, custo vs. receita por cliente
```

### 3c. Gestão de skills de agente

```
Editor de skills (ver seção 4): criar/editar/versionar agentes sem deploy
Ativar/desativar skill globalmente ou por plano
Testar skill em sandbox antes de publicar
```

---

## 4. Agentes como Skills (definição declarativa, não código)

**Decisão:** agentes são **arquivos de definição** que a IA lê, não código hardcoded. Alinhado com o padrão de mercado (Claude Skills, OpenAI Assistants). Criar/ajustar agente = escrever/editar uma skill, sem deploy.

### Estrutura de uma skill

```yaml
# skill: agente-consultor.yaml
id: consultor
nome_padrao: Consultor
objetivo: Transformar inspeção bruta em recomendação que o cliente entende
persona_base: Técnico confiável, explica sem jargão, foca na segurança
ferramentas:            # o que o agente PODE fazer (tools sobre dados do sistema)
  - ler_checklist
  - buscar_fotos
  - montar_orcamento
  - anexar_ao_link_aprovacao
  - consultar_servicos_recusados
regras:
  - Nunca dar preço final sem o consultor humano revisar
  - Sempre anexar foto quando o item for crítico
  - Reofertar serviços recusados quando fizer sentido
guardrails:             # limites rígidos, NÃO editáveis pelo cliente
  - Não prometer prazo
  - Não dar diagnóstico que gere responsabilidade legal
  - Escalar para humano se o cliente reclamar
  - Nunca inventar dado — usar só o contexto fornecido
modelo: minimax-m3      # editável no admin (seção 3a)
custo_por_acao: 1       # unidade de cota consumida
```

### Como o agente executa

```
1. Sistema carrega a skill (definição) + os dados do atendimento (contexto)
2. Monta o prompt: persona + regras + guardrails + ferramentas + contexto
3. Chama o modelo configurado (via camada abstraída)
4. Modelo decide qual ferramenta usar → backend executa a ferramenta
5. Resultado volta, registrado na Timeline do Atendimento
6. Uso de tokens contabilizado na cota do cliente
```

**Vantagens:** versionamento de skills, ajuste sem deploy, novo agente = novo arquivo, teste em sandbox. Toda ação vira evento na Timeline (transparência).

**Refinamento ([ADR-002](adr/ADR-002-memoria-viva.md)):** as skills são **stateless** — não guardam memória. Todo conhecimento (histórico, peças por veículo, recusas, preferências) vive na **Memória Viva** compartilhada; a skill apenas a consulta. Um novo especialista (ex.: Fiscal) nasce "inteligente" sem treino, porque lê o mesmo núcleo. *A Memória Viva aprende; os agentes não.*

---

## 5. Customização pelo cliente — dentro de trilhos (nunca o motor)

O cliente sente que personaliza, mas nunca reescreve comportamento. É a diferença entre "escolher o nome e o tom do funcionário" e "reescrever o contrato de trabalho dele".

### ✅ O cliente PODE configurar (seguro, agrega valor)

```
- Nome do agente ("Zé", "Recepção AutocenterX")
- Tom dentro de opções pré-definidas (formal / neutro / informal)
- Dados do negócio: horário, serviços, política de tolerância, formas de pagamento
- Mensagens-padrão: saudação, assinatura, mensagem de fora do horário
- Ligar/desligar agentes que ele assina
```

### ❌ O cliente NÃO pode (perigoso — protege você)

```
- Reescrever regras ou guardrails do agente
- Mudar o que o agente pode/não pode fazer (ferramentas)
- Editar o prompt de sistema livremente
- Fazer o agente prometer prazo, desconto ou diagnóstico técnico
```

**Por quê:** se o cliente reescreve persona/regras, o agente pode prometer o que não deve, vazar dado ou dar diagnóstico que gera responsabilidade — e a culpa recai no UnioTorq ("o sistema disse que..."). Referência: Tekion/ServiceTitan entregam o agente pronto; o cliente configura parâmetros, não reprograma comportamento.

### Modelo técnico da customização

```typescript
// O cliente edita só a camada de config, nunca a skill
AgenteConfig {                    // por tenant
  tenantId, skillId,
  nomeCustomizado,                // "Zé"
  tom,                            // enum: FORMAL | NEUTRO | INFORMAL
  saudacao, assinatura,
  dadosNegocio: { horario, servicos, tolerancia, pagamentos },
  ativo
}
// A skill (regras/guardrails/ferramentas) permanece imutável para o cliente.
// O prompt final = skill (fixa) + AgenteConfig (editável) + contexto do atendimento
```

---

## 6. Resumo das decisões (para o Claude Code)

1. **IA sempre via backend** — usuário nunca acessa API/modelo direto.
2. **Cotas por plano em "ações"**, não tokens; aviso em 80%, upgrade em 100%.
3. **Módulo Admin construído junto com o core** — gestão de IA + assinaturas + skills num só posto de comando.
4. **Troca de modelo = editar config no banco** (provider OpenAI-compatible abstraído); dropdown no admin, zero refatoração.
5. **Agentes são skills declarativas** (YAML/JSON), lidas pela IA — não código hardcoded.
6. **Cliente customiza dentro de trilhos** (nome, tom, dados, mensagens); nunca regras, guardrails ou ferramentas.
7. **Todo uso de IA é medido e registrado** (custo por tenant/agente/modelo) + toda ação de agente vira evento na Timeline.
