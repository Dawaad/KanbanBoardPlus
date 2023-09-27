import React, { useState, useEffect } from "react";
import axios from "axios";
import { history } from "@/Types/FirebaseTypes";

function useHistory(boardID: string) {
  const [history, setHistory] = useState<history[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      axios
        .get("http://localhost:3000/api/boards/history/" + boardID)
        .then((res) => {
          if (res.status === 200) {
            setHistory(res.data);
        
            setLoading(false);
          }
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };  

    fetchHistory();
  }, []);

  return { history, loading, error };
}

export default useHistory;
