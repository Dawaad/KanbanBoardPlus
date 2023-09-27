import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { TUser } from "@/Types/FirebaseTypes";
function useTaskUser(boardID: string) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      axios
        .get("http://localhost:3000/api/boards/users/" + boardID)
        .then((res) => {
          const users: TUser[] = res.data;
          setUsers(users);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
}

export default useTaskUser;
