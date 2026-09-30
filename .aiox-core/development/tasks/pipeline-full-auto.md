---
task: Pipeline Automático Completo (8 Fases - 12 Agentes)
responsavel: "@aiox-orchestrator"
responsavel_type: agent
atomic_layer: workflow
elicit: false
entrada: |
  - idea: Ideia/conceito a ser desenvolvido
  - scope: MVP | Full-Feature | Enterprise
  - auto: true (para execução totalmente automática)
saida: |
  - Produto completo em produção
  - Todos os artefatos (PRD, Architecture, Design, Code, Tests)
  - Pipeline documentado em .aiox/pipelines/{session-id}/
checklist:
  - "[ ] FASE 1: Brainstorm & Market Analysis"
  - "[ ] FASE 2: PRD Creation"
  - "[ ] FASE 3: Technical Architecture"
  - "[ ] FASE 4: UX Design"
  - "[ ] FASE 5: Sprint Planning"
  - "[ ] FASE 6: Development"
  - "[ ] FASE 7: QA & Testing"
  - "[ ] FASE 8: Release & Deploy"
---

# *execute-pipeline

Executa pipeline automático completo com 8 fases e 12 agentes orquestrados.

## Invocação

```bash
@aiox-orchestrator
*execute-pipeline --idea "Dashboard de Manutenção" --scope "MVP" --auto
```

## Fluxo de 8 Fases

### ═══════════════════════════════════════════════════════════════
### FASE 1: BRAINSTORM & MARKET ANALYSIS (2-3 horas)
### ═══════════════════════════════════════════════════════════════

**Agentes:** @brainstorm, @analyst

**Entrada:** Ideia do usuário

**Processo:**

1. @brainstorm inicia sessão colaborativa
   - Questiona profundamente
   - Invoca @pm, @po, @analyst, @architect para validação
   - Documenta decisões em real-time

2. @analyst paralelo
   - Pesquisa de mercado
   - Análise de competidores
   - Validação de trends
   - Geração de insights

3. Síntese
   - Ideia aprovada com features definidas
   - Market validation completa
   - Risks identificados

**Saída:**
```
.aiox/pipelines/{session-id}/
├── 01-BRAINSTORM-SESSION.md (transcrição + decisões)
└── 01-MARKET-ANALYSIS.md (pesquisa + insights)
```

**Handoff:** → FASE 2 (@pm)

---

### ═══════════════════════════════════════════════════════════════
### FASE 2: PRD (1-2 horas)
### ═══════════════════════════════════════════════════════════════

**Agente:** @pm (Morgan)

**Entrada:** 
- Ideia aprovada
- Market insights
- Features definidas

**Processo:**

1. @pm recebe handoff automático

2. Cria PRD estruturado
   - Executive Summary
   - Problem Statement
   - Solution Overview
   - User Stories & Acceptance Criteria
   - Requirements (Functional & Non-Functional)
   - Success Metrics
   - Timeline & Resources

3. Validação interna
   - Coderabbit review
   - Alinhamento com product vision

**Saída:**
```
.aiox/pipelines/{session-id}/02-PRD.md

Estrutura:
- # PRD: {Nome}
- ## Executive Summary
- ## Problem & Opportunity
- ## Solution Overview
- ## User Stories
- ## Functional Requirements
- ## Non-Functional Requirements
- ## Success Metrics
- ## Timeline & Resources
```

**Handoff:** → FASE 3 (@architect)

---

### ═══════════════════════════════════════════════════════════════
### FASE 3: TECHNICAL ARCHITECTURE (2-3 horas)
### ═══════════════════════════════════════════════════════════════

**Agentes:** @architect, @data-engineer

**Entrada:**
- PRD completo
- Product vision

**Processo:**

1. @architect recebe handoff

2. Design técnico
   - System architecture
   - Technology stack decision
   - Integration points
   - Scalability & performance
   - Security considerations
   - Error handling strategy

3. @data-engineer paralelo (se necessário)
   - Database schema design
   - Data modeling
   - Migration strategy
   - Query optimization
   - RLS policies (if applicable)

4. Decisões arquiteturais
   - ADRs (Architecture Decision Records)
   - Trade-offs documentados
   - Viabilidade técnica confirmada

