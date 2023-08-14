import React, { useEffect, useState } from "react";
import Sideboard from "../../Components/Dash/Sideboard";
import { User, onAuthStateChanged, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    //Check User Authentication Status
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.displayName);
        setUser(user);
      } else {
        navigate("/login");
      }
    });
  }, []);

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
