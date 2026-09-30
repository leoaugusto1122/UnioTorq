"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Send, MessageCircle, FileText, Image as ImageIcon, Mic, Check, CheckCheck,
  Lock, Search, User, Play, Plus, Activity, ClipboardCheck, Receipt, MessageSquare, Car,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Pill, SevPill, Dot, etapaTone, sevTone } from "@/components/pills";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDados } from "@/hooks/use-dados";
import { brl, km } from "@/lib/dados";

const FILTROS = ["Urgência", "Entrada", "Valor"];
const ini = (n: string) => n.trim().split(/\s+/).slice(0, 2).map((x) => x[0]).join("").toUpperCase();

export default function HubPage() {
  const dados = useDados();
  const [placa, setPlaca] = useState<string | null>(null);
  const [tab, setTab] = useState("geral");
  const [incluidos, setIncluidos] = useState<Set<number>>(new Set());
  const [enviado, setEnviado] = useState(false);
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState("Urgência");

  useEffect(() => {
    if (dados && placa === null) {
      setPlaca(dados.heroi.placa);
      setIncluidos(new Set(dados.orcamento.map((_, i) => i)));
    }
  }, [dados, placa]);

  const timeline = useMemo(() => {
    if (!dados) return [];
    const a = dados.agentes;
    return [
      { t: "21:50", who: a.recepcionista, txt: `agendou o horário (${dados.heroi.horario})`, tone: "brand" as const },
      { t: "08:34", who: a.mecanico, txt: "estruturou o checklist ditado — 2 itens críticos", tone: "critico" as const },
      { t: "11:05", who: a.consultor, txt: "preparou o orçamento a partir do checklist", tone: "info" as const },
      { t: "11:05", who: a.recepcionista, txt: "enviou o orçamento pelo WhatsApp", tone: "brand" as const },
      { t: "11:31", who: "Cliente", txt: "aprovou 2 itens no link (assinatura registrada)", tone: "ok" as const },
    ];
  }, [dados]);

  if (!dados) {
    return <AppShell activeSlug="hub"><div className="p-6 text-muted-foreground">Carregando…</div></AppShell>;
  }

  const { heroi, agentes } = dados;
  const lista = dados.fila.filter((f) => `${f.placa} ${f.veiculo} ${f.cliente}`.toLowerCase().includes(q.toLowerCase()));
  const sel = dados.fila.find((f) => f.placa === placa) ?? dados.fila[0];
  const isHero = !!sel.heroi;
  const orcamento = isHero ? dados.orcamento : [];
  const checklist = isHero ? dados.checklist : [];
  const total = orcamento.reduce((s, it, i) => (incluidos.has(i) ? s + it.total : s), 0);
  const grupos = [...new Set(checklist.map((c) => c.grupo))];
  const nProblemas = checklist.filter((c) => c.severidade !== "ok").length;
  const criticos = dados.fila.filter((f) => f.severidade === "critico").length;
  const nivelMec = dados.dashboard.equipe.find((e) => e.nome === sel.mecanico)?.nivel;
  const subveic = isHero ? `${heroi.cor} · ${heroi.motor} · ${km(heroi.km)}` : sel.veiculo;

  const stats = [
    { k: "OS", v: isHero ? heroi.os : "—", mono: true },
    { k: "Entrada", v: isHero ? heroi.entrada : "—", mono: true },
    { k: "Previsão", v: isHero ? heroi.previsao : "—", mono: true },
    { k: "Mecânico", v: (sel.mecanico ?? "—").split(" ")[0] },
    { k: "Consultor", v: isHero ? heroi.consultor.split(" ")[0] : "—" },
    { k: "Total", v: brl(isHero ? total : sel.valor), mono: true, strong: true },
  ];

  const TABS = [
    { id: "geral", label: "Geral", icon: FileText },
    { id: "timeline", label: "Timeline", icon: Activity },
    { id: "inspecao", label: "Inspeção", icon: ClipboardCheck, count: isHero ? nProblemas : undefined },
    { id: "orcamento", label: "Orçamento", icon: Receipt },
    { id: "comunicacao", label: "Comunicação", icon: MessageSquare, count: 2 },
    { id: "financeiro", label: "Financeiro", icon: Lock, soon: true },
  ];

  return (
    <AppShell activeSlug="hub">
      <div className="flex h-full">
        {/* LISTA */}
        <aside className="flex w-80 shrink-0 flex-col border-r bg-card">
          <div className="border-b px-4 py-3">
            <h2 className="text-base font-semibold">Hub de Atendimento</h2>
            <p className="text-xs text-muted-foreground">{dados.fila.length} atendimentos ativos</p>
            <div className="relative mt-3">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Placa, modelo, cliente…" className="pl-8" />
            </div>
            <div className="mt-2 flex gap-1">
              {FILTROS.map((f) => (
                <Button key={f} variant={filtro === f ? "secondary" : "ghost"} size="sm" className="flex-1" onClick={() => setFiltro(f)}>{f}</Button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{dados.fila.length} atendimentos · {criticos} críticos</p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {lista.map((f) => {
              const active = f.placa === sel.placa;
              return (
                <button key={f.placa} onClick={() => { setPlaca(f.placa); setEnviado(false); }}
                  className={`relative mb-2 block w-full rounded-xl p-3 text-left ring-1 transition-colors ${active ? "bg-accent ring-primary/30" : "ring-foreground/10 hover:bg-muted/50"}`}>
                  {active && <span className="absolute left-0 top-3 h-8 w-1 rounded-r-full bg-primary" />}
                  <div className="flex items-center justify-between gap-2">
                    <Placa v={f.placa} />
                    <Pill tone={etapaTone(f.etapa)}>{f.etapa}</Pill>
                  </div>
                  <div className="mt-2 text-sm font-semibold">{f.veiculo}</div>
                  <div className="text-xs text-muted-foreground">{f.cliente}</div>
                  <div className="truncate text-xs text-muted-foreground">{f.servico}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <Bar pct={f.progresso} danger={f.severidade === "critico"} />
                    <span className="text-[11px] text-muted-foreground">{f.progresso}%</span>
                    <span className="mono text-xs font-medium">{brl(f.valor)}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="border-t p-3">
            <Button className="w-full"><Plus className="size-4" /> Novo Atendimento</Button>
          </div>
        </aside>

        {/* DETALHE */}
        <section className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Placa v={sel.placa} icon lg />
                  <h1 className="text-xl font-semibold">{sel.veiculo}</h1>
                  <Pill tone={etapaTone(sel.etapa)}>{sel.etapa}</Pill>
                </div>
                <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                  <span>{subveic}</span><span className="text-muted-foreground/40">·</span>
                  <span className="inline-flex items-center gap-1"><User className="size-3.5" /> {sel.cliente}</span>
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {sel.cronometro && (
                  <span className="mono inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium" style={{ background: "#e6f7ef", color: "#0b6b46" }}>
                    <Play className="size-3.5" /> {sel.cronometro}
                  </span>
                )}
                <Button onClick={() => setEnviado(true)}><Send className="size-4" /> Enviar Orçamento</Button>
                <Link href="/nina" className={buttonVariants({ variant: "outline" })}><MessageCircle className="size-4" /> WhatsApp</Link>
                <Button variant="outline"><FileText className="size-4" /> OS</Button>
              </div>
            </div>

            {/* stats row */}
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 border-b pb-4 sm:grid-cols-3 lg:grid-cols-6">
              {stats.map((s) => (
                <div key={s.k}>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{s.k}</div>
                  <div className={`text-sm ${s.strong ? "font-semibold" : "font-medium"} ${s.mono ? "mono" : ""}`}>{s.v}</div>
                </div>
              ))}
            </div>

            {sel.cronometro && (
              <div className="mt-3 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium" style={{ background: "#e6f7ef", color: "#0b6b46" }}>
                <span className="size-2 rounded-full" style={{ background: "#0b6b46" }} />
                Cronômetro em execução — {sel.mecanico} no {isHero ? heroi.os : "OS"}
                <span className="mono ml-auto text-lg font-semibold">{sel.cronometro}</span>
              </div>
            )}

            {enviado && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-accent/60 px-3 py-2 text-sm text-accent-foreground ring-1 ring-primary/20">
                <CheckCheck className="size-4 text-primary" />
                Orçamento enviado — a <strong>{agentes.recepcionista}</strong> mandou o link ao cliente.
                <Link href="/nina" className="ml-1 font-medium underline">ver conversa</Link>
              </div>
            )}

            {/* abas (shadcn Tabs) */}
            <Tabs value={tab} onValueChange={(v) => setTab(v as string)} className="mt-5">
              <TabsList variant="line" className="w-full justify-start overflow-x-auto">
                {TABS.map((t) => {
                  const I = t.icon;
                  return (
                    <TabsTrigger key={t.id} value={t.id} disabled={t.soon} className="flex-none">
                      <I /> {t.label}
                      {typeof t.count === "number" && <Badge variant="secondary" className="ml-1">{t.count}</Badge>}
                      {t.soon && <span className="ml-1 text-[10px] text-muted-foreground">em breve</span>}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <TabsContent value="geral" className="pt-5">
                {isHero ? (
                  <div className="space-y-5">
                    <Callout label="Relato do problema" tone="warn">
                      Cliente relatou {heroi.queixa}, principalmente em descidas. Sensação de vibração no pedal em alta velocidade.
                    </Callout>
                    <Callout label="Observações técnicas" tone="info">
                      Veículo chegou com {km(heroi.km)}. Última revisão há ~8.300 km na concessionária. Cliente pediu para verificar também o filtro de cabine.
                    </Callout>
                    <div>
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dados do atendimento</div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <DadoCard k="OS" v={heroi.os} mono />
                        <DadoCard k="Status" v={sel.etapa} tone={etapaTone(sel.etapa)} />
                        <DadoCard k="Entrada" v={heroi.entrada} mono />
                        <DadoCard k="Previsão" v={heroi.previsao} mono />
                        <DadoCard k="Mecânico" v={`${sel.mecanico}${nivelMec ? ` · ${nivelMec}` : ""}`} avatar={ini(sel.mecanico ?? "")} />
                        <DadoCard k="Consultor" v={heroi.consultor} avatar={ini(heroi.consultor)} />
                        <DadoCard k="Veículo" v={`${sel.veiculo} ${heroi.ano}`} />
                        <DadoCard k="Cor / Motor" v={`${heroi.cor} · ${heroi.motor}`} />
                        <DadoCard k="KM atual" v={km(heroi.km)} mono />
                        <DadoCard k="Cliente" v={sel.cliente} />
                        <DadoCard k="Telefone" v={heroi.telefone} mono />
                      </div>
                    </div>
                  </div>
                ) : <EmptyHero heroPlaca={heroi.placa} />}
              </TabsContent>

              <TabsContent value="timeline" className="pt-5">
                {isHero ? (
                  <ol className="relative space-y-4 border-l pl-5">
                    {timeline.map((e, i) => (
                      <li key={i} className="relative">
                        <span className="absolute -left-[22px] top-1 flex size-3 items-center justify-center"><Dot tone={e.tone} /></span>
                        <div className="text-sm"><span className="mono text-xs text-muted-foreground">{e.t}</span>{" "}<span className="font-medium">{e.who}</span> {e.txt}</div>
                      </li>
                    ))}
                  </ol>
                ) : <EmptyHero heroPlaca={heroi.placa} />}
              </TabsContent>

              <TabsContent value="inspecao" className="pt-5">
                {isHero ? (
                  <div className="space-y-5">
                    {grupos.map((g) => (
                      <div key={g}>
                        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{g}</h3>
                        <Card className="gap-0 py-0">
                          {checklist.filter((c) => c.grupo === g).map((c, i) => (
                            <div key={i} className="flex items-center gap-3 border-b px-4 py-2.5 last:border-0">
                              <SevPill sev={c.severidade} />
                              <span className="flex-1 text-sm">{c.item}</span>
                              {c.foto && <ImageIcon className="size-4 text-muted-foreground" />}
                              {c.obs && <span className="max-w-[45%] truncate text-xs text-muted-foreground">{c.obs}</span>}
                            </div>
                          ))}
                        </Card>
                      </div>
                    ))}
                  </div>
                ) : <EmptyHero heroPlaca={heroi.placa} />}
              </TabsContent>

              <TabsContent value="orcamento" className="pt-5">
                {isHero ? (
                  <div className="space-y-3">
                    {orcamento.map((it, i) => {
                      const on = incluidos.has(i);
                      return (
                        <Card key={i} className={`transition-opacity ${on ? "" : "opacity-55"}`}>
                          <CardContent className="flex items-start gap-3">
                            <div className="flex gap-1.5">{it.fotos.map((_, fi) => <Foto key={fi} />)}</div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2"><SevPill sev={it.severidade} /><span className="font-medium">{it.item}</span></div>
                              <p className="mt-1 text-sm text-muted-foreground">{it.consequencia}</p>
                              <div className="mt-2 space-y-0.5 text-sm">
                                <div className="flex justify-between gap-4"><span className="text-muted-foreground">{it.peca.desc}</span><span className="mono">{brl(it.peca.valor)}</span></div>
                                {it.maoDeObra.valor > 0 && <div className="flex justify-between gap-4"><span className="text-muted-foreground">{it.maoDeObra.desc}</span><span className="mono">{brl(it.maoDeObra.valor)}</span></div>}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className="mono font-semibold">{brl(it.total)}</span>
                              <Button variant={on ? "secondary" : "ghost"} size="xs"
                                onClick={() => setIncluidos((prev) => { const n = new Set(prev); if (n.has(i)) n.delete(i); else n.add(i); return n; })}>
                                {on && <Check className="size-3" />}{on ? "Incluído" : "Incluir"}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                    <div className="flex items-center justify-between rounded-xl bg-muted px-4 py-3">
                      <span className="text-sm font-medium">Total do orçamento</span>
                      <span className="mono text-lg font-semibold">{brl(total)}</span>
                    </div>
                  </div>
                ) : <EmptyHero heroPlaca={heroi.placa} />}
              </TabsContent>

              <TabsContent value="comunicacao" className="pt-5">
                <Card>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"><MessageCircle className="size-5" /></div>
                      <div>
                        <div className="font-medium">Conversa no WhatsApp</div>
                        <div className="text-sm text-muted-foreground">{agentes.recepcionista} (recepção) e {agentes.retencao} (pós-venda)</div>
                      </div>
                      <Link href="/nina" className={cn(buttonVariants(), "ml-auto")}>Ver conversa</Link>
                    </div>
                    <div className="mt-4 flex items-start gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                      <Mic className="mt-0.5 size-4 shrink-0" />
                      A aprovação do cliente é feita no <strong className="text-foreground">link</strong>, com assinatura, IP e horário registrados (trilha de auditoria).
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financeiro" className="pt-5">
                <div className="flex items-center gap-2 rounded-xl border border-dashed bg-card p-6 text-sm text-muted-foreground"><Lock className="size-4" /> Financeiro completo chega na Fase 2.</div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Placa({ v, icon, lg }: { v: string; icon?: boolean; lg?: boolean }) {
  return (
    <span className={`mono inline-flex items-center gap-1 rounded-md bg-neutral-900 font-semibold text-white ${lg ? "px-2 py-1 text-sm" : "px-1.5 py-0.5 text-xs"}`}>
      {icon && <Car className="size-3.5 opacity-70" />}{v}
    </span>
  );
}

function Bar({ pct, danger }: { pct: number; danger?: boolean }) {
  return (
    <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: danger ? "var(--danger)" : "var(--primary)" }} />
    </div>
  );
}

function Callout({ label, tone, children }: { label: string; tone: "warn" | "info"; children: React.ReactNode }) {
  const bg = tone === "warn" ? "var(--warn-tint)" : "var(--info-tint)";
  const accent = tone === "warn" ? "var(--warn)" : "var(--info)";
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <span className="size-1.5 rounded-full" style={{ background: accent }} />{label}
      </div>
      <div className="rounded-lg border p-3 text-sm leading-relaxed" style={{ background: bg, borderColor: `color-mix(in oklch, ${accent} 25%, transparent)` }}>{children}</div>
    </div>
  );
}

function DadoCard({ k, v, mono, avatar, tone }: { k: string; v: string; mono?: boolean; avatar?: string; tone?: import("@/components/pills").Tone }) {
  return (
    <Card size="sm">
      <CardContent>
        <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{k}</div>
        <div className="mt-0.5 flex items-center gap-2">
          {avatar && <Avatar className="size-6"><AvatarFallback className="bg-primary/10 text-[10px] font-semibold text-primary">{avatar}</AvatarFallback></Avatar>}
          {tone ? <Pill tone={tone}>{v}</Pill> : <span className={`text-sm font-medium ${mono ? "mono" : ""}`}>{v}</span>}
        </div>
      </CardContent>
    </Card>
  );
}

function Foto() {
  return <div className="flex size-14 items-center justify-center rounded-md bg-muted text-muted-foreground"><ImageIcon className="size-4" /></div>;
}

function EmptyHero({ heroPlaca }: { heroPlaca: string }) {
  return (
    <div className="rounded-xl border border-dashed bg-card p-6 text-sm text-muted-foreground">
      <FileText className="mb-2 size-5" />
      Este protótipo carrega o fluxo completo (checklist, orçamento, timeline) no carro-herói{" "}
      <span className="mono font-medium text-foreground">{heroPlaca}</span>. Selecione-o na lista para ver a demonstração ponta a ponta.
    </div>
  );
}
