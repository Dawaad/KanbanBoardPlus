import React from "react";
import { useState } from "react";
import { BsFacebook, BsLinkedin, BsGithub } from "react-icons/bs";

function Login() {
  const [login, setLogin] = useState<boolean>(true);

  const switchLoginClick = () => {
    document
      .getElementById("container")
      ?.classList.remove("right-panel-active");
  };
  const switchSignUpClick = () => {
    document.getElementById("container")?.classList.add("right-panel-active");
  };

  const socialMediaSignIn =
    (/*Idk maybe add enums here (FB/Github/Linkedin)???*/) => {};

  const emailSignIn = () => {};

  const emailSignUp = () => {};

  const socialMediaSignUp = () => {};

  return (
    <>
      <div
        className="relative overflow-hidden h-[45rem] md:h-[50rem] lg:h-[60rem]"
        id="container"
      >
        <div
          className=" absolute top-0 bg-zinc-200 dark:bg-zinc-800 h-full transition-transform duration-[300ms] -left-1/3 w-2/3 opacity-0 z-[1] flex justify-center"
          id="sign-up-container"
        >
          <form
            action="#"
            className="flex justify-center items-center flex-col px-12 text-center h-full w-1/2"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-800/80 dark:text-zinc-200">
              Sign Up
            </h1>
            <div className="my-5 flex space-x-8">
              <a href="#" className="w-12 h-12 text-[45px] text-blue-600 ">
                <BsFacebook />
              </a>
              <a
                href="#"
                className="text-[45px] text-zinc-800/80 dark:text-zinc-200"
              >
                <BsGithub />
              </a>

              <a href="#" className="text-[45px] text-blue-600">
                <BsLinkedin />
              </a>
            </div>
            <div className=" p-4 flex w-full items-center">
              <p className="h-[1px] bg-zinc-800/80 dark:bg-zinc-200 w-full"></p>
              <span className="m-2 border py-2 px-3 rounded-full text-zinc-800 dark:text-zinc-200 md:text-lg">
                Or
              </span>
              <p className="h-[1px] bg-zinc-800 dark:bg-zinc-200 w-full"></p>
            </div>

            <input
              className="p-3 bg-zinc-300/90 dark:bg-zinc-200 w-full my-2 rounded-xl placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-800"
              type="text"
              placeholder="Name"
            />
            <input
              className="p-3 bg-zinc-300/90 dark:bg-zinc-200 w-full my-2 rounded-xl placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-800"
              type="email"
              placeholder="Email"
            />
            <input
              className="p-3 bg-zinc-300/70 dark:bg-zinc-200 w-full my-2 rounded-xl placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-800"
              type="password"
              placeholder="Password"
            />

            <div className="space-y-2 flex flex-col justify-center items-center group pt-4">
              <button className=" rounded-2xl bg-gradient-to-tr from-blue-400 to-blue-900 text-zinc-200 mb-2 py-3 px-11 uppercase transition-all hover:scale-[1.02]">
                Sign Up
              </button>

              <p className="h-[1px] bg-zinc-700/80 dark:bg-zinc-300/70 w-3/4 scale-0 transition-all origin-right duration-[200ms] group-hover:scale-100"></p>
              <p className="h-[1px] bg-zinc-700/80 dark:bg-zinc-300/70 w-1/2 scale-0 transition-all origin-left duration-[400ms] group-hover:scale-100"></p>
              <p className="h-[1px] bg-zinc-700/80 dark:bg-zinc-300/70 w-1/4 scale-0 transition-all origin-center duration-[600ms] group-hover:scale-100"></p>
            </div>
          </form>
        </div>
        <div
          className="absolute top-0 h-full transition-transform duration-300 left-0 w-2/3 z-[2] bg-zinc-200 dark:bg-zinc-800 flex justify-center"
          id="sign-in-container"
        >
          <form
            className=" flex justify-center items-center flex-col px-12 text-center h-full w-1/2"
            action="#"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-800/80 dark:text-zinc-200">
              Login to Your Account
            </h1>
            <div className="my-5 flex space-x-8">
              <a href="#" className="w-12 h-12 text-[45px] text-blue-600 ">
                <BsFacebook />
              </a>
              <a
                href="#"
                className="text-[45px] text-zinc-800/80 dark:text-zinc-200"
              >
                <BsGithub />
              </a>

              <a href="#" className="text-[45px] text-blue-600">
                <BsLinkedin />
              </a>
            </div>
            <div className=" p-4 flex w-full items-center">
              <p className="h-[1px] bg-zinc-800/80 dark:bg-zinc-200 w-full"></p>
              <span className="m-2 border py-2 px-3 rounded-full text-zinc-800 dark:text-zinc-200 md:text-lg">
                Or
              </span>
              <p className="h-[1px] bg-zinc-800 dark:bg-zinc-200 w-full"></p>
            </div>
            <input
              className="p-3 bg-zinc-300/90 dark:bg-zinc-200 w-full my-2 rounded-xl placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-800"
              type="email"
              placeholder="Email"
            />
            <input
              className="p-3 bg-zinc-300/70 dark:bg-zinc-200 w-full my-2 rounded-xl placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-800"
              type="password"
              placeholder="Password"
            />
            <a
              className="p-4 text-zinc-700 dark:text-zinc-500 hover:underline hover:dark:text-zinc-400"
              href="#"
            >
              Forgot your password?
            </a>
            <div className="space-y-2 flex flex-col justify-center items-center group">
              <button className=" rounded-2xl bg-gradient-to-tr from-blue-400 to-blue-900 text-zinc-200 mb-2 py-3 px-11 uppercase transition-all hover:scale-[1.02]">
                Sign In
              </button>

              <p className="h-[1px] bg-zinc-700/80 dark:bg-zinc-300/70 w-3/4 scale-0 transition-all origin-right duration-[200ms] group-hover:scale-100"></p>
              <p className="h-[1px] bg-zinc-700/80 dark:bg-zinc-300/70 w-1/2 scale-0 transition-all origin-left duration-[400ms] group-hover:scale-100"></p>
              <p className="h-[1px] bg-zinc-700/80 dark:bg-zinc-300/70 w-1/4 scale-0 transition-all origin-center duration-[600ms] group-hover:scale-100"></p>
            </div>
          </form>
        </div>
        <div
          className="absolute top-0 left-2/3 w-1/3 h-full overflow-hidden transition-transform duration-300 z-[100]"
          id="overlay-container"
        >
          <div
            className="bg-gradient-to-br from-purple-600 to-red-200 dark:from-blue-900 dark:via-pink-700 dark:to-pink-900 bg-no-repeat bg-cover text-zinc-200 relative -left-full h-full w-[200%] translate-x-0 transition-transform"
            id="overlay"
          >
            <div
              className="absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2  transition-transform -translate-x-[20%]"
              id="overlay-left"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold m-4">
                Already With Us?
              </h1>
              <p className="text-base lg:text-lg font-semibold m-3">
                Login to access your account
              </p>
              <button
                onClick={() => {
                  switchLoginClick();
                }}
                className="rounded-2xl bg-transparent border border-white text-zinc-200 py-3 px-11 uppercase transition-all hover:scale-105 hover:border-zinc-800 hover:text-zinc-800"
                id="SignIn"
              >
                Sign In
              </button>
            </div>
            <div
              className="absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 translate-x-0 transition-transform right-0"
              id="overlay-right"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold m-4">
                Need an Account?
              </h1>
              <p className="text-base lg:text-lg font-semibold m-3">
                Enter your details and explore our amazing tool
              </p>
              <button
                onClick={() => {
                  switchSignUpClick();
                }}
                className="rounded-2xl bg-transparent border border-white text-zinc-200 py-3 px-11 uppercase transition-all hover:scale-105 hover:border-zinc-800 hover:text-zinc-800"
                id="SignUp"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;