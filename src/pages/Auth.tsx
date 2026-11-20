import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Loader2, MailCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

type Mode = "signup" | "signin" | "forgot" | "check-email" | "reset-sent";

const friendlyError = (msg: string) => {
  const m = msg.toLowerCase();
  if (m.includes("invalid login")) return "That email or password doesn't match. Try again, or tap “Forgot password?”.";
  if (m.includes("email not confirmed")) return "Please confirm your email first — check your inbox (and junk folder) for our email.";
  if (m.includes("already registered")) return "You already have an account with this email — please sign in instead.";
  if (m.includes("pwned") || m.includes("weak")) return "That password is too easy to guess. Please choose a different one.";
  return msg || "Something went wrong — please try again.";
};

const Auth = () => {
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const next = (() => { const n = new URLSearchParams(window.location.search).get("next") || ""; return n.startsWith("/") && !n.startsWith("//") ? n : "/loyalty"; })();
  const forMembership = next.includes("member");
  const { user } = useAuth();

  useEffect(() => { if (user) navigate(next, { replace: true }); }, [user, navigate, next]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return toast({ title: "Please enter your email", variant: "destructive" });
    if (mode !== "forgot" && password.length < 6) return toast({ title: "Password needs at least 6 characters", variant: "destructive" });
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim(), password,
          options: { emailRedirectTo: `${window.location.origin}${next}`, data: { full_name: name.trim() } },
        });
        if (error) throw error;
        setMode("check-email");
      } else if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        navigate(next, { replace: true });
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setMode("reset-sent");
      }
    } catch (err: any) {
      toast({ title: "Oops!", description: friendlyError(err.message), variant: "destructive" });
    } finally { setLoading(false); }
  };

  const resend = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resend({ type: "signup", email: email.trim(), options: { emailRedirectTo: `${window.location.origin}${next}` } });
    setLoading(false);
    toast(error ? { title: "Couldn't resend", description: friendlyError(error.message), variant: "destructive" } : { title: "Sent again! 📬", description: "Check your inbox and junk folder." });
  };

  const field = "w-full rounded-2xl bg-background border-2 border-border text-foreground text-base px-4 py-3.5 placeholder:text-muted-foreground focus:outline-none focus:border-neon-cyan";
  const label = "text-sm font-bold text-foreground mb-1.5 block";

  if (mode === "check-email" || mode === "reset-sent") {
    return (
      <main className="min-h-screen bg-background px-5 py-14 flex items-start justify-center">
        <div className="max-w-md w-full text-center rounded-3xl border-2 border-neon-green bg-card p-8">
          <MailCheck className="w-16 h-16 mx-auto text-neon-green mb-4" />
          <h1 className="text-3xl font-black text-foreground mb-3">Check your email! 📬</h1>
          <p className="text-muted-foreground mb-2">We've sent an email to</p>
          <p className="font-bold text-neon-cyan break-all mb-5">{email}</p>
          <ol className="text-left space-y-3 mb-6 text-foreground">
            <li>1️⃣ Open the email from <b>LUXPLAY</b></li>
            <li>2️⃣ Tap the pink <b>{mode === "check-email" ? "Confirm my email" : "Reset password"}</b> button</li>
            <li>3️⃣ {mode === "check-email" ? "You'll come straight back here, signed in 🎉" : "Choose your new password"}</li>
          </ol>
          <p className="text-sm text-muted-foreground mb-5">Can't see it? Check your <b>junk / spam</b> folder. It can take a minute.</p>
          {mode === "check-email" && (
            <button onClick={resend} disabled={loading} className="w-full rounded-full py-3 border-2 border-neon-cyan text-neon-cyan font-bold mb-3 disabled:opacity-50">
              {loading ? "Sending…" : "Send the email again"}
            </button>
          )}
          <button onClick={() => setMode("signin")} className="text-sm text-muted-foreground underline">Back to sign in</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="max-w-md mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-cyan mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to LUXPLAY
        </Link>

        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-foreground leading-tight">
            {mode === "signup" ? "Create your free account" : mode === "signin" ? "Welcome back! 👋" : "Forgot your password?"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {mode === "forgot" ? "No worries — enter your email and we'll send you a link to set a new one."
              : forMembership ? "You need an account to get your child's membership pass. It only takes a minute!"
              : "Collect a stamp for every child's soft play session — the 7th is free!"}
          </p>
        </div>

        {mode !== "forgot" && (
          <div className="grid grid-cols-2 gap-2 rounded-full bg-card border-2 border-border p-1 mb-5">
            {(["signup", "signin"] as const).map((m) => (
              <button key={m} type="button" onClick={() => setMode(m)}
                className={`rounded-full py-3 font-bold text-sm transition ${mode === m ? "bg-neon-pink text-ink" : "text-muted-foreground"}`}>
                {m === "signup" ? "I'm new here" : "I have an account"}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={submit} className="rounded-3xl border-2 border-border bg-card p-6 space-y-4">
          {mode === "signup" && (
            <div>
              <label htmlFor="name" className={label}>Your name</label>
              <input id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sarah Johnson" className={field} />
            </div>
          )}
          <div>
            <label htmlFor="email" className={label}>Your email</label>
            <input id="email" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className={field} />
          </div>
          {mode !== "forgot" && (
            <div>
              <label htmlFor="pw" className={label}>{mode === "signup" ? "Make up a password" : "Your password"}</label>
              <div className="relative">
                <input id="pw" type={showPw ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className={`${field} pr-12`} />
                <button type="button" onClick={() => setShowPw(!showPw)} aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground p-1">
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {mode === "signin" && (
                <button type="button" onClick={() => setMode("forgot")} className="text-sm text-neon-cyan underline mt-2">Forgot password?</button>
              )}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full rounded-full py-4 bg-neon-green text-ink font-black text-lg disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : mode === "signup" ? "Create my account 🎉" : mode === "signin" ? "Sign in" : "Send me a reset link"}
          </button>

          {mode === "signup" && <p className="text-xs text-center text-muted-foreground">Next, we'll email you a link to confirm it's you.</p>}
          {mode === "forgot" && (
            <button type="button" onClick={() => setMode("signin")} className="w-full text-sm text-muted-foreground underline">Back to sign in</button>
          )}
        </form>
      </div>
    </main>
  );
};

export default Auth;
