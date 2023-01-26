import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Private = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("userInfo");
  return auth ? <Outlet /> : navigate("/signUp");
};

export default Private;
