# UnioTorq — Guia de Desenvolvimento para o Claude Code

> **Este documento é o ponto de partida para o Claude Code.** Cole-o inteiro no início de cada sessão de desenvolvimento. Ele contém tudo que foi decidido nas conversas de planejamento — não reinvente o que já foi resolvido aqui.

---

## 1. Contexto do produto

**Nome do produto:** UnioTorq
**Empresa:** Unio AuraTech
**Domínio:** uniotorq.com.br
**Instagram:** @uniotorq

**O que é:** Sistema Operacional para Pós-Venda Automotivo (DMS — Dealer Management System) focado em oficinas mecânicas independentes e centros automotivos de pequeno/médio porte no Brasil. Inspirado em Tekion, Tekmetric e Shop-Ware dos EUA — mas nichado, acessível e com agentes de IA embutidos.

**Conceito central — o Atendimento soberano:** toda a operação gira em torno de uma única entidade chamada Atendimento. O cliente nunca navega entre módulos. Tudo (checklist, OS, orçamento, aprovação, histórico, CRM, WhatsApp) vive dentro do Atendimento.

**Diferencial principal:** foto da inspeção vira orçamento, orçamento vira aprovação no WhatsApp, e uma equipe de agentes de IA faz o pós-venda sozinha. Nenhum concorrente nacional entrega isso hoje (jul/2026).

**Posicionamento em uma frase:**
> "O único sistema de oficina brasileiro onde a inspeção com foto vira orçamento, o orçamento vira aprovação no WhatsApp, e uma equipe de funcionários digitais faz o pós-venda sozinha."

---

## 2. Stack técnica (não alterar sem justificativa de produção)

```
Frontend:     React + Next.js + TypeScript + TailwindCSS + Shadcn UI + TanStack Query
Backend:      NestJS + Fastify + Prisma ORM
Banco:        PostgreSQL
Cache:        Redis
Filas:        Bull Queue (agentes + jobs assíncronos)
Cron:         @nestjs/schedule (lembretes, retenção, resumo diário)
Tempo real:   WebSockets (Kanban e Painel TV ao vivo)
Storage:      Cloudflare R2 (fotos, PDFs, assinaturas)
WhatsApp:     Evolution API GO (versão em Go, não Node.js) — ~5x menos RAM por
              instância; instância própria por oficina; anti-ban mantido
Infra:        Cloudflare Pages (front) + VPS InterServer 4 Slices via Coolify (back)
Pagamentos:   Asaas (recorrência SaaS + Pix no link de aprovação)
Fiscal:       Focus NFe ou PlugNotas (NFS-e + NF-e + NFC-e)
API de placa: Consulta por placa → preenche veículo automaticamente (cachear no Redis)
IA:           Roteamento de modelos — Gemini free tier (piloto) → em produção:
              DeepSeek Flash (simples) + MiniMax M3 (conversa) + Claude Sonnet (Gestor).
              Camada de provider abstraída (OpenAI-compatible) p/ trocar sem refatorar.
```

**Sobre n8n:** removido da stack fixa. Automações (crons, webhooks, filas, integrações) são resolvidas nativamente em NestJS, já que o desenvolvimento é feito por IA (Claude Code / Codex) — não há dev de negócio montando fluxos visuais. Se durante o desenvolvimento surgir um caso real que o justifique, o Claude Code decide e adiciona pontualmente. Não é dependência de partida.

**Multi-tenant desde o dia 1:** `tenant_id` em todas as tabelas, Row Level Security no Postgres. Cada oficina tem sua instância Evolution GO isolada.

**VPS (custo):** InterServer 4 Slices ($12/mês ≈ R$ 62 — 2 cores, 8GB RAM, 160GB, sem fidelidade) roda Unio Escala + UnioTorq juntos no piloto. Migração para HostGator NVMe 8 (Brasil, menor latência) só após os gates do doc 04. Evitar planos com fidelidade de 3 anos antes de validar.

---

