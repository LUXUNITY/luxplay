import { AlertTriangle } from "lucide-react";
import { useState } from "react";

const AnnouncementBanner = () => {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="relative z-30 w-full bg-neon-pink/15 border-b-4 border-neon-pink">
      <div className="px-4 py-4 max-w-md mx-auto">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-display text-xs font-extrabold tracking-wide text-foreground mb-1">
              SOFT PLAY UPDATE
            </p>
            <p className="font-body text-foreground/80 text-sm leading-snug">
              Arcade is open now. Soft Play is delayed — bookings refunded plus{" "}
              <strong>£5 free arcade credit</strong>. Email{" "}
              <a href="mailto:luxplayuk@gmail.com" className="underline font-semibold">
                luxplayuk@gmail.com
              </a>{" "}
              for anything urgent.
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Dismiss announcement"
            className="text-foreground/40 hover:text-foreground text-2xl leading-none px-1"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
