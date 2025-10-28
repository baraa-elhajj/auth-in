import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  element: Component,
  isAuthenticated,
}) {
  return isAuthenticated ? Component : <Navigate to="/" replace />;
}
