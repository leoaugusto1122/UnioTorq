# 01 — Sessão de Brainstorm: Protótipo HTML UnioTorq para Clientes Pilotos

**Agente:** @brainstorm (Ideator) · **Comando:** `*brainstorm-collaborate`
**Escopo:** `prototype` · **Foco:** `html-prototype-pilot`
**Data:** 2026-07-14
**Docs analisados:** 18 documentos fundadores (`docs/`) + protótipo de referência (`docs/00-prototipo/Unio Oficina.html`)

---

## 0. TL;DR (decisões desta sessão)

1. **Rebuild em vanilla**, não extensão. A referência é um bundle React (ideação-only) — usamos como norte visual, reconstruímos em HTML/CSS/JS puro.
2. **Protótipo navegável** (cliente clica sozinho), não só clickthrough de demo.
3. **8 telas:** as 5 do doc 09 + Kanban + Dashboard + Painel TV. A tela-diferencial (**conversa do agente no WhatsApp**) é a que a v1 **não tinha** (gap doc 14 §5).
4. **Personalização por `dados-demo.js`** único e editável (troca placa/oficina/carro em 30s antes de cada visita).
5. **Design system em CSS tokens**, extraído fielmente da referência (Inter + IBM Plex Mono, roxo `#4C3FA5`, neutros Tailwind, semânticos verde/âmbar/vermelho).
6. **Aplicar os 9 ajustes do doc 14 §3** no rebuild — o protótipo novo já nasce corrigido.

---

## 1. Contexto travado pela fundação (não rediscutir)

| Fonte | Decisão dura que o protótipo deve honrar |
|---|---|
| **Doc 09 §A** | Protótipo = **5 telas**, "não precisa funcionar, precisa parecer real": Lista de atendimentos · Hub do Atendimento · Checklist com foto (mobile) · Link de aprovação (cliente) · **Conversa do agente no WhatsApp** |
| **Doc 10 §6** | Roteiro de demo: **placa → cadastro sozinho → foto → orçamento → link no WhatsApp**. Nunca dizer "IA". Sempre com a placa **real do dono**. |
| **Doc 14 §5** | Gap crítico: faltava a **tela do agente no WhatsApp** — "diferencial nº1 e a mais simples de produzir. Sem ela, mostra um sistema bonito; com ela, mostra um funcionário digital." |
| **Doc 01 §Design** | **Calm Design**: densidade alta, ruído baixo, **sem emojis, sem excesso de cor**. Placa em mono, status badges. Refs: Linear, Tekion. |
| **Doc 14 §6** | Nota de escopo: **"Protótipo vende a visão; código entrega a fase."** O protótipo pode mostrar Fases 1–2; o código segue o MVP magro do doc 04. |

**Objetivo de negócio (doc 09 §Meta):** fechar **3–5 pré-vendas pagas (R$ 79–99/mês)** em 10–15 visitas qualificadas em Maringá, em 4–6 semanas. O protótipo é **ferramenta de venda**, não app.

---

## 2. Análise do protótipo de referência (`Unio Oficina.html`)

**Natureza:** SPA React compilada e exportada num único HTML (~1.8 MB, bundle minificado). É a **v1 de 14 telas** que o **doc 14 já revisou**. Marcada explicitamente pelo fundador como *"ideação somente, só para referência"*.

**O que aproveitamos dela (norte visual):**

- **Linguagem visual madura** já alinhada ao Calm Design: sidebar escura, tabelas densas, badges de status, split view no Hub.
- **Design tokens** (extraídos do bundle) — ver §5.
- **Acertos a proteger (doc 14 §2):** R$ estimado por coluna do Kanban · microcopy acionável · "O que acontece se não realizar?" na aprovação · placa em mono · portal sem login estilo rastreio FedEx · dashboard meta vs. realizado · split view no Hub.

**Por que NÃO estender o arquivo:**

- Bundle React minificado → não é editável à mão nem versionável de forma limpa.
- Fundador escolheu **HTML/CSS/JS puro** (zero build, abre offline na oficina — crítico, doc 10: demo presencial sem depender de internet).
- Rebuild permite **corrigir os 9 ajustes do doc 14 §3** de saída, em vez de herdar os defeitos da v1.

---

## 3. Divergência — ideias exploradas

**I1. O "momento uau" é o WhatsApp, não o sistema.** A tela que faltava na v1 é a que fecha venda. Fazer a conversa do agente parecer print real de WhatsApp (bolhas, "digitando…", horário, ✓✓, cor de fundo do zap). O dono precisa esquecer que é mock.

**I2. Continuidade narrativa entre telas.** As telas contam **UMA história**: o mesmo carro (placa do dono) atravessa Lista → Hub → Checklist → orçamento → WhatsApp → Aprovação. Muito mais persuasivo que 8 telas soltas bonitas.

