import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  return (
    <div className="row header" style={{ height:"50px" }}>
      <div onClick={() => navigate("/")}>home</div>
      <div onClick={() => navigate("/signUp")}>signUp</div>
    </div>
  );
};

export default Header;
