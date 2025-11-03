import developer from "@/assets/images/developer.png";
import { AppContent } from "@/contexts/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isLoggedIn, userData } = useContext(AppContent);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-2">
      <img className="w-40 h-40" src={developer} />
      <h1 className="mt-5 text-xl font-semibold">
        Hello, {isLoggedIn ? userData?.name : "Developer"}!
      </h1>
      <h1 className="text-3xl">Welcome to AuthIn</h1>
      <p className="text-lg w-md text-center">
        AuthIn is a simple and cool fully functional Login component. Get
        started below!
      </p>
      {!isLoggedIn && (
        <button
          onClick={() => navigate("/login")}
          className="mt-3 cursor-pointer py-2 px-5 rounded-3xl border border-black text-white bg-black 
        hover:bg-violet-600/80 hover:border-transparent hover:text-white transition-colors duration-200"
        >
          Get Started
        </button>
      )}
    </div>
  );
};

export default Home;
