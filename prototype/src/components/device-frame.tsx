import { cn } from "@/lib/utils";

/**
 * Moldura de smartphone para as telas de celular (Nina, Portal, Checklist).
 * Reforça "isto é o que chega no telefone" durante a demo.
 */
export function DeviceFrame({
  children,
  className,
  statusColor = "#075e54",
  statusText = "#ffffff",
}: {
  children: React.ReactNode;
  className?: string;
  /** cor de fundo da status bar (combina com o header da tela) */
  statusColor?: string;
  /** cor do texto/ícones da status bar */
  statusText?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-[380px] max-w-full overflow-hidden rounded-[2.5rem] border-[10px] border-neutral-900 bg-black shadow-2xl",
        className
      )}
    >
      {/* status bar */}
      <div
        className="flex h-9 items-center justify-between px-6 text-xs font-medium"
        style={{ background: statusColor, color: statusText }}
      >
        <span className="mono">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
            <rect x="0" y="7" width="3" height="4" rx="1" />
            <rect x="4.5" y="5" width="3" height="6" rx="1" />
            <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
            <rect x="13.5" y="0" width="3" height="11" rx="1" />
          </svg>
          <svg width="16" height="11" viewBox="0 0 16 12" fill="currentColor" aria-hidden>
            <path d="M8 2.5c2.5 0 4.8 1 6.4 2.6l-1.4 1.4A7 7 0 0 0 8 4.5 7 7 0 0 0 3 6.5L1.6 5.1A9 9 0 0 1 8 2.5Z" />
            <path d="M8 6c1.4 0 2.6.5 3.5 1.4L8 11 4.5 7.4A5 5 0 0 1 8 6Z" />
          </svg>
          <div className="flex items-center gap-0.5">
            <div className="relative h-3 w-6 rounded-[3px] border p-0.5" style={{ borderColor: "currentColor" }}>
              <div className="h-full w-4/5 rounded-[1px]" style={{ background: "currentColor" }} />
            </div>
            <div className="h-1.5 w-0.5 rounded-r" style={{ background: "currentColor" }} />
          </div>
        </div>
      </div>

      {/* conteúdo da tela */}
      <div className="relative h-[720px] max-h-[78vh] overflow-hidden bg-white">{children}</div>
    </div>
  );
}
