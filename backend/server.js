import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDB.js";
import authRouter from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173/"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => res.send("API is working"));
app.use("/api/auth", authRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
