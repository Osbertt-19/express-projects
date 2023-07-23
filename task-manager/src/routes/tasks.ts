import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskByID,
  updateTask,
} from "../controllers/tasks";
export const router = Router();

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTaskByID).patch(updateTask).delete(deleteTask);
// router.route("/:id").get((req, res) => {
//   const { id } = req.params;
//   res.json({ name: id });
// });
