/* Tipos da "verdade" única (public/dados-demo.js → window.DADOS_DEMO) */

export type Severidade = "ok" | "atencao" | "critico";
export type EstadoTarefa = "feita" | "atual" | "pendente";
export type RevStatus = "em-dia" | "proxima" | "vencida";

export interface Oficina {
  nome: string;
  telefone: string;
  cidade: string;
  cor: string;
  logo: string;
}

export interface Agentes {
  recepcionista: string;
  retencao: string;
  consultor: string;
  mecanico: string;
}

export interface Heroi {
  placa: string;
  veiculo: string;
  ano: number;
  cor: string;
  motor: string;
  km: number;
  cliente: string;
  telefone: string;
  queixa: string;
  horario: string;
  os: string;
  entrada: string;
  previsao: string;
  etapa: string;
  progresso: number;
  mecanicoNome: string;
  consultor: string;
}

export interface ItemOrcamento {
  item: string;
  severidade: Severidade;
  consequencia: string;
  obsMecanico: string;
  fotos: string[];
  peca: { desc: string; valor: number };
  maoDeObra: { desc: string; valor: number };
  total: number;
  aprovado: boolean | null;
}

export interface ItemChecklist {
  grupo: string;
  item: string;
  severidade: Severidade;
  foto: boolean;
  obs: string;
}

export interface Tarefa {
  label: string;
  estado: EstadoTarefa;
}

export interface FotoItem {
  foto: string;
  item: string;
  consequencia: string;
}

export interface Atendimento {
  placa: string;
  veiculo: string;
  cliente: string;
  etapa: string;
  progresso: number;
  mecanico: string | null;
  servico: string;
  box?: string | null;
  valor: number;
  prazo: string;
  severidade: Severidade;
  heroi?: boolean;
  pronto?: boolean;
  parado?: boolean;
  janela?: string;
  cronometro?: string;
  tarefas: Tarefa[];
  fotos: FotoItem[];
}

export interface Cliente {
  nome: string;
  tag: "VIP" | "Recorrente" | "Novo";
  telefone: string;
  email: string;
  cpf: string;
  endereco: string;
  cep: string;
  visitas: number;
  totalGasto: number;
  ticketMedio: number;
  ultimaVisita: string;
  veiculos: string[];
  agenteAtuando: string | null;
  historico: string[];
}

export interface Veiculo {
  placa: string;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
  dono: string;
  km: number;
  proxRevisao: number;
  revStatus: RevStatus;
  chassi: string;
  renavam: string;
  combustivel: string;
  motor: string;
}

export interface Dashboard {
  hoje: {
    recebidos: number;
    recebidosVsOntem: number;
    entregues: number;
    entreguesMeta: number;
    faturamento: number;
    faturamentoVsOntem: number;
    ticketMedio: number;
    ticketMeta: number;
  };
  operacao: { emExecucao: number; agAprovacao: number; agPecas: number; veiculosParados: number };
  produtividade: { tempoMedioExecucao: string; taxaAprovacao: number; taxaMeta: number };
  comercial: { orcado: number; aprovado: number; recusado: number; conversao: number; conversaoMeta: number };
  equipe: { nome: string; nivel: string; horas: number; capacidade: number; os: number; carga: number }[];
  osPorStatus: Record<string, number>;
  servicosRecusados: { item: string; veiculo: string; valor: number; motivo: string }[];
}

export interface Dados {
  oficina: Oficina;
  agentes: Agentes;
  heroi: Heroi;
  orcamento: ItemOrcamento[];
  checklist: ItemChecklist[];
  fila: Atendimento[];
  clientes: Cliente[];
  veiculos: Veiculo[];
  dashboard: Dashboard;
}

declare global {
  interface Window {
    DADOS_DEMO: Dados;
  }
}

/* helpers de formatação */
export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const km = (v: number) => `${v.toLocaleString("pt-BR")} km`;

export const primeiroNome = (nome: string) => nome.trim().split(/\s+/)[0];
