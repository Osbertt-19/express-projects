import { RequestHandler } from "express";

import { Task } from "../models/Task";

export const getAllTasks: RequestHandler = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
};

export const getTaskByID: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const gottenTask = await Task.findById(id).lean();
  res.status(201).json({ gottenTask });
};

export const createTask: RequestHandler = async (req, res) => {
  const { name } = req.body;
  const createdTask = await Task.create({ name });
  res.status(201).json({ createdTask });
};

export const updateTask: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, completed } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(id, {
    name,
    completed,
  }).lean();
  res.status(201).json({ updatedTask });
};

export const deleteTask: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const deletedTask = await Task.findByIdAndDelete(id).lean();
  res.status(201).json({ deletedTask });
};
