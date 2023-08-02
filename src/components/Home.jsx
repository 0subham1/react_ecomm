import React from "react";
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
import { Card } from "@mui/material";
import food from "../img/food.jpg";
import pizza from "../img/pizza.jpg";
import pizza2 from "../img/pizza2.jpg";
console.log(BASE_URL, "BASE_URL");

const Home = (props) => {
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

  return (
    <div style={{ width: "100%" }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton={true}>CART</Modal.Header>

        <Modal.Body style={{padding:"0px"}}>
          <Cart
            cartItemList={cartItemList}
            handleParentSetCart={handleParentSetCart}
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>

      <Carousel className="deskView" style={{ width: "100%" }}>
        <Carousel.Item>
          <img
            height="300px"
            src={pizza}
            style={{ width: "100%", objectFit: "cover" }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            height="300px"
            src={food}
            style={{ width: "100%", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            height="300px"
            src={pizza2}
            style={{ width: "100%", objectFit: "cover" }}
          />
        </Carousel.Item>
      </Carousel>

      <div className="row3" style={{ width: "100%" }}>
        <Card style={{ width: "70%" }} id="itemList">
          <h4 className="row0">
            <span id="toHide">Items</span>
            <span style={{ background: "white" }}>
              <TextField
                size="small"
                color="primary"
                variant="outlined"
                label={<SearchRoundedIcon />}
                placeholder="Search"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </span>
            <span id="responsiveCart" style={{ display: "none" }}>
              <Badge
                badgeContent={cartItemList?.length}
                color="primary"
                style={{ zIndex: "100" }}
              >
                {" "}
                <ShoppingCartIcon onClick={() => setShow(true)} />
              </Badge>
            </span>
          </h4>
          <div style={{ overflowY: "scroll", maxHeight: "87vh" }}>
            <Row>
              {list.length > 0 ? (
                list?.map((a, i) => {
                  return (
                    <Col>
                      <div
                        className="row0"
                        style={{
                          border: "2px solid",
                          borderRadius: "6px",
                          padding: "10px",
                          width: "22rem",
                        }}
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
                    </Col>
                  );
                })
              ) : (
                <CircularProgress />
              )}
            </Row>
          </div>
        </Card>

        <Card style={{ width: "30%" }} id="cart">
          <Cart
            cartItemList={cartItemList}
            handleParentSetCart={handleParentSetCart}
          />
        </Card>
      </div>
      <Toaster />
    </div>
  );
};

export default Home;
