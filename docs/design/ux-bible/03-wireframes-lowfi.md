# UX Bible — 03 · Wireframes Low-Fi

**Fase:** UX (esqueleto de tela, pré-código) · **Responsável:** Uma (@ux-design-expert) · **Data:** 2026-07-17
**Depende de:** [01 — Fundação](01-fundacao-personas-ia-navegacao.md), [02 — Jornadas](02-jornadas-por-papel.md), [Modelo de Domínio](../../requisitos/modelo-de-dominio.md).

> Low-fi = **estrutura e comportamento**, não visual final. Cada tela declara seu **shell** e sua **superfície**. Ordem: **3.1 Hub do Consultor** (o coração) → **3.2 Comando** → **3.3 Ficha do Cliente & Prontuário do Veículo** → 3.4 Portal do Cliente → 3.5 Recepção → 3.6 Mecânico → 3.7 Gestor.

---

## 3.1 Hub do Consultor ⭐

- **Shell:** Consultor (desktop) · **Superfície:** Detalhe · lente consultor + Coleção (rail) + Timeline
- **Jornada:** [02 — Jornada 2](02-jornadas-por-papel.md) ("do checklist ao WhatsApp")
- **Layout travado:** split view com fila fixa à esquerda (3 colunas: Fila · Detalhe · Timeline)
- **Decisão adicional (2026-07-17, após revisão dos prints da referência):** *Kanban* e *Atendimentos* eram 2 itens de sidebar redundantes (mesma frota, um sem Detalhe, outro com). Fundem-se num só — ver [Fundação §6](01-fundacao-personas-ia-navegacao.md).

```
┌──────────────────────────────────────────────────────────────────────┐
│ UnioTorq  🔍 Buscar placa: ABC1D23______      [+ Novo]  [Gestor ▾]  👤 │  Comando
├────────────────┬──────────────────────────────────┬────────────────────┤
│ MEUS ATENDIMENTOS│ ABC1D23 · Honda Civic 2019       │ TIMELINE            │
│ [Lista][Kanban] │ João Silva · ⏱ Orçamento 12min   │ 08:30 Nina agendou  │
│ ───────────────│ ⏸ Aguardando peça                │ 09:15 Recepção abriu│
│ ▸ABC1D23 🔴    │──────────────────────────────────│ 10:02 Mecânico       │
│  Civic · João  │ ○─○─●─○─○─○─○                    │   enviou checklist  │
│  Orçam. 12min  │ Chk Diag OS [ORÇ] Aprv Exec Hist  │ 10:20 Consultor      │
│                │──────────────────────────────────│   montou orçamento  │
│  XYZ2E34 🟡    │ ┌Cliente──┐┌Veículo──┐┌Total────┐│                     │
│  Gol · Maria   │ │3 visitas ││79.000 km││R$ 640,00││ (cada evento é a    │
│  Aprov. 2h     │ │2 recusas ││Civic 19 ││ 4 itens ││  Memória Viva       │
│                │ └─────────┘└─────────┘└─────────┘│  ficando visível)   │
│  DEF3F45 ⚠2h+ │ ORÇAMENTO — item a item          │                     │
│  HB20 · Pedro  │ ┌────────────────────────────────┐│                     │
│  ⏳ s/ resposta│ │🔴 Pastilha diant. gasta         ││                     │
│                │ │  [📷] peça+mão      R$180  [✓] ││                     │
│                │ │🟡 Óleo vencido (por KM)         ││                     │
│                │ │  [📷] peça+mão      R$ 90  [✓] ││                     │
│                │ │⚪ Alinhamento (recomendado)     ││                     │
│                │ │  [📷] mão de obra   R$ 80  [ ] ││                     │
│                │ └────────────────────────────────┘│                     │
│                │ ┌ 🤖 Consultor Digital sugere ────┐│                     │
│                │ │ "Pastilha em ~20%: risco de     ││                     │
│                │ │  danificar o disco. Trocar já." ││                     │
│                │ │           [Usar]  [Editar]      ││                     │
│                │ └────────────────────────────────┘│                     │
│ 4 abertas·1 ⚠ │      [ Enviar Orçamento no Zap → ] │                     │
└────────────────┴──────────────────────────────────┴────────────────────┘
   COLEÇÃO (fila)        DETALHE · lente consultor          TIMELINE
```

