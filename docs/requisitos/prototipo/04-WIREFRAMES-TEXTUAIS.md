# 04 — Wireframes Textuais (bloco a bloco)

**Origem:** `03-PLANO-TELAS-E-UX.md` (decisões §10 fechadas) · **Fase:** especificação (pré-código) · **Data:** 2026-07-14
**Objetivo:** descrever cada tela região a região — layout, componentes, conteúdo, estados e interações — no nível necessário para implementar sem ambiguidade.

> Convenções: `[ ]` botão · `« »` badge/chip · `▸` seção colapsável · `mono` = IBM Plex Mono · cor semântica: 🟢 ok / 🟡 atenção / 🔴 risco (na tela é cor, não emoji).

---

## 0. Shell do app (moldura comum às telas de operação)

```
┌────┬──────────────────────────────────────────────────────────┐
│ U  │  [🔍 busca por placa/cliente..............]   [+ Novo ▾]  │  ← topbar
│    ├──────────────────────────────────────────────────────────┤
│ ▤  │                                                          │
│ ▦  │                                                          │
│ ▧  │                  CONTEÚDO DA TELA                        │
│ ▨  │                                                          │
│    │                                                          │
│ ⚙  │                                                          │
└────┴──────────────────────────────────────────────────────────┘
 sidebar
```

- **Sidebar** (`#111827`, fixa, ~64px): logo `U` no topo; ícones (com tooltip): **Lista** · **Kanban** · **Dashboard** · **Painel TV**; engrenagem no rodapé. Item ativo com barra de marca `#4C3FA5`.
- **Topbar:** busca global por placa/cliente (campo mono à esquerda) + botão **[+ Novo ▾]** (menu: *Atendimento Completo* / *Atendimento Rápido*).
- Telas **mobile** (Checklist, Aprovação) e **WhatsApp** e **TV** abrem **fora do shell**, em device/tela cheia.

---

## 1. Lista de Atendimentos

```
┌──────────────────────────────────────────────────────────────┐
│ Atendimentos                                     [+ Novo ▾]   │
│ ┌──────┐┌──────────┐┌───────────┐┌───────────────┐           │
│ │Abertas││Aguard.   ││Prontas p/ ││Veículos       │  ← indicadores
│ │  12  ││aprov.  4 ││entrega  3 ││parados     2  │           │
│ └──────┘└──────────┘└───────────┘└───────────────┘           │
│ «Todos» «Aberto» «Aguard. aprov.» «Executando» «Pronto»  🔍  │  ← filtros
│──────────────────────────────────────────────────────────────│
│ PLACA     CLIENTE        VEÍCULO      STATUS      ETAPA   R$  │  ← header tabela
│ ABC1D23   João Ribeiro   Gol 1.6      «Aguard.»   2h+ 🟡  890 │
│ EFG2H45   Maria Souza    Onix         «Executando» 40min  1.240│
│ ...                                                          │
└──────────────────────────────────────────────────────────────┘
```

