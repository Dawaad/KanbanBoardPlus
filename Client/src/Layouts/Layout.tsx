import React from "react";
import { Link, Outlet } from "react-router-dom";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="">{children ? children : <Outlet></Outlet>}</div>
    </div>
  );
}

export default Layout;
