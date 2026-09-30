# 03 — Plano de Funcionalidades e UX (7 telas restantes)

**Origem:** `01-BRAINSTORM-SESSION.md` · Complementa `02-SPEC-TELA-AGENTE-WHATSAPP.md`
**Fase:** especificação (pré-código) · **Data:** 2026-07-14
**Cobre:** as 7 telas fora a do agente WhatsApp (já especificada).

> Legenda de status por tela: **RF** = requisito funcional · **UX** = layout/componentes/estados/interações · **Fix14** = ajustes do doc 14 §3 a aplicar.

---

## 0. Sistema de UX compartilhado (definir uma vez)

**Tokens:** os do `01-BRAINSTORM-SESSION.md §5` (Inter + IBM Plex Mono, roxo `#4C3FA5`, neutros, semânticos verde/âmbar/vermelho).

**Componentes reutilizáveis (doc 01):** Split View · Drawers · Bento Cards · Timeline inteligente · Status Badges · tabelas densas · Inline Edit · Progressive Disclosure · Device Frame (mobile).

**Regras transversais:**
- **Placa sempre em mono** e aceita Mercosul (`ABC1D23`) e antigo (`ABC-1234`) — Fix14 #4.
- **Disciplina de cor** — Fix14 #3: **vermelho = risco a cliente/prazo**; âmbar = atenção operacional. Nunca vermelho para workload ou "recusado".
- **Microcopy acionável** (doc 14): todo número tem contexto ("2h+ sem resposta", "1 fornecedor atrasado").
- **Sem emojis / Calm Design** (doc 01) nas telas de operação. (A tela do cliente/WhatsApp é a exceção de tom, já tratada.)
- **Navegação:** sidebar escura fixa (`#111827`) com os ícones das telas de operação. Telas mobile e do cliente abrem em device frame.

---

## 1. Lista de Atendimentos

**Objetivo:** porta de entrada da operação; localizar um veículo por placa e abrir o atendimento em segundos; ver a fila do dia.
**Persona/Device:** Recepção / Consultor · Desktop.

