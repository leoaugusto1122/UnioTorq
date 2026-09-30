"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  Camera,
  Mic,
  Check,
  Play,
  CloudOff,
  Zap,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DeviceFrame } from "@/components/device-frame";
import { useDados } from "@/hooks/use-dados";
import type { Severidade } from "@/lib/dados";

const SEV_CFG: Record<Severidade, { label: string; cor: string }> = {
  ok: { label: "Conforme", cor: "var(--ok)" },
  atencao: { label: "Atenção", cor: "var(--warn)" },
  critico: { label: "Reprovado", cor: "var(--danger)" },
};

export default function ChecklistPage() {
  const dados = useDados();
  const [fase, setFase] = useState<"inicio" | "inspecao" | "fim">("inicio");
  const [respostas, setRespostas] = useState<Record<number, Severidade>>({});
  const [soProblemas, setSoProblemas] = useState(false);

  // pré-preenche com o resultado do DVI (a inspeção do herói)
  const iniciar = () => {
    if (dados) {
      const r: Record<number, Severidade> = {};
      dados.checklist.forEach((c, i) => (r[i] = c.severidade));
      setRespostas(r);
    }
    setFase("inspecao");
  };

  const cont = useMemo(() => {
    const vals = Object.values(respostas);
    return {
      total: dados?.checklist.length ?? 0,
      reprovados: vals.filter((v) => v === "critico").length,
      atencao: vals.filter((v) => v === "atencao").length,
      conformes: vals.filter((v) => v === "ok").length,
      respondidos: vals.length,
    };
  }, [respostas, dados]);

  if (!dados) {
    return (
      <AppShell activeSlug="checklist">
        <div className="p-6 text-muted-foreground">Carregando…</div>
      </AppShell>
    );
  }

  const { heroi, checklist } = dados;
  const hero = dados.fila.find((f) => f.heroi);
  const grupos = [...new Set(checklist.map((c) => c.grupo))];
  const fotos = checklist.filter((c) => c.foto).length;

  return (
    <AppShell activeSlug="checklist">
      <div className="p-6">
        <div>
          <h1 className="text-xl font-semibold">Checklist</h1>
          <p className="text-sm text-muted-foreground">Inspeção Operacional</p>
        </div>
        <p className="mt-8 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Mecânico · {fase === "inicio" ? "Iniciar Inspeção" : fase === "inspecao" ? "Em Inspeção" : "Inspeção Finalizada"}
        </p>
        <div className="mt-4">
          <DeviceFrame statusColor="#ffffff" statusText="#111827">
            {/* ---------- INÍCIO ---------- */}
            {fase === "inicio" && (
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <span className="text-base font-semibold">Inspeção</span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-warn">
                    <CloudOff className="size-3.5" /> Offline
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-warn-tint px-4 py-2 text-xs" style={{ color: "#a15c07" }}>
                  <Zap className="size-3.5 shrink-0" /> Modo offline — dados salvos localmente
                </div>

                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
                  <div className="rounded-xl border p-3">
                    <div className="flex items-center justify-between">
                      <span className="mono rounded bg-neutral-900 px-1.5 py-0.5 text-xs font-semibold text-white">{heroi.placa}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-ok-tint px-2 py-0.5 text-xs font-medium text-ok">
                        <span className="size-1.5 rounded-full bg-ok" /> Em Execução
                      </span>
                    </div>
                    <div className="mt-2 text-lg font-bold">{heroi.veiculo} {heroi.ano}</div>
                    <div className="text-sm text-muted-foreground">{heroi.cliente} · {heroi.km.toLocaleString("pt-BR")} km</div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <Campo k="Box" v={hero?.box ?? "—"} />
                      <Campo k="Serviço" v={hero?.servico ?? "—"} />
                      <Campo k="Mecânico" v={(hero?.mecanico ?? "—").split(" ")[0]} />
                      <Campo k="OS" v={heroi.os} mono />
                    </div>
                  </div>

                  <div className="rounded-xl border p-3">
                    <div className="text-sm font-semibold">Checklist</div>
                    <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {grupos.map((g) => (
                        <span key={g} className="inline-flex items-center gap-1">
                          <span className="size-1.5 rounded-full bg-muted-foreground/50" />
                          {g} ({checklist.filter((c) => c.grupo === g).length})
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 text-sm font-semibold">{checklist.length} itens no total</div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border p-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Play className="size-5" />
                    </div>
                    <div>
                      <div className="mono text-xl font-bold">01:32:45</div>
                      <div className="text-xs text-muted-foreground">Pausado</div>
                    </div>
                  </div>
                </div>

                <div className="border-t p-4">
                  <button
                    onClick={iniciar}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
                  >
                    Iniciar Inspeção <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ---------- INSPEÇÃO ---------- */}
            {fase === "inspecao" && (
              <div className="flex h-full flex-col">
                <div className="border-b px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setFase("inicio")} className="text-muted-foreground">
                      <ChevronLeft className="size-5" />
                    </button>
                    <span className="mono text-sm font-semibold">{heroi.placa}</span>
                    <label className="ml-auto inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground">
                      <input type="checkbox" checked={soProblemas} onChange={(e) => setSoProblemas(e.target.checked)} className="size-3.5 accent-[var(--primary)]" />
                      Só problemas
                    </label>
                  </div>
                  <div className="mt-2 flex gap-3 text-xs">
                    <Cont n={cont.reprovados} label="Reprov." cor="var(--danger)" />
                    <Cont n={cont.atencao} label="Atenção" cor="var(--warn)" />
                    <Cont n={cont.conformes} label="Conf." cor="var(--ok)" />
                    <span className="ml-auto text-muted-foreground">{cont.respondidos}/{cont.total}</span>
                  </div>
                </div>

                <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
                  {grupos.map((g) => {
                    const itens = checklist
                      .map((c, i) => ({ ...c, i }))
                      .filter((c) => c.grupo === g)
                      .filter((c) => !soProblemas || respostas[c.i] !== "ok");
                    if (!itens.length) return null;
                    return (
                      <div key={g}>
                        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{g}</h3>
                        <div className="space-y-2">
                          {itens.map((c) => (
                            <div key={c.i} className="rounded-xl border p-3">
                              <div className="text-sm font-medium">{c.item}</div>
                              <div className="mt-2 grid grid-cols-3 gap-1.5">
                                {(["ok", "atencao", "critico"] as Severidade[]).map((sev) => {
                                  const on = respostas[c.i] === sev;
                                  const cfg = SEV_CFG[sev];
                                  return (
                                    <button
                                      key={sev}
                                      onClick={() => setRespostas((r) => ({ ...r, [c.i]: sev }))}
                                      className="rounded-lg py-2 text-xs font-semibold transition-all"
                                      style={
                                        on
                                          ? { background: cfg.cor, color: "#fff" }
                                          : { background: "var(--muted)", color: "var(--muted-foreground)" }
                                      }
                                    >
                                      {cfg.label}
                                    </button>
                                  );
                                })}
                              </div>
                              {respostas[c.i] !== "ok" && (
                                <div className="mt-2 flex gap-2">
                                  <button className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border py-1.5 text-xs font-medium">
                                    <Camera className="size-3.5" /> Foto
                                  </button>
                                  <button className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border py-1.5 text-xs font-medium">
                                    <Mic className="size-3.5" /> Voz
                                  </button>
                                </div>
                              )}
                              {c.obs && respostas[c.i] !== "ok" && (
                                <p className="mt-1.5 text-xs italic text-muted-foreground">{c.obs}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t p-4">
                  <button
                    onClick={() => setFase("fim")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
                  >
                    Concluir Inspeção <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ---------- FIM ---------- */}
            {fase === "fim" && (
              <div className="flex h-full flex-col">
                <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-ok-tint text-ok">
                    <Check className="size-7" />
                  </div>
                  <h2 className="mt-3 text-lg font-bold">Inspeção Finalizada</h2>
                  <p className="text-sm text-muted-foreground">{heroi.veiculo} · {heroi.placa}</p>

                  <div className="mt-5 grid w-full grid-cols-3 gap-2">
                    <Resumo n={cont.total} label="Itens" />
                    <Resumo n={cont.reprovados} label="Reprovados" cor="var(--danger)" />
                    <Resumo n={cont.atencao} label="Atenção" cor="var(--warn)" />
                    <Resumo n={cont.conformes} label="Conformes" cor="var(--ok)" />
                    <Resumo n={fotos} label="Fotos" />
                    <Resumo n={1} label="Notas de voz" />
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    Dados salvos localmente — sincronizará quando online
                  </p>
                </div>
                <div className="border-t p-4">
                  <button
                    onClick={() => setFase("inicio")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
                  >
                    Concluir Inspeção <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            )}
          </DeviceFrame>
        </div>
      </div>
    </AppShell>
  );
}

function Campo({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="rounded-lg border bg-muted/30 px-2.5 py-1.5">
      <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{k}</div>
      <div className={`truncate text-sm font-medium ${mono ? "mono" : ""}`}>{v}</div>
    </div>
  );
}

function Cont({ n, label, cor }: { n: number; label: string; cor: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="font-bold" style={{ color: cor }}>{n}</span>
      <span className="text-muted-foreground">{label}</span>
    </span>
  );
}

function Resumo({ n, label, cor }: { n: number; label: string; cor?: string }) {
  return (
    <div className="rounded-lg border py-2">
      <div className="text-lg font-bold" style={cor ? { color: cor } : undefined}>{n}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}
