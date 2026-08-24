import { NavLink } from "react-router-dom";
import { Home, CalendarDays, Gift, User } from "lucide-react";

const tabs = [
  { to: "/app", label: "HOME", Icon: Home, end: true },
  { to: "/app/book", label: "BOOK", Icon: CalendarDays },
  { to: "/app/rewards", label: "REWARDS", Icon: Gift },
  { to: "/app/account", label: "ACCOUNT", Icon: User },
];

const AppTabBar = () => (
  <nav
    aria-label="LuxPlay app navigation"
    className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-white/10 bg-[#0a0a16]/95 backdrop-blur-sm"
    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
  >
    <ul className="grid grid-cols-4">
      {tabs.map(({ to, label, Icon, end }) => (
        <li key={to}>
          <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-3 font-display text-[10px] tracking-[0.2em] transition-colors ${
                isActive ? "text-neon-cyan" : "text-white/50"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-5 h-5 ${isActive ? "drop-shadow-[0_0_8px_hsl(var(--neon-cyan))]" : ""}`} />
                {label}
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default AppTabBar;
