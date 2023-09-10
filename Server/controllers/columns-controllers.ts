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

// create column
export const handleCreateColumn: RequestHandler = (req: Request, res: Response) => {
  const columnData = req.body.column;

  addDoc(collection(db, "columns"), columnData)
    .then(() => {
      console.log("New column created!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

// get column by id
export const handleGetColumnById: RequestHandler = (req: Request, res: Response) => {
  const columnRef = doc(db, "columns", req.params.columnId);

  getDoc(columnRef).then((columnSnap: DocumentSnapshot) => {
    if (columnSnap.exists()) {
      const columnData = columnSnap.data();
      // send column data here
      console.log("Column data:", columnData);
    } else {
      console.log("No such column!");
    }
  });
};

// delete column by id
export const handleDeleteColumnById: RequestHandler = (req: Request, res: Response) => {
  const columnRef = doc(db, "columns", req.params.columnId);

  deleteDoc(columnRef)
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

// update column by id
export const handleUpdateColumnById: RequestHandler = (req: Request, res: Response) => {
  const columnRef = doc(db, "columns", req.params.columnId);
  const columnChanges = req.body.column;

  updateDoc(columnRef, columnChanges)
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
};