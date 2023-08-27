import { Router } from "express";
import { handleBoardsUserId, handleCreateBoard, handleGetBoardByGroupId, handleUpdateBoardWithGroupId } from "../controllers/boards-controllers";

const boardsRouter = Router();

boardsRouter.get("/:userID", handleBoardsUserId);
boardsRouter.post("/create", handleCreateBoard);
boardsRouter.get("/group/get/:group", handleGetBoardByGroupId);
boardsRouter.post("/group/create/:group", handleUpdateBoardWithGroupId);

export default boardsRouter;