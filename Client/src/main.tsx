import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initializeApp } from "firebase/app";
import "./index.css";

//Importing Layouts
import Layout from "./Layouts/Layout";
import UserLayout from "./Layouts/UserLayout";

const firebaseConfig = {
  apiKey: "AIzaSyCU_N-5WYch81E0TWOVTFLZyofWXJ8MeeQ",
  authDomain: "kanbanboardplus.firebaseapp.com",
  projectId: "kanbanboardplus",
  storageBucket: "kanbanboardplus.appspot.com",
  messagingSenderId: "970924790017",
  appId: "1:970924790017:web:c542497045ef4b6b064b00",
  measurementId: "G-9SDYTNHV9B",
};

const firebaseApp = initializeApp(firebaseConfig);

//Loading routes asynchronously
const Dashboard = React.lazy(() => import("./pages/my/Dashboard"));
const TaskBoard = React.lazy(() => import("./pages/my/TaskBoard"));
const Login = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const Error = React.lazy(() => import("./pages/Error"));
//Initialising routes with correct corresponding components
const routes = (
  <>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Route>
    <Route path="/my" element={<UserLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="board/:group" element={<TaskBoard />} />
    </Route>
    <Route path="*" element={<Error />} />
  </>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>{routes}</Routes>
    </React.Suspense>
  </BrowserRouter>
);
