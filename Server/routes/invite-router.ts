import { Router } from "express";
import {
  handleCreateInviteCode,
  handleJoinBoardWithInviteCode,
  handleRetrieveInviteCode,
} from "../controllers/invite-controller";
const inviteRouter = Router();
inviteRouter.post("/create", handleCreateInviteCode);
inviteRouter.post("/retrieve", handleRetrieveInviteCode);
inviteRouter.post("/join", handleJoinBoardWithInviteCode);
export default inviteRouter;
