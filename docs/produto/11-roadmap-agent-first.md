# 11 — Roadmap Agent-First (Completo, por Fase)

> **Nota (2026-07-17):** numeração de **build** re-baselinada em [18 — Fases e Estimativas](18-fases-e-estimativas-build.md) (pós-pivô "MVP expandido"). Escopo e racional aqui seguem válidos.

## A tese central (reposicionamento formal)

**O agente é o core do produto. O Atendimento é o core dos dados.**

- Agente sem dado soberano = chatbot decorativo (o que o mercado nacional chama de "IA" hoje).
- Dado sem agente = sistema de gestão comum (Ultracar, AutoPro).
- **Os dois juntos = funcionários digitais operando um sistema vivo.** É a tese Tekion (um núcleo de dados, agentes por cima) aplicada à oficina independente brasileira.

Todo módulo do roadmap existe para uma de duas coisas: (a) dar mãos e olhos aos agentes (dados, ações), ou (b) dar interface aos humanos que trabalham com eles.

## O argumento econômico dos agentes (base do pitch)

| Tipo de agente | Vende-se por | Conta |
|---|---|---|
| Comunicação (Recepcionista, Cobrador, Retenção operacional) | **Folha economizada / contratação evitada** | Funcionário administrativo CLT: ~R$ 2.400–3.200/mês (salário+encargos+benefícios), 8h/dia. Pacote de agentes: R$ 300–500/mês, 24/7 |
| Receita (Consultor, Retenção comercial) | **Faturamento gerado** | Consultor: +itens aprovados por orçamento (foto+explicação); Retenção: clientes reativados × ticket médio |
| Produtividade (Mecânico, Técnico) | **Vazão** | Menos digitação = mais carro/dia = adoção real |
| Decisão (Gestor) | **Percepção de controle** | "Converso com minha oficina" — retenção e demo |

**Enquadramento de venda (regra):** nunca "demita alguém". Sempre: *"não contrate o próximo funcionário"* e *"seu pessoal para de fazer trabalho de robô"*. No ICP (2–10 pessoas), quem responde o WhatsApp geralmente é o dono/consultor nas brechas — o agente devolve horas, não corta cabeças. Discurso de demissão cria inimigo interno e sabotagem.

## Quem o agente substitui (mapa honesto, por função)

| Função | Substituição | Papel do agente |
|---|---|---|
| Recepcionista/secretária/"pessoa do WhatsApp" | Alta | Agenda, confirma, remarca, avisa, responde preço/horário |
| Auxiliar administrativo (cobrança/pós-venda) | Parcial-alta | Régua de cobrança, reativação, pesquisa de satisfação |
| Consultor técnico | Não (acelera) | Prepara orçamento explicado; humano negocia e fecha |
| Mecânico | Nunca | Só tira burocracia (áudio → checklist) |
| Gestor/dono | Não (amplia visão) | Responde com dados; decisão continua humana |

---

## FASE 0 — MVP "Aprova no Zap" (validação, 3–5 fundadores)

**Objetivo:** provar a hipótese mais arriscada — foto → orçamento → aprovação no WhatsApp — com 1 agente de ROI mensurável.

| Bloco | Funcionalidades |
|---|---|
| Núcleo de dados | Atendimento (entidade soberana); cliente; veículo por placa (API); histórico por placa |
| Operação | Lista com status; OS + orçamento (peças + mão de obra); DVI simplificado (foto por item) |
| Comunicação | Link de aprovação item a item (aceite + IP/timestamp); notificações WhatsApp (Evolution) |
| **Agente (1)** | Consultor **ou** Retenção (decidir na validação de campo) |
| Onboarding | Importador de clientes/veículos via planilha |
| Gestão | Relatório básico (faturamento, ticket médio, OS abertas) |

*Inspiração internacional aplicada:* DVI do Tekmetric/Shopmonkey (foto vira linha de orçamento com trilha de auditoria) — trocando SMS por WhatsApp.

## FASE 1 — "Recepção que não dorme + substitui o sistema antigo" (5–20 clientes)

**Objetivo:** ser o motivo pelo qual a oficina **cancela** o sistema anterior.

| Bloco | Funcionalidades |
|---|---|
| **Agentes** | **Recepcionista** (agenda/confirma/remarca/responde 24/7 — espelho do Scheduler AI da Tekion); evolução do agente do MVP |
| Operação | Kanban visual + tela de Exceções (aguardando peça, cliente não responde, atraso, retrabalho); checklist mobile com áudio ditado → estruturação (agente do Mecânico v1); **Painel do Mecânico** (fila do box na ótica de quem executa: minha fila, OS ativa com timer, meu dia, avisos) |
| Balcão | **PDV Essencial:** venda de peça sem OS, forma de pagamento, NFC-e; **Estoque Básico:** cadastro, quantidade, alerta de mínimo, baixa por OS/venda |
| **CRM da Oficina** | **Serviços Recusados:** toda recusa no link de aprovação vira fila de reativação por veículo (recuperação típica de 18–28% — padrão Tekmetric/Shopmonkey, inexistente no BR); tela de recusados + "adicionar à nova OS"; Agente de Retenção trabalha a fila (14/30 dias). **Resumo Diário no WhatsApp do dono:** faturamento do dia, carros entregues, orçamentos parados (R$), agenda de amanhã — cron + template, custo quase zero (inspiração: SMS de pacing da Tekion) |
| Fiscal | NFS-e (mão de obra) + NF-e/NFC-e (peças) via Focus NFe/PlugNotas |
| Pagamentos | Pix no link de aprovação (Asaas) — o "text-to-pay" brasileiro |
| Gestão | Dashboard do gestor; primeiros indicadores (horas apontadas, box parado) |

