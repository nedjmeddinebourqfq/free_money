import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import {
  MdOutlinePayments,
  MdPeople,
  MdOutlinePeopleAlt,
  MdEmojiPeople,
} from "react-icons/md";
import { LiaSitemapSolid } from "react-icons/lia";
import { TbMovie } from "react-icons/tb";
import { FaRegSquareFull } from "react-icons/fa6";

const Sidebar = ({ toggle }) => {
  const [menuItems] = useState([
    {
      id: 1,
      title: "Dashboard",
      icon: AiOutlineHome,
      path: "/",
    },
    {
      id: 2,
      title: "Payment Method",
      icon: MdOutlinePayments,
      path: "/payment-method",
    },
    {
      id: 3,
      title: "Offer Partners",
      icon: MdPeople,
      path: "/admin-partner",
    },
    {
      id: 4,
      title: "Mobile Partners",
      icon: MdOutlinePeopleAlt,
      path: "/mobile-partner",
    },

    {
      id: 5,
      title: "Movie",
      icon: TbMovie,
      path: "/movie",
    },
    {
      id: 6,
      title: "Users",
      icon: MdEmojiPeople,
      path: "/user",
    },
    {
      id: 7,
      title: "Site Info",
      icon: LiaSitemapSolid,
      path: "/site-info",
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const activeMenuId = localStorage.getItem("activeMenuId");

    setActiveIndex(activeMenuId ? parseInt(activeMenuId) : 1);
  }, []);

  const toggleSubMenu = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
    localStorage.setItem("activeMenuId", activeIndex === id ? null : id);
  };

  return (
    <nav
      className={`sidebar bg-dark text-light ${
        toggle ? "sidebar-hide" : "sidebar-show"
      }`}
    >
      {/* <img src={Logo} alt="privateye" style={{ height: "100px" }} /> */}
      <div className="logo-wrapper">
        <h2 className="text-center">
          <FaRegSquareFull
            className={toggle ? "me-0 icon-scale-logo" : "me-2"}
          />
          <span className={toggle ? "d-none" : ""}>Logo</span>
        </h2>
      </div>
      <div className="menu-items-wrapper">
        <ul className="menu-ul px-3">
          {menuItems.map((menuItem) => (
            <li key={menuItem.id}>
              <Link
                to={menuItem.path}
                className={`menu-item text-light ${
                  activeIndex === menuItem.id ? "menu-active" : ""
                }`}
                onClick={() => {
                  toggleSubMenu(menuItem.id);
                }}
              >
                {React.createElement(menuItem.icon, {
                  className: `${toggle ? "icon-scale" : ""}`,
                })}
                <div className={`menu-title ${toggle ? "d-none" : ""}`}>
                  {menuItem.title}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;