import express, { Express, Request, Response } from "express";
import { TBoard, TUser } from "../Client/src/Types/FirebaseTypes";
import dotenv from "dotenv";
import { firebaseApp, db } from "./firebase";
import {
  User,
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  DocumentSnapshot,
  onSnapshot,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { get } from "http";

dotenv.config();
var cors = require("cors");
var bodyParser = require("body-parser");

const app: Express = express();
var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlEncodedParser);

app.use(cors());
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Swag");
});

app.get("/login", (req: Request, res: Response) => {
  res.send("Login");
});

app.post("/api/auth/create_user", (req: Request, res: Response) => {
  // Retrieving User Details from request

  const firebaseUser: TUser = req.body.user;
  console.log("hey");
  try {
    const docRef = doc(db, "users", firebaseUser.uid);
    setDoc(docRef, firebaseUser);
    res.status(200).send(firebaseUser);
  } catch (e) {
    // console.error("Error adding document: ", e);
    res.status(500).send("Error creating user");
  }
});

// Tiny little check to see if get user works
app.get("/api/users/:userId", (req: Request, res: Response) => {
  console.log("hey");
  console.log(req.params.userId);
  const userRef = doc(db, "users", req.params.userId);

  getDoc(userRef).then((userSnap: DocumentSnapshot) => {
    if (userSnap.exists()) {
      const userData = userSnap.data();
      // send user data here

      res.send(userData).status(200);
    } else {
      console.log("No such user!");
      res.send(false).status(404);
    }
  });
});

// create task
app.post("/api/tasks", (req: Request, res: Response) => {
  const taskData: TaskData = req.body.task;

  addDoc(collection(db, "tasks"), taskData)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
});

// get task by id
app.get("/api/tasks/:taskId", (req: Request, res: Response) => {
  const taskRef = doc(db, "tasks", req.params.taskId);

  getDoc(taskRef).then((taskSnap: DocumentSnapshot) => {
    if (taskSnap.exists()) {
      const taskData: TaskData = taskSnap.data();
      // send task data here
      console.log("Task data:", taskData);
    } else {
      console.log("No such task!");
    }
  });
});

// delete task by id
app.delete("/api/tasks/:taskId", (req: Request, res: Response) => {
  const taskRef = doc(db, "tasks", req.params.taskId);

  deleteDoc(taskRef)
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
});

// update task by id
app.put("/api/tasks/:taskId", (req: Request, res: Response) => {
  const taskRef = doc(db, "tasks", req.params.taskId);
  const taskChanges = req.body.task;

  updateDoc(taskRef, taskChanges)
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
});

// temporarily use array
/*
{
  "groups": {
    groupId -> {
      tasks: {}
    }
  }
}
 */
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

app.get("/api/boards/:userID",(req:Request, res:Response) => {
  const userID = req.params.userID;
  const userRef = doc(db, "users", userID);
  getDoc(userRef).then((userSnap: DocumentSnapshot) => {
    
  })
})

app.post("/api/boards/create", (req: Request, res: Response) => {
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
});

// TODO: use actual database + authentication
app.get("/api/boards/:group", (req: Request, res: Response) => {
  const { group } = req.params;
  if (!boards.groups.has(group)) {
    fillDefault(group);
  }
  res
    .status(200)
    .json(Object.fromEntries(boards.groups.get(group)?.entries()!));
});

app.post("/api/boards/:group", (req: Request, res: Response) => {
  const { group } = req.params;
  const newBoard = new Map();
  for (const [key, value] of Object.entries(req.body)) {
    newBoard.set(key, value);
  }
  boards.groups.set(group, newBoard);
  res.status(200).send();
});

//// sample realtime board subscription
// app.get("/api/subscribe/boards/:boardId", (req: Request, res: Response) => {
//   const boardRef = doc(db ,'boards', req.params.boardId);
//   const unsubscribe = onSnapshot(boardRef, (doc) => {
//     return doc.data();
//   });
//   res.status(200).send(unsubscribe);
// });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
