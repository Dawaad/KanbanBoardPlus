import { Router } from "express";
import apiRouter from './api-router';

const mainRouter = Router();

mainRouter.use('/api', apiRouter);

export default mainRouter;