### Anatomia (região por região)

| Região | Superfície | Mostra | Objeto(s) |
|---|---|---|---|
| **Barra de topo** | Comando | busca por placa (foco automático, mono), Novo Atendimento, alternador de shell, usuário | — |
| **Rail esquerdo** | Coleção | "meus atendimentos": placa (mono), cliente/veículo, etapa+tempo, alerta; toggle Lista/Kanban; contador no rodapé | Atendimento (lista) |
| **Cabeçalho do detalhe** | Detalhe | cliente, veículo auto-preenchido, status, timer da etapa, **flags** (⏸ peça / ⏳ sem resposta) | Atendimento |
| **Stepper** | Detalhe | etapas em progressive disclosure (a atual expandida) | Atendimento (estado) |
| **Bento (Cliente/Veículo/Total)** | Detalhe | resumo + total dinâmico | Cliente, Veículo, Orçamento |
| **Lista de orçamento** | Detalhe | itens: severidade V/A/V, descrição, foto, valor, toggle incluir | Item de Orçamento |
| **Card do agente** | Detalhe (IA em contexto) | rascunho de recomendação **inline**; [Usar]/[Editar] | Recomendação Técnica |
| **CTA WhatsApp** | Detalhe | envia o orçamento (1 clique) | Aprovação |
| **Coluna direita** | Timeline | eventos (humano + especialista), append-only | Evento |

### Tabs + faixa de progresso (revisado após comparar com a referência construída)

A referência já implementa as seções do Hub como **abas** (Geral · Timeline · Inspeção · Orçamento · Comunicação · Financeiro) — testado, compila, funciona. Mantemos as abas (reaproveitar > reinventar) em vez do stepper originalmente desenhado aqui. O que o stepper queria comunicar — **em que fase** o atendimento está — vira uma **faixa de progresso somente-leitura** acima das abas, não uma navegação própria:

`Recebido → Inspeção → ⦿ Orçamento → Aprovação → Execução → Histórico`

A faixa mostra a etapa atual; não é clicável — quem navega são as abas, livres, como já está construído. Ganha leitura de progresso sem descartar trabalho já validado no rebuild.

- **Inspeção** (aba): read-only pro consultor — fotos/severidades que o mecânico mandou.
- **Orçamento** (aba, mostrado acima): o construtor item-a-item — o momento do dinheiro.
- **Comunicação**: a conversa da Nina (já implementada na referência).

### A IA em contexto (o card do agente)

O **Consultor Digital** aparece como um **card inline** logo abaixo dos itens — uma sugestão de recomendação em língua de cliente, com `[Usar]` (vira/atualiza um item) e `[Editar]`. **Nunca** é uma aba "IA". O **preço final é sempre do humano** (regra rígida — [doc 17](../../produto/17-funcionarios-digitais.md)); o agente redige e prioriza, não fixa valor.

### Estados

| Estado | Comportamento |
|---|---|
| **Vazio** (nada selecionado) | rail cheio; centro: "Busque uma placa ou selecione um atendimento" |
| **Severidade** | 🔴 vermelho = risco/segurança · 🟡 âmbar = atenção · ⚪ neutro = recomendado (disciplina de cor: vermelho nunca é "workload" nem "recusado") |
| **Sugestão do agente pendente** | card 🤖 destacado; some ao usar/dispensar |
| **Enviando WhatsApp** | CTA → confirmação → novo evento na Timeline ("Nina enviou orçamento") |
| **Total dinâmico** | toggle de item recalcula o bento Total ao vivo |
| **Flags de exceção** | ⏸ Aguardando peça / ⏳ Cliente não respondeu no cabeçalho + no card do rail |

### Interações-chave

- **Busca por placa** (Comando): abre qualquer atendimento/veículo na hora.
- **Clique no rail:** troca o detalhe (a fila fica visível — decisão travada).
- **Inline edit** em valores e descrições.
- **Toggle incluir/remover** item → recalcula total.
- **Anexar foto** (mock no protótipo) por item.
- **`[Usar]`** no card do agente → cria/atualiza a Recomendação como item.
- **CTA WhatsApp** → costura com o Portal do Cliente (3.2) e com o Inbox da Recepção.

