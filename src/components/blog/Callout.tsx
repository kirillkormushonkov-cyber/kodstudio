import * as React from "react";
import { AlertTriangle, CheckCircle2, Info, Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "success" | "tip";

const TONE: Record<
  CalloutType,
  { icon: React.ComponentType<{ className?: string }>; ring: string; text: string; bg: string }
> = {
  info: {
    icon: Info,
    ring: "ring-brand-violet/30",
    text: "text-brand-violet",
    bg: "bg-brand-violet/8",
  },
  warning: {
    icon: AlertTriangle,
    ring: "ring-amber-500/30",
    text: "text-amber-400",
    bg: "bg-amber-500/8",
  },
  success: {
    icon: CheckCircle2,
    ring: "ring-emerald-500/30",
    text: "text-emerald-400",
    bg: "bg-emerald-500/8",
  },
  tip: {
    icon: Lightbulb,
    ring: "ring-brand-magenta/30",
    text: "text-brand-magenta",
    bg: "bg-brand-magenta/8",
  },
};

export function Callout({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  const tone = TONE[type];
  const Icon = tone.icon;

  return (
    <aside
      className={cn(
        "my-6 flex gap-3 rounded-xl px-5 py-4 ring-1 backdrop-blur",
        tone.bg,
        tone.ring,
      )}
    >
      <Icon className={cn("mt-0.5 size-5 shrink-0", tone.text)} aria-hidden="true" />
      <div className="text-text-primary text-sm leading-relaxed [&>p]:m-0 [&>p+p]:mt-3">
        {children}
      </div>
    </aside>
  );
}
