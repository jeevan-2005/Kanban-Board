const express = require("express");
const TaskModel = require("../models/task.model");
const auth = require("../middlewares/auth.middleware");
const taskRouter = express.Router();

taskRouter.post("/create", auth, async (req, res) => {
  const { title, description, status, dueDate, userId } = req.body;
  try {
    const newTask = new TaskModel({
      title,
      description,
      status,
      dueDate,
      userId,
    });
    await newTask.save();
    res.status(200).send({msg: "New task created."});
  } catch (error) {
    console.log(error);
    res.status(500).send({msg: "error occured while creating task."});
  }
});

taskRouter.get("/all", auth, async (req, res) => {
  const { userId } = req.body;
  try {
    const tasks = await TaskModel.find({ userId });
    if (tasks.length > 0) return res.status(200).json(tasks);
    res.send({msg: "No tasks created by you yet."});
  } catch (error) {
    console.log(error);
    res.status(500).send({msg: "error occured while reading all task."});
  }
});

taskRouter.get("/all/:taskId", auth, async (req, res) => {
  const { userId } = req.body;
  const { taskId } = req.params;
  try {
    const task = await TaskModel.findOne({ _id: taskId });
    if (!task) {
      res.status(404).send({msg : "task not found."});
    }
    if (task && task.userId == userId) {
      res.status(200).json(task);
    } else {
      res.status(415).send({msg: "You are not authorized."});
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({msg: "error occured while reading task."});
  }
});

taskRouter.put("/update/:taskId", auth, async (req, res) => {
  const { userId, title, description, dueDate, status } = req.body;
  const { taskId } = req.params;
  try {
    const task = await TaskModel.findOne({ _id: taskId });
    console.log(task);
    if (!task) {
      res.status(404).send({ msg: "task not found." });
    }
    if (task && task.userId == userId) {
      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;
      task.dueDate = dueDate || task.dueDate;
      await task.save();
      res.status(200).send({ msg: "Task updated." });
    } else {
      res.status(415).send({ msg: "You are not authorized." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "error occured while updating task." });
  }
});

taskRouter.delete("/delete/:taskId", auth, async (req, res) => {
    const { userId } = req.body;
    const { taskId } = req.params;
    try {
      const task = await TaskModel.findOne({ _id: taskId });
      if (!task) {
        res.status(404).send({msg : "task not found."});
      }
      if (task && task.userId == userId) {
        await task.deleteOne();
        res.status(200).send({msg: "Task deleted"});
      } else {
        res.status(415).send({msg: "You are not authorized."});
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({msg: "error occured while deleting task."});
    }
  });

module.exports = taskRouter;
