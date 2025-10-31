const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <div
      className="mx-auto flex flex-col justify-center space-y-6 w-xs sm:w-sm p-4
     bg-white text-black/80 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Reset Password</h1>
        <p className="text-sm text-gray-500">
          Enter your email to get a verification code
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <input
              className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm  
                placeholder:text-gray-500 shadow-xs disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              placeholder="your email"
              required
              type="email"
            />
            <button
              className="cursor-pointer items-center justify-center rounded-md text-sm font-medium 
             transition-colors duration-300 text-white/90 bg-violet-600/80 hover:bg-violet-600/85 
             h-10 px-4 py-2 w-full"
            >
              Get verification code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
