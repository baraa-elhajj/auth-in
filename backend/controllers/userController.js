import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import constants from "../constants.js";

export const getUserData = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    res.status(constants.NOT_FOUND);
    throw new Error("User not found");
  }

  // @ts-ignore
  if (user.id !== req.id) {
    res.status(constants.FORBIDDEN);
    throw new Error("Permission Denied");
  }

  const userResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  res.status(constants.OK).json(userResponse);
});
