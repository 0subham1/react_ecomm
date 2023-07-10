import { Card } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import GradingIcon from '@mui/icons-material/Grading';
const Nav2 = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="row1 mobileView" >
        <div onClick={() => navigate("/Items")} className="hover">
         <FastfoodIcon/> <span >Items</span>
        </div>
     
        <div onClick={() => navigate("/Orders")} className="hover">
         <GradingIcon/>  <span >Orders</span>
        </div>
    
        <div onClick={() => navigate("/Users")} className="hover">
         <AccessibilityNewIcon/> <span >Users</span> 
        </div>
      </div>
    </>
  );
};

export default Nav2;
