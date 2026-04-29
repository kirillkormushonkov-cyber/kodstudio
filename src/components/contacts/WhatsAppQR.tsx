"use client";

import { QRCodeSVG } from "qrcode.react";

export function WhatsAppQR({ url }: { url: string }) {
  return (
    <div className="border-border bg-white rounded-lg border p-2">
      <QRCodeSVG
        value={url}
        size={88}
        level="M"
        bgColor="#ffffff"
        fgColor="#0A0A14"
      />
    </div>
  );
}
