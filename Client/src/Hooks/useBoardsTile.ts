import React, { useState, useEffect } from "react";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { TDashTile } from "@/Types/TDashTile";

function useBoardTiles () {
  const [boards, setBoards] = useState<TDashTile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBoards = async () => {
        const auth: Auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is signed in");
          axios
          .get(`http://localhost:3000/api/boards/${user.uid}`)
          .then((res) => {
            //Returns an array of board id
            const boardIDs = res.data;
            axios
              .post(`http://localhost:3000/api/boards/userBoards`, {
                boardIDs: boardIDs,
                userID: user.uid,
              })
              .then((res) => {
                setBoards(res.data);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setError(true);
              });
          })
          .catch((err) => {
            console.log(err);
            setError(true);
          });
      
        } else {
          console.log("No user is signed in");
        }
      })

      
      
    };
    fetchBoards();
  }, []);

  return { boards, error, loading };
}

export default useBoardTiles ;
