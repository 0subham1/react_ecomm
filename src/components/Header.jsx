import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { BASE_URL } from "../Const";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import RestoreIcon from "@mui/icons-material/Restore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import logo from "../img/log.png";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import GradingIcon from "@mui/icons-material/Grading";
import { isMobile } from "react-device-detect";
import CircularProgress from "@mui/material/CircularProgress";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Header = ({ poke, poke2 }) => {
  let navigate = useNavigate();
  const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));

  const [style, setStyle] = useState("Sign In");
  const [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [showPass, setShowPass] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setLoading(false);
    setUserInfo({});
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
      width: isMobile ? "50vw" : "20vw",
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
      [e.target.name]: e.target.value.toString().toLowerCase(),
    });
  };
  console.log(userInfo, "userInfo");
  const handleSaveUser = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      name: userInfo?.name,
      phone: userInfo?.phone,
      password: userInfo.password,
    };
    if (!data.name) {
      toast.error("Please add name");
      setLoading(false);
      return;
    }
    if (!data.phone && !style == "Sign In") {
      setLoading(false);
      toast.error("Please add phone");
      return;
    }
    if (!data.password) {
      setLoading(false);
      toast.error("Please add password");
      return;
    }

    if (style == "Sign In") {
      axios
        .post(BASE_URL + "login", data)
        .then((res) => {
          console.log(res);
          if (res.data.result) {
            setUserInfo({});

            let obj = JSON.parse(JSON.stringify(res.data.result));
            obj.password = "";
            localStorage.setItem("auth", JSON.stringify(res.data.auth));
            localStorage.setItem("localUserInfo", JSON.stringify(obj));
            toast.success("login successful");
            window.location.href = "/";
            setLoading(false);
            handleClose();
          } else {
            toast.error("login unSuccessful");
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(
            err?.response?.data ? err?.response?.data : "action unsuccessful"
          );
        });
    } else if (style == "Sign Up") {
      axios
        .post(BASE_URL + "signUp", userInfo)
        .then((res) => {
          console.log(res);
          if (res.data) {
            console.log(res.data, "res.ddd");
            let obj = JSON.parse(JSON.stringify(res.data));
            obj.password = "";
            setUserInfo(obj);
            console.log(obj, "obj");

            localStorage.setItem("localUserInfo", JSON.stringify(obj));
            window.location.href = "/";
            toast.success("SignUp successful");
            setLoading(false);
            handleClose();
          } else {
            toast.success("SignUp UnSuccessful");
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(
            err?.response?.data ? err?.response?.data : "action unsuccessful"
          );
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
              setUserInfo(res.data);
            });
            handleClose();
            setLoading(false);
          } else {
            toast("user not updated");
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(
            err?.response?.data ? err?.response?.data : "action unsuccessful"
          );
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
    setShow3(true);
    axios.get(BASE_URL + "userOrders/" + localUserInfo._id).then((res) => {
      console.log(res);
      setOrderList(res.data);
    });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header id="modalHeader" closeButton={true}>
            {style}
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={handleSaveUser}>
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
                        type="number"
                        fullWidth={true}
                        name="phone"
                        value={userInfo.phone}
                        onChange={(e) => handleData(e)}
                      />
                    </div>
                  </>
                )}

                <br />
                <div className="row0">
                  <TextField
                    fullWidth={true}
                    variant="outlined"
                    label="Password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    value={userInfo.password}
                    onChange={(e) => handleData(e)}
                  />
                  <VisibilityIcon
                    className="pointer"
                    onClick={() => setShowPass(!showPass)}
                  />
                </div>
              </div>
              <br />
              {style == "Sign In" ? (
                <h5
                  style={{ textAlign: "center" }}
                  className="pointer"
                  onClick={handleSignUp}
                >
                  New Here? Sign Up
                </h5>
              ) : style == "Edit Profile" ? (
                <></>
              ) : (
                <h5
                  style={{ textAlign: "center" }}
                  className="pointer"
                  onClick={handleSignIn}
                >
                  already have an account? Sign In
                </h5>
              )}
              <br />
              <div style={{ textAlign: "center" }}>
                {localUserInfo?.isAdmin ? (
                  <></>
                ) : (
                  <Button
                    type="submit"
                    style={{ width: "50%" }}
                    variant="contained"
                    onClick={handleSaveUser}
                  >
                    {loading ? (
                      <CircularProgress size={30} style={{ color: "white" }} />
                    ) : (
                      "Save"
                    )}
                  </Button>
                )}

                <br />
              </div>
            </form>
          </Modal.Body>
        </Modal>

        <Modal show={show3} onHide={handleClose3}>
          <Modal.Header id="modalHeader" closeButton={true}>
            {localUserInfo?.name}'s Order List{" "}
            {!orderList?.length > 0 && "Loading.."}
          </Modal.Header>

          <Modal.Body style={{ padding: "0px" }}>
            <div width="100%">
              {orderList &&
                orderList?.map((b, i) => {
                  return (
                    <>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <div
                            style={{
                              width: "98%",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>{b.orderId}</div>
                            <div>{b.orderDate.substring(0, 10)}</div>

                            <div
                              style={{
                                width: isMobile ? "20vw" : "100px",
                                textAlign: "right",
                              }}
                            >
                              ₹ {b.total}
                            </div>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <h5 id="homeHeader" style={{ padding: "10px" }}>
                            Items:
                          </h5>
                          {b.itemList.map((x) => {
                            return (
                              <div className="row1">
                                <div
                                  style={{
                                    width: isMobile ? "30vw" : "100px",
                                    textAlign: "left",
                                  }}
                                >
                                  {x.name}
                                </div>
                                <div>x{x.qty}</div>
                                <div
                                  style={{
                                    width: isMobile ? "20vw" : "100px",
                                    textAlign: "right",
                                  }}
                                >
                                  ₹{x.price}
                                </div>
                              </div>
                            );
                          })}
                        </AccordionDetails>
                      </Accordion>

                      {/* <div className="card0">
                        <div className="row1">
                          <div>{b.orderId}</div>
                          <div>{b.orderDate.substring(0, 10)}</div>
                          <div style={{ width: "100px", textAlign: "right" }}>
                            ₹ {b.total}
                          </div>
                        </div>
                      </div> */}
                      <br />
                    </>
                  );
                })}
            </div>
          </Modal.Body>
        </Modal>
      </>

      <div className="row1 card0" id="homeHeader" style={{ height: "70px" }}>
        <h4 className="row1">
          <span className="pointer">
            {" "}
            {/* <Link
              href="https://play.google.com/store/apps/details?id=com.greenplay.ecomm"
              onClick={() => {
                alert("Redirecting to Playstore");
              }}
            ></Link> */}
            <img src={logo} width="50px" />{" "}
            <span className="navKeys" onClick={() => navigate("/")}>
              FoodCart
            </span>
          </span>
        </h4>

        <div style={{ display: "flex", alignItems: "center" }}>
          {localUserInfo?.name}&nbsp;
          <div>
            {localUserInfo ? (
              <Dropdown id="drop">
                <Dropdown.Toggle>
                  <PersonIcon />
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
                        <RestoreIcon /> &nbsp;&nbsp;&nbsp;Orders
                      </b>
                    </Dropdown.Item>

                    <hr />

                    {!isMobile && localUserInfo?.isAdmin && (
                      <Dropdown.Item
                        onClick={() => navigate("/Items")}
                        style={{ cursor: "pointer" }}
                      >
                        <b>
                          <FastfoodIcon /> &nbsp;&nbsp;&nbsp;Items List
                        </b>
                      </Dropdown.Item>
                    )}
                    {!isMobile && localUserInfo?.isAdmin && (
                      <Dropdown.Item
                        onClick={() => navigate("/Orders")}
                        style={{ cursor: "pointer" }}
                      >
                        <b>
                          <GradingIcon /> &nbsp;&nbsp;&nbsp;Orders List
                        </b>
                      </Dropdown.Item>
                    )}
                    {!isMobile && localUserInfo?.isAdmin && (
                      <Dropdown.Item
                        onClick={() => navigate("/Users")}
                        style={{ cursor: "pointer" }}
                      >
                        <b>
                          <AccessibilityNewIcon /> &nbsp;&nbsp;&nbsp;Users List
                        </b>
                      </Dropdown.Item>
                    )}

                    {!isMobile && localUserInfo?.isAdmin && <hr />}
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
                  style={{ cursor: "pointer" }}
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
