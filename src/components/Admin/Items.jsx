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
const Items = () => {
  const [itemList, setItemList] = useState([]);
  const [itemList2, setItemList2] = useState([]);
  const [edit, setEdit] = useState(false);
  const [itemInfo, setItemInfo] = useState({
    name: "",
    price: "",
    category: "",
    img: "",
    note: "",
  });

  const handleData = (e) => {
    setItemInfo({
      ...itemInfo,
      [e.target.name]: e.target.value,
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setItemInfo("");
    setEdit(false);
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    axios.get(BASE_URL + "items").then((res) => {
      console.log(res);
      res.data.reverse();
      setItemList(res.data);
      setItemList2(res.data);
    });
  };

  const columns = [
    {
      name: "NAME",

      selector: (row) => row.name,
    },
    {
      name: "CATEGORY",

      cell: (row) => row?.category,
    },
    {
      name: "PRICE",
      selector: (row) => row.price,
    },
    {
      name: "ACTION",
      selector: (row) => (
        <div>
          <EditIcon onClick={() => handleEdit(row)} className="icon" />
          &nbsp;
          {/* <DeleteIcon onClick={() => handleDelete(row)} className="icon" /> */}
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    setEdit(true);
    setShow(true);
    setItemInfo({
      ...itemInfo,
      name: row.name,
      price: row.price,
      category: row.category,
      img: row.img,
      note: row.note,
      _id: row._id,
    });
  };

  const handleDelete = (row) => {
    console.log(row, "row");
    axios.delete(BASE_URL + "deleteItem/" + row._id).then((res) => {
      if (res.data) {
        toast.success("record deleted");
        handleClose();
        getItems();
      } else {
        toast("edit failed");
      }
    });
  };

  const handleSearch = (search) => {
    const result = itemList2.filter((a) => {
      return (
        a.name.toLowerCase().match(search.toLowerCase()) ||
        a.category.toLowerCase().match(search.toLowerCase()) ||
        a.price.toString().match(search.toLowerCase())
      );
    });
    setItemList(result);
  };

  const handleClicked = () => {};

  const handleSave = () => {
    if (edit) {
      axios.put(BASE_URL + "editItem/" + itemInfo._id, itemInfo).then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("record Edited");
          handleClose();
          getItems();
        } else {
          toast("edit failed");
        }
      });
    } else {
      axios.post(BASE_URL + "addItem", itemInfo).then((res) => {
        if (res.data) {
          toast.success("record added");
          handleClose();
          getItems();
        } else {
          toast("add failed");
        }
      });
    }
  };

  console.log(itemInfo, "itemInfo");
  return (
    <>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton={true}>{edit ? "EDIT" : "NEW"} ITEM</Modal.Header>

        <Modal.Body>
          <div className="q1">
            <div>
              <TextField
                variant="outlined"
                fullWidth={true}
                label="Name"
                name="name"
                value={itemInfo.name}
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
                value={itemInfo.price}
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
                value={itemInfo.category}
                onChange={(e) => handleData(e)}
              />
            </div>
            <br />
            <div>
              <TextField
                fullWidth={true}
                variant="outlined"
                label="Img Src"
                name="img"
                value={itemInfo.img}
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
                value={itemInfo.note}
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

      <div style={{ width: "100%" }}>
        <h3>Item List</h3>
        <div className="row1">
          <TextField
            size="small"
            variant="outlined"
            label={<SearchRoundedIcon />}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => setShow(true)}
          >
            <AddIcon />
            New
          </Button>
        </div>
        {itemList.length > 0 ? (
          <DataTable columns={columns} data={itemList} fixedHeader />
        ) : (
          <CircularProgress />
        )}
      </div>
      <Toaster />
    </>
  );
};

export default Items;
