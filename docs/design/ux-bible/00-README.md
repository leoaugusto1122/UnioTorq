# UX Bible — UnioTorq

> **Fase UX (jornada antes do código).** Este é o pacote de design que traduz a arquitetura fechada (ADR-001/002/003, doc 01) em **experiência de uso** — antes de escrever qualquer HTML/React.
>
> Responsável: **Uma** (@ux-design-expert). Metodologia: **journey-first** — arquitetura da informação → jornadas → wireframe low-fi → high-fi → design system (Atomic Design).

---

## Por que existe

O protótipo atual (`docs/requisitos/prototipo/`) é **module-based**: uma sidebar com um ícone por tela. Isso contradiz o princípio central do produto — **"o usuário nunca navega entre módulos; tudo acontece dentro do Atendimento"** ([doc 01](../../produto/01-visao-do-produto.md)). Antes de codar o MVP expandido, precisamos redesenhar a navegação para ser **Atendimento-centric + por papel**, com a **inteligência em contexto** (não em aba separada).

Este Bible é a fonte da verdade de UX. O protótipo antigo vira **referência histórica**, não contrato.

---

## Princípio-mestre (a tese de UX)

1. **Atendimento soberano** — o Atendimento é o objeto central; as "telas" são **lentes** sobre ele, não módulos irmãos.
2. **Shells por papel** — cada ator (recepção / consultor / mecânico / gestor / cliente) tem uma casca de navegação afinada ao seu **job + device + contexto**. Não é "5 apps"; é **um sistema que mostra a cada pessoa a superfície certa**.
3. **Inteligência em contexto** — o agente não é um lugar que se visita; é um trabalhador cujas ações **aparecem como eventos e sugestões dentro do Atendimento**. Nunca uma aba "IA".

---

## Sequência de entrega (fases do Bible)

| # | Documento | Conteúdo | Status |
|---|-----------|----------|--------|
| 01 | [Fundação](01-fundacao-personas-ia-navegacao.md) | Personas + Jobs-to-be-done + Arquitetura de Informação + modelo de navegação (shells) | ✅ escrito |
| 02 | [Jornadas por papel](02-jornadas-por-papel.md) | Mapa de jornada de recepção / consultor / mecânico / gestor / cliente (happy path + exceções) | ✅ escrito |
| 03 | [Wireframes low-fi](03-wireframes-lowfi.md) | Esqueleto de cada superfície — 5 shells + Comando + Ficha/Prontuário (3.1–3.7) | ✅ escrito, aguardando aprovação |
| 04 | *High-fi + micro-interações* (a criar) | Alta fidelidade dos fluxos críticos | ⏳ |
| 05 | *Design System* (a criar) | Tokens + Atomic Design (atoms → molecules → organisms). Reaproveita tokens do [doc 01 §Princípios](../../produto/01-visao-do-produto.md) e [doc 14 — marca](../14-marca-e-design.md) | ⏳ |

**Regra:** só há handoff para implementação (@dev) depois do 03 aprovado. O código não começa antes da jornada fechar.

### Decisões de UX travadas
- **Hub do Consultor = split view com fila fixa à esquerda** (2026-07-17). Rail de "meus atendimentos" sempre visível; detalhe à direita; agente inline.
- **Hub mantém abas, não vira stepper** (2026-07-17) — a referência já implementa Geral/Timeline/Inspeção/Orçamento/Comunicação/Financeiro como abas testadas; ganha uma faixa de progresso somente-leitura por cima.
- **Comando multi-campo substitui a busca isolada por placa** (2026-07-17) — placa/nome/CPF/telefone num único `CommandDialog` (shadcn/cmdk), compartilhado entre Recepção/Consultor/Gestor; voz completa é Fase 3 (fora desta rodada).
- **CRM de Clientes e Prontuário de Veículos deixam de ser itens fixos de sidebar** (2026-07-17) — viram Ficha do Cliente / Prontuário do Veículo (Detalhe), alcançados só via Comando ou clique em nome/placa; conteúdo 100% herdado da referência.
- **Kanban + Atendimentos fundem-se num item de nav só** (2026-07-17) — mesma Coleção, Lista/Kanban/Agenda como toggle interno.
- **"Exceções" e "Agente WhatsApp" deixam de ser itens fixos de sidebar** (2026-07-17) — viram filtro da Coleção e aba Inbox, respectivamente.
- **Segmentação de Cliente (VIP/Recorrente/Novo) vira regra determinística** (2026-07-17, [Modelo de Domínio §1.1](../../requisitos/modelo-de-dominio.md)) — constantes (N visitas, X% gasto) ficam em aberto pra calibrar com dado real do piloto.

---

## Insumos (o que este Bible consome)

- **Visão & atores:** [doc 01 — visão do produto](../../produto/01-visao-do-produto.md) (Atendimento soberano, perfis, tipos de atendimento).
- **Arquitetura:** [ADR-001 — 3 camadas](../../arquitetura/adr/ADR-001-arquitetura-3-camadas.md), [ADR-002 — Memória Viva](../../arquitetura/adr/ADR-002-memoria-viva.md), [doc 15 — IA e admin](../../arquitetura/15-arquitetura-ia-e-admin.md).
- **Funcionários digitais:** [doc 17](../../produto/17-funcionarios-digitais.md) (como cada agente aparece na experiência).
- **Protótipo antigo (referência):** [requisitos/prototipo/](../../requisitos/prototipo/) — specs de tela e wireframes textuais que serão **reencaixados** no novo IA, não descartados.
- **Marca:** [doc 14 — marca e design](../14-marca-e-design.md).

---

## Como usar

1. Ler a **Fundação (01)** primeiro — ela define os shells e a lógica de navegação que todo o resto assume.
2. Cada wireframe/tela deve declarar **a qual shell pertence** e **qual lente do Atendimento representa**.
3. Nenhuma tela nova pode reintroduzir o padrão "módulo na sidebar" sem revisar a tese.
