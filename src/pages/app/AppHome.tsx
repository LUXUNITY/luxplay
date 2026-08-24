import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Coins, Gift, PartyPopper, Clock, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import logoAsset from "@/assets/logo-luxplay.png";

const STAMPS_PER_REWARD = 6;

const actions = [
  { to: "/app/book", label: "BOOK SOFT PLAY", Icon: CalendarDays, color: "text-neon-cyan border-neon-cyan/50" },
  { to: "/app/book#credits", label: "BUY CREDITS", Icon: Coins, color: "text-neon-pink border-neon-pink/50" },
  { to: "/app/rewards", label: "MY REWARDS", Icon: Gift, color: "text-neon-green border-neon-green/50" },
  { to: "/app/book#parties", label: "PARTIES", Icon: PartyPopper, color: "text-neon-purple border-neon-purple/50" },
];

const AppHome = () => {
  const { user } = useAuth();
  const [stamps, setStamps] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      setStamps(null);
      return;
    }
    supabase
      .from("loyalty_stamps")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .is("consumed_by", null)
      .then(({ count }) => setStamps(count ?? 0));
  }, [user]);

  const progress = stamps === null ? 0 : Math.min(stamps % STAMPS_PER_REWARD || (stamps >= STAMPS_PER_REWARD ? STAMPS_PER_REWARD : 0), STAMPS_PER_REWARD);

  return (
    <div>
      <div className="px-5 pt-8 pb-6 flex items-center gap-4">
        <img src={logoAsset} alt="LuxPlay" className="w-16 h-16 object-contain rounded-full" />
        <div>
          <p className="font-display text-3xl tracking-wider text-gradient-neon leading-none">LUXPLAY</p>
          <p className="font-body text-xs text-white/60 mt-1">Play more. Earn more. Level up.</p>
        </div>
      </div>

      {/* Rewards first */}
      <section className="px-5">
        <Link
          to={user ? "/app/rewards" : "/auth"}
          className="block border-2 border-neon-green/50 bg-[#0a0a16] p-5"
        >
          <p className="font-display text-xs tracking-[0.25em] text-neon-green mb-2">LUXPLAY REWARDS</p>
          {user ? (
            <>
              <p className="font-body text-white text-sm mb-3">
                {progress} of {STAMPS_PER_REWARD} stamps — 7th soft play session free per child.
              </p>
              <div className="flex gap-1.5">
                {Array.from({ length: STAMPS_PER_REWARD }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 ${i < progress ? "bg-neon-green" : "bg-white/10"}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="font-body text-white text-sm">
              Join free — collect 6 stamps and your child's 7th soft play session is on us.
            </p>
          )}
        </Link>
      </section>

      {/* Quick actions */}
      <section className="px-5 pt-5 grid grid-cols-2 gap-3">
        {actions.map(({ to, label, Icon, color }) => (
          <Link
            key={label}
            to={to}
            className={`flex flex-col items-center justify-center gap-2 border-2 bg-[#0a0a16] py-6 font-display text-[11px] tracking-[0.15em] text-center ${color}`}
          >
            <Icon className="w-7 h-7" />
            {label}
          </Link>
        ))}
      </section>

      {/* Venue info */}
      <section className="px-5 pt-6 pb-4 grid grid-cols-1 gap-3">
        <div className="border-2 border-white/10 bg-[#0a0a16] p-4">
          <p className="flex items-center gap-2 font-display text-[11px] tracking-[0.25em] text-neon-cyan mb-2">
            <Clock className="w-4 h-4" /> OPENING HOURS
          </p>
          <p className="font-body text-sm text-white/70">
            Sun – Thu 10:00 – 20:00<br />Fri &amp; Sat 10:00 – 21:00
          </p>
        </div>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Sovereign+Centre,+Boscombe,+Bournemouth,+BH1+4SX"
          target="_blank"
          rel="noopener noreferrer"
          className="border-2 border-white/10 bg-[#0a0a16] p-4 block"
        >
          <p className="flex items-center gap-2 font-display text-[11px] tracking-[0.25em] text-neon-pink mb-2">
            <MapPin className="w-4 h-4" /> FIND US
          </p>
          <p className="font-body text-sm text-white/70">
            Unit 7, Sovereign Centre, Boscombe, Bournemouth BH1 4SX
          </p>
        </a>
      </section>
    </div>
  );
};

export default AppHome;
