import { RequestHandler } from "express";

import { Task } from "../models/Task";

export const getAllTasks: RequestHandler = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
};

export const createTask: RequestHandler = async (req, res) => {
  const { name } = req.body;
  console.log(req.body);
  const createdTask = await Task.create({ name });
  res.status(201).json({ createdTask });
};
