# 10 — Custos Detalhados e Plano do Piloto

*Cotação de referência: US$ 1 = R$ 5,14 (jul/2026). Preços de LLM mudam trimestralmente — revalidar antes de decisões de precificação.*

## 1. Infraestrutura (stack: Coolify/VPS + Cloudflare + Evolution + n8n)

### Fase piloto (1–3 oficinas)

| Item | Solução | R$/mês |
|---|---|---|
| VPS única (Postgres, Redis, NestJS, Evolution API, n8n) | Hetzner/Contabo 4vCPU/8GB ou equivalente nacional | 50–90 |
| Front-end | Cloudflare Pages (free tier) | 0 |
| Storage fotos/PDFs | Cloudflare R2 (10GB grátis; ~US$0,015/GB depois) | 0 |
| Domínio .com.br + subdomínios | Registro.br R$ 40/ano | ~4 |
| WhatsApp | Evolution API self-hosted (anti-ban: delay randômico, "digitando...", aquecimento, limite de volume) | 0 |
| API de placa | pré-pago ~R$ 0,10–0,30/consulta, **cachear por placa** | 10–30 |
| E-mail transacional | Resend/SES free tier | 0 |
| Asaas | sem mensalidade; taxa por transação | 0 fixo |
| **Total** | | **65–125** |

### Fase 20+ clientes

VPS maior ou 2ª VPS (150–250) + R2 (20–60) + placa (~100) + monitoramento/backup (20–50) → **~R$ 300–450/mês**.

## 2. Custo de IA por modelo (por 1M tokens, entrada/saída)

| Modelo | US$ | R$ (×5,14) | Papel no produto |
|---|---|---|---|
| GLM-4.7-Flash | grátis | 0 | Piloto: classificação/estruturação |
| DeepSeek V4 Flash | 0,14 / 0,28 (cache ~0,0036) | 0,72 / 1,44 | Produção: Ag. Mecânico, Retenção, Cobrador |
| Gemini 3.1 Flash-Lite | 0,10 / 0,40 | 0,51 / 2,06 | Budget multimodal (fotos DVI) |
| MiniMax M3 | 0,60 / 2,40 | 3,08 / 12,34 | Ag. Recepcionista/Consultor (conversa com cliente) |
| Gemini 3 Flash | 0,50 / 3,00 | 2,57 / 15,42 | Mid-tier alternativo |
| GLM-5.2 | 1,40 / 4,40 | 7,20 / 22,62 | Mid-tier alternativo |
| Gemini 3.1 Pro | 2 / 12 | 10,28 / 61,68 | Fallback casos difíceis |
| Claude Sonnet 4.6 / GPT-5.4 | 3/15 e 2,50/15 | ~13–15 / 77 | Ag. Gestor (raciocínio sobre o negócio) |
| Claude Opus 4.8 / GPT-5.5 | 5/25 e 5/30 | 26 / 128–154 | NÃO usar (overkill) |

**Arquitetura de roteamento (decisão):** tráfego simples/alto volume em modelo budget (DeepSeek Flash); conversa com cliente em modelo mid (MiniMax M3 ou similar); raciocínio de gestão em Sonnet/GPT mid-frontier. Conversa típica do Recepcionista (~3k in / 500 out) < R$ 0,02.

**Custo consolidado por oficina (8 agentes ativos, com roteamento): R$ 60–120/mês.**

### Estratégia do piloto: IA grátis

- **Principal:** Gemini free tier (até ~1.000 req/dia — cobre 3 oficinas com folga).
- **Reserva:** GLM-4.7-Flash (gratuito).
- **LGPD:** mascarar nome/telefone do cliente final antes de enviar ao modelo (IDs internos) — free tiers podem usar dados pra treino.
- **Regra de código:** camada de provider abstraída, formato OpenAI-compatible (DeepSeek, Moonshot/Kimi, Z.AI/GLM, MiniMax aceitam) — migração free→pago é config, não refatoração.
- Custo de IA no piloto: **R$ 0–20/mês**. Operação de validação completa: **< R$ 150/mês**.

## 3. Cobrança do piloto (modelo fundador)

