import { QRCodeSVG } from "qrcode.react";

interface BookingQrProps {
  value: string;
  label?: string;
  accent?: string;
  size?: number;
}

/**
 * Scannable QR code for a booking / redemption code.
 * The plain text code is always shown underneath as an emergency fallback
 * (broken scanner, dead camera, etc).
 */
const BookingQr = ({ value, label, accent = "#aaff00", size = 168 }: BookingQrProps) => (
  <div className="flex flex-col items-center gap-3">
    {label && (
      <p className="font-display text-[10px] tracking-[0.3em] text-white/40">{label}</p>
    )}
    <div className="bg-white p-3">
      <QRCodeSVG value={value} size={size} level="M" bgColor="#ffffff" fgColor="#070710" />
    </div>
    <p
      className="font-display text-lg tracking-[0.25em]"
      style={{ color: accent }}
    >
      {value}
    </p>
  </div>
);

export default BookingQr;
