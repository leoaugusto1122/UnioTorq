# 🧠 Brainstorm Colaborativo - Sessões

Bem-vindo ao sistema de **Brainstorm Colaborativo Real** do UnioTorq!

Aqui você pode facilitar sessões de ideação com agentes autônomos que questionam, pesquisam, validam e documentam tudo em tempo real.

## 🎯 Como Usar

### 1️⃣ Iniciar uma Sessão de Brainstorm

```bash
@brainstorm
*brainstorm-collaborate --idea "Sua ideia aqui" --scope "mvp"
```

### 2️⃣ Participantes (Automático)

Você e os agentes:
- 👤 **VOCÊ** - Ideador/Propositor
- 🤖 **@brainstorm** - Facilitador (maestro da conversa)
- 🤖 **@pm** (Morgan) - Validação estratégica
- 🤖 **@po** (Pax) - Validação de valor/priorização
- 🤖 **@analyst** (Alex) - Pesquisa de mercado
- 🤖 **@architect** (Aria) - Viabilidade técnica

### 3️⃣ Fluxo da Sessão

```
FASE 1: IDEAÇÃO
├─ Você propõe a ideia
├─ @brainstorm questiona profundamente
└─ Esclarece o problema, impacto, constraints

FASE 2: ANÁLISE MULTI-PERSPECTIVA (Paralelo)
├─ @pm valida alinhamento estratégico
├─ @po avalia valor e priorização
├─ @analyst pesquisa mercado e soluções similares
└─ @architect analisa viabilidade técnica

FASE 3: SÍNTESE E DECISÃO
├─ @brainstorm sintetiza todos os inputs
├─ Apresenta recomendação: Proceder | Condicional | Rejeitar
└─ Define scope: MVP | Full-Feature | Research

FASE 4: DOCUMENTAÇÃO E HANDOFF
├─ SESSION.md - Transcrição completa
├─ DECISIONS.yaml - Decisões estruturadas
├─ OUTCOMES.yaml - Features/Stories/Epics gerados
└─ Handoff para @pm (próxima fase)
```

## 📁 Estrutura de Saída

Cada sessão gera uma pasta com:

```
.aiox/brainstorm-sessions/
├── 2026-07-14-dashboard-manutencao/
│   ├── SESSION.md          ← Transcrição completa
│   ├── DECISIONS.yaml      ← Decisões estruturadas
│   ├── OUTCOMES.yaml       ← Features/Stories/Epics
│   └── conversation.log    ← Log bruto da conversa
│
└── 2026-07-15-integracao-api/
    ├── SESSION.md
    ├── DECISIONS.yaml
    ├── OUTCOMES.yaml
    └── conversation.log
```

Stories criadas automaticamente em:
```
docs/stories/epics/{epic-id}/
├── INDEX.md
└── {numero}.{numero}.story.md
```

Decisões em:
```
.aiox/decisions/
├── 2026-07-14-dashboard-manutencao-DECISION.md
└── 2026-07-15-integracao-api-DECISION.md
```

## 🎬 Exemplo Prático

### Iniciando:

```
VOCÊ: @brainstorm, quero fazer um brainstorm sobre um novo dashboard

@brainstorm: Perfeito! Deixa-me criar uma sessão...

Sessão criada: .aiox/brainstorm-sessions/2026-07-14-novo-dashboard/

Agora, me conta:
1. Qual é a IDEIA específica? (nome, descrição)
2. Qual SCOPE? (MVP, full-feature, research-only)
3. Por que é importante AGORA?

Você: Ideia: Dashboard integrado de manutenção preventiva para frota
      Scope: MVP
      Motivo: Aumentar uptime e reduzir custos
```

### Questionamento:

