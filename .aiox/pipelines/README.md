# 🎵 Pipeline Automático - Orquestração Completa (12 Agentes)

Bem-vindo ao **Pipeline Automático AIOX**, onde uma ideia vira um produto em produção sem intervenção manual!

## 🚀 Como Começar

### Comando Simples

```bash
@aiox-orchestrator
*execute-pipeline --idea "Dashboard de Manutenção" --scope "MVP" --auto
```

Pronto! O orquestrador vai:

1. ✅ Iniciar BRAINSTORM (@brainstorm + @analyst)
2. ✅ Criar PRD (@pm)
3. ✅ Desenhar arquitetura (@architect + @data-engineer)
4. ✅ Fazer design visual (@ux-expert + .impeccable)
5. ✅ Planejar sprint (@sm + @po)
6. ✅ Desenvolver código (@dev)
7. ✅ Testar (@qa)
8. ✅ Fazer release (@devops)

**Totalmente automático!** 🤖

## 📊 As 8 Fases

```
FASE 1: BRAINSTORM & MARKET ANALYSIS
├─ @brainstorm questiona profundamente
├─ @analyst pesquisa mercado
└─ Output: Ideia validada + insights

FASE 2: PRD (Product Requirements Document)
├─ @pm cria PRD estruturado
└─ Output: Especificação completa

FASE 3: ARQUITETURA TÉCNICA
├─ @architect design técnico
├─ @data-engineer schema de DB (se necessário)
└─ Output: Architecture docs + Decisions

FASE 4: DESIGN UX COM .impeccable
├─ @ux-expert design visual
└─ Output: Protótipos + Design system

FASE 5: PLANEJAMENTO DE SPRINT
├─ @sm cria stories
├─ @po gerencia backlog
└─ Output: Stories prontas em docs/stories/

FASE 6: DESENVOLVIMENTO
├─ @dev implementa código
└─ Output: Código em src/

FASE 7: QA & TESTES
├─ @qa testa tudo
└─ Output: Aprovação ou feedback para @dev

FASE 8: RELEASE & DEPLOY
├─ @devops faz push e deploy (EXCLUSIVO)
└─ Output: Em produção!
```

## 📁 Estrutura de Saída

Cada pipeline cria:

```
.aiox/pipelines/
└── {YYYY-MM-DD}-{tema}/
    ├── PIPELINE-INDEX.md (resumo executivo)
    ├── PIPELINE-TIMELINE.yaml (timeline + timeline real)
    │
    ├── 01-BRAINSTORM-SESSION.md (brainstorm transcription)
    ├── 01-MARKET-ANALYSIS.md (market research)
    │
    ├── 02-PRD.md (product requirements)
    │
    ├── 03-ARCHITECTURE.md (technical design)
    ├── 03-SCHEMA.md (database schema, if needed)
    │
    ├── 04-DESIGN-SPECS.md (UX/UI specifications)
    │
    ├── 05-SPRINT-PLAN.md (sprint planning)
    │
    ├── 06-DEV-REPORT.md (development progress)
    │
    ├── 07-QA-REPORT.md (testing results)
    │
    └── 08-RELEASE-NOTES.md (release documentation)

docs/stories/epics/{epic-slug}/
├── INDEX.md (epic definition)
├── 01.01.story.md
├── 01.02.story.md
└── ... (todas as stories criadas)

.impeccable/designs/{session-id}/
├── index.html (home)
├── pages/ (page designs)
├── components/ (component library)
└── DESIGN-SYSTEM.md

src/ (código implementado)
tests/ (testes)
main branch (git push + deploy)
```

## 🎯 Exemplos Práticos

### Exemplo 1: Dashboard Simples (MVP)

```bash
@aiox-orchestrator
*execute-pipeline --idea "Dashboard de Manutenção" --scope "MVP" --auto
```

**Timeline:** ~3-5 dias
**Features:** 5-8
**Stories:** 10-15

### Exemplo 2: Feature Complexa (Full-Feature)

```bash
@aiox-orchestrator
*execute-pipeline --idea "Sistema de Agendamento Inteligente" --scope "full-feature" --auto
```

**Timeline:** ~2-3 semanas
**Features:** 15-20
**Stories:** 30-50

### Exemplo 3: Enterprise (Full Enterprise)

```bash
@aiox-orchestrator
*execute-pipeline --idea "Plataforma de Gestão de Frotas Completa" --scope "enterprise" --auto
```

