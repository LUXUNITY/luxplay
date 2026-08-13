import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { X } from "lucide-react";

interface QrScannerProps {
  onScan: (value: string) => void;
  onClose: () => void;
}

const ELEMENT_ID = "luxplay-qr-reader";

/**
 * Full-screen camera scanner for staff check-in.
 * Reads the QR code on a customer's confirmation email / success page.
 */
const QrScanner = ({ onScan, onClose }: QrScannerProps) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const handledRef = useRef(false);
  const errorRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const scanner = new Html5Qrcode(ELEMENT_ID, { verbose: false });
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        (decodedText) => {
          if (handledRef.current) return;
          handledRef.current = true;
          onScan(decodedText.trim());
        },
        () => {
          /* per-frame decode misses are normal — ignore */
        },
      )
      .catch(() => {
        if (errorRef.current) {
          errorRef.current.textContent =
            "Couldn't open the camera. Allow camera access, or type the code instead.";
        }
      });

    return () => {
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

      <p ref={errorRef} className="font-body text-red-300 text-sm text-center mt-4" />

      <p className="font-body text-white/40 text-xs text-center mt-4 max-w-xs">
        Hold the customer's QR code in the frame. No QR? Close this and type their code,
        receipt number, email or name.
      </p>
    </div>
  );
};

export default QrScanner;
