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

import Tooltip from "@mui/material/Tooltip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Badge from "@mui/material/Badge";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";





const Cart = (props) => {

  console.log(props,"props")
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState("");

  const [cartItemList, setCartItemList] = useState(props.cartItemList);

useEffect(()=>{
setCartItemList([...cartItemList,props.cartItemList])

},[props])

  

  const handleSave = () => {
    const data = {
      itemList: cartItemList,
      userId: "63d0e3c0d5fb5a7eabae3ab6",
      userName: "subham",
      orderDate: new Date(),
      subTotal:subTotal,
      total:total,
      tax:tax,
    };
    axios.post(BASE_URL + "addOrder", data).then((res) => {
      console.log(res);
    });

    console.log(data, "data");
  };
  const handleClearCart = () => {
    setCartItemList([]);
  };

  useEffect(() => {
    let sum = 0;
    cartItemList.map((a) => {
      sum = sum + a.price;
    });
    setSubTotal(sum);
    setTax(0.05 * sum);
    setTotal(tax + sum);

    console.log(cartItemList, "cartItemList");
  }, [cartItemList]);


  return (
  <>
  
  
  
  <div>
          <h4 style={{ textAlign: "center" }}>
            CART{" "}
            <Badge badgeContent={cartItemList?.length} color="primary">
              <Tooltip title="Clear Cart">
                <RemoveShoppingCartIcon
                  style={{ cursor: "pointer", color: "tomato" }}
                  onClick={handleClearCart}
                />
              </Tooltip>
            </Badge>
          </h4>
          <div style={{ overflowY: "scroll", height: "50vh", padding: "10px" }}>
            {cartItemList &&
              cartItemList.map((a, i) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "300px",
                        justifyContent: "space-between",
                        border: "2px solid",
                        borderRadius: "6px",
                        padding: "10px",
                      }}
                    >
                      <div>
                        <div style={{ width: "150px" }}>{a.name}</div>
                        <div>Qty: {a.qty}</div>
                        <div>Price: {a.price}</div>
                      </div>
                      <Button
                        variant="contained"
                        size="small"
                        // onClick={() => handleAddToCart(a, i)}
                      >
                        add
                      </Button>
                    </div>
                    <br />
                  </>
                );
              })}
          </div>
          <br />

          <div>
            <div className="row1">
              <div>SubTotal:</div>
              <div>{subTotal}</div>
            </div>
            <div className="row1">
              <div>Taxes:</div>
              <div>{tax}</div>
            </div>
            <div className="row1">
              <div>Total:</div>
              <div>{total}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                size="small"
                style={{ width: "50%" }}
                onClick={() => handleSave()}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
  
  
  
  
  
  
  
  
  </>
  )
}

export default Cart