**Timeline:** ~6-8 semanas
**Features:** 50+
**Stories:** 100+
**Agentes adicionais:** @data-engineer com schemas complexos, @architect com multi-tenancy, etc.

## 🔄 Monitoramento

Durante a execução, veja o status:

```bash
@aiox-orchestrator
*pipeline-status {pipeline-id}
```

Exemplo de output:

```
╔═══════════════════════════════════════════════════╗
║ Pipeline: 2026-07-14-dashboard-manutencao       ║
║ Status: 🟢 EM EXECUÇÃO                          ║
║ Progress: 37.5% (3/8 fases)                      ║
║                                                   ║
║ ✅ FASE 1: BRAINSTORM (2h 15min)                ║
║ ✅ FASE 2: PRD (1h 30min)                       ║
║ ⏳ FASE 3: ARCHITECTURE (45min restante)       ║
║ ⬜ FASE 4-8: Agendadas                         ║
║                                                   ║
║ Timeline estimado: 5 dias                        ║
╚═══════════════════════════════════════════════════╝
```

## 🛑 Pausar e Retomar

```bash
# Pausar
@aiox-orchestrator
*pipeline-pause {pipeline-id}

# Retomar
@aiox-orchestrator
*pipeline-resume {pipeline-id}
```

## 📚 Ver Logs Completos

```bash
@aiox-orchestrator
*pipeline-logs {pipeline-id}
```

## 🐛 Se Algo Der Errado

Se uma fase falhar:

1. O agent responsável tenta fix automático (max 2 iterações)
2. Se não resolver, escala para @aiox-master
3. @aiox-master resolve e retoma pipeline

**Você não precisa fazer nada!** Tudo é automático.

## 📊 Agentes Envolvidos (12 Total)

| # | Agente | Fase(s) | Rol |
|---|--------|---------|-----|
| 1 | @brainstorm | 1 | Ideação + questionamento |
| 2 | @analyst | 1 | Pesquisa de mercado |
| 3 | @pm | 2 | PRD + requirements |
| 4 | @architect | 3 | Design técnico |
| 5 | @data-engineer | 3 | Database design |
| 6 | @ux-expert | 4 | Design visual |
| 7 | @sm | 5 | Sprint planning |
| 8 | @po | 5 | Backlog management |
| 9 | @dev | 6 | Implementation |
| 10 | @qa | 7 | Testing |
| 11 | @devops | 8 | Release (EXCLUSIVO) |
| 12 | @aiox-orchestrator | All | Orquestração |

## ✨ Recursos Inclusos

✅ Chat interativo com brainstorm  
✅ Pesquisa web integrada  
✅ Design automático com .impeccable  
✅ Stories geradas automaticamente  
✅ Testes e validação automática  
✅ Deploy automático  
✅ Documentação completa em cada etapa  
✅ Rastreabilidade total (git, stories, artifacts)  

## 🎯 Workflow Completo em Ação

```
VOCÊ: Quero um Dashboard de Manutenção

VOCÊ: @aiox-orchestrator
      *execute-pipeline --idea "Dashboard de Manutenção" --scope "MVP" --auto

@aiox-orchestrator: "Entendi! Vou orquestrar o pipeline completo:
                     1. Iniciando BRAINSTORM...
                     2. Depois PRD...
                     3. Depois ARQUITETURA...
                     4. Depois DESIGN...
                     5. Depois PLANEJAMENTO...
                     6. Depois DESENVOLVIMENTO...
                     7. Depois QA...
                     8. Depois RELEASE...
                     Tudo automático! 🚀"

[Pipeline executa...]

[Após 5 dias...]

@aiox-orchestrator: "✅ PIPELINE COMPLETO!
                     
                     Deliverables:
                     - PRD.md ✅
                     - Architecture.md ✅
                     - Design Specs ✅
                     - 12 Stories criadas ✅
                     - Código em src/ ✅
                     - Testes passando ✅
                     - Em produção ✅
                     
                     Relatório completo em:
                     .aiox/pipelines/2026-07-14-dashboard-manutencao/"
```

## 📖 Documentação

Leia também:
- `.aiox-core/development/tasks/pipeline-full-auto.md` - Detalhes técnicos
- `.claude/agents/aiox-orchestrator.md` - Persona do orquestrador

## 🚀 Pronto para Começar?

```bash
@aiox-orchestrator
*execute-pipeline --idea "Sua ideia aqui" --scope "MVP" --auto
```

Deixa a mágica do AIOX fazer o trabalho! ✨
