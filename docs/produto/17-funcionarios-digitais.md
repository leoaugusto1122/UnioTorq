# 17 — Funcionários Digitais (Spec por Agente)

> Consolida o portfólio de [05-agentes-de-ia.md](05-agentes-de-ia.md) sob a arquitetura de [ADR-001 — 3 camadas](../arquitetura/adr/ADR-001-arquitetura-3-camadas.md).
> Princípio-mestre: **o cliente não compra "8 agentes de IA" — compra uma equipe digital que trabalha junto com a equipe humana durante toda a jornada do veículo.** Internamente, ~95% do trabalho dos funcionários digitais é feito por **regras e automações (0 token)**; a IA entra só para interpretar e gerar.
>
> **Refinamento ([ADR-002](../arquitetura/adr/ADR-002-memoria-viva.md)):** os funcionários digitais são **especialistas stateless** — não têm memória própria; todos consultam a mesma **Memória Viva** (como especialistas de um hospital lendo o mesmo prontuário). A skill define a *especialidade*; o *conhecimento* mora na Memória Viva.

---

## Como ler esta spec

Cada funcionário digital responde 7 perguntas fixas (torna a proposta de valor **tangível**: a oficina vê exatamente pelo que paga na mensalidade):

1. **Objetivo** — o que ele existe para conquistar (organizado por objetivo, não por departamento).
2. **Problema que resolve** — a dor real da operação.
3. **Economia** — que trabalho repetitivo ele tira do humano.
4. **Camada dominante** — Regra / Automação / IA (ver [ADR-001](../arquitetura/adr/ADR-001-arquitetura-3-camadas.md)).
5. **Dados que consulta** — o que ele lê do núcleo do sistema.
6. **Ações automáticas** — o que executa sozinho (dentro de trilhos).
7. **Ações que exigem aprovação humana** — o limite rígido.
8. **ROI** — como medir o valor entregue.

> **Nota de arquitetura:** "camada dominante = IA" **não** significa que o agente é caro. Significa que o *passo que agrega valor* é interpretação/geração. Tudo que antecede (descobrir o quê, quando, para quem) é Camada 1/2, custo zero. **Quem descobre é o algoritmo; quem escreve é a IA.**

---

## Matriz-resumo

| # | Funcionário Digital | Objetivo | Camada dominante | Fase |
|---|---|---|---|---|
| 1 | Recepcionista Digital | Nunca perder cliente por demora | IA autônoma (Nível 3) + Regra | Fase 1 |
| 2 | Consultor Digital | Aumentar ticket médio | IA assistida (Nível 2) + Regra | Candidato MVP |
| 3 | Assistente de Retenção | Fazer o cliente voltar | Regra + Automação (Nível 1) + IA p/ texto | Candidato MVP |
| 4 | Assistente Técnico (Mecânico) | Reduzir digitação / adoção | IA assistida (Nível 2) | Fase 1–2 |
| 5 | Assistente de Cobrança | Reduzir inadimplência | Automação (Nível 1) + IA p/ tom | Fase 2 |
| 6 | Gestor Digital ("T1") | Ajudar o dono a decidir | Regra (dados) + IA (resposta) | Fase 2 |
| 7 | Especialista Técnico (base) | Matar os "3 apps no balcão" | Regra + base de conhecimento | Fase 3 |
| 8 | Assistente de Peças | Agilizar cotação | Automação + IA p/ consolidar | Fase 3 |

---

## 1. Recepcionista Digital — *Fase 1*

