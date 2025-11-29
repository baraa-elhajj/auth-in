import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import constants from "../constants.js";
import generateToken from "../utils/generateToken.js";
import transporter from "../config/nodemailer.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

export const googleAuth = asyncHandler(async (req, res) => {
  const { code } = req.body;

  if (!code) {
    res.status(constants.UNAUTHORIZED);
    throw new Error("Invalid google auth");
  }

  const { tokens } = await client.getToken({
    code,
    redirect_uri: "postmessage",
  });

  const idToken = tokens.id_token;

  if (!idToken) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Invalid google token");
  }

  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  // @ts-ignore
  const { sub, email, name } = ticket.getPayload();

  let user = await userModel.findOne({ email });
  if (!user) {
    // If user does not exist, create it then login
    user = await userModel.create({
      name,
      email,
      password: null,
      googleId: sub,
    });

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
  }

  const jwt = generateToken(user._id);
  res.cookie("token", jwt, {
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
