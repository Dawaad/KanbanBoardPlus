import React from "react";
import { useState } from "react";
import { TUser } from "../Types/FirebaseTypes";
import { BsFacebook, BsLinkedin, BsGithub, BsGoogle } from "react-icons/bs";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  Auth,
} from "firebase/auth";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import ISignIn from "../Interfaces/ISignIn";
import ISignUp from "../Interfaces/ISignUp";

function Login() {
  //React States and UseEffect Hooks
  const [signUpData, setSignUpData] = useState<ISignUp>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signInData, setSignInData] = useState<ISignIn>({
    email: "",
    password: "",
  });
  //Routing upon successful login
  const navigate = useNavigate();

  //Switching between sign in and sign up
  const switchLoginClick = () => {
    document
      .getElementById("container")
      ?.classList.remove("right-panel-active");
  };
  const switchSignUpClick = () => {
    document.getElementById("container")?.classList.add("right-panel-active");
  };

  const auth = getAuth();

  //Signin functions (3rd party will handle both signin and signup)

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((res) => {
        //Retrieving Google Access Token to Access Google API
        const credentials = GoogleAuthProvider.credentialFromResult(res);
        const token = credentials?.accessToken;

        //Retrieving User Info
        const user = res.user;

        //Send current user info to backend/redux store
        //Check to see if the google user is already in the database
        axios.get(`http://localhost:3000/api/users/${user.uid}`).then((res) => {
          if (res.data === false) {
            //If not, create a new user
            const firebaseUser: TUser = {
              uid: user.uid,
              email: user.email ? user.email : "",
              displayName: user.displayName ? user.displayName : "New User",
              photoURL: user.photoURL ? user.photoURL : "",
              assignedBoards: [],
            };
            axios.post("http://localhost:3000/api/auth/create_user", {
              user: firebaseUser,
            });
          }
        });
        //Redirect to Dashboard
        if (user) {
          navigate("/my", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        //Handle errors here
      });
  };

  const githubSignIn = async () => {};
  const emailSignIn = async () => {
    if (signInData.email && signInData.password) {
      signInWithEmailAndPassword(auth, signInData.email, signInData.password)
        .then((userCred) => {
          //Update Redux later probs
          navigate("/my", { replace: true });
        })
        .catch((error) => {
          // res.status(401).send(error.message)
          console.log(error.message);
        });
    }
  };
  const facebookSignIn = async () => {};

  //Signup functions
  const emailSignUp = async () => {
    createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password)
      .then((userCred) => {
        const user = userCred.user;
        updateProfile(user, {}).then(() => {
          const firebaseUser: TUser = {
            uid: user.uid,
            email: user.email ? user.email : "",
            displayName: user.displayName ? user.displayName : "New User",
            photoURL: user.photoURL ? user.photoURL : "",
            assignedBoards: [],
          };
          axios.post("http://localhost:3000/api/auth/create_user", {
            user: firebaseUser,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Really quick validation for sign up details - will change later
  const signUpDetailValidation = (
    e: React.FormEvent<HTMLFormElement>
  ): boolean => {
    e.preventDefault();
    return (
      signUpData.name.length > 0 &&
      signUpData.email.length > 0 &&
      signUpData.password.length > 7 &&
      signUpData.confirmPassword.length > 7 &&
      signUpData.password === signUpData.confirmPassword
    );
  };

  const signInDetailValidation = (
    e: React.FormEvent<HTMLFormElement>
  ): boolean => {
    e.preventDefault();
    return signInData.email.length > 0 && signInData.password.length > 7;
  };

  return (
    <>
      <div className="relative overflow-hidden h-[100dvh]" id="container">
        <div
          className="absolute top-0 bg-zinc-200 dark:bg-zinc-900 h-full transition-transform duration-[300ms] -left-1/3 w-2/3 opacity-0 z-[1] flex justify-center"
          id="sign-up-container"
        >
          <section className="flex justify-center items-center flex-col px-12 text-center h-full w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-800/80 dark:text-zinc-200">
              Sign Up
            </h1>
            <div className="my-5 flex space-x-8">
              <button
                onClick={() => {
                  googleSignIn();
                }}
                className="w-12 h-12 text-[45px] text-zinc-800/80 dark:text-zinc-200 hover:text-zinc-500 hover:dark:text-zinc-400 "
              >
                <BsGoogle />
              </button>
              <button className="text-[45px] text-zinc-800/80 dark:text-zinc-200 hover:text-zinc-500 hover:dark:text-zinc-400">
                <BsGithub />
              </button>

              <button className="text-[45px] text-zinc-800/80 dark:text-zinc-200 hover:text-zinc-500 hover:dark:text-zinc-400">
                <BsLinkedin />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                if (signUpDetailValidation(e)) {
                  emailSignUp();
                }
              }}
            >
              <div className=" p-4 flex w-full items-center">
                <p className="h-[1px] bg-zinc-800/80 dark:bg-zinc-200 w-full"></p>
                <span className="m-2 border py-2 px-3 rounded-full text-zinc-800 dark:text-zinc-200 md:text-lg">
                  Or
                </span>
                <p className="h-[1px] bg-zinc-800 dark:bg-zinc-200 w-full"></p>
              </div>

              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSignUpData({ ...signUpData, name: e.target.value });
                }}
                className="p-3 bg-zinc-300/90 dark:bg-zinc-200 w-full my-2 rounded-xl placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-800"
                type="text"
                placeholder="Name"
                name="name"
              />
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSignUpData({ ...signUpData, email: e.target.value });
                }}
                className="p-3 bg-zinc-300/90 dark:bg-zinc-200 w-full my-2 rounded-xl placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-800"
                type="email"
                placeholder="Email"
                name="email"
              />
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSignUpData({ ...signUpData, password: e.target.value });
                }}
                className={`p-3 bg-zinc-300/70 dark:bg-zinc-200 w-full my-2 rounded-xl placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-800  `}
                type="password"
                placeholder="Password"
                name="password"
              />
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSignUpData({
                    ...signUpData,
                    confirmPassword: e.target.value,
                  });
                }}
                className="p-3 bg-zinc-300/70 dark:bg-zinc-200 w-full my-2 rounded-xl placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-800"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
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
          </section>
        </div>
        <div
          className="absolute top-0 h-full transition-transform duration-300 left-0 w-2/3 z-[2] bg-zinc-200 dark:bg-zinc-900 flex justify-center"
          id="sign-in-container"
        >
          <section className=" flex justify-center items-center flex-col px-12 text-center h-full w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-800/80 dark:text-zinc-200">
              Login to Your Account
            </h1>
            <div className="my-5 flex space-x-8">
              <button
                onClick={() => {
                  googleSignIn();
                }}
                className="text-[45px] text-zinc-800/80 dark:text-zinc-200 hover:text-zinc-500 hover:dark:text-zinc-400"
              >
                <BsGoogle />
              </button>
              <button className="text-[45px] text-zinc-800/80 dark:text-zinc-200 hover:text-zinc-500 hover:dark:text-zinc-400">
                <BsGithub />
              </button>

              <button className="text-[45px] text-zinc-800/80 dark:text-zinc-200 hover:text-zinc-500 hover:dark:text-zinc-400">
                <BsLinkedin />
              </button>
            </div>
            <form
              className=""
              onSubmit={(e) => {
                if (signInDetailValidation(e)) {
                  emailSignIn();
                }
              }}
            >
              <div className=" p-4 flex w-full items-center">
                <p className="h-[1px] bg-zinc-800/80 dark:bg-zinc-200 w-full"></p>
                <span className="m-2 border py-2 px-3 rounded-full text-zinc-800 dark:text-zinc-200 md:text-lg">
                  Or
                </span>
                <p className="h-[1px] bg-zinc-800 dark:bg-zinc-200 w-full"></p>
              </div>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSignInData({ ...signInData, email: e.target.value });
                }}
                className="p-3 bg-zinc-300/90 dark:bg-zinc-200 w-full my-2 rounded-xl placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-800"
                type="email"
                placeholder="Email"
              />
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSignInData({ ...signInData, password: e.target.value });
                }}
                className="p-3 bg-zinc-300/70 dark:bg-zinc-200 w-full my-2 rounded-xl placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-800"
                type="password"
                placeholder="Password"
              />
              <button className="p-4 text-zinc-700 dark:text-zinc-500 hover:underline hover:dark:text-zinc-400">
                Forgot your password?
              </button>
              <div className="space-y-2 flex flex-col justify-center items-center group">
                <button
                  type="submit"
                  className=" rounded-2xl bg-gradient-to-tr from-blue-400 to-blue-900 text-zinc-200 mb-2 py-3 px-11 uppercase transition-all hover:scale-[1.02]"
                >
                  Sign In
                </button>

                <p className="h-[1px] bg-zinc-700/80 dark:bg-zinc-300/70 w-3/4 scale-0 transition-all origin-right duration-[200ms] group-hover:scale-100"></p>
                <p className="h-[1px] bg-zinc-700/80 dark:bg-zinc-300/70 w-1/2 scale-0 transition-all origin-left duration-[400ms] group-hover:scale-100"></p>
                <p className="h-[1px] bg-zinc-700/80 dark:bg-zinc-300/70 w-1/4 scale-0 transition-all origin-center duration-[600ms] group-hover:scale-100"></p>
              </div>
            </form>
          </section>
        </div>
        <div
          className="absolute top-0 left-2/3 w-1/3 h-[60rem]  overflow-hidden transition-transform duration-300 z-[100]"
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
