import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import mongoose from "mongoose";
import morgan from "morgan";

config();

const app = express();
app.use(json());
app.use(cors());
app.use(morgan("dev"));

// loading env variables with fallback values
const DB_URI = process.env.DB_URI;

if (!DB_URI) throw new Error("Incorrect DB setup");

export const mongoConnection = async () => {
  return mongoose
    .connect(DB_URI)
    .then(() => console.log("Database is Connected"))
    .catch((err) => console.log("Please Restart Server", err));
};

export const PORT = Number(process.env.PORT) || 5555;
export const HOST = process.env.HOST || "0.0.0.0";
export const configApp = app;
export { MainRouter } from "./routes.js";
