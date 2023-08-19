import express, { Express, Request, Response } from "express";
import { TUser } from "../Client/src/Types/FirebaseTypes";
import dotenv from "dotenv";
import { firebaseApp, db } from "./firebase";
import {
  User,
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
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
const auth: Auth = getAuth();
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

app.get("/api/auth/get_auth", (req: Request, res: Response) => {
  console.log(auth);
  if (auth) {
    res.send(auth);
  } else {
    res.send("Not Authenticated").status(401);
  }
});

app.post("/api/auth/create_user", (req: Request, res: Response) => {
  // Retrieving User Details from request

  const firebaseUser: TUser = req.body.user;

  try {
    const docRef = addDoc(collection(db, "users"), firebaseUser);
    res.status(200).send(firebaseUser);
  } catch (e) {
    // console.error("Error adding document: ", e);
    res.status(500).send("Error creating user");
  }
});

// Tiny little check to see if get user works
app.get("/api/users/:userId", (req: Request, res: Response) => {
  const userRef = doc(db, "users", req.params.userId);

  getDoc(userRef).then((userSnap: DocumentSnapshot) => {
    if (userSnap.exists()) {
      const userData: UserData = userSnap.data();
      // send user data here
      console.log("User data:", userData);
    } else {
      console.log("No such user!");
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
