import logo from "@/assets/images/authin_logo_sm.png";
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
    <div className="h-[10%] md:h-[15%] flex justify-between items-center bg-gray-50 mb-0 md:mb-10">
      <img
        onClick={() => navigate("/")}
        className="cursor-pointer h-[50%] ml-5 md:ml-10"
        src={logo}
      />
      {isLoggedIn && (
        <button
          disabled={loading}
          onClick={handleLogout}
          className={`text-sm md:text-lg cursor-pointer py-1 px-2 md:py-2 md:px-4 mr-5 md:mr-10 rounded-lg border border-(--primary)
        text-(--primary) hover:bg-(--secondary) hover:border-transparent hover:text-white transition-colors duration-200 ${
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
