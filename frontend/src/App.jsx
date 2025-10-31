import "./App.css";
import { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute
              element={<Home />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