*Inspiração:* text-to-pay (Tekmetric — dono americano descarta software sem isso); fiscal embutido como feature de retenção.

## FASE 2 — "A oficina que se gerencia" (20–50 clientes)

**Objetivo:** o dono conversa com a oficina; o sistema vira o cérebro financeiro-operacional.

| Bloco | Funcionalidades |
|---|---|
| **Agentes** | **Gestor** ("T1 nosso": pergunta por áudio/texto, comandos — "abre OS de troca de óleo pra ABC1D23"); **Cobrador** (régua, 2ª via Pix, baixa automática); Mecânico v2 (offline) |
| Financeiro | PDV completo (caixa/turno, sangria, crediário, devolução); contas a pagar/receber; fluxo de caixa; DRE simples; comissões; conciliação automática (webhook Asaas); **repasse opcional da taxa de cartão** (Lei 13.455/2017 — protege margem da oficina) |
| Estoque | Compras; análise ABC; múltiplos depósitos; conciliação com nota de entrada (XML do fornecedor → categorização automática por IA) |
| Produtividade | Apontamento completo (iniciar/pausar/finalizar); utilização de box; ranking; matrizes de margem (piso/teto de markup — padrão Tekmetric) |
| Interface | Painel TV de chão de fábrica (equipe); **Painel de TV do Cliente** (recepção: acompanhamento amigável + slide de fotos de itens em manutenção como fricção passiva de venda — fotos anonimizadas por LGPD, configurável pelo dono); app mobile offline-first real; **Resumo do Cliente por IA** (snapshot ao abrir atendimento: histórico, recusados pendentes, preferências); **fila de follow-up priorizada por valor parado**; dashboard com drill-down universal (todo número clicável leva às OS de origem) e meta vs. realizado |

*Inspiração:* T1/Jarvis (camada conversacional sobre a plataforma); flag hours e matrizes de margem (Tekmetric/Shop-Ware).

## FASE 3 — "Plataforma / ecossistema" (50+ clientes)

**Objetivo:** de produto pra plataforma — modelo das três nuvens da Tekion adaptado.

| Bloco | Funcionalidades |
|---|---|
| **Agentes** | **Técnico** (placa → óleo/litragem/filtro/tempo padrão — bases Tecfil/tempário Sindirepa); **Peças** (cotação com fornecedores via WhatsApp, comparativo na OS); Marketing Sazonal; Garantia; Onboarding |
| Operação | Garantia (OS vinculada); Atendimento Interno (equipamentos/elevadores da própria oficina) |
| Plataforma | Multiunidade/redes; APIs públicas; consulta CNPJ automática; ecossistema de parceiros (autopeças, distribuidores, possível integração Cilia para colisão/cotação) |
| Inteligência | BI/Analytics; diagnóstico assistido por IA; benchmarks anônimos regionais ("oficinas do seu porte em Maringá faturam X") |
| Expansão | Verticais adjacentes: pesados, frotas, máquinas agrícolas (forte na região agro do PR) |

*Inspiração:* APC/Partner Cloud (Tekion — parceiros pagam pra vender dentro do ecossistema); marketplace de peças como camada futura de receita.

---

## Mapa de inspirações internacionais → aplicação Brasil/Maringá

| Empresa (fatura lá fora) | O que fazem de melhor | Nossa tradução regional |
|---|---|---|
| **Tekion** (US$ 4 bi+) | Um núcleo de dados, suíte de agentes (Scheduler/Technician/Service/T1), receita em camadas, ecossistema de parceiros | Atendimento soberano + 8 agentes + assinatura/addon/pagamentos/parceiros |
| **Tekmetric / Shopmonkey / AutoLeap / Shop-Ware** (US$ 179–199/mês entrada) | DVI foto/vídeo→orçamento; text-to-pay; matrizes de margem; flag hours | DVI→WhatsApp; Pix no link; margem e apontamento nas Fases 1–2 |
| **ServiceTitan** (OS de serviços residenciais, IPO) | "Sistema operacional" do nicho + fintech embutido (pagamento, financiamento) como segunda receita | Asaas split no link de aprovação; futuro: antecipação de recebíveis pra oficina |
| **EiBarber (BR, validação local)** | Jarvis: agente que responde o dono por áudio em PME brasileira | Prova que o Agente Gestor funciona no nosso público — em oficina ninguém fez |

**Regra de ouro da tradução:** importar o *conceito*, adaptar o *canal* (SMS→WhatsApp, cartão→Pix, inglês→"papo de balcão") e o *preço* (÷5 do dólar, mas com custo de IA também ÷5 pela stack barata — doc 10).

## Diferenciação nichada Maringá e região (resumo executivo)

1. **DVI foto→orçamento→aprovação no zap** — ninguém no Brasil entrega; nos EUA é o padrão-ouro.
2. **Funcionários digitais de verdade** (não e-mail agendado apelidado de CRM).
3. **Fundador ex-mecânico da região** — fala a língua, visita pessoalmente, suporte na porta (nenhum player nacional tem presença física aqui).
4. **Atendimento soberano** — o mecânico/consultor/dono nunca troca de módulo pra concluir um serviço.
5. Substituição completa do sistema antigo (PDV Essencial + fiscal + estoque na Fase 1) com preço transparente.
