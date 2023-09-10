import { Router } from "express";
import tasksRouter from './tasks-router';
import boardsRouter from './boards-router';
import authRouter from './auth-router';
import columnsRouter from "./columns-router";

const apiRouter = Router();

apiRouter.use(authRouter);
apiRouter.use('/tasks', tasksRouter)
apiRouter.use('/boards', boardsRouter);
apiRouter.use('/columns', columnsRouter);

export default apiRouter;