### O que NÃO está nesta tela (é outro shell)

Checklist editável (mecânico, mobile · 3.6) · aprovar/reprovar item (cliente, Portal · 3.4) · KPIs do negócio (gestor · 3.7) · config de IA/assinatura (admin).

---

## 3.2 Comando (busca universal)

- **Onde aparece:** barra superior dos shells Recepção e Consultor; barra de comando/voz do Gestor (mesma peça de UI, grupos de ações diferentes por papel).
- **Componente:** `CommandDialog` (shadcn/ui, cmdk) — Cmd+K ou clique na barra.
- **Busca multi-campo:** placa OU nome OU telefone OU CPF, sem precisar saber qual.

```
┌─────────────────────────────────────────────┐
│ 🔍 maria___________________________     ESC │
├─────────────────────────────────────────────┤
│ ATENDIMENTOS                                 │
│  🚗 DEF-5678 · Honda Civic · Ag. Aprovação   │
├─────────────────────────────────────────────┤
│ CLIENTES                                     │
│  👤 Maria Santos · Recorrente · 5 visitas    │
├─────────────────────────────────────────────┤
│ VEÍCULOS                                     │
│  (nenhum outro veículo da Maria)             │
├─────────────────────────────────────────────┤
│  Ver todos os clientes →                     │
│  Ver todos os veículos →                     │
└─────────────────────────────────────────────┘
```

- **Estado vazio** (nada digitado): grupo "Recentes" (últimos atendimentos abertos) + as duas ações "Ver todos" acima — único lugar onde a lista completa de clientes/veículos aparece; nunca um item fixo de sidebar.
- **"Ver todos" abre uma tabela densa** (mesma tabela da Coleção de Atendimentos, reaproveitada) com os filtros que a CRM/Prontuário da referência já têm (Todos/VIP/Recorrente/Novo; Todos/Rev. próxima/Rev. vencida).
- **Clique em qualquer resultado:** abre o peek-drawer (§3.3) antes da página completa.

---

## 3.3 Ficha do Cliente & Prontuário do Veículo

- **Shell:** transversal (Recepção, Consultor, Gestor) · **Superfície:** Detalhe
- **Chegada:** Comando (§3.2) ou clique em nome/placa em qualquer tela (Hub, Kanban, Lista)
- **Conteúdo:** 100% herdado da referência (CRM de Clientes / Prontuário de Veículos) — nenhuma aba, campo ou métrica muda. Só a arquitetura de acesso muda: de item fixo de menu para Detalhe sob demanda.

**Peek-drawer (reaproveita o padrão que o Kanban já tem):**
```
┌──────────────────────────────────┐
│ 👤 Maria Santos · Recorrente     │
│    (11) 97777-8888 · 5 visitas   │
├──────────────────────────────────┤
│ 🚗 DEF-5678 · Honda Civic 2020    │
├──────────────────────────────────┤
│        [Abrir Ficha Completa →]  │
└──────────────────────────────────┘
```

**Página completa (Ficha do Cliente) — igual à referência, com 1 acréscimo:**
```
┌────────────────────────────────────────────────────────────────┐
│ ← Voltar  👤 Ana Souza [VIP]      [+Nova OS][WhatsApp][Editar] │
├────────────────────────────────────────────────────────────────┤
│ Cliente desde│Visitas│Total Gasto│Ticket Médio│Últ.Visita│Veíc.│
├────────────────────────────────────────────────────────────────┤
│ [Perfil] [Histórico 4] [Veículos 1]                             │
├────────────────────────────────────────────────────────────────┤
│  Histórico → Aprovações:                                        │
│  OS-2023-0890 · 4 aprovados · 🔴1 recusado [Reofertar via Rita →]│  ← NOVO
└────────────────────────────────────────────────────────────────┘
```

**Prontuário do Veículo:** mesma lógica — peek-drawer + página completa com Identificação/Dados Técnicos/Indicadores, abas Prontuário/Histórico/Checklists/Fotos, idênticas à referência.

