import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="h-screen flex items-center bg-gray-50">
      <Outlet />
    </div>
  );
}
