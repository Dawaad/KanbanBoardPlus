import React, { useState, useEffect } from "react";
import axios from "axios";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { TBoard, TColumn, TUser } from "@/Types/FirebaseTypes";

const isUserInBoard = (board: TBoard, userID: string): boolean => {
  const allUsers: TUser[] = [...board.adminUsers, ...board.memberUsers];
  const userIDs: string[] = allUsers.map((user) => user.uid);
  return userIDs.includes(userID);
};

function useBoard(boardID: string | undefined) {
  const [error, setError] = useState(false);
  const [board, setBoard] = useState<TBoard | undefined>();
  const [userAccess, setUserAccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoard = async () => {
      //Retrieve User ID
      const auth: Auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        //Retrieve board from endpoint
        axios
          .get(`http://localhost:3000/api/boards/board-id/${boardID}`)
          .then((res) => {
            //Parse Board Data into Type

            const data = res.data;

            //Convert Column Object back into Map
            const columnMap = new Map<string, TColumn>();
            Object.entries(data.columns).forEach(([key, value]) => {
              columnMap.set(key, value as TColumn);
            });

            console.log(columnMap);

            const boardData: TBoard = {
              ...data,
              columns: columnMap,
            };

            //Check if user is in board
            const userInBoard = isUserInBoard(boardData, user?.uid || "");
            //Set board state
            setBoard(boardData);
            //Set user access state
            setUserAccess(userInBoard);
            //Set loading state
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            setBoard(undefined);
            setError(true);
          });
      });
    };
    fetchBoard();
  }, []);
  console.log(board);
  return { board, userAccess, loading, error };
}

export default useBoard;
