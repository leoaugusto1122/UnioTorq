# UX Bible — 01 · Fundação: Personas, Arquitetura de Informação e Navegação

**Fase:** UX (journey-first, pré-código) · **Responsável:** Uma (@ux-design-expert) · **Data:** 2026-07-17
**Depende de:** [doc 01 — visão](../../produto/01-visao-do-produto.md), [ADR-001](../../arquitetura/adr/ADR-001-arquitetura-3-camadas.md), [ADR-002](../../arquitetura/adr/ADR-002-memoria-viva.md), [doc 15](../../arquitetura/15-arquitetura-ia-e-admin.md), [doc 17](../../produto/17-funcionarios-digitais.md).

---

## 1. Diagnóstico honesto do protótipo atual

O protótipo (`docs/requisitos/prototipo/`) organiza a navegação como uma **sidebar escura com um ícone por tela**: Lista · Hub · Checklist · Aprovação · Kanban · Dashboard · TV · Nina (8 ícones-módulo).

O problema não é estético — é **conceitual**:

- A tese do produto ([doc 01](../../produto/01-visao-do-produto.md)) é **"o usuário nunca navega entre dezenas de módulos; tudo acontece dentro do Atendimento"**. Uma sidebar de módulos diz o contrário: *"o sistema é uma coleção de ferramentas — escolha uma"*.
- Ela assume **um usuário único que vê todas as telas**. Mas os docs definem **5 atores em 3 devices** com jobs opostos: o mecânico de luva no box não precisa do "Dashboard do Gestor"; o dono não abre o "Checklist mobile".
- Ela transforma a **IA em destino** ("a tela da Nina"). Mas na arquitetura ([ADR-001](../../arquitetura/adr/ADR-001-arquitetura-3-camadas.md), [doc 15 §4](../../arquitetura/15-arquitetura-ia-e-admin.md)) o agente **não é um lugar** — é um trabalhador cujas ações viram **eventos na timeline do Atendimento**.

**Veredito:** a navegação precisa deixar de ser "menu de módulos" e virar **papel + objeto**. As telas atuais não morrem — elas viram **lentes** e **visualizações** do mesmo objeto (o Atendimento).

---

## 2. Princípio-mestre de UX

> **Atendimento soberano · Shells por papel · Inteligência em contexto.**

Três regras que todo wireframe deste Bible obedece:

1. **O Atendimento é o objeto soberano.** Toda superfície é uma de três naturezas: **Coleção** (todos os atendimentos), **Detalhe** (um atendimento, sob a lente de um papel) ou **Agregado** (números rolados por cima de muitos atendimentos). Não existe "módulo solto".
2. **Cada papel tem seu shell.** A casca de navegação é afinada ao job + device + contexto de quem usa. Um sistema, várias entradas — não vários sistemas.
3. **A inteligência aparece onde a decisão acontece.** Rascunho de orçamento inline no Hub; conversas no Inbox da recepção + eventos na timeline; comando do gestor por voz onipresente. Nunca uma aba "IA".

---

## 3. Personas & Jobs-to-be-done

> Fonte: [doc 01 §Perfis](../../produto/01-visao-do-produto.md). Aqui cada ator ganha **contexto de uso** e **job story** — o que ancora o design de cada shell.

### 3.1 Recepção — *"a porta"*
- **Device / contexto:** Desktop, balcão, **alta interrupção** (telefone, cliente na frente, WhatsApp piscando).
- **Job:** *Quando um veículo chega ou um cliente chama no WhatsApp, quero localizar/criar o atendimento em segundos, para não deixar ninguém esperando nem perder o fio da fila.*
- **Dores:** WhatsApp acumula; digitar cadastro do zero; não saber o que está pronto para entrega.
- **Sucesso:** abrir um atendimento por placa em < 5s; a fila do dia sempre visível.

