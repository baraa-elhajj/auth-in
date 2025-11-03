import "./App.css";
import { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
