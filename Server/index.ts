import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { firebaseApp } from "./firebase";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  
  res.send("Swag");
});

app.post("/login/email", (req: Request, res: Response) => {});

app.post("/login/google", (req: Request, res: Response) => {});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
