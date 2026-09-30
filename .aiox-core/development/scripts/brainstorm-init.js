#!/usr/bin/env node

/**
 * Brainstorm Session Initializer
 * Cria estrutura base para uma nova sessão de brainstorm
 */

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

const args = process.argv.slice(2);
const idea = args[0] || 'untitled-brainstorm';
const scope = args[1] || 'MVP';

// Validar inputs
if (!idea) {
  console.error('❌ Uso: node brainstorm-init.js "<ideia>" "<scope>"');
  console.error('   Exemplo: node brainstorm-init.js "Dashboard Manutenção" "MVP"');
  process.exit(1);
}

// Criar slug
const slug = idea
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const timestamp = new Date().toISOString().split('T')[0];
const sessionId = `${timestamp}-${slug}`;
const sessionPath = path.join(
  __dirname,
  '../../.aiox/brainstorm-sessions',
  sessionId
);

async function initSession() {
  try {
    // Criar diretório
    await fs.ensureDir(sessionPath);
    console.log(`✓ Diretório criado: ${sessionPath}`);

    // Criar SESSION.md
    const sessionTemplate = `# Brainstorm Session: ${idea}

**Data:** ${timestamp}
**Hora:** ${new Date().toLocaleTimeString('pt-BR')}
**Facilitador:** @brainstorm
**Status:** INICIADO

## 📌 IDEIA INICIAL

**Título:** ${idea}

**Scope Proposto:** ${scope}

## 🤔 QUESTIONAMENTO EM PROGRESSO

Aguardando respostas do humano...

## 🔍 PERSPECTIVAS DOS AGENTES

(Será preenchido durante a sessão)

## 🎯 SÍNTESE & DECISÃO

(Será preenchido quando agentes responderem)

## 📦 OUTCOMES

(Será preenchido ao fim da sessão)

---
**Sessão ID:** ${sessionId}
**Criada em:** ${new Date().toISOString()}
`;

    await fs.writeFile(path.join(sessionPath, 'SESSION.md'), sessionTemplate);
    console.log('✓ SESSION.md criado');

    // Criar DECISIONS.yaml
    const decisionsTemplate = {
      brainstorm_session_decisions: {
        session_id: sessionId,
        date: timestamp,
        facilitator: '@brainstorm',
        metadata: {
          title: idea,
          scope: scope,
          participants: {
            human: 'Leonardo',
            agents: ['@pm', '@po', '@analyst', '@architect']
          }
        },
        decisions: []
      }
    };

    await fs.writeFile(
      path.join(sessionPath, 'DECISIONS.yaml'),
      yaml.dump(decisionsTemplate, { lineWidth: -1 })
    );
    console.log('✓ DECISIONS.yaml criado');

    // Criar OUTCOMES.yaml
    const outcomesTemplate = {
      brainstorm_session_outcomes: {
        session_id: sessionId,
        date: timestamp,
        facilitator: '@brainstorm',
        metadata: {
          title: idea,
          scope: scope,
          approved_scope: null
        },
        epics_created: [],
        stories_created: [],
        features_identified: [],
        risks_identified: [],
        deliverables: {
          artifacts_created: []
        },
        next_phase: {
          phase: null,
          responsible_agent: '@pm'
        },
        session_statistics: {
          duration_minutes: 0,
          conversation_turns: 0
        }
      }
    };

    await fs.writeFile(
      path.join(sessionPath, 'OUTCOMES.yaml'),
      yaml.dump(outcomesTemplate, { lineWidth: -1 })
    );
    console.log('✓ OUTCOMES.yaml criado');

    // Criar conversation.log vazio
    await fs.writeFile(path.join(sessionPath, 'conversation.log'), '');
    console.log('✓ conversation.log criado');

    // Output summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ SESSÃO DE BRAINSTORM INICIADA');
    console.log('='.repeat(60));
    console.log(`\n📌 Session ID: ${sessionId}`);
    console.log(`📁 Localização: .aiox/brainstorm-sessions/${sessionId}/`);
    console.log(`💡 Ideia: ${idea}`);
    console.log(`📊 Scope: ${scope}`);
    console.log('\n🚀 Próximo passo:\n');
    console.log('   @brainstorm');
    console.log(`   *brainstorm-collaborate --session "${sessionId}"`);
    console.log('\n' + '='.repeat(60));

  } catch (error) {
    console.error('❌ Erro ao criar sessão:', error.message);
    process.exit(1);
  }
}

initSession();
