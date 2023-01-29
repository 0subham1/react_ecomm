import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {signUp} from "../service/apiService"
import toast,{Toaster} from "react-hot-toast"

const SignUp = () => {
  const API_URL = "http://localhost:4000/";
  const [userInfo, setuserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleData = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    }); 
  };

  const handleSave = async () => {
    let result = await fetch(API_URL + "signUp", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
    result=await result.json()
    if(result){
      toast.success("success")
      toast.error()
    }
    localStorage.setItem("userInfo", JSON.stringify(result));
    // console.log(result,"result")
  };

// const handleSave=()=>{
//  signUp(userInfo)
// }


  console.log(API_URL + "signUp");
  console.log(userInfo, "userInfo");

  return (
    <>
      <table>
        <tr>
          <td>name</td>
          <td>
            <input
              name="name"
              value={userInfo.name}
              onChange={(e) => handleData(e)}
            />
          </td>
        </tr>
        <tr>
          <td>email</td>
          <td>
            <input
              name="email"
              value={userInfo.email}
              onChange={(e) => handleData(e)}
            />
          </td>
        </tr>
        <tr>
          <td>password</td>
          <td>
            <input
              name="password"
              value={userInfo.password}
              onChange={(e) => handleData(e)}
            />
          </td>
        </tr>
        <tr></tr>
      </table>
      <Button size="small" variant="contained" onClick={handleSave}>
        Save
      </Button>
      <Toaster/>
    </>
  );
};

export default SignUp;
