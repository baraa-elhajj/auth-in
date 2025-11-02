import express from "express";
import { getUserData } from "../controllers/userController.js";
import authTokenHandler from "../middlewares/authTokenHandler.js";

const userRouter = express.Router();

userRouter.get("/:id", authTokenHandler, getUserData);

export default userRouter;
