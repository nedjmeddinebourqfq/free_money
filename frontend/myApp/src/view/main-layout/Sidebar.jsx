import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {AiOutlineHome} from "react-icons/ai";
import {MdOutlinePayments, MdPeople, MdEmojiPeople} from "react-icons/md";
import {LiaSitemapSolid} from "react-icons/lia";
import {TbMovie} from "react-icons/tb";
import {FaRegSquareFull} from "react-icons/fa6";
import {GiCash} from "react-icons/gi";
import axios from "axios";

const Sidebar = ({toggle}) => {
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
      title: "Movie",
      icon: TbMovie,
      path: "/movie",
    },
    {
      id: 5,
      title: "Cashout",
      icon: GiCash,
      path: "/cashout",
    },
    {
      id: 6,
      title: "Balance",
      icon: GiCash,
      path: "/balance",
    },
    {
      id: 7,
      title: "Users",
      icon: MdEmojiPeople,
      path: "/user",
    },

    {
      id: 8,
      title: "Site Info",
      icon: LiaSitemapSolid,
      path: "/site-info",
    },
  ]);
  const [companyLogo, setCompanyLogo] = useState();
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const activeMenuId = localStorage.getItem("activeMenuId");

    axios
      .get(
        "https://test.privateyebd.com/api/v1/utility/mobile/global_settings/"
      )
      .then((res) => {
        setCompanyLogo(res.data.data.results[0]);
      });

    setActiveIndex(activeMenuId ? parseInt(activeMenuId) : 1);
    let login = localStorage.getItem("login");
    if (!login) {
      setActiveIndex(1);
    }
  }, []);

  if (!companyLogo) {
    return;
  }
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
          <img
            src={companyLogo.logo_url}
            alt=""
            className={
              toggle
                ? "m-0 icon-scale-logo img-fluid"
                : "sidenav-comlogo  img-fluid"
            }
          />
          {/* <img src={companyLogo} alt="" className="img-fluid " /> */}
          {/* <span className={toggle ? "d-none" : "fs-4 ms-2"}>
            {companyLogo.site_name}
          </span> */}
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
