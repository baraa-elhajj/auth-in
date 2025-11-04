import Spinner from "@/components/Spinner";
import VerificationCode from "@/components/VerificationCode";
import { AppContent } from "@/contexts/AppContext";
import axios from "axios";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { apiUrl } = useContext(AppContent);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (resetPassword) {
      await axios
        .put(apiUrl + "/auth/reset-password", { email, newPassword: password })
        .then((response) => {
          setVerifyCode(true);
          toast.success(response.data.message ?? "Password reset successfully");
          setResetPassword(false);
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      await axios
        .post(apiUrl + "/auth/send-verification-code", { email })
        .then((response) => {
          setVerifyCode(true);
          toast.success(response.data.message ?? "Code Sent");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (verifyCode) {
    return (
      <VerificationCode
        setVerifyCode={setVerifyCode}
        setResetPassword={setResetPassword}
        email={email}
      />
    );
  }

  return (
    <div
      className="mx-auto flex flex-col justify-center space-y-6 w-xs sm:w-sm p-4
     bg-white text-black/80 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Reset Password</h1>
        <p className="text-sm text-gray-500">
          {resetPassword
            ? "Enter your new password"
            : "Enter your email to get a verification code"}
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {resetPassword ? (
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 
                  text-sm placeholder:text-gray-500 shadow-xs disabled:cursor-not-allowed disabled:opacity-50"
                  id="password"
                  required
                  type={passwordVisible ? "text" : "password"}
                />
                <div
                  className="text-black/80 cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={togglePassword}
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            ) : (
              <input
                className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm  
                placeholder:text-gray-500 shadow-xs disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your email"
                required
                type="email"
              />
            )}

            <button
              disabled={loading}
              className={`items-center justify-center rounded-md text-sm font-semibold 
              transition-colors duration-300 text-white/90 bg-violet-600/80 
              h-10 px-4 py-2 w-full ${
                loading
                  ? "cursor-not-allowed opacity-70"
                  : "cursor-pointer hover:bg-violet-600/70"
              }`}
            >
              {loading ? (
                <Spinner color="white" />
              ) : resetPassword ? (
                "Change Password"
              ) : (
                "Send Verification Code"
              )}
            </button>
            {!resetPassword && (
              <p className="text-xs text-center text-gray-500">
                Verification codes expire in 15 mins
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
