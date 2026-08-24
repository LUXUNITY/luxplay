import { Capacitor } from "@capacitor/core";

/** True when running inside the native iOS/Android shell (Capacitor). */
export const isNativeApp = (): boolean => {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
};

/** True when the app shell UI should be used (native, or ?app=1 for testing). */
export const shouldUseAppShell = (): boolean => {
  if (isNativeApp()) return true;
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("app") === "1";
};