**Saída:**
```
.aiox/pipelines/{session-id}/
├── 03-ARCHITECTURE.md (design técnico + decisões)
└── 03-SCHEMA.md (opcional - se DB necessária)

Estrutura ARCHITECTURE.md:
- # Technical Architecture: {Nome}
- ## System Design
- ## Technology Stack
- ## Component Architecture
- ## Data Flow
- ## Integration Points
- ## Scalability & Performance
- ## Security Considerations
- ## Error Handling
- ## Deployment Architecture
```

**Handoff:** → FASE 4 (@ux-expert)

---

### ═══════════════════════════════════════════════════════════════
### FASE 4: UX DESIGN (2-3 horas)
### ═══════════════════════════════════════════════════════════════

**Agente:** @ux-expert (Uma) + .impeccable

**Entrada:**
- PRD
- Architecture
- Feature list

**Processo:**

1. @ux-expert recebe handoff

2. Design com .impeccable
   - Protótipos de cada página/componente
   - User flows
   - Component system
   - Design tokens
   - Accessibility standards

3. Design system
   - Color palette
   - Typography
   - Spacing system
   - Component library
   - Interaction patterns

4. Outputs
   - Interactive HTML prototypes
   - Design specs
   - Component guide
   - Accessibility audit

**Saída:**
```
.impeccable/designs/{session-id}/
├── index.html (home)
├── pages/
│   ├── page1.html
│   ├── page2.html
│   └── ...
├── components/
│   ├── button.html
│   ├── form.html
│   └── ...
└── DESIGN-SYSTEM.md

.aiox/pipelines/{session-id}/04-DESIGN-SPECS.md
```

**Handoff:** → FASE 5 (@sm)

---

### ═══════════════════════════════════════════════════════════════
### FASE 5: SPRINT PLANNING (1-2 horas)
### ═══════════════════════════════════════════════════════════════

**Agentes:** @sm (River), @po (Pax)

**Entrada:**
- PRD
- Architecture
- Design specs
- Features list

**Processo:**

1. @sm recebe handoff

2. Cria stories estruturadas
   - Epic(s) em docs/stories/epics/
   - Stories (formato padrão AIOX)
   - Acceptance criteria (Given/When/Then)
   - Story points/estimates
   - Dependencies mapping
   - Sprint allocation

3. @po paralelo
   - Priorização de stories
   - Backlog organization
   - Dependency resolution
   - Resource planning

4. Outputs
   - Story files (docs/stories/)
   - Epic INDEX.md
   - Sprint backlog
   - Sprint timeline

**Saída:**
```
docs/stories/epics/{epic-slug}/
├── INDEX.md (epic definition)
├── 01.01.story.md
├── 01.02.story.md
├── ...
└── README.md

.aiox/pipelines/{session-id}/05-SPRINT-PLAN.md
```

**Handoff:** → FASE 6 (@dev)

---

### ═══════════════════════════════════════════════════════════════
### FASE 6: DEVELOPMENT (Variável - dias/semanas)
### ═══════════════════════════════════════════════════════════════

**Agente:** @dev (Dex)

**Entrada:**
- Stories (docs/stories/)
- Design specs (.impeccable/)
- Architecture (03-ARCHITECTURE.md)
- Schema (if DB)

**Processo:**

1. @dev recebe handoff

2. Desenvolvimento iterativo
   - Lê cada story
   - Implementa AC
   - CodeRabbit auto-fix (max 2 iterações)
   - Testes unitários
   - Commit conforme progresso

3. Story progression
   - Draft → InProgress
   - InProgress → InReview
   - Auto-update em docs/stories/

4. Outputs
   - src/ (código implementado)
   - Tests
   - Git commits

**Saída:**
```
src/ (código completo)
tests/ (testes unitários)
.aiox/pipelines/{session-id}/06-DEV-REPORT.md
```

**Handoff:** → FASE 7 (@qa)

---

### ═══════════════════════════════════════════════════════════════
### FASE 7: QA & TESTING (1-2 horas por story)
### ═══════════════════════════════════════════════════════════════

**Agente:** @qa (Quinn)

**Entrada:**
- Stories
- Code
- Design specs

**Processo:**

