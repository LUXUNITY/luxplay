import { Outlet } from "react-router-dom";
import AppTabBar from "./AppTabBar";

const AppLayout = () => (
  <div className="min-h-screen bg-background">
    <div style={{ paddingTop: "env(safe-area-inset-top)" }} />
    <main className="pb-28">
      <Outlet />
    </main>
    <AppTabBar />
  </div>
);

export default AppLayout;
