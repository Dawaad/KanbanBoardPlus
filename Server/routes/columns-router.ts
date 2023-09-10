import { Router } from "express";
import { handleCreateColumn, handleDeleteColumnById, handleGetColumnById, handleUpdateColumnById } from "../controllers/columns-controllers";

const columnsRouter = Router();

columnsRouter.post("/columns", handleCreateColumn);
columnsRouter.get("/columns/:columnId", handleGetColumnById);
columnsRouter.delete("/columns/:columnId", handleDeleteColumnById);
columnsRouter.put("/columns/:columnId", handleUpdateColumnById);

export default columnsRouter;