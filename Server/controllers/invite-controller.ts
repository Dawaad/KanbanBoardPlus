import { Request, Response, RequestHandler } from "express";
import { db } from "../database/firebase";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  DocumentSnapshot,
  deleteDoc,
  updateDoc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { get } from "http";

// Create Invite Code
export const handleCreateInviteCode: RequestHandler = (
  req: Request,
  res: Response
) => {
  const boardID = req.body.boardID;

  //Create a randomised, secure 6 digit alphanumerical code
  const inviteCode = generateRandomCode();

  //Add to firebase with Invite Code as the document ID
  setDoc(doc(db, "inviteCodes", boardID), {
    boardID: boardID,
    inviteCode: inviteCode,
  }).then(() => {
    console.log("Document successfully written!");
    res.send(inviteCode).status(200);
  });
};

//Retrieve Current Invite Code for board
export const handleRetrieveInviteCode: RequestHandler = (
  req: Request,
  res: Response
) => {
  const boardID = req.body.boardID;
  const inviteRef = doc(db, "inviteCodes", boardID);
  getDoc(inviteRef).then((inviteSnap: DocumentSnapshot) => {
    if (inviteSnap.exists()) {
      const inviteData = inviteSnap.data();
      const inviteCode = inviteData?.inviteCode;
      if (inviteCode) {
        res.send(inviteCode).status(200);
      }
    } else {
      console.log("No such invite code!");
      res.status(200).send("board-id-not-found");
    }
  });
};

// Join Board with Invite Code
export const handleJoinBoardWithInviteCode: RequestHandler = (req, res) => {
  const inviteCode = req.body.inviteCode;
  const userID = req.body.userID;

  const userRef = doc(db, "users", userID);
  const inviteRef = collection(db, "inviteCodes");

  const q = query(inviteRef, where("inviteCode", "==", inviteCode));

  getDocs(q)
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        res.status(404).send("Invite code not found");
        return;
      }

      const board = querySnapshot.docs[0];
      const inviteData = board.data();
      const boardID = inviteData.boardID;

      const boardRef = doc(db, "boards", boardID);

      getDoc(userRef)
        .then((userSnap) => {
          if (!userSnap.exists()) {
            res.status(404).send("User not found");
            return;
          }

          const userData = userSnap.data();
          const userBoards = userData?.assignedBoards || [];

          if (userBoards.includes(boardID)) {
            res.status(200).send("user-in-board");
            return;
          }

          userBoards.push(boardID);

          updateDoc(userRef, {
            assignedBoards: userBoards,
          }).then(() => {
            getDoc(boardRef).then((boardSnap) => {
              if (boardSnap.exists()) {
                const boardData = boardSnap.data();
                const boardMembers = boardData?.members || [];

                if (boardMembers.includes(userID)) {
                  res.status(200).send("user-in-board");
                  return;
                }

                boardMembers.push(userID);

                updateDoc(boardRef, {
                  members: boardMembers,
                }).then(() => {
                  //   // Delete the invite code
                  //   deleteDoc(doc(db, "inviteCodes", boardID))
                  //     .then(() => {
                  //       res.status(200).send("User added to board");
                  //     })
                  //     .catch((error) => {
                  //       console.error("Error deleting invite code:", error);
                  //       res.status(500).send("Internal server error");
                  //     });
                  res.status(200).send("User added to board");
                });
              } else {
                res.status(404).send("Board not found");
              }
            });
          });
        })
        .catch((error) => {
          console.error("Error getting user document:", error);
          res.status(500).send("Internal server error");
        });
    })
    .catch((error) => {
      console.error("Error getting invite code documents:", error);
      res.status(500).send("Internal server error");
    });
};

const generateRandomCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
};
