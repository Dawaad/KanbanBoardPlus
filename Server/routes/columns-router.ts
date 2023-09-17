import { Router } from "express";
import {
  handleCreateColumn,
  handleDeleteColumnById,
  handleGetColumnById,
  handleUpdateColumnById,
} from "../controllers/columns-controllers";

const columnsRouter = Router();

columnsRouter.post("/create", handleCreateColumn);
columnsRouter.get("/:columnId", handleGetColumnById);
columnsRouter.delete("/:columnId", handleDeleteColumnById);
columnsRouter.put("/:columnId", handleUpdateColumnById);

export default columnsRouter;
