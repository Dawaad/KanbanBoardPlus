import React from "react";
import { Link, Outlet } from "react-router-dom";
import Avatar from "react-avatar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
interface LProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<LProps> = ({ children }) => {
  return (
    <div>
      {/* Your common layout elements */}
      <header>
        <div className="flex flex-col md:flex-row items-center p-5 bg-zinc-500/5  rounded-b-2xl">
          <div className="absolute top-0 left-0 w-full  h-[40rem] bg-gradient-to-br from-pink-400 to-blue-500 rounded-md filter blur-3xl opacity-60 -z-10"></div>

          {/*Title*/}
          <h1 className="text-3xl font-bold pb-10 md:pb-0">Kanban Board</h1>
          {/*Search Bar*/}
          <div className="flex items-center space-x-5  flex-1 justify-end w-full">
            <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial ">
              <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none p-2"
              />
              <button type="submit" hidden>
                Search
              </button>
            </form>
            {/*Sample Avatar*/}
            <Avatar name="Jared Tucker" round size="40" color="#0055D1" />
          </div>
        </div>
      </header>

      <div className="container min-h-full mx-auto">
        {children ? children : <Outlet></Outlet>}
      </div>
      {/* Other layout elements */}
    </div>
  );
};

export default UserLayout;
