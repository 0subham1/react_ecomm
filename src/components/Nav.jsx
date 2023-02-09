import { Card } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <>
      <Card className="adminPanel">
        <h4 className="darky">Admin Panel</h4>
        <br />
        <div onClick={() => navigate("/Items")} className="hover">
          Items
        </div>
        <br />{" "}
        <div onClick={() => navigate("/Orders")} className="hover">
          Orders
        </div>
        <br />
        <div onClick={() => navigate("/Users")} className="hover">
          Users
        </div>
      </Card>
    </>
  );
};

export default Nav;
