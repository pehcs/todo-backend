import express from "express";
import TaskController from "./controllers/TaskController.js";
import UserController from "./controllers/UserController.js";
import userAuth from './middlewares/userAuth.js'

const router = express.Router();

router.get("/",userAuth,(req,res) => {
    res.json({message: "ok"})
});

router.post("/todo/:id", TaskController.addTask);

router.post("/user/create", UserController.createUser);
router.post("/user/login", UserController.login);
router.get("/user/login", (req,res)=>{
    res.json({message: "Login area"})
});

router.delete("/todo/delete/:id", TaskController.deleteTask);

router.put("/todo/edit/:id", TaskController.editTask);

export default router;
