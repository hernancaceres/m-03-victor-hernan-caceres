import express from "express";
import { connectMongo } from "./database/db.js";
import { indexRoutes } from "./routes/index.routes.js";

export const app = express();
connectMongo();

app.use(express.json());
app.use("/", indexRoutes);
