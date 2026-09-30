---
name: project-agenda-financeiro-microsaas
description: Micro-SaaS de agendamento + financeiro para profissionais liberais solo e pequenas clínicas — dashboard web/PWA complementar ao agendamento via WhatsApp com IA
metadata:
  type: project
---

Existe um produto (distinto do core UnioTorq/logística) que é um micro-SaaS de agendamento + gestão financeira para profissionais liberais solo e pequenas clínicas: psicólogos, terapeutas, esteticistas, podólogos, massoterapeutas, barbeiros, salões, manicures/pedicures. O motor principal é agendamento via WhatsApp com IA; o dashboard web é interface visual **complementar** (agenda, clientes, financeiro), acessado também pelo navegador mobile/PWA — não é app nativo.

**Why:** Em julho/2026 a fase era desenho de UX/UI do dashboard, com pesquisa de benchmarks (Fresha, Booksy, Setmore, SimplePractice, Cal.com, Calendly).

**How to apply:** Ao analisar/desenhar telas desse produto, tratar o WhatsApp como canal primário de entrada de agendamentos e o dashboard como visão de controle — não replicar fluxos de app nativo, e sempre considerar o uso via navegador do celular. Perfil de usuário: profissional solo com baixa tolerância a setup, não é operador de software clínico complexo. Ver [[unio-torq-prototype]] para o padrão de protótipo HTML usado no outro produto.

**Decisões de escopo/mercado apuradas (30/07/2026):**
- **Advocacia foi descartada como vertical** — Astrea, Projuris ADV e SAJ ADV são gestão de processos/prazos/publicações judiciais, não agendamento. Descompasso de categoria, não de features.
- **Concorrente mais direto identificado: Atendente.AI** (atendente.ai) — agenda com IA via WhatsApp para salões/barbearias. Único encontrado com a mesma proposta de valor central. Monitorar.
- **Concorrentes BR por vertical** (benchmarks visuais já extraídos, cores em hex): psi — PsicoManager, Corpora, Allminds, Sinappsy, Mentalizee, Zenklub; estética/podologia — Belasis, Belle Software, Gestek, Trinks; beleza/barbearia — Trinks, Booksy, EiBarber, AppBarber, AppBeleza.
