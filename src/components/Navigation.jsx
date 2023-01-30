import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import SignUp from "./SignUp";
import Private from "./Private";

const navigation = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<Private />}>
          <Route exact path="/" element={<Home />} />
        </Route>
        
        <Route exact path="/signUp" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default navigation;