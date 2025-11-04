import express from "express";
import {
  login,
  logout,
  register,
  sendVerificationCode,
  resetPassword,
  getCurrentUser,
  verifyCode,
} from "../controllers/authController.js";
import authTokenHandler from "../middlewares/authTokenHandler.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verification-code", sendVerificationCode);
authRouter.put("/verify-code", verifyCode);
authRouter.put("/reset-password", resetPassword);
authRouter.get("/user", authTokenHandler, getCurrentUser);

export default authRouter;
