import { Router } from "express";
import {
  handleCreateTask,
  handleDeleteTaskById,
  handleGetTaskById,
  handleUpdateTaskById,
  handleTaskSwap
} from "../controllers/tasks-controllers";

const tasksRouter = Router();

tasksRouter.post("/create", handleCreateTask);
tasksRouter.get("/:taskId", handleGetTaskById);
tasksRouter.delete("/:taskId", handleDeleteTaskById);
tasksRouter.put("/:taskId", handleUpdateTaskById);
tasksRouter.post("/swap", handleGetTaskById)
export default tasksRouter;
