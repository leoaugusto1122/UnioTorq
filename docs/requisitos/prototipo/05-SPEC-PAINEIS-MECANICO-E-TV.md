# 05 — Spec dos Painéis: Mecânico (pátio) e TV Cliente (recepção)

**Origem:** ajuste da referência `Unio Oficina.html` · **Fase:** especificação (pré-código) · **Data:** 2026-07-14
**Contexto:** a referência tinha **um** "Painel Operacional / Chão de Fábrica" que misturava dois públicos. Este doc **desmembra em dois painéis**, como o **doc 01 §Perfis** já previa:
- **Painel do Mecânico** — *"fila do box, 'o que faço agora'"* (pátio, operacional).
- **Painel de TV do Cliente** — *"acompanha o próprio veículo + slide de fotos, dados anonimizados"* (recepção, passivo/venda).

Ambos são **displays de parede em modo escuro**, tipografia grande, auto-atualizáveis, sem interação obrigatória.

> Dataset reaproveitado da referência (Compass/Carlos, Onix/Lucas, HB20/Pedro, etc.) para continuidade.

---

# PAINEL A — Painel do Mecânico (pátio)

**Objetivo:** o mecânico bate o olho no painel do pátio e sabe **o que fazer agora** em cada carro que é dele — sem ruído de gestão.
**Persona/Device:** Mecânico · TV/monitor de parede no pátio · **modo escuro**, fontes grandes.
**Organização:** **por mecânico** (decisão). **Board de tarefa puro** — sem ranking, sem comercial, sem alertas gerenciais (decisão + Fix14 #2).

## Wireframe

```
┌──────────────────────────────────────────────────────────────────────────┐
│  U  PAINEL DO MECÂNICO · PÁTIO                                    14:32     │
├──────────────────┬──────────────────┬──────────────────┬──────────────────┤
│  CARLOS          │  LUCAS           │  JOÃO            │  PEDRO           │
│ ──────────────── │ ──────────────── │ ──────────────── │ ──────────────── │
│  ▶ AGORA         │  ▶ AGORA         │  ▶ AGORA         │   • LIVRE        │
│ ┌──────────────┐ │ ┌──────────────┐ │ ┌──────────────┐ │                  │
│ │ XYZ-9876     │ │ │ PQR-2345     │ │ │ GHI-9012     │ │  aguardando      │
│ │ Jeep Compass │ │ │ Chevrolet Onix│ │ │ Hyundai HB20 │ │  próximo carro   │
│ │ Freios diant.│ │ │ Elétrica BCM │ │ │ Checklist    │ │                  │
│ │ ☑ Pastilha   │ │ │ ☐ Diagnóstico│ │ │  de entrada  │ │                  │
│ │ ▶ Disco      │ │ │ ☐ Trocar BCM │ │ │ ▶ 4 itens    │ │                  │
│ │ ☐ Sangria    │ │ │ ☐ Testar     │ │ │              │ │                  │
│ └──────────────┘ │ └──────────────┘ │ └──────────────┘ │                  │
│  NA FILA (1)     │  NA FILA (0)     │  NA FILA (1)     │                  │
│  · JKL Jetta     │    —             │  · MNO Argo      │                  │
│    troca cabeçote│                  │    revisão 10k   │                  │
└──────────────────┴──────────────────┴──────────────────┴──────────────────┘
```

## Requisitos funcionais

- **RF-Mec-01** — Uma **coluna por mecânico** (nome + inicial). Mecânico sem carro mostra **• LIVRE / aguardando próximo carro**.
- **RF-Mec-02** — Card **▶ AGORA**: o carro ativo do mecânico, com placa(mono) · veículo · serviço · **checklist de tarefas do carro** com estados `☑ feita` · `▶ atual` · `☐ pendente` (é o "o que precisa ser feito naquele carro").
- **RF-Mec-03** — **NA FILA**: próximos carros daquele mecânico, compactos (placa + serviço), ordem = prioridade.
- **RF-Mec-04** — **Sem ranking, sem % de capacidade, sem comercial, sem previsão de faturamento** (board de tarefa puro). Ranking removido (Fix14 #2).
- **RF-Mec-05** — Auto-atualiza conforme o processo anda (tarefa concluída marca `☑`, o `▶` avança; carro finalizado sai da coluna).

## Estados e comportamento

- Tarefa concluída fica `☑` esmaecida; a próxima vira `▶` em destaque de marca.
- Carro sem mecânico alocado **não aparece aqui** (aparece na Lista/Kanban do consultor) — este painel é só execução.
- Passivo por padrão (glanceable). Opcional (mock): tocar num card abre a OS do carro.
- Modo escuro, alto contraste, fontes grandes (leitura a 3–5 m).

## Dados-demo (contrato)

Cada item de `fila[]` usado aqui precisa de: `placa`, `veiculo`, `mecanico`, `servico`, `tarefas[]` (`{label, estado: feita|atual|pendente}`), e um flag de fila/ativo.

**Fix14:** #2 (sem ranking). **Doc 01:** "Painel do Mecânico — fila do box, 'o que faço agora'".

---

# PAINEL B — Painel de TV do Cliente (recepção) ⭐ novo

**Objetivo:** na sala de espera, o cliente acompanha o próprio veículo (anonimizado), é impactado por fotos de itens que precisam de serviço (fricção passiva de venda) e é chamado para retirada por um **alerta de placa em tela cheia** (tipo senha).
**Persona/Device:** Cliente na recepção (passivo) · TV de parede · **modo escuro**, fontes grandes.
**Anonimização (decisão):** **placa visível, nome/telefone ocultos** (LGPD).

## Wireframe — estado normal

```
┌──────────────────────────────────────────────────────────────────────────┐
│  U  Auto Center Sarandi                                          14:32     │
├────────────────────────────────────┬───────────────────────────────────────┤
│  SEU VEÍCULO EM TEMPO REAL          │   VALE A PENA OLHAR                    │
│ ──────────────────────────────────  │  ┌──────────────────────────────────┐ │
│  ABC-1234  Corolla   Execução  ▓▓▓▓░ │  │      [ FOTO grande do item ]     │ │
│  DEF-5678  Civic     Aprovação ▓▓░░░ │  │                                  │ │
│  GHI-9012  HB20      Inspeção  ▓░░░░ │  │  Pastilha de freio desgastada    │ │
│  MNO-7890  Argo      Recebido  ▓░░░░ │  │                                  │ │
│  RST-8901  Outlander Ag. Peças ▓▓▓░░ │  │  Se não trocar: a distância de   │ │
│  ...                                 │  │  frenagem aumenta e o disco pode │ │
│                                      │  │  ser danificado (custo maior).   │ │
│                                      │  │              ● ○ ○               │ │
│                                      │  └──────────────────────────────────┘ │
└────────────────────────────────────┴───────────────────────────────────────┘
```

## Wireframe — alerta de retirada (takeover, ~8s, depois volta)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│                        ✓   PRONTO PARA RETIRADA                            │
│                                                                            │
│                          ┌────────────────────┐                           │
│                          │     ABC-1234       │   ← placa gigante (mono)   │
│                          └────────────────────┘                           │
│                             Toyota Corolla                                 │
│                       Dirija-se à recepção, por favor                      │
│                                                                            │
└──────────────────────────────────────────────────────────────────────────┘
```

## Requisitos funcionais

- **RF-TVc-01** — **Lista de status** dos veículos: placa(mono) · veículo · etapa · barra de progresso. **Sem nome/telefone** (anonimizado).
- **RF-TVc-02** — **Carrossel de fotos** de itens em manutenção: foto grande + nome do item + **"Se não trocar: {breve explicação da consequência}"** (doc 14 acerto — educação de consequência sobe fechamento). Auto-rotate.
- **RF-TVc-03** — **Alerta de retirada (takeover em tela cheia)**: quando um veículo fica pronto, o painel inteiro vira o alerta com a **placa gigante** ("PRONTO PARA RETIRADA — ABC-1234"), por ~8s, e **volta sozinho** ao estado normal (comportamento de "senha", mas por placa).
- **RF-TVc-04** — **Auto-refresh** acompanhando o avanço do processo na oficina (status muda sozinho).
- **RF-TVc-05** — Rotação automática de conteúdo (Fix14 #9), sem interação.

## Estados e comportamento

- Status list e barras de progresso atualizam conforme o carro anda.
- Carrossel troca de foto a cada ~6–8s; ao esgotar, recomeça.
- **Gatilho do alerta:** carro entra em "Pronto" → dispara o takeover; ao terminar (~8s) retorna ao painel. Se dois ficarem prontos juntos, enfileira os alertas.
- Modo escuro, tipografia grande; alerta de retirada em cor de marca / verde de "pronto", altíssimo contraste (visível de qualquer ponto da sala).
- **LGPD:** só placa + veículo + status; nada que identifique a pessoa.

## Dados-demo (contrato)

`fila[]` usado aqui precisa de: `placa`, `veiculo`, `etapa`, `progresso` (0–100), e por item de foto: `{foto, item, consequencia}`. Um flag `pronto: true` dispara o alerta de retirada.

**Fix14:** #9 (rotação/refresh). **Doc 01:** "Painel de TV do Cliente (passivo) ... dados anonimizados por LGPD". **Doc 14:** "o que acontece se não realizar" (MotoVisuals 55%→90%).

---

# Contrato de dados compartilhado (`fila[]`)

Os dois painéis (e Lista/Kanban) leem a mesma `fila[]`. Estrutura sugerida por veículo:

```
{
  placa, veiculo, cliente,        // cliente NÃO exibido na TV do cliente
  etapa,                          // Recebido | Inspeção | Ag. Aprovação | Ag. Peças | Aprovado | Execução | Ctrl. Qualidade | Pronto
  progresso,                      // 0–100 (barra)
  mecanico,                       // p/ Painel do Mecânico
  servico,                        // descrição curta
  tarefas: [ {label, estado} ],   // p/ Painel do Mecânico (feita|atual|pendente)
  fotos: [ {foto, item, consequencia} ], // p/ TV Cliente (carrossel)
  pronto                          // true dispara alerta de retirada na TV Cliente
}
```

---

# Decisões desta spec (registro)

- Desmembrar "Chão de Fábrica" em **Painel do Mecânico** + **Painel de TV do Cliente** (doc 01 §Perfis). — fundador
- Painel do Mecânico: **por mecânico**, **board de tarefa puro** (sem ranking/gestão). — fundador
- Painel TV Cliente: **placa visível, nome oculto**; **alerta de retirada em tela cheia por placa** (novo). — fundador
- Ambos: display de parede, modo escuro, auto-atualizável, passivo.

*Foco atual: só estes 2 painéis. As outras 9 telas da referência ficam como estão e serão revisadas depois, uma a uma.*
