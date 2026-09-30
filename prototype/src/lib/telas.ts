import {
  MessageCircle,
  LayoutPanelLeft,
  KanbanSquare,
  LayoutDashboard,
  Users,
  Car,
  Settings,
  Smartphone,
  ClipboardCheck,
  Wrench,
  MonitorPlay,
  type LucideIcon,
} from "lucide-react";

export type GrupoTela = "destaque" | "operacao" | "cliente" | "patio";
export type DispositivoTela = "desktop" | "mobile" | "tv";

export interface Tela {
  slug: string;
  href: string;
  titulo: string;
  descricao: string;
  grupo: GrupoTela;
  dispositivo: DispositivoTela;
  icon: LucideIcon;
  pronta: boolean;
}

export const GRUPOS: Record<GrupoTela, string> = {
  destaque: "Destaque",
  operacao: "Operação (desktop)",
  cliente: "Cliente (celular)",
  patio: "Pátio & Recepção (parede)",
};

export const TELAS: Tela[] = [
  {
    slug: "nina",
    href: "/nina",
    titulo: "Nina no WhatsApp",
    descricao: "A funcionária digital que agenda, avisa e reativa — 24/7.",
    grupo: "destaque",
    dispositivo: "mobile",
    icon: MessageCircle,
    pronta: true,
  },
  { slug: "kanban", href: "/kanban", titulo: "Kanban", descricao: "Fluxo do pátio, R$ por coluna, Lista/Agenda.", grupo: "operacao", dispositivo: "desktop", icon: KanbanSquare, pronta: true },
  { slug: "hub", href: "/hub", titulo: "Hub de Atendimento", descricao: "O coração: orçamento item a item com foto.", grupo: "operacao", dispositivo: "desktop", icon: LayoutPanelLeft, pronta: true },
  { slug: "dashboard", href: "/dashboard", titulo: "Dashboard Gerencial", descricao: "Faturamento vs meta, funil, veículos parados.", grupo: "operacao", dispositivo: "desktop", icon: LayoutDashboard, pronta: true },
  { slug: "crm", href: "/crm", titulo: "CRM de Clientes", descricao: "Base, VIPs e a Rita atuando na retenção.", grupo: "operacao", dispositivo: "desktop", icon: Users, pronta: true },
  { slug: "prontuario", href: "/prontuario", titulo: "Prontuário de Veículos", descricao: "Histórico médico do carro; revisão vencida.", grupo: "operacao", dispositivo: "desktop", icon: Car, pronta: true },
  { slug: "config", href: "/config", titulo: "Configurações", descricao: "Identidade da oficina e canal WhatsApp.", grupo: "operacao", dispositivo: "desktop", icon: Settings, pronta: true },
  { slug: "portal", href: "/portal", titulo: "Portal do Cliente", descricao: "Acompanhamento + aprovação, sem login.", grupo: "cliente", dispositivo: "mobile", icon: Smartphone, pronta: true },
  { slug: "checklist", href: "/checklist", titulo: "Checklist / DVI", descricao: "Inspeção do mecânico com foto e voz.", grupo: "cliente", dispositivo: "mobile", icon: ClipboardCheck, pronta: true },
  { slug: "painel-mecanico", href: "/painel-mecanico", titulo: "Painel do Mecânico", descricao: "'O que faço agora' por mecânico, no pátio.", grupo: "patio", dispositivo: "tv", icon: Wrench, pronta: true },
  { slug: "painel-tv", href: "/painel-tv", titulo: "Painel TV Cliente", descricao: "Fila anônima, fotos e alerta de retirada.", grupo: "patio", dispositivo: "tv", icon: MonitorPlay, pronta: true },
];