**Acréscimo único:** item recusado no Histórico ganha ação **"Reofertar via Rita"** — fecha o loop com a Retenção (mesmo padrão já decidido pro Prontuário — "Rev. vencida → Rita reativa").

---

## 3.4 Portal do Cliente

- **Shell:** Cliente (mobile, link direto no WhatsApp, sem login) · **Superfície:** Detalhe · lente cliente + Timeline (rastreio) — superfície pública, única (Portal + Aprovação unificados, Fix14 #5)
- **Jornada:** [02 — Jornada 5](02-jornadas-por-papel.md) ("entender e aprovar")
- **Fonte:** herda 1:1 do wireframe já fechado em [`04-WIREFRAMES-TEXTUAIS.md` §4](../../requisitos/prototipo/04-WIREFRAMES-TEXTUAIS.md) e da revisão da referência ([`06-AJUSTES-TELAS-RESTANTES.md` §6-7](../../requisitos/prototipo/06-AJUSTES-TELAS-RESTANTES.md)) — sem mudança de conteúdo, só a moldura de vocabulário (Coleção/Detalhe/Comando) por cima.

```
┌───────────────────────────────┐
│ Unio Oficina                   │  ← header, sem login/sem chrome de app
│ 🚗 ABC1D23 · Toyota Corolla     │
├───────────────────────────────┤
│ [Status][Aprovação][Fotos]     │
│ [Histórico][Docs]              │  ← abas (Fix14 #5 — "uma superfície só")
├───────────────────────────────┤
│ ● Recebido ─● Inspeção ─⦿ Aprovação ─○ Pronto │  ← Timeline de rastreio
├───────────────────────────────┤
│ Seu orçamento                  │
│ ┌───────────────────────────┐ │
│ │ [FOTO grande da peça]     │ │
│ │ Pastilha dianteira         │ │
│ │ 🔴 Precisa trocar          │ │
│ │ ▸ O que acontece se não   │ │  ← expander (consequência)
│ │   realizar?                │ │
│ │ R$ 320,00      [Aprovar]  │ │
│ └───────────────────────────┘ │
│ ┌───────────────────────────┐ │
│ │ Alinhamento   R$ 80 [Aprovar]│
│ └───────────────────────────┘ │
├───────────────────────────────┤
│ Total selecionado: R$ 320,00  │  ← barra fixa, recalcula ao vivo
│ [ Confirmar aprovação ]       │
│ [ Pagar com Pix ] 🔒 em breve  │
└───────────────────────────────┘
```

### Anatomia

| Região | Superfície | Mostra | Objeto(s) |
|---|---|---|---|
| Header | Detalhe | oficina, veículo, placa (mono) — sem login | Atendimento, Veículo |
| Abas | Detalhe | Status · Aprovação · Fotos · Histórico · Docs | Atendimento |
| Timeline de rastreio | Timeline | estilo FedEx/Amazon, etapa atual destacada | Evento |
| Card de item (aba Aprovação) | Detalhe | foto grande, severidade, consequência expandível, valor, Aprovar/Reprovar | Item de Orçamento |
| Barra fixa | Detalhe | total dinâmico, Confirmar aprovação, Pix (preview) | Aprovação |
| Confirmação | Detalhe | resumo + assinatura desenhada + aceite (nome+timestamp) | Aceite |
| Fotos / Histórico / Docs (abas) | Detalhe | galeria, histórico de serviços, nota fiscal/OS (preview) | Atendimento |

### Estados

| Estado | Comportamento |
|---|---|
| Item aprovado | verde, sai da lista de pendentes |
| Item reprovado | neutro/riscado — **nunca vermelho gritando** (disciplina de cor) — alimenta Fila de Recusados (interno, invisível ao cliente) |
| Total dinâmico | recalcula ao vivo a cada toggle |
| Pix | preview "em breve", botão desabilitado com selo |
| Sem orçamento pendente | abre direto na aba Status (rastreio) |
| Assinatura | traço desenhado (dedo), não upload de arquivo |

### Interações-chave

- Expandir "O que acontece se não realizar?" por item.
- Aprovar/Reprovar item a item, independente — total recalcula.
- Confirmar aprovação → resumo → assinatura desenhada → aceite (nome + IP/timestamp).
- Reprovado alimenta automaticamente a Fila de Serviços Recusados (Dashboard + Ficha do Cliente §3.3) — mecanismo 100% interno, o cliente nunca vê "isso vai ser reofertado".

### Confirma (não muda) e reforça decisões já tomadas

- **Rolagem vs. abas:** o doc04 já tratava como equivalentes ("uma superfície só", rolagem OU abas) — a referência escolheu abas; mantemos, sem tensão real com a Fundação.
- **A faixa de progresso somente-leitura** que acabamos de decidir pro Hub (§3.1) já existe aqui, provada — o `● Recebido ─● Inspeção ─⦿ Aprovação ─○ Pronto` é exatamente esse padrão, rodando desde a referência original. Reforça que a escolha do Hub é consistente com o que já funciona no Portal.
- **Segmentação de cliente (VIP/Recorrente/Novo, Modelo de Domínio §1.1) fica de fora desta tela** — é sinal interno pra recepção/consultor triarem, não algo pra mostrar ao próprio cliente.

### O que NÃO está nesta tela (é outro shell)

Montar o orçamento (Consultor, Hub · 3.1) · checklist/DVI (Mecânico · 3.6) · KPIs do negócio (Gestor · 3.7) · Ficha do Cliente completa (interno · 3.3).

---

## 3.5 Recepção

- **Shell:** Recepção (desktop, balcão, alta interrupção) · **Superfície:** Coleção (fila) + Inbox (conversas)
- **Jornada:** [02 — Jornada 1](02-jornadas-por-papel.md) ("receber e localizar")
- **Fonte:** herda o wireframe da Lista de Atendimentos já fechado em [`04-WIREFRAMES-TEXTUAIS.md` §1](../../requisitos/prototipo/04-WIREFRAMES-TEXTUAIS.md). Muda: a busca (agora Comando, §3.2), a Coleção fundida (Kanban+Atendimentos, §3.1) e o Inbox no lugar do item de sidebar "Agente WhatsApp".

```
┌──────────────────────────────────────────────────────────────────┐
│ 🔍 Comando: placa, nome, telefone, CPF...     [+ Novo Atendimento]│  ← Comando (§3.2)
├────────────────────────────────────────────────────────────────── │
│ [ Fila ]  [ Inbox · 3 ]                                           │  ← 2ª aba = Inbox (Nina)
├────────────────────────────────────────────────────────────────── │
│ [Lista][Kanban][Agenda]      12 abertas · 2 críticos · R$ 6.600   │
│ «Todos» «Críticos» «Atenção» «Entregas Atrasadas»                 │  ← ex-"Exceções", agora filtro
│──────────────────────────────────────────────────────────────────│
│ ABC1D23   João Ribeiro   Gol 1.6      «Aguard.»     2h+ 🟡    890 │
│ EFG2H45   Maria Souza    Onix         «Executando»  40min   1.240 │
│ ...                                                                │
└──────────────────────────────────────────────────────────────────┘
        COLEÇÃO (Lista ⇄ Kanban ⇄ Agenda) — aba "Fila" selecionada
```

**Novo Atendimento, passo 1 (revisado):**
```
Novo Atendimento — Passo 1 de 4 — Cliente/Veículo
┌─────────────────────────────────────────┐
│ 🔍 placa, nome ou CPF...                 │  ← mesmo Comando, não é busca própria
├─────────────────────────────────────────┤
│ 🚗 ABC1D23 · Toyota Corolla (Ana Souza)  │
│ 👤 Maria Santos · Recorrente             │
│ 👤 Luciana Costa · Novo                  │
└─────────────────────────────────────────┘
        [Cancelar]              [Continuar →]
```

### Anatomia

| Região | Superfície | Mostra | Objeto(s) |
|---|---|---|---|
| Comando (topbar) | Comando | busca multi-campo, sempre visível | Atendimento/Cliente/Veículo |
| `[+ Novo Atendimento]` | ação | abre wizard (passo 1 reaproveita o Comando) | Atendimento |
| Abas Fila / Inbox | Coleção / Inbox | alterna o corpo entre fila e conversas | Atendimento / Conversa |
| Toggle Lista/Kanban/Agenda | Coleção | 3 visualizações da mesma fila (§3.1) | Atendimento |
| Filtros (Todos/Críticos/Atenção/Entregas Atrasadas) | Coleção (filtro) | substitui o antigo item "Exceções" da sidebar | Atendimento |
| Inbox (quando ativo) | Inbox | conversas do Recepcionista Digital, 24/7 | Conversa, Evento |
| Clique numa linha/card | → Detalhe | abre peek-drawer → Hub (mesmo padrão §3.1) | Atendimento |

### Estados

| Estado | Comportamento |
|---|---|
| Inbox com pendência | badge de contagem na aba ("Inbox · 3") |
| Conversa escalada pelo agente | aparece destacada — recepção humana assume |
| Fila vazia | "Nenhum atendimento — comece em [+ Novo Atendimento]" |
| Filtro ativo | some da fila quem não bate o critério; contadores do topo recalculam |

### Interações-chave

- Comando abre resultado direto: Atendimento → peek-drawer; Cliente/Veículo → Ficha/Prontuário (§3.3).
- `[+ Novo Atendimento]` → wizard de 4 passos; passo 1 reaproveita o Comando, sem busca duplicada.
- Toggle Lista/Kanban/Agenda preserva o filtro ativo.
- Cada ação do Recepcionista Digital no Inbox vira evento na timeline do Atendimento correspondente (Jornada 1).

### Decisões adicionais (após revisão dos prints da referência, 2026-07-17)

- **"Exceções"** era item fixo de sidebar na referência — mas o doc04 (wireframe original) já descrevia isso como painel `▸ Exceções` **dentro** do Kanban, não tela própria, e a Coleção já tem filtros (Críticos/Atenção/Entregas Atrasadas) que cobrem o mesmo caso. Dobra pra dentro dos filtros da Coleção — mesmo princípio da fusão Kanban+Atendimentos: nenhum estado transversal (Fundação §7) vira módulo permanente.
- **"Agente WhatsApp"** era item fixo de sidebar — decisão já registrada desde a Fundação original (§6): vira a aba **Inbox** aqui dentro; não desaparece, só troca de endereço.
- **Novo Atendimento, passo 1:** a referência busca só por nome/CPF (achado da comparação anterior); aqui passa a ser o próprio Comando — mesmo componente, sem busca duplicada.

### O que NÃO está nesta tela (é outro shell)

Montar orçamento (Consultor, Hub · 3.1) · aprovar item (Cliente, Portal · 3.4) · dashboard financeiro (Gestor · 3.7) · checklist (Mecânico · 3.6) — a Recepção não vê financeiro completo nem checklist mobile (Fundação §5).

---

## 3.6 Mecânico

- **Shell:** Mecânico (mobile, offline-first, no box — luva/graxa/sol) · **Superfície:** Detalhe · lente mecânico (Checklist/DVI)
- **Jornada:** [02 — Jornada 3](02-jornadas-por-papel.md) ("inspecionar sem parar")
- **Fonte:** herda o wireframe já fechado em [`04-WIREFRAMES-TEXTUAIS.md` §3](../../requisitos/prototipo/04-WIREFRAMES-TEXTUAIS.md), com o "Inspeção Finalizada" + CONCLUIR que a referência construída acrescentou (`06-AJUSTES-TELAS-RESTANTES.md` §8).
- **Sem sidebar, sem Comando:** único shell sem busca universal — o mecânico não procura nada, entra direto na fila do próprio box (Fundação §5.1).

```
        ┌───────────────────────────┐
        │ ◀  Meu Box                │  ← entrada: fila priorizada, sem sidebar
        │ ▸ ABC1D23 · Gol 1.6 · Box 1│  ← próximo carro no topo
        │   XYZ9876 · Compass        │
        └───────────────────────────┘
                    │ toca o carro
                    ▼
        ┌───────────────────────────┐
        │ ◀  Checklist · Gol ABC1D23│  ← header sticky
        │ 🔴 2   🟡 1   🟢 8  [Só probl.]│  ← contadores + toggle
        ├───────────────────────────┤
        │ FREIOS                     │
        │ ┌───────────────────────┐ │
        │ │ Pastilha dianteira    │ │
        │ │ [Conforme][Atenção][Reprovado]│ ← severidade V/A/V, 3 alvos grandes
        │ │ [📷 Foto] [🎙 Áudio]  │ │
        │ │ obs: preenchida por Beto│ │  ← áudio → texto (Beto)
        │ └───────────────────────┘ │
        │ SUSPENSÃO ...              │
        ├───────────────────────────┤
        │  [ Inspeção Finalizada ]  │  ← resumo + "salvo localmente,
        │  [ Enviar ao consultor ]  │     sincroniza online" (mock)
        └───────────────────────────┘
```

### Anatomia

| Região | Superfície | Mostra | Objeto(s) |
|---|---|---|---|
| Meu Box (entrada) | Coleção (fila do box, sem Comando) | fila priorizada, "o que faço agora" | Atendimento (filtrado por box/mecânico) |
| Header sticky | Detalhe | veículo/placa + contadores 🔴🟡🟢 + "Só problemas" | Checklist |
| Grupos por sistema | Detalhe | Freios/Suspensão/Pneus/Fluidos… | Item de Inspeção |
| Item-card | Detalhe | severidade (3 alvos grandes), foto, áudio, observação | Item de Inspeção |
| Footer sticky | Detalhe | Inspeção Finalizada (resumo) → Enviar ao consultor | Checklist → Recomendação |

### Estados

| Estado | Comportamento |
|---|---|
| Item marcado | colore borda/fundo conforme severidade |
| "Só problemas" ativo | oculta itens Conforme |
| Áudio ditado | **Beto** (Assistente do Mecânico) estrutura a observação automaticamente |
| Foto ruim / sem sinal (sol, offline) | re-tirar com alvo grande; segue offline, sincroniza depois (**mock nesta fase** — offline-first real é Fase 2, doc 18) |
| Inspeção Finalizada | resumo (X reprovados/Y atenção/Z conformes) antes de CONCLUIR |

### Interações-chave

- Um toque define severidade — nunca teclado como caminho principal.
- 📷/🎙 abrem overlay simples (câmera/ditado mock).
- **DVI → Orçamento automático:** item Reprovado/Atenção com foto vira item do Orçamento no Hub (Consultor ainda inclui/remove — §3.1) — é o handoff que dispara a Jornada 2.
- Enviar ao consultor fecha o Checklist e dispara o evento "Mecânico enviou checklist" na Timeline (§3.1).

### Confirma (não muda)

- Severidade V/A/V, "Só problemas", alto contraste/alvos grandes (Fix14 #8) e o offline mock — já validados na referência, sem ajuste.
- **Este shell fica de fora** de Comando, Ficha do Cliente, CRM — o mecânico não vê nem precisa (Fundação §5: "não vê Financeiro, CRM, dashboard").

### O que NÃO está nesta tela (é outro shell)

Montar orçamento (Consultor, Hub · 3.1) · aprovar (Cliente, Portal · 3.4) · buscar cliente/veículo (Comando · 3.2, não existe aqui) · dashboard (Gestor · 3.7).

---

## 3.7 Gestor (o último shell)

- **Shell:** Gestor (desktop, pouco tempo, quer números não telas) · **Superfície:** Agregado (Dashboard) + Comando (busca/drill) + Coleção (fila de Recusados)
- **Jornada:** [02 — Jornada 4](02-jornadas-por-papel.md) ("comandar sem navegar")
- **Fonte:** a referência construída é mais rica que o wireframe original (doc04 §6) — 3 abas (Visão Geral · Equipe · Faturamento) com Operação/Produtividade/Comercial/OS por Status (`06-AJUSTES-TELAS-RESTANTES.md` §3, "manter completo"). Herdamos a versão rica, não a simplificada.

```
┌────────────────────────────────────────────────────────────────┐
│ 🔍 Comando: placa, nome, cliente, "recusados"...                │  ← mesmo Comando (§3.2)
├────────────────────────────────────────────────────────────────┤
│ [Visão Geral] [Equipe] [Faturamento]    « Hoje » « Semana » « Mês »│
├────────────────────────────────────────────────────────────────┤
│ ┌────────────────┐┌───────────┐┌───────────┐┌───────────┐      │
│ │ Faturamento    ││ Ticket    ││ OS        ││ OS        │      │
│ │ R$38.400/50k   ││ médio     ││ abertas   ││ entregues │      │
│ │ ▓▓▓▓▓▓▓░░ 77%  ││ R$ 620    ││    12     ││    28     │      │
│ └────────────────┘└───────────┘└───────────┘└───────────┘      │
│ ┌───────────────────┐┌───────────────────┐┌──────────────────┐ │
│ │ Operação          ││ Funil de aprovação││ Faturamento no   │ │
│ │ Em Exec. · Ag.    ││ Enviado  R$12.400 ││ tempo (gráfico)  │ │
│ │ Aprov. · Ag.Peças ││ Aprovado R$ 9.100 ││  ▁▂▃▅▆▇▅▃        │ │
│ │ Veículos Parados 2││ Recusado R$3.300 ▸│└──────────────────┘ │
│ └───────────────────┘└───────────────────┘  ← clicável (Fix14 #7)│
└────────────────────────────────────────────────────────────────┘
```

### Anatomia

| Região | Superfície | Mostra | Objeto(s) |
|---|---|---|---|
| Comando (topbar) | Comando | busca/drill textual — mesmo componente (§3.2) | Atendimento/Cliente/Veículo/Recusados |
| Abas Visão Geral/Equipe/Faturamento | Agregado | KPIs, Produtividade/Workload, Comercial+OS por Status | Dashboard |
| KPIs bento | Agregado | faturamento vs meta (barra), ticket médio, OS abertas/entregues | Atendimento (agregado) |
| Operação | Agregado | Em Execução/Ag.Aprovação/Ag.Peças/Veículos Parados | Atendimento (agregado) |
| Funil de aprovação | Agregado | Enviado/Aprovado/Recusado — Recusado clicável | Item de Orçamento |
| Drill Serviços Recusados | Coleção (filtro) | item/veículo/valor/motivo → oportunidade de reoferta | Item Recusado |

### Estados

| Estado | Comportamento |
|---|---|
| Meta atingida | barra cheia/verde; abaixo = neutro (nunca vermelho — disciplina de cor) |
| Recusado | âmbar — oportunidade, não erro (Fix14 #3) |
| Workload alto | âmbar (não vermelho — "Crítico 90%" não é risco a cliente) |
| Clicar "Recusado" | abre o drill (Coleção filtrada por Item Recusado) |

### Interações-chave

- Trocar período (Hoje/Semana/Mês) re-renderiza tudo.
- Clicar valor Recusado abre a Coleção de Serviços Recusados — mesma origem de dado que alimenta "Reofertar via Rita" na Ficha do Cliente (§3.3).
- Comando funciona igual aos outros shells: buscar um cliente/veículo abre a mesma Ficha/Prontuário — não é um dashboard-buscador à parte.

### Confirma (não muda) / escopo

- **Botão Exportar removido** (decisão do fundador, doc06) — não é argumento de venda no piloto.
- **"Comando por voz" (pergunta em linguagem natural, ex. "quanto faturei essa semana") é Fase 3** (doc18 §4) — fora desta rodada. O que existe agora é o **Comando textual** (mesmo componente do §3.2), não NLU/voz.
- Workload/produtividade completo = preview (apontamento de horas real é Fase 2, doc18).

### O que NÃO está nesta tela (é outro shell)

Montar orçamento (Consultor, Hub · 3.1) · aprovar (Cliente, Portal · 3.4) · inspecionar (Mecânico · 3.6) · configuração de IA/usuários (Admin).

---

Os **5 shells estão especificados** (3.1 Hub · 3.2 Comando · 3.3 Ficha/Prontuário · 3.4 Portal · 3.5 Recepção · 3.6 Mecânico · 3.7 Gestor), todos ancorados no que a referência já construiu e revisou (docs 04/06 da pasta de protótipo).

*Próximo: revisar o pipeline em `00-README.md` para decidir o passo seguinte da UX Bible.*
