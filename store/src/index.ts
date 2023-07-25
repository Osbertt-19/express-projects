import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

import { router as productRouter } from "./routes/products";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/v1/products", productRouter);

const port = process.env.PORT;
const startServer = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
};
startServer();
