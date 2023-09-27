import { Router } from "express";
import {
  handleCreateTask,
  handleArchiveTaskById,
  handleGetTaskById,
  handleUpdateTaskById,
  handleSingleColumnTaskSwap,
  handleSwapTaskMultiColumn,
  handleAddUserToTask,
} from "../controllers/tasks-controllers";

const tasksRouter = Router();

tasksRouter.post("/create", handleCreateTask);
tasksRouter.get("/:taskId", handleGetTaskById);
tasksRouter.put("/archive/:columnId/:taskId", handleArchiveTaskById);
tasksRouter.put("/:taskId", handleUpdateTaskById);
tasksRouter.post("/swap/single", handleSingleColumnTaskSwap);
tasksRouter.post("/swap/multiple", handleSwapTaskMultiColumn);
tasksRouter.post("/addUser", handleAddUserToTask);
export default tasksRouter;
