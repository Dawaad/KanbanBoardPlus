import React from "react";
import { Link, Outlet } from "react-router-dom";
import Avatar from "react-avatar";
import {
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

interface LProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<LProps> = ({ children }) => {
  const html = document.querySelector("html");
  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const themeSwitch = () => {
    if (html) {
      if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
    }
  };

  return (
    <div className="">
      {/* Your common layout elements */}
      <header>
        <div className="flex flex-col md:flex-row items-center px-5 py-3 border-b border-b-slate-400">
          {/*Title*/}
          <Link
            to={"/"}
            className="text-2xl text-zinc-800 dark:text-zinc-300 font-bold pb-10 md:pb-0"
          >
            Kanban Board
          </Link>
          {/*Search Bar*/}
          <div className="flex items-center space-x-5  flex-1 justify-end w-full">
            <form className="flex items-center space-x-5 dark:bg-zinc-700/50 border border-zinc-500 rounded-md px-1 shadow-md flex-1 md:flex-initial ">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none px-2 py-1 bg-transparent text-zinc-800 dark:text-zinc-300"
              />
              <button type="submit" hidden>
                Search
              </button>
            </form>
            <button
              className="hover:scale-110 transition-all text-zinc-800 dark:text-zinc-300 hover:text-slate-500"
              onClick={() => {
                themeSwitch();
              }}
            >
              <SunIcon className="w-6 h-6 hidden dark:block" />
              <MoonIcon className="w-6 h-6 block dark:hidden" />
            </button>
            {/*Sample Avatar*/}
            <Avatar className="cursor-pointer" name="Jared Tucker" round size="28" color="#0055D1" />
          </div>
        </div>
      </header>

      <div className="">{children ? children : <Outlet></Outlet>}</div>
      {/* Other layout elements */}
    </div>
  );
};

export default UserLayout;
