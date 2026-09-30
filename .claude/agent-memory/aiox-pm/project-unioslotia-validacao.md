---
name: project-unioslotia-validacao
description: UnioSlotIA é um micro-SaaS descartável-por-design para validar a arquitetura agêntica do UnioTorq antes de investir meses no produto grande
metadata:
  type: project
---

UnioSlotIA (agendamento para profissionais liberais) existe primariamente como **teste de arquitetura** do UnioTorq, não como produto independente. Reusa as mesmas 3 camadas (Regras→Automação→IA, "IA por último"), grafo relacional em Postgres e skills declarativas em YAML.

- Cliente piloto: Alessandro, psicólogo solo em Maringá/Mandaguari. Leonardo é paciente dele e tem histórico real de WhatsApp como evidência de dor (remarcação manual presencial↔online, fechamento financeiro mensal manual, sem apoio administrativo).
- Segundo prospect potencial (não abordado): cunhado com barbearia.
- Existe um "PRD Mestre" de 16 RFs gerado por outra IA — **não nasceu de dor observada**. Inclui 5 agentes, churn/burnout preditivo, recibo PDF com CRP e módulo Super Admin multi-tenant. Trate como backlog de hipóteses, não como requisito.
- Recibo PDF/CRP foi explicitamente despriorizado por Leonardo (Alessandro já resolve no Word, não gera "uau").
- Ambição comercial é real mas **condicional** à validação com o piloto.

**Why:** Leonardo quer evitar meses de construção sobre uma arquitetura não validada; o valor do UnioSlotIA é o aprendizado arquitetural + a primeira prova de valor com usuário real.

**How to apply:** Ao priorizar escopo aqui, pese "isso valida a arquitetura ou a dor do Alessandro?" — se não faz nenhum dos dois, é fase 2. Não confunda os 16 RFs do PRD Mestre com demanda validada. Ver [[feedback-escopo-mvp-antes-de-escalar]].
