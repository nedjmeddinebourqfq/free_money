import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/AxiosInstance";

const AccoutVerification = (props) => {
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("auth/account/verify/", {
        email: props.emailProps,
        code: code,
      });
      console.log(response);
      navigate("/login");
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
          <h4 className="my-5 text-center">Compnay Logo</h4>
          <p className="text-center p-2 bg-white text-dark">
            Verification code has been sent to {props.emailProps}
          </p>
          {loading ? <p className="text-center">Loading...</p> : ""}
          {errMsg ? <p className="text-center bg-danger p-1">{errMsg}</p> : ""}
          <form action="">
            <div className="mb-3">
              <label className="form-label">Code</label>
              <input
                type="text"
                className="form-control"
                placeholder="Code"
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary w-100"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccoutVerification;
