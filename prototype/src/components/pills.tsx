import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Severidade } from "@/lib/dados";

export type Tone = "ok" | "atencao" | "critico" | "info" | "brand" | "neutral";

const toneVar: Record<Tone, string> = {
  ok: "var(--ok)",
  atencao: "var(--warn)",
  critico: "var(--danger)",
  info: "var(--info)",
  brand: "var(--brand)",
  neutral: "var(--muted-foreground)",
};

/** ponto colorido — carrega a cor (Calm Design: cor no dot, texto neutro) */
export function Dot({ tone, className }: { tone: Tone; className?: string }) {
  return (
    <span
      className={cn("inline-block size-2 shrink-0 rounded-full", className)}
      style={{ background: toneVar[tone] }}
    />
  );
}

/** Pill = shadcn Badge (variant secondary) + dot de cor semântica */
export function Pill({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Badge variant="secondary" className={cn("gap-1.5", className)}>
      <Dot tone={tone} />
      {children}
    </Badge>
  );
}

const sevInfo: Record<Severidade, { tone: Tone; label: string }> = {
  ok: { tone: "ok", label: "OK" },
  atencao: { tone: "atencao", label: "Atenção" },
  critico: { tone: "critico", label: "Crítico" },
};

export function SevPill({ sev }: { sev: Severidade }) {
  return <Pill tone={sevInfo[sev].tone}>{sevInfo[sev].label}</Pill>;
}

export const sevTone = (sev: Severidade): Tone => sevInfo[sev].tone;

/** mapeia a etapa do atendimento para um tom (disciplina de cor — Fix14 #3) */
export function etapaTone(etapa: string): Tone {
  const e = etapa.toLowerCase();
  if (e.includes("peças") || e.includes("pecas")) return "atencao";
  if (e.includes("aprova")) return "info";
  if (e.includes("execu")) return "brand";
  if (e.includes("pronto") || e.includes("entreg") || e.includes("qualidade")) return "ok";
  return "neutral";
}
