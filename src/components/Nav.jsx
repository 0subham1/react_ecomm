import { Card } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import GradingIcon from '@mui/icons-material/Grading';
const Nav = () => {
  const navigate = useNavigate();
  return (
    <>
      <Card className="adminPanel">
        <h4 className="darky navKeys">Admin Panel</h4>
        <br />
        <div onClick={() => navigate("/Items")} className="hover">
         <FastfoodIcon/> <span className="navKeys">Items</span>
        </div>
        <br />{" "}
        <div onClick={() => navigate("/Orders")} className="hover">
         <GradingIcon/>  <span className="navKeys">Orders</span>
        </div>
        <br />
        <div onClick={() => navigate("/Users")} className="hover">
         <AccessibilityNewIcon/> <span className="navKeys">Users</span> 
        </div>
      </Card>
    </>
  );
};

export default Nav;
