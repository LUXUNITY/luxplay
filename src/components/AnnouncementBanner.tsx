import { AlertTriangle } from "lucide-react";
import { useState } from "react";

const AnnouncementBanner = () => {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="relative z-30 w-full bg-[#070710] border-b-4 border-neon-pink shadow-[0_0_40px_rgba(255,0,204,0.35)]">
      <div className="px-4 md:px-8 py-5 md:py-7 max-w-5xl mx-auto">
        <div className="flex items-start gap-3 md:gap-5">
          <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-neon-pink shrink-0 mt-1 animate-pulse" />
          <div className="flex-1">
            <p className="font-display text-sm md:text-base tracking-[0.3em] text-neon-pink mb-2 md:mb-3">
              IMPORTANT OPENING UPDATE
            </p>
            <p className="font-body text-white text-sm md:text-lg leading-relaxed mb-2 md:mb-3">
              With a heavy heart we must announce a short delay. To ensure the best possible
              experience, the <strong className="text-neon-cyan">LuxPlay Arcade now opens Monday 25th May (Bank Holiday)</strong> and the
              <strong className="text-neon-pink"> Soft Play opens Saturday 30th May</strong>.
            </p>
            <p className="font-body text-white/90 text-sm md:text-base leading-relaxed mb-2 md:mb-3">
              As a thank-you for your patience, every affected customer will receive an
              <strong className="text-neon-green"> additional £10 Arcade Credit bonus</strong>.
              Existing bookings &amp; bonuses remain fully valid automatically.
            </p>
            <p className="font-body text-white/70 text-xs md:text-sm leading-relaxed">
              Prefer a refund or want to discuss your booking? Email{" "}
              <a href="mailto:luxplayuk@gmail.com" className="text-neon-cyan underline font-semibold">
                luxplayuk@gmail.com
              </a>{" "}
              and our team will assist you right away.
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Dismiss announcement"
            className="text-white/40 hover:text-white text-2xl leading-none px-2"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
