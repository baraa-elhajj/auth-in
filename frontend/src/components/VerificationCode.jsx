import { useState, useRef, useEffect, useContext } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContent } from "@/contexts/AppContext";

const VerificationCode = ({ setVerifyCode, setResetPassword, email }) => {
  const [loading, setLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef([]);
  const [code, setCode] = useState(new Array(6).fill(""));
  const isCodeComplete = code.every((digit) => digit !== "");

  const { apiUrl } = useContext(AppContent);

  const handleChange = (element, index) => {
    if (isNaN(Number(element.value)) || element.value === " ") {
      element.value = "";
      return;
    }

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    if (element.value && index < 5) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;
    const newCode = new Array(6).fill("");
    for (let i = 0; i < pasteData.length; i++) {
      newCode[i] = pasteData[i];
    }
    setCode(newCode);

    const lastFullInput = Math.min(pasteData.length - 1, 5);
    if (lastFullInput >= 0) {
      const targetInput = inputRefs.current[lastFullInput];
      if (targetInput) {
        targetInput.focus();
      }
    }
  };

  const handleVerify = async () => {
    await axios
      .put(apiUrl + "/auth/verify-code", {
        email,
        verificationCode: code.join(""),
      })
      .then(() => {
        setVerifyCode(false);
        setResetPassword(true);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ||
            "Something went wrong. Please try again later"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const firstInput = inputRefs.current[0];
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  return (
    <div className="flex items-center justify-center p-4">
      {}
      <div
        className="bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-2xl shadow-black/10 
      max-w-sm w-full text-center text-black/80 relative overflow-hidden"
      >
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
          <p className="text-gray-500 mb-6 mt-4 text-sm">
            A 6-digits code has been sent to your email
          </p>

          <div
            className="flex justify-center gap-2 sm:gap-3 mb-5"
            onPaste={handlePaste}
          >
            {code.map((data, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="tel"
                maxLength={1}
                value={data}
                placeholder=""
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => {
                  e.target.select();
                  setFocusedIndex(index);
                }}
                onBlur={() => setFocusedIndex(-1)}
                className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-2xl font-semibold bg-gray-50 
                     rounded-lg outline-none transition-all placeholder-gray-400
                  ${
                    focusedIndex === index
                      ? "border-2 border-violet-500/80"
                      : "border border-dashed border-gray-300 hover:border-gray-400"
                  }`}
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={loading || !isCodeComplete}
            className={`items-center justify-center rounded-md text-sm font-semibold 
             transition-colors duration-300 text-white/90 bg-violet-600/80  
             h-10 px-4 py-2 w-full ${
               loading || !isCodeComplete
                 ? "cursor-not-allowed opacity-70"
                 : "cursor-pointer hover:bg-violet-600/70"
             }`}
          >
            {loading ? <Spinner color="white" /> : "Verify Code"}
          </button>

          <p className="mt-4 text-gray-500 text-sm">
            Didn&apos;t receive a code?{" "}
            <button className="text-violet-600/80 hover:text-violet-500/80 font-semibold underline">
              Resend code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
