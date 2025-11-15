import logo from "@/assets/images/authin_logo_1.jpg";
import { AppContent } from "@/contexts/AppContext";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { isLoggedIn, apiUrl, setIsLoggedIn, setUserData } =
    useContext(AppContent);

  const handleLogout = async () => {
    setLoading(true);

    await axios
      .post(apiUrl + "/auth/logout")
      .then((response) => {
        setIsLoggedIn(false);
        setUserData(null);
        toast.success(response.data.message ?? "Logged out successfully");
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            "Something went wrong. Please try again later."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="h-25 flex justify-between items-center bg-gray-50 mb-20">
      <img
        onClick={() => navigate("/")}
        className="cursor-pointer w-auto h-13 ml-10"
        src={logo}
      />
      {isLoggedIn && (
        <button
          disabled={loading}
          onClick={handleLogout}
          className={`cursor-pointer py-2 px-4 mr-10 rounded-lg border border-[#1e3f66]
        text-[#1e3f66] hover:bg-[#e8b44a] hover:border-transparent hover:text-white transition-colors duration-200 ${
          loading ? "cursor-not-allowed opacity-80" : "cursor-pointer"
        }`}
        >
          {loading ? <Spinner color="black" /> : "Logout"}
        </button>
      )}
    </div>
  );
};

export default Navbar;
