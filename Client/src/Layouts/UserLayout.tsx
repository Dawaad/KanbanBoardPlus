import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { getAuth } from "firebase/auth";
import AvatarDropDown from "@/Components/Nav/AvatarDropDown";
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
  const auth = getAuth();
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

  useEffect(() => {
    if (html) {
      if (userTheme === "dark" || systemTheme === "dark") {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, []);

  return (
    <div className="overflow-y-hidden h-screen">
      {/* Your common layout elements */}
      <header className="h-[3.75rem] bg-zinc-200/40 dark:bg-zinc-900 border-b border-b-zinc-600/60  dark:border-b-zinc-400/60">
        <div className="flex flex-row items-center px-5 py-3 ">
          {/*Title*/}
          <Link
            to={"/my"}
            id="nav-logo"
            className=" h-fit  text-2xl md:text-3xl font-extrabold flex group cursor-pointer text-zinc-800/80 dark:text-zinc-200/80 "
          >
            <div className="flex md:hidden">KB+</div>
            <div className="hidden md:flex">
              <p>K</p>
              {["a", "n", "b", "a", "n"].map((letter, index) => {
                return (
                  <p
                    key={letter}
                    className={`scale-0  group-hover:scale-100 origin-bottom`}
                    style={{ transition: `${200 + 200 * index}ms` }}
                  >
                    {letter}
                  </p>
                );
              })}
              <div className="flex transition-all duration-1000 group-hover:duration-700 -translate-x-full group-hover:-translate-x-0 group-hover:mx-2">
                <p>B</p>
                {["o", "a", "r", "d"].map((letter, index) => {
                  return (
                    <p
                      key={letter}
                      className={`scale-0  group-hover:scale-100 origin-bottom `}
                      style={{ transition: `${200 + 200 * index}ms ` }}
                    >
                      {letter}
                    </p>
                  );
                })}
              </div>
              <div className="flex transition-all -translate-x-[9.5rem] group-hover:-translate-x-0 duration-1000 group-hover:duration-700 ">
                <p className="block group-hover:hidden text-xl">+</p>
                <div className="flex text-3xl">
                  {["P", "l", "u", "s"].map((letter, index) => {
                    return (
                      <p
                        key={letter}
                        className={`scale-0  group-hover:scale-100 origin-bottom `}
                        style={{ transition: `${200 + 200 * index}ms ` }}
                      >
                        {letter}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </Link>
          {/*Search Bar*/}
          <div className="flex items-center space-x-5  flex-1 justify-end w-full">
            <button
              className=" transition-all pr-4 flex items-center group "
              onClick={() => {
                themeSwitch();
              }}
            >
              <SunIcon className=" dark_sun sun hover:text-zinc-500" />
              <MoonIcon className=" moon dark_moon  hover:text-zinc-500" />
            </button>
            {/*Sample Avatar*/}
            <AvatarDropDown auth={auth} />
          </div>
        </div>
      </header>

      <div>{children ? children : <Outlet></Outlet>}</div>
      {/* Other layout elements */}
    </div>
  );
};

export default UserLayout;
