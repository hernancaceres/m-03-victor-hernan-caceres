import express from "express";
import morgan from "morgan";
import cors from "cors";

import { connectMongo } from "./database/db.js";
import { indexRoutes } from "./routes/index.routes.js";
import authRouter from "./routes/auth.routes.js";

export const app = express();
connectMongo();

app.use(express.json());
app.use(morgan("dev"));
app.use("/", indexRoutes);
app.use("/api/", authRouter);

app.use(cors());