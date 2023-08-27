import { Router } from "express";
import { handleCreateTask, handleDeleteTaskById, handleGetTaskById, handleUpdateTaskById } from "../controllers/tasks-controllers";

const tasksRouter = Router();

tasksRouter.post("/tasks", handleCreateTask);
tasksRouter.get("/tasks/:taskId", handleGetTaskById);
tasksRouter.delete("/tasks/:taskId", handleDeleteTaskById);
tasksRouter.put("/tasks/:taskId", handleUpdateTaskById);

export default tasksRouter;