**I3. Personalização em 30s = arma de venda.** `dados-demo.js` central com oficina, placa, carro, cliente. Antes de cada visita edito 4 linhas e o protótipo inteiro se repinta. Vira 15 demos personalizadas sem tocar em HTML.

**I4. Device frame nas telas de campo.** Checklist (mecânico) e Link de aprovação (cliente) aparecem dentro de uma **moldura de celular** quando vistos no desktop — deixa explícito "isto é o que chega no telefone".

**I5. Nunca dizer "IA".** Na tela do agente, o rótulo é o nome de um "funcionário" (ex.: "Nina — Recepção"), não "assistente de IA". Coerente com doc 10 §6.

**I6. Modo apresentação.** Tecla/atalho que esconde qualquer chrome de navegador e deixa só as telas — para a visita presencial.

---

## 4. Convergência — decisões (respostas do fundador nesta sessão)

| Decisão | Escolha | Origem |
|---|---|---|
| **Propósito** | Protótipo **navegável** (cliente explora sozinho) | resposta desta sessão |
| **Telas** | 5 do doc 09 **+ Kanban + Dashboard + Painel TV** | resposta desta sessão |
| **Personalização** | **`dados-demo.js`** único editável | resposta desta sessão |
| **Stack** | **HTML/CSS/JS puro + design tokens** (zero build, offline) | resposta desta sessão |
| **Relação com a referência** | **Rebuild vanilla** usando-a como norte visual (não estender o bundle) | síntese @brainstorm |
| **Qualidade da v1** | Rebuild **já aplica os 9 ajustes do doc 14 §3** | doc 14 |

---

## 5. Design System (tokens extraídos da referência)

```css
:root {
  /* Marca */
  --brand:        #4C3FA5;   /* roxo Unio */
  --brand-tint:   #EEEBFA;   /* fundo suave da marca */

  /* Neutros (escala Tailwind gray) */
  --gray-900: #111827;  /* sidebar / texto forte */
  --gray-800: #1F2937;
  --gray-700: #374151;
  --gray-600: #4B5563;
  --gray-500: #6B7280;  /* texto secundário */
  --gray-400: #9CA3AF;
  --gray-300: #D1D5DB;  /* bordas fortes */
  --gray-200: #E5E7EB;  /* bordas / divisores */
  --gray-100: #F3F4F6;
  --gray-50:  #F9FAFB;  /* fundo do app */
  --white:    #FFFFFF;

  /* Semânticos (disciplina do doc 14 §3.3) */
  --ok:       #10B981;  --ok-tint:   #D1FAE5;   /* verde: OK / aprovado */
  --warn:     #F59E0B;  --warn-tint: #FEF3C7;   /* âmbar: atenção operacional */
  --danger:   #EF4444;  --danger-tint:#FEE2E2;  /* vermelho: SÓ risco a cliente/prazo */
  --info:     #3B82F6;  --info-tint: #DBEAFE;

  /* Tipografia */
  --font-ui:   'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'IBM Plex Mono', 'Fira Code', monospace;  /* placas, valores técnicos */

  /* Espaçamento / raio / sombra (inferidos) */
  --radius:    8px;
  --shadow-sm: 0 1px 4px rgba(0,0,0,0.08);
  --shadow:    0 4px 12px rgba(0,0,0,0.10);
}
```

**Regra de cor (doc 14 §3.3 — "quando tudo grita, nada grita"):** vermelho = risco a cliente/prazo; âmbar = atenção operacional. Nada de vermelho para workload alto ou "recusado".

**Fontes offline:** empacotar Inter + IBM Plex Mono como `@font-face` local em `assets/fonts/` (não CDN — demo tem que abrir sem internet).

---

## 6. Inventário final de telas (8)

| # | Tela | Persona | Device | Papel na demo |
|---|---|---|---|---|
| 1 | **Lista de Atendimentos** | Recepção/Consultor | Desktop | Ponto de partida; busca por placa |
| 2 | **Hub do Atendimento** (split view) | Consultor | Desktop | Coração: cliente+veículo+OS+orçamento item a item |
| 3 | **Checklist / DVI mobile** (foto + severidade V/A/V) | Mecânico | Mobile (frame) | Foto da peça gasta vira item de orçamento |
| 4 | **Link de Aprovação** (portal cliente, sem login) | Cliente final | Mobile (frame) | Aprova/reprova item a item + "o que acontece se não fizer" |
| 5 | **Conversa do Agente no WhatsApp** ⭐ | Cliente final | Mobile (frame) | **Diferencial nº1** — o "funcionário digital" agenda/notifica |
| 6 | **Kanban** (R$/coluna) | Consultor/Gestor | Desktop | Visão de fluxo; dinheiro parado por etapa |
| 7 | **Dashboard do Gestor** (meta vs. realizado) | Gestor | Desktop | "Quanto faturei? Que box tá parado?" |
| 8 | **Painel TV da Recepção** | Passivo | TV/Desktop | Fila + fotos; fricção passiva de venda |

