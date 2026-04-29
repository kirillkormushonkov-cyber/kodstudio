"use client";

import * as React from "react";
import { Check, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

import { TelegramIcon } from "@/components/layout/social-icons";
import { cn } from "@/lib/utils";

const buttonClass =
  "inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/60 px-4 py-2 text-xs font-medium text-text-secondary backdrop-blur transition-all hover:border-brand-violet/40 hover:bg-bg-overlay hover:text-text-primary";

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.16 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const fullUrl = React.useMemo(() => {
    if (typeof window === "undefined") return url;
    return new URL(url, window.location.origin).href;
  }, [url]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success("Ссылка скопирована");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Не удалось скопировать");
    }
  };

  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`;
  const twUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-text-muted text-xs font-semibold tracking-[0.2em] uppercase">
        Поделиться
      </span>
      <button type="button" onClick={onCopy} className={buttonClass}>
        {copied ? (
          <Check className="text-brand-violet size-3.5" />
        ) : (
          <LinkIcon className="size-3.5" />
        )}
        <span>{copied ? "Скопировано" : "Копировать ссылку"}</span>
      </button>
      <a
        href={tgUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonClass)}
      >
        <TelegramIcon className="size-3.5" />
        Telegram
      </a>
      <a
        href={twUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonClass)}
      >
        <TwitterIcon className="size-3.5" />
        Twitter
      </a>
    </div>
  );
}
