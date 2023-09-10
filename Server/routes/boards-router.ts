import { Router } from "express";
import { handleBoardsUserId, handleSingleBoardBoardId, handleManyBoardBoardId, handleCreateBoard, handleGetBoardById} from "../controllers/boards-controllers";

const boardsRouter = Router();

boardsRouter.get("/:userID", handleBoardsUserId);
boardsRouter.get("/:boardID", handleSingleBoardBoardId)
boardsRouter.post("/userBoards", handleManyBoardBoardId);
boardsRouter.post("/create", handleCreateBoard);
boardsRouter.get("/board/get/:boardID", handleGetBoardById);
// boardsRouter.post("/group/create/:group", handleUpdateBoardWithGroupId);

export default boardsRouter;