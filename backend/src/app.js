import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectMongo } from "./database/db.js";
import { indexRoutes } from "./routes/index.routes.js";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";

export const app = express();
connectMongo();

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/", indexRoutes);
app.use("/api/", authRouter);
app.use("/api/", postRouter);

app.use(cors());