## 3. Design system — UnioTorq (aplicar em todo o código)

### Tokens de cor (valores exatos — não usar defaults do Tailwind)

```css
--bg:       #F7F7F5   /* fundo da aplicação */
--surface:  #FFFFFF   /* cards e painéis */
--border:   #E4E4E0   /* bordas padrão */
--border2:  #D6D6D0   /* bordas mais fortes */
--ink:      #1A1D21   /* texto principal */
--ink2:     #5C6068   /* texto secundário */
--ink3:     #8A8E96   /* texto terciário / labels */

--roxo:     #5433B8   /* cor primária UnioTorq — usar só em ações primárias e nav ativa */
--roxo-h:   #472CA0   /* hover do roxo */
--roxo-t:   #EFEAFB   /* fundo tint roxo */

--ok:       #1F7A4D   /* verde — conforme, entregue, aprovado */
--ok-t:     #E7F3ED
--warn:     #B26A0F   /* âmbar — atenção operacional (aguardando, peça atrasada) */
--warn-t:   #FBF1E2
--crit:     #C0362C   /* vermelho — EXCLUSIVO para risco ao cliente ou prazo */
--crit-t:   #FAEAE8

--side:     #17161D   /* sidebar */
--side2:    #211F2B   /* sidebar hover */
```

**Regra de semântica de cor (nunca quebrar):**
- Vermelho (`--crit`) = risco a cliente ou prazo (crítico, atraso de entrega)
- Âmbar (`--warn`) = atenção operacional (aguardando aprovação, peça, workload alto)
- Verde (`--ok`) = conforme, dentro do prazo, aprovado
- Nunca usar vermelho e âmbar para o mesmo tipo de informação

### Tipografia

```css
font-family: 'IBM Plex Sans', sans-serif;   /* toda a interface */
font-family: 'IBM Plex Mono', monospace;    /* EXCLUSIVO para dados técnicos:
                                               placa, número de OS, KM,
                                               horários, valores em R$ */
```

### Bordas e sombras

```css
border-radius: 8px;   /* cards */
border-radius: 6px;   /* botões e inputs */
border-radius: 4px;   /* chip de placa */

/* Sombra apenas em elementos flutuantes (modais, drawers, dropdowns) */
box-shadow: 0 4px 16px rgba(26,29,33,.10);

/* Cards usam borda hairline, não sombra */
border: 1px solid #E4E4E0;
```

### Proibido (o que não fazer)

- ❌ Gradientes em botões ou cards (só no logo)
- ❌ Sombras difusas grandes em cards comuns
- ❌ Cantos arredondados acima de 8px
- ❌ Emojis como ícones decorativos na interface principal
- ❌ Glassmorphism ou blur
- ❌ Inter, serifada ou qualquer outra fonte (só IBM Plex)
- ❌ Cores padrão do Tailwind (usar os tokens acima)
- ❌ Espaçamento arejado demais — é Calm Design, alta densidade

### Elemento-assinatura: chip de placa

```html
<!-- Este componente aparece em TODOS os cards, listas e cabeçalhos -->
<span class="placa">ABC-1234</span>
<span class="placa">ABC1D23</span>  <!-- Mercosul -->
```

```css
.placa {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: .06em;
  text-transform: uppercase;
  background: #FFFFFF;
  border: 1px solid #D6D6D0;
  box-shadow: inset 0 0 0 2px #FFFFFF, inset 0 0 0 3px #E4E4E0;
  border-radius: 4px;
  padding: 2px 7px;
  display: inline-block;
}
```

### Badges de status

```css
/* Padrão base */
.badge { font-size: 10px; font-weight: 700; padding: 2px 8px;
         border-radius: 99px; letter-spacing: .02em; }

.badge-crit  { background: #FAEAE8; color: #C0362C; }
.badge-warn  { background: #FBF1E2; color: #B26A0F; }
.badge-ok    { background: #E7F3ED; color: #1F7A4D; }
.badge-roxo  { background: #EFEAFB; color: #5433B8; }
.badge-neut  { background: #EEEEEA; color: #5C6068; }
```

