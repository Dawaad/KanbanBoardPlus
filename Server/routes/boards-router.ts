import { Router } from "express";
import { handleBoardsUserId, handleManyBoardBoardId, handleCreateBoard, handleGetBoardById} from "../controllers/boards-controllers";

const boardsRouter = Router();

boardsRouter.post("/userBoards", handleManyBoardBoardId);
boardsRouter.post("/create", handleCreateBoard);
boardsRouter.get("/board-id/:boardID", handleGetBoardById);
boardsRouter.get("/user-id/:userID", handleBoardsUserId);

export default boardsRouter;