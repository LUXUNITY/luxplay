import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { shouldUseAppShell } from "@/lib/platform";

/**
 * Inside the native iOS/Android shell the marketing website is skipped and the
 * app UI at /app is shown instead. The website itself is untouched.
 */
const AppShellRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/" && shouldUseAppShell()) {
      navigate("/app", { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};

export default AppShellRedirect;
