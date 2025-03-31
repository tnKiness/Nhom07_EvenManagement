import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./nav/Nav";
import Sidebar from "./Nav/Sidebar";
import { useSelector } from "react-redux";

const LayoutAdmin = () => {
  const auth = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.role === "ROLE_ADMIN") {
      window.location.href = "/";
    }
  }, [auth, navigate]);

  if (!auth?.role === "ROLE_ADMIN") {
    return null;
  }

  return (
    <div className="wrapper">
      <Nav />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8 pt-4 overflow-x-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
