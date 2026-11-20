import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return toast({ title: "Password needs at least 6 characters", variant: "destructive" });
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast({ title: "Couldn't update password", description: "Your link may have expired — please request a new one.", variant: "destructive" });
    toast({ title: "Password updated! 🎉" });
    navigate("/my-membership", { replace: true });
  };

  return (
    <main className="min-h-screen bg-background px-5 py-14">
      <form onSubmit={submit} className="max-w-md mx-auto rounded-3xl border-2 border-border bg-card p-6 space-y-4">
        <h1 className="text-3xl font-black text-foreground text-center">Choose a new password</h1>
        <label htmlFor="new-pw" className="text-sm font-bold text-foreground block">New password</label>
        <input id="new-pw" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters" className="w-full rounded-2xl bg-background border-2 border-border text-foreground px-4 py-3.5 focus:outline-none focus:border-neon-cyan" />
        <button type="submit" disabled={loading} className="w-full rounded-full py-4 bg-neon-green text-ink font-black text-lg disabled:opacity-50 flex justify-center">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save my new password"}
        </button>
      </form>
    </main>
  );
};

export default ResetPassword;
