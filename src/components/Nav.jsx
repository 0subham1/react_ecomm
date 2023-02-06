import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <>
      <div  className="adminPanel">
        <h4>Admin Panel</h4>
        <br />
        <div onClick={() => navigate("/Items")} >Items</div>
        <br /> <div onClick={() => navigate("/Orders")}  >Orders</div>
        <br />
        <div onClick={() => navigate("/Users")}  >Users</div>
      </div>
    </>
  );
};

export default Nav;
