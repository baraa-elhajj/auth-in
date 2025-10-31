import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppContextProvider } from "@/contexts/AppContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <StrictMode>
      <ToastContainer />
      <App />
    </StrictMode>
  </AppContextProvider>
);
