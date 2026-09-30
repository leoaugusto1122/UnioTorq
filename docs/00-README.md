# UnioTorq — Documentação (Índice Mestre)

**Projeto DMS — Sistema Operacional para Pós-Venda Automotivo.** Pacote de documentação fundadora, organizado por área. Consolidado a partir das pesquisas e decisões de julho/2026.

> Nome do produto: **UnioTorq** (padrão de marca "Unio").
> **Regra:** toda documentação vive em `docs/`, organizada por área (abaixo).

---

## Navegação por área

### 📊 `negocio/` — mercado, GTM, custos, riscos, competição
| # | Documento | Conteúdo |
|---|-----------|----------|
| 02 | [pesquisa-de-mercado](negocio/02-pesquisa-de-mercado.md) | Números do setor, concorrentes nacionais/internacionais, gaps |
| 03 | [publico-alvo-e-icp](negocio/03-publico-alvo-e-icp.md) | Segmentação, ICP, personas e anti-personas |
| 07 | [modelo-de-negocio](negocio/07-modelo-de-negocio.md) | Receita em camadas, precificação, unit economics |
| 08 | [riscos-e-mitigacoes](negocio/08-riscos-e-mitigacoes.md) | Riscos mapeados e planos de mitigação |
| 09 | [plano-de-validacao](negocio/09-plano-de-validacao.md) | Validação de campo: visitas, pré-venda, mystery shopping |
| 10 | [custos-detalhados-e-plano-piloto](negocio/10-custos-detalhados-e-plano-piloto.md) | Custos de infra/IA (R$), cobrança do fundador, preço regional |
| 13 | [traducao-inspiracoes-brasil](negocio/13-traducao-inspiracoes-brasil.md) | Veredito feature-a-feature Tekion/ServiceTitan/Tekmetric → Brasil |
| ✚ | [modelo-de-custo](negocio/modelo-de-custo.md) | Custo real (infra+IA+dev+pró-labore) + margem da empresa |
| ✚ | [analise-concorrencia-2026-07](negocio/analise-concorrencia-2026-07.md) | Deep-dive de concorrentes (Maringá local + nacional + gaps) |

### 🧭 `produto/` — visão, roadmap, escopo, portfólio de agentes
| # | Documento | Conteúdo |
|---|-----------|----------|
| 01 | [visao-do-produto](produto/01-visao-do-produto.md) | Visão, conceito central (Atendimento soberano), proposta de valor |
| 04 | [mvp-e-roadmap](produto/04-mvp-e-roadmap.md) | Corte do MVP, fases de evolução, critérios de avanço |
| 05 | [agentes-de-ia](produto/05-agentes-de-ia.md) | Portfólio de agentes autônomos (o organograma digital) |
| 11 | [roadmap-agent-first](produto/11-roadmap-agent-first.md) | Roadmap por fase com o agente como core |
| 12 | [zona-de-risco-escopo](produto/12-zona-de-risco-escopo.md) | Guardrails de escopo: zonas verde/amarela/vermelha |
| 17 | [funcionarios-digitais](produto/17-funcionarios-digitais.md) | Spec por agente (7 perguntas + ROI + camada) |
| 18 | [fases-e-estimativas-build](produto/18-fases-e-estimativas-build.md) | Fases de build (re-baseline) + estimativas Claude Code + Codex |

### 🏗️ `arquitetura/` — arquitetura técnica + decisões (ADR)
| # | Documento | Conteúdo |
|---|-----------|----------|
| 06 | [arquitetura-e-integracoes](arquitetura/06-arquitetura-e-integracoes.md) | Stack técnica, integrações (fiscal, pagamento, placa, WhatsApp) |
| 15 | [arquitetura-ia-e-admin](arquitetura/15-arquitetura-ia-e-admin.md) | Controle de IA (cotas, backend comanda), admin, agentes como skills |
| ADR-001 | [3 camadas](arquitetura/adr/ADR-001-arquitetura-3-camadas.md) | Regras→Automação→IA; "IA por último" |
| ADR-002 | [Memória Viva](arquitetura/adr/ADR-002-memoria-viva.md) | Motor de Conhecimento (4 camadas + Motor de Raciocínio); o fosso |
| ADR-003 | [Persistência](arquitetura/adr/ADR-003-persistencia.md) | Postgres-first, grafo relacional, AGE como porta futura |

