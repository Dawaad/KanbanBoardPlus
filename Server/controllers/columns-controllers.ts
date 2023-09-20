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
import { TBoard, TColumn } from "../types/types";

// create column
export const handleCreateColumn: RequestHandler = (
  req: Request,
  res: Response
) => {
  const columnTitle = req.body.columnTitle;
  const boardID = req.body.boardID;
  const columnRef = collection(db, "columns");
  const insertionDate = new Date();
  //Add New Column Entry and set Title
  addDoc(columnRef, {
    title: columnTitle,
    tasks: [],
    createdDate: insertionDate,
  }).then((docRef) => {
    const columnID = docRef.id;
    const insertedColumn: TColumn = {
      title: columnTitle,
      tasks: [],
      id: columnID,
      createdDate: insertionDate,
    };

    //Retrieve Board Document
    const boardRef = doc(db, "boards", boardID);
    getDoc(boardRef).then((boardSnap: DocumentSnapshot) => {
      if (boardSnap.exists()) {
        const board = boardSnap.data();
        const updatedColumns = {
          ...board.columns,
          [columnID]: docRef,
        };

        //Update Board Document with new column
        updateDoc(boardRef, { columns: updatedColumns })
          .then(() => {
            console.log("Board Document Updated");
            res.status(200).send(insertedColumn);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    });
  });

  //Once Column has been created, retrieve reference and add to Column Map in the board doucment
};

// get column by id
export const handleGetColumnById: RequestHandler = (
  req: Request,
  res: Response
) => {
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
export const handleDeleteColumnById: RequestHandler = (
  req: Request,
  res: Response
) => {
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
export const handleUpdateColumnById: RequestHandler = (
  req: Request,
  res: Response
) => {
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
