import { Sparkles } from "lucide-react"

interface AdsenseProps {
  slot?: string
  format?: "auto" | "rectangle" | "horizontal" | "vertical"
  className?: string
}

export function Adsense({
  slot,
  format = "horizontal",
  className,
}: AdsenseProps) {
  // Determine height classes based on format
  const heightClass = {
    horizontal: "h-24 sm:h-28 w-full",
    rectangle: "h-64 w-80",
    vertical: "h-[600px] w-[160px]",
    auto: "h-32 w-full",
  }[format]

  return (
    <div
      className={`relative flex select-none items-center justify-center overflow-hidden rounded-lg border border-border border-dashed bg-muted/30 backdrop-blur-sm transition-all duration-200 hover:border-primary/20 ${heightClass} ${className || ""}`}
    >
      {/* Background design elements to look like a premium ad spot */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-40 dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
      <div className="absolute top-2 right-3 font-semibold text-[9px] text-muted-foreground uppercase tracking-widest">
        Sponsor / Advertisement
      </div>

      <div className="flex flex-col items-center gap-1 px-4 text-center">
        <div className="flex items-center gap-1.5 font-medium text-muted-foreground/80 text-xs">
          <Sparkles className="h-3.5 w-3.5 text-primary/70" />
          <span>Google AdSense Display Spot</span>
        </div>
        <p className="max-w-[280px] text-[10px] text-muted-foreground/50 sm:max-w-md">
          {slot
            ? `Slot ID: ${slot}`
            : "High-impact contextual ad matching world currencies database search queries"}
        </p>
      </div>
    </div>
  )
}
