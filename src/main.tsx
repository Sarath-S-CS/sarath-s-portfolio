import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Self-hosted fonts (no third-party requests at runtime).
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
