import express from "express";
import { MainRouter, configApp } from "./config/index.js";

const app = express();

// apply configs
app.use(configApp);

app.use("/api", MainRouter);

app.get("/", (_req, res) => {
  res
    .status(200)
    .json({
      "Server Status": "OK",
      Name: "Events API",
    })
    .end();
});

export default app;
