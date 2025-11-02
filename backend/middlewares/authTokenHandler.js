import jwt from "jsonwebtoken";

// @ts-ignore
const authTokenHandler = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401);
    throw new Error("Missing token");
  }

  // @ts-ignore
  jwt.verify(token, process.env.JWT_SECRET ?? "", (error, decodedToken) => {
    if (error) {
      res.status(401);
      throw new Error("Invalid token");
    }

    req.body.user = decodedToken.user;
    next();
  });
};

export default authTokenHandler;
