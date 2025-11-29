import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import constants from "../constants.js";
import generateToken from "../utils/generateToken.js";
import transporter from "../config/nodemailer.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("All fields are required");
  }

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    const mailOptions = {
      from: `"Auth In" <${process.env.SMTP_BREVO_EMAIL}>`,
      to: email,
      subject: "Welcome to Auth In",
      text: `Hello ${name}, thanks for trying out Auth In, your account has been created successfully!`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      // @ts-ignore
      console.error("Could not send welcome email: ", error.message);
    }

    res.status(constants.CREATED).json({
      message: "Registration successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } else {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Invalid Data");
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("All fields are required");
  }

  const user = await userModel.findOne({ email });
  if (
    !user ||
    user.googleId ||
    !(await bcrypt.compare(password, user.password))
  ) {
    res.status(constants.UNAUTHORIZED);
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(constants.OK).json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  res.status(constants.OK).json({ message: "Logout successful" });
});

export const sendVerificationCode = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Email required");
  }

  const user = await userModel.findOne({ email });
  if (!user || user.googleId) {
    res.status(constants.NOT_FOUND);
    throw new Error("Invalid email");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetOtp = otp;
  user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
  await user.save();

  const mailOptions = {
    from: `"Auth In" <${process.env.SMTP_BREVO_EMAIL}>`,
    to: email,
    subject: "Reset Password",
    text: `Hello ${user.name}, your verification code is ${otp}. Use it to reset your password.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    // @ts-ignore
    console.error("Could not send welcome email: ", error.message);
  }

  res.status(constants.OK).json({ message: "Verification code sent" });
});

export const verifyCode = asyncHandler(async (req, res) => {
  const { email, verificationCode } = req.body;
  if (!email || !verificationCode) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("All fields are required");
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(constants.NOT_FOUND);
    throw new Error("User not found");
  }

  if (user.resetOtp === "" || user.resetOtp !== verificationCode) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Invalid verification code");
  }

  if (user.resetOtpExpireAt < Date.now()) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Expired verification code");
  }

  user.resetOtp = "";
  user.resetOtpExpireAt = 0;
  user.passwordResetAllowed = true;

  await user.save();

  res.status(constants.OK).json({ message: "Verification success" });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("All fields are required");
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(constants.NOT_FOUND);
    throw new Error("User not found");
  }

  if (!user.passwordResetAllowed) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Action not allowed");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.passwordResetAllowed = false;
  await user.save();

  res.status(constants.OK).json({ message: "Password reset successfully" });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  // @ts-ignore
  const user = await userModel.findById(req.id);

  const userResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  res.status(constants.OK).json(userResponse);
});
