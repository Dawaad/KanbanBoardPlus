import { Router } from "express";
import {
  handleCreateColumn,
  handleDeleteColumnById,
  handleGetColumnById,
  handleUpdateColumnById,
  handleUpdatedColumnSwap,
  handleArchiveColumnById,
} from "../controllers/columns-controllers";

const columnsRouter = Router();

columnsRouter.post("/create", handleCreateColumn);
columnsRouter.get("/get/:columnId", handleGetColumnById);
columnsRouter.delete("/delete/:columnId", handleDeleteColumnById);
columnsRouter.put("/update/:columnId", handleUpdateColumnById);
columnsRouter.post("/swap", handleUpdatedColumnSwap);
columnsRouter.put("/archive", handleArchiveColumnById);
export default columnsRouter;
