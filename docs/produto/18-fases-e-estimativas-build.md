# 18 — Fases de Build e Estimativas

**Fase:** Planejamento de entrega · **Data:** 2026-07-17
**Depende de:** [04 — MVP/roadmap](04-mvp-e-roadmap.md), [11 — roadmap agent-first](11-roadmap-agent-first.md), [12 — zona de risco](12-zona-de-risco-escopo.md), [17 — funcionários digitais](17-funcionarios-digitais.md), [modelo-de-custo](../negocio/modelo-de-custo.md), [Modelo de Domínio](../requisitos/modelo-de-dominio.md), [UX Bible](../design/ux-bible/00-README.md).

> **Propósito.** Cortar o escopo em fases de **build** e estimar esforço no modo **Claude Code (orquestra) + Codex (programa)**, founder solo. Re-baseline pós-pivô "MVP expandido" (a numeração aqui manda; docs 04/11/12 seguem valendo para escopo e racional).

---

## 0. Aviso sobre as estimativas (honestidade primeiro)

- **São ranges, não promessas.** Confiança ~50%. DMS com integrações reais (fiscal, WhatsApp, placa, pagamento) historicamente **estoura** — o número real tende ao topo do range.
- **Unidade: "dia efetivo"** = ~6h de foco real, founder + IA.
- **A IA acelera CÓDIGO** (~2–3× em boilerplate/CRUD/UI/testes), mas **não** acelera: decisões de produto, design/revisão de schema, **debug de integração**, teste em device real, deploy/infra, e a curva de aprendizado. **Esses passos dominam o cronômetro** num sistema real.
- **Não adotamos** o "MVP em 3–5 dias" do material AIOX — aquilo é marketing de pipeline, não um DMS multi-tenant com 5 shells + agentes + portal público.

---

## 1. Re-baseline de numeração (mapa com docs 04/11)

| Fase de **build** (este doc) | ≈ Fases dos docs 04/11 | Tese |
|---|---|---|
| **Fase 1 — MVP Expandido** | Fase 0 (núcleo) **+** itens de "uau" da Fase 1 (Kanban, agentes, recusados, admin/RBAC) | a demo que **vende** + primeiros pagantes |
| **Fase 2 — Substitui o sistema antigo** | resto da Fase 1 (PDV/estoque/fiscal/Pix) + WhatsApp oficial | motivo pra **cancelar** o concorrente |
| **Fase 3 — A oficina que se gerencia** | Fase 2 dos docs | cérebro financeiro-operacional + Gestor por voz |
| **Fase 4 — Plataforma** | Fase 3 dos docs (+ grafo AGE/Neo4j, arquétipos de oficina) | ecossistema/escala |

> A **zona de risco ([doc 12](12-zona-de-risco-escopo.md)) continua soberana:** o MVP Expandido é maior que a Fase 0, mas **não** puxa itens de Fase 2+ pra dentro.

---

## 2. Fase 1 — MVP Expandido (o que entra)

A demo vendável, ponta a ponta, nos **5 shells** (Fundação UX). Pacotes de trabalho:

| # | Pacote | Escopo | Tam. | Dias efetivos |
|---|---|---|---|---|
| 1 | Fundação técnica | stack, auth, **multi-tenant**, **RBAC** (papéis/shells), CI/deploy, base de design system | L | 6–9 |
| 2 | Núcleo de domínio | entidades (Modelo de Domínio §1), placa (API), Timeline, histórico por placa | L | 7–10 |
| 3 | **Shell Consultor / Hub** (split view) | o coração: orçamento item-a-item, foto, severidade, timeline, enviar WhatsApp | L | 6–9 |
| 4 | Shell Recepção | fila + Kanban (mock drag), busca por placa, Novo Atendimento (Completo/Rápido), Inbox | M | 4–6 |
| 5 | Shell Mecânico | checklist mobile web, severidade V/A/V, foto, áudio, iniciar/pausar/finalizar | M | 4–6 |
| 6 | Portal do Cliente | link sem login, rastreio, aprovação item-a-item, aceite | M | 3–5 |
| 7 | Shell Gestor | dashboard básico + fila de Recusados | M | 3–5 |
| 8 | WhatsApp (Evolution) | envio de link/status + fluxo de aprovação | M | 3–5 |
| 9 | Camada de IA + 3 agentes | skills, roteamento por skill, Recepcionista + Consultor + Assistente do Mecânico | L | 6–10 |
| 10 | Módulo Admin | config de IA, assinaturas, skills (doc 15) | M | 4–6 |
| 11 | Onboarding + seed | importador de planilha + dados de demonstração | S | 2–3 |
| 12 | Integração + testes + polish + deploy | costura ponta a ponta, QA, deploy da demo | L | 6–10 |
| | **TOTAL** | | | **~55–85 dias efetivos** |

