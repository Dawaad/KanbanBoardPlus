import { Request, RequestHandler, Response } from "express";
import { db } from "../database/firebase";
import { TBoard, TUser, TColumn, TTask } from "../types/types";
import { TDashTile } from "../types/types";
import {
  addDoc,
  updateDoc,
  collection,
  getDoc,
  doc,
  DocumentSnapshot,
  query,
  where,
  documentId,
  getDocs,
  DocumentReference,
} from "firebase/firestore";

// Get all boards for a user by userID
export const handleBoardsUserId: RequestHandler = (
  req: Request,
  res: Response
) => {
  const userID = req.params.userID;
  const userRef = doc(db, "users", userID);
  getDoc(userRef).then((userSnap: DocumentSnapshot) => {
    if (userSnap.exists()) {
      const userData = userSnap.data();
      // send user data here
      const userBoards = userData?.assignedBoards;
      if (userBoards) {
        res.send(userBoards).status(200);
      }
    } else {
      console.log("No such user!");
    }
  });
};

// get board by board id
export const handleSingleBoardBoardId: RequestHandler = (
  req: Request,
  res: Response
) => {
  const boardID = req.params.boardId;
  const boardRef = doc(db, "boards", boardID);
};

// get boards by a list of board ids
export const handleManyBoardBoardId: RequestHandler = (
  req: Request,
  res: Response
) => {
  const boardIDs = req.body.boardIDs;
  const userID = req.body.userID;
  const q = query(
    collection(db, "boards"),
    where(documentId(), "in", boardIDs)
  );

  getDocs(q).then((querySnapshot) => {
    const boardData: TDashTile[] = [];
    querySnapshot.forEach((doc) => {
      const board = doc.data();
      const boardTile: TDashTile = {
        boardID: board.id,
        boardName: board.title,
        owner: board.ownerID === userID,
      };
      boardData.push(boardTile);
    });
    res.send(boardData).status(200);
  });
};

