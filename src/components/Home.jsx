import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Const";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import axios from "axios";
import { Col, Modal, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import TextField from "@mui/material/TextField";

import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

import Cart from "./Cart";
import Carousel from "react-bootstrap/Carousel";
import food from "../img/food.jpg";
import pizza from "../img/pizza.jpg";
import pizza2 from "../img/pizza2.jpg";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { isMobile } from "react-device-detect";
console.log(BASE_URL, "BASE_URL");

const Home = (props) => {
  let inputRef = useRef();
  const localUserInfo = JSON?.parse(localStorage.getItem("localUserInfo"));

  let aa = localStorage?.getItem("localCart");
  let LC;
  if (aa) {
    LC = JSON?.parse(localStorage?.getItem("localCart"));
  } else {
    LC = [];
    localStorage.setItem("localCart", []);
  }

  const [cartItemList, setCartItemList] = useState(LC);
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get(BASE_URL + "items").then((res) => {
      if (res.data) {
        console.log(res);
        setList(res.data);
        setList2(res.data);
      }
    });
  };

  const handleParentSetCart = (cart) => {
    setCartItemList(cart);
  };

  const handleAddToCart = (item) => {
    var deepCopy = JSON.parse(JSON.stringify(item));
    let exist = cartItemList?.some((a) => a._id === item._id);
    if (!exist) {
      deepCopy.qty = 1;
      deepCopy.finalPrice = deepCopy.price;
      setCartItemList([...cartItemList, deepCopy]);
    }
  };

  const handleSearch = (search) => {
    const result = list2.filter((a) => {
      return (
        a.name.toLowerCase().match(search.toLowerCase()) ||
        a.category.toLowerCase().match(search.toLowerCase())
      );
    });
    setList(result);
  };

  useEffect(() => {
    console.log(cartItemList, "cartItemList");
  }, [cartItemList]);
  console.log(inputRef, "inputRef");

  const handleRef = () => {
    inputRef.current.focus();
    inputRef.current.value = "subham";
    inputRef.current.style.color = "red";
    inputRef.current.style.display = "none";
  };
  return (
    <div style={{ width: "100%" }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header id="modalHeader" closeButton={true}>
          CART
        </Modal.Header>

        <Modal.Body style={{ padding: "10px" }}>
          <Cart
            cartItemList={cartItemList}
            handleParentSetCart={handleParentSetCart}
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>

      <div className="row1">
        <div style={{ width: "70%", height: "75vh  " }} id="itemList">
          <h4 className="row1">
            <span id="toHide">Items</span>

            {/* <input
              ref={inputRef}
              onChange={(e) => console.log(e)}
              defaultValue="subham"
              value=""
            />

            <button onClick={() => handleRef()}>ref btn</button> */}
            <div>
              <TextField
                variant="outlined"
                size="small"
                label={<SearchRoundedIcon />}
                placeholder="Search"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <span id="responsiveCart" style={{ display: "none" }}>
              <Badge
                className="pointer"
                badgeContent={cartItemList?.length}
                color="primary"
                style={{ zIndex: "100" }}
              >
                {" "}
                <ShoppingCartIcon onClick={() => setShow(true)} />
              </Badge>
            </span>
          </h4>
          <div
            style={{ overflowY: "scroll", overflowX: "hidden", height: "65vh" }}
          >
            <Box>
              <Grid
                container
                spacing={1}
                id="webItemListGrid"
                // style={{ justifyContent: "space-around" }}
              >
                {list.length > 0 ? (
                  list?.map((a, i) => {
                    return (
                      <Grid item>
                        <div
                          className="row1 card0 "
                          id={isMobile ? "mobItemListCard" : "webItemListCard"}
                        >
                          <img
                            src={a?.img == "" || a.img == null ? food : a.img}
                            width="100px"
                            height="100px"
                            style={{ borderRadius: "15px" }}
                          />

                          <div>
                            <div>{a.name}</div>
                            <div>Price: {a.price}</div>
                          </div>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() =>
                              localUserInfo
                                ? handleAddToCart(a, i)
                                : props.handlePoke(true)
                            }
                          >
                            add
                          </Button>
                        </div>
                      </Grid>
                    );
                  })
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "20px",
                    }}
                  >
                    Items Loading.. <CircularProgress />
                  </div>
                )}
              </Grid>
            </Box>
          </div>
        </div>

        <div className="card0" style={{ width: "30%" }} id="cart">
          <Cart
            cartItemList={cartItemList}
            handleParentSetCart={handleParentSetCart}
            handleClose={handleClose}
          />
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Home;
