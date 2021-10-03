import express from "express";
import TaskController from "./controllers/TaskController.js";
import UserController from "./controllers/UserController.js";
const router = express.Router();

router.get("/", TaskController.showTask);

router.post("/todo/:id", TaskController.addTask);

router.post("/user/create", UserController.createUser);
router.post("/user/login", UserController.login);

router.delete("/todo/delete/:id", TaskController.deleteTask);

router.put("/todo/edit/:id", TaskController.editTask);

export default router;