// create a new board
export const handleCreateBoard: RequestHandler = (
  req: Request,
  res: Response
) => {
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

export const handleGetBoardById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const boardID = req.params.boardID;

    const boardRef = doc(db, "boards", boardID);
    const boardDoc = await getDoc(boardRef);

    if (!boardDoc.exists()) {
      throw new Error("Board not found");
    }

    const boardData = boardDoc.data();

    if (!boardData) {
      throw new Error("Invalid board data");
    }

    const ownerIDRef = boardData.ownerID as string;
    const ownerRef = doc(db, "users", ownerIDRef);
    const ownerIDDoc = await getDoc(ownerRef);

    if (!ownerIDDoc.exists) {
      throw new Error("Owner user not found");
    }

    const ownerIDData = ownerIDDoc.data();

    if (!ownerIDData) {
      throw new Error("Invalid owner user data");
    }

    const owner: TUser = {
      uid: ownerIDData.uid,
      email: ownerIDData.email,
      displayName: ownerIDData.displayName,
      photoURL: ownerIDData.photoURL,
      assignedBoards: ownerIDData.assignedBoards,
    };
    const adminUsersRef = boardData.adminUsers as DocumentReference[];
    const adminUsersPromises: Promise<TUser | null>[] = adminUsersRef.map(
      async (adminUserRef) => {
        const adminUserDoc = await getDoc(adminUserRef);

        if (adminUserDoc.exists()) {
          const adminUserData = adminUserDoc.data();

          if (adminUserData) {
            const user: TUser = {
              uid: adminUserData.uid,
              email: adminUserData.email,
              displayName: adminUserData.displayName,
              photoURL: adminUserData.photoURL,
              assignedBoards: adminUserData.assignedBoards,
            };
            return user;
          }
        }

        return null; // Return null if adminUserDoc doesn't exist or there's an error
      }
    );

    const adminUsers: TUser[] = (await Promise.all(adminUsersPromises)).filter(
      (user) => user !== null
    ) as TUser[];

    const memberUsersRef = boardData.memberUsers as DocumentReference[];
    const memberUsersPromises: Promise<TUser | null>[] = memberUsersRef.map(
      async (memberUserRef) => {
        const memberUserDoc = await getDoc(memberUserRef);
        if (memberUserDoc.exists()) {
          const memberUserData = memberUserDoc.data();
          if (memberUserData) {
            const user: TUser = {
              uid: memberUserData.uid,
              email: memberUserData.email,
              displayName: memberUserData.displayName,
              photoURL: memberUserData.photoURL,
              assignedBoards: memberUserData.assignedBoards,
            };
            return user;
          }
        }
        return null;
      }
    );
    const memberUsers: TUser[] = (
      await Promise.all(memberUsersPromises)
    ).filter((user) => user !== null) as TUser[];

    //Firebase Column is stored through a map with <columnID, columnReference>

    const columnsRef = boardData.columns as Map<string, DocumentReference>;
    //If map is not empty, retrieve all columns

    if (columnsRef.size !== undefined) {
      const columnsPromises: Promise<TColumn | null>[] = Array.from(
        columnsRef.values()
      ).map(async (columnRef) => {
        const columnDoc = await getDoc(columnRef);
        if (columnDoc.exists()) {
          const columnData = columnDoc.data();
          if (columnData) {
            const tasksRef = columnData.tasks as DocumentReference[];
            const tasksPromises: Promise<TTask | null>[] = tasksRef.map(
              async (taskRef) => {
                const taskDoc = await getDoc(taskRef);
                if (taskDoc.exists()) {
                  const taskData = taskDoc.data();
                  if (taskData) {
                    const assignedUsersRef =
                      taskData.assignedUsers as DocumentReference[];
                    const assignedUsersPromises: Promise<TUser | null>[] =
                      assignedUsersRef.map(async (assignedUserRef) => {
                        const assignedUserDoc = await getDoc(assignedUserRef);
                        if (assignedUserDoc.exists()) {
                          const assignedUserData = assignedUserDoc.data();
                          if (assignedUserData) {
                            const user: TUser = {
                              uid: assignedUserData.uid,
                              email: assignedUserData.email,
                              displayName: assignedUserData.displayName,
                              photoURL: assignedUserData.photoURL,
                              assignedBoards: assignedUserData.assignedBoards,
                            };
                            return user;
                          }
                        }
                        return null;
                      });
                    const assignedUsers: TUser[] = (
                      await Promise.all(assignedUsersPromises)
                    ).filter((user) => user !== null) as TUser[];

                    const task: TTask = {
                      id: taskData.id,
                      title: taskData.title,
                      description: taskData.description,
                      assignedUsers: assignedUsers,
                      assignedDate: taskData.assignedDate,
                      completedDate: taskData.completedDate,
                    };
                    return task;
                  }
                }
                return null;
              }
            );
            const tasks: TTask[] = (await Promise.all(tasksPromises)).filter(
              (task) => task !== null
            ) as TTask[];

            const column: TColumn = {
              id: columnData.id,
              title: columnData.title,
              tasks: tasks,
            };
            return column;
          }
        }
        return null;
      });
      const columns: TColumn[] = (await Promise.all(columnsPromises)).filter(
        (column) => column !== null
      ) as TColumn[];

      const board: TBoard = {
        id: boardData.id,
        ownerID: owner,
        title: boardData.title,
        columns: new Map<string, TColumn>(
          columns.map((column) => [column.id, column])
        ),
        adminUsers: adminUsers,
        memberUsers: memberUsers,
      };
      res.send(board).status(200);
      return;
    }

    const board: TBoard = {
      id: boardData.id,
      ownerID: owner,
      title: boardData.title,
      columns: new Map<string, TColumn>(),
      adminUsers: adminUsers,
      memberUsers: memberUsers,
    };

    res.send(board).status(200);

    
  } catch (error) {
    console.error("Error retrieving board:", error);
    return null;
  }
};
