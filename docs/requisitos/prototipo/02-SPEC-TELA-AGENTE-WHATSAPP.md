# 02 — Spec Funcional: Tela do Agente no WhatsApp ⭐

**Origem:** `01-BRAINSTORM-SESSION.md` (Fase 1) · **Fase:** especificação de funcionalidades (pré-código)
**Tela:** 5 de 8 do inventário · **Prioridade:** máxima (é o diferencial nº1 e o gap da v1 — doc 14 §5)
**Data:** 2026-07-14

---

## 1. Objetivo da tela

Provar, em 90 segundos de demo, que o dono ganhou uma **funcionária que trabalha sozinha 24/7**: recebe o cliente, agenda, avisa do orçamento, confirma a aprovação, avisa que o carro está pronto e ainda traz o cliente de volta 6 meses depois — **sem nenhum humano tocar no WhatsApp**.

**Frase-alvo do dono ao ver a tela:** *"Isso aconteceu enquanto minha oficina estava fechada?"*

---

## 2. Enquadramento e ponto de vista

- **POV:** o celular **do cliente** (é o que dá o soco na demo — o dono vê a experiência que o próprio cliente dele teria).
- **Estrutura:** **thread única** cronológica, atravessando 4 momentos em ordem no tempo, com separadores ("HOJE", "No dia seguinte", "6 meses depois").
- **Comportamento:** **auto-play** — mensagens surgem uma a uma, com "digitando…" antes das respostas da Nina.
- **Tom da Nina:** **formal leve** — cordial e profissional, frases completas, sem gírias nem diminutivos ("rapidinho", "prontinho"). O **cliente** fala casual (é o motorista, não a marca).
- **Organograma digital (doc 05):** o protótipo tem **vários funcionários digitais nomeados**. Nesta thread aparecem **dois**: **Nina** (recepção — agenda, avisos, orçamento, carro pronto) e, 6 meses depois, **Rita** (pós-venda/retenção — reativação). Ver o mesmo cliente sendo atendido por uma "equipe" reforça a venda. Nomes vêm de `dados-demo.js` → `agentes`.

---

## 3. Requisitos funcionais

**RF-01 — Moldura de celular.** A conversa é exibida dentro de uma moldura de smartphone (status bar com hora/sinal/bateria), reforçando "isto é o que chega no telefone".

**RF-02 — Cabeçalho estilo WhatsApp.** Topo verde com seta de voltar, avatar (inicial da oficina), nome do contato igual a `{oficina}` e subtítulo dinâmico que alterna entre "online" e "digitando…".

**RF-03 — Thread única cronológica.** Uma só conversa, com separadores de tempo centralizados entre os blocos. O histórico permanece visível ao rolar (o WhatsApp não apaga — reforça o relacionamento contínuo).

**RF-04 — Momento: Agendamento 24/7.** Cliente escreve fora do horário; a Nina se apresenta, oferece dois horários, agenda e confirma pedindo nome e placa. É o bloco de abertura.

**RF-05 — Momento: Orçamento pronto + link.** A Nina avisa que a inspeção terminou e envia um **cartão de link** ("Orçamento — {oficina} · toque para ver fotos e aprovar"). Este cartão abre a **tela de Aprovação** (Portal). **A aprovação é feita NO LINK** — é lá que ficam registrados **assinatura, IP e horário** (trilha de auditoria, doc 06). Pela conversa a Nina apenas **confirma o recebimento** da autorização; ela nunca coleta o aceite por mensagem.

**RF-06 — Momento: Carro pronto.** A Nina avisa que o serviço acabou e informa horário de retirada.

**RF-07 — Momento: Retenção (6 meses depois).** Separador "6 meses depois"; a Nina reabre a conversa sozinha, lembra da revisão vencida e reagenda. Demonstra o ROI mais fácil de provar (doc 04).

**RF-08 — Auto-play com "digitando…".** As mensagens aparecem no tempo. Antes de cada resposta da Nina, o subtítulo do cabeçalho mostra "digitando…" por ~1,5s e surge o balão. Mensagens do cliente entram após pausa curta. O tempo é comprimido (cada passo ~1,5–3s), mas os **horários exibidos nos balões são os reais do roteiro** (21:47, 07:30, etc.).

