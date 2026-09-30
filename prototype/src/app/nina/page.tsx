"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  RotateCcw,
  Pause,
  Play,
  CheckCheck,
  FileText,
  Phone,
  Video,
  MoreVertical,
  ChevronLeft,
} from "lucide-react";
import { DeviceFrame } from "@/components/device-frame";
import { useDados } from "@/hooks/use-dados";
import { primeiroNome } from "@/lib/dados";

type Step =
  | { kind: "sep"; label: string }
  | { kind: "msg" | "link"; side: "in" | "out"; text: string; time: string; note?: string };

const WA_HEADER = "#075e54";

export default function NinaPage() {
  const dados = useDados();

  const steps = useMemo<Step[]>(() => {
    if (!dados) return [];
    const { oficina, agentes, heroi } = dados;
    const pn = primeiroNome(heroi.cliente);
    return [
      { kind: "sep", label: "hoje — sexta-feira" },
      { kind: "msg", side: "out", time: "21:47", text: `Boa noite! Vocês atendem amanhã? Tô ouvindo ${heroi.queixa} no meu carro.` },
      { kind: "msg", side: "in", time: "21:47", text: `Boa noite! Aqui é a ${agentes.recepcionista}, da ${oficina.nome}. Sim, atendemos amanhã. Podemos verificar esse ruído sem problema — posso já reservar um horário para você?` },
      { kind: "msg", side: "out", time: "21:48", text: "Pode ser de manhã?" },
      { kind: "msg", side: "in", time: "21:48", text: `Tenho ${heroi.horario} ou 10:00 disponíveis. Qual fica melhor para você?` },
      { kind: "msg", side: "out", time: "21:49", text: `${heroi.horario} tá ótimo` },
      { kind: "msg", side: "in", time: "21:49", text: "Ótimo. Pode me confirmar seu nome e a placa do veículo, por favor?" },
      { kind: "msg", side: "out", time: "21:49", text: `${heroi.cliente}, placa ${heroi.placa}` },
      {
        kind: "msg", side: "in", time: "21:50",
        text: `Perfeito, ${pn}! Seu horário está confirmado para amanhã às ${heroi.horario} — ${heroi.veiculo}, placa ${heroi.placa}. Enviarei um lembrete pela manhã. Tenha uma boa noite!`,
        note: `Sexta-feira, 21:50 — a oficina estava fechada há horas. Sem a ${agentes.recepcionista}, essa mensagem só seria lida na segunda, e o cliente provavelmente já teria fechado com o concorrente. Aqui, o carro já entrou na agenda.`,
      },
      { kind: "sep", label: "no dia seguinte" },
      { kind: "msg", side: "in", time: "07:30", text: `Bom dia, ${pn}! Passando para lembrar do seu horário hoje às ${heroi.horario}, aqui na ${oficina.nome}. Estamos à sua espera.` },
      { kind: "msg", side: "in", time: "11:05", text: `${pn}, concluímos a inspeção do ${heroi.veiculo}. Identificamos um item que precisa de atenção. Preparei o orçamento com as fotos para você visualizar e aprovar o que desejar:` },
      { kind: "link", side: "in", time: "11:05", text: `Orçamento — ${oficina.nome}` },
      { kind: "msg", side: "out", time: "11:31", text: "Acabei de aprovar no link — pastilha e disco. O resto fica pra próxima." },
      {
        kind: "msg", side: "in", time: "11:31",
        text: `Recebi sua autorização pelo link, ${pn} — ficou registrada com sua assinatura e horário. Aprovado: pastilha + disco dianteiro. Já passo para o mecânico iniciar e aviso quando estiver pronto.`,
        note: "A aprovação foi feita no link, com assinatura e horário registrados (trilha de auditoria) — não por mensagem. Em 26 minutos, pelo celular, olhando a foto da peça: sem uma ligação, sem vir à oficina. O que normalmente trava por dias foi fechado antes do almoço.",
      },
      { kind: "msg", side: "in", time: "16:40", text: `${pn}, seu ${heroi.veiculo} já está pronto! A retirada pode ser feita a partir das 17h. O problema no freio foi resolvido.` },
      { kind: "msg", side: "out", time: "16:52", text: "Show, obrigado! Passo aí depois das 5" },
      { kind: "msg", side: "in", time: "16:52", text: "Combinado! Qualquer coisa, estou à disposição." },
      { kind: "sep", label: "6 meses depois" },
      {
        kind: "msg", side: "in", time: "09:12",
        text: `Olá, ${pn}! Aqui é a ${agentes.retencao}, do pós-venda da ${oficina.nome}. Já se passaram 6 meses desde a última revisão do seu ${heroi.veiculo}. Deseja que eu reserve um horário para uma verificação?`,
      },
      { kind: "msg", side: "out", time: "09:20", text: "Opa, boa lembrança. Pode marcar sábado de manhã?" },
      {
        kind: "msg", side: "in", time: "09:20",
        text: "Reservado para sábado às 09:00. Enviarei um lembrete na sexta-feira. Até lá!",
        note: `6 meses depois, foi a ${agentes.retencao} (pós-venda) que reativou o cliente sozinha — outro funcionário digital da mesma oficina. É a receita que hoje escorre pelo ralo todo mês, silenciosamente.`,
      },
    ];
  }, [dados]);

  const [revealed, setRevealed] = useState(0);
  const [typing, setTyping] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [showNotes, setShowNotes] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

  // motor de auto-play
  useEffect(() => {
    if (!playing || steps.length === 0 || revealed >= steps.length) {
      setTyping(false);
      return;
    }
    const next = steps[revealed];
    const isIncoming = next.kind !== "sep" && next.side === "in";
    if (isIncoming) {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setRevealed((r) => r + 1);
      }, 1300);
      return () => clearTimeout(t);
    }
    const delay = next.kind === "sep" ? 650 : 950;
    const t = setTimeout(() => setRevealed((r) => r + 1), delay);
    return () => clearTimeout(t);
  }, [playing, revealed, steps]);

  // auto-scroll
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [revealed, typing]);

  const restart = () => {
    setRevealed(0);
    setTyping(false);
    setPlaying(true);
  };

  const activeNote = useMemo(() => {
    for (let i = Math.min(revealed, steps.length) - 1; i >= 0; i--) {
      const s = steps[i];
      if (s.kind !== "sep" && s.note) return s.note;
    }
    return null;
  }, [revealed, steps]);

  if (!dados) return null;
  const { oficina, agentes } = dados;
  const done = revealed >= steps.length;

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-3xl px-6 py-8">
        {/* topo */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Todas as telas
        </Link>

        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">O que o seu cliente vê no WhatsApp</h1>
          <p className="mt-1 text-muted-foreground">
            A <strong>{agentes.recepcionista}</strong> e a <strong>{agentes.retencao}</strong> — funcionárias digitais da{" "}
            {oficina.nome} — atendendo sozinhas, do primeiro contato à reativação.
          </p>
        </div>

        {/* controles */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setPlaying((p) => !p)}
            disabled={done}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            {playing ? "Pausar" : "Continuar"}
          </button>
          <button
            onClick={restart}
            className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted"
          >
            <RotateCcw className="size-4" /> Repetir
          </button>
          <label className="ml-auto inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={showNotes}
              onChange={(e) => setShowNotes(e.target.checked)}
              className="size-4 accent-[var(--primary)]"
            />
            Notas de demo
          </label>
        </div>

        {/* celular */}
        <DeviceFrame statusColor={WA_HEADER}>
          <div className="flex h-full flex-col bg-wa-bg">
            {/* header WhatsApp */}
            <div className="flex items-center gap-2 px-2 py-2 text-white" style={{ background: WA_HEADER }}>
              <ChevronLeft className="size-5 shrink-0" />
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/25 text-sm font-semibold">
                {oficina.nome.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold leading-tight">{oficina.nome}</div>
                <div className="text-xs leading-tight text-white/80">
                  {typing ? "digitando…" : "online"}
                </div>
              </div>
              <Video className="size-5 shrink-0" />
              <Phone className="size-5 shrink-0" />
              <MoreVertical className="size-5 shrink-0" />
            </div>

            {/* chat */}
            <div
              ref={chatRef}
              className="flex-1 space-y-1.5 overflow-y-auto px-3 py-3"
              style={{
                backgroundColor: "#efeae2",
                backgroundImage:
                  "radial-gradient(circle at 20% 10%, rgba(0,0,0,0.02) 0, transparent 40%), radial-gradient(circle at 80% 60%, rgba(0,0,0,0.02) 0, transparent 40%)",
              }}
            >
              {/* aviso de criptografia */}
              <div className="mx-auto mb-1 max-w-[85%] rounded-md bg-[#fdf4c9] px-3 py-1.5 text-center text-[11px] leading-snug text-[#5b5744] shadow-sm">
                As mensagens são protegidas com a criptografia de ponta a ponta.
              </div>

              {steps.slice(0, revealed).map((s, i) => {
                if (s.kind === "sep") {
                  return (
                    <div key={i} className="my-2 flex justify-center">
                      <span className="rounded-md bg-white/85 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#54656f] shadow-sm">
                        {s.label}
                      </span>
                    </div>
                  );
                }
                const out = s.side === "out";
                return (
                  <div key={i} className={`flex ${out ? "justify-end" : "justify-start"}`}>
                    <div
                      className={[
                        "relative max-w-[80%] rounded-lg px-2.5 py-1.5 text-[14px] leading-snug shadow-sm",
                        out ? "rounded-tr-none bg-[#d9fdd3]" : "rounded-tl-none bg-white",
                      ].join(" ")}
                    >
                      {s.kind === "link" ? (
                        <a className="block cursor-default">
                          <div className="mb-1 flex items-center gap-2 rounded-md bg-black/5 p-2">
                            <div className="flex size-9 items-center justify-center rounded bg-primary/15 text-primary">
                              <FileText className="size-5" />
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-[13px] font-medium text-foreground">{s.text}</div>
                              <div className="truncate text-[11px] text-muted-foreground">
                                toque para ver as fotos e aprovar
                              </div>
                            </div>
                          </div>
                          <div className="text-[12px] text-[#027eb5] underline">unio.app/os/{dados.heroi.placa}</div>
                        </a>
                      ) : (
                        <span className="whitespace-pre-wrap text-[#111b21]">{s.text}</span>
                      )}
                      <span className="ml-2 inline-flex translate-y-0.5 items-center gap-0.5 text-[10px] text-[#667781] float-right">
                        {s.time}
                        {out && <CheckCheck className="size-3.5" style={{ color: "#53bdeb" }} />}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* indicador digitando */}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
                    <span className="wa-dot size-1.5 rounded-full bg-[#9aa0a6]" style={{ animationDelay: "0s" }} />
                    <span className="wa-dot size-1.5 rounded-full bg-[#9aa0a6]" style={{ animationDelay: "0.15s" }} />
                    <span className="wa-dot size-1.5 rounded-full bg-[#9aa0a6]" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              )}
            </div>

            {/* barra de input (fake) */}
            <div className="flex items-center gap-2 bg-[#f0f2f5] px-3 py-2">
              <div className="flex-1 rounded-full bg-white px-4 py-2 text-sm text-muted-foreground">
                Mensagem
              </div>
              <div className="flex size-9 items-center justify-center rounded-full text-white" style={{ background: "#00a884" }}>
                <Phone className="size-4" />
              </div>
            </div>
          </div>
        </DeviceFrame>

        {/* nota de demo (money line) */}
        {showNotes && activeNote && (
          <div className="mx-auto mt-5 max-w-md rounded-xl border border-primary/20 bg-accent/60 px-4 py-3 text-sm text-accent-foreground">
            <span className="font-semibold">Nota de demo: </span>
            {activeNote}
          </div>
        )}
      </div>
    </div>
  );
}
