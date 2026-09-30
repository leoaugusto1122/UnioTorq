# Modelo de Domínio — UnioTorq

**Fase:** Requisitos (linguagem compartilhada, pré-código) · **Data:** 2026-07-17
**Depende de:** [ADR-002 — Memória Viva](../arquitetura/adr/ADR-002-memoria-viva.md), [ADR-003 — Persistência](../arquitetura/adr/ADR-003-persistencia.md), [ADR-001 — 3 camadas](../arquitetura/adr/ADR-001-arquitetura-3-camadas.md), [Fundação UX](../design/ux-bible/01-fundacao-personas-ia-navegacao.md), [doc 01 — visão](../produto/01-visao-do-produto.md), [doc 17 — funcionários digitais](../produto/17-funcionarios-digitais.md).

> **Propósito.** Definir **os objetos que vivem na plataforma — como nascem, mudam, se relacionam e "morrem"** — a linguagem única que backend, frontend, especialistas digitais e Memória Viva falam. As telas apenas *mostram* esses objetos; por isso o domínio vem **antes** das telas. Este é o backbone do sistema, mais importante para o build do que dez docs de funcionalidade.

---

## 1. Mapa dos objetos (o glossário)

| Objeto | O que é | Nasce quando | "Morre" / arquiva quando |
|---|---|---|---|
| **Cliente** | Pessoa ou empresa dona de veículo(s) | 1º atendimento / cadastro / importação | Nunca (só inativa) |
| **Veículo** | Identificado pela **placa** (chave natural); marca/modelo/motor/ano | Placa consultada (API) ou cadastro | Nunca (histórico permanente por placa, mesmo trocando de dono) |
| **Atendimento** ⭐ | O objeto **soberano**: uma passagem do veículo pela oficina | Recepção/agente abre | Fecha na entrega → vira histórico (nunca é apagado) |
| **Checklist / DVI** | Inspeção estruturada do veículo num atendimento | Mecânico inicia a inspeção | Fecha quando enviado ao consultor |
| **Item de Inspeção** | Linha do checklist: sistema (freio/suspensão…), **severidade V/A/V**, foto, áudio, observação | Mecânico registra | Vira matéria-prima de Recomendação / Item de Orçamento |
| **Diagnóstico** | Conclusão técnica sobre um problema | Consultor/mecânico conclui | Permanece no histórico do veículo |
| **Recomendação Técnica** | Sugestão de serviço derivada de um Item de Inspeção, **em língua de cliente** | Consultor/agente transforma o achado em proposta | Vira Item de Orçamento (aceita) ou Item Recusado (reprovada) |
| **Orçamento** | Proposta de itens (peça + mão de obra) para o cliente; versionável | Consultor monta no Hub | Vira Aprovação; substituído por nova versão |
| **Item de Orçamento** | Linha do orçamento: descrição, peça/serviço, foto, severidade, valor, incluído? | Consultor adiciona | Aprovado (vai pra OS) ou reprovado (vira Item Recusado) |
| **OS (Ordem de Serviço)** | Contrato de execução dos itens **aprovados** | Há aprovação do cliente | Fecha na conclusão do serviço |
| **Aprovação** | O ato do cliente decidir item a item no portal | Consultor envia o link | Encerra quando o cliente registra o aceite |
| **Aceite** | Registro do consentimento: nome + timestamp + IP | Cliente confirma na aprovação | Imutável (trilha de auditoria) |
| **Item Recusado** | Item de Orçamento que o cliente **reprovou** | Cliente reprova na Aprovação | **Não some fácil** → ver ciclo de vida na §2.1 |
| **Peça** | Item de catálogo/estoque usado num serviço | Cadastro/catálogo (estoque completo = fase posterior) | — |
| **Fornecedor** | Origem de peças/cotação | Cadastro (fase posterior) | — |
| **Evento (Timeline)** | Registro **imutável** de algo que aconteceu num atendimento (humano **ou** especialista) | A cada ação | Nunca muda (append-only) — é a espinha da Memória Viva |
| **Conhecimento Técnico** | Fato reutilizável sobre veículo/motor/serviço (óleo, torque, tempo padrão, sintoma→causa) | Semeado (catálogo) + enriquecido por eventos | Vive na Memória Viva; **não pertence** a um atendimento |
| **Usuário** | Pessoa que faz login | Cadastro pelo admin | Inativa |
| **Papel** | Conjunto de permissões + shells (Recepção, Consultor, Mecânico, Gestor, Admin…) | Definido no sistema | — |
| **Especialista (skill)** | Funcionário digital **stateless** ([doc 17](../produto/17-funcionarios-digitais.md)); definição declarativa que age sobre os objetos e escreve Eventos | Publicado como skill | Desativado/versionado (não é "dado que nasce") |