---

## 4. Estrutura de navegação (sidebar)

```
OPERAÇÃO
  ├── Kanban          ← tela principal, coração do sistema
  ├── Atendimentos    ← hub split-view (lista + detalhe)
  └── Conversas       ← WhatsApp da oficina centralizado (badge com não-lidas)

EQUIPE DIGITAL
  └── Agentes         ← portfólio de agentes de IA com on/off e métricas

GESTÃO
  ├── Dashboard       ← visão executiva com drill-down
  ├── Painel TV       ← modo escuro, chão de fábrica (equipe)
  └── Painel Cliente  ← TV da recepção (acompanhamento + slide de fotos)

CADASTROS
  ├── Clientes
  └── Veículos

MOBILE (links para demo)
  ├── Checklist mecânico
  ├── Painel do mecânico  ← fila do box, "o que faço agora"
  └── Visão do cliente
```

---

## 5. Telas do MVP (Fase 0) — construir nesta ordem

### Tela 1: Kanban operacional

**O que é:** visão principal da operação. Colunas = estágios do atendimento. Cada card = um veículo.

**Colunas:**
1. Recebido
2. Em inspeção
3. Ag. aprovação *(âmbar)*
4. Ag. peças *(âmbar)*
5. Executando *(verde)*
6. Finalizado *(verde)*

**Card do Kanban — campos obrigatórios:**
- Chip de placa (assinatura)
- Badge de status (Crítico / Atenção / Prioritário)
- Nome do veículo + ano
- Nome do cliente
- Serviço resumido
- Barra de progresso de prazo (verde/âmbar/vermelho)
- Percentual + tempo restante ("falta 30min" / "atrasado 1h10")
- Alert line se parado ("Aguardando cliente há 2h15")
- Mecânico + box + horário + valor em mono

**KPIs fixos acima do board:**
Veículos no pátio · Em execução · Ag. aprovação · Críticos · Receita estimada (mono)

**Filtros:** Todos / Críticos / Atenção (chips)

**Clique no card** → abre o Hub de Atendimento naquele registro

---

### Tela 2: Hub de Atendimento (split view)

**O que é:** a casa do consultor técnico. Lista à esquerda, detalhe à direita.

**Lista (esquerda, 280px):**
- Chip de placa + badge de status
- Nome do veículo
- Cliente + serviço resumido
- Barra de progresso compacta
- Item selecionado: borda esquerda roxa + fundo tint

**Detalhe (direita, flex):**

*Cabeçalho:*
- Chip de placa grande
- Nome do veículo + metadados (cor, motor, KM)
- Cliente + telefone
- Timer se em execução
- Botões: "Enviar orçamento" (primário) + "WhatsApp" (outline)

*Grid de dados (6 colunas):*
OS · Entrada · Previsão · Mecânico · Consultor · Total

*Abas:*
- **Geral** — relato do cliente, observações técnicas, Resumo do cliente (gerado pelo Agente Consultor com tag "gerado pelo agente")
- **Inspeção** — itens com foto, severidade e descrição ditada
- **Orçamento** — tabela peças + mão de obra, botão enviar para aprovação
- **WhatsApp** — chat completo da conversa com o cliente (CRM integrado)

---

### Tela 3: Conversas (WhatsApp CRM)

**O que é:** inbox centralizado do WhatsApp da oficina dentro do sistema.

**Lista (esquerda, 300px):**
- Avatar + nome do cliente
- Tag "🤖 agente" se o agente está conduzindo
- Preview da última mensagem
- Horário em mono
- Alert se sem resposta há muito tempo
- Indicador de urgência

**Chat (direita):**
- Cabeçalho: nome, se agente ou manual, botão "Assumir conversa" / "Passar pro agente"
- Balões de mensagem diferenciados: cliente (esquerda), oficina (direita verde), agente (direita com tag "🤖 Agente Recepcionista")
- Mensagens de sistema centralizadas em roxo ("✓ Agendamento criado · cliente cadastrado pela placa")
- Input de texto + enviar

