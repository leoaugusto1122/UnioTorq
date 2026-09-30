# UX Bible — 02 · Jornadas por Papel

**Fase:** UX (journey-first, pré-código) · **Responsável:** Uma (@ux-design-expert) · **Data:** 2026-07-17
**Depende de:** [01 — Fundação](01-fundacao-personas-ia-navegacao.md).
**Decisão travada:** Hub do Consultor = **split view com fila fixa à esquerda** (escolha do product owner, 2026-07-17).

> Uma jornada por shell. Cada uma segue o mesmo esqueleto: **Gatilho → Passos → Momentos de verdade → Onde o agente aparece (em contexto) → Exceções → Superfície**. As jornadas são **to-be** (o produto que queremos), não o fluxo atual de uma oficina no papel.

---

## Legenda

- **Momento de verdade** = o ponto onde a experiência ganha ou perde o usuário.
- **Agente em contexto** = como o funcionário digital ([doc 17](../../produto/17-funcionarios-digitais.md)) aparece — sempre como evento/sugestão, nunca como aba "IA".
- **Superfície** = qual natureza do objeto Atendimento (Coleção / Detalhe·lente / Agregado).

---

## Jornada 1 — Recepção: *"receber e localizar"*

**Gatilho:** um carro chega ao balcão **ou** um cliente chama no WhatsApp.

**Passos**
1. Recepção digita a **placa** (campo mono, foco automático) na busca dominante.
2. Sistema responde em 2 estados: **veículo conhecido** (mostra histórico, cliente, últimas visitas) ou **novo** (placa auto-preenche marca/modelo via API).
3. Recepção clica **Novo Atendimento** e escolhe o tipo: **Completo** (revisão/diagnóstico) ou **Rápido / Fast Lane** (óleo, alinhamento — mini-fluxo de ~30s).
4. Atendimento entra na **fila do dia** (Coleção), com status e etapa.
5. Mais tarde: quando o carro fica pronto, a recepção vê "Pronto para entrega" nos indicadores e fecha a entrega.

**Momentos de verdade**
- Localizar por placa em **< 5s** (não digitar cadastro do zero).
- A fila sempre visível — a recepção nunca se pergunta "o que está pronto?".

**Agente em contexto**
- O **Recepcionista Digital** responde no WhatsApp 24/7, agenda e confirma. Essas conversas vivem no **Inbox** (segunda aba do shell Recepção), e cada ação vira **evento na timeline** do atendimento correspondente. A recepção humana assume só quando o agente escala (diagnóstico, preço complexo).

**Exceções**
- **Cliente novo** (sem histórico): cadastro mínimo, o resto o agente coleta na conversa.
- **Placa não encontrada na API:** cadastro manual de marca/modelo, sem travar.
- **Fora do horário:** o agente cobre; de manhã a recepção vê a fila que ele já montou.

**Superfície:** Coleção (fila) + Inbox.

---

## Jornada 2 — Consultor: *"do checklist ao WhatsApp"* ⭐ A JORNADA-MÃE

**Gatilho:** o mecânico enviou o checklist/DVI ao consultor.

**Passos** (tudo dentro do **Hub**, split view — sem trocar de tela)
1. Consultor clica o atendimento no **rail esquerdo** (a fila de "meus atendimentos"); o detalhe abre à direita.
2. Revisa **Checklist/DVI** com as fotos e severidades que o mecânico marcou.
3. Monta o **orçamento item a item**: cada item tem descrição em língua de cliente, peça/mão de obra, **foto anexada**, **severidade V/A/V visível no item**, valor e toggle incluir/remover. Total recalcula ao vivo.
4. O **Consultor Digital** oferece um **rascunho de recomendação inline** (transforma a anotação bruta do mecânico em texto que o cliente entende) — o consultor **revisa e ajusta**.
5. Consultor confere o **preço final** (sempre revisão humana — regra rígida do [doc 17](../../produto/17-funcionarios-digitais.md)).
6. Clica **Enviar Orçamento pelo WhatsApp** (1 clique) — costura com a Nina e com o portal do cliente.
7. Acompanha na **timeline** os eventos ("Nina enviou", "Cliente abriu", "Cliente aprovou 2 itens").
8. Com a aprovação, libera a **execução**.

