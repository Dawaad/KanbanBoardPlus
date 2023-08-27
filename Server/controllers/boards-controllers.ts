import { Request, RequestHandler, Response } from "express";
import { db } from "../database/firebase";
import {
  addDoc,
  updateDoc,
  collection,
  getDoc,
  doc,
  DocumentSnapshot,
} from "firebase/firestore";

const DEFAULT_DATA = new Map<string, string[]>();
DEFAULT_DATA.set("Backlogged", [
  "Task 1",
  "Task 2",
  "Task 3",
  "Task 4",
  "Task 5",
]);
DEFAULT_DATA.set("To Do", ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"]);
DEFAULT_DATA.set("In Progress", [
  "Task 6",
  "Task 7",
  "Task 8",
  "Task 9",
  "Task 10",
]);
DEFAULT_DATA.set("Review", [
  "Task 11",
  "Task 12",
  "Task 13",
  "Task 14",
  "Task 15",
]);
DEFAULT_DATA.set("Done", [
  "Task 11",
  "Task 12",
  "Task 13",
  "Task 14",
  "Task 15",
]);
const boards: { groups: Map<string, Map<string, string[]>> } = {
  groups: new Map(),
};
const fillDefault = (group: string) => {
  const newGroup = new Map();
  for (const [key, value] of DEFAULT_DATA.entries()) {
    newGroup.set(key, [...value]);
  }
  boards.groups.set(group, newGroup);
};

// TODO: figure out wtf this is
export const handleBoardsUserId: RequestHandler = (req:Request, res:Response) => {
  const userID = req.params.userID;
  const userRef = doc(db, "users", userID);
  getDoc(userRef).then((userSnap: DocumentSnapshot) => {
  })
};

export const handleCreateBoard: RequestHandler = (req: Request, res: Response) => {
  const { boardName, userID } = req.body;

  const userRef = doc(db, "users", userID);
  const boardDoc = {
    id: "",
    ownerID: userID,
    title: boardName,
    columns: {},
    adminUsers: [userRef],
    memberUsers: [],
  };
  const boardRef = collection(db, "boards");
  addDoc(boardRef, boardDoc)
    .then((docRef) => {
      updateDoc(docRef, {
        id: docRef.id,
      });
      getDoc(userRef)
        .then((userSnap: DocumentSnapshot) => {
          if (userSnap.exists()) {
            const userData = userSnap.data();
            // send user data here
            const userBoards = userData?.assignedBoards;
            if (userBoards) {
              userBoards.push(docRef.id);
              updateDoc(userRef, {
                assignedBoards: userBoards,
              });
            }
          } else {
            console.log("No such user!");
          }
        })
        .then(() => {
          res.send(docRef.id).status(200);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const handleGetBoardByGroupId: RequestHandler = (req: Request, res: Response) => {
  const { group } = req.params;
  if (!boards.groups.has(group)) {
    fillDefault(group);
  }
  res
    .status(200)
    .json(Object.fromEntries(boards.groups.get(group)?.entries()!));
};

export const handleUpdateBoardWithGroupId: RequestHandler = (req: Request, res: Response) => {
  const { group } = req.params;
  const newBoard = new Map();
  for (const [key, value] of Object.entries(req.body)) {
    newBoard.set(key, value);
  }
  boards.groups.set(group, newBoard);
  res.status(200).send();
};