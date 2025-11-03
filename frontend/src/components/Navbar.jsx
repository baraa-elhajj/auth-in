import logo from "@/assets/images/authin_logo.png";

const Navbar = () => {
  return (
    <div className="h-25 flex justify-between items-center bg-gray-50 mb-20">
      <img className="w-27 h-27 ml-10" src={logo} />
      <button
        className="cursor-pointer py-2 px-4 mr-10 rounded-lg border border-black text-black 
        hover:bg-violet-600/80 hover:border-transparent hover:text-white transition-colors duration-200"
      >
        Login
      </button>
    </div>
  );
};

export default Navbar;
