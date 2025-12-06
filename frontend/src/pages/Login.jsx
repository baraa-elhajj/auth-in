import GoogleLogin from "@/components/GoogleLogin";
import PageLoader from "@/components/PageLoader";
import Spinner from "@/components/Spinner";
import { AppContent } from "@/contexts/AppContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [loginForm, setLoginForm] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { apiUrl, isLoggedIn, setIsLoggedIn, setUserData, authLoading } =
    useContext(AppContent);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleLoginForm = () => {
    setLoginForm(!loginForm);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;
      if (loginForm) {
        // Login
        await axios
          .post(apiUrl + "/auth/login", { email, password })
          .then((response) => {
            setIsLoggedIn(true);
            setUserData(response.data.user);
            navigate("/");
            toast.success(response.data.message ?? "Logged in successfully");
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      } else {
        // Sign Up
        await axios
          .post(apiUrl + "/auth/register", { name, email, password })
          .then((response) => {
            setLoginForm(true);
            setEmail(response.data.user.email);
            setPassword("");
            toast.success(
              response.data.message ??
                "Account created successfully! Please login with your email."
            );
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later!");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <PageLoader />;
  }

  return (
    <div
      className="mx-auto mt-5 md:mt-10 flex flex-col justify-center space-y-6 w-2xs md:w-sm p-4
     bg-white text-(--primary) rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-lg md:text-2xl font-semibold">
          {loginForm ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-xs md:text-sm text-gray-500">
          {loginForm
            ? "Enter your email below to sign in to your account"
            : "Enter your info below to create an new account"}
        </p>
      </div>

      <div className="grid gap-4 md:gap-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {!loginForm && (
              <div className="grid gap-2">
                <label
                  className="text-xs md:text-sm font-medium leading-none"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  className="flex h-7 md:h-10 md:w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm  
                placeholder:text-gray-500 placeholder:text-xs md:placeholder:text-sm shadow-xs disabled:cursor-not-allowed disabled:opacity-50"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="your name"
                  type="text"
                  required
                />
              </div>
            )}
            <div className="grid gap-2">
              <label
                className="text-xs md:text-sm font-medium leading-none"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full rounded-md border border-gray-200 bg-background px-3 py-1 md:py-2
                  text-sm placeholder:text-gray-500 placeholder:text-xs md:placeholder:text-sm shadow-xs 
                  disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                placeholder="name@example.com"
                required
                type="email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <label
                  className="text-xs md:text-sm font-medium leading-none"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full rounded-md border border-gray-200 bg-background px-3 py-1 md:py-2
                  text-sm placeholder:text-gray-500 placeholder:text-xs md:placeholder:text-sm shadow-xs 
                  disabled:cursor-not-allowed disabled:opacity-50"
                  id="password"
                  required
                  type={passwordVisible ? "text" : "password"}
                />
                <div
                  className={`cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3 ${
                    loginForm && "mb-4"
                  }`}
                  onClick={togglePassword}
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </div>
                {loginForm && (
                  <div
                    className="cursor-pointer max-w-fit text-[0.7rem] md:text-xs underline underline-offset-3 font-semibold 
                    text-(--secondary) hover:text-(--secondary)/80 mt-1"
                    onClick={() => navigate("/reset-password")}
                  >
                    Forgot your password?
                  </div>
                )}
              </div>
            </div>
            <button
              disabled={loading}
              className={`items-center justify-center rounded-md text-sm font-semibold 
             transition-colors duration-300 text-white/90 bg-(--secondary) hover:bg-(--primary) 
             h-10 px-4 py-2 w-full ${
               loading ? "cursor-not-allowed opacity-80" : "cursor-pointer"
             }`}
            >
              {loading ? (
                <Spinner color="white" />
              ) : loginForm ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
        <div className="relative -mt-2">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-[90%] border-t border-(--primary)" />
          </div>
          <div className="relative flex justify-center text-[0.7rem] md:text-xs uppercase">
            <span className="bg-white px-1 text-(--primary)">
              Or Continue with
            </span>
          </div>
        </div>
        <div className="-mt-2">
          <GoogleLogin />
        </div>
      </div>

      <p className="px-auto text-center text-xs md:text-sm text-gray-500">
        {loginForm ? "Don't have an account? " : "Already have an account? "}
        <span
          className="cursor-pointer text-xs md:text-sm underline underline-offset-3 font-semibold text-(--secondary) hover:text-(--secondary)/80"
          onClick={toggleLoginForm}
        >
          {loginForm ? "Sign Up" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default Login;
