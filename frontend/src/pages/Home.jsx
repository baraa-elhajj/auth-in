import developer from "@/assets/images/developer.png";

const Home = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <img className="w-40 h-40" src={developer} />
      <h1 className="mt-5 text-xl font-semibold">Hello, Developer!</h1>
      <h1 className="text-3xl">Welcome to AuthIn</h1>
      <p className="text-lg w-md text-center">
        AuthIn is a simple and cool fully functional Login component. Get
        started below!
      </p>
      <button
        className="mt-3 cursor-pointer py-2 px-5 rounded-3xl border border-black text-white bg-black 
        hover:bg-violet-600/80 hover:border-transparent hover:text-white transition-colors duration-200"
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
