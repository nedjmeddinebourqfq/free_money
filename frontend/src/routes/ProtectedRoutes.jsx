import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoutes = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("login");
    if (!login) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      <Component />
    </div>
  );
};
