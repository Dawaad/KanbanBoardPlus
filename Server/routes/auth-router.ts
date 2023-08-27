import { Router } from "express";
import { handleCreateUser, handleGetUserById } from "../controllers/auth-controllers";

const authRouter = Router();

authRouter.post("/auth/create_user", handleCreateUser);
authRouter.get("/users/:userId", handleGetUserById);

export default authRouter;