### 3.2 Consultor Técnico — *"o maestro"* ⭐ USUÁRIO PRINCIPAL
- **Device / contexto:** Desktop, sentado, **foco profundo** em um atendimento por vez, alternando vários ao longo do dia.
- **Job:** *Quando o carro está inspecionado, quero transformar o checklist em orçamento com foto e mandar pra aprovação no WhatsApp sem trocar de tela, para fechar mais serviço em menos tempo.*
- **Dores:** pular entre telas quebra o raciocínio; redigir cada recomendação do zero; cliente demora a aprovar.
- **Sucesso:** montar orçamento item-a-item e enviar aprovação **sem sair do Hub**; ver a ação do agente inline.

### 3.3 Mecânico — *"as mãos"*
- **Device / contexto:** **Mobile, offline-first**, no box, **luva + graxa + sol de pátio**, em pé.
- **Job:** *Quando estou inspecionando o carro, quero registrar item, foto e severidade com o mínimo de toques (e ditar por áudio), para não parar o serviço nem perder o achado.*
- **Dores:** "anotar tudo é impossível no meio da graxa"; teclado pequeno; tela apaga no sol.
- **Sucesso:** um toque define severidade V/A/V; áudio vira item; alvos grandes, alto contraste.

### 3.4 Gestor / Dono — *"o olho"*
- **Device / contexto:** Desktop **+ voz**, entre uma coisa e outra, quer resposta **em segundos**, não relatório.
- **Job:** *Quando bate a dúvida "tô no lucro? que carro está parado?", quero perguntar e receber a resposta na hora, para decidir sem navegar em telas.*
- **Dores:** não sabe se está no lucro; mecânico "enrola no box"; dinheiro parado invisível.
- **Sucesso:** painel de saúde num relance + **perguntar por voz** ("quanto faturei essa semana?") de qualquer lugar.

### 3.5 Cliente final — *"o dono do carro"*
- **Device / contexto:** **Link no celular, sem login, sem app**, ansioso pelo carro, leigo em mecânica.
- **Job:** *Quando recebo o orçamento, quero ver a foto da peça, entender o que acontece se eu não fizer, e aprovar item a item pelo celular, para decidir com confiança.*
- **Dores:** não entende jargão; desconfia do valor; não quer instalar nada.
- **Sucesso:** foto grande + "o que acontece se não realizar?" + aprovar/reprovar em toques; uma superfície só (rastreio + aprovação).

### 3.6 Superfícies ambiente (passivas — não são personas)
- **Painel de TV do Cliente** (recepção) e **Painel do Mecânico** (pátio) são **telas de ambiente**: rodam sozinhas, sem interação. São **Agregados projetados numa parede**, não shells navegáveis. Tratadas no design como *displays*, não como app.

---

## 4. Arquitetura de Informação — o objeto no centro

Toda a navegação orbita **um objeto (o Atendimento)** em três naturezas:

```
                        ┌─────────────────────────────┐
                        │        O ATENDIMENTO         │
                        │  (objeto soberano do sistema)│
                        └─────────────────────────────┘
                                     ▲
             ┌───────────────────────┼───────────────────────┐
             │                       │                       │
        COLEÇÃO                   DETALHE                 AGREGADO
   "todos os atendimentos"   "um atendimento,          "números por cima
                              sob a lente de um papel"    de muitos"
             │                       │                       │
      Lista · Kanban          Hub (consultor)          Dashboard (gestor)
      (fila / fluxo)          Checklist (mecânico)     Painel TV (ambiente)
                              Aprovação (cliente)      Painel Box (ambiente)
```

**Consequência:** "Lista", "Hub" e "Checklist" **não são telas irmãs num menu**. São:
- **Lista/Kanban** = a *mesma coleção*, duas visualizações (toggle).
- **Hub / Checklist / Aprovação** = o *mesmo detalhe*, três **lentes** (consultor / mecânico / cliente).
- **Dashboard / Painéis** = *agregados* rolados por cima.

O usuário sempre sabe onde está porque só existem três lugares: **a fila, um atendimento, ou o panorama**.