**RF**
- **RF-Lista-01** — Busca dominante por **placa** (campo mono, foco automático), com fallback por cliente/veículo.
- **RF-Lista-02** — Tabela densa de atendimentos: Placa · Cliente · Veículo · Status (badge) · Etapa/tempo · Valor · Consultor.
- **RF-Lista-03** — Filtros por status e período (chips) + ordenação por tempo na etapa.
- **RF-Lista-04** — Botão primário **Novo Atendimento** com escolha **Completo** ou **Rápido (Fast Lane)** (doc 01).
- **RF-Lista-05** — Faixa de indicadores rápidos no topo: Abertas · Aguardando aprovação · Prontas para entrega · **Veículos parados** (inclui "Aguardando Peças" — Fix14 #6).
- **RF-Lista-06** — Clique na linha abre o **Hub do Atendimento**.

**UX**
- Layout: barra de busca + indicadores (bento pequeno) no topo; tabela densa ocupando o corpo; ação primária no canto.
- Estados: linha com microcopy de alerta ("2h+ sem resposta") em âmbar; badge de status por etapa; valor alinhado à direita em mono.
- Interação: hover destaca linha; Fast Lane abre um mini-fluxo enxuto (placa, serviço, km, valor).

**Fix14:** #4 (placa 2 formatos), #6 (parado inclui peças).

---

## 2. Hub do Atendimento ⭐ (coração)

**Objetivo:** tudo do atendimento numa só tela; montar o orçamento item a item com foto e mandar pra aprovação no WhatsApp sem trocar de contexto.
**Persona/Device:** Consultor · Desktop.

**RF**
- **RF-Hub-01** — **Split view**: lista de atendimentos à esquerda, detalhe do selecionado à direita (doc 14 acerto).
- **RF-Hub-02** — Cabeçalho do atendimento: Cliente · Veículo **auto-preenchido pela placa** · Status · timer da etapa.
- **RF-Hub-03** — Seções em progressive disclosure: Checklist/DVI · Diagnóstico · OS · **Orçamento** · Aprovação · Histórico.
- **RF-Hub-04** — **Orçamento item a item**: cada item tem descrição (língua de cliente), peça/mão de obra, **foto anexada**, **severidade V/A/V visível no item** (Fix14 #1), valor, e toggle incluir/remover. Total dinâmico.
- **RF-Hub-05** — **Timeline inteligente** do atendimento que registra **cada ação da Nina como evento** ("Nina agendou 08:30", "Nina enviou orçamento", "Cliente aprovou 2 itens") — doc 05.
- **RF-Hub-06** — CTA destacado **Enviar Orçamento pelo WhatsApp** (1 clique) — costura com a tela da Nina e com a de Aprovação.
- **RF-Hub-07** — Inline edit em valores e descrições.

**UX**
- Layout: split view; à direita, bento cards (Cliente / Veículo / Resumo financeiro) no topo, seções em accordion/drawers abaixo, timeline lateral ou ao pé.
- Estados: severidade colorida por item; badge de status; botão WhatsApp em destaque de marca (`#4C3FA5`).
- Interação: expandir/colapsar seções; anexar foto (mock); toggle de item recalcula total ao vivo.

**Fix14:** #1 (severidade no item), #3 (disciplina de cor), #5 (aprovação é uma face do portal do cliente).

---

## 3. Checklist / DVI mobile

**Objetivo:** o mecânico registra a inspeção com foto/áudio e classifica a severidade; os itens viram matéria-prima do orçamento.
**Persona/Device:** Mecânico · **Mobile (device frame)**.

**RF**
- **RF-Chk-01** — Itens de inspeção agrupados por sistema (freios, suspensão, pneus, fluidos…).
- **RF-Chk-02** — **Seletor de severidade Verde/Amarelo/Vermelho por item** (Fix14 #1 — coração semântico do DVI), com os três alvos grandes e coloridos.
- **RF-Chk-03** — Por item: botão **foto** (mock de câmera), botão **áudio** (ditado que "vira texto" — Agente do Mecânico, doc 05), campo observação.
- **RF-Chk-04** — Contadores fixos no topo (X vermelhos · Y amarelos · Z ok) e toggle **"Só problemas"**.
- **RF-Chk-05** — CTA fixo **Enviar ao consultor**; indicador de "funciona offline" (mock).

**UX**
- Layout mobile: header sticky com contadores; lista de item-cards; footer sticky com CTA.
- Estados: **alto contraste** e **alvos de toque grandes** para luva + sol de pátio (Fix14 #8); considerar **modo escuro**; item vira colorido conforme severidade.
- Interação: um toque define severidade; foto/áudio abrem overlay simples.

**Fix14:** #1 (severidade — crítico), #8 (contraste/toque/dark).

---

## 4. Link de Aprovação (portal do cliente)

**Objetivo:** o cliente, **sem login, no celular**, vê as fotos, entende a consequência, aprova/reprova item a item e registra o aceite.
**Persona/Device:** Cliente final · **Mobile (device frame)**.

**RF**
- **RF-Apr-01** — Abertura **sem login**; cabeçalho com oficina, veículo e placa (mono).
- **RF-Apr-02** — **Timeline estilo rastreio (FedEx/Amazon)** do status do serviço (doc 14 acerto).
- **RF-Apr-03** — Lista de itens do orçamento; cada um com **foto grande**, descrição em língua de cliente, severidade, valor e **"O que acontece se não realizar?"** expandível (doc 14 acerto — sobe taxa de fechamento).
- **RF-Apr-04** — Toggle **Aprovar / Reprovar por item**; **total recalcula ao vivo**; itens reprovados alimentam a fila de **Serviços Recusados** (liga com Dashboard, Fix14 #7).
- **RF-Apr-05** — **Aceite registrado** (nome + IP/timestamp mock — doc 04); Pix como preview opcional (Fase 1, marcado como "em breve").
- **RF-Apr-06** — É **um único link** que unifica portal + aprovação (Fix14 #5): abas/rolagem, não duas superfícies.

**UX**
- Layout mobile: timeline no topo; cards de item com foto proeminente; expander de consequência; barra de total fixa no rodapé com CTA "Aprovar selecionados".
- Estados: item aprovado (verde), reprovado (neutro/riscado — nunca vermelho gritando, Fix14 #3), total dinâmico.
- Interação: expandir consequência; alternar aprovação; confirmar aceite abre resumo.

**Fix14:** #5 (unificar), #7 (recusado alimenta fila), #3 (cor).

---

## 5. Kanban

**Objetivo:** visão de fluxo do pátio; mostrar **dinheiro parado por etapa** e as exceções que travam a operação.
**Persona/Device:** Consultor / Gestor · Desktop.

**RF**
- **RF-Kan-01** — Colunas: Recebido · Inspeção · Aguardando Aprovação · Aprovado · Executando · Finalizado · Entregue, **+ Aguardando Peças**.
- **RF-Kan-02** — Cada coluna com **contagem e R$ estimado no cabeçalho** (doc 14 acerto principal — dono vê dinheiro parado por etapa).
- **RF-Kan-03** — Cards densos: placa (mono) · cliente · veículo · tempo na coluna · badge de alerta.
- **RF-Kan-04** — Aba/painel de **Exceções** (aguardando peça · cliente não responde · atraso · retrabalho).
- **RF-Kan-05** — "Aguardando Peças" conta como **veículo parado** nos indicadores (Fix14 #6). Drag-and-drop pode ser mock (a visão vende; MVP real começa como lista — doc 04).

**UX**
- Layout: colunas horizontais com scroll; cabeçalho de coluna com total R$ + contagem; cards compactos.
- Estados: alertas com **disciplina de cor** (Fix14 #3); tempo na coluna com microcopy.
- Interação: arrastar card (mock) muda coluna; clique abre o Hub.

**Fix14:** #6 (parado), #3 (cor).

---

## 6. Dashboard do Gestor

**Objetivo:** o dono responde em segundos "quanto faturei?" e "que box está parado?".
**Persona/Device:** Gestor · Desktop.

**RF**
- **RF-Dash-01** — KPIs em bento: **Faturamento do período vs meta** (barra de progresso — doc 14 acerto) · Ticket médio · OS abertas · OS entregues.
- **RF-Dash-02** — **Funil de aprovação** (Enviado · Aprovado · Recusado) com **"Valor Recusado" clicável** abrindo a fila de **Serviços Recusados** (Fix14 #7).
- **RF-Dash-03** — Faturamento no tempo (gráfico simples) — escopo de "relatório básico" do MVP (doc 04).
- **RF-Dash-04** — Workload/box parado (visão; apontamento completo é Fase 2 — marcar como preview).

**UX**
- Layout: bento grid de cards; meta vs realizado com barra; funil visual; drill de recusados em tabela.
- Estados: meta atingida/abaixo (cor com disciplina); recusado como oportunidade (âmbar, não vermelho).
- Interação: clicar no valor recusado abre a lista; períodos (hoje/semana/mês).

**Fix14:** #7 (recusado clicável), #6 (parado), #3 (cor).

---

## 7. Painéis de parede — DESMEMBRADO

> **Atualização (2026-07-14):** ao revisar a referência, o "Painel TV" foi desmembrado em **dois** painéis distintos (doc 01 §Perfis), especificados em `05-SPEC-PAINEIS-MECANICO-E-TV.md`:
> - **Painel do Mecânico** (pátio, operacional, "o que faço agora").
> - **Painel de TV do Cliente** (recepção, passivo, venda + alerta de retirada por placa).
>
> A referência ainda tem **CRM de Clientes**, **Prontuário de Veículos** e **Configurações** (fora do inventário original de 8) — a revisar depois. O bloco abaixo é a versão antiga e fica como histórico.

### 7 (histórico). Painel TV da Recepção

**Objetivo:** tela passiva na recepção; o cliente acompanha o próprio veículo e vê fotos de itens em manutenção (fricção passiva de venda); roda o dia todo sem toque.
**Persona/Device:** Passivo (cliente na recepção / equipe) · **TV / Desktop, modo escuro**.

**RF**
- **RF-TV-01** — Fila de veículos por status com **dados anonimizados (LGPD)** — placa parcial/apelido, doc 01.
- **RF-TV-02** — Previsão de entrega e ocupação de boxes.
- **RF-TV-03** — **Slide de fotos** de itens em manutenção (fricção passiva de venda).
- **RF-TV-04** — **Ranking de equipe: configurável e DESLIGADO por padrão** (Fix14 #2 — ranking público permanente gera ressentimento).
- **RF-TV-05** — **Rotação automática de conteúdo + auto-refresh** (Fix14 #9 — roda sem toque).

**UX**
- Layout: **modo escuro**, tipografia grande legível à distância, cards de veículo com placa mono, carrossel de fotos, relógio.
- Estados: alto contraste; alertas com disciplina de cor; foco em fila/entregas/fotos (não em ranking).
- Interação: nenhuma (passiva); transições automáticas.

**Fix14:** #2 (ranking off/config), #9 (rotação/refresh), #3 (cor), + LGPD.

---

## 8. Costura narrativa entre as telas (o mesmo carro atravessa tudo)

`Lista` (busca placa) → `Hub` (monta orçamento com foto) → `Checklist` (de onde a foto veio) → `WhatsApp/Nina` (envia link) → `Aprovação` (cliente aprova) → `Kanban` (carro anda) → `Dashboard` (dono vê faturamento) → `TV` (recepção acompanha). Todos os dados vêm do `dados-demo.js`.

---

## 9. Prioridade de construção sugerida (quando aprovarmos)

1. Hub do Atendimento (coração) · 2. Aprovação (fecha o loop com a Nina) · 3. Checklist · 4. Lista · 5. Kanban · 6. Dashboard · 7. Painel TV.
(A tela da Nina, prioridade máxima, já está especificada em `02`.)

---

## 10. Decisões fechadas (2026-07-14)

1. **Fast Lane:** entra como **fluxo próprio (mini-tela)** — placa, serviço, km, valor, aprovação verbal (~30s).
2. **Pix no Link de Aprovação:** **preview "em breve"** (botão visível, desabilitado, com selo).
3. **Drag-and-drop no Kanban:** **mock funcional** — arrasta o card de verdade e o R$/coluna recalcula.
4. **Modo escuro:** **só no Painel TV**; Checklist do mecânico fica claro de alto contraste (dark como opção futura).
5. **Profundidade:** **wireframe textual por tela** antes de codar → ver `04-WIREFRAMES-TEXTUAIS.md`.

*Próximo: wireframes textuais (doc 04). Só então handoff para implementação.*