### 1.1 Segmentação de Cliente (regra derivada, Camada 1)

Cliente carrega uma tag de segmento (**Novo · Recorrente · VIP**) — **regra determinística (Camada 1, [ADR-001](../arquitetura/adr/ADR-001-arquitetura-3-camadas.md)), nunca julgamento de IA**:

```
NOVO       = ≤ 1 atendimento concluído
RECORRENTE = ≥ N atendimentos concluídos nos últimos 12 meses
VIP        = top X% em total_gasto acumulado, OU marcado manualmente (override humano)
Sem tag    = não bate em nenhum critério (não é obrigatório)
```

**N e X ficam em aberto — calibrar com dado real dos primeiros pilotos** (decisão do fundador, 2026-07-17). A referência hoje usa as tags sem regra (ex.: Ana Souza R$3.420 = VIP vs. Roberto Melo R$4.220 = Recorrente — inconsistente); a fórmula acima existe desde já para não deixar a classificação como invenção sem rastro (Constitution Artigo IV — No Invention). **VIP sempre aceita override manual** — parte da qualificação é relação, não só número.

---

## 2. Ciclo de vida do Atendimento (máquina de estados)

```
                    ┌───────── Fast Lane (óleo, alinhamento) ─────────┐
                    │  Recebido → Em Execução → Entregue (simplificado) │
                    └───────────────────────────────────────────────┘

Atendimento Completo:
Recebido → Em Inspeção → Aguardando Aprovação → Aprovado(OS) → Em Execução → Finalizado → Entregue → [Histórico]

Flags transversais (não são estados; coexistem):  ⏸ Aguardando Peça   ⏳ Cliente Não Respondeu
```

| Transição | Gatilho | Quem dispara |
|---|---|---|
| Recebido → Em Inspeção | mecânico inicia checklist | Humano (mecânico) |
| Em Inspeção → Aguardando Aprovação | consultor envia orçamento no WhatsApp | Humano (consultor) + Sistema (gera link) |
| Aguardando Aprovação → Aprovado | cliente aprova ≥1 item | Cliente |
| Aprovado → Em Execução | sistema libera OS e avisa mecânico | Sistema (automação) |
| Em Execução → Finalizado | mecânico finaliza serviço | Humano (mecânico) |
| Finalizado → Entregue | recepção entrega o carro | Humano (recepção) |
| Entregue → Histórico | fechamento automático | Sistema |

### 2.1 Ciclo de vida do Item Recusado (a dúvida da outra IA)

Um Item Recusado **não morre quando o cliente reprova** — vira **ativo de retenção**. Ele encerra quando (regra determinística, Camada 1):
1. **Realizado** num atendimento futuro (o serviço acabou sendo feito), **ou**
2. **Deixou de ser aplicável** (veículo vendido/sucateado, ou peça já trocada), **ou**
3. **Expirou por política** (ex.: 12 meses sem reofertar com sucesso — configurável).

Enquanto vivo, ele alimenta a fila de Retenção e o "Valor Recusado" do dashboard.

---

## 3. Matriz "Quem faz?" por etapa (Humano / Sistema / Especialista / Cliente)