**Blocos**
1. **Título + [+ Novo ▾]** (menu Completo/Rápido — Rápido abre o mini-fluxo, §1b).
2. **Indicadores (4 bento pequenos):** Abertas · Aguardando aprovação · Prontas p/ entrega · **Veículos parados** (inclui Aguardando Peças — Fix14 #6).
3. **Filtros (chips)** por status + busca local.
4. **Tabela densa:** Placa(mono) · Cliente · Veículo · Status(badge) · Etapa/tempo(microcopy) · Valor(mono, à direita) · (Consultor em tela larga).

**Estados:** linha com alerta de tempo em 🟡 ("2h+ sem resposta"); "parado/aguardando peça" no indicador; hover destaca a linha; vazio: "Nenhum atendimento — comece em [+ Novo]".
**Interações:** clique na linha abre o **Hub**; chips filtram; busca por placa aceita 2 formatos (Fix14 #4).
**Dados-demo:** lista mockada de ~6 atendimentos, um deles com a `placa`/`cliente`/`veiculo` do dono (o "carro-herói" da narrativa).

### 1b. Fast Lane (mini-fluxo, decisão §10.1)

```
┌───────────────── Atendimento Rápido ─────────────────┐
│  Placa  [ ABC1D23 ]  → 🚗 Gol 1.6 2019 (auto)         │
│  Serviço [ Troca de óleo ▾ ]                          │
│  KM atual [ 82.450 ]                                  │
│  Valor  [ R$ 189,00 ]                                 │
│  ☑ Aprovação verbal do cliente                        │
│                         [ Cancelar ]  [ Gerar OS ]    │
└───────────────────────────────────────────────────────┘
```
- Modal/drawer enxuto. A **placa auto-preenche o veículo** (mock). ~30s, sem checklist. Ao "Gerar OS", volta pra Lista com o novo atendimento no topo («Executando»).
- Mensagem do valor: só o essencial; sem peso de ERP (doc 04).

---

## 2. Hub do Atendimento ⭐

```
┌───────────┬──────────────────────────────────────────────────┐
│ LISTA      │  Gol 1.6 2019 · ABC1D23        «Aguard. aprov.»  │
│ (split)    │  João Ribeiro · (44) 9....       ⏱ 2h 14min      │
│            │ ┌───────────┐┌───────────┐┌────────────────────┐ │
│ ▸ ABC1D23  │ │ Cliente   ││ Veículo   ││ Resumo financeiro  │ │  ← bento
│   Gol      │ │ João R.   ││ Gol 1.6   ││ Total  R$ 890,00   │ │
│   «aguard» │ │ 3 visitas ││ 82.450 km ││ Aprovado R$ 0,00   │ │
│            │ └───────────┘└───────────┘└────────────────────┘ │
│   EFG2H45  │ ▸ Checklist/DVI   ▸ Diagnóstico                  │
│   Onix     │ ▾ ORÇAMENTO                                      │
│   «exec»   │  ┌────────────────────────────────────────────┐ │
│            │  │🔴 Pastilha diant. gasta  [foto] R$ 320  ☑  │ │  ← item
│            │  │🔴 Disco empenado         [foto] R$ 470  ☑  │ │
│            │  │🟡 Filtro de ar sujo      [foto] R$ 100  ☐  │ │
│            │  └────────────────────────────────────────────┘ │
│            │            [ Enviar Orçamento pelo WhatsApp ]    │  ← CTA marca
│            │ ── Timeline ────────────────────────────────────│
│            │  21:50  Nina agendou 08:30                       │
│            │  11:05  Nina enviou orçamento ao cliente         │
│            │  11:31  Cliente aprovou 2 itens                  │
└───────────┴──────────────────────────────────────────────────┘
```

**Blocos**
1. **Split view:** coluna esquerda = lista compacta (placa mono + status); direita = detalhe do selecionado (RF-Hub-01).
2. **Cabeçalho:** veículo + placa(mono) + status; cliente + telefone; **timer da etapa**.
3. **Bento (3 cards):** Cliente (nome, nº visitas) · Veículo (modelo, km — auto por placa) · **Resumo financeiro** (Total / Aprovado, recalcula ao vivo).
4. **Seções ▸ colapsáveis:** Checklist/DVI · Diagnóstico · **Orçamento (aberta)** · Aprovação · Histórico (progressive disclosure).
5. **Orçamento item a item:** cada item = **severidade colorida no próprio item (Fix14 #1)** + descrição em língua de cliente + `[foto]` (thumbnail) + valor(mono) + checkbox incluir. Total no bento recalcula.
6. **CTA [Enviar Orçamento pelo WhatsApp]** (destaque de marca) — costura com Nina e Aprovação (RF-Hub-06).
7. **Timeline inteligente:** eventos, com **ações da Nina marcadas** (RF-Hub-05, doc 05).

**Estados:** item incluído/removido muda total; severidade define cor da faixa do item; status muda badge; inline edit em valor/descrição (RF-Hub-07).
**Interações:** selecionar atendimento à esquerda troca o detalhe; expandir/colapsar seções; toggle item; clicar foto abre overlay; enviar WhatsApp mostra confirmação ("orçamento enviado — ver na conversa da Nina").
**Fix14:** #1, #3, #5.

---

## 3. Checklist / DVI mobile

```
        ┌───────────────────────────┐
        │ ◀  Checklist · Gol ABC1D23│  ← header sticky
        │ 🔴 2   🟡 1   🟢 8   [Só probl.]│  ← contadores + toggle
        ├───────────────────────────┤
        │ FREIOS                     │
        │ ┌───────────────────────┐ │
        │ │ Pastilha dianteira    │ │
        │ │ [ 🟢 ][ 🟡 ][ 🔴 ]    │ │  ← seletor severidade (alvos grandes)
        │ │ [📷 foto] [🎙 áudio]  │ │
        │ │ obs: 3mm, no limite   │ │
        │ └───────────────────────┘ │
        │ ┌───────────────────────┐ │
        │ │ Disco dianteiro  ...  │ │
        │ └───────────────────────┘ │
        │ SUSPENSÃO ...             │
        ├───────────────────────────┤
        │   [ Enviar ao consultor ] │  ← footer sticky
        └───────────────────────────┘
```

**Blocos**
1. **Header sticky:** voltar + veículo/placa; **contadores 🔴🟡🟢**; toggle **"Só problemas"**.
2. **Grupos por sistema** (Freios, Suspensão, Pneus, Fluidos…).
3. **Item-card:** nome + **seletor de severidade (3 alvos grandes coloridos — Fix14 #1)** + `[📷 foto]` `[🎙 áudio]` + observação (o áudio "vira texto" — Agente do Mecânico).
4. **Footer sticky:** `[ Enviar ao consultor ]` + selo "funciona offline".

**Estados:** item selecionado colore a borda/fundo; "Só problemas" oculta os 🟢; foto anexada mostra thumbnail; áudio gravando mostra onda (mock).
**UX crítica (Fix14 #8):** **alto contraste**, **alvos de toque grandes** (luva + sol); botões de severidade ocupam largura confortável; fontes grandes.
**Interações:** um toque define severidade; `📷` abre overlay de câmera mock; `🎙` simula ditado que preenche a obs.
**Fix14:** #1 (crítico), #8.

---

## 4. Link de Aprovação (portal do cliente)

```
        ┌───────────────────────────┐
        │ Auto Center Sarandi        │  ← header (sem login)
        │ Gol 1.6 · ABC1D23          │
        ├───────────────────────────┤
        │ ● Recebido ─● Inspeção ─○ Aprovação ─○ Pronto │ ← timeline (rastreio)
        ├───────────────────────────┤
        │ Seu orçamento              │
        │ ┌───────────────────────┐ │
        │ │ [FOTO grande da peça] │ │
        │ │ Pastilha dianteira    │ │
        │ │ 🔴 Precisa trocar     │ │
        │ │ ▸ O que acontece se   │ │  ← expander (consequência)
        │ │   não realizar?       │ │
        │ │ R$ 320,00   [Aprovar]│ │
        │ └───────────────────────┘ │
        │ ┌───────────────────────┐ │
        │ │ Disco ...  R$ 470  [✓]│ │
        │ │ Filtro ... R$ 100 [Aprovar]│
        │ └───────────────────────┘ │
        ├───────────────────────────┤
        │ Total aprovado: R$ 790,00 │  ← barra fixa
        │ [ Confirmar aprovação ]   │
        │ [ Pagar com Pix ] em breve│  ← preview desabilitado (§10.2)
        └───────────────────────────┘
```

**Blocos**
1. **Header sem login:** oficina + veículo + placa(mono).
2. **Timeline de rastreio (FedEx/Amazon):** etapa atual destacada (doc 14 acerto).
3. **Itens do orçamento:** **foto grande** + descrição em língua de cliente + severidade + **▸ "O que acontece se não realizar?"** (expander) + valor + toggle **Aprovar/Reprovar**.
4. **Barra fixa no rodapé:** **Total aprovado (recalcula ao vivo)** + `[Confirmar aprovação]` + `[Pagar com Pix] «em breve»` (preview desabilitado, §10.2).
5. Ao confirmar: resumo + **aceite registrado** (nome + IP/timestamp mock).

**Estados:** item aprovado 🟢; reprovado neutro/riscado (nunca 🔴 gritando — Fix14 #3); total dinâmico; após confirmar, timeline avança para "Aprovado".
**Interações:** expandir consequência; alternar aprovação por item; confirmar abre resumo/aceite. Itens reprovados alimentam **Serviços Recusados** (liga ao Dashboard, Fix14 #7).
**Unificação (Fix14 #5):** é **um só link** = portal + aprovação (rolagem/abas, não duas telas).

---

## 5. Kanban

```
┌─────────────────────────────────────────────────────────────────────┐
│ Recebido    Inspeção   Aguard.aprov  Aprovado  Executando  Aguard.Peças│
│ 2 · R$1.2k  1 · R$890  3 · R$2.6k    1·R$1.4k  2·R$3.1k   1·R$540 🔴  │ ← header col: contagem + R$
│ ┌───────┐   ┌───────┐  ┌───────┐     ...                              │
│ │ABC1D23│   │EFG2H45│  │HIJ3K67│                                      │
│ │Gol    │   │Onix   │  │HB20   │                                      │
│ │40min  │   │1h10   │  │2h+ 🟡 │                                      │
│ └───────┘   └───────┘  └───────┘                                      │
│  (arrasta) ───────────────────────────────────────────────────►       │
├─────────────────────────────────────────────────────────────────────┤
│ ▸ Exceções (3):  aguardando peça · cliente não responde · atraso      │
└─────────────────────────────────────────────────────────────────────┘
```

**Blocos**
1. **Colunas:** Recebido · Inspeção · Aguardando Aprovação · Aprovado · Executando · Finalizado · Entregue **+ Aguardando Peças**.
2. **Cabeçalho de coluna:** contagem + **R$ estimado** (doc 14 acerto principal).
3. **Cards densos:** placa(mono) · veículo · tempo na coluna(microcopy) · badge de alerta (disciplina de cor).
4. **Painel ▸ Exceções:** aguardando peça · cliente não responde · atraso · retrabalho.

**Estados:** "Aguardando Peças" marca 🔴 e conta como **parado** nos indicadores (Fix14 #6); tempo alto em 🟡/🔴 conforme risco.
**Interações (§10.3):** **arrastar card muda a coluna e recalcula o R$ das colunas ao vivo**; clique no card abre o Hub.
**Fix14:** #6, #3.

---

## 6. Dashboard do Gestor

```
┌───────────────────────────────────────────────────────────┐
│ Dashboard            « Hoje » « Semana » « Mês »           │
│ ┌────────────────┐┌───────────┐┌───────────┐┌───────────┐ │
│ │ Faturamento    ││ Ticket    ││ OS        ││ OS        │ │
│ │ R$ 38.400 / 50k││ médio     ││ abertas   ││ entregues │ │
│ │ ▓▓▓▓▓▓▓░░ 77%  ││ R$ 620    ││    12     ││    28     │ │
│ └────────────────┘└───────────┘└───────────┘└───────────┘ │
│ ┌─────────────────────────┐ ┌───────────────────────────┐ │
│ │ Funil de aprovação      │ │ Faturamento no tempo       │ │
│ │ Enviado   R$ 12.400     │ │  ▁▂▃▅▆▇▅▃  (gráfico)       │ │
│ │ Aprovado  R$ 9.100      │ │                            │ │
│ │ Recusado  R$ 3.300 ▸    │ │                            │ │  ← clicável (Fix14 #7)
│ └─────────────────────────┘ └───────────────────────────┘ │
│ ▸ Serviços Recusados (drill)                               │
└───────────────────────────────────────────────────────────┘
```

**Blocos**
1. **Seletor de período** (Hoje/Semana/Mês).
2. **KPIs bento:** **Faturamento vs meta (barra de progresso — doc 14 acerto)** · Ticket médio · OS abertas · OS entregues.
3. **Funil de aprovação:** Enviado · Aprovado · **Recusado (clicável — Fix14 #7)**.
4. **Faturamento no tempo** (gráfico simples — "relatório básico" do MVP).
5. **Drill Serviços Recusados** (tabela): item · veículo · valor · motivo → oportunidade de reoferta.
6. Workload/box parado como **preview** (apontamento completo é Fase 2).

**Estados:** meta atingida 🟢 / abaixo neutro; recusado em 🟡 (oportunidade, não 🔴 — Fix14 #3).
**Interações:** trocar período re-renderiza; clicar "Recusado" abre o drill.
**Fix14:** #7, #6, #3.

---

## 7. Painel TV da Recepção (modo escuro)

```
┌───────────────────────────────────────────────────────────┐   (fundo escuro)
│  Auto Center Sarandi                            14:32       │
│  ┌───────── EM ATENDIMENTO ─────────┐  ┌── PRÓXIMAS ──┐    │
│  │ Gol   •••1D23   Inspeção   ~15:30 │  │ Onix  •••2H45 │    │
│  │ HB20  •••3K67   Executando ~16:00 │  │ Argo  •••4L89 │    │
│  └───────────────────────────────────┘  └───────────────┘    │
│  ┌───────────── EM MANUTENÇÃO (fotos) ─────────────────┐     │
│  │        [ slide de foto de peça/serviço ]  ● ○ ○      │     │  ← carrossel auto
│  └──────────────────────────────────────────────────────┘     │
│  (ranking de equipe: OFF por padrão)                           │
└───────────────────────────────────────────────────────────┘
```

**Blocos**
1. **Cabeçalho:** nome da oficina + relógio.
2. **Fila "Em atendimento" / "Próximas":** veículo + **placa parcial (LGPD)** + etapa + previsão de entrega.
3. **Carrossel "Em manutenção":** slide de fotos (fricção passiva de venda) com auto-rotate.
4. **Ranking de equipe:** **desligado por padrão, configurável** (Fix14 #2).

**Estados:** modo escuro, tipografia grande (legível a distância), alto contraste; **rotação automática + auto-refresh** (Fix14 #9); sem interação (passiva).
**LGPD:** dados anonimizados (placa parcial/apelido).
**Fix14:** #2, #9, #3.

---

## 8. Mapa de dados-demo por tela

| Campo `dados-demo.js` | Telas que usam |
|---|---|
| `oficina` | Shell, Aprovação, TV, Nina |
| `placa` / `veiculo` | Todas (o "carro-herói") |
| `cliente` / `primeiroNome` | Lista, Hub, Aprovação, Nina |
| `horario` | Hub (timeline), Nina |
| itens de orçamento (novo bloco a criar) | Hub, Aprovação, Nina (cartão), Dashboard (recusados) |
| fila de veículos mock (novo bloco) | Lista, Kanban, TV |

> Sugestão: expandir o `dados-demo.js` com um bloco `orcamento[]` (item, severidade, valor, foto) e `fila[]` (placa, veículo, etapa, tempo) — assim as 8 telas compartilham a mesma verdade.

---

## 9. Aceite dos wireframes

Ao aprovar este documento, a especificação está completa para implementação:
- `02` (Nina) + `03` (plano) + `04` (wireframes) + `dados-demo.js` (contrato de dados).
- Ordem de build sugerida: Nina → Hub → Aprovação → Checklist → Lista(+Fast Lane) → Kanban → Dashboard → TV.

*Revise os wireframes. Ajustes de layout/estado se resolvem aqui, no texto, antes de qualquer código.*