**RF-09 — Horários e confirmação de leitura.** Cada balão tem horário. As mensagens do cliente (saída) mostram ✓✓ azul (lidas) — detalhe que aumenta o realismo.

**RF-10 — Controles de reprodução.** Botões discretos fora da moldura: **Repetir** (reinicia do zero) e **Pausar/Continuar**. Sem controle de velocidade nesta versão (evita ruído na visita).

**RF-11 — Notas de demo (liga/desliga).** Legendas abaixo do celular que aparecem no momento certo, para o dono ler — o "money line". Ex.: *"Agendado às 21:50. A oficina estava fechada há 3 horas. Ninguém respondeu."* Toggle para escondê-las e deixar a tela 100% limpa.

**RF-12 — Interpolação de `dados-demo.js`.** Oficina, nome da Nina, cliente (e primeiro nome derivado), placa, veículo, horário e queixa vêm do arquivo único de dados. Trocar a placa do dono repinta a conversa inteira.

**RF-13 — Nunca rotular como "IA".** Em nenhum ponto da tela aparece "IA", "assistente", "bot" ou "inteligência artificial". A Nina tem nome de gente e assina como recepção da oficina (doc 10 §6).

**RF-14 — Offline.** A tela abre e roda sem internet (demo presencial na oficina).

---

## 4. Roteiro completo da conversa (copy para revisão)

> Placeholders entre `{ }` vêm do `dados-demo.js`. Valores de exemplo: oficina = *Auto Center Sarandi*, Nina, cliente = *João Ribeiro*, placa = *ABC1D23*, veículo = *Gol 1.6*, horário = *08:30*.

**Separador: HOJE — sexta-feira, 21:47**

| # | De | Horário | Mensagem |
|---|----|---------|----------|
| 1 | Cliente | 21:47 | Boa noite! Vocês atendem amanhã? Tô ouvindo {queixa} no meu carro. |
| 2 | Nina | 21:47 | Boa noite! Aqui é a {agente}, da {oficina}. Sim, atendemos amanhã. Podemos verificar esse ruído sem problema — posso já reservar um horário para você? |
| 3 | Cliente | 21:48 | Pode ser de manhã? |
| 4 | Nina | 21:48 | Tenho {horario} ou 10:00 disponíveis. Qual fica melhor para você? |
| 5 | Cliente | 21:49 | {horario} tá ótimo |
| 6 | Nina | 21:49 | Ótimo. Pode me confirmar seu nome e a placa do veículo, por favor? |
| 7 | Cliente | 21:49 | {cliente}, placa {placa} |
| 8 | Nina | 21:50 | Perfeito, {primeiroNome}! Seu horário está confirmado para amanhã às {horario} — {veiculo}, placa {placa}. Enviarei um lembrete pela manhã. Tenha uma boa noite! |

> **Nota de demo:** *Sexta-feira, 21:50 — sua oficina fechada há horas. Sem a {agente}, essa mensagem só seria lida na segunda, e o cliente provavelmente já teria fechado com o concorrente. Aqui, o carro já entrou na agenda. Ela não dorme, não tira folga e não perde cliente por demora.*

**Separador: NO DIA SEGUINTE**

| # | De | Horário | Mensagem |
|---|----|---------|----------|
| 9 | Nina | 07:30 | Bom dia, {primeiroNome}! Passando para lembrar do seu horário hoje às {horario}, aqui na {oficina}. Estamos à sua espera. |
| 10 | Nina | 11:05 | {primeiroNome}, concluímos a inspeção do {veiculo}. Identificamos um item que precisa de atenção. Preparei o orçamento com as fotos para você visualizar e aprovar o que desejar: |
| 11 | Nina | 11:05 | **[Cartão de link]** Orçamento — {oficina} · toque para ver as fotos e aprovar |
| 12 | Cliente | 11:31 | Acabei de aprovar no link — pastilha e disco. O resto fica pra próxima. |
| 13 | Nina | 11:31 | Recebi sua autorização pelo link, {primeiroNome} — ficou registrada com sua assinatura e horário. Aprovado: pastilha + disco dianteiro. Já passo para o mecânico iniciar e aviso quando estiver pronto. |

