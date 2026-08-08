import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
createRoot(document.getElementById("root")).render(
  <StrictMode><App /></StrictMode>
)


// Register service worker for PWA installability (production only —
// registering in dev mode can cause confusing stale-cache issues while
// you're actively editing the app).
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.warn("Service worker registration failed:", err);
    });
  });
}
