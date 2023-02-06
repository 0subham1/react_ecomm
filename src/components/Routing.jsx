import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Items from "./Admin/Items";
import Users from "./Admin/Users";
import Orders from "./Admin/Orders";
import Nav from "./Nav";
const Routing = () => {
  return (
    <>
      <Header />
      <div style={{display:"flex"}}>
      <Nav/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="*" element={<Home />} />
        <Route exact path="/Items" element={<Items />} />
        <Route exact path="/Users" element={<Users />} />
        <Route exact path="/Orders" element={<Orders />} />
        
      </Routes>

      </div>
    </>
  );
};

export default Routing;
