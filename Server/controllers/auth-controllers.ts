import { TUser } from "../../Client/src/Types/FirebaseTypes"; // TODO: make symlink for front/back
import { RequestHandler, Request, Response } from "express";
import { db } from "../database/firebase";
import {
  getDoc,
  doc,
  DocumentSnapshot,
  setDoc,
} from "firebase/firestore";

export const handleCreateUser: RequestHandler = (req: Request, res: Response) => {
  // Retrieving User Details from request
  const firebaseUser: TUser = req.body.user;
  try {
    const docRef = doc(db, "users", firebaseUser.uid);
    setDoc(docRef, firebaseUser);
    res.status(200).send(firebaseUser);
  } catch (e) {
    res.status(500).send("Error creating user");
  }
};

// get Users By ID
export const handleGetUserById: RequestHandler = (req: Request, res: Response) => {
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
};