import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Const";

import axios from "axios";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";

import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import { BottomNavigation } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Badge from "@mui/material/Badge";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Card } from "@mui/material";

const Cart = (props) => {
  console.log(props, "props");

  const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));

  let aa = localStorage?.getItem("localCart");
  let LC;
  if (aa) {
    LC = JSON?.parse(localStorage?.getItem("localCart"));
  } else {
    LC = [];
    localStorage.setItem("localCart", []);
  }

  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState("");

  const [cartItemList, setCartItemList] = useState(
    props?.cartItemList ? props?.cartItemList : LC
  );

  useEffect(() => {
    setCartItemList(props.cartItemList);
  }, [props?.cartItemList]);

  useEffect(() => {
    localStorage.setItem("localCart", JSON.stringify(cartItemList));
    props?.handleParentSetCart(cartItemList);
    console.log(cartItemList, "cartItemList cart");
  }, [cartItemList]);

  const handleSave = () => {
    const data = {
      itemList: cartItemList,
      userId: localUserInfo._id,
      userName: localUserInfo.name,
      orderDate: new Date(),
      subTotal: subTotal,
      total: total,
      tax: tax,
    };
    axios.post(BASE_URL + "addOrder", data).then((res) => {
      console.log(res);
      if (res.data) {
        toast.success("Order placed successfully");
        handleClearCart();
        props.handleClose();
      } else {
        toast("error in placing order");
      }
    });

    console.log(data, "data");
  };
  const handleClearCart = () => {
    setCartItemList([]);
    localStorage.setItem("localCart", []);
  };

  useEffect(() => {
    let sum = 0;
    cartItemList &&
      cartItemList.map((a) => {
        sum = sum + a.finalPrice;
      });
    setSubTotal(sum);
    setTax(0.05 * sum);
    setTotal(tax + sum);

    console.log(cartItemList, "cartItemList");
  }, [cartItemList, tax, subTotal]);

  const handleRemoveItem = (i) => {
    let arr = [...cartItemList];
    arr.splice(i, 1);
    setCartItemList(arr);
  };

  const handleChangeQty = (e, i, type) => {
    const deepCopy = JSON.parse(JSON.stringify(cartItemList));
    const obj = [...deepCopy];

    if (type == "add") {
      obj[i].qty += 1;
    }
    if (type == "sub" && obj[i].qty > 1) {
      obj[i].qty -= 1;
    }
    obj[i].finalPrice = obj[i].qty * obj[i].price;
    setCartItemList(obj);
  };

  return (
    <>
      <div id="cartOuterBox">
        <h4 className="row0 navKeys">
          <span>CART</span>
          <Badge
            badgeContent={cartItemList?.length}
            color="primary"
            style={{ zIndex: "100" }}
          >
            <Tooltip title="Clear Cart">
              <RemoveShoppingCartIcon
                style={{ cursor: "pointer", color: "tomato" }}
                onClick={handleClearCart}
              />
            </Tooltip>
          </Badge>
        </h4>
        <div
          id="cartBox"
          style={{ overflowY: "auto", height: "60vh", padding: "10px" }}
        >
          {cartItemList?.length > 0
            ? cartItemList &&
              cartItemList.map((a, i) => {
                return (
                  <>
                    <div
                      style={{
                        border: "2px solid",
                        borderRadius: "6px",
                        padding: "10px",
                      }}
                      id="cartDiv"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h5 style={{ width: "150px" }}>{a.name}</h5>{" "}
                        <CancelIcon
                          className="icon"
                          onClick={() => handleRemoveItem(i)}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "end",
                        }}
                      >
                        <div>
                          <div>Qty: {a.qty}</div>
                          <div>Price: {a.price}</div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <RemoveCircleIcon
                            className="icon"
                            onClick={(e) => handleChangeQty(e, i, "sub")}
                          />
                          &nbsp;
                          <AddCircleIcon
                            className="icon"
                            onClick={(e) => handleChangeQty(e, i, "add")}
                          />
                        </div>{" "}
                      </div>
                    </div>
                    <br />
                  </>
                );
              })
            : "No Items added yet"}
        </div>
        <br />

        <Card>
          <div className="row1">
            <div>SubTotal:</div>
            <div>{subTotal}</div>
          </div>
          <div className="row1">
            <div>Taxes (5%):</div>
            <div>{Number(tax)?.toFixed(2)}</div>
          </div>
          <h5 className="row1">
            <div>Total:</div>
            <div>₹ {total}</div>
          </h5>
          <div style={{ textAlign: "center" }} className="row4">
            <Button
              variant="contained"
              size="small"
              style={{ width: "50%" }}
              onClick={() => handleSave()}
            >
              Order
            </Button>
            <Badge
              className="mobileView"
              badgeContent={cartItemList?.length}
              color="primary"
              style={{ zIndex: "100" }}
            >
              <Tooltip title="Clear Cart">
                <RemoveShoppingCartIcon
                  style={{ cursor: "pointer", color: "tomato" }}
                  onClick={handleClearCart}
                />
              </Tooltip>
            </Badge>
          </div>
        </Card>
      </div>
      <Toaster />
    </>
  );
};

export default Cart;
