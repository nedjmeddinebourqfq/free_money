import React, { useState, useEffect } from "react";
import Breadcrumb from "../../component/breadcrumb/Breadcrumb";
import axios from "axios";
import Input from "../../component/forms/Input";

const Profile = () => {
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
  return (
    <div className="profile-section">
      <div className="mb-5">
        <Breadcrumb directory1="Profile" />
      </div>
      <div className="row align-items-center">
        <div className="col-md-4 col-lg-3 col-xl-2 mb-3">
          <img
            style={{ height: "200px", width: "200px" }}
            src={profileData.image_url || ""}
            alt={profileData.username || ""}
            className="rounded-circle"
          />
        </div>
        <div className="col-md-8 col-lg-9 col-xl-10 mb-3">
          <div className="row">
            <div className="col-md-6">
              <Input
                type="text"
                placeholder="User Name"
                value={profileData.username || ""}
                disabled={true}
              />
              <Input
                type="text"
                placeholder="Email"
                value={profileData.email || ""}
                disabled={true}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="text"
                placeholder="Mobile No."
                value={profileData.mobile || ""}
                disabled={true}
              />
              <Input
                type="text"
                placeholder="Bio"
                value={profileData.bio || ""}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
