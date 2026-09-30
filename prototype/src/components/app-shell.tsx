"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  TriangleAlert,
  Activity,
  BarChart3,
  Monitor,
  Wrench,
  Users,
  Car,
  MessageSquare,
  ClipboardCheck,
  Eye,
  FileText,
  Settings,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  slug: string;
  icon: LucideIcon;
  pronta: boolean;
}

const NAV: { secao: string; itens: NavItem[] }[] = [
  {
    secao: "Operação",
    itens: [
      { label: "Kanban", href: "/kanban", slug: "kanban", icon: LayoutGrid, pronta: true },
      { label: "Exceções", href: "/kanban", slug: "excecoes", icon: TriangleAlert, pronta: false },
      { label: "Atendimentos", href: "/hub", slug: "hub", icon: Activity, pronta: true },
    ],
  },
  {
    secao: "Gestão",
    itens: [
      { label: "Dashboard", href: "/dashboard", slug: "dashboard", icon: BarChart3, pronta: true },
      { label: "Painel Mecânico", href: "/painel-mecanico", slug: "painel-mecanico", icon: Wrench, pronta: true },
      { label: "Painel TV", href: "/painel-tv", slug: "painel-tv", icon: Monitor, pronta: true },
    ],
  },
  {
    secao: "Cadastros",
    itens: [
      { label: "Clientes", href: "/crm", slug: "crm", icon: Users, pronta: true },
      { label: "Veículos", href: "/prontuario", slug: "prontuario", icon: Car, pronta: true },
    ],
  },
  {
    secao: "IA",
    itens: [{ label: "Agente WhatsApp", href: "/nina", slug: "nina", icon: MessageSquare, pronta: true }],
  },
  {
    secao: "Mobile",
    itens: [
      { label: "Checklist", href: "/checklist", slug: "checklist", icon: ClipboardCheck, pronta: true },
      { label: "Portal Cliente", href: "/portal", slug: "portal", icon: Eye, pronta: true },
      { label: "Aprov. Digital", href: "/aprovacao", slug: "aprovacao", icon: FileText, pronta: true },
    ],
  },
];

export function AppShell({
  activeSlug,
  children,
}: {
  activeSlug?: string;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* rail navy */}
      <aside
        className={`flex shrink-0 flex-col bg-[#171a2e] text-slate-300 transition-[width] duration-200 ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        {/* marca */}
        <div className={collapsed ? "flex flex-col items-center gap-2 px-2 py-3" : "flex h-16 items-center gap-2.5 px-3.5"}>
          <Link href="/" className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">
            U
          </Link>
          {!collapsed && <div className="flex-1 truncate text-sm font-semibold text-white">Unio Oficina</div>}
          <button
            onClick={() => setCollapsed((c) => !c)}
            title={collapsed ? "Expandir menu" : "Recolher menu"}
            aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
            className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </button>
        </div>

        <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto px-3 py-2">
          {NAV.map((grupo) => (
            <div key={grupo.secao}>
              {!collapsed && (
                <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {grupo.secao}
                </div>
              )}
              <div className="space-y-0.5">
                {grupo.itens.map((it) => (
                  <NavRow key={it.slug} item={it} active={it.slug === activeSlug} collapsed={collapsed} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="px-3 py-3">
          <NavRow
            item={{ label: "Configurações", href: "/config", slug: "config", icon: Settings, pronta: true }}
            active={activeSlug === "config"}
            collapsed={collapsed}
          />
        </div>
      </aside>

      {/* conteúdo — cada tela renderiza seu próprio header */}
      <main className="min-h-0 min-w-0 flex-1 overflow-auto">{children}</main>
    </div>
  );
}

function NavRow({ item, active, collapsed }: { item: NavItem; active: boolean; collapsed: boolean }) {
  const Icon = item.icon;
  const base = "relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors";
  const state = active
    ? "bg-primary/25 font-medium text-white"
    : item.pronta
      ? "text-slate-300 hover:bg-white/10 hover:text-white"
      : "text-slate-500";

  const content = (
    <>
      {active && <span className="absolute -left-3 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />}
      <Icon className="size-[18px] shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {!collapsed && !item.pronta && (
        <span className="ml-auto rounded bg-white/10 px-1.5 text-[10px] text-slate-400">em breve</span>
      )}
    </>
  );

  const title = collapsed ? `${item.label}${item.pronta ? "" : " (em breve)"}` : undefined;

  return item.pronta ? (
    <Link href={item.href} title={title} className={`${base} ${state}`}>
      {content}
    </Link>
  ) : (
    <div title={title ?? `${item.label} (em breve)`} className={`${base} ${state} cursor-not-allowed`}>
      {content}
    </div>
  );
}
