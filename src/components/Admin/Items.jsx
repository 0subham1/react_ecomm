import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { BASE_URL } from "../../Const";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { CircularProgress, Grid } from "@mui/material";
import { isMobile } from "react-device-detect";
import Swal from "sweetalert2";

const Items = () => {
  const [loading, setLoading] = useState(false);

  const [itemList, setItemList] = useState([]);
  const [itemList2, setItemList2] = useState([]);
  const [edit, setEdit] = useState(false);
  const [itemInfo, setItemInfo] = useState({
    name: "",
    price: "",
    category: "",
    note: "",
  });
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

  const handleSave = () => {
    setLoading(true);
    if (!itemInfo.name) {
      toast.error("Please add name");
      setLoading(false);
      return;
    }

    if (!itemInfo.price) {
      setLoading(false);
      toast.error("Please add price");
      return;
    }

    if (edit) {
      axios
        .put(BASE_URL + "editItem/" + itemInfo._id, itemInfo)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success("record Edited");
            handleClose();
            setLoading(false);

            getItems();
          } else {
            setLoading(false);

            toast.error("edit failed");
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
        .post(BASE_URL + "addItem", itemInfo)
        .then((res) => {
          if (res.data) {
            setLoading(false);
            toast.success("record added");
            handleClose();
            getItems();
          } else {
            toast.error("add failed");
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
  const handleData = (e) => {
    setItemInfo({
      ...itemInfo,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    {
      name: "NAME",

      selector: (row) => row?.name?.toLowerCase(),
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
          <DeleteIcon
            onClick={() => handleDeleteConfirm(row)}
            className="icon"
          />
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
      category: "breakfast",
      note: row.note,
      _id: row._id,
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

  const handleDeleteConfirm = (row) => {
    Swal.fire({
      title: "Delete " + row.name + "?",
      text: "",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      width: isMobile ? "50vw" : "20vw",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(row);
      }
    });
  };

  console.log(itemInfo, "itemInfo");
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header id="modalHeader" closeButton={true}>
          {edit ? "EDIT" : "ADD"} ITEM
        </Modal.Header>

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
              {loading ? (
                <CircularProgress size={30} style={{ color: "white" }} />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <div style={{ width: "100%", paddingLeft: "5px" }} className="card0">
        <Grid container spacing={1} className="rowSpaceBetween">
          <Grid item>
            <h3>Item List </h3>
          </Grid>
          <Grid item>
            {" "}
            <TextField
              size="small"
              style={{ width: isMobile ? "200px" : "" }}
              variant="outlined"
              label={<SearchRoundedIcon />}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Grid>
          <Grid item>
            {" "}
            <Button
              variant="contained"
              size="small"
              onClick={() => setShow(true)}
            >
              <AddIcon />
              New
            </Button>
          </Grid>
        </Grid>

        {itemList.length > 0 ? (
          <DataTable
            columns={columns}
            data={itemList}
            fixedHeader
            pagination={isMobile ? false : true}
          />
        ) : (
          <CircularProgress />
        )}
      </div>
      <Toaster />
    </>
  );
};

export default Items;
