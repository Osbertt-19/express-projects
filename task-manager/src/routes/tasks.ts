import { Router } from "express";
import { createTask, getAllTasks } from "../controllers/tasks";
export const router = Router();

router.route("/").get(getAllTasks).post(createTask);
