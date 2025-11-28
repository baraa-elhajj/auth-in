import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppContextProvider } from "@/contexts/AppContext.jsx";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <StrictMode>
        <ToastContainer />
        <App />
      </StrictMode>
    </GoogleOAuthProvider>
  </AppContextProvider>
);
