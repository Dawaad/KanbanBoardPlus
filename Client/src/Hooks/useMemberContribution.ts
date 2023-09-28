import React, { useState, useEffect } from "react";
import { memberOverview, userContribution } from "@/Types/FirebaseTypes";
import axios from "axios";
function useMemberContribution(boardID: string) {
  const [memberContribution, setMemberContribution] =
    useState<memberOverview>();
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/boards/contribution/${boardID}`)
      .then((res) => {
        if (res.status === 200) {
          setMemberContribution(res.data);
          setLoading(false);
          setError(false);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
        setLoading(false);
      });
  }, []);

  return { memberContribution, loading, error };
}

export default useMemberContribution;
