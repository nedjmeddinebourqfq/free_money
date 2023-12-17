import React, {useEffect, useState} from "react";
import Input from "../../component/forms/Input";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../API/AxiosInstance";
import axios from "axios";

const Signup = ({verifyMail}) => {
  const [registerData, setRegisterData] = useState({role: 1});
  const handleInputChange = (name, value) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(registerData);
  const [loading, setLoading] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const navigate = useNavigate();
  const [companyLogo, setCompanyLogo] = useState();

  useEffect(() => {
    axios
      .get(
        "https://test.privateyebd.com/api/v1/utility/mobile/global_settings/"
      )
      .then((res) => {
        setCompanyLogo(res.data.data.results[0].logo_url);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("auth/signup/", registerData);
      console.log(response);
      verifyMail(response.data.data.email);
      navigate("/signup-successful");
    } catch (error) {
      seterrMsg(
        error.response?.data?.errors?.email?.[0] ||
          error.response?.data?.errors?.username?.[0] ||
          error.response?.data?.errors?.mobile?.[0] ||
          error.response?.data?.errors?.confirm_password?.[0] ||
          error.response?.data?.message
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="vh-100 w-100 bg-dark text-white d-flex align-items-center justify-content-center">
      <div className="col-12 col-md-10 col-lg-8">
        <div className="login-card p-2 text-white">
          <div className="my-5 text-center">
            <img src={companyLogo} alt="" className="comlogo" />
          </div>
          {loading ? <p className="text-center">Loading...</p> : ""}
          {errMsg ? <p className="text-center bg-danger p-1">{errMsg}</p> : ""}
          <form action="" className="row flex-wrap" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <Input
                type="text"
                placeholder="User Name"
                onChange={(value) => handleInputChange("username", value)}
              />
            </div>

            <div className="col-md-6">
              <Input
                type="email"
                placeholder="Email"
                onChange={(value) => handleInputChange("email", value)}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="text"
                placeholder="Mobile"
                onChange={(value) => handleInputChange("mobile", value)}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="password"
                placeholder="Password"
                onChange={(value) => handleInputChange("password", value)}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="password"
                placeholder="Confirm Password"
                onChange={(value) =>
                  handleInputChange("confirm_password", value)
                }
              />
            </div>
            <div className="col-md-6">
              <button className="btn btn-primary w-100" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
