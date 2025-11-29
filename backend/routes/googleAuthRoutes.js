import express from "express";
import { googleAuth } from "../controllers/googleAuthController.js";

const googleAuthRouter = express.Router();

googleAuthRouter.post("/auth", googleAuth);

export default googleAuthRouter;
