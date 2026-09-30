# 05 — Agentes de IA (O Organograma Digital)

## Conceito

Os agentes são **funcionários digitais** que operam sobre os dados do próprio sistema (Atendimento, OS, agenda, clientes) — nunca sobre sistemas de terceiros. Isso elimina o problema de integração que inviabilizou a ideia original de "agente genérico" e segue o padrão validado pela suíte agêntica da Tekion (Scheduler AI, Technician AI, Service AI, T1) e pelo Jarvis do EiBarber em PME brasileira.

**Modelo comercial:** 1 agente incluso no plano base; demais como **add-on premium** (padrão Tekion de monetizar IA).

## Portfólio

### 1. Agente Recepcionista — *Fase 1*
- **Faz:** responde WhatsApp 24/7, informa preços/horários, agenda, confirma, remarca, encaixa cancelamentos, transfere pro humano quando a conversa foge do escopo.
- **Equivalente:** Scheduler AI (Tekion); Secretária IA do mercado de clínicas.
- **ROI vendável:** "nunca mais perder cliente por demora — o cliente das 21h agenda sozinho".
- **Guardrails:** nunca dá diagnóstico técnico; nunca fecha preço de serviço complexo sem humano; escalação clara.

### 2. Agente do Consultor — *candidato a MVP*
- **Faz:** transforma a anotação bruta do mecânico ("pastilha 3mm, disco no limite, bieleta folgada") em recomendação em língua de cliente, com foto anexada e valor, pronta pra enviar no link de aprovação.
- **Equivalente:** Service AI (Tekion) + resumos de vídeo por IA (Tekmetric/Shop-Ware).
- **ROI vendável:** **aumenta ticket médio** — a foto + explicação clara é o que faz o cliente aprovar o serviço adicional.

### 3. Agente de Retenção (CRM) — *candidato a MVP*
- **Faz:** cruza KM + tempo + histórico e puxa o cliente de volta ("seu Gol fez ~9.500 km desde a troca de óleo — quer agendar?"); pós-venda (pesquisa de satisfação); reativação de inativos.
- **ROI vendável:** receita recorrente pro dono — o argumento mais fácil de provar com número (X clientes reativados = R$ Y).
- **Atenção de custo:** mensagens ativas fora de janela = template de *marketing* na API oficial (R$ 0,3217/msg) — precificar o add-on considerando isso na migração futura.

### 4. Agente do Mecânico — *Fase 1–2*
- **Faz:** o mecânico dita por áudio; o agente estrutura no checklist/DVI (item, severidade, observação), sugere fotos faltantes.
- **ROI:** adoção — menos digitação = mecânico usa de verdade. Resolve a anti-persona do "usuário indisciplinado".

### 5. Agente Cobrador — *Fase 2*
- **Faz:** régua de cobrança educada no WhatsApp, segunda via de Pix, baixa automática (webhook Asaas), aviso ao gestor de inadimplência crônica.
- **ROI:** reduz inadimplência sem constranger o dono (a "cobrança tem cara de sistema, não de amigo cobrando").

### 6. Agente Gestor ("T1 nosso") — *Fase 2*
- **Faz:** interface conversacional sobre toda a plataforma. "Quanto faturei essa semana?", "Qual carro tá parado há mais de 3 dias?", "Abre uma OS de troca de óleo pra placa ABC1D23". Aceita áudio.
- **Equivalente:** T1 (Tekion), Jarvis (EiBarber).
- **ROI:** diferencial de demo absurdo; retenção (o dono "conversa com a oficina").

### 7. Agente Técnico — *Fase 3*
- **Faz:** placa → especificação de óleo (SAE/API), litragem, filtros compatíveis, tempo padrão de mão de obra do serviço.
- **Fontes:** base própria (fabricante × modelo × motor), catálogos de fabricantes (ex.: Tecfil já permite busca de filtro por placa), tempários (Sindirepa, Catálogo Tempário, Tempario.com.br).
- **ROI:** mata os "3 apps abertos no balcão"; padroniza precificação de mão de obra.

### 8. Agente de Peças — *Fase 3*
- **Faz:** cota peça com fornecedores cadastrados via WhatsApp, consolida respostas em comparativo dentro da OS.
- **Contexto competitivo:** cotação de peças é o território que a Cilia está atacando com marketplace — avaliar parceria vs. construção quando chegar a hora.

## Arquitetura de agentes (diretrizes)

- **Orquestração própria** (expertise já em construção no Hermes Agent pessoal): roteamento por tarefa — modelo forte para conversa com cliente, modelo barato para classificação/estruturação.
- Cada agente tem: escopo declarado, ferramentas permitidas (tools sobre o núcleo do sistema), política de escalação para humano, log auditável de toda ação.
- **Toda ação de agente vira evento na Timeline do Atendimento** (transparência: o dono vê o que o funcionário digital fez).
- Conversas: janela de contexto por cliente/veículo com memória do relacionamento (horário preferido, veículos da família, histórico) — respeitando LGPD (dado pessoal minimizado, consentimento no primeiro contato, opt-out simples).
