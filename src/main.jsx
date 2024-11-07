import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterManager } from "./routes/RouterManager";
import { AuthProvider } from "./context/authContext";
import "./styles/globalStyles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterManager />
    </AuthProvider>
  </StrictMode>,
);
