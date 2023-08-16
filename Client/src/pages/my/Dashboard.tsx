import React, { useEffect, useState } from "react";
import Sideboard from "../../Components/Dash/Sideboard";
import { User, onAuthStateChanged, getAuth, Auth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  return (
    <div className="grid  md:flex md:flex-row">
      <aside className="hidden md:block">
        <Sideboard />
      </aside>
      <main className="p-4">
        <section id="user-boards">
          <div className="flex flex-row items-center pb-4">
            <h1 className="text-lg md:text-2xl font-bold text-zinc-800/80 dark:text-zinc-200/80">
              Your boards
            </h1>
            <button className="flex md:hidden px-2 font-bold text-zinc-800/80 dark:text-zinc-200/80">
              <PlusIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:flex flex-row flex-wrap p-4">
            {[1, 2, 3, 4, 5].map((index: number) => {
              return (
                <div className=" border m-4 md:w-[13rem] h-[8rem] bg-orange-300">{index}</div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
