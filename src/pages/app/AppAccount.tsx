import { Link } from "react-router-dom";
import { LogOut, Mail, Phone, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import AppHeader from "@/components/app/AppHeader";

const AppAccount = () => {
  const { user, signOut } = useAuth();

  return (
    <div>
      <AppHeader title="ACCOUNT" subtitle={user ? user.email ?? undefined : "Sign in to use LuxPlay Rewards"} />

      <div className="px-5 space-y-3">
        {user ? (
          <>
            <Link
              to="/app/rewards"
              className="block border-2 border-neon-green/50 bg-[#0a0a16] p-4 font-display text-xs tracking-[0.2em] text-neon-green"
            >
              MY REWARDS CARD
            </Link>
            <button
              onClick={signOut}
              className="w-full flex items-center justify-center gap-2 border-2 border-white/20 bg-[#0a0a16] p-4 font-display text-xs tracking-[0.2em] text-white/70"
            >
              <LogOut className="w-4 h-4" /> SIGN OUT
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="block text-center border-2 border-neon-cyan bg-neon-cyan text-[#070710] p-4 font-display text-xs tracking-[0.2em]"
          >
            SIGN IN / JOIN FREE
          </Link>
        )}

        <div className="border-2 border-white/10 bg-[#0a0a16] p-4 space-y-3">
          <p className="font-display text-[11px] tracking-[0.25em] text-neon-cyan">GET IN TOUCH</p>
          <a href="mailto:info@luxplay.uk" className="flex items-center gap-2 font-body text-sm text-white/70">
            <Mail className="w-4 h-4" /> info@luxplay.uk
          </a>
          <a href="tel:+441202000000" className="flex items-center gap-2 font-body text-sm text-white/70">
            <Phone className="w-4 h-4" /> Call the venue
          </a>
        </div>

        <a
          href="/"
          className="flex items-center gap-2 border-2 border-white/10 bg-[#0a0a16] p-4 font-body text-sm text-white/60"
        >
          <Shield className="w-4 h-4" /> Visit the full LuxPlay website
        </a>
      </div>
    </div>
  );
};

export default AppAccount;
