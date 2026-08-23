import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/loyalty", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || password.length < 6) {
      toast({
        title: "Check your details",
        description: "Enter your email and a password of at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/loyalty`,
            data: { full_name: name.trim() },
          },
        });
        if (error) throw error;
        toast({
          title: "Account created",
          description: "Check your email to confirm, then sign in to start collecting stamps.",
        });
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        navigate("/loyalty", { replace: true });
      }
    } catch (err: any) {
      toast({
        title: mode === "signup" ? "Sign up failed" : "Sign in failed",
        description: err.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070710] px-6 py-16">
      <div className="max-w-md mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-display text-[11px] tracking-[0.25em] text-white/40 hover:text-neon-cyan mb-10"
        >
          <ArrowLeft className="w-3 h-3" /> BACK TO LUXPLAY
        </Link>

        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 border-2 border-neon-green bg-neon-green/10 text-neon-green font-display text-[11px] tracking-[0.3em] uppercase px-4 py-2 mb-5">
            <Sparkles className="w-3 h-3" /> LUXPLAY REWARDS
          </span>
          <h1 className="font-display text-5xl md:text-6xl tracking-wider text-gradient-neon">
            {mode === "signup" ? "JOIN FREE" : "WELCOME BACK"}
          </h1>
          <p className="font-body text-white/50 text-sm mt-3">
            Collect a stamp for every child's soft play session — the 7th is on us.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="border border-neon-green/30 bg-[#0a0a16] p-6 space-y-4">
          {mode === "signup" && (
            <div>
              <label className="font-display text-[10px] tracking-[0.2em] text-white/40 mb-1 block">
                YOUR NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Johnson"
                className="w-full bg-[#070710] border border-white/10 text-white font-body text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-neon-green/50"
              />
            </div>
          )}

          <div>
            <label className="font-display text-[10px] tracking-[0.2em] text-white/40 mb-1 block">
              EMAIL *
            </label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full bg-[#070710] border border-white/10 text-white font-body text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-neon-green/50"
            />
          </div>

          <div>
            <label className="font-display text-[10px] tracking-[0.2em] text-white/40 mb-1 block">
              PASSWORD *
            </label>
            <input
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full bg-[#070710] border border-white/10 text-white font-body text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-neon-green/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-display text-sm tracking-widest py-4 bg-neon-green text-[#070710] hover:shadow-[0_0_40px_rgba(170,255,0,0.4)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === "signup" ? "CREATE ACCOUNT" : "SIGN IN"}
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            className="w-full font-body text-xs text-white/40 hover:text-neon-cyan pt-1"
          >
            {mode === "signup"
              ? "Already have an account? Sign in"
              : "New to LUXPLAY? Create a free account"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Auth;
