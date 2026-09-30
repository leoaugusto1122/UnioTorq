/* ============================================================
   UnioTorq — Protótipo para Clientes Piloto
   dados-demo.js  ·  A "VERDADE" ÚNICA QUE ALIMENTA AS 13 TELAS

   PONTO ÚNICO DE EDIÇÃO POR OFICINA.
   Antes de cada visita, troque o bloco `oficina` e o `heroi`
   (use a PLACA REAL DO DONO — doc 10 §6). Todas as telas se
   repintam sozinhas. Não é preciso mexer em HTML.

   Placa aceita Mercosul (ABC1D23) e antigo (ABC-1234) — Fix14 #4.
   Cor semântica: 'ok' (verde) | 'atencao' (âmbar) | 'critico' (vermelho).
   ============================================================ */

window.DADOS_DEMO = {

  /* ---------------------------------------------------------
     1. OFICINA — identidade / white-label do Portal (Config)
     --------------------------------------------------------- */
  oficina: {
    nome:     "Auto Center Sarandi",
    telefone: "(44) 99164-0000",
    cidade:   "Sarandi — PR",
    cor:      "#4C3FA5",          // paleta do Portal do Cliente
    logo:     "assets/images/logo.svg",
  },

  /* ---------------------------------------------------------
     2. FUNCIONÁRIOS DIGITAIS — organograma (doc 05)
     Nomes editáveis. NUNCA rotular como "IA" no front (doc 10 §6).
     --------------------------------------------------------- */
  agentes: {
    recepcionista: "Nina",   // WhatsApp: agenda, confirma, avisa (tela 02)
    retencao:      "Rita",   // CRM/Prontuário + reativação 6 meses (WhatsApp)
    consultor:     "Téo",    // Hub: traduz anotação do mecânico → orçamento
    mecanico:      "Beto",   // Checklist: estrutura o áudio ditado
  },

  /* ---------------------------------------------------------
     3. CARRO-HERÓI — CONFIGURÁVEL (placa real do dono)
     Atravessa Nina → Agenda → Lista → Hub → Checklist → Portal.
     --------------------------------------------------------- */
  heroi: {
    placa:     "ABC1D23",              // Mercosul (troque pela placa do dono)
    veiculo:   "VW Gol 1.6",
    ano:       2019,
    cor:       "Prata",
    motor:     "1.6 Flex",
    km:        82450,
    cliente:   "João Ribeiro",
    telefone:  "(44) 99999-1234",
    queixa:    "um barulho no freio",
    horario:   "08:30",                // agendado pela Nina
    os:        "OS-2026-0742",
    entrada:   "08:30",
    previsao:  "12:00",
    etapa:     "Ag. Aprovação",        // estado atual na costura da demo
    progresso: 40,
    mecanicoNome: "Carlos Ferreira",   // mecânico humano (Beto é o AGENTE que estrutura o áudio)
    consultor: "Yuri Prado",
  },

  /* ---------------------------------------------------------
     4. ORÇAMENTO DO HERÓI (DVI → orçamento; Hub + Portal/Aprovação)
     Itens Reprovados/Atenção viram itens de orçamento (auto).
     --------------------------------------------------------- */
  orcamento: [
    {
      item: "Pastilha dianteira",
      severidade: "critico",
      consequencia: "A distância de frenagem aumenta e compromete a segurança.",
      obsMecanico: "Desgaste inferior a 2mm, abaixo do limite do fabricante.",
      fotos: ["assets/images/pastilha.jpg", "assets/images/pastilha-2.jpg"],
      peca: { desc: "Pastilha cerâmica Bosch BP1302", valor: 180 },
      maoDeObra: { desc: "Troca de pastilha dianteira · 1h", valor: 120 },
      total: 300,
      aprovado: null,   // null | true | false
    },
    {
      item: "Disco de freio dianteiro",
      severidade: "critico",
      consequencia: "Disco empenado gera vibração no pedal e reduz a frenagem.",
      obsMecanico: "Empenamento acima do limite; vibração relatada em alta.",
      fotos: ["assets/images/disco.jpg"],
      peca: { desc: "Par de discos ventilados", valor: 470 },
      maoDeObra: { desc: "Troca e sangria · 1h30", valor: 0 },
      total: 470,
      aprovado: null,
    },
    {
      item: "Filtro de ar",
      severidade: "atencao",
      consequencia: "Filtro sujo aumenta consumo e reduz a vida do motor.",
      obsMecanico: "Sujo, dentro do intervalo recomendado de troca.",
      fotos: ["assets/images/filtro.jpg"],
      peca: { desc: "Filtro de ar do motor", valor: 70 },
      maoDeObra: { desc: "Substituição · 20min", valor: 30 },
      total: 100,
      aprovado: null,
    },
  ],

  /* ---------------------------------------------------------
     5. CHECKLIST/DVI DO HERÓI (mobile — Beto estrutura o áudio)
     --------------------------------------------------------- */
  checklist: [
    { grupo: "Freios", item: "Pastilha dianteira", severidade: "critico", foto: true,
      obs: "Pastilha dianteira 2mm, abaixo do limite. (ditado por áudio → texto)" },
    { grupo: "Freios", item: "Disco dianteiro",   severidade: "critico", foto: true,  obs: "Empenamento, vibração no pedal." },
    { grupo: "Freios", item: "Pastilha traseira", severidade: "ok",       foto: false, obs: "" },
    { grupo: "Freios", item: "Fluido de freio",   severidade: "atencao",  foto: false, obs: "Nível ok, cor escura." },
    { grupo: "Motor",  item: "Filtro de ar",       severidade: "atencao",  foto: true,  obs: "Sujo." },
    { grupo: "Motor",  item: "Óleo do motor",      severidade: "ok",       foto: false, obs: "" },
    { grupo: "Motor",  item: "Correia",            severidade: "ok",       foto: false, obs: "" },
    { grupo: "Motor",  item: "Bateria",            severidade: "ok",       foto: false, obs: "" },
    { grupo: "Suspensão", item: "Amortecedor diant.", severidade: "ok",    foto: false, obs: "" },
    { grupo: "Suspensão", item: "Bieleta",         severidade: "ok",       foto: false, obs: "" },
    { grupo: "Suspensão", item: "Pneus",           severidade: "ok",       foto: false, obs: "Desgaste uniforme." },
  ],

  /* ---------------------------------------------------------
     6. FROTA / FILA — atendimentos ativos (Lista, Kanban, Agenda,
        Painel do Mecânico, Painel TV Cliente, Dashboard)
        etapa: Recebido | Inspeção | Ag. Aprovação | Ag. Peças |
               Aprovado | Execução | Ctrl. Qualidade | Finalizado | Entregue
        O herói entra aqui também (heroi:true).
     --------------------------------------------------------- */
  fila: [
    { placa: "ABC1D23", veiculo: "VW Gol 1.6", cliente: "João Ribeiro", etapa: "Ag. Aprovação",
      progresso: 40, mecanico: "Carlos Ferreira", servico: "Freios + revisão", box: "BOX 3", valor: 870,
      prazo: "aguardando aprovação", severidade: "critico", heroi: true, pronto: false,
      tarefas: [
        { label: "Pastilha dianteira", estado: "feita" },
        { label: "Disco dianteiro",    estado: "atual" },
        { label: "Sangria",            estado: "pendente" },
      ],
      fotos: [
        { foto: "assets/images/pastilha.jpg", item: "Pastilha de freio desgastada",
          consequencia: "A distância de frenagem aumenta e o disco pode ser danificado." },
      ] },

    { placa: "MNO-7890", veiculo: "Fiat Argo 2023", cliente: "Luciana Costa", etapa: "Recebido",
      progresso: 11, mecanico: null, servico: "Revisão 10k + troca de óleo", box: null, valor: 280,
      prazo: "sem técnico", severidade: "atencao", janela: "08:42–12:00", tarefas: [], fotos: [] },

    { placa: "LMN-4567", veiculo: "Fiat Pulse 2023", cliente: "Rodrigo Braga", etapa: "Recebido",
      progresso: 3, mecanico: null, servico: "Revisão de entrada", box: null, valor: 160,
      prazo: "prioritário · sem técnico", severidade: "atencao", janela: "09:05–13:00", tarefas: [], fotos: [] },

    { placa: "GHI-9012", veiculo: "Hyundai HB20 2019", cliente: "João Lima", etapa: "Inspeção",
      progresso: 75, mecanico: "Pedro", servico: "Checklist de entrada + filtros", box: "BOX 3", valor: 195,
      prazo: "75% · falta 30min", severidade: "atencao", janela: "07:30–11:30",
      tarefas: [ { label: "Checklist de entrada", estado: "atual" } ], fotos: [] },

    { placa: "ABC-1234", veiculo: "Toyota Corolla 2021", cliente: "Ana Souza", etapa: "Ag. Aprovação",
      progresso: 100, mecanico: "Carlos", servico: "Sistema de freios completo", box: "BOX 1", valor: 485,
      prazo: "entrega atrasada 1h10 · aguardando cliente 2h15", severidade: "critico", janela: "07:00–14:00", tarefas: [], fotos: [] },

    { placa: "DEF-5678", veiculo: "Honda Civic 2020", cliente: "Maria Santos", etapa: "Ag. Aprovação",
      progresso: 33, mecanico: "João", servico: "Suspensão + alinhamento 3D", box: "BOX 2", valor: 620,
      prazo: "33% · falta 2h · aguardando 45min", severidade: "atencao", janela: "08:00–13:00", tarefas: [], fotos: [] },

    { placa: "RST-8901", veiculo: "Mitsubishi Outlander 2021", cliente: "Marcos Silva", etapa: "Ag. Peças",
      progresso: 67, mecanico: "Carlos", servico: "Amortecedor + correia", box: "BOX 1", valor: 920,
      prazo: "peça atrasada 45min (Bosch 35mm)", severidade: "atencao", parado: true, janela: "06:30–16:00", tarefas: [], fotos: [] },

    { placa: "JKL-3456", veiculo: "VW Jetta 2021", cliente: "Roberto Melo", etapa: "Aprovado",
      progresso: 54, mecanico: null, servico: "Substituição cabeçote motor", box: null, valor: 1840,
      prazo: "54% · falta 2h45 · sem técnico", severidade: "critico", janela: "06:30–15:00",
      tarefas: [ { label: "Substituição cabeçote", estado: "pendente" } ], fotos: [] },

    { placa: "XYZ-9876", veiculo: "Jeep Compass 2022", cliente: "Pedro Alves", etapa: "Execução",
      progresso: 68, mecanico: "Carlos", servico: "Pastilha + disco dianteiro", box: "BOX 1", valor: 505,
      prazo: "68% · falta 1h55", severidade: "ok", cronometro: "01:32:45",
      tarefas: [ { label: "Pastilha", estado: "feita" }, { label: "Disco", estado: "atual" } ], fotos: [] },

    { placa: "PQR-2345", veiculo: "Chevrolet Onix 2022", cliente: "Carlos Mendes", etapa: "Execução",
      progresso: 60, mecanico: "Lucas", servico: "Elétrica — módulo BCM", box: "BOX 4", valor: 340,
      prazo: "entrega atrasada 45min", severidade: "atencao", cronometro: "02:05:12",
      tarefas: [ { label: "Diagnóstico BCM", estado: "atual" }, { label: "Testar", estado: "pendente" } ], fotos: [] },

    { placa: "UVW-2345", veiculo: "Nissan Kicks 2022", cliente: "Patrícia Nunes", etapa: "Ctrl. Qualidade",
      progresso: 98, mecanico: "João", servico: "Revisão 30k + alinhamento", box: null, valor: 480,
      prazo: "98% · falta 5min", severidade: "ok", tarefas: [], fotos: [] },

    { placa: "STU-6789", veiculo: "Renault Sandero 2020", cliente: "Fernanda Lima", etapa: "Pronto",
      progresso: 100, mecanico: "João", servico: "Revisão completa 30k", box: null, valor: 680,
      prazo: "pronto para retirada", severidade: "ok", pronto: true, tarefas: [], fotos: [] },
  ],

  /* ---------------------------------------------------------
     7. CLIENTES (CRM) — Rita atua na retenção
     tag: VIP | Recorrente | Novo
     --------------------------------------------------------- */
  clientes: [
    { nome: "Ana Souza", tag: "VIP", telefone: "(44) 98765-4321", email: "ana.souza@gmail.com",
      cpf: "123.456.789-00", endereco: "Rua das Flores, 342 — Sarandi/PR", cep: "87111-000",
      visitas: 8, totalGasto: 3420, ticketMedio: 427, ultimaVisita: "12 Abr 2026",
      veiculos: ["ABC-1234"], agenteAtuando: null,
      historico: [ "Sistema de freios — 12 Abr 2026", "Revisão 40k — 03 Nov 2025" ] },

    { nome: "Pedro Alves", tag: "VIP", telefone: "(44) 91234-5678", email: "pedro.alves@gmail.com",
      cpf: "234.567.890-11", endereco: "Av. Maringá, 1200 — Sarandi/PR", cep: "87113-000",
      visitas: 12, totalGasto: 6150, ticketMedio: 512, ultimaVisita: "hoje",
      veiculos: ["XYZ-9876"], agenteAtuando: null, historico: [ "Pastilha + disco — hoje" ] },

    { nome: "Maria Santos", tag: "Recorrente", telefone: "(44) 97777-8888", email: "maria.santos@gmail.com",
      cpf: "345.678.901-22", endereco: "Rua Paraná, 55 — Maringá/PR", cep: "87020-000",
      visitas: 5, totalGasto: 1870, ticketMedio: 374, ultimaVisita: "hoje",
      veiculos: ["DEF-5678"], agenteAtuando: null, historico: [] },

    { nome: "João Lima", tag: "VIP", telefone: "(44) 96666-5555", email: "joao.lima@gmail.com",
      cpf: "456.789.012-33", endereco: "Rua das Acácias, 78 — Sarandi/PR", cep: "87111-500",
      visitas: 22, totalGasto: 9800, ticketMedio: 445, ultimaVisita: "hoje",
      veiculos: ["GHI-9012"], agenteAtuando: null, historico: [] },

    { nome: "Luciana Costa", tag: "Novo", telefone: "(44) 95555-4444", email: "luciana.costa@gmail.com",
      cpf: "567.890.123-44", endereco: "Rua Brasil, 900 — Maringá/PR", cep: "87013-000",
      visitas: 3, totalGasto: 840, ticketMedio: 280, ultimaVisita: "hoje",
      veiculos: ["MNO-7890"], agenteAtuando: "Rita",
      historico: [ "Rita reativou (hoje)", "Rita agendou revisão 10k (ontem)" ] },

    { nome: "Roberto Melo", tag: "Recorrente", telefone: "(44) 94444-3333", email: "roberto.melo@gmail.com",
      cpf: "678.901.234-55", endereco: "Av. Colombo, 4500 — Maringá/PR", cep: "87070-000",
      visitas: 9, totalGasto: 4220, ticketMedio: 469, ultimaVisita: "hoje",
      veiculos: ["JKL-3456", "PQR-2345"], agenteAtuando: null, historico: [] },

    { nome: "Fernanda Lima", tag: "Recorrente", telefone: "(44) 93333-2222", email: "fernanda.lima@gmail.com",
      cpf: "789.012.345-66", endereco: "Rua Santos Dumont, 210 — Sarandi/PR", cep: "87112-000",
      visitas: 7, totalGasto: 2910, ticketMedio: 416, ultimaVisita: "hoje",
      veiculos: ["STU-6789"], agenteAtuando: null, historico: [] },
  ],

  /* ---------------------------------------------------------
     8. VEÍCULOS (Prontuário) — "Rev. próxima" aciona a Rita (retenção)
     revStatus: "em-dia" | "proxima" | "vencida"
     --------------------------------------------------------- */
  veiculos: [
    { placa: "ABC-1234", marca: "Toyota", modelo: "Corolla", ano: 2021, cor: "Branco Pérola",
      dono: "Ana Souza", km: 42500, proxRevisao: 50000, revStatus: "em-dia",
      chassi: "9BWZZZ377VT004251", renavam: "01234567890", combustivel: "Flex", motor: "2.0 Flex Aut." },

    { placa: "XYZ-9876", marca: "Jeep", modelo: "Compass", ano: 2022, cor: "Preto Melanine",
      dono: "Pedro Alves", km: 28300, proxRevisao: 30000, revStatus: "proxima",
      chassi: "988ZZZ...", renavam: "11234567890", combustivel: "Flex", motor: "1.3 Turbo Flex" },

    { placa: "DEF-5678", marca: "Honda", modelo: "Civic", ano: 2020, cor: "Prata Diamante",
      dono: "Maria Santos", km: 61200, proxRevisao: 70000, revStatus: "em-dia",
      chassi: "93HZZZ...", renavam: "21234567890", combustivel: "Flex", motor: "2.0 Flex" },

    { placa: "GHI-9012", marca: "Hyundai", modelo: "HB20", ano: 2019, cor: "Vermelho Chili",
      dono: "João Lima", km: 89400, proxRevisao: 90000, revStatus: "vencida",
      chassi: "9BHZZZ...", renavam: "31234567890", combustivel: "Flex", motor: "1.6 Flex" },

    { placa: "MNO-7890", marca: "Fiat", modelo: "Argo", ano: 2023, cor: "Cinza Urbano",
      dono: "Luciana Costa", km: 11200, proxRevisao: 15000, revStatus: "proxima",
      chassi: "9BDZZZ...", renavam: "41234567890", combustivel: "Flex", motor: "1.0 Flex" },

    { placa: "JKL-3456", marca: "Volkswagen", modelo: "Jetta", ano: 2021, cor: "Preto Profundo",
      dono: "Roberto Melo", km: 35800, proxRevisao: 40000, revStatus: "proxima",
      chassi: "3VWZZZ...", renavam: "51234567890", combustivel: "Gasolina", motor: "1.4 TSI" },

    { placa: "PQR-2345", marca: "Chevrolet", modelo: "Onix", ano: 2022, cor: "Branco Summit",
      dono: "Roberto Melo", km: 47100, proxRevisao: 50000, revStatus: "proxima",
      chassi: "9BGZZZ...", renavam: "61234567890", combustivel: "Flex", motor: "1.0 Turbo" },

    { placa: "STU-6789", marca: "Renault", modelo: "Sandero", ano: 2020, cor: "Azul Iron",
      dono: "Fernanda Lima", km: 72300, proxRevisao: 80000, revStatus: "em-dia",
      chassi: "93YZZZ...", renavam: "71234567890", combustivel: "Flex", motor: "1.6 Flex" },
  ],

  /* ---------------------------------------------------------
     9. DASHBOARD — KPIs mock (Dashboard Gerencial)
     --------------------------------------------------------- */
  dashboard: {
    hoje: {
      recebidos: 8, recebidosVsOntem: +2,
      entregues: 6, entreguesMeta: 8,
      faturamento: 4820, faturamentoVsOntem: 0.18,
      ticketMedio: 803, ticketMeta: 750,
    },
    operacao: { emExecucao: 2, agAprovacao: 2, agPecas: 1, veiculosParados: 1 },
    produtividade: { tempoMedioExecucao: "2h18", taxaAprovacao: 0.88, taxaMeta: 0.85 },
    comercial: { orcado: 7200, aprovado: 5900, recusado: 1300, conversao: 0.82, conversaoMeta: 0.80 },
    equipe: [
      { nome: "Carlos Ferreira", nivel: "Sênior",  horas: 4.5, capacidade: 5, os: 3, carga: 0.90 },
      { nome: "João Martins",    nivel: "Pleno",   horas: 2.0, capacidade: 5, os: 1, carga: 0.40 },
      { nome: "Pedro Santos",    nivel: "Júnior",  horas: 0.5, capacidade: 5, os: 1, carga: 0.10 },
      { nome: "Lucas Oliveira",  nivel: "Elétrica",horas: 3.2, capacidade: 5, os: 2, carga: 0.65 },
    ],
    osPorStatus: { Recebido: 6, Inspeção: 4, Aprovação: 3, Aprovado: 2, Executando: 8, Finalizado: 5, Entregue: 12 },
    // Serviços Recusados (Fix14 #7 — "Valor Recusado" clicável abre esta lista)
    servicosRecusados: [
      { item: "Filtro de cabine", veiculo: "Honda Civic", valor: 90,  motivo: "Cliente adiou" },
      { item: "Alinhamento",      veiculo: "Fiat Argo",    valor: 120, motivo: "Fará na próxima" },
    ],
  },

};
