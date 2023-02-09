import React, { useEffect, useState } from "react";
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
import logo from "../img/logo.png";
const Header = () => {
  const [style, setStyle] = useState("Sign In");
  let navigate = useNavigate();
  const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));

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

  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const handleData = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSave = () => {
    const data = {
      name: userInfo.name,
      password: userInfo.password,
    };

    if (style == "Sign In") {
      axios.post(BASE_URL + "login", data).then((res) => {
        console.log(res);
        if (res.data.result) {
          localStorage.setItem("auth", JSON.stringify(res.data.auth));
          localStorage.setItem(
            "localUserInfo",
            JSON.stringify(res.data.result)
          );
          toast.success("login successful");
          window.location.href = "/";
        } else {
          toast.error("login unSuccessful");
        }
      });
    } else if (style == "Sign Up") {
      axios.post(BASE_URL + "signUp", userInfo).then((res) => {
        console.log(res);
        // localStorage.setItem("userInfo", JSON.stringify(result));
      });
    } else {
      axios
        .put(BASE_URL + "editUser/" + localUserInfo._id, userInfo)
        .then((res) => {
          console.log(res);
          if (res.data.matchedCount > 0) {
            toast.success("user Updated");
            localStorage.setItem("localUserInfo", JSON.stringify(userInfo));
            handleClose();
          } else {
            toast("user not updated");
          }
          // localStorage.setItem("userInfo", JSON.stringify(result));
        });
    }

    // console.log(result,"result")
  };

  const handleSignIn = () => {
    setShow(true);
    setStyle("Sign In");
  };

  const handleSignUp = () => {
    setShow(true);
    setStyle("Sign Up");
  };

  const handleProfile = () => {
    setShow(true);
    setStyle("Edit Profile");
    setUserInfo({
      ...userInfo,

      name: localUserInfo.name,
      phone: localUserInfo.phone,
      password: localUserInfo.password,
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div>{style}</div>
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
            {style == "Sign In" ? (
              <></>
            ) : (
              <>
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
              </>
            )}

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
          {style == "Sign In" ? (
            <h5
              style={{ textAlign: "center" }}
              className="hover"
              onClick={handleSignUp}
            >
              New Here? Sign Up
            </h5>
          ) : (
            <h5
              style={{ textAlign: "center" }}
              className="hover"
              onClick={handleSignIn}
            >
              already have an account? Sign In
            </h5>
          )}
          <br />
          <div style={{ textAlign: "center" }}>
            <Button
              style={{ width: "50%" }}
              variant="contained"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="row1 header" style={{ height: "70px" }}>
        <h4 onClick={() => navigate("/")} className="pointer">
          <img src={logo} width="50px" />
        </h4>
        <div style={{display:"flex",alignItems:"center"}}>
          {localUserInfo?.name}&nbsp;
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
      </div>
      <Toaster />
    </>
  );
};

export default Header;
