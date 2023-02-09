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
const Routing = () => {
  const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        {localUserInfo?.isAdmin ? <Nav /> : <></>}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="*" element={<Home />} />
          {localUserInfo?.isAdmin ? (
            <>
              <Route exact path="/Items" element={<Items />} />
              <Route exact path="/Users" element={<Users />} />
              <Route exact path="/Orders" element={<Orders />} />
            </>
          ) : (
            <>
              <Route exact path="/Items" element={<AccessDenied />} />
              <Route exact path="/Users" element={<AccessDenied />} />
              <Route exact path="/Orders" element={<AccessDenied />} />
            </>
          )}
        </Routes>
      </div>
      <div
        className="darky"
        style={{
          height: "30px",
          bottom: "0",
          position: "sticky",
          width: "100%",
        }}
      ></div>
    </>
  );
};

export default Routing;
