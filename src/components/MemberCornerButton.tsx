import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

// Small floating shortcut so members can always sign in / open their pass.
const HIDDEN = ["/app", "/admin", "/auth", "/my-membership", "/reset-password", "/remembering-steve"];

export default function MemberCornerButton() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  if (HIDDEN.some((p) => pathname.startsWith(p))) return null;
  return (
    <Link
      to={user ? "/my-membership" : "/auth?next=/my-membership"}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 rounded-full border-2 border-ink bg-neon-green px-4 py-2.5 text-sm font-black text-ink shadow-lg"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      💚 {user ? "My pass" : "Member sign in"}
    </Link>
  );
}
