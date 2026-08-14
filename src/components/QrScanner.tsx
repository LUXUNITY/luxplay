import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { X } from "lucide-react";

interface QrScannerProps {
  onScan: (value: string) => void;
  onClose: () => void;
}

const ELEMENT_ID = "luxplay-qr-reader";

/** Pull the booking code out of whatever the QR encodes (plain code or a URL). */
export const extractCode = (raw: string) => {
  const text = raw.trim();
  try {
    const url = new URL(text);
    const q = url.searchParams.get("code") || url.searchParams.get("c");
    if (q) return q.trim();
    const last = url.pathname.split("/").filter(Boolean).pop();
    if (last) return decodeURIComponent(last);
  } catch {
    /* not a URL — fall through */
  }
  return text;
};

/**
 * Full-screen camera scanner for staff check-in.
 * Works on iPad/iPhone Safari: permission is requested first, then the rear
 * camera is picked explicitly from the device list (facingMode alone is
 * unreliable on iOS).
 */
const QrScanner = ({ onScan, onClose }: QrScannerProps) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const handledRef = useRef(false);
  const [status, setStatus] = useState("Starting camera…");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const boot = async () => {
      if (!window.isSecureContext) {
        setError("Camera needs a secure (https) page. Open luxplay.uk/admin, not the preview.");
        return;
      }
      if (!navigator.mediaDevices?.getUserMedia) {
        setError("This browser can't open the camera. Use Safari or Chrome.");
        return;
      }

      // 1. Ask for permission first so iOS reveals camera labels/ids.
      try {
        const probe = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
        });
        probe.getTracks().forEach((t) => t.stop());
      } catch {
        setError("Camera access blocked. Allow camera for this site in your browser settings, then try again.");
        return;
      }
      if (cancelled) return;

      // 2. Choose the rear camera when we can identify one.
      let cameraConfig: string | { facingMode: string } = { facingMode: "environment" };
      try {
        const cameras = await Html5Qrcode.getCameras();
        const back =
          cameras.find((c) => /back|rear|environment/i.test(c.label)) ??
          cameras[cameras.length - 1];
        if (back?.id) cameraConfig = back.id;
      } catch {
        /* keep facingMode fallback */
      }
      if (cancelled) return;

      const scanner = new Html5Qrcode(ELEMENT_ID, { verbose: false });
      scannerRef.current = scanner;

      const start = (cfg: string | { facingMode: string }) =>
        scanner.start(
          cfg as any,
          { fps: 12, qrbox: { width: 240, height: 240 }, aspectRatio: 1 },
          (decodedText) => {
            if (handledRef.current) return;
            handledRef.current = true;
            onScan(extractCode(decodedText));
          },
          () => {
            /* per-frame decode misses are normal — ignore */
          },
        );

      try {
        await start(cameraConfig);
        if (!cancelled) setStatus("Point at the QR code");
      } catch {
        try {
          await start({ facingMode: "environment" });
          if (!cancelled) setStatus("Point at the QR code");
        } catch {
          if (!cancelled)
            setError("Couldn't start the camera. Close any other app using it, or type the code instead.");
        }
      }
    };

    void boot();

    return () => {
      cancelled = true;
      const s = scannerRef.current;
      if (s) {
        s.stop()
          .then(() => s.clear())
          .catch(() => {});
      }
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 z-50 bg-[#070710]/95 flex flex-col items-center justify-center px-4">
      <button
        onClick={onClose}
        aria-label="Close scanner"
        className="absolute top-5 right-5 text-white/60 hover:text-white"
      >
        <X className="w-7 h-7" />
      </button>

      <p className="font-display text-sm tracking-[0.3em] text-neon-green mb-4">
        SCAN BOOKING QR
      </p>

      <div
        id={ELEMENT_ID}
        className="w-full max-w-sm overflow-hidden border border-neon-green/40 bg-black"
      />

      {error ? (
        <p className="font-body text-red-300 text-sm text-center mt-4 max-w-xs">{error}</p>
      ) : (
        <p className="font-body text-white/50 text-xs text-center mt-4">{status}</p>
      )}

      <p className="font-body text-white/40 text-xs text-center mt-4 max-w-xs">
        Hold the customer's QR code in the frame. No QR? Close this and type their code,
        receipt number, email or name.
      </p>
    </div>
  );
};

export default QrScanner;
