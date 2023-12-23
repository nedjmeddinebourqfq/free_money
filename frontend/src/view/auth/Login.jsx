import React, {useEffect, useState} from "react";
import Input from "../../component/forms/Input";
import {Link, useNavigate} from "react-router-dom";
import axiosInstance from "../../API/AxiosInstance";
import axios from "axios";

const Login = () => {
  const [companyLogo, setCompanyLogo] = useState();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get(
        "https://test.privateyebd.com/api/v1/utility/mobile/global_settings/"
      )
      .then((res) => {
        setCompanyLogo(res.data.data.results[0].logo_url);
      });
  }, []);

  console.log(companyLogo);

  const handleInputChange = (name, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const navigate = useNavigate();

  if (success) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginPost = await axiosInstance.post("auth/login/", loginData);
      // console.log(loginPost.data.data);
      const token = loginPost.data.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("login", true);
      let login = localStorage.getItem("login");
      if (login) {
        setSuccess(true);
      }
    } catch (error) {
      seterrMsg(
        error.response?.data?.errors?.email?.[0] ||
          error.response?.data?.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 w-100 bg-dark text-white d-flex align-items-center justify-content-center">
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <div className="login-card p-2 text-white">
          <div className="my-5 text-center">
            <img src={companyLogo} alt="" className="comlogo" />
          </div>
          {loading ? <p className="text-center">Loading...</p> : ""}
          {errMsg ? <p className="text-center bg-danger p-1">{errMsg}</p> : ""}
          <form action="" onSubmit={handleSubmit}>
            <Input
              type="email"
              id="login_email"
              placeholder="Email Address"
              required={true}
              onChange={(value) => handleInputChange("email", value)}
            />
            <Input
              type="password"
              id="login-pass"
              placeholder="Password"
              required={true}
              onChange={(value) => handleInputChange("password", value)}
            />

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Log In
            </button>
          </form>
          <div className="w-100 d-flex justify-content-center mt-3">
            <Link className="text-center" to="/sign-up">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