**Momentos de verdade**
- **Nunca sair do Hub** — pular telas quebra o raciocínio do consultor.
- O rascunho do agente economiza tempo, mas **o humano decide o preço** (confiança + responsabilidade legal).
- A foto anexada ao item é o que faz o cliente aprovar.

**Agente em contexto**
- **Consultor Digital:** rascunho de recomendação/orçamento **inline no Hub**, como sugestão a revisar.
- **Recepcionista:** dispara o link de aprovação e conversa a costura no WhatsApp.
- **Timeline:** cada ação de agente é um evento — transparência total.

**Exceções**
- **Item reprovado pelo cliente:** vira registro na fila de **Serviços Recusados** (alimenta retenção + dashboard).
- **Cliente não responde:** entra na **régua** (Assistente de Retenção reofertará depois).
- **Aguardando peça:** o atendimento sinaliza "parado por peça" e conta nos indicadores.
- **Orçamento complexo / diagnóstico sensível:** escala para decisão humana, o agente não fecha sozinho.

**Superfície:** Detalhe · lente **consultor** (o Hub).

---

## Jornada 3 — Mecânico: *"inspecionar sem parar"*

**Gatilho:** há um card na **fila do box** ("o que faço agora").

**Passos** (mobile, offline-first, em pé, de luva)
1. Mecânico abre o shell e vê o **box priorizado** — o próximo carro no topo.
2. Toca o carro da vez → abre o **Checklist/DVI**, itens agrupados por sistema (freios, suspensão, pneus, fluidos…).
3. Por item: **um toque define a severidade V/A/V** (três alvos grandes e coloridos), **foto** (mock de câmera) e **áudio** (ditado).
4. Contadores fixos no topo (X vermelhos · Y amarelos · Z ok) e toggle **"Só problemas"**.
5. **Envia ao consultor** (CTA fixo). Depois **inicia / pausa / finaliza** o serviço e faz o **apontamento de horas**.

**Momentos de verdade**
- **Mínimo de toques** — se anotar demorar mais que num papel, o mecânico não usa (anti-persona do usuário indisciplinado, [doc 01](../../produto/01-visao-do-produto.md)).
- **Alto contraste + alvos grandes** para luva e sol de pátio.

**Agente em contexto**
- **Assistente do Mecânico:** o **áudio vira item estruturado** ali mesmo (severidade + observação); sugere fotos faltantes; classifica a foto (freio/motor/suspensão). O mecânico confirma antes de virar recomendação de venda.

**Exceções**
- **Sem sinal:** trabalha offline, sincroniza depois.
- **Foto ruim no sol:** re-tirar com alvo grande; áudio como plano B.

**Superfície:** Detalhe · lente **mecânico** (Checklist, mobile).

---

## Jornada 4 — Gestor: *"perguntar e decidir"*

**Gatilho:** bate a dúvida — *"tô no lucro? que carro parou? quanto faturei essa semana?"*

**Passos**
1. Gestor entra no **painel de saúde** (faturamento vs meta, ticket médio, funil de aprovação, valor recusado, box parado) — leitura num relance.
2. Ou **pergunta pela barra de comando / voz** ("qual carro parado > 3 dias?") — resposta **no lugar**, sem navegar.
3. Dá **drill** num número (ex.: "Valor Recusado") → abre a Coleção/atendimento correspondente.
4. Opcional: **abre OS por comando de voz**.

**Momentos de verdade**
- **Resposta em segundos, não relatório.** O gestor não navega em telas; ele pergunta.
- A barra de comando é **onipresente** — não uma aba.

**Agente em contexto**
- **Gestor Digital:** interpreta a pergunta e escreve a resposta. **Os números vêm de regra/SQL (camada 1, custo zero)** — a IA só comunica ([ADR-001](../../arquitetura/adr/ADR-001-arquitetura-3-camadas.md)).

