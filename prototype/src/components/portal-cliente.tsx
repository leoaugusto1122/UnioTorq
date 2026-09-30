"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  Camera,
  Clock,
  FileText,
  Check,
  ChevronRight,
  TriangleAlert,
  PenLine,
  Image as ImageIcon,
  ShieldCheck,
} from "lucide-react";
import { DeviceFrame } from "@/components/device-frame";
import { useDados, } from "@/hooks/use-dados";
import { brl } from "@/lib/dados";
import { Pill, SevPill } from "@/components/pills";

const ETAPAS = ["Recebido", "Inspeção", "Aprovação", "Em Execução", "Finalizado", "Entregue"];
const HORAS = ["08:30", "09:15", "agora", "—", "—", "—"];

export function PortalCliente({ defaultTab = "status" }: { defaultTab?: string }) {
  const dados = useDados();
  const [tab, setTab] = useState(defaultTab);
  const [decisao, setDecisao] = useState<Record<number, "aprovar" | "recusar">>({});
  const [expandido, setExpandido] = useState<number | null>(null);

  const contadores = useMemo(() => {
    const c = dados?.checklist ?? [];
    return {
      total: c.length,
      criticos: c.filter((x) => x.severidade === "critico").length,
      atencao: c.filter((x) => x.severidade === "atencao").length,
      conformes: c.filter((x) => x.severidade === "ok").length,
    };
  }, [dados]);

  if (!dados) return <div className="p-6 text-muted-foreground">Carregando…</div>;
  const { oficina, heroi, orcamento } = dados;

  // etapa atual do herói na timeline
  const etapaAtual = 2; // "Aprovação" — herói está em Ag. Aprovação
  const totalAprovado = orcamento.reduce((s, it, i) => (decisao[i] === "aprovar" ? s + it.total : s), 0);

  const TABS = [
    { id: "status", label: "Status", icon: Activity },
    { id: "aprovacao", label: "Aprovação", icon: ShieldCheck },
    { id: "fotos", label: "Fotos", icon: Camera },
    { id: "historico", label: "Histórico", icon: Clock },
    { id: "docs", label: "Docs", icon: FileText },
  ];

  return (
    <div className="flex h-full flex-col bg-white">
      {/* header do portal (dentro do celular) */}
      <div className="flex items-center gap-2.5 border-b px-4 py-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">U</div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{oficina.nome}</div>
          <div className="text-xs text-muted-foreground">Acompanhamento em tempo real</div>
        </div>
        <span className="size-2.5 rounded-full bg-ok" />
      </div>

      {/* veículo */}
      <div className="flex items-center gap-2 border-b px-4 py-2.5">
        <span className="mono rounded bg-neutral-900 px-1.5 py-0.5 text-xs font-semibold text-white">{heroi.placa}</span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{heroi.veiculo} {heroi.ano}</div>
          <div className="text-xs text-muted-foreground">Carlos · Prev. {heroi.previsao}</div>
        </div>
        <Pill tone="info">{heroi.etapa}</Pill>
      </div>

      {/* tabs */}
      <div className="flex border-b text-xs">
        {TABS.map((t) => {
          const on = tab === t.id;
          const I = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`-mb-px flex flex-1 flex-col items-center gap-1 border-b-2 py-2 font-medium transition-colors ${
                on ? "border-primary text-primary" : "border-transparent text-muted-foreground"
              }`}
            >
              <I className="size-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* conteúdo */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {tab === "status" && (
          <div>
            <h3 className="mb-3 text-sm font-semibold">Status do veículo</h3>
            <ol className="relative">
              {ETAPAS.map((e, i) => {
                const done = i < etapaAtual;
                const current = i === etapaAtual;
                const last = i === ETAPAS.length - 1;
                return (
                  <li key={e} className="relative flex gap-3 pb-5">
                    {!last && (
                      <span
                        className="absolute left-[11px] top-6 h-full w-0.5"
                        style={{ background: done ? "var(--ok)" : "var(--border)" }}
                      />
                    )}
                    <span
                      className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: done || current ? "var(--ok)" : "var(--muted)",
                        color: done || current ? "#fff" : "var(--muted-foreground)",
                      }}
                    >
                      {done || current ? <Check className="size-3.5" /> : <span className="size-1.5 rounded-full bg-current" />}
                    </span>
                    <div className="flex flex-1 items-start justify-between">
                      <div>
                        <div className={`text-sm ${current ? "font-semibold" : done ? "" : "text-muted-foreground"}`}>{e}</div>
                        {current && <div className="text-xs font-medium text-ok">● Agora</div>}
                      </div>
                      <span className="mono text-xs text-muted-foreground">{HORAS[i]}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {tab === "aprovacao" && (
          <div className="space-y-4">
            {/* stepper horizontal */}
            <div className="flex items-center">
              {ETAPAS.slice(0, 5).map((e, i) => {
                const done = i < etapaAtual;
                const current = i === etapaAtual;
                return (
                  <div key={e} className="flex flex-1 flex-col items-center">
                    <div className="flex w-full items-center">
                      {i > 0 && <span className="h-0.5 flex-1" style={{ background: i <= etapaAtual ? "var(--ok)" : "var(--border)" }} />}
                      <span
                        className="flex size-5 items-center justify-center rounded-full text-[10px]"
                        style={{
                          background: done ? "var(--ok)" : current ? "var(--warn)" : "var(--muted)",
                          color: done || current ? "#fff" : "var(--muted-foreground)",
                        }}
                      >
                        {done ? <Check className="size-3" /> : ""}
                      </span>
                      {i < 4 && <span className="h-0.5 flex-1" style={{ background: i < etapaAtual ? "var(--ok)" : "var(--border)" }} />}
                    </div>
                    <span className="mt-1 text-[10px] text-muted-foreground">{["Recebido", "Inspeção", "Aprovação", "Execução", "Entrega"][i]}</span>
                  </div>
                );
              })}
            </div>

            {/* contadores */}
            <div className="grid grid-cols-4 gap-2">
              <Contador n={contadores.total} label="Avaliados" />
              <Contador n={contadores.criticos} label="Críticos" tone="var(--danger)" />
              <Contador n={contadores.atencao} label="Atenção" tone="var(--warn)" />
              <Contador n={contadores.conformes} label="Conformes" tone="var(--ok)" />
            </div>

            {/* itens */}
            {orcamento.map((it, i) => {
              const dec = decisao[i];
              return (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border"
                  style={it.severidade === "critico" ? { borderColor: "color-mix(in oklch, var(--danger) 30%, transparent)" } : undefined}
                >
                  <div className="p-3" style={it.severidade === "critico" ? { background: "var(--danger-tint)" } : { background: "var(--warn-tint)" }}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{it.item}</span>
                      <SevPill sev={it.severidade} />
                    </div>
                    <p className="mt-1 text-xs" style={{ color: it.severidade === "critico" ? "#b42318" : "#a15c07" }}>
                      {it.severidade === "critico" ? "Troca recomendada — segurança" : "Atenção recomendada"}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{it.consequencia}</p>
                  </div>

                  <div className="space-y-2 p-3">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Observação do mecânico</div>
                      <p className="mt-0.5 text-xs italic text-muted-foreground">&ldquo;{it.obsMecanico}&rdquo;</p>
                    </div>
                    <button className="inline-flex items-center gap-1 rounded-full border border-info/40 px-2 py-0.5 text-[11px] font-medium text-info">
                      <Camera className="size-3" /> {it.fotos.length} fotos <ChevronRight className="size-3" />
                    </button>

                    <div className="border-t pt-2">
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Orçamento do item</div>
                      <div className="mt-1 space-y-0.5 text-xs">
                        <div className="flex justify-between"><span>{it.peca.desc}</span><span className="mono">{brl(it.peca.valor)}</span></div>
                        {it.maoDeObra.valor > 0 && (
                          <div className="flex justify-between"><span>{it.maoDeObra.desc}</span><span className="mono">{brl(it.maoDeObra.valor)}</span></div>
                        )}
                        <div className="flex justify-between border-t pt-1 font-semibold"><span>Total</span><span className="mono">{brl(it.total)}</span></div>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandido(expandido === i ? null : i)}
                      className="flex w-full items-center gap-1 text-[11px] text-warn"
                    >
                      <TriangleAlert className="size-3" /> O que acontece se não realizar?
                      <ChevronRight className={`ml-auto size-3 transition-transform ${expandido === i ? "rotate-90" : ""}`} />
                    </button>
                    {expandido === i && <p className="text-xs text-muted-foreground">{it.consequencia} Adiar pode aumentar o custo do reparo.</p>}

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setDecisao((d) => ({ ...d, [i]: "aprovar" }))}
                        className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                          dec === "aprovar" ? "bg-ok text-white" : "bg-muted text-foreground"
                        }`}
                      >
                        <Check className="size-4" /> Aprovar
                      </button>
                      <button
                        onClick={() => setDecisao((d) => ({ ...d, [i]: "recusar" }))}
                        className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                          dec === "recusar" ? "bg-neutral-800 text-white" : "bg-muted text-foreground"
                        }`}
                      >
                        Recusar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* autorizar */}
            <div className="rounded-xl border bg-card p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Total aprovado</span>
                <span className="mono text-lg font-semibold">{brl(totalAprovado)}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 rounded-lg bg-muted p-2 text-[11px] text-muted-foreground">
                <PenLine className="size-3.5 shrink-0" /> Ao confirmar, registramos sua assinatura, IP e horário (trilha de auditoria).
              </div>
              <button className="mt-2 w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground">
                Confirmar aprovação
              </button>
              <button disabled className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border py-2 text-sm font-medium text-muted-foreground opacity-70">
                Pagar com Pix <span className="rounded bg-muted px-1.5 text-[10px]">em breve</span>
              </button>
            </div>
          </div>
        )}

        {tab === "fotos" && (
          <div className="grid grid-cols-2 gap-2">
            {orcamento.flatMap((it) => it.fotos).map((_, i) => (
              <div key={i} className="flex aspect-square items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <ImageIcon className="size-6" />
              </div>
            ))}
          </div>
        )}

        {tab === "historico" && (
          <div className="space-y-2">
            {["Revisão 40k — 03 Nov 2025", "Troca de óleo — 12 Ago 2025", "Alinhamento — 20 Mai 2025"].map((h) => (
              <div key={h} className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2.5 text-sm">
                <Clock className="size-4 text-muted-foreground" /> {h}
              </div>
            ))}
          </div>
        )}

        {tab === "docs" && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-10 text-center text-sm text-muted-foreground">
            <FileText className="size-6" />
            OS e nota fiscal
            <span className="rounded bg-muted px-2 py-0.5 text-xs">em breve</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Contador({ n, label, tone }: { n: number; label: string; tone?: string }) {
  return (
    <div className="rounded-lg border bg-card py-2 text-center">
      <div className="text-lg font-bold" style={tone ? { color: tone } : undefined}>{n}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}
