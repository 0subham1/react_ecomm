import React from "react";

const API_URL = "http://localhost:4000/";
const headersdata = {
  "Content-Type": "application/json",
};

export const signUp = async (data) => {
  await fetch(API_URL + "signUp", {
    method: "post",
    headers: headersdata,
    body: JSON.stringify(data),
  });
};