Além dos três lugares navegáveis, duas **superfícies transversais** atravessam todos os shells:
- **Comando** — busca universal por placa + assistente/voz. Onipresente; não é um "lugar", é como se salta para qualquer objeto ou se pergunta ao sistema (a barra do Gestor, a busca por placa da recepção/consultor).
- **Timeline** — o registro de eventos/fotos/áudio de um Atendimento. Vive dentro do Detalhe, mas é a espinha que torna a **Memória Viva** ([ADR-002](../../arquitetura/adr/ADR-002-memoria-viva.md)) visível.

Juntas, as cinco — **Coleção · Detalhe · Agregado · Comando · Timeline** — são o vocabulário de superfícies do design system (modelo completo no [Modelo de Domínio](../../requisitos/modelo-de-dominio.md)).

---

## 5. Os 5 shells (a navegação por papel)

| Shell | Device | "Casa" (entrada) | Superfície primária | Não vê |
|---|---|---|---|---|
| **Recepção** | Desktop | Fila do dia + busca por placa | Lista/Kanban (toggle) + **Inbox WhatsApp** + Novo Atendimento (Completo/Rápido) | Dashboard financeiro, checklist mobile |
| **Consultor** ⭐ | Desktop | "Meus atendimentos" (split view) | **Hub do Atendimento** (o coração) | — (vê quase toda a operação) |
| **Mecânico** | Mobile (offline) | "Meu box: o que faço agora" | **Checklist/DVI** + iniciar/pausar/finalizar + apontamento | Financeiro, CRM, dashboard |
| **Gestor** | Desktop + voz | Painel de saúde do negócio | **Dashboard** + **Agente Gestor** (barra de comando/voz onipresente) | Detalhe de execução do box |
| **Cliente** | Link (mobile, sem login) | O próprio veículo | **Portal + Aprovação** (uma superfície) | Tudo interno |

### 5.1 Como cada shell navega (não é sidebar de ícones)

**Recepção** — busca por placa dominante no topo (foco automático, mono) · fila como corpo · Inbox de conversas do Recepcionista Digital como segunda aba · botão primário Novo Atendimento. *A recepção vive na Coleção.*

**Consultor (o principal)** — três elementos de navegação, nenhum é "menu de módulo":
1. **Busca por placa global** (comando onipresente) — abre qualquer veículo/atendimento na hora.
2. **Rail de atendimentos** (o lado esquerdo do split view) = a coleção contextual ("minha fila").
3. **Dentro do atendimento:** as etapas (Checklist → Diagnóstico → OS → Orçamento → Aprovação → Execução → Histórico) são um **stepper/progressive disclosure DENTRO do Hub** — não itens de sidebar. O agente aparece **inline** (rascunho de orçamento, eventos na timeline). Kanban e "meu desempenho" são secundários, acessíveis mas fora do caminho principal.

**Mecânico** — sem sidebar. Entra na **fila priorizada do box** ("o que faço agora"); toca um card → abre o Checklist do atendimento (lente mecânico); alvos grandes, um toque = severidade, botão de áudio sempre à mão. Tudo vertical, offline-first.

**Gestor** — entra no **painel de saúde** (faturamento vs meta, gargalos, valor recusado, box parado). A navegação real é a **barra de comando / voz** ("qual carro parado > 3 dias?"), disponível em qualquer lugar. Drill de qualquer número → abre a coleção ou o atendimento.

**Cliente** — sem navegação de app: **uma superfície** com rastreio (estilo FedEx) no topo e aprovação item-a-item abaixo. Rolagem, não abas.

### 5.2 Shells ≠ permissões (o caso da oficina "faz-tudo")

Shell e permissão são **eixos diferentes** — não confundir:
- **Shell** = a *ferramenta* (superfície otimizada pra tarefa + device).
- **Permissão (papel)** = o que o usuário *pode* ver/fazer (RBAC).

