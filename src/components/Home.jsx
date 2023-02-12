import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Const";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

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
import Carousel from "react-bootstrap/Carousel";

import Nav from "./Nav";
import { Card } from "@mui/material";
import food from "../img/food.jpg";
import pizza from "../img/pizza.jpg";
import pizza2 from "../img/pizza2.jpg";
console.log(BASE_URL, "BASE_URL");

const Home = () => {
  const localUserInfo = JSON?.parse(localStorage.getItem("localUserInfo"));

  let aa = localStorage?.getItem("localCart");
  let LC;
  if (aa) {
    LC = JSON?.parse( localStorage?.getItem("localCart"));
  } else {
    LC = [];
    localStorage.setItem("localCart",[]);
  }

  const [loading, setLoading] = useState(false);
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
    setLoading(true)
    axios.get(BASE_URL + "items").then((res) => {
      if(res.data){
        setLoading(false)
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
        <Modal.Body className="dark">
          <Cart
            cartItemList={cartItemList}
            handleParentSetCart={handleParentSetCart}
          />
        </Modal.Body>
      </Modal>

      <Carousel style={{ width: "100%" }}>
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

      <div className="row2" style={{ width: "100%" }}>
        <Card style={{ margin: "10px", width: "400px" }} id="itemList">
          <h4
            className="darky"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <span>Items</span>
            <span>
              <SearchRoundedIcon />
              <input
                label={<SearchRoundedIcon />}
                className="darky"
                style={{ width: "200px" }}
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
            {loading?<CircularProgress/>:<></>}
            {list &&
              list.map((a, i) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",

                        justifyContent: "space-between",
                        border: "2px solid",
                        borderRadius: "6px",
                        padding: "10px",
                      }}
                    >
                      <div>
                        <img
                          src={a?.img ? a.img : food}
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
                        onClick={() =>
                          localUserInfo
                            ? handleAddToCart(a, i)
                            : toast("Kindly Login")
                        }
                      >
                        add
                      </Button>
                    </div>
                    <br />
                  </>
                );
              })}
          </div>
        </Card>

        <Card style={{ margin: "10px", width: "350px" }} id="cart">
          <Cart
            cartItemList={cartItemList}
            handleParentSetCart={handleParentSetCart}
          />
        </Card>
      </div>
    </div>
  );
};

export default Home;
