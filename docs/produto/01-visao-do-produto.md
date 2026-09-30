# 01 — Visão do Produto

## Declaração de visão

Construir o **Sistema Operacional do Pós-Venda Automotivo brasileiro**: uma plataforma cloud-native onde toda a operação da oficina gira em torno de uma única entidade — o **Atendimento** — e onde uma equipe de **funcionários digitais (agentes de IA)** executa o trabalho repetitivo de recepção, comunicação, cobrança e retenção.

Referências de produto: Tekion, Shop-Ware, Tekmetric, Shopmonkey (operação), Linear (design), HubSpot (CRM), rastreamento FedEx/Amazon (portal do cliente).

## Frase de posicionamento

> **"O único sistema de oficina brasileiro onde a inspeção com foto vira orçamento, o orçamento vira aprovação no WhatsApp, e uma equipe de funcionários digitais faz o pós-venda sozinha."**

Nenhum player nacional mapeado (Ultracar, AutoPro, Oficina Integrada, WorkMotor, GestãoClick, Wüst) entrega essa frase inteira hoje (jul/2026).

## Conceito central: o Atendimento soberano

O usuário nunca navega entre dezenas de módulos. Tudo acontece dentro do Atendimento:

```
Atendimento
├── Cliente
├── Veículo (auto-preenchido por placa)
├── Checklist / DVI (fotos, áudio)
├── Diagnóstico
├── Ordem de Serviço
├── Orçamento (com aprovação item a item)
├── Aprovação digital (link WhatsApp + assinatura)
├── Execução
├── Histórico
├── Financeiro (fase 2)
└── CRM / Agentes
```

Validação externa do conceito: a Tekion (avaliada em US$ 4 bi+) usa exatamente essa arquitetura — todos os módulos compartilham **um núcleo de dados, um login, um sistema**; sem integrações internas, sem dado duplicado. É o mesmo princípio decidido nas nossas conversas: **o agente é o sistema** — ele não consulta sistemas de terceiros, ele opera sobre dados que são nossos.

## Estrutura da plataforma (DMS + ERP + CRM sobre a Memória Viva)

O produto **não é "um ERP"** — é uma plataforma que combina três categorias funcionais, todas escrevendo e lendo **um núcleo/Memória Viva** compartilhado:

| Categoria | Cobre | Quem usa |
|---|---|---|
| **DMS** (coração operacional) | Atendimento, OS, checklist, diagnóstico, orçamento, execução, histórico | Mecânico + consultor |
| **ERP** (back-office) | Financeiro, estoque, compras, fiscal, comissões, RH | Gestor/dono |
| **CRM** (relacionamento) | WhatsApp, campanhas, retenção, recusados, pós-venda | Recepção + agentes |

Sob elas: **Motor de Conhecimento → Memória Viva → Funcionários Digitais** (ver [ADR-002](../arquitetura/adr/ADR-002-memoria-viva.md)).

**Três disciplinas (para o reframe não desvirtuar o produto):**
- **Categorias organizam escopo, não viram silos.** A UX continua unificada no Atendimento — o usuário não navega entre módulos.
- **Categorias não são o pitch.** Internamente é DMS/ERP/CRM; para o cliente vende-se **resultado** (carro entregue, orçamento aprovado), nunca "plataforma/IA".
- **"Plataforma" não reabre a zona vermelha.** Cada categoria é "essencial de oficina", não "full ERP/CRM" — os cortes de escopo do [doc 12](12-zona-de-risco-escopo.md) e [doc 04](04-mvp-e-roadmap.md) permanecem.

## Tipos de Atendimento

1. **Atendimento Completo** — Recepção → Checklist/DVI → Diagnóstico → OS → Orçamento → Aprovação → Execução → Entrega. Para revisões, diagnósticos e serviços complexos.
2. **Atendimento Rápido (Fast Lane)** — Placa → Serviço → KM → Valor → aprovação verbal → OS → Execução → Entrega. Para troca de óleo, alinhamento, balanceamento, pneus. Sem checklist obrigatório, mas gera Atendimento Simplificado interno para manter histórico do veículo. A placa auto-preenche o cadastro do veículo via API de consulta.
3. **Garantia** (futuro) — nova OS relacionada ao atendimento anterior.
4. **Atendimento Interno** (futuro) — manutenção de equipamentos, elevadores, ferramentas e veículos próprios.

## Perfis (atores)

| Perfil | Interface principal | Responsabilidades |
|---|---|---|
| Recepção | Web (Lista/Kanban) | Cadastrar atendimento, localizar cliente/veículo, fila, entrega |
| Consultor Técnico | Web (hub do Atendimento) | **Usuário principal.** Orçamento, negociação, WhatsApp, aprovação, execução |
| Mecânico | Mobile (offline-first) | Checklist, fotos, áudio, iniciar/pausar/finalizar serviço; **Painel do Mecânico** (fila do box, "o que faço agora") |
| Gestor | Dashboard + Painel TV + Agente Gestor | Produtividade, faturamento, gargalos, SLA |
| Cliente na recepção | **Painel de TV do Cliente** (passivo) | Acompanha o próprio veículo + vê slide de fotos de itens em manutenção (fricção passiva de venda) — dados anonimizados por LGPD |
| Cliente | Link (sem app) | Acompanhar, ver fotos, aprovar/reprovar item a item, assinar |

## Proposta de valor (argumentos por dor)

| Dor do dono da oficina | Resposta do produto |
|---|---|
| "Perco cliente porque o WhatsApp acumula enquanto atendo" | Agente Recepcionista responde e agenda 24/7 |
| "Cliente demora dias pra aprovar orçamento" | DVI: foto da peça gasta + aprovação em 1 toque no WhatsApp (padrão validado nos EUA: foto/vídeo convertendo em linha de orçamento com trilha de auditoria acelera aprovação) |
| "Não sei se tô no lucro, mecânico enrola no box" | Apontamento de horas, utilização de box, dashboard e Agente Gestor por áudio |
| "Cliente some depois do serviço" | Agente de Retenção: revisão por KM/tempo puxa o cliente de volta |
| "Anotar tudo é impossível no meio da graxa" | Mecânico dita por áudio; agente estrutura no checklist |

## Princípios de design

- **Calm Design**: alta densidade de informação, pouco ruído visual, sem emojis, sem excesso de cor. Referências: Linear, Tekion.
- **O produto funciona apesar do dono, não através dele.** Cada tela que exige disciplina do usuário é churn futuro. Regra prática: se abrir uma OS demorar mais do que anotar num papel, perdemos.
- Componentes: Split View, Drawers, Bento Cards, Timeline inteligente, Status Badges, tabelas densas, Inline Edit, Progressive Disclosure.
