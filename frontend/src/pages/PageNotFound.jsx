import notFound from "@/assets/images/404_not_found.png";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-2 text-[#1e3f66]">
      <img className="w-40 h-40" src={notFound} />
      <h1 className="mt-5 text-xl font-semibold">Page Not Found</h1>
      <p className="text-lg w-md text-center">
        The page you have requested is not available
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-3 cursor-pointer py-2 px-5 rounded-3xl border border-black text-white bg-[#1e3f66] 
        hover:bg-[#e8b44a] hover:border-transparent hover:text-white transition-colors duration-200"
      >
        Go to homepage
      </button>
    </div>
  );
};

export default PageNotFound;
