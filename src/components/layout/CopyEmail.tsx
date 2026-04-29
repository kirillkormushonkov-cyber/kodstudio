"use client";

import * as React from "react";
import { Check, Copy, Mail } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

export type CopyEmailProps = {
  email: string;
  className?: string;
};

export function CopyEmail({ email, className }: CopyEmailProps) {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email скопирован");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Не удалось скопировать");
    }
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Скопировать email ${email}`}
      className={cn(
        "group/cp text-text-secondary hover:text-text-primary inline-flex items-center gap-2 text-sm transition-colors outline-none focus-visible:text-text-primary",
        className,
      )}
    >
      <Mail className="size-4 shrink-0" />
      <span>{email}</span>
      {copied ? (
        <Check className="text-brand-violet size-3.5 shrink-0" />
      ) : (
        <Copy className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover/cp:opacity-100 group-focus-visible/cp:opacity-100" />
      )}
    </button>
  );
}