**Tradução para calendário:**

| Capacidade | Cálculo | Calendário |
|---|---|---|
| **Full-time** (5 dias efetivos/sem) | 55–85 ÷ 5 | **~11–17 semanas (~3–4 meses)** |
| **Meio-período** (2 dias/sem, com CLT) | 55–85 ÷ 2 | **~28–42 semanas (~7–10 meses)** |

**NÃO entra na Fase 1** (guardrail [doc 12](12-zona-de-risco-escopo.md)): PDV, estoque, fiscal, Pix, financeiro completo, Painel TV, offline-first real, WhatsApp oficial, Gestor por voz.

---

## 3. ⭐ Recomendação: um corte **"Demo-first"** antes do MVP Expandido completo

**O risco:** 3–4 meses full-time (ou 7–10 meio-período) **antes de mostrar qualquer coisa** é perigoso pra um founder ainda com CLT — muito tempo sem sinal de mercado nem caixa.

**A proposta:** construir primeiro um **clicável que VENDE** (~16–24 dias efetivos = **3–5 semanas full-time**), e só depois endurecer pro MVP Expandido:

| Pacote (demo-first) | Dias |
|---|---|
| Setup mínimo + design system | 2–3 |
| Domínio mínimo (**seed/dados fake, sem multi-tenant**) | 2–3 |
| **Hub do Consultor** (split view, orçamento, timeline) | 5–7 |
| **Portal do Cliente** (aprovação item-a-item) | 3–4 |
| 1 agente (Consultor — rascunho de recomendação) | 2–4 |
| Polish + deploy clicável | 2–3 |
| **TOTAL** | **~16–24 dias (~3–5 semanas)** |

Isso valida a **tese** e o **"uau"** (foto→orçamento→aprovação no zap) com risco baixo, respeitando "spec antes de código" e "validação antes de escala". Depois: multi-tenant, RBAC, os outros shells e WhatsApp Evolution entram por cima.

---

## 4. Fases 2, 3, 4 (estimativa grossa — só direção)

| Fase | Escopo-âncora (docs 04/11) | Dias efetivos | Full-time |
|---|---|---|---|
| **Fase 2** | PDV Essencial, Estoque Básico, **fiscal** (NFS-e/NFC-e), **Pix** (Asaas), WhatsApp oficial, Retenção, apontamento | ~40–70 | ~8–14 sem |
| **Fase 3** | Gestor (voz), Cobrador, financeiro completo, estoque avançado, Painel TV, offline real | ~50–80 | ~10–16 sem |
| **Fase 4** | Técnico, Peças, catálogo, multiunidade, parceiros, BI, diagnóstico assistido, grafo AGE/Neo4j | contínuo | não é bloco fechado |

> **Fase 2 é enganosamente cara:** fiscal e pagamento são *integrações reguladas* — o gerador de código ajuda pouco no debug de homologação. É o maior risco de estouro do plano.

---

## 5. Custo de build (liga [modelo-de-custo](../negocio/modelo-de-custo.md))

- **IA de dev:** R$200/mês (Claude R$100 + Codex R$100) — trivial no P&L; é o multiplicador que viabiliza o MVP Expandido.
- **O custo real é TEMPO do founder.** Referência do [pró-labore futuro](../negocio/modelo-de-custo.md) (R$2.000/mês): o MVP Expandido full-time (~3–4 meses) equivale a **~R$6–8k de custo de oportunidade** de pró-labore, se/quando sair do CLT.
- **Demo-first encurta o tempo-até-primeira-venda** → melhora o fluxo de caixa e antecipa o sinal de mercado.

---

## 6. Gates de avanço (reusa [doc 04](04-mvp-e-roadmap.md))

- **Demo-first → MVP Expandido:** a demo gerou reação positiva de ≥3 oficinas reais (carta de intenção / pré-venda).
- **MVP Expandido → Fase 2:** 3–5 oficinas pagantes usando o ciclo completo por 60 dias; churn zero.
- **Fase 2 → Fase 3:** 15–20 pagantes; maioria **cancelou o sistema antigo**; Recepcionista resolvendo ≥60% das conversas.
- **Fase 3 → Fase 4:** 50+ pagantes; demanda registrada (não hipótese) por multiunidade/peças.

---

*Estimativas a revalidar após o primeiro pacote real (o pacote 1 da Fase 1 calibra a velocidade verdadeira do modo Claude Code + Codex — depois dele, refazer estas contas com dados).*
