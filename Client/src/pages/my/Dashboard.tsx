import React from "react";
import Sideboard from "../../Components/Dash/Sideboard";

function Dashboard() {
  return (
    <div className="grid  grid-cols-3">
      <div className="col-span-1">
        <Sideboard />
      </div>
      <div className="col-span-2"> yes </div>
    </div>
  );
}

export default Dashboard;
