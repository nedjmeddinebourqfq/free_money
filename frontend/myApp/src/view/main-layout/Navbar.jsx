import React, { useEffect, useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { FiUser } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import DropMenu from "../../component/Dropdown/DropMenu";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = (props) => {
  const [profileData, setProfileData] = useState([]);
  const token = `Token ${localStorage.getItem("token")}`;
  useEffect(() => {
    axios
      .get("https://test.privateyebd.com/api/v1/auth/profile/", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setProfileData(res.data.data);
      });
  }, [token]);

  const [toggle, setToggle] = useState(false);

  // Function to toggle the sidebar
  const handleSidebarToggle = (e) => {
    e.stopPropagation(); // Prevent event propagation
    setToggle(!toggle);
    props.onToggle();
  };
  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    localStorage.setItem("activeMenuId", 1);
  };

  return (
    <nav className="navbar-container p-3 bg-dark text-light mx-auto d-flex align-items-center justify-content-between">
      <div className="menu-and-search-section d-flex align-items-center">
        <div>
          <CgMenuGridR
            className="fs-2 c-pointer"
            onClick={handleSidebarToggle}
          />
        </div>
      </div>
      <div className="profile-and-notification-section d-flex align-items-center">
        <div className="position-relative">
          <DropMenu
            buttonLabel={
              <div className="d-flex align-items-center">
                <img
                  style={{ maxHeight: "40px" }}
                  className="img-thumbnail me-2 p-0"
                  src={profileData.image_url}
                  alt="user"
                />
                <div className="d-flex flex-column align-items-start text-white">
                  <span>{profileData.username}</span>
                  <span className="fw-normal">Role</span>
                </div>
              </div>
            }
          >
            <div className="d-flex flex-column position-absolute p-3 border shadow-sm rounded-2 drop-menu-profile">
              <Link
                to="/profile"
                className="d-flex align-items-center text-default"
              >
                <FiUser className="fs-15" />
                <span className="ms-2 fs-15 ">Profile</span>
              </Link>
              <Link
                to="/login"
                className="d-flex align-items-center text-default"
                onClick={handleSignout}
              >
                <MdOutlineLogout className="fs-15" />
                <span className="ms-2 fs-15">Signout</span>
              </Link>
            </div>
          </DropMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