- **Objetivo:** nunca perder um cliente por demora de atendimento no WhatsApp.
- **Problema que resolve:** "perco cliente porque o WhatsApp acumula enquanto atendo"; cliente das 21h não é respondido.
- **Economia:** horas diárias respondendo perguntas repetitivas (preço, horário, agendamento, confirmação, remarcação).
- **Camada dominante:** **IA autônoma (Nível 3)** para a conversa; **Regra** para agenda/disponibilidade.
- **Dados que consulta:** agenda, serviços e preços cadastrados, cliente/veículo, política de horário e tolerância.
- **Ações automáticas:** responder no WhatsApp 24/7, agendar, confirmar, remarcar, encaixar cancelamento, enviar localização.
- **Exigem aprovação humana:** diagnóstico técnico, fechar preço de serviço complexo — escala para humano.
- **ROI:** nº de agendamentos fora do horário comercial; taxa de resposta < X min; agendamentos que teriam sido perdidos.

## 2. Consultor Digital — *candidato a MVP*

- **Objetivo:** aumentar o ticket médio via aprovação mais fácil.
- **Problema que resolve:** cliente demora dias para aprovar orçamento; serviço adicional recusado por falta de clareza.
- **Economia:** o consultor humano só revisa — não redige cada recomendação do zero.
- **Camada dominante:** **IA assistida (Nível 2)** para redigir; **Regra** para montar orçamento (peças + serviços + desconto + total).
- **Dados que consulta:** checklist/DVI, fotos, tabela de peças/serviços, serviços recusados no histórico.
- **Ações automáticas:** transformar anotação bruta em recomendação em língua de cliente, anexar foto, montar rascunho de orçamento, reofertar serviço recusado quando fizer sentido.
- **Exigem aprovação humana:** **preço final sempre revisado pelo consultor humano**; envio ao cliente.
- **ROI:** ticket médio antes/depois; taxa de aprovação de itens adicionais; tempo até aprovação.

## 3. Assistente de Retenção (CRM) — *candidato a MVP*

- **Objetivo:** fazer o cliente voltar (receita recorrente).
- **Problema que resolve:** "cliente some depois do serviço"; itens recusados e revisões são esquecidos.
- **Economia:** horas procurando quem contatar; o algoritmo monta a fila sozinho.
- **Camada dominante:** **Regra + Automação (Nível 1)** para descobrir *quem/quando*; **IA** só para redigir a mensagem.
- **Dados que consulta:** KM + tempo desde última visita, itens recusados, recomendações pendentes, inativos, aniversário de revisão.
- **Ações automáticas:** criar fila de contatos, enviar lembretes dentro das regras, ofertar combinação (ex.: óleo vencido + pastilha recusada).
- **Exigem aprovação humana:** oferecer desconto / criar condição comercial especial.
- **ROI:** taxa de retorno, clientes reativados (X reativados = R$ Y), aumento de faturamento recuperado.
- **Atenção de custo:** mensagem ativa fora de janela = template de *marketing* na API oficial (R$ 0,3217/msg) — precificar o add-on ([05](05-agentes-de-ia.md)).

## 4. Assistente Técnico (do Mecânico) — *Fase 1–2*

- **Objetivo:** reduzir digitação para que o mecânico use o sistema de verdade (adoção).
- **Problema que resolve:** "anotar tudo é impossível no meio da graxa" — anti-persona do usuário indisciplinado.
- **Economia:** elimina digitação no box; o mecânico dita por áudio.
- **Camada dominante:** **IA assistida (Nível 2)** — áudio → item estruturado no checklist/DVI.
- **Dados que consulta:** checklist/DVI do atendimento, fotos anexadas, veículo.
- **Ações automáticas:** estruturar áudio em item/severidade/observação; sugerir fotos faltantes; classificar foto (freio/motor/suspensão); gerar histórico e recomendações futuras.
- **Exigem aprovação humana:** confirmação do mecânico sobre o item estruturado antes de virar recomendação de venda.
- **ROI:** % de checklists preenchidos por áudio; tempo de preenchimento; adoção real (mecânicos ativos/dia).

## 5. Assistente de Cobrança — *Fase 2*

