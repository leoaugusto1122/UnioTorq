# 06 — Log de Ajustes das Telas Restantes (referência → protótipo)

**Fase:** especificação (pré-código) · **Data:** 2026-07-14
**Como ler:** cada tela = estado atual da referência → ajustes automáticos (doc 14, sem invenção) → decisões do fundador. Documento vai sendo preenchido tela a tela.

**Ordem de revisão:** Kanban ✅ · Hub ✅ · Dashboard ✅ · CRM ✅ · Prontuário ✅ · Portal do Cliente ✅ (+ Aprovação unificada) ✅ · Checklist ✅ · Configurações ✅ — **REVISÃO COMPLETA**.

> Painéis (Mecânico + TV Cliente) já em `05-SPEC-PAINEIS-MECANICO-E-TV.md`. Nina em `02`.

**Organograma digital (doc 05) — nomes em `dados-demo.js`:** **Nina** = recepção (WhatsApp) · **Rita** = retenção/pós-venda (CRM, Prontuário, reativação) · **Téo** = consultor (traduz anotação → orçamento, no Hub) · **Beto** = mecânico (áudio → texto, no Checklist). Onde antes se lia "Nina" em retenção/orçamento/checklist, agora é o agente do papel correspondente.

---

## 1. Kanban ✅

**Estado atual da referência (bom, cumpre o doc 14):** toggle Lista/Kanban/Agenda · métricas topo (No pátio, Em Execução, Ag. Aprovação, Críticos, **Receita est. R$**) · filtros (Todos/Críticos/Atenção/Entregas Atrasadas) · colunas com **contagem + R$** · cards ricos (placa mono, badge severidade, veículo, cliente, serviço, sub-status, prazo, técnico+box, janela, R$).

**Ajustes automáticos (doc 14):**
- **Fix14 #6** — adicionar métrica **Veículos parados** no topo (inclui "Ag. Peças").
- **Fix14 #3 (disciplina de cor)** — vermelho só para **risco a cliente/prazo** (Crítico de segurança + Entrega Atrasada). **"Sem técnico" e "Ag. Peças" viram âmbar** (atenção operacional).
- **Drag mock funcional** (decisão anterior) — arrastar card entre colunas recalcula o **R$ da coluna** ao vivo.

**Decisões do fundador (2026-07-14):**
- **Visão Agenda entra** — agenda do **dia** (simples): linha do tempo com **horários de entrada + previsões de entrega**. **O carro agendado pela Nina aparece marcado aqui** (costura com `02`).
- **Colunas completam o fluxo:** Recebido · Em Inspeção · Ag. Aprovação · Ag. Peças · Aprovado · Em Execução · Controle de Qualidade · **Finalizado · Entregue** (2 colunas adicionadas; "Entregue" fecha o ciclo que a Nina comunica).

**Manter (não mexer):** Receita est., R$/coluna, filtros, riqueza do card, toggle Lista/Kanban.

---

## 2. Hub de Atendimento ✅

**Estado atual da referência:** lista de atendimentos → detalhe com cabeçalho (placa, veículo, status, cor/motor/km, cliente+telefone) · **cronômetro** · botões **Enviar Orçamento** / **WhatsApp** / OS · dados da OS (nº, entrada, previsão, mecânico, consultor, total) · abas **Geral · Timeline · Inspeção · Orçamento · Comunicação · Financeiro** · Geral com Relato do Problema, Observações Técnicas, Dados do Atendimento.

**Ajustes automáticos (doc 14 + doc 05):**
- **Fix14 #1** — aba **Inspeção** expõe **severidade 🟢🟡🔴 em cada item**.
- **Aba Orçamento** — item a item com **foto + severidade + toggle incluir/remover** e **total recalcula ao vivo**.
- **Aba Timeline** — registra **cada ação dos agentes**: Nina ("agendou", "enviou orçamento"), **Téo** ("preparou o orçamento a partir do checklist"), cliente ("aprovou 2 itens") — doc 05.
- **Aba Comunicação** — é a conversa da Nina; **Enviar Orçamento** gera o link e dispara por lá (costura com `02`).
- **Fix14 #3** — disciplina de cor.

**Decisões do fundador (2026-07-14):**
- **Layout split view** (lista à esquerda + detalhe à direita) — doc 14 acerto, "casa do consultor".
- **Aba Financeiro = preview "em breve"** (financeiro completo é Fase 2 — doc 04).

**Manter (não mexer):** cronômetro, dados da OS, Relato/Observações, os dois botões (Enviar Orçamento + WhatsApp).

---

## 3. Dashboard Gerencial ✅