1. @qa recebe handoff

2. QA Loop automático (max 3 iterações)
   - Executa story AC (Given/When/Then)
   - Testa contra design
   - Regressão testing
   - Security basics

3. Verdicts
   - PASS → Aprova
   - FAIL → Retorna para @dev
   - CONCERNS → Aprova com notas

4. Loop até PASS

**Saída:**
```
.aiox/pipelines/{session-id}/07-QA-REPORT.md
Stories atualizadas com status Done
```

**Handoff:** → FASE 8 (@devops)

---

### ═══════════════════════════════════════════════════════════════
### FASE 8: RELEASE & DEPLOY (30min-1h)
### ═══════════════════════════════════════════════════════════════

**Agente:** @devops (Gage) - AUTORIDADE EXCLUSIVA

**Entrada:**
- Código aprovado
- Testes passando
- Stories em Done

**Processo:**

1. @devops recebe handoff (exclusivamente)

2. Release process
   - Validação de branch
   - CI/CD pipeline
   - Git push (exclusiva autoridade)
   - Deploy automático
   - Release notes

3. Post-deploy
   - Smoke tests
   - Monitoramento
   - Release documentation

**Saída:**
```
main branch: Código atualizado
Production: Feature live
.aiox/pipelines/{session-id}/08-RELEASE-NOTES.md
```

---

## 🎯 Monitoramento em Tempo Real

@aiox-orchestrator mantém status atualizado:

```
╔═══════════════════════════════════════════════════════════════╗
║ 🎵 PIPELINE ORCHESTRATION - Status Live               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║ Pipeline ID: 2026-07-14-dashboard-manutencao               ║
║ Scope: MVP                                                    ║
║ Status: 🟢 EM EXECUÇÃO                                       ║
║ Progress: 25% (2/8 fases completas)                          ║
║                                                               ║
║ ✅ FASE 1: BRAINSTORM (2h 15min)                             ║
║    └─ 5 features aprovadas, 3 risks mitigated                ║
║                                                               ║
║ ✅ FASE 2: PRD (1h 30min)                                    ║
║    └─ 12 user stories, 8 functional reqs                     ║
║                                                               ║
║ ⏳ FASE 3: ARCHITECTURE (EM ANDAMENTO - 45min restante)     ║
║    └─ @architect designed system, @data-engineer designing DB ║
║                                                               ║
║ ⬜ FASE 4-8: Agendadas                                      ║
║                                                               ║
║ Timeline: 5 dias de calendário (estimado)                    ║
║ Última atualização: 14:47 UTC                                ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

## 📋 Handoff Chain

```
USER IDEA
   ↓
@brainstorm + @analyst (Session: 01-BRAINSTORM-SESSION.md)
   ↓
@pm (PRD: 02-PRD.md)
   ↓
@architect + @data-engineer (Architecture: 03-ARCHITECTURE.md)
   ↓
@ux-expert + .impeccable (Design: 04-DESIGN-SPECS.md)
   ↓
@sm + @po (Planning: 05-SPRINT-PLAN.md)
   ↓
@dev (Development: src/)
   ↓
@qa (QA: 07-QA-REPORT.md)
   ↓
@devops (Release: 08-RELEASE-NOTES.md)
   ↓
✅ LIVE IN PRODUCTION
```

## ⚙️ Error Handling

Se alguma fase falhar:

1. Documentar erro
2. Agent responsável tenta fix automático
3. Se persistir: Escalar para @aiox-master
4. @aiox-master resolve e resume

## 🎯 Timeline Estimado

| Fase | Agentes | Tempo | Paralelo? |
|------|---------|-------|-----------|
| 1 | @brainstorm, @analyst | 2-3h | Sim (paralelo) |
| 2 | @pm | 1-2h | - |
| 3 | @architect, @data-engineer | 2-3h | Sim (paralelo) |
| 4 | @ux-expert | 2-3h | - |
| 5 | @sm, @po | 1-2h | Sim (paralelo) |
| 6 | @dev | Variável (dias) | Iterativo |
| 7 | @qa | 1-2h por story | Iterativo |
| 8 | @devops | 30min-1h | - |

**Total: 5-7 dias de calendário (com parallelismo)**