---

### Tela 4: Agentes (equipe digital)

**O que é:** painel de controle dos funcionários digitais.

**Grid de cards de agente:**
- Avatar do agente (emoji + cor de fundo roxo-tint se ativo)
- Nome + cargo + descrição do que faz
- Toggle on/off
- 3 métricas em mono (conversas hoje, aprovação %, valor gerado)
- Badge de plano (Incluso / Add-on R$ XX/mês)
- Botão "Ver atividade"

**Feed de atividade (abaixo do grid):**
- Timestamp em mono
- "Agente X" em roxo bold + descrição da ação

**Agentes do MVP:**
1. Recepcionista (incluso no Profissional)
2. Consultor (incluso no Profissional)
3. Retenção (Add-on R$ 79/mês)
4. Gestor (Add-on R$ 129/mês)
5. Cobrador (Add-on R$ 59/mês)
6. Mecânico (Add-on R$ 89/mês)

---

### Tela 5: Dashboard gerencial

**3 abas:** Visão geral · Equipe · Faturamento

**Cards de KPI** com borda superior colorida (ok/warn/crit/roxo), valor em mono grande, delta vs. ontem/meta.

**Todos os números são clicáveis** e levam à origem (ex.: "Ag. aprovação 2" → abre o hub filtrado).

**Funil de aprovação:** barras horizontais Orçado / Aprovado / Recusado. "Recusado" é clicável e abre a fila de serviços recusados (Agente de Retenção).

**Workload da equipe:** barra de capacidade por mecânico com badge verde/âmbar/vermelho.

---

### Tela 6: Painel TV

