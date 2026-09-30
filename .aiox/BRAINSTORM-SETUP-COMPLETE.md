# ✅ Setup Completo: Brainstorm Colaborativo

**Data:** 2026-07-14  
**Status:** ✅ IMPLEMENTADO E PRONTO PARA USO

---

## 🎯 O Que Foi Criado

### 1️⃣ Agente @brainstorm

**Arquivo:** `.claude/agents/aiox-brainstorm.md`

- ✅ Facilitador de brainstorms colaborativos
- ✅ Capaz de invocar agentes autônomos
- ✅ Documentação em tempo real
- ✅ Chat interativo com o usuário

**Persona:** Maestro de ideação - questiona profundamente, coordena perspectivas

### 2️⃣ Task de Brainstorm Colaborativo

**Arquivo:** `.aiox-core/development/tasks/brainstorm-collaborate.md`

Define o fluxo completo:
- FASE 1: Ideação
- FASE 2: Análise Multi-Perspectiva
- FASE 3: Síntese e Decisão
- FASE 4: Documentação

### 3️⃣ Templates de Documentação

| Arquivo | Propósito |
|---------|-----------|
| `.aiox-core/development/templates/brainstorm-session-tmpl.md` | Template markdown para transcrição |
| `.aiox-core/development/templates/brainstorm-decisions-tmpl.yaml` | Template para decisões estruturadas |
| `.aiox-core/development/templates/brainstorm-outcomes-tmpl.yaml` | Template para outcomes (features/stories) |

### 4️⃣ Estrutura de Diretórios

```
.aiox/
├── brainstorm-sessions/        ← Sessões (uma por ideia)
│   ├── README.md              ← Instruções de uso
│   └── {YYYY-MM-DD}-{tema}/
│       ├── SESSION.md         ← Transcrição + síntese
│       ├── DECISIONS.yaml     ← Decisões estruturadas
│       ├── OUTCOMES.yaml      ← Features/stories/epics
│       └── conversation.log   ← Log bruto
│
└── decisions/                  ← Decisões finais
    └── {YYYY-MM-DD}-{tema}-DECISION.md
```

### 5️⃣ Script de Inicialização

**Arquivo:** `.aiox-core/development/scripts/brainstorm-init.js`

Cria estrutura base para nova sessão automaticamente.

### 6️⃣ Skills Instaladas

✅ **researching-web** - Pesquisa web de alta qualidade integrada
- Claude Code
- Codex
- Gemini CLI
- Kimi CLI
- Antigravity

---

## 🚀 Como Começar

### Opção 1: Iniciar com CLI

```bash
node .aiox-core/development/scripts/brainstorm-init.js "Sua Ideia" "MVP"
```

Isso cria:
- Diretório da sessão
- SESSION.md
- DECISIONS.yaml
- OUTCOMES.yaml
- conversation.log

### Opção 2: Iniciar Direto com @brainstorm

```bash
@brainstorm
*brainstorm-collaborate --idea "Sua ideia" --scope "MVP"
```

---

## 📋 Fluxo Completo de Uma Sessão

### 1. VOCÊ propõe ideia
```
"Quero fazer um brainstorm sobre Dashboard de Manutenção"
```

### 2. @brainstorm questiona profundamente
```
"Qual é o problema core?"
"Quem sofre com isso?"
"Como mede sucesso?"
"Qual sistema afeta?"
```

### 3. Agentes analisam em paralelo
- **@pm**: Alinhamento estratégico
- **@po**: Valor e priorização
- **@analyst**: Pesquisa de mercado
- **@architect**: Viabilidade técnica

### 4. @brainstorm sintetiza
```
✅ Alinhamento: Confirmado
⚠️ Riscos: X, Y, Z
🎯 Recomendação: Proceder com MVP
📊 Timeline: 2 semanas
```

### 5. Documentação é salva automaticamente
- `.aiox/brainstorm-sessions/{session-id}/SESSION.md`
- `.aiox/brainstorm-sessions/{session-id}/DECISIONS.yaml`
- `.aiox/brainstorm-sessions/{session-id}/OUTCOMES.yaml`

### 6. Handoff automático para @pm
Para fase de specification

---

## 📁 Arquivos Criados (Resumo)