> Responde diretamente à dúvida "a IA só monta mensagem?". A **linha entre Sistema e Especialista** é o [ADR-001](../arquitetura/adr/ADR-001-arquitetura-3-camadas.md): *fato/execução* (Sistema, 0 token) vs *interpretação/julgamento* (Especialista, IA). **Toda decisão consequente tem um Humano ou o Cliente na linha.**

| Etapa | 👤 Humano | ⚙️ Sistema (regra/automação, 0 token) | 🤖 Especialista (IA) | 🧍 Cliente |
|---|---|---|---|---|
| **Novo Atendimento** | Recepção cria | cria Timeline, puxa histórico por placa | Recepcionista pode abrir via WhatsApp; resume o histórico | — |
| **Agendamento** | confirma | checa agenda/disponibilidade | Recepcionista agenda/remarca/confirma no WhatsApp | pede horário |
| **Inspeção / DVI** | mecânico marca severidade + foto | estrutura, valida campos, conta V/A/V | Assistente do Mecânico: **áudio → item**; sugere fotos faltantes | — |
| **Diagnóstico** | consultor decide | reúne itens + histórico | resumo; **causa provável** (futuro) | — |
| **Orçamento** | consultor monta e **fixa o preço** | calcula totais/descontos | Consultor: **rascunho** em língua de cliente; **prioriza** recusados; escolhe a foto que ilustra o risco | — |
| **Envio da aprovação** | consultor (1 clique) | gera link, dispara template | Recepcionista conduz a conversa | — |
| **Aprovação** | — | recalcula total, registra Aceite | — | **aprova/reprova item a item** |
| **Recusa** | — | cria Item Recusado, alimenta fila | Retenção reoferta depois | reprova |
| **Execução** | mecânico executa | libera OS, avisa mecânico, aponta horas | — | — |
| **Cobrança/Pgto** (fase 2) | — | baixa por webhook | Cobrador: régua + ajuste de tom | paga (Pix) |
| **Entrega** | recepção entrega | fecha atendimento, arquiva | — | recebe aviso |
| **Gestão** | dono **decide** | calcula KPIs (SQL) | Gestor: interpreta a pergunta e **dá o julgamento** ("margem caiu porque desconto subiu 8%") | — |

---

## 4. Papéis × Shells × Permissões (RBAC)

> Responde à dúvida "e a oficina onde uma pessoa faz tudo?". **Um usuário tem 1+ papéis; papel destrava shells + ações.** Ver a lógica de UX em [Fundação §5.2](../design/ux-bible/01-fundacao-personas-ia-navegacao.md).

| Papel | Shell(s) | **Pode** | **Não pode** |
|---|---|---|---|
| **Recepção** | Recepção (desktop) | criar atendimento, ver fila, Inbox WhatsApp, registrar entrega | fixar preço final, dashboard financeiro, editar checklist |
| **Consultor** ⭐ | Consultor/Hub (+ leitura da fila da recepção) | montar orçamento, **fixar preço**, enviar aprovação, liberar execução | configurar IA, financeiro completo |
| **Mecânico** | Mecânico (mobile) | checklist, foto, áudio, iniciar/pausar/finalizar, apontar horas | orçamento, preço, financeiro, dashboard |
| **Gestor** | Gestor (dashboard + comando/voz) (+ leitura de tudo operacional) | ver KPIs, drill, comando, abrir OS (com confirmação) | editar execução no box |
| **Admin** | Admin | config de IA, assinatura, skills, usuários/papéis | (não é papel operacional) |
| *Financeiro, Comprador* | — | *reservados no modelo* | **sem shell no MVP** (fase posterior) |

**Regras do modelo:**
- **N papéis por usuário.** Oficina "faz-tudo" = 1 usuário com [Recepção + Consultor + Gestor] → shell padrão + alternador (Fundação §5.2).
- **Shell padrão** configurável por usuário.
- Os **especialistas** também têm "permissões" — mas as deles são **ferramentas + guardrails** de skill ([doc 15 §4-5](../arquitetura/15-arquitetura-ia-e-admin.md), [doc 17](../produto/17-funcionarios-digitais.md)), não RBAC humano.

