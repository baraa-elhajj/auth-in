import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import constants from "../constants";
import generateToken from "../utils/generateToken";

// @ts-ignore
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("All fields are mandatory");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });
  if (newUser) {
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

// @ts-ignore
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
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
