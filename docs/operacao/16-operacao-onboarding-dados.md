# 16 — Operação: Onboarding, Base de Conhecimento, Continuidade e Ciclo de Dados

> Fecha a base de planejamento com os pontos operacionais que faltavam: como a oficina entra (dia zero), como o sistema aprende e constrói uma base técnica proprietária, backup e continuidade, ciclo de vida dos dados (LGPD/cancelamento) e a métrica de sucesso do piloto.

---

## 1. Onboarding — o "dia zero" da oficina

Objetivo: a oficina precisa estar operando em **menos de 1 hora**, com o mínimo de trabalho manual. Se a implantação for difícil, o fundador vira consultor de graça em cada cliente (não escala).

### Fluxo de onboarding (assistido pelo sistema, não pelo fundador)

```
1. Criar conta da oficina (tenant) → dados básicos, CNPJ, logo
2. Importar clientes e veículos via PLANILHA
   - Template padrão para download (colunas fixas: nome, telefone, placa, modelo, ano...)
   - Upload → validação → preview → confirma
   - O que não vier na planilha, a API de placa completa depois (no 1º atendimento)
3. Conectar o WhatsApp (parear a instância Evolution GO)
   - QR code na tela → oficina escaneia com o celular do número dela
   - Aquecimento automático do número (anti-ban)
4. Cadastrar serviços e preços
   - Lista de serviços comuns pré-preenchida (troca de óleo, revisão, freios...)
   - Oficina ajusta preços e mão de obra
   - Alimenta a base técnica (ver seção 2)
5. Configurar os agentes (dentro de trilhos — doc 15)
   - Nome, tom, horário, política, mensagens-padrão
6. Pronto — primeiro atendimento pode começar
```

### Decisões

- **Importação por planilha é o caminho** (confirmado). Template único, validação clara, preview antes de gravar. Nunca prometer migração completa de sistema legado (zona vermelha, doc 12) — só importador de planilha.
- **Onboarding self-service** com wizard passo a passo (inspiração Tekion Pay: "ativo em menos de 1h"). O fundador acompanha os primeiros por telefone/presencial (são fundadores, doc 10), mas o fluxo é desenhado para não depender dele.
- **Migração assistida** (fundador importa pra oficina) só nos fundadores e como diferencial de venda — não como promessa padrão.

---

## 2. Base de Conhecimento Técnico — o ativo que o sistema aprende sozinho

Este é um ativo estratégico, não só uma feature. Responde à pergunta "como o sistema sabe que carro A usa X litros de óleo e carro B usa filtro Y".

### Distinção fundamental (para o Claude Code não confundir)

| Conceito | O que é | Natureza | Quem alimenta |
|---|---|---|---|
| **Skill** (doc 15) | O que o agente É (papel, regras, ferramentas) | Fixo, declarativo (MD/YAML) | Você (UnioTorq) |
| **Base de Conhecimento** | O que o agente SABE (fatos técnicos, padrões) | Dinâmico, cresce com o uso | A operação (todas as oficinas) |

O agente lê a **skill** para saber *como agir* e consulta a **base** para saber *os fatos*.

### As três fontes da base técnica (em ordem de construção)

**1. Seed inicial (manual/importado):**
```
Tabela: especificacao_veiculo
  fabricante × modelo × motor × ano →
    tipo de óleo (SAE/API), litragem, filtro de óleo, filtro de ar,
    filtro de cabine, pastilha, tempo padrão de mão de obra por serviço
```
Popular primeiro os veículos mais comuns da região (os que mais entram). Dado estático — não muda com frequência. Pode começar pequeno.

**2. Aprendizado pela operação (o diferencial defensável):**
- Cada OS registrada ensina a base. Mecânico lança "Compass 1.3T → 4,5L 5W30 + filtro X" → vira conhecimento estruturado.
- Com dezenas de oficinas e milhares de OS, a base fica **mais precisa que qualquer app de catálogo** — porque é dado real de execução, não teoria.
- **Efeito de rede / barreira de entrada:** quanto mais oficinas usam, mais inteligente a base fica. Concorrente novo começa do zero; você já tem milhares de OS ensinando o sistema. (Mesmo princípio que fez a Cilia valer R$ 110 mi com dados de sinistro — aqui aplicado a manutenção.)
- Requer curadoria/validação: dado agregado de várias oficinas, com confiança crescente conforme repete. Nunca expor dado de uma oficina para outra (só o conhecimento técnico agregado e anonimizado).

**3. Complemento externo (parceria futura, Fase 3):**
- Catálogos de fabricantes (ex.: Tecfil busca filtro por placa), tempários (Sindirepa) preenchem o que a base ainda não aprendeu.

### Como isso vira o Agente Técnico (Fase 3)

```
Placa → veículo (API de placa) → consulta base de conhecimento →
  devolve: óleo + litragem + filtros compatíveis + tempo padrão →
  Agente Técnico apresenta no balcão / dentro da OS
```

### O insight maior: o sistema como organismo que aprende

O sistema não é só ferramenta — aprende com o uso. Isso abre caminho para **novos agentes nascerem dos padrões que a base revela**:
- Base revela que 80% das oficinas cobram ~X por um serviço → nasce um **Agente de Precificação Sugerida**
- Base revela padrões de falha por modelo/KM → **Agente de Diagnóstico Assistido**
- Base revela sazonalidade → **Agente de Marketing Sazonal**

