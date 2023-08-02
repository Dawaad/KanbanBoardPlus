import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

//Importing Layouts
import Layout from "./Layouts/Layout";
import UserLayout from "./Layouts/UserLayout";
//Loading routes asynchronously
const Dashboard = React.lazy(() => import("./pages/my/Dashboard"));
const TaskBoard = React.lazy(() => import("./pages/my/TaskBoard"));
const Login = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const Error = React.lazy(() => import("./pages/Error"));
//Initialising routes with correct corresponding components
const routes = (
  <>
    <Route>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Route>
    <Route path="/my" element={<UserLayout/>}>
      <Route  index element={<Dashboard />} />
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
