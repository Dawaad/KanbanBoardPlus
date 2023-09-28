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
  handleGetArchivedTaskFromBoard,
  handleGetUserContribution
} from "../controllers/boards-controllers";

const boardsRouter = Router();

//Post Functions
boardsRouter.post("/userBoards", handleManyBoardBoardId);
boardsRouter.post("/create", handleCreateBoard);
boardsRouter.post("/history", handleAddHistory);
boardsRouter.post("/archive", handleAddTaskToArchived);

//Get Functions
boardsRouter.get("/archived/:boardID", handleGetArchivedTaskFromBoard);
boardsRouter.get("/history/:boardID", handleGetHistoryFromBoard);
boardsRouter.get("/board-id/:boardID", handleGetBoardById);
boardsRouter.get("/user-id/:userID", handleBoardsUserId);
boardsRouter.get("/users/:boardID", handleGetUsersFromBoard);
boardsRouter.get("/contribution/:boardID", handleGetUserContribution)
export default boardsRouter;
