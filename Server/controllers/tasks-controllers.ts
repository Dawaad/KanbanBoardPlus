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
  DocumentReference,
} from "firebase/firestore";
import { TTask, TUser } from "../types/types";
import { get } from "lodash";

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
      id: taskID,
      title: taskTitle,
      description: taskDescription,
      assignedUsers: assignedUsers,
      assignedDate: assignedDate,
      archivedDate: null,
      locationColumn: [columnID],
      locationDate: [date],
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
export const handleArchiveTaskById: RequestHandler = (
  req: Request,
  res: Response
) => {
  const columnRef = doc(db, "columns", req.params.columnId);
  const taskRef = doc(db, "tasks", req.params.taskId);
  const date = new Date();
  //Remove Task from Column
  getDoc(columnRef).then((columnSnap: DocumentSnapshot) => {
    if (columnSnap.exists()) {
      const column = columnSnap.data();
      const tasks: DocumentReference[] = column?.tasks;
      const updatedTasks = tasks.filter(
        (task) => task.id !== req.params.taskId
      );
      updateDoc(columnRef, { tasks: updatedTasks })
        .then(() => {
          console.log("Column Document Updated");
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  });
  //Update Archival Status in Task
  updateDoc(taskRef, { archivedDate: date })
    .then(() => {
      console.log("Task Document Updated");
      res.status(200).send("Task Updated");
    })
    .catch((err) => {
      res.status(500).send(err);
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

export const handleSingleColumnTaskSwap: RequestHandler = (
  req: Request,
  res: Response
) => {
  const { columnID, sourceIndex, destIndex } = req.body;
  const columnRef = doc(db, "columns", columnID);
  getDoc(columnRef).then((columnSnap: DocumentSnapshot) => {
    if (columnSnap.exists()) {
      const column = columnSnap.data();
      const tasks: DocumentReference[] = column?.tasks;

      const [removed] = tasks.splice(sourceIndex, 1);
      tasks.splice(destIndex, 0, removed);

      updateDoc(columnRef, { tasks: tasks })
        .then(() => {
          console.log("Column Document Updated");
          res.status(200).send("Column Updated");
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  });
};

export const handleSwapTaskMultiColumn: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { sourceColumnID, destColumnID, sourceIndex, destIndex } = req.body;
  const sourceColumnRef = doc(db, "columns", sourceColumnID);
  const destColumnRef = doc(db, "columns", destColumnID);

  const sourceColumnSnap = await getDoc(sourceColumnRef);
  const destColumnSnap = await getDoc(destColumnRef);

  if (sourceColumnSnap.exists() && destColumnSnap.exists()) {
    const sourceTask: DocumentReference[] = sourceColumnSnap.data().tasks;
    const destTask: DocumentReference[] = destColumnSnap.data().tasks;
    const [removed] = sourceTask.splice(sourceIndex, 1);
    destTask.splice(destIndex, 0, removed);
    await updateDoc(sourceColumnRef, { tasks: sourceTask });
    await updateDoc(destColumnRef, { tasks: destTask });

    //Update Column Location History in Task Document
    const taskRef = doc(db, "tasks", removed.id);
    const taskSnap = await getDoc(taskRef);
    if (taskSnap.exists()) {
      const task = taskSnap.data();
      const locationColumn = task?.locationColumn;
      const locationDate = task?.locationDate;
      const columnRef = doc(db, "columns", destColumnID);
      locationColumn.push(destColumnID);
      locationDate.push(new Date());
      await updateDoc(taskRef, {
        locationColumn: locationColumn,
        locationDate: locationDate,
      });
      console.log("Column Document Updated");
      res.status(200).send("Column Updated");
    }
  }
};

export const handleAddUserToTask = async (req: Request, res: Response) => {
  const userID: string = req.body.userID;
  const taskID: string = req.body.taskID;
  const taskRef = doc(db, "tasks", taskID);
  const userRef = doc(db, "users", userID);

  getDoc(taskRef).then((taskSnap: DocumentSnapshot) => {
    if (taskSnap.exists()) {
      const task = taskSnap.data();
      const assignedUsers: DocumentReference[] = task?.assignedUsers;
      if (!assignedUsers.find((user) => user.id === userID)) {
        updateDoc(taskRef, { assignedUsers: [...assignedUsers, userRef] })
          .then(() => {
            res.status(200);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    }
  });
};