```
✅ .claude/agents/aiox-brainstorm.md
✅ .aiox-core/development/tasks/brainstorm-collaborate.md
✅ .aiox-core/development/templates/brainstorm-session-tmpl.md
✅ .aiox-core/development/templates/brainstorm-decisions-tmpl.yaml
✅ .aiox-core/development/templates/brainstorm-outcomes-tmpl.yaml
✅ .aiox-core/development/scripts/brainstorm-init.js
✅ .aiox/brainstorm-sessions/README.md
✅ .aiox/brainstorm-sessions/ (diretório criado)
✅ .aiox/decisions/ (diretório criado)
```

---

## 🎯 Agentes Participantes

| Agente | Rol | Expertise |
|--------|-----|-----------|
| **@brainstorm** | Facilitador | Ideação, questionamento, síntese |
| **@pm** (Morgan) | Estratégia | Visão, roadmap, alinhamento |
| **@po** (Pax) | Produto | Valor, priorização, backlog |
| **@analyst** (Alex) | Pesquisa | Market, competitors, trends |
| **@architect** (Aria) | Técnica | Viabilidade, impactos, complexidade |

---

## 💡 Exemplo Prático

### Iniciando:
```bash
@brainstorm
*brainstorm-collaborate --idea "Dashboard Integrado de Manutenção" --scope "MVP"
```

### Fluxo:
```
YOU: Ideia é ter um dashboard que mostra manutenção próxima para operadores

@brainstorm: Ótimo! Deixa eu questionar:
- Qual problema resolve exatamente?
- Quem usa (qual persona)?
- Como mede sucesso?
- Qualquer breaking change?

YOU: [suas respostas]

@brainstorm: Invocando agentes para análise...

@pm: "Alinha com visão de gestão integrada? ✅"
@po: "Alto user value (reduz downtime 30%), viável em 2 sprints ✅"
@analyst: "Demand forte no mercado, competitors existem ✅"
@architect: "Viável, integra com telemetry, complexidade média ✅"

@brainstorm: 
✅ RECOMENDAÇÃO: Proceder com MVP
📊 Timeline: 2 semanas
👥 Team: 4 devs, 1 designer
📤 Handoff: @pm para specification
```

### Saídas Documentadas:
```
.aiox/brainstorm-sessions/2026-07-14-dashboard-manutencao/
├── SESSION.md          (transcrição completa)
├── DECISIONS.yaml      (decisões estruturadas)
├── OUTCOMES.yaml       (features, stories, epics)
└── conversation.log    (log bruto)

docs/stories/epics/dashboard-manutencao/
├── INDEX.md            (epic definida)
├── 01.01.story.md      (story criada)
└── 01.02.story.md      (story criada)
```

---

## ✨ Características Principais

✅ **Chat Interativo** - Conversa natural com agentes  
✅ **Multi-Perspectiva** - Agentes questionam de ângulos diferentes  
✅ **Pesquisa Integrada** - researching-web skill para validação  
✅ **Documentação Automática** - Tudo capturado em tempo real  
✅ **Decisões Estruturadas** - Outputs executáveis (stories, epics)  
✅ **Rastreabilidade Completa** - Cada decisão com rationale  
✅ **Handoff Claro** - Para próxima fase (specification, planning, etc)  

---

## 🔄 Fluxo de Trabalho Completo

```
BRAINSTORM (@brainstorm)
    ↓ (PROCEDER COM MVP)
SPECIFICATION (@pm)
    ↓ (Requirement detalhado)
PLANNING (@sm)
    ↓ (Sprint planning)
DEVELOPMENT (@dev)
    ↓ (Implementação)
QA GATE (@qa)
    ↓ (Testes + validação)
RELEASE (@devops)
    ↓ (Deploy em produção)
```

---

## 📞 Próximo Passo

**Você está pronto para começar seu primeiro brainstorm!**

```bash
@brainstorm
*brainstorm-collaborate --idea "Sua ideia aqui" --scope "MVP"
```

---

## 📚 Documentação Adicional

- `.aiox/brainstorm-sessions/README.md` - Guia de uso completo
- `.aiox-core/development/tasks/brainstorm-collaborate.md` - Task detalhada
- `.claude/agents/aiox-brainstorm.md` - Persona do agente

---

**✅ Setup Completo!** Você tem tudo que precisa para fazer brainstorms colaborativos reais com agentes autônomos. 🚀
