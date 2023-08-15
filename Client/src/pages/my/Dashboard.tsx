import React, { useEffect, useState } from "react";
import Sideboard from "../../Components/Dash/Sideboard";
import { User, onAuthStateChanged, getAuth, Auth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

 

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