Isso alimenta o roadmap de add-ons de agentes (doc 05/11): novos agentes não são adivinhação, nascem do dado real. Registrar como direção estratégica, executar só quando a base tiver massa suficiente (não antes — não vira feature sem dado que a sustente).

### Formato: como os agentes leem conhecimento

O mercado organiza agentes com arquivos (markdown/YAML) para a **skill**. Para o **conhecimento**, a base é consultada como dado estruturado (tabelas/consultas), não como documento lido a cada vez — mais rápido, mais barato, cacheável. A IA pode gerar/atualizar resumos de conhecimento, mas a fonte de verdade é a base estruturada, não um arquivo solto.

---

## 3. Backup e Continuidade (missão crítica)

Oficina é operação de missão crítica: sistema fora do ar na manhã de sábado com carros no pátio = cancelamento na segunda.

```
Backup:
  - PostgreSQL: backup diário automático + retenção de 30 dias
  - Teste de restore MENSAL (backup não testado não é backup)
  - Fotos (R2): já redundante no Cloudflare
  - Config/skills: versionadas em git

Continuidade:
  - Modo degradado: se um serviço cair (ex.: IA ou WhatsApp),
    o núcleo continua — ver lista de OS, abrir/editar atendimento,
    imprimir OS. Agentes e notificações podem ficar indisponíveis
    temporariamente sem travar a operação.
  - Monitoramento + alerta (uptime, erro, fila travada)
  - Status page simples para os clientes
  - Deploy NUNCA sexta à noite/sábado (janela de pico da oficina)
  - Snapshot da VPS antes de cada deploy grande + plano de rollback
```

Requisito não-funcional nº 1 (doc 06): **uptime no sábado de manhã** — é critério de compra citado pelo próprio mercado.

---

## 4. Ciclo de vida dos dados e LGPD

O UnioTorq guarda dado pessoal de cliente final (nome, telefone, veículo, histórico) de várias oficinas. Precisa de tratamento correto desde o início — é risco jurídico e argumento de venda ("seus dados são seus").

### Durante o uso
- Consentimento no primeiro contato via WhatsApp (opt-in) + opt-out simples
- Minimização: só o dado necessário para o serviço
- Dado sensível nunca vai para modelo de IA sem mascaramento (nome/telefone → IDs internos)
- Logs de acesso; DPA com fornecedores (IA, fiscal, pagamento)
- Fotos do Painel do Cliente sempre anonimizadas (doc 12)

### Papéis (importante para a LGPD)
- A **oficina** é a controladora dos dados dos clientes dela; o **UnioTorq** é operador. O contrato de assinatura (doc 08/09) precisa deixar isso claro.

### Quando o cliente (oficina) cancela
```
- Exportação: a oficina pode exportar os próprios dados (clientes, veículos,
  histórico) em formato aberto — "seus dados são seus"
- Retenção: dados mantidos por período definido (ex.: 60 dias) após cancelamento,
  depois anonimizados/excluídos
- Base de conhecimento técnico agregada e anonimizada permanece (não é dado
  pessoal — é conhecimento de manutenção sem identificação de cliente)
```

### Direito do cliente final
- Solicitação de exclusão/acesso encaminhada via oficina (controladora), atendida pelo sistema.

---

## 5. Suporte

- No início, o fundador é o suporte — mas com canal definido desde o 1º cliente pagante.
- Canal: WhatsApp próprio do UnioTorq + base de ajuda simples (FAQ/vídeos curtos).
- Onboarding self-service (seção 1) reduz volume de suporte.
- SLA informal no piloto: resposta rápida em horário comercial + cobertura de sábado de manhã (pico).

---

## 6. Métrica de sucesso do piloto (o que faltava definir)

O gate comercial (doc 09) é "3–5 pré-vendas pagas". Faltava o **sucesso técnico/de produto** — sem isso, não se sabe se pode escalar.

### Critérios de sucesso do piloto (60 dias)

| Dimensão | Métrica | Meta |
|---|---|---|
| Adoção | Dono/consultor usa o sistema | Todos os dias úteis |
| Fluxo completo | OS que percorrem carro→foto→link→aprovação sem papel | ≥ 70% das OS |
| Agente Recepcionista | Conversas resolvidas sem intervenção humana | ≥ 50% |
| Aprovação digital | Orçamentos aprovados pelo link (vs. verbal) | ≥ 40% |
| Serviços recusados | Recusas registradas e reativadas | pelo menos 1 reativação/mês |
| Retenção | Churn dos fundadores no período | 0 |
| Percepção | Consultor diria "não quero voltar ao antigo"? | Sim (qualitativo) |

**Decisão de escala:** só replicar para novos clientes quando a maioria dessas metas for atingida em pelo menos 2 das oficinas fundadoras. Se não, ajustar produto antes de vender mais (não escalar problema).

---

## 7. Pendências que dependem só do Leo (não são de código)

Registradas para não se perderem:

1. **Contrato Accellog** — ler cláusulas de PI, exclusividade e não-concorrência **antes da primeira linha de código**. Item mais barato e mais importante em aberto (doc 08, risco 7).
2. **Propriedade do código gerado por IA** — confirmar nos termos de uso do Claude Code/Codex que o código é seu, sem pegadinha de licença.
3. **INPI + domínio + Instagram** do UnioTorq (doc 14) — uniotorq.com.br já verificado; falta protocolar INPI (classes 9 e 42) e registrar @uniotorq.
