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
import { collection, addDoc } from "firebase/firestore";
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
const auth = getAuth(firebaseApp);

app.get("/", (req: Request, res: Response) => {
  res.send("Swag");
});

app.get("/login", (req: Request, res: Response) => {
  res.send("Login");
});

app.get("/api/auth/get_auth", (req: Request, res: Response) => {
  console.log(auth.currentUser);
  if (auth) {
    res.status(200).send(auth);
  } else {
    res.send("Not Authenticated").status(401);
  }
});

app.post("/api/auth/email_login", (req: Request, res: Response) => {
  const { email, password } = req.body.user;
  if (email && password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        const user = userCred.user;
        res.status(200).send(user);
      })
      .catch((error) => {
        // res.status(401).send(error.message)
        console.log(error.message);
      });
  }
});

app.post("/api/auth/create_user", (req: Request, res: Response) => {
  // Retrieving User Details from request

  const { name, email, password } = req.body.user;

  if (name && email && password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        const user = userCred.user;
        updateProfile(user, { displayName: name }).then(() => {
          const firebaseUser: TUser = {
            uid: user.uid,
            email: user.email ? user.email : "",
            displayName: user.displayName ? user.displayName : "New User",
            photoURL: user.photoURL ? user.photoURL : "",
          };

          try {
            const docRef = addDoc(collection(db, "users"), firebaseUser);
            res.status(200).send(user);
          } catch (e) {
            // console.error("Error adding document: ", e);
            res.status(500).send("Error creating user");
          }
        });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
