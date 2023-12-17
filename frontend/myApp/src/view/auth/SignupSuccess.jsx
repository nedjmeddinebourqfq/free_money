import React from "react";
import {Link} from "react-router-dom";

const SignupSuccess = () => {
  return (
    <div className="vh-100 w-100 bg-dark text-white d-flex align-items-center justify-content-center">
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <div className="login-card p-2 text-white">
          <h1 className="my-5 text-center">Registration Successful</h1>
          <div className="d-flex align-items-center justify-content-center">
            <Link className="text-center " to="/login">
              Login Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;
