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
    <div className="flex flex-col items-center gap-2 text-(--primary)">
      <img className="w-[70%] md:max-w-xs mx-auto" src={developer} />
      <h1 className="mt-5 text-xl md:text-2xl font-semibold">
        Hello,{" "}
        {isLoggedIn ? (
          <span className="text-(--secondary)">{userData?.name}!</span>
        ) : (
          "Developer!"
        )}
      </h1>

      <h1 className="text-3xl md:text-4xl">
        {isLoggedIn ? (
          "Congratulations"
        ) : (
          <span>
            Welcome to <span className="text-(--secondary)">AuthIn</span>
          </span>
        )}
      </h1>

      <p className="text-base md:text-lg max-w-md text-center px-4">
        {isLoggedIn
          ? "You have successfully logged in to Auth In"
          : "AuthIn is a simple and cool fully functional authentication system. Get started below!"}
      </p>

      {!isLoggedIn && (
        <button
          onClick={() => navigate("/login")}
          className="mt-3 cursor-pointer py-1 px-4 md:py-2 md:px-5 rounded-3xl border border-black text-white bg-(--primary)
        hover:bg-(--secondary) hover:border-transparent hover:text-white transition-colors duration-200"
        >
          Get Started
        </button>
      )}
    </div>
  );
};

export default Home;