- **Objetivo:** reduzir inadimplência sem constranger o dono.
- **Problema que resolve:** cobrança "com cara de amigo cobrando"; segunda via manual de Pix.
- **Economia:** régua de cobrança automática; baixa automática por webhook.
- **Camada dominante:** **Automação (Nível 1)**; **IA** só para ajustar o tom da mensagem.
- **Dados que consulta:** financeiro/OS em aberto, status de pagamento (webhook Asaas), histórico de inadimplência.
- **Ações automáticas:** régua educada no WhatsApp, segunda via de Pix, baixa automática, aviso ao gestor de inadimplência crônica.
- **Exigem aprovação humana:** negociação, parcelamento, perdão de valor.
- **ROI:** redução de inadimplência; dias médios de recebimento; valor recuperado.

## 6. Gestor Digital ("T1 nosso") — *Fase 2*

- **Objetivo:** ajudar o dono a decidir (e reter o cliente pelo "conversar com a oficina").
- **Problema que resolve:** "não sei se tô no lucro, mecânico enrola no box".
- **Economia:** relatórios sob demanda por pergunta/áudio, sem navegar em telas.
- **Camada dominante:** **Regra** gera os números (receita, lucro, ticket médio, utilização de box); **IA** interpreta a pergunta e escreve a resposta.
- **Dados que consulta:** toda a plataforma (faturamento, OS, agenda, apontamento de horas, veículos parados).
- **Ações automáticas:** responder perguntas ("quanto faturei essa semana?", "qual carro parado > 3 dias?"), abrir OS por comando de voz.
- **Exigem aprovação humana:** ações que alteram dados relevantes (confirmar antes de executar).
- **ROI:** engajamento do dono (perguntas/semana); diferencial de demo; retenção.

## 7. Especialista Técnico (base de conhecimento) — *Fase 3*

- **Objetivo:** matar os "3 apps abertos no balcão" e padronizar precificação de mão de obra.
- **Problema que resolve:** procurar especificação técnica em fontes dispersas na internet.
- **Economia:** consulta instantânea a uma **base própria** (ativo defensável), não busca genérica.
- **Camada dominante:** **Regra + base de conhecimento** (consulta estruturada); IA só se precisar interpretar manual.
- **Dados que consulta:** base própria (fabricante × modelo × motor), catálogos (ex.: Tecfil por placa), tempários (Sindirepa, Tempário).
- **Ações automáticas:** placa → especificação de óleo (SAE/API), litragem, filtros compatíveis, torque, fluidos, procedimentos, recalls/TSB, tempo padrão de mão de obra.
- **Exigem aprovação humana:** aplicar o tempo/valor sugerido no orçamento.
- **ROI:** tempo de consulta técnica; padronização de mão de obra; erros de especificação evitados.
- **Nota estratégica:** a base auto-aprendiz é um **ativo defensável** (ver doc 16) — cada oficina que usa enriquece a base.

## 8. Assistente de Peças — *Fase 3*

- **Objetivo:** agilizar cotação de peças com fornecedores.
- **Problema que resolve:** cotar peça manualmente em vários fornecedores por WhatsApp.
- **Economia:** dispara e consolida cotações sem intervenção manual.
- **Camada dominante:** **Automação** (dispara/coleta); **IA** consolida respostas em comparativo.
- **Dados que consulta:** OS, fornecedores cadastrados, peça requerida.
- **Ações automáticas:** enviar pedido de cotação, consolidar respostas em comparativo dentro da OS.
- **Exigem aprovação humana:** escolha do fornecedor / fechamento da compra.
- **ROI:** tempo de cotação; economia por comparação de preço.
- **Contexto competitivo:** território que a Cilia ataca com marketplace — avaliar parceria vs. construção ([05](05-agentes-de-ia.md)).

---

## Regra de ouro (deriva do ADR-001)

Para **cada ação** de qualquer funcionário digital, pergunte: *isto é um fato/cálculo (Camada 1), um fluxo (Camada 2), ou interpretação/geração (Camada 3)?* Só a Camada 3 gasta cota. Se um funcionário digital estiver chamando IA para descobrir um fato que o SQL responde, **é bug de arquitetura, não feature.**
