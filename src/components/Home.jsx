import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Const";

import axios from "axios";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";

import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";

import Tooltip from "@mui/material/Tooltip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Badge from "@mui/material/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Cart from "./Cart";

import Nav from "./Nav";

console.log(BASE_URL, "BASE_URL");

const Home = () => {
  let localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));

  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState("");

  const [cartItemList, setCartItemList] = useState([]);
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get(BASE_URL + "items").then((res) => {
      console.log(res);
      setList(res.data);
    });
  };

  const handleAddToCart = (a, i) => {
    let obj = {};
    if (cartItemList.length == 0) {
      a.qty = 1;
      console.log("case0");
      setCartItemList([...cartItemList, a]);
    } else {
      cartItemList.map((c, j) => {
        if (c._id == a._id) {
          console.log("case1");
          return (c.qty = c.qty + 1);
        } else {
          a.qty = 1;
          return setCartItemList([...cartItemList, a]);
          console.log("case2");
        }
      });
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="dark">
          {list &&
            list.map((a, i) => {
              return (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      // width: "400px",
                      justifyContent: "space-between",
                      border: "2px solid",
                      borderRadius: "6px",
                      padding: "10px",
                    }}
                  >
                    <div>
                      <img
                        src={a.img}
                        width="100px"
                        height="100px"
                        style={{ borderRadius: "15px" }}
                      />
                    </div>
                    &nbsp;
                    <div>
                      <div>{a.name}</div>
                      <div>{a.price}</div>
                    </div>
                    <Button variant="contained" size="small">
                      add
                    </Button>
                  </div>
                  <br />
                </>
              );
            })}
        </Modal.Body>
      </Modal>
      <div className="row2" style={{ width: "100%" }}>
        <div>
          <h4>Items</h4>
          <div
            style={{ overflowY: "scroll", maxHeight: "83vh", padding: "10px" }}
          >
            {list &&
              list.map((a, i) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "400px",
                        justifyContent: "space-between",
                        border: "2px solid",
                        borderRadius: "6px",
                        padding: "10px",
                      }}
                    >
                      <div>
                        <img
                          src={a.img}
                          width="100px"
                          height="100px"
                          style={{ borderRadius: "15px" }}
                        />
                      </div>
                      <div>
                        <div style={{ width: "150px" }}>{a.name}</div>
                        <div>Price: {a.price}</div>
                      </div>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleAddToCart(a, i)}
                      >
                        add
                      </Button>
                    </div>
                    <br />
                  </>
                );
              })}
          </div>
        </div>

        <div style={{ width: "360px" }}>
         <Cart cartItemList={cartItemList}/>
        </div>
      </div>
    </>
  );
};

export default Home;
