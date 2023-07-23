import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const Task = mongoose.model("Task", TaskSchema);