⭐ = tela nova (não existia na v1; era o gap do doc 14 §5).

---

## 7. Ajustes do doc 14 §3 a aplicar no rebuild (nascer corrigido)

1. **Seletor de severidade V/A/V visível no item do checklist** (não só contador no topo). — Alta
2. **Ranking de equipe na TV: configurável e OFF por padrão.** — Alta
3. **Disciplina de vermelho** (vermelho só = risco a cliente/prazo). — Média
4. **Placa aceita formato antigo (ABC-1234) e Mercosul (ABC1D23).** — Média
5. **Unificar Portal + Aprovação** (para o cliente é UM link; aprovação é aba). — Média
6. **"Aguardando Peças" conta como veículo parado** nos indicadores. — Média
7. **"Valor Recusado" do funil clicável** → fila de Serviços Recusados. — Média
8. **Mobile do mecânico**: alto contraste, alvos de toque grandes (luva+sol). — Média
9. **Painel TV**: rotação automática + auto-refresh. — Baixa

---

## 8. Arquitetura do build (vanilla, zero-build)

> **⚠️ SUPERADO em 2026-07-14 — ver `07-SETUP-STACK.md`.** A stack do protótipo passou a ser **Next.js + React + TS + Tailwind + shadcn/ui** (doc 06 fundador), não mais vanilla. O bloco abaixo fica como histórico do raciocínio.

```
prototype/
├── index.html                 # shell + sidebar + roteamento por hash (#lista, #hub, ...)
├── dados-demo.js              # ⭐ ÚNICO ponto de edição por oficina (oficina, placa, carro, cliente)
├── assets/
│   ├── css/
│   │   ├── tokens.css         # o design system da §5
│   │   ├── base.css           # reset, tipografia, layout
│   │   └── components.css     # badges, tabelas, cards, device-frame, kanban, bolhas whatsapp
│   ├── js/
│   │   ├── router.js          # navegação por hash (protótipo navegável)
│   │   ├── render.js          # injeta dados-demo.js nas telas (repinta tudo)
│   │   └── screens/*.js       # uma função de render por tela
│   ├── fonts/                 # Inter + IBM Plex Mono locais (offline)
│   └── images/                # foto de peça gasta (mock DVI), avatar, logo
```

**Princípios:** abre com duplo-clique (`file://`), funciona 100% offline, sem npm/CDN. Uma edição em `dados-demo.js` repinta todas as 8 telas.

---

## 9. Narrativa única da demo (o fio que costura as 8 telas)

> Placa **`{PLACA_DO_DONO}`** → um **`{CARRO}`** do cliente **`{CLIENTE}`** entra na oficina **`{OFICINA}`**.
> **Lista** → abre no **Hub** → mecânico faz o **Checklist**, fotografa a pastilha gasta (severidade vermelha) → vira item no **orçamento** → cliente recebe **link de aprovação** no celular → a **Nina (recepção)** confirma horário pelo **WhatsApp** → o carro anda no **Kanban** → o dono vê no **Dashboard** quanto faturou → a **TV** mostra a fila pra recepção.

Todos os nomes/placa/carro vêm de `dados-demo.js`.

---

## 10. Próximos passos (handoff)

| # | Ação | Responsável sugerido |
|---|---|---|
| 1 | Validar este brainstorm + a narrativa da §9 | Fundador |
| 2 | (Opcional) Especificar telas em detalhe / wireframes | `@ux-design-expert` (`.impeccable`) |
| 3 | Definir `dados-demo.js` schema + os 8 renders | `@architect` / `@dev` |
| 4 | Implementar o protótipo vanilla | `@dev` (skill `impeccable`) |
| 5 | Teste de campo: abrir offline, trocar placa em 30s, ensaiar roteiro doc 10 §6 | Fundador |

**Decisão de fase (doc 09 §D):** ≥3 pré-vendas pagas em 15 visitas = GO para o MVP do doc 04.

---

## Registro de decisões desta sessão

- Rebuild vanilla (não estender o bundle React de referência). — @brainstorm + fundador
- Protótipo navegável, 8 telas, `dados-demo.js`, HTML/CSS/JS puro. — fundador
- Rebuild aplica os 9 ajustes do doc 14 §3. — @brainstorm
- Tela ⭐ do agente WhatsApp é prioridade máxima (fecha venda). — doc 14 §5

*Fim da Fase 1 (Brainstorm). Fase 2+ (PRD/arquitetura/design/dev) sob demanda.*
