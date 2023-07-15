import * as dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db";

dotenv.config({ path: __dirname + "/.env" });
const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

const port = process.env.PORT;
app.listen(port, () => {
  connectDB(process.env.MONGO_URI);
  console.log(`server listening at port ${port}`);
});
