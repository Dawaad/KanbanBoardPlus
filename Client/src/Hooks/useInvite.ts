import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function useInvite(boardID: string) {
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getInviteCode = async () => {
      console.log(boardID);
      axios
        .post("http://localhost:3000/api/invite/retrieve", { boardID: boardID })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            if (res.data === "board-id-not-found") {
              axios
                .post("http://localhost:3000/api/invite/create", {
                  boardID: boardID,
                })
                .then((res) => {
                  console.log(res);
                  if (res.status === 200) {
                    setInviteCode(res.data);
                    setLoading(false);
                  }
                });
            }

            setInviteCode(res.data);
            setLoading(false);
          }
        });
    };
    getInviteCode();
  }, []);
  return { inviteCode, loading };
}

export default useInvite;
