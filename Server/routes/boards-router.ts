import { Router } from "express";
import {
  handleBoardsUserId,
  handleGetUsersFromBoard,
  handleManyBoardBoardId,
  handleCreateBoard,
  handleGetBoardById,
  handleAddHistory,
  handleGetHistoryFromBoard,
  handleAddTaskToArchived,
} from "../controllers/boards-controllers";

const boardsRouter = Router();

boardsRouter.post("/userBoards", handleManyBoardBoardId);
boardsRouter.post("/create", handleCreateBoard);
boardsRouter.post("/history", handleAddHistory);
boardsRouter.post("/archive", handleAddTaskToArchived);
boardsRouter.get("/history/:boardID", handleGetHistoryFromBoard);
boardsRouter.get("/board-id/:boardID", handleGetBoardById);
boardsRouter.get("/user-id/:userID", handleBoardsUserId);
boardsRouter.get("/users/:boardID", handleGetUsersFromBoard);
export default boardsRouter;