**Estado atual da referência (muito completo):** abas Visão Geral · Equipe · Faturamento · seletor de período · KPIs (Recebidos, Entregues/meta, Faturamento +%, Ticket/meta) · Operação (Em Execução, Ag. Aprovação, Ag. Peças, **Veículos Parados** ✅) · Produtividade (mecânico top, tempo médio, taxa aprovação) · Workload da Equipe · Comercial · **Funil de aprovação** (Orçado/Aprovado/Recusado) · OS por Status.

**Ajustes automáticos (doc 14):**
- **Fix14 #7** — **"Valor Recusado" (R$1.3k) clicável** → fila de Serviços Recusados (costura com Aprovação: itens reprovados caem aqui).
- **Fix14 #3** — Workload **"Crítico 90%" sai do vermelho** (vira âmbar): vermelho é risco a cliente/prazo, não carga de trabalho.
- **Doc 14 acerto** — meta vs. realizado com **barra de progresso** (hoje é só texto "meta: 8").

**Decisões do fundador (2026-07-14):**
- **Manter completo** (3 abas, toda a riqueza da referência).
- **Remover** o botão **Exportar** (não é argumento de venda no piloto; evita prometer feature).

**Manter (não mexer):** Operação com Veículos Parados, Produtividade, Comercial, OS por Status, seletor de período.

---

## 4. CRM de Clientes ✅ (tela nova)

**Estado atual da referência:** lista (avatar, nome, tag VIP/Recorrente/Novo, telefone, nº visitas, R$ total) · contadores Clientes/Veículos · busca (nome/CPF/telefone) · filtros · detalhe com dados completos (CPF, e-mail, endereço), métricas (cliente desde, visitas, total gasto, ticket médio, última visita), abas Perfil/Histórico/Veículos, botões Nova OS · WhatsApp · Editar. **Tag "Agente atuando"** na Luciana (Novo).

**Ajustes automáticos (doc 14/05):**
- **WhatsApp** do cliente abre a conversa da **Nina** (costura com `02`).
- **Fix14 #3** — tags em cor calma (não vermelho).

**Decisões do fundador (2026-07-14):**
- **Manter completo** (lista + detalhe com histórico e veículos).
- **Amplificar o agente:** manter a tag **"Agente atuando"** + o **histórico do cliente mostra as ações da Rita** (retenção): "Rita reativou", "Rita agendou revisão" — prova viva do argumento de retenção (doc 05).

**Manter (não mexer):** busca por CPF/telefone, métricas do cliente, abas Perfil/Histórico/Veículos.

---

## 5. Prontuário de Veículos ✅ (tela nova)

**Estado atual da referência (acerto do doc 14):** lista (placa mono, badge "Rev. próxima", marca/modelo/ano, cor · dono, KM, próx. rev.) · detalhe com metáfora médica — Identificação, Dados Técnicos (motor, chassi VIN, renavam), **Indicadores de Uso** ("85% até próxima revisão · 7.500 km restantes"), abas Prontuário/Histórico/Checklists/Fotos, botões Nova OS · Checklist · Editar.

**Ajustes automáticos (doc 14):**
- **Fix14 #3** — "Rev. próxima" em **âmbar**, não vermelho.

**Decisões do fundador (2026-07-14):**
- **Manter completo** (lista + detalhe com abas).
- **"Rev. vencida" acionável:** o veículo mostra que a **Rita já está reativando** (ou botão "reativar via Rita") → abre a conversa de retenção. Fecha o loop **Prontuário → CRM → WhatsApp** (doc 05).

**Manter (não mexer):** metáfora médica, Indicadores de Uso (% até revisão), Dados Técnicos, abas.

---

## 6. Portal do Cliente (+ Aprovação unificada) ✅ (mobile)

**Estado atual da referência:** Portal (acompanhamento, abas Status/Fotos/Histórico/Docs, timeline de rastreio) **separado** da Aprovação Digital (tela própria).

**Decisão do fundador (2026-07-14) — Fix14 #5:**
- **UNIFICAR** num único link do cliente: **Portal com abas Status · Diagnóstico/Aprovação · Fotos · Histórico · Docs**. A **Aprovação Digital deixa de ser tela separada e vira a aba de Aprovação** (item 7 abaixo descreve o conteúdo dessa aba).
- **Abas mantidas:** todas (Status, Fotos, Histórico, Docs). **Docs** com nota fiscal/OS como **preview** (emissão fiscal é Fase 1/2 — doc 04).
- O link que a **Nina** envia (`02`) abre este Portal, **na aba Aprovação** quando há orçamento pendente.

**Manter (não mexer):** timeline de rastreio (acerto FedEx/Amazon), header com veículo/mecânico/previsão.

---

## 7. Aprovação (aba do Portal) ✅ (mobile)

**Estado atual da referência:** sub-passos Diagnóstico · Resumo · Autorizar · contadores (avaliados/críticos/atenção/conformes) · item com CRÍTICO, consequência, observação do mecânico, **2 fotos**, orçamento do item (peça + mão de obra), **"O que acontece se não realizar?"**, Aprovar/Recusar · Autorizar com termos + assinatura.

