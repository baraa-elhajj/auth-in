import developer from "@/assets/images/developer_1.jpg";
import PageLoader from "@/components/PageLoader";
import { AppContent } from "@/contexts/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isLoggedIn, userData, authLoading } = useContext(AppContent);
  const navigate = useNavigate();

  if (authLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col items-center gap-2 text-[#1e3f66]">
      <img className="w-auto h-50" src={developer} />
      <h1 className="mt-5 text-xl font-semibold">
        Hello,{" "}
        {isLoggedIn ? (
          <span className="text-[#e8b44a]">{userData?.name}!</span>
        ) : (
          "Developer!"
        )}
      </h1>

      <h1 className="text-3xl">
        {isLoggedIn ? (
          "Congratulations"
        ) : (
          <span>
            Welcome to <span className="text-[#e4af0e]">Auth In</span>
          </span>
        )}
      </h1>

      <p className="text-lg w-md text-center">
        {isLoggedIn
          ? "You have successfully logged in to Auth In"
          : "Auth In is a simple and cool fully functional authentication system. Get started below!"}
      </p>

      {!isLoggedIn && (
        <button
          onClick={() => navigate("/login")}
          className="mt-3 cursor-pointer py-2 px-5 rounded-3xl border border-black text-white bg-[#1e3f66]
        hover:bg-[#e4af0e] hover:border-transparent hover:text-white transition-colors duration-200"
        >
          Get Started
        </button>
      )}
    </div>
  );
};

export default Home;
