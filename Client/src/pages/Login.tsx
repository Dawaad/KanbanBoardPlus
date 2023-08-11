import React from "react";
import { useState } from "react";

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

  return (
    <>
      <div
        className="bg-zinc-200 relative overflow-hidden h-[45rem] md:h-[50rem] lg:h-[60rem]"
        id="container"
      >
        <div
          className="absolute top-0 h-full transition-all left-0 w-1/2 opacity-0 z-[1]"
          id="sign-up-container"
        >
          <form
            action="#"
            className="bg-white flex justify-center items-center flex-col px-12 text-center h-full"
          >
            <h1>Sign Up</h1>
            <div className="my-5">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              className="p-3 bg-zinc-300/70 w-full my-2"
              type="text"
              placeholder="Name"
            />
            <input
              className="p-3 bg-zinc-300/70 w-full my-2"
              type="email"
              placeholder="Email"
            />
            <input
              className="p-3 bg-zinc-300/70 w-full my-2"
              type="password"
              placeholder="Password"
            />
            <button className="rounded-2xl bg-blue-400 text-zinc-200 py-3 px-11 uppercase transition-transform">
              Sign Up
            </button>
          </form>
        </div>
        <div
          className="absolute top-0 h-full transition-all left-0 w-1/2 z-[2]"
          id="sign-in-container"
        >
          <form
            className="bg-white flex justify-center items-center flex-col px-12 text-center h-full"
            action="#"
          >
            <h1>Sign In</h1>
            <div className="my-5">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email account</span>
            <input
              className="p-3 bg-zinc-300/70 w-full my-2"
              type="email"
              placeholder="Email"
            />
            <input
              className="p-3 bg-zinc-300/70 w-full my-2"
              type="password"
              placeholder="Password"
            />
            <a href="#">Forgot your password?</a>
            <button className="rounded-2xl bg-blue-400 text-zinc-200 py-3 px-11 uppercase transition-transform">
              Sign In
            </button>
          </form>
        </div>
        <div
          className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform z-[100]"
          id="overlay-container"
        >
          <div
            className="bg-green-500 bg-no-repeat bg-cover text-zinc-200 relative -left-full h-full w-[200%] translate-x-0 transition-transform"
            id="overlay"
          >
            <div
              className="absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2  transition-transform -translate-x-[20%]"
              id="overlay-left"
            >
              <h1>Welcome Back!</h1>
              <p>
                To stay connected with us please login with your personal info
              </p>
              <button
                onClick={() => {
                  switchLoginClick();
                }}
                className="rounded-2xl bg-transparent border  border-white text-zinc-200 py-3 px-11 uppercase transition-transform"
                id="SignIn"
              >
                Sign In
              </button>
            </div>
            <div
              className="absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 translate-x-0 transition-transform right-0"
              id="overlay-right"
            >
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us </p>
              <button
                onClick={() => {
                  switchSignUpClick();
                }}
                className="rounded-2xl bg-transparent border border-white text-zinc-200 py-3 px-11 uppercase transition-transform"
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
