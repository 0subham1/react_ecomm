import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { BASE_URL } from "../../Const";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  const [orderList2, setOrderList2] = useState([]);
  const [edit, setEdit] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    price: "",
    category: "",
    img: "",
    note: "",
  });

  const handleData = (e) => {
    setOrderInfo({
      ...orderInfo,
      [e.target.name]: e.target.value,
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setOrderInfo("");
    setEdit(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    axios.get(BASE_URL + "orders").then((res) => {
      console.log(res);
      res.data.reverse();
      setOrderList(res.data);
      setOrderList2(res.data);
    });
  };

  const columns = [
    {
      name: "OrderId",

      selector: (row) => row?.orderId,
    },
    {
      name: "Date",

      selector: (row) => row?.orderDate?.substring(0, 10),
    },
    {
      name: "User",

      selector: (row) => row?.userName,
    },

    // {
    //   name: "ACTION",
    //   selector: (row) => (
    //     <div>
    //       {/* <EditIcon onClick={() => handleEdit(row)} className="icon" /> */}
    //       &nbsp;
    //       <DeleteIcon onClick={() => handleDelete(row)} className="icon" />
    //     </div>
    //   ),
    // },
  ];

  const handleEdit = (row) => {
    setEdit(true);
    setShow(true);
    setOrderInfo({
      ...orderInfo,
      name: row.name,
      phone: row.phone,
      category: row.category,
      img: row.img,
      note: row.note,
      _id: row._id,
    });
  };

  const handleSearch = (search) => {
    const result = orderList2.filter((a) => {
      return (
        a.userName?.toLowerCase()?.match(search.toLowerCase()) ||
        a.orderId?.toLowerCase()?.match(search.toLowerCase())
      );
    });
    setOrderList(result);
  };

  const handleSave = () => {
    if (edit) {
      axios
        .put(BASE_URL + "editItem/" + orderInfo._id, orderInfo)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success("record Edited");
            handleClose();
            getOrders();
          } else {
            toast("edit failed");
          }
        });
    } else {
      axios.post(BASE_URL + "addItem", orderInfo).then((res) => {
        if (res.data) {
          toast.success("record added");
          handleClose();
          getOrders();
        } else {
          toast("add failed");
        }
      });
    }
  };

  console.log(orderInfo, "orderInfo");
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header id="modalHeader" closeButton={true}>
          {edit ? "EDIT" : "NEW"} ORDER
        </Modal.Header>

        <Modal.Body>
          <div className="q1">
            <div>
              <TextField
                variant="outlined"
                fullWidth={true}
                label="Name"
                name="name"
                value={orderInfo.name}
                onChange={(e) => handleData(e)}
              />
            </div>

            <br />
            <div>
              <TextField
                variant="outlined"
                label="Price"
                type="number"
                fullWidth={true}
                name="price"
                value={orderInfo.price}
                onChange={(e) => handleData(e)}
              />
            </div>

            <br />
            <div>
              <TextField
                fullWidth={true}
                variant="outlined"
                label="Category"
                name="category"
                value={orderInfo.category}
                onChange={(e) => handleData(e)}
              />
            </div>
            <br />
            <div>
              <TextField
                fullWidth={true}
                variant="outlined"
                label="Img"
                name="img"
                value={orderInfo.img}
                onChange={(e) => handleData(e)}
              />
            </div>
            <br />
            <div>
              <TextField
                fullWidth={true}
                variant="outlined"
                label="Note"
                name="note"
                value={orderInfo.note}
                onChange={(e) => handleData(e)}
              />
            </div>
          </div>
          <br />
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={handleSave}
              style={{ width: "50%" }}
            >
              Save
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <div style={{ width: "100%", paddingLeft: "5px" }}>
        <h3>Orders List</h3>
        <div className="row1">
          <TextField
            size="small"
            variant="outlined"
            label={<SearchRoundedIcon />}
            onChange={(e) => handleSearch(e.target.value)}
          />{" "}
          {/* <Button
              variant="contained"
              size="small"
              onClick={() => setShow(true)}
            >
              <AddIcon />
              New
            </Button> */}
        </div>
        {orderList.length > 0 ? (
          <DataTable
            columns={columns}
            data={orderList}
            fixedHeader
            pagination={true}
          />
        ) : (
          <CircularProgress />
        )}
      </div>
      <Toaster />
    </>
  );
};

export default Orders;