---

## 5. A Memória Viva como **substrato** (não ator)

> A outra IA sugeriu tratar a Memória Viva como "persona/ator" na jornada. **Discordamos do mecanismo, concordamos com a intenção.** Pelo [ADR-002](../arquitetura/adr/ADR-002-memoria-viva.md) ela é o **núcleo compartilhado**; os especialistas stateless é que são atores. A Memória Viva não tem objetivo nem UI — ela é a *terra* onde tudo cresce.

```
  Cada Evento (append-only)
            │
            ▼
   ┌─────────────────── MEMÓRIA VIVA (ADR-002) ───────────────────┐
   │ 1. Dados estruturados (Postgres)                              │
   │ 2. Grafo — tabela de arestas (ADR-003)                        │
   │ 3. Memória Narrativa (texto p/ LLM)                           │
   │ 4. Catálogo / Conhecimento Técnico (semeado + enriquecido)    │
   └───────────────────────────────────────────────────────────────┘
            │
            ▼  alimenta (em contexto, nunca aba "IA")
   Histórico por placa · Sugestões inline · Fila de Recusados · Conhecimento Técnico
```

**Regra:** a Memória Viva **aprende**; os especialistas **não** (são stateless). Um novo especialista nasce "inteligente" porque lê o mesmo núcleo.

---

## 6. O grafo — quais arestas nascem de quais eventos (liga [ADR-003](../arquitetura/adr/ADR-003-persistencia.md))

Cada relação relevante vira uma **aresta** na tabela `relacionamento(origem, destino, tipo, peso, props JSONB, …)`. As arestas nascem de **eventos determinísticos (regra)**, nunca de IA:

| Aresta | Nasce do evento |
|---|---|
| `Cliente —POSSUI→ Veículo` | cadastro/associação |
| `Veículo —TEVE→ Atendimento` | abertura de atendimento |
| `Atendimento —GEROU→ OS` | aprovação |
| `Item —RECUSADO_EM→ Atendimento` | reprovação no portal |
| `Veículo —APRESENTOU→ Sintoma` | diagnóstico |
| `Sintoma —INDICA→ Causa` | Conhecimento Técnico (semeado/enriquecido) |
| `Peça —COMPATÍVEL_COM→ Motor` | catálogo técnico |

Isso é o modelo **knowledge-ready no dia 1** (inegociável, ADR-002): guardamos a ligação rica, não dados chapados.

---

## 7. Vocabulário de superfícies (referência)

As telas mostram os objetos acima sob **cinco superfícies** (detalhe em [Fundação §4](../design/ux-bible/01-fundacao-personas-ia-navegacao.md)):

| Superfície | Mostra | Exemplos |
|---|---|---|
| **Coleção** | muitos atendimentos (ou clientes/veículos, via Comando) | Lista, Fila, Kanban |
| **Detalhe** | um objeto sob a lente de um papel | Hub (consultor), Checklist (mecânico), Portal (cliente), **Ficha do Cliente, Prontuário do Veículo** |
| **Agregado** | números rolados por cima de muitos | Dashboard, indicadores |
| **Comando** | busca/assistente onipresente, **multi-campo** | busca por placa/nome/CPF/telefone, barra do Gestor |
| **Timeline** | eventos/fotos/áudio de um atendimento | a espinha da Memória Viva no Detalhe |

---

## 8. Como isto guia o build

- **Backend:** entidades da §1 + máquina de estados da §2 = schema inicial + regras.
- **Frontend:** cada tela = um objeto sob uma superfície (§7).
- **Especialistas:** agem nas etapas da §3, sempre escrevendo **Eventos**.
- **Memória Viva:** alimentada por Eventos (§5), servida às telas em contexto.

*Este documento é a última peça fundacional antes dos wireframes. Depois dele: [UX Bible 03 — wireframes](../design/ux-bible/00-README.md).*
