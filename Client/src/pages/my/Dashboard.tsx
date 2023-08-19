import React, { useEffect, useState } from "react";
import Sideboard from "../../Components/Dash/Sideboard";
import { User, onAuthStateChanged, getAuth, Auth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/loginerror");
      }
    });
  }, []);

  return (
    <div className="grid  md:flex md:flex-row h-[70rem]">
      <aside className="hidden md:block">
        <Sideboard />
      </aside>
      <main className="p-4">
        <h1 className="hidden md:block md:text-2xl lg:text-4xl font-bold  my-4 text-zinc-800/80 dark:text-zinc-200">
          Hello, {auth.currentUser?.displayName}
        </h1>
        <section id="user-boards" className="mx-4">
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
                //This should be a link to the projects id which we can implement later
                <Link to={'board/aaa'} className="m-4 md:w-[11rem] lg:w-[13rem] h-[7rem] transition-all bg-orange-400 flex justify-center items-center shadow-md shadow-zinc-800 dark:shadow-none rounded-md hover:opacity-70">
                  <p className="text-lg font-semibold">Project {index}</p>
                </Link>
              );
            })}
          </div>
        </section>
        <section id="shared-boards" className="m-4">
          <div className="flex flex-row items-center pb-4">
            <h1 className="text-lg md:text-2xl font-bold text-zinc-800/80 dark:text-zinc-200/80">
              Shared Boards
            </h1>
            <button className="flex md:hidden px-2 font-bold text-zinc-800/80 dark:text-zinc-200/80">
              <PlusIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:flex flex-row flex-wrap p-4">
            {[1, 2, 3].map((index: number) => {
              return (
                <Link to={"board/aaa"} className="m-4 md:w-[11rem] lg:w-[13rem] h-[7rem] transition-all bg-red-400 flex justify-center items-center shadow-md shadow-zinc-800 dark:shadow-none rounded-md hover:opacity-70">
                  <p className="text-lg font-semibold">Project {index}</p>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
