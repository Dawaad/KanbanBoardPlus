import { TTask } from "@/Types/FirebaseTypes";
import React, { useState, useEffect } from "react";
import axios from "axios";
function useArchived(boardID: string) {
  const [archived, setArchived] = useState<TTask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchArchivedTasks = () => {
      // fetch archived tasks from firebase
      axios
        .get(`http://localhost:3000/api/boards/archived/${boardID}`)
        .then((res) => {
          setLoading(false);
          setArchived(res.data);
          setError(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
          console.log(err);
        });
    };
    fetchArchivedTasks();
  }, []);

  return {archived, loading, error};
}

export default useArchived;
