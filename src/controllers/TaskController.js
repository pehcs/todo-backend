import Tasks from "../models/Tasks.js";
import jwt from "jsonwebtoken";

const TaskController = {
  async showTasks(req, res) {
    try {
      const taskData = await Tasks.findAll({
        where: {
          UserId: await jwt.verify(
            req.cookies["access-token"],
            process.env.SECRET_KEY
          ),
        },
      });
      console.log(taskData);
      res.json(taskData);
    } catch (e) {
      console.log(e);
    }
  },

  async addTask(req, res) {
    try {
      const { title, task } = req.body;
      const createTask = await Tasks.create({
        title,
        task,
        UserId: await jwt.verify(
          req.cookies["access-token"],
          process.env.SECRET_KEY
        ),
      });
      console.log(createTask);
      res.status(201).end();
    } catch (e) {
      console.log("Error:", e.message);
    }
  },

  async deleteTask(req, res) {
    try {
      const deleteTaskRequest = await Tasks.destroy({
        where: {
          UserId: await jwt.verify(
            req.cookies["access-token"],
            process.env.SECRET_KEY
          ),
          id: req.params.id,
        },
      });
      if (!deleteTaskRequest) {
        console.log("delete nada");
        res.status(404).end();
      } else {
        res.status(200).end();
      }
      console.log(deleteTaskRequest);
    } catch (e) {
      console.log("message error: " + e.message);
    }
  },

  async editTask(req, res) {
    try {
      const id = req.params.id;
      const { title, task } = req.body;

      await Tasks.update(
        { title, task },
        {
          where: {
            UserId: await jwt.verify(
              req.cookies["access-token"],
              process.env.SECRET_KEY
            ),
            id,
          },
        }
      );
      res.status(200).end();
    } catch (e) {
      console.log("Error:", e);
      res.status(500).end();
    }
  },
};

export default TaskController;