| Momento | O que acontece |
|---|---|
| Assinatura do acordo | Cobra **1ª mensalidade adiantada (R$ 97)** como reserva da condição fundadora. Cláusula: "não entreguei rodando em X semanas → devolução integral" |
| Go-live (MVP implantado na oficina) | Inicia recorrência **R$ 97/mês travado por 12 meses** (assinatura Asaas) |
| Após 12 meses | Migra pra tabela vigente (com desconto de fundador permanente, ex.: 20%) |

**Regra inegociável:** piloto sem dinheiro comprometido não é validação. Quem não paga R$ 97 adiantado nunca pagaria R$ 249 depois.

## 4. Preço regional (Maringá/Sarandi e região metropolitana)

- Tabela: **R$ 149 (Essencial) / R$ 249 (Profissional — carro-chefe) / R$ 399 (Performance)** + addons de agente R$ 59–129.
- Sustentação regional: EiBarber cobra R$ 139 de barbearia (negócio menor); Ultracar R$ 189–494 nacional; Tempario R$ 79 só pra precificar mão de obra. R$ 249 pela operação completa + 1 agente é defensável.
- ICP regional (fatura R$ 40 mil+/mês) não briga por R$ 100 — briga por confiança e uptime.

## 5. Alvos de validação identificados

| Alvo | Perfil | Abordagem |
|---|---|---|
| **Oficina lotada de Sarandi (3 elevadores)** | Lotada = dor de VAZÃO (fila, WhatsApp acumulado, aprovação parada) — ICP quase perfeito | Dois tempos: (1) ir como cliente (serviço simples) e observar processo real: onde anotam, quem responde o zap, tempo de recepção; (2) voltar como fornecedor com abertura cirúrgica baseada no que viu |
| Piloto original ("bagunçado", usa X-key) | Anti-persona como cliente fundador; útil como informante | Pedir demonstração do X-key (mystery shopping grátis: cada fricção vira argumento de venda). **Pendência: identificar o que é o X-key** — não mapeado na pesquisa nacional; provavelmente sistema regional/legado |
| Demais (lista de 20–25) | Conforme doc 03/09 | Roteiro doc 09 |

## 6. Roteiro de apresentação ao piloto (protótipos prontos)

1. **Credencial (15s):** "Fui mecânico 4 anos, hoje trabalho com software. Tô construindo um sistema feito por quem já ficou embaixo do carro."
2. **Espelho da dor (1min):** descrever o dia dele antes de mostrar qualquer coisa: "Cliente chama no zap, você para tudo, orçamento fica dias esperando, cliente de 6 meses nunca voltou. Errei algo?" — cada correção dele é requisito grátis.
3. **Demo com a placa DELE (2min):** placa → cadastro sozinho → foto → orçamento → link de aprovação chegando no WhatsApp dele. **Nunca dizer "inteligência artificial"** — mostrar resultado ("o sistema escreve a explicação e manda").
4. **Oferta fundadora (1min):** "3 oficinas fundadoras na região: R$ 97/mês travado 1 ano (vai valer R$ 249). Primeiro mês agora como reserva; não entreguei em X semanas, devolvo tudo. Em troca, o sistema nasce do jeito que a SUA oficina precisa."
5. **Silêncio.** Quem fala primeiro depois da oferta, perde.

### Nunca fazer na apresentação
- Falar de stack, IA, tecnologia, "plataforma" ou "agentes" — falar de carro entregue, orçamento aprovado, cliente que volta.
- Demo genérica — sempre com a placa/dados dele.
- Sair sem próximo passo marcado (data de retorno ou Pix da reserva).

## 7. P&L simplificado da fase de validação (6 semanas)

| | Valor |
|---|---|
| Custo total do período (infra + IA + deslocamento + material) | ~R$ 400–900 |
| Receita se bater a meta (3–5 fundadores × R$ 97 adiantado) | R$ 291–485 |
| **Custo líquido de descobrir se o negócio existe** | **~R$ 100–600** |

Comparação: construir 12 meses sem validar = milhares de horas + oportunidade. A validação é o melhor investimento do projeto.