### 📐 `requisitos/` — requisitos de software (specs funcionais)
| Item | Conteúdo |
|------|----------|
| [modelo-de-dominio](requisitos/modelo-de-dominio.md) | Objetos + ciclo de vida + matriz "Quem faz?" + Papéis×Shells×Permissões + grafo |
| [prototipo/](requisitos/prototipo/) | Specs de tela + protótipo HTML piloto (8 telas) |

### 🎨 `design/` — marca e design visual
| # | Documento | Conteúdo |
|---|-----------|----------|
| 14 | [marca-e-design](design/14-marca-e-design.md) | Decisão de marca (padrão Unio), revisão do protótipo |

- [ux-bible/](design/ux-bible/) — **UX Bible** (journey-first): Fundação (personas+IA+navegação) · Jornadas · Wireframes (em construção)

### ⚙️ `operacao/` — onboarding, dados, LGPD
| # | Documento | Conteúdo |
|---|-----------|----------|
| 16 | [operacao-onboarding-dados](operacao/16-operacao-onboarding-dados.md) | Onboarding por planilha, base de conhecimento, LGPD, backup |

### 🗂️ `sessoes/` — sessões de brainstorm / decisão
- [2026-07-16-arquitetura-3-camadas](sessoes/2026-07-16-arquitetura-3-camadas/) — SESSION.md + DECISIONS.yaml + OUTCOMES.yaml

### 📖 `guias/`
- [CLAUDE-CODE-GUIDE](guias/CLAUDE-CODE-GUIDE.md) — guia de desenvolvimento assistido

---

## Como usar

1. **Antes de codar:** rodar o [plano de validação](negocio/09-plano-de-validacao.md) e fechar as specs (`requisitos/`).
2. **Durante o desenvolvimento:** [mvp-e-roadmap](produto/04-mvp-e-roadmap.md) é o contrato de escopo.
3. **Revisão trimestral:** [pesquisa-de-mercado](negocio/02-pesquisa-de-mercado.md), [riscos](negocio/08-riscos-e-mitigacoes.md) e [custos](negocio/10-custos-detalhados-e-plano-piloto.md) têm dados datados — revalidar.

## Decisões-chave já tomadas (registro)

- **O agente é o sistema:** núcleo de dados próprio; integrações são diferencial, não requisito.
- **Plataforma por baixo, produto vertical por cima:** vender "sistema pra oficina", não "plataforma de agentes".
- **Nicho de entrada:** oficina mecânica independente / centro automotivo (NÃO funilaria/sinistro — território da Cilia).
- **WhatsApp:** Evolution API na validação e primeiros clientes; migração planejada para API oficial Meta quando a receita depender do canal.
- **Validação antes de código:** substituído piloto único por validação em lote com pré-venda paga. *(Em reavaliação: pivô para MVP expandido como demo de venda — ver sessão de 2026-07-16.)*
- **IA por último (3 camadas):** ~95% do trabalho é regra/automação (0 token); IA só interpreta/gera. Ver [ADR-001](arquitetura/adr/ADR-001-arquitetura-3-camadas.md).
- **IA é copiloto de decisão, humano é comandante:** a IA interpreta/julga/recomenda; nunca executa ação consequente sozinha. Ver [ADR-001 §cláusula 5](arquitetura/adr/ADR-001-arquitetura-3-camadas.md).
- **Shell ≠ permissão:** navegação por papel + RBAC N-para-N (uma pessoa pode ter vários papéis). Ver [Modelo de Domínio](requisitos/modelo-de-dominio.md).
