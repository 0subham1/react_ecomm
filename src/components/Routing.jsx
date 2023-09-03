import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Items from "./Admin/Items";
import Users from "./Admin/Users";
import Orders from "./Admin/Orders";
import AccessDenied from "./AccessDenied";
import Nav from "./Nav";
const Routing = () => {
  const [poke, setPoke] = useState(false);
  const [poke2, setPoke2] = useState(false);
  const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));

  const handlePoke = (a) => {
    console.log(a, "key");
    setPoke(!poke);
    setPoke2(a);
  };
  return (
    <>
      <Header poke={poke} poke2={poke2} />

      {localUserInfo?.isAdmin ? <Nav css="row1 card0 mobileView" /> : <></>}
  
      <div className="card0" style={{ display: "flex",height:"80vh" }}>
        {localUserInfo?.isAdmin ? <Nav css="card0 adminPanel deskView" /> : <></>}

        <Routes>
          <Route exact path="/" element={<Home handlePoke={handlePoke} />} />
          <Route exact path="*" element={<Home handlePoke={handlePoke} />} />
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