A relação é **N-para-N**:
- Um **usuário** tem **um ou mais papéis**; cada papel destrava shells + ações.
- **Oficina grande:** 1 pessoa = 1 papel (a recepção só vê o shell da recepção).
- **Oficina "faz-tudo":** 1 pessoa com papéis [Recepção + Consultor + Gestor] → **shell padrão** (o Consultor) + **alternador de contexto** no topo. Ela monta orçamento no Hub, pula pro Dashboard, tem o Inbox — tudo destravado porque **tem os papéis**.
- Ninguém fica preso a um shell; o shell é a ferramenta certa pra cada momento.

O modelo completo de **Papéis × Shells × Permissões** está no [Modelo de Domínio §4](../../requisitos/modelo-de-dominio.md).

---

## 5.3 Onde vivem os cadastros (Cliente/Veículo)

Não existe "módulo de cadastro". Cliente e Veículo são **operacionais** — nascem no fluxo (Novo Atendimento, importador de onboarding) e são alcançados por dois caminhos, nunca por um item fixo de menu:

- **Comando, ampliado:** a busca por placa (§4) passa a ser **multi-campo** — placa OU nome OU telefone OU CPF — com resultados agrupados (Atendimentos · Clientes · Veículos). É a porta de entrada dominante (recepção sem a placa em mãos, ligação de cliente).
- **Clique em qualquer nome/placa:** no Hub, no rail, num card do Kanban — sempre abre o mesmo Detalhe.

Dois Detalhes novos entram no vocabulário de superfícies:
- **Ficha do Cliente** — dados cadastrais, métricas (visitas/gasto/ticket médio), histórico (atendimentos/faturamento/aprovações), veículos vinculados.
- **Prontuário do Veículo** — identificação, dados técnicos, indicadores de uso, histórico, checklists, fotos.

Ambos reaproveitam o padrão de **peek-drawer** já usado no Kanban/Lista da referência: o Comando abre um resumo rápido com ação "Abrir Ficha/Prontuário Completo →" antes de navegar pra página cheia. O caso raro "ver todos os clientes/veículos" (sem busca específica) é uma ação dentro do próprio Comando — não um item de nav permanente; reaproveita a mesma tabela densa que a Coleção de Atendimentos já usa.

**Dados-mestre/config (Serviços, preços, usuários, catálogo) continuam em Configurações/Admin** — nunca se misturam com Cliente/Veículo, que são operação, não setup.

Detalhe completo, exemplos e o padrão de drawer: [Wireframes 03 §3.3](03-wireframes-lowfi.md).

---

## 6. De-para: onde cada tela do protótipo se encaixa

> As 8 telas atuais **não desaparecem** — elas são reclassificadas dentro do novo IA. Isto é o coração do redesenho.

| Tela atual (protótipo) | Natureza | No novo IA |
|---|---|---|
| Lista de Atendimentos | Coleção | Superfície da Recepção/Consultor: a "fila" |
| Kanban **+ Atendimentos** | Coleção (fluxo) **+ Detalhe** | **Mesma coleção**, um item de nav só; Lista/Kanban/Agenda como toggle interno; clique abre peek-drawer → Hub |
| **Exceções** (item fixo) | Coleção (filtro) | Vira **filtro** dentro da Coleção (Críticos/Atenção/Ag. Peças/Cliente s/ resposta) — sem item fixo de menu (§3.5) |
| Hub do Atendimento | Detalhe · lente consultor | O detalhe do objeto, no shell Consultor |
| Checklist/DVI mobile | Detalhe · lente mecânico | O **mesmo objeto**, lente mecânico, no shell Mobile |
| Link de Aprovação | Detalhe · lente cliente | O **mesmo objeto**, lente cliente, superfície pública |
| Dashboard do Gestor | Agregado | Casa do shell Gestor |
| Painel TV do Cliente | Agregado (ambiente) | Display passivo (recepção) |
| Painel do Mecânico | Agregado (ambiente) | Display/entrada do shell Mecânico |
| **CRM de Clientes** | Coleção + Detalhe | Vira **Comando** (busca multi-campo) + **Ficha do Cliente** (Detalhe) — sem item fixo de menu (§5.3) |
| **Prontuário de Veículos** | Coleção + Detalhe | Vira **Comando** + **Prontuário do Veículo** (Detalhe) — sem item fixo de menu (§5.3) |
| **WhatsApp / "Nina"** | ❌ **não é módulo** | **Deixa de ser "tela"** → vira **Inbox** (shell Recepção) + **eventos na timeline** do Atendimento + **sugestões inline** no Hub |

