import constants from "../constants.js";

// @ts-ignore
const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  let title = "Error";

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      title = "Validation Error";
      break;
    case constants.UNAUTHORIZED:
      title = "Unauthorized";
      break;
    case constants.FORBIDDEN:
      title = "Forbidden";
      break;
    case constants.NOT_FOUND:
      title = "Not Found";
      break;
    case constants.SERVER_ERROR:
      title = "Internal Server Error";
      break;
    default:
      title = "Unexpected Error";
      break;
  }

  res.status(statusCode).json({
    title,
    message: err.message,
    stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
