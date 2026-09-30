# 06 — Arquitetura Técnica e Integrações

## Stack (decisões do documento original, mantidas)

| Camada | Tecnologia |
|---|---|
| Front-end | React + Next.js + TypeScript + TailwindCSS + Shadcn UI + TanStack Query |
| Hospedagem front | Cloudflare Pages |
| Back-end | NestJS + Fastify + Prisma ORM |
| Banco | PostgreSQL (VPS própria via Coolify) |
| Cache | Redis |
| Storage | Cloudflare R2 (fotos, PDFs, assinaturas, checklists, anexos) |
| Automações | n8n (lembretes, webhooks, integrações) |
| WhatsApp | Evolution API (Go) — instância própria por oficina, número da própria oficina |
| Infra | Cloudflare (CDN/DNS/SSL) + VPS Coolify; separação em VPS dedicadas conforme crescimento |

**Nota de arquitetura:** multi-tenant desde o dia 1 (tenant_id em tudo, Row Level Security no Postgres). Instâncias Evolution isoladas por tenant.

## WhatsApp — estratégia em dois estágios

### Estágio atual: Evolution API (Go)
- Justificativa: custo zero por mensagem, controle total, experiência prévia validada (projeto de escala rodando ~50 msg/semana sem bloqueio).
- **Anti-ban já implementado e obrigatório em todo envio:** delay randomizado entre mensagens, simulação de "digitando...", limites de volume por número, aquecimento de número novo.
- Risco documentado: uso comercial de conta pessoal viola os termos da Meta; banimento acontece sem aviso e "queima" o número. Aceitável na validação/primeiros clientes; inaceitável quando a operação do cliente depender do canal.

### Estágio de migração: API oficial Meta (Cloud API)
- Gatilho de migração: receita recorrente dependente do canal OU primeiro banimento em cliente pagante — o que vier primeiro.
- **Modelo de cobrança vigente (jul/2026):** por mensagem de template desde 01/07/2025. Tabela Brasil: marketing R$ 0,3217/msg; utilidade R$ 0,035/msg; autenticação R$ 0,035/msg. Conversas de serviço (iniciadas pelo cliente, janela 24h) = grátis. Utilidade dentro da janela de serviço = grátis.
- **Mudança anunciada:** a partir de 01/08/2026, respostas fora de template dentro da janela passam a custar R$ 0,035/msg — exceto se vierem de agente da plataforma Meta Business Agents (US$ 2/milhão de tokens). Monitorar: a Meta está empurrando o ecossistema pra dentro dela.
- **Impacto no produto:** nosso fluxo é majoritariamente conversa de serviço (cliente inicia) + notificações de utilidade → custo real estimado baixo (poucos R$/mês por oficina). Mensagens do Agente de Retenção (ativas, marketing) são as caras — precificar o add-on de acordo.

## Emissão fiscal (Fase 1)

Oficina é caso fiscal misto: **NFS-e** (mão de obra, municipal) + **NF-e/NFC-e** (peças). Nunca construir emissão na mão (cada prefeitura tem um padrão de NFS-e). Opções de API avaliadas:

| Fornecedor | Destaques | Referência de custo |
|---|---|---|
| **Focus NFe** | NFe, NFSe, NFCe, CTe, MDFe; 3.000+ municípios; integra município novo por R$ 199 em até 15 dias; sem contrato mínimo | Mercado: R$ 89–129/mês base (100–250 docs) + R$ 0,60–0,75/doc extra |
| **PlugNotas (TecnoSpeed)** | Emissão a partir de um único JSON; cuida de XML, contingência e atualização de regras. **Sede em Maringá** — suporte e networking local | Similar |
| Alternativas | NFE.io, Nuvem Fiscal, Notaas (plano grátis até 50 notas/mês — bom pra validar) | — |

Estratégia: MVP sem fiscal (oficina emite como já emite); fiscal na Fase 1 como feature de retenção (nota puxada direto da OS).

## Pagamentos (Fase 1)

Dois usos, um fornecedor:

1. **Cobrar a mensalidade do SaaS:** recorrência Pix + boleto + cartão, régua de cobrança automática (público com inadimplência alta).
2. **Oficina cobrar o cliente:** Pix no link de aprovação ("aprovou → paga o sinal ali") — futuro: taxa por transação como segunda receita (modelo Tekion Payments).

**Escolha: Asaas** — API REST com Pix/boleto/cartão (recorrente e parcelado), **split de pagamentos**, webhooks, sandbox, modelo white label. Alternativas registradas: Pagar.me (Stone, split robusto), Stripe (padrão global, melhor doc), Mercado Pago (marca). Reavaliar taxa quando houver volume.

## Consulta por placa (MVP)

- APIs de placa retornam marca/modelo, ano, cor, chassi, motor, combustível, município e valor FIPE via JSON; bases com 300+ milhões de registros (ex.: API Placas, apiplacas.com.br; múltiplos fornecedores concorrentes — cotar por preço/req).
- Uso: recepção digita placa → veículo se cadastra sozinho (feature de demo).

## Dados técnicos automotivos (Fase 3 / Agente Técnico)

- **Tempário (tempo padrão de mão de obra):** Sindirepa Brasil publica tabela oficial por pesquisa nacional; Sindirepa-PR mantém o Catálogo Tempário eletrônico (desde 2002, 8 categorias, horas centesimais); Tempario.com.br é o SaaS líder do nicho (~R$ 79/mês). Audatex/Solera tem a maior base (3 mi de peças, 12 mil modelos, 98,5% da frota) mas é mundo seguradora. Caminho: licenciar/parceria com tempário + base própria incremental.
- **Especificação por veículo (óleo/filtro):** Tecfil já oferece busca de filtro/palheta **por placa** no catálogo digital — investigar API B2B (e concorrentes: Mann, Wega, Fram). Especificação de óleo (SAE/API, litragem) é dado estático por modelo/motor → base própria alimentada manualmente no início.

## Requisitos não-funcionais críticos

- **Uptime no sábado de manhã** — o critério de compra citado pelo próprio mercado. Janela de deploy: nunca sexta à noite/sábado.
- Offline-tolerante no mobile (fila local de fotos/checklist, sync posterior).
- LGPD: dados de cliente final minimizados; consentimento no primeiro contato WhatsApp; opt-out; logs de acesso; DPA com as APIs contratadas.
- Auditoria: toda aprovação de orçamento com timestamp, IP e snapshot do que foi aprovado (trilha estilo DVI americano).
- Backup diário do Postgres + teste de restore mensal.