**Fundo escuro (#101014), fonte mono, sem mouse necessário.**

Header: logo + contadores (no pátio / executando / ag. aprovação / alertas) + relógio em tempo real.

Grid 4 colunas: Recebidos · Em inspeção · Em execução · Sidebar (próximas entregas + alertas ativos).

Timer verde em cada card em execução.

---

### Tela 7: Checklist do mecânico (mobile web)

**Frame de celular (300×600px) na demo desktop.**

- Contador de itens por severidade no topo (Total / Crítico / Atenção / Conforme)
- Botão "Só problemas" toggle
- Por item: nome + seletor de severidade (Conforme verde / Atenção âmbar / Crítico vermelho)
- Botões: "Tirar foto" + "Ditar por áudio"
- Transcrição do áudio exibida abaixo em caixa azul com tag "🤖 TRANSCRITO DO SEU ÁUDIO"
- Botão primário full-width: "Salvar evidência"

---

### Tela 8: Portal do cliente (mobile web)

**Dois frames lado a lado:**

**Portal (rastreio):**
- Header com logo da oficina + placa
- Timeline estilo rastreio (Recebido → Inspeção → Aprovação → Em execução → Pronto)
- Etapa atual com indicador "Agora"
- Histórico de serviços anteriores do veículo

**Aprovação digital:**
- Um card por item do orçamento
- Borda esquerda colorida por severidade
- Descrição do mecânico em itálico
- Fotos em badge clicável
- Linhas de custo por item
- "O que acontece se não realizar?" — expansível (aumenta taxa de aprovação)
- Botões "✓ Aprovar" / "✕ Recusar" por item
- Total aprovado sticky no fundo + botão de autorizar

---

---

### Tela 9: Painel do Mecânico (visão do box)

**O que é:** a tela do mecânico entre uma OS e outra — "o que eu faço agora". Diferente do checklist (que é dentro de UMA inspeção), este é o Kanban na ótica de quem está no box. Mobile-first, botões grandes, funciona no celular apoiado na bancada.

**Conteúdo:**
- **Minha fila de hoje** — lista de OS atribuídas a mim, ordenadas por prioridade (crítico primeiro), cada uma com chip de placa, serviço, box e tempo previsto
- **Card em destaque: "Agora"** — a OS ativa, com timer rodando (tempo no serviço), botões grandes: Pausar / Finalizar / Abrir checklist
- **Meu dia** — OS finalizadas hoje, tempo médio por serviço, meta de OS do dia (barra de progresso)
- **Avisos pra mim** — "peça do Outlander chegou", "cliente aprovou o Compass, pode começar", "retrabalho solicitado na Civic"
- Ação por voz opcional: "terminei a pastilha" → agente atualiza o status

**Regras:**
- Só mostra as OS do mecânico logado (não a oficina inteira — foco, não dispersão)
- Severidade e prazo com a mesma semântica de cor do resto (vermelho = risco/atraso)
- Sem ranking competitivo aqui (ranking fica opcional e só no dashboard do gestor — evitar exposição)

---

### Tela 10: Painel de TV do Cliente (recepção / sala de espera)

**O que é:** TV na recepção que os clientes veem enquanto esperam. Duas funções ao mesmo tempo: (a) acompanhamento dos veículos em serviço e (b) **slide de fotos dos itens em manutenção como fricção passiva de venda** — o cliente descansando vê a foto de uma pastilha gasta, um filtro sujo, um disco riscado, e cria consciência de manutenção antes mesmo do consultor abordar. É o "waiting room merchandising" dos EUA, comprovadamente eficaz.

**Layout (fundo escuro, fonte mono, sem interação — roda sozinho):**
- **Faixa superior:** logo da oficina + relógio + "seu carro em boas mãos"
- **Área principal (alterna automaticamente a cada ~15s):**
  - *Modo A — Acompanhamento:* veículos em serviço identificados de forma amigável (NÃO por placa/nome completo — por marca/modelo + iniciais ou senha, ex.: "Jeep Compass · P.A." ou um número de senha), com status e barra de progresso. É a versão "cliente" do Painel TV de chão de fábrica.
  - *Modo B — Slide educativo/venda:* fotos reais da base de dados dos itens inspecionados ("Assim está a pastilha de freio de um veículo hoje na oficina — a sua já foi verificada?"), com legenda educativa curta sobre o risco de não trocar. Fotos rotativas, transição suave.
- **Rodapé:** mensagem institucional / promoção da vez ("Revisão completa a partir de R$ X" / "Pergunte sobre o clube de manutenção")

**LGPD — regra obrigatória (não negociável):**
- Fotos no slide educativo devem ser **anonimizadas**: sem placa visível, sem nome do cliente, sem qualquer dado que identifique o dono. A foto mostra a peça, não o carro identificável.
- Alternativa sem risco: banco de fotos genérico/curado da própria oficina (fotos marcadas como "pode usar no painel") + consentimento no cadastro.
- No modo acompanhamento, identificar por senha/apelido, nunca por placa+nome completo expostos numa tela pública.
- Configurável: o dono liga/desliga o modo slide e escolhe quais fotos entram no pool.

**Diferença dos dois painéis de TV:**
| Painel TV Chão de Fábrica (Tela 6) | Painel TV do Cliente (Tela 10) |
|---|---|
| Vira pra equipe/gestor | Vira pra sala de espera |
| Placa completa, técnico, box, alertas | Identificação amigável, sem dados sensíveis |
| Foco operacional | Foco em tranquilizar + vender |
| Sem fotos | Slide de fotos (fricção de venda) |

---

### Componente: Agente Gestor (FAB flutuante)

Botão fixo no canto inferior direito em todas as telas (exceto TV e mobile).

Painel flutuante com chat escuro:
- 3 sugestões de perguntas clicáveis
- Respostas em linguagem natural com dados reais em mono
- Botões de ação inline nas respostas ("Sim, envia o lembrete")

---

## 6. Modelo de dados essencial (Fase 0)

```typescript
// Atendimento — entidade central
Atendimento {
  id, tenantId, os, status, placaVeiculo
  clienteId, veiculoId
  relato, observacoesTecnicas
  mecanicoId, consultorId, box
  horaEntrada, horaPrevisao, horaEntrega
  checklist[]       // itens de inspeção com foto e severidade
  orcamento[]       // itens de orçamento (peça + mão de obra)
  aprovacoes[]      // aprovado/recusado por item + timestamp + IP
  servicosRecusados[] // recusas viram fila do Agente de Retenção
  timeline[]        // log de cada mudança de status
  conversaWhatsapp  // ref para a conversa CRM
  createdAt, updatedAt
}

// Status possíveis
enum StatusAtendimento {
  RECEBIDO, INSPECAO, AG_APROVACAO, AG_PECAS,
  EXECUTANDO, FINALIZADO, ENTREGUE
}

// Severidade do checklist
enum Severidade { CONFORME, ATENCAO, CRITICO }

// Agente de IA
AcaoAgente {
  id, tenantId, atendimentoId, agente
  descricao, resultadoJson
  createdAt
  // toda ação vira evento na Timeline do Atendimento
}
```

---

## 7. Regras de negócio críticas

- **Placa** aceita formato antigo (ABC-1234) e Mercosul (ABC1D23) — validar os dois
- **Consulta de placa** ao criar novo atendimento → preenche veículo automaticamente (API externa)
- **Serviço recusado** no link de aprovação → cria registro `servicoRecusado` automaticamente (alimenta o Agente de Retenção)
- **Toda ação de agente** vira evento na Timeline do Atendimento (transparência total)
- **WhatsApp da oficina** fica dentro do sistema — não abre app externo
- **Portal do cliente** = link público sem login, acesso por token da OS
- **Aprovação** registra timestamp + IP + snapshot do orçamento (trilha de auditoria)
- **Multi-tenant**: nunca vazar dados de uma oficina pra outra — RLS no Postgres
- **Onboarding por planilha**: template único, validação + preview antes de gravar; wizard self-service (meta: oficina operando em < 1h). Nunca prometer migração de sistema legado (só importador de planilha)
- **Backup**: PostgreSQL diário, retenção 30 dias, teste de restore mensal. **Modo degradado**: se IA ou WhatsApp cair, o núcleo continua (ver/editar/imprimir OS). Deploy nunca sexta à noite/sábado
- **LGPD**: consentimento no 1º contato WhatsApp, opt-out, dado sensível mascarado antes de ir pra IA. Oficina é controladora, UnioTorq é operador. No cancelamento: oficina exporta os dados; retenção definida depois anonimiza/exclui

---

## 8. Agente Gestor — como integrar (o FAB "Perguntar ao Unio")

```typescript
// Prompt do sistema (simplificado)
const systemPrompt = `
Você é o Agente Gestor da oficina ${tenant.nome}.
Responda perguntas sobre a operação de hoje em linguagem natural, direta e curta.
Use os dados reais fornecidos no contexto.
Quando relevante, ofereça uma ação ("Quer que eu envie um lembrete?").
Nunca invente dados — use apenas o que está no contexto.
Hoje: ${hoje}. Dados: ${JSON.stringify(resumoOperacao)}
`;

// Modelo recomendado: Claude Sonnet 4.6 (raciocínio sobre dados do negócio)
// Fallback: GPT-4o mini para respostas simples
```

---

## 8b. Controle de IA e Módulo Admin (ver doc 15 para detalhes)

**Regra absoluta:** o usuário NUNCA acessa API key, modelo ou tokens. Toda IA passa pelo backend.

```
Usuário → Backend (NestJS) → Orquestrador IA → Modelo → Backend → Usuário
```

**Cotas por plano, medidas em ações (não tokens):** cada agente tem limite por plano (ex.: Recepcionista 500 conversas/mês no Essencial). Aviso em 80%, pausa/upgrade em 100%. Internamente mede tokens e converte para "ações". Cada chamada registra `uso_ia { tenantId, agente, modelo, tokensIn/Out, custoEstimado }`.

**Troca de modelo sem refatorar:** camada de provider abstraída em formato OpenAI-compatible. Trocar Claude→Kimi = editar `baseUrl` + `apiKeyRef` + `modelName` no banco via dropdown do admin.

```typescript
ModeloConfig { id, escopo, provider, baseUrl, apiKeyRef, modelName, fallbackId, ativo }
```

**Agentes são skills declarativas (YAML/JSON), não código:** a IA lê a skill (persona + regras + guardrails + ferramentas + modelo) + o contexto do atendimento. Novo agente = novo arquivo, sem deploy. Toda ação vira evento na Timeline.

**Skill ≠ Base de Conhecimento (distinção crítica — ver doc 16):**
- **Skill** = o que o agente É (papel, regras, ferramentas). Fixo, escrito pela UnioTorq, arquivo declarativo.
- **Base de Conhecimento** = o que o agente SABE (dados técnicos: óleo/litragem/filtro por veículo, tempo padrão, padrões). Dinâmico, cresce com cada OS registrada, dado estruturado consultável (não arquivo lido a cada vez).
- O agente lê a skill para saber *como agir* e consulta a base para saber *os fatos*.
- A base técnica é **ativo defensável**: cada OS ensina o sistema; com muitas oficinas, fica mais precisa que qualquer catálogo. Seed inicial manual (veículos comuns da região) → aprende pela operação → complementa com catálogos externos (Fase 3). Nunca expor dado de uma oficina a outra — só conhecimento técnico agregado/anonimizado.

**Customização do cliente dentro de trilhos:**
- ✅ Pode: nome do agente, tom (enum), dados do negócio, mensagens-padrão, ligar/desligar agentes assinados
- ❌ Não pode: reescrever regras, guardrails, ferramentas ou o prompt de sistema
- Técnico: `AgenteConfig` (editável pelo tenant) é camada separada da skill (imutável). Prompt final = skill fixa + config editável + contexto.

**Módulo Admin — construir junto com o core:**
- Gestão de IA: modelo por agente, chaves criptografadas, painel de custo por oficina/agente/modelo, alertas de custo, fallback automático
- Gestão de assinaturas: planos, status, webhook Asaas, ligar/desligar add-ons, uso vs. limite, MRR/churn
- Gestão de skills: editor, versionamento, sandbox de teste

---

## 9. Zona de risco — o que NUNCA entra no código

Regra: **uma feature só entra se (a) dá mãos/olhos a um agente, ou (b) remove um motivo de manter o sistema antigo.**

❌ E-commerce / hub de vendas / Mercado Livre
❌ Customização exclusiva para um cliente (tudo é multi-tenant)
❌ "Parceria"/sociedade com cliente — sempre assinatura
❌ RPA (robô lendo tela de sistema legado)
❌ Plataforma genérica de criação de agentes ("crie seu agente")
❌ Outros nichos (barbearia, salão, clínica)
❌ Funilaria/sinistro/seguradora
❌ App instalável para o cliente final (sempre link)
❌ Hardware / maquininha própria
❌ Folha de pagamento / eSocial
❌ Contabilidade completa (só DRE simples + exportação)
❌ Trocar a stack sem dor de produção mensurável

---

## 10. Sequência de desenvolvimento recomendada

```
Semana 1-2:   Setup do projeto (Next.js + NestJS + Postgres + Prisma)
              Design system no Tailwind (tokens de cor, tipografia, placa chip)
              Autenticação (NextAuth ou similar) + multi-tenant base
              Base do Módulo Admin (tenants, planos, config de modelo de IA)

Semana 3-4:   Modelo de dados: Atendimento + Veículo + Cliente
              API de placa (integração)
              Kanban (tela 1) — lista de atendimentos por coluna
              Camada de provider de IA abstraída (OpenAI-compatible) + medição de uso

Semana 5-6:   Hub de Atendimento (tela 2) — split view
              Checklist com foto (tela 7 — mobile web)
              Painel do Mecânico (tela 9)
              Upload de fotos para Cloudflare R2

Semana 7-8:   Orçamento + Link de aprovação (tela 8)
              Portal do cliente (link público por token)
              Notificação WhatsApp via Evolution API Go

Semana 9-10:  Conversas / WhatsApp CRM (tela 3)
              Agente Consultor como SKILL (primeira skill real) + cota por plano
              Serviços Recusados (registro automático)

Semana 11-12: Dashboard (tela 5) + Agentes painel (tela 4)
              Agente Recepcionista (skill) + Agente Gestor (FAB, skill)
              Admin: painel de custo de IA + gestão de assinaturas (webhook Asaas)

Semana 13+:   Painel TV chão de fábrica (tela 6) + Painel de TV do Cliente (tela 10)
              Asaas (recorrência + Pix no link)
              Fiscal (Focus NFe / PlugNotas)
              PDV Essencial + Estoque Básico (Fase 1)
```

---

## 11. Como apresentar para donos de oficina (roteiro de demo)

1. **(15s)** "Fui mecânico 4 anos, hoje trabalho com software. Construí um sistema feito por quem já ficou embaixo do carro."
2. **(1min)** Descrever o dia dele sem mostrar o sistema: "Cliente chama no zap, você para tudo, orçamento fica dias esperando, cliente de 6 meses sumiu. Errei?"
3. **(2min)** Demo com a placa do carro DELE → sistema preenche o veículo sozinho → mostra foto → orçamento → link de aprovação no WhatsApp. **Nunca dizer "inteligência artificial" — mostrar o resultado.**
4. **(30s)** Demo do Agente Gestor: dono faz uma pergunta por voz sobre o faturamento → sistema responde na hora.
5. **(1min)** Oferta fundadora: R$ 97/mês travado por 12 meses (vs. R$ 249 de tabela). Primeiro mês agora como reserva.
6. **Silêncio.** Quem fala primeiro depois da oferta, perde.

---

## 12. Referências visuais e de produto

- **Layout e operação:** Tekion ARC, Tekmetric, Shop-Ware
- **Design/densidade:** Linear (calm design), HubSpot (CRM)
- **Portal do cliente:** rastreio FedEx/Amazon
- **Agentes:** Tekion T1, EiBarber Jarvis, ServiceTitan Atlas
- **Aprovação com foto:** DVI do Tekmetric/AutoLeap (aumenta taxa de aprovação em 2×)
- **Resumo diário WhatsApp:** SMS de pacing do Tekion (custo quase zero, cria hábito diário)
- **Serviços recusados:** deferred services do Shopmonkey (18–28% de recuperação)

---

## 13. Arquivos de referência completos

Todos os documentos detalhados estão na pasta `/docs` do projeto:

| Arquivo | Conteúdo |
|---|---|
| 01-visao-do-produto.md | Visão completa e proposta de valor |
| 02-pesquisa-de-mercado.md | Concorrentes, Cilia, Tekion, números BR |
| 03-publico-alvo-e-icp.md | ICP, personas, anti-persona |
| 04-mvp-e-roadmap.md | Fases, gates de avanço |
| 05-agentes-de-ia.md | Portfólio completo dos 8 agentes |
| 06-arquitetura-e-integracoes.md | Stack, WhatsApp, fiscal, pagamentos |
| 07-modelo-de-negocio.md | Preços, unit economics, MRR |
| 08-riscos-e-mitigacoes.md | 13 riscos com mitigação |
| 09-plano-de-validacao.md | Roteiro de visitas e pré-venda |
| 10-custos-detalhados-e-plano-piloto.md | Custos de infra e IA em R$ |
| 11-roadmap-agent-first.md | Roadmap completo por fase |
| 12-zona-de-risco-escopo.md | O que nunca entra no produto |
| 13-traducao-inspiracoes-brasil.md | Tekion/ServiceTitan → Brasil |
| 14-marca-e-design.md | Decisões de marca e revisão do protótipo |