**Ajustes automáticos (doc 14 + decisões):**
- **Fix14 #7** — **Recusar** manda o item para Serviços Recusados (Dashboard).
- **Pix** = **preview "em breve"** no passo Autorizar (doc 04 §10.2).
- Remover a barra de progresso duplicada (usa a timeline de Status do Portal).

**Decisões do fundador (2026-07-14):**
- **Assinatura desenhada** (dedo) — impacto de demo.
- **Orçamento itemizado** por item (peça + mão de obra separados) — transparência gera confiança.

**Manter (não mexer):** "O que acontece se não realizar?" (acerto doc 14, 55%→90%), fotos por item, contadores, observação do mecânico.

---

## 8. Checklist / DVI mobile ✅

**Estado atual da referência (alinhado ao plano):** header com contadores + progresso · grupos (Freios/Motor/Suspensão) · item com **Conforme/Atenção/Reprovado** (= severidade 🟢🟡🔴, Fix14 #1 ✅) · Evidência (Tirar Foto / Gravar Voz) · observação · Só problemas · Inspeção Finalizada (resumo + "salvo localmente, sincroniza online") · CONCLUIR.

**Ajustes automáticos (doc 14 + decisão):**
- **Fix14 #8** — **claro de alto contraste**, alvos de toque grandes (luva + sol). Dark = opção futura (dark só na TV).

**Decisões do fundador (2026-07-14):**
- **Áudio → texto estruturado:** o mecânico dita e a observação se preenche sozinha (**Beto**, o Agente do Mecânico, doc 05) — "menos digitação, o sistema escreve".
- **DVI → Orçamento automático:** item Reprovado/Atenção com foto vira automaticamente item do Orçamento no Hub (o consultor ainda pode incluir/remover lá). Fluxo mágico foto→orçamento (doc 04).

**Manter (não mexer):** Conforme/Atenção/Reprovado, Só problemas, offline "salvo localmente", resumo da inspeção.

---

## 9. Configurações ✅

**Estado atual da referência:** Identidade da Oficina (logo, nome, paleta do Portal) · Usuários e Permissões (papéis, matriz) · Integração WhatsApp (**Evolution API — credenciais**, expõe stack).

**Decisões do fundador (2026-07-14):**
- **Preview leve:** só **Identidade da Oficina** ativa (logo/nome/cores → white-label do Portal, amarrado ao `dados-demo.js`). **Usuários** e **Canal WhatsApp** ficam como **"em breve"**.
- **Reformular sem stack:** a seção WhatsApp vira **"Canal WhatsApp da oficina"** (número conectado, status, templates da Nina) — **sem "Evolution API"** (doc 10 §6: nunca expor stack).

**Amarração:** a Identidade repinta o Portal do Cliente (logo/cores) conforme `dados-demo.js` — reforça o white-label na demo.

---

# RESUMO DA REVISÃO — costura narrativa consolidada

Todas as telas revisadas convergem para **uma história costurada pela Nina e pela placa do dono**:

1. Cliente chama 21h47 → **Nina** agenda (`02`) → aparece na **Agenda** do Kanban.
2. Carro entra → **Lista/Kanban** → **Hub** (split view) → **Checklist** (**Beto**: áudio→texto, foto).
3. Itens Reprovados → **automático** viram **Orçamento** no Hub (**Téo** traduz) → **Nina envia o link**.
4. Cliente abre **Portal unificado** (Status + **Aprovação** com assinatura desenhada, itens itemizados) → aprova.
5. Recusados → **Serviços Recusados** no **Dashboard** (Fix14 #7).
6. Pátio: **Painel do Mecânico** ("o que faço agora"). Recepção: **Painel TV Cliente** (fotos + "se não trocar" + alerta de retirada por placa).
7. Pós: **Prontuário** marca "Rev. vencida" → **Rita reativa** → **CRM** mostra a atividade da Rita na linha do tempo do cliente.

**Inventário final do rebuild (13 superfícies):**
Nina/WhatsApp · Lista(+Fast Lane) · Hub · Checklist · Portal(Status+Aprovação+Fotos+Histórico+Docs) · Kanban(Lista/Kanban/Agenda) · Dashboard · CRM · Prontuário · Configurações · Painel do Mecânico · Painel TV Cliente.

**Fixes doc 14 aplicados:** #1 (severidade no item) · #2 (ranking off) · #3 (disciplina de cor, transversal) · #4 (placa 2 formatos) · #5 (Portal+Aprovação unificados) · #6 (parados incluem peças) · #7 (recusado clicável) · #8 (checklist contraste) · #9 (TV rotação/refresh).

**Próximo:** expandir `dados-demo.js` (blocos `orcamento[]`, `fila[]`, `clientes[]`, `veiculos[]`) → implementação (só após liberação).

