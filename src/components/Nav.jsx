import { Card } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import GradingIcon from "@mui/icons-material/Grading";
const Nav = ({ css }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card className={css}>
        <div onClick={() => navigate("/Items")} className="hover">
          <FastfoodIcon /> <span>Items</span>
        </div>
        <br />{" "}
        <div onClick={() => navigate("/Orders")} className="hover">
          <GradingIcon /> <span>Orders</span>
        </div>
        <br />
        <div onClick={() => navigate("/Users")} className="hover">
          <AccessibilityNewIcon /> <span>Users</span>
        </div>
      </Card>
    </>
  );
};

export default Nav;
