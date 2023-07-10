import React from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Items from "./Admin/Items";
import Users from "./Admin/Users";
import Orders from "./Admin/Orders";
import AccessDenied from "./AccessDenied";
import Nav from "./Nav";
import Nav2 from "./Nav2";
const Routing = () => {
  const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));
  return (
    <>
      <Header />
      <Nav2 />
      <br />
      <div style={{ display: "flex" }}>
        {localUserInfo?.isAdmin ? <Nav /> : <></>}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="*" element={<Home />} />
          <Route
            exact
            path="/Items"
            element={localUserInfo?.isAdmin ? <Items /> : <AccessDenied />}
          />
          <Route
            exact
            path="/Users"
            element={localUserInfo?.isAdmin ? <Users /> : <AccessDenied />}
          />
          <Route
            exact
            path="/Orders"
            element={localUserInfo?.isAdmin ? <Orders /> : <AccessDenied />}
          />
        </Routes>
      </div>
    </>
  );
};

export default Routing;
