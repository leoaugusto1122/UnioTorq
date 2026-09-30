import { cn } from "@/lib/utils";

/**
 * Placa no estilo Mercosul (faixa azul "BR" + número em fonte mono).
 * Funciona em fundo claro e escuro (o corpo é branco).
 */
export function Placa({
  value,
  size = "sm",
  className,
}: {
  value: string;
  size?: "sm" | "lg";
  className?: string;
}) {
  const lg = size === "lg";
  return (
    <span
      title={`Placa ${value}`}
      className={cn(
        "inline-flex select-none items-stretch overflow-hidden rounded-[5px] border border-neutral-800 bg-white leading-none shadow-sm",
        className
      )}
    >
      <span
        className={cn(
          "flex flex-col items-center justify-center bg-[#1b3a9b] font-bold tracking-tighter text-white",
          lg ? "px-1.5 text-[8px]" : "px-1 text-[7px]"
        )}
      >
        BR
      </span>
      <span
        className={cn(
          "mono flex items-center font-bold tracking-widest text-neutral-900",
          lg ? "px-2 py-1 text-sm" : "px-1.5 py-0.5 text-xs"
        )}
      >
        {value}
      </span>
    </span>
  );
}
