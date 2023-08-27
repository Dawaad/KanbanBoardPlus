import { Request, RequestHandler, Response } from "express";
import { db } from "../database/firebase";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  DocumentSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

// create task
export const handleCreateTask: RequestHandler = (req: Request, res: Response) => {
  const taskData = req.body.task;

  addDoc(collection(db, "tasks"), taskData)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

// get task by id
export const handleGetTaskById: RequestHandler = (req: Request, res: Response) => {
  const taskRef = doc(db, "tasks", req.params.taskId);

  getDoc(taskRef).then((taskSnap: DocumentSnapshot) => {
    if (taskSnap.exists()) {
      const taskData = taskSnap.data();
      // send task data here
      console.log("Task data:", taskData);
    } else {
      console.log("No such task!");
    }
  });
};

// delete task by id
export const handleDeleteTaskById: RequestHandler = (req: Request, res: Response) => {
  const taskRef = doc(db, "tasks", req.params.taskId);

  deleteDoc(taskRef)
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

// update task by id
export const handleUpdateTaskById: RequestHandler = (req: Request, res: Response) => {
  const taskRef = doc(db, "tasks", req.params.taskId);
  const taskChanges = req.body.task;

  updateDoc(taskRef, taskChanges)
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
};