> **Nota de demo:** *A aprovação foi feita **no link** (assinatura + horário registrados, trilha de auditoria) — não por mensagem. Em 26 minutos, pelo celular, olhando a foto da peça: sem uma ligação, sem vir à oficina. O que normalmente trava por dias foi fechado antes do almoço.*

**Separador: (mesmo dia, à tarde)**

| # | De | Horário | Mensagem |
|---|----|---------|----------|
| 14 | Nina | 16:40 | {primeiroNome}, seu {veiculo} já está pronto! A retirada pode ser feita a partir das 17h. O problema no freio foi resolvido. |
| 15 | Cliente | 16:52 | Show, obrigado! Passo aí depois das 5 |
| 16 | Nina | 16:52 | Combinado! Qualquer coisa, estou à disposição. |

**Separador: 6 MESES DEPOIS**

| # | De | Horário | Mensagem |
|---|----|---------|----------|
| 17 | **Rita** | 09:12 | Olá, {primeiroNome}! Aqui é a Rita, do pós-venda da {oficina}. Já se passaram 6 meses desde a última revisão do seu {veiculo}. Deseja que eu reserve um horário para uma verificação? |
| 18 | Cliente | 09:20 | Opa, boa lembrança. Pode marcar sábado de manhã? |
| 19 | **Rita** | 09:20 | Reservado para sábado às 09:00. Enviarei um lembrete na sexta-feira. Até lá! |

> **Nota de demo:** *6 meses depois, foi a **Rita** (pós-venda) que reativou o cliente sozinha — outro funcionário digital da mesma oficina. Alguém que já tinha sumido voltou a faturar, sem ninguém na oficina lembrar que ele existia. Multiplique por toda a sua base: é a receita que hoje escorre pelo ralo todo mês, silenciosamente.*

---

## 5. Dados interpolados (contrato com `dados-demo.js`)

| Campo | Uso na tela |
|---|---|
| `oficina` | Nome do contato no topo + assinatura da Nina |
| `agente` | Nome da recepcionista ("Nina") |
| `cliente` | Balões de entrada; nome informado no agendamento |
| `primeiroNome` (derivado) | Como a Nina chama o cliente |
| `placa` | Confirmação de agendamento + cartão de link |
| `veiculo` | Referência ao carro nas mensagens |
| `horario` | Horário agendado |
| `queixa` | Motivo do contato (abertura) |

---

## 6. Fora de escopo desta tela (registrar para não invadir)

- Cobrança / Pix / 2ª via (Fase 2 — não entra na demo).
- Múltiplas threads / lista de conversas (foi decidido thread única).
- Interação de digitar de verdade (é auto-play, não chat funcional).
- A tela de Aprovação em si (é outra tela; aqui só o cartão de link que a representa).

---

## 7. Critérios de "pronto" (aceite da tela)

1. Abre offline com duplo-clique e roda a jornada inteira em auto-play.
2. Trocar `placa`/`oficina`/`cliente` em `dados-demo.js` repinta a conversa inteira, sem tocar em HTML.
3. Passa a "regra do IA": nenhuma palavra que denuncie automação (doc 10 §6).
4. Um observador leigo confunde com um print de WhatsApp real (cabeçalho, balões, ticks, horários, "digitando…").
5. As notas de demo podem ser desligadas para deixar a tela limpa.

---

## 8. Decisões desta spec (registro)

- 4 momentos numa thread única cronológica. — fundador
- Auto-play com "digitando…" + replay/pausar. — fundador
- POV do celular do cliente. — @brainstorm (recomendação, não contestada)
- Cartão de link do orçamento costura esta tela com a de Aprovação. — @brainstorm
- Notas de demo ("money lines") como camada opcional. — @brainstorm

*Próximo: revisar/ajustar a copy do §4. Depois, handoff para implementação (@dev / skill `impeccable`) — só após aprovação.*
