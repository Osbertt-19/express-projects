import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { router as taskRouter } from "./routes/tasks";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(express.json());
app.use("/api/v1/tasks", taskRouter);

const port = process.env.PORT;
const startServer = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
};
startServer();