**Exceções**
- **Ação que altera dado** (abrir OS, mudar status): pede **confirmação** antes de executar.
- **Pergunta ambígua:** o agente pede um esclarecimento curto.

**Superfície:** Agregado (Dashboard) + comando onipresente.

---

## Jornada 5 — Cliente: *"entender e aprovar"*

**Gatilho:** recebe o **link no WhatsApp**.

**Passos** (celular, sem login, sem app)
1. Abre o link → cabeçalho com oficina, veículo e placa (mono).
2. Vê a **timeline de rastreio** (estilo FedEx/Amazon) do status do carro.
3. Rola até os **itens do orçamento**: cada um com **foto grande**, descrição em língua de cliente, severidade, valor e **"O que acontece se não realizar?"** (expandível).
4. **Aprova / reprova item a item**; o **total recalcula ao vivo**.
5. **Registra o aceite** (nome + timestamp). Pix aparece como **preview "em breve"**.

**Momentos de verdade**
- **Foto + consequência** = o que sobe a taxa de fechamento.
- **Reprovar não grita vermelho** (disciplina de cor: vermelho = risco a cliente/prazo, não "recusado").
- Zero fricção: **nada de instalar ou logar**.

**Agente em contexto**
- Por trás está a costura de Recepcionista/Consultor, mas **o cliente nunca vê "IA"** — ele vê o portal. É o exemplo máximo de inteligência invisível.

**Exceções**
- **Aprova parcial:** os reprovados alimentam a fila de recusados (retenção reoferta depois).
- **Não abre o link:** entra na régua de retenção/lembrete.

**Superfície:** Detalhe · lente **cliente** (Portal + Aprovação, público — uma superfície só).

---

## 6. A costura — o mesmo carro atravessa os 5 papéis

O produto só é coeso se um único veículo flui entre os shells sem perder contexto (o núcleo/Memória Viva é compartilhado — [ADR-002](../../arquitetura/adr/ADR-002-memoria-viva.md)):

```
RECEPÇÃO           MECÂNICO          CONSULTOR            CLIENTE            GESTOR
recebe/localiza →  inspeciona     →  monta orçamento  →  aprova no link  →  vê no painel
(Coleção+Inbox)    (Detalhe·mec)     (Detalhe·consultor)  (Detalhe·cliente)  (Agregado)
      │                 │                   │                   │                │
      └─────────────────┴─── mesma placa, mesmo Atendimento, uma timeline ──────┘
```

**Handoffs (onde um papel passa para o outro):**
- Recepção → Mecânico: atendimento entra na fila do box.
- Mecânico → Consultor: "enviar ao consultor" (checklist vira matéria-prima do orçamento).
- Consultor → Cliente: "enviar no WhatsApp" (link de aprovação).
- Cliente → Consultor: aprovação libera execução; recusa vira fila.
- Tudo → Gestor: cada evento rola para o agregado em tempo real.

---

## 7. As exceções que atravessam tudo (fazem o produto ser real)

Estas três não pertencem a um único papel — são **estados do Atendimento** que aparecem em vários shells. São o que separa um protótipo bonito de um sistema que a oficina confia:

| Estado | Onde nasce | Onde reaparece |
|---|---|---|
| **Cliente não responde** | Consultor envia, cliente não abre | Régua de retenção (agente) · indicador na recepção · funil no dashboard |
| **Aguardando peça** | Consultor/execução | "Veículo parado" nos indicadores · coluna no Kanban · alerta no painel do box |
| **Item recusado** | Cliente reprova no link | Fila de Serviços Recusados · oferta futura da Retenção · "Valor Recusado" clicável no dashboard |

Cada um desses precisa de tratamento de UX explícito nos wireframes (03) — não podem ser "esquecidos" como no protótipo module-based.

---

## 8. Próximo passo

**03 — Wireframes low-fi**, começando pelo **Hub do Consultor** (split view, a jornada-mãe), depois recepção, mecânico, gestor e cliente. Cada wireframe declara seu shell e sua lente do Atendimento.
