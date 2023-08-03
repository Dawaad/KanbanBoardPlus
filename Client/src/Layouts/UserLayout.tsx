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
        <div className="flex flex-col md:flex-row items-center px-5 py-3 bg-zinc-800">
          <div className="absolute top-0 left-0 w-full  h-[40rem] bg-gradient-to-br from-pink-400 to-blue-500 rounded-md filter blur-3xl opacity-60 -z-10"></div>

          {/*Title*/}
          <Link to={'/'} className="text-2xl text-zinc-400 font-bold pb-10 md:pb-0">Kanban Board</Link>
          {/*Search Bar*/}
          <div className="flex items-center space-x-5  flex-1 justify-end w-full">
            <form className="flex items-center space-x-5 bg-zinc-700/50 border border-zinc-500 rounded-md px-1 shadow-md flex-1 md:flex-initial ">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none px-2 py-1 bg-transparent text-zinc-300"
              />
              <button type="submit" hidden>
                Search
              </button>
            </form>
            {/*Sample Avatar*/}
            <Avatar name="Jared Tucker" round size="32" color="#0055D1" />
          </div>
        </div>
      </header>

      <div className="">
        {children ? children : <Outlet></Outlet>}
      </div>
      {/* Other layout elements */}
    </div>
  );
};

export default UserLayout;
