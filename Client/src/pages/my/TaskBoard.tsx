import React, { useEffect } from "react";
import DashboardBoard from "../../Components/Dashboard/Board/DashboardBoard";

import { useParams } from "react-router-dom";
function TaskBoard() {
  const { group } = useParams();
  useEffect(() => {
    console.log(group);
  }, []);
  return (
    <div>

      <DashboardBoard />
    </div>
  );
}

export default TaskBoard;
