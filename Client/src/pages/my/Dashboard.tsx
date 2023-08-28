import React, { Suspense, useEffect, useState } from "react";
import Sideboard from "../../Components/Dash/Sideboard";
import { User, onAuthStateChanged, getAuth, Auth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import useBoards from "@/Hooks/useBoards";
import axios from "axios";
import DashboardTile from "../../Components/Dash/DashboardTile";
import CreateModal from "../../Components/Dash/Create";
function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [createModal, setCreateModal] = useState<boolean>(false);

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

  const boards = useBoards();

  const changeOpenState = (state: boolean) => {
    setCreateModal(state);
  };

  return (
    <>
      <div className="grid  md:flex md:flex-row h-[70rem]">
        <aside className="hidden md:block">
          <Sideboard />
        </aside>
        <main className="p-4">
          <h1 className="hidden md:block md:text-2xl lg:text-4xl font-bold  my-4 text-zinc-800/80 dark:text-zinc-200">
            Hello, {user?.displayName}
          </h1>
          <section id="user-boards" className="mx-4">
            <div className="flex flex-row items-center pb-4">
              <h1 className="text-lg md:text-2xl font-bold text-zinc-800/80 dark:text-zinc-200/80">
                Your boards
              </h1>
            </div>
            <div className="grid grid-cols-2 md:flex flex-row flex-wrap p-4">
              {/* todo: Update Loading Component */}
              {boards.loading ? (
                <div>Loading Cuz</div>
              ) : (
                boards.boards
                  .filter((board) => board.owner)
                  .map((board) => {
                    return (
                      <DashboardTile
                        boardDetails={{
                          id: board.boardID,
                          name: board.boardName,
                        }}
                      />
                    );
                  })
              )}

              <button
                onClick={() => {
                  setCreateModal(true);
                }}
                className="m-4 md:w-[11rem] lg:w-[13rem] bg-zinc-300/70 hover:bg-zinc-400/70 dark:bg-zinc-700/30 dark:hover:bg-zinc-700/60 h-[7rem] transition-all  flex justify-center items-center shadow-md shadow-zinc-800 dark:shadow-none rounded-md"
              >
                <PlusIcon className="h-10 w-10 text-zinc-800/80 dark:text-zinc-200/80" />
              </button>
            </div>
          </section>
          <section id="shared-boards" className="m-4">
            <div className="flex flex-row items-center pb-4">
              <h1 className="text-lg md:text-2xl font-bold text-zinc-800/80 dark:text-zinc-200/80">
                Shared Boards
              </h1>
            </div>
            <div className="grid grid-cols-2 md:flex flex-row flex-wrap p-4">
              {/* todo: Update Loading Component */}
              {boards.loading ? (
                <div>Loading Cuz</div>
              ) : (
                boards.boards
                  .filter((board) => !board.owner)
                  .map((board) => {
                    return (
                      <DashboardTile
                        boardDetails={{
                          id: board.boardID,
                          name: board.boardName,
                        }}
                      />
                    );
                  })
              )}
            </div>
          </section>
        </main>
      </div>
      <CreateModal modalOpen={createModal} changeOpenState={changeOpenState} />
    </>
  );
}

export default Dashboard;