```
@brainstorm: Excelente! Deixa eu cavar mais profundo:

PROBLEMA:
- Qual é o problema CORE que isso resolve?
  R: [sua resposta]
- Quem sofre com isso? (qual persona?)
  R: [sua resposta]

IMPACTO:
- Como muda a vida do usuário?
  R: [sua resposta]
- Qual é a métrica de sucesso?
  R: [sua resposta]

CONSTRAINTS:
- Qual sistema isso depende?
  R: [sua resposta]
- Há riscos conhecidos?
  R: [sua resposta]
```

### Análise Multi-Perspectiva:

```
[Enquanto você responde, @brainstorm invoca os agentes...]

@pm: "Dashboard se alinha com visão de 'gestão integrada'?
     Onde encaixa no roadmap? Prioridade?"
     → Resposta: Alinha 100%, alta prioridade, Sprint 3

@po: "Qual user value? Prioridade no backlog?
     Critérios de aceitação iniciais?"
     → Resposta: Alto valor (reduz downtime 30%), viável em 2 sprints

@analyst: "Market demand? Soluções similares?
          Trends de telemática?"
          → Resposta: Demand forte, 3 competitors estudados, trend confirmado

@architect: "Viável com arquitetura? Impactos? Complexidade?"
            → Resposta: Viável, integra com telemetry, complexidade média
```

### Síntese e Decisão:

```
@brainstorm: **SÍNTESE - Dashboard Manutenção**

✅ ALINHAMENTO:
- Estratégia: Confirmado (@pm)
- Valor: Alto (@po)
- Market: Demand forte (@analyst)
- Técnica: Viável (@architect)

⚠️ RISCOS:
- Timeline (API telemática)
- Mobile UI complexity

🎯 RECOMENDAÇÃO: **PROCEDER COM MVP**
   - Scope: Dashboard desktop + Relatórios
   - Timeline: 2 semanas
   - Team: 4 devs, 1 designer
   - Next: Specification phase (@pm)

📋 DOCUMENTAÇÃO: Tudo salvo em .aiox/brainstorm-sessions/
```

## 📝 Documentos Gerados

### SESSION.md
Transcrição completa + síntese + próximos passos

### DECISIONS.yaml
```yaml
decisions:
  - id: "DEC-001"
    statement: "Proceder com Dashboard MVP"
    approved_by: ["@pm", "@po", "@analyst", "@architect"]
    timeline: "2 weeks"
    team_size: "4 devs, 1 designer"
```

### OUTCOMES.yaml
```yaml
epics_created:
  - title: "Dashboard Integrado de Manutenção"
    scope: "MVP"
    
stories_created:
  - title: "Como operador, visualizar próxima manutenção"
    estimate: "8pt"
  - title: "Como técnico, registrar manutenção realizada"
    estimate: "5pt"
```

## 🚀 Próximas Fases

Após brainstorm aprovado:

1. **Specification (@pm)** - Detalhamento de requisitos
2. **Planning (@sm)** - Planejamento de sprint
3. **Development (@dev)** - Implementação
4. **QA (@qa)** - Testes
5. **Release (@devops)** - Deploy

## ❓ Perguntas Frequentes

**P: E se eu quiser mudar de ideia durante o brainstorm?**
R: Tudo bem! O @brainstorm pode explorar versões alternativas. Tudo fica documentado.

**P: Posso fazer múltiplos brainstorms em paralelo?**
R: Sim! Cada sessão tem seu próprio diretório com timestamp.

**P: E se os agentes discordarem?**
R: O @brainstorm mostra todos os pontos de vista e ajuda a sintetizar a melhor decisão.

**P: Como volto a uma sessão antiga?**
R: Tudo está em `.aiox/brainstorm-sessions/`. Você pode revisar e retomar.

## 📞 Suporte

- Para técnica: `@architect`
- Para viabilidade de product: `@pm`
- Para market insights: `@analyst`
- Para conduzir sessão: `@brainstorm`

---

**Pronto para brainstormar?** 🚀

```bash
@brainstorm
*brainstorm-collaborate --idea "Sua ideia" --scope "mvp"
```
