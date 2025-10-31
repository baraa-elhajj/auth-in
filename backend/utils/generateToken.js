import jwt from "jsonwebtoken";

// @ts-ignore
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET ?? "", {
    expiresIn: "7d",
  });
};

export default generateToken;
