import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { BASE_URL } from "../Const";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import RestoreIcon from "@mui/icons-material/Restore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import logo from "../img/logo.png";

const Header = ({ poke, poke2 }) => {
  let navigate = useNavigate();
  const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));

  const [style, setStyle] = useState("Sign In");
  const [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setLoading(false);
  };

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => {
    setShow2(false);
  };

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => {
    setShow3(false);
  };

  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    poke2 && setShow(true);
  }, [poke]);
  console.log(poke, poke2, "p poke2");
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
  const handleData = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSave = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      name: userInfo.name.toLocaleLowerCase(),
      password: userInfo.password,
    };
if(!data.name||!data.password){
  toast.error("Please fill both fields")
  return
}

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
          setLoading(false);
          handleClose();
        } else {
          toast.error("login unSuccessful");
          setLoading(false);
        }
      });
    } else if (style == "Sign Up") {
      axios.post(BASE_URL + "signUp", userInfo).then((res) => {
        console.log(res);
        if (res.data) {
          toast.success("SignUp successful");
          setLoading(false);
          handleClose();
        } else {
          toast.success("SignUp UnSuccessful");
          setLoading(false);
        }
      });
    } else {
      axios
        .put(BASE_URL + "editUser/" + localUserInfo._id, userInfo)
        .then((res) => {
          console.log(res);
          if (res.data.matchedCount > 0) {
            toast.success("user Updated");
            axios.get(BASE_URL + "user/" + localUserInfo._id).then((res) => {
              localStorage.setItem("localUserInfo", JSON.stringify(res.data));
            });
            handleClose();
            setLoading(false);
          } else {
            toast("user not updated");
            setLoading(false);
          }
        });
    }
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

      name: localUserInfo.name.toLocaleLowerCase(),
      phone: localUserInfo.phone,
      password: localUserInfo.password.toLocaleLowerCase(),
    });
  };

  const handleOrderHistory = () => {
    axios.get(BASE_URL + "userOrders/" + localUserInfo._id).then((res) => {
      console.log(res);
      setShow3(true);
      setOrderList(res.data);
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton={true}>{style}</Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSave}>
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
            ) : style == "Edit Profile" ? (
              <></>
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
                type="submit"
                style={{ width: "50%" }}
                variant="contained"
                onClick={handleSave}
              >
                Save
              </Button>
              <br />
              {loading && loading ? <LinearProgress /> : <></>}
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton={true}>Hello I am subham..</Modal.Header>

        <Modal.Body style={{ fontSize: "1.1rem" }}>
          <div> Welcome to my MERN app,</div>
          <div> Kindly Sign Up as random customer or login as</div>
          <div> userName: admin</div>
          <div>Password: 12</div>
          <hr />
          <div> (upgradation to NextJs in progress)</div>
        </Modal.Body>
      </Modal>

      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton={true}>
          {localUserInfo?.name}'s Order List
        </Modal.Header>

        <Modal.Body>
          <div width="100%">
            {orderList &&
              orderList.map((b, i) => {
                return (
                  <>
                    <div
                      style={{
                        border: "2px solid",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <div className="row1">
                        <div>{b.orderId}</div>
                        <div>{b.orderDate.substring(0, 10)}</div>
                        <div style={{ width: "100px", textAlign: "right" }}>
                          ₹ {b.total}
                        </div>
                      </div>
                    </div>
                    <br />
                  </>
                );
              })}
          </div>
        </Modal.Body>
      </Modal>

      <div className="row1 header" style={{ height: "70px" }}>
        <h4 className="row0">
          <span className="pointer" onClick={() => navigate("/")}>
            {" "}
            <img src={logo} width="50px" />{" "}
            <span className="navKeys">FoodCart</span>
          </span>
          <InfoIcon className="pointer" onClick={() => setShow2(true)} />
        </h4>

        <div style={{ display: "flex", alignItems: "center" }}>
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
                      onClick={() => handleOrderHistory()}
                      style={{ cursor: "pointer" }}
                    >
                      <b>
                        <RestoreIcon /> &nbsp;&nbsp;&nbsp;History
                      </b>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="cartDrop"
                      onClick={() => setShow2(true)}
                      style={{ cursor: "pointer", display: "none" }}
                    >
                      <b>
                        <ShoppingCartIcon /> &nbsp;&nbsp;&nbsp;Cart
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