A última linha é a mudança mais importante: **matamos a "tela da IA"**. A fusão Kanban+Atendimentos, o fim de Exceções como item fixo e o fim de CRM/Prontuário como item fixo (achados ao comparar com os prints reais da referência, 2026-07-17) são a mesma lógica aplicada com mais rigor: nenhuma Coleção/Detalhe pode ter dois endereços, e nenhum estado transversal (Fundação §7) vira módulo permanente.

---

## 7. Inteligência em contexto (como os agentes aparecem)

Regra derivada de [ADR-001](../../arquitetura/adr/ADR-001-arquitetura-3-camadas.md) + [doc 15 §4](../../arquitetura/15-arquitetura-ia-e-admin.md): *o agente não é destino; é evento e sugestão.*

| Funcionário digital ([doc 17](../../produto/17-funcionarios-digitais.md)) | Onde aparece na UX — **não** numa aba "IA" |
|---|---|
| Recepcionista | **Inbox de conversas** (shell Recepção) + cada ação vira **evento na timeline** do Atendimento |
| Consultor | **Rascunho de orçamento/recomendação inline** no Hub — uma sugestão para o humano revisar, nunca um preço final automático |
| Retenção / Cobrança | **Filas de ação** ("clientes a reativar", "a cobrar") dentro dos shells Recepção/Gestor — listas de trabalho, não "tela de IA" |
| Assistente do Mecânico | **Botão de áudio** no Checklist → o áudio vira item estruturado ali mesmo |
| Gestor Digital | **Barra de comando / voz onipresente** — resposta no lugar, não uma página de relatório |

**Teste de sanidade:** se um insight só existe numa aba separada chamada "Inteligência/IA", ele está no lugar errado. Ele deve nascer **onde a decisão acontece**.

---

## 8. O que muda vs. o protótipo (resumo do redesenho)

| Antes (protótipo module-based) | Depois (este Bible) |
|---|---|
| Sidebar de 8 ícones-módulo | Navegação **papel + objeto**; 5 shells |
| Um usuário vê todas as telas | Cada papel entra no **seu** shell (job + device) |
| "Tela da Nina" como módulo | **Some**; vira Inbox + timeline + sugestão inline |
| Etapas do atendimento como telas separadas | **Stepper/progressive disclosure dentro do Hub** |
| Lista e Kanban como itens de menu distintos | **Uma coleção**, duas visualizações (toggle) |
| Risco de aba "Inteligência" | **Proibido**; inteligência sempre em contexto |
| Telas somem no redesenho | Telas **viram lentes/visualizações** do Atendimento |

---

## 9. Próximos passos deste Bible

1. **02 — Jornadas por papel:** mapear o caminho de cada ator ponta a ponta (happy path + exceções: cliente não responde, aguardando peça, item recusado). Uma jornada por shell.
2. **03 — Wireframes low-fi:** esqueleto do **Hub do Consultor** primeiro (é o coração e o mais complexo), depois os demais shells.
3. **04 — High-fi + micro-interações** dos fluxos críticos.
4. **05 — Design System (Atomic):** tokens (reaproveitar Inter + IBM Plex Mono + roxo `#4C3FA5` do [doc 01](../../produto/01-visao-do-produto.md) e [doc 14](../14-marca-e-design.md)) → atoms → molecules → organisms.

**Handoff para @dev só depois do 03 aprovado.**
