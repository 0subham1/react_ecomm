import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { BASE_URL } from "../Const";
import axios from "axios";

import Select from "react-select";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import RestoreIcon from "@mui/icons-material/Restore";

const Header = () => {
  let navigate = useNavigate();
  let localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));

  let localCart;
  let LC;
  if (LC) {
    localCart = JSON.parse(LC);
  } else {
    localCart = [];
  }

  const [cartItemList, setCartItemList] = useState(localCart);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: " Logout ?",
      text: "",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = "/";
      }
    });
  };

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
    let result = await fetch(BASE_URL + "signUp", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
    result = await result.json();
    if (result) {
      toast.success("success");
      toast.error();
    }
    localStorage.setItem("userInfo", JSON.stringify(result));
    // console.log(result,"result")
  };

  const handleSignIn = () => {
    setShow(true);
  };

  const handleProfile = () => {
    setShow(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div>SignUp</div>
          <br />
          <div className="q1">
            <div>
              <TextField
                variant="outlined"
                fullWidth={true}
                label="Name"
                name="name"
                value={userInfo.name}
                onChange={(e) => handleData(e)}
              />
            </div>

            <br />
            <div>
              <TextField
                variant="outlined"
                label="Phone"
                fullWidth={true}
                name="phone"
                value={userInfo.phone}
                onChange={(e) => handleData(e)}
              />
            </div>

            <br />
            <div>
              <TextField
                fullWidth={true}
                variant="outlined"
                label="Password"
                name="password"
                value={userInfo.password}
                onChange={(e) => handleData(e)}
              />
            </div>
          </div>
          <br />
          <div style={{textAlign:"center"}}>
            <Button size="medium" variant="contained" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="row1 header" style={{ height: "70px" }}>
        <h4 onClick={() => navigate("/")}>Home</h4>

        <div className="dropBtn">
          {localUserInfo ? (
            <Dropdown className="skyBtn">
              <Dropdown.Toggle className="skyBtn">
                <PersonIcon style={{ color: "white" }} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <>
                  <Dropdown.Item
                    onClick={handleProfile}
                    style={{ cursor: "pointer" }}
                  >
                    <b>
                      <PersonIcon /> &nbsp;&nbsp;&nbsp;Profile
                    </b>
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() =>
                      navigate("/orderHistory", { state: localCart })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <b>
                      <RestoreIcon /> &nbsp;&nbsp;&nbsp;History
                    </b>
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    <b>
                      <LogoutIcon /> &nbsp;&nbsp;&nbsp;Logout
                    </b>
                  </Dropdown.Item>
                </>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <PersonIcon
                onClick={handleSignIn}
                style={{ cursor: "pointer", color: "white" }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
