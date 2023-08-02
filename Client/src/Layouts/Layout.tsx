import React from "react";
import { Link, Outlet } from "react-router-dom";
function Layout({children}: { children: React.ReactNode }) {
  return (
    <div>
      <div className="container min-h-full mx-auto">{children}</div>

      <div className="container min-h-full mx-auto">
        {children ? children : <Outlet></Outlet>}
      </div>
    </div>
  );
}

export default Layout;
