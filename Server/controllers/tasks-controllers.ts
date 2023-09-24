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
import { TTask, TUser } from "../types/types";

// create task
export const handleCreateTask: RequestHandler = (
  req: Request,
  res: Response
) => {
  const columnID = req.body.columnID;
  const taskTitle = req.body.taskTitle;
  const taskDescription = req.body.taskDescription;
  const assignedDate = req.body.taskDate;
  const date = new Date();
  const taskRef = collection(db, "tasks");

  const assignedUsers: TUser[] = [];

  addDoc(taskRef, {
    title: taskTitle,
    description: taskDescription,
    assignedUsers: assignedUsers,
    assignedDate: assignedDate,
    archivedDate: null,
    locationColumn: [columnID],
    locationDate: [date],
  }).then((docRef) => {
    const taskID = docRef.id;
    const insertedTask = {
      title: taskTitle,
      description: taskDescription,
      assignedUsers: assignedUsers,
      assignedDate: assignedDate,
      archivedDate: null,
      locationColumn: [columnID],
      locationDate: [date],
      id: taskID,
    };

    //Retrieve Column Document
    const columnRef = doc(db, "columns", columnID);
    getDoc(columnRef).then((columnSnap: DocumentSnapshot) => {
      if (columnSnap.exists()) {
        const column = columnSnap.data();
        const updatedTasks = [...column.tasks, docRef];

        //Update Column Document with new task
        updateDoc(columnRef, { tasks: updatedTasks })
          .then(() => {
            console.log("Column Document Updated");
            res.status(200).send(insertedTask);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    });
  });
};

// get task by id
export const handleGetTaskById: RequestHandler = (
  req: Request,
  res: Response
) => {
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
export const handleDeleteTaskById: RequestHandler = (
  req: Request,
  res: Response
) => {
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
export const handleUpdateTaskById: RequestHandler = (
  req: Request,
  res: Response
) => {
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

export const handleTaskSwap: RequestHandler = (req: Request, res: Response) => {
  const columnID = req.body.columnID;
  const taskId1 = req.body.taskId1;
  const taskId2 = req.body.taskId2;
  
  const columnRef = doc(db, "columns", columnID);
  getDoc(columnRef).then((columnSnap: DocumentSnapshot) => {
    if (columnSnap.exists()) {
      const columnData = columnSnap.data();
      const tasks:string[] = columnData?.tasks;
      if (tasks) {
        const index1 =  tasks.findIndex(index => {return index === taskId1})
        const index2 = tasks.findIndex(index => {return index === taskId2})
        const task1 = tasks[index1];
        const task2 = tasks[index2];
        tasks[index1] = task2;
        tasks[index2] = task1;
        updateDoc(columnRef, {
          tasks: tasks,
        })
          .then(() => {
            console.log("Document successfully updated!");
            res.status(200).send("task-swap-success");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      }
    } else {
      console.log("No such column!");
    }
  });

};