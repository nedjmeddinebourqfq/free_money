import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import {} from "../../assets/style/mainLayout.css";

const MainLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const SidebarSwap = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <div className="position-relative d-flex">
      <div className={`sidebar-area ${sidebarToggle ? "sidebar-area-sm" : ""}`}>
        <Sidebar toggle={sidebarToggle} />
      </div>
      <div
        className={`nav-and-content-area ${
          sidebarToggle ? "w-content-sm" : ""
        }`}
      >
        <div className="nav-wrapper">
          <Navbar onToggle={SidebarSwap} />
        </div>
        <div className="p-3 content-area text-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
