import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="h-screen bg-gray-50">
      <Navbar />
      <Outlet />
    </div>
  );
}
