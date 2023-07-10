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

const Users = () => {
  const [userList, setUserList] = useState([]);
  const [userList2, setUserList2] = useState([]);
  const [edit, setEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    price: "",
    category: "",
    img: "",
    note: "",
  });

  const handleData = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setUserInfo("");
    setEdit(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios.get(BASE_URL + "users").then((res) => {
      console.log(res);
      res.data.reverse();
      setUserList(res.data);
      setUserList2(res.data);
    });
  };

  const columns = [
    {
      name: "NAME",

      selector: (row) => row?.name,
    },
    {
      name: "PHONE",

      selector: (row) => row?.phone,
    },
    {
      name: "PASSWORD",

      selector: (row) => row?.password,
    },
    {
      name: "isAdmin",

      selector: (row) => (row?.isAdmin ? "true" : ""),
    },

    {
      name: "ACTION",
      selector: (row) => (
        <div>
          {/* <EditIcon onClick={() => handleEdit(row)} className="icon" /> */}
          &nbsp;
          <DeleteIcon onClick={() => handleDelete(row)} className="icon" />
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    setEdit(true);
    setShow(true);
    setUserInfo({
      ...userInfo,
      name: row.name,
      phone: row.phone,
      category: row.category,
      img: row.img,
      note: row.note,
      _id: row._id,
    });
  };

  const handleDelete = (row) => {
    console.log(row, "row");

    if (row.isAdmin) {
      toast("Sorry admin cant be deleted!");
      return;
    } else {
      axios.delete(BASE_URL + "deleteUser/" + row._id).then((res) => {
        if (res.data) {
          toast.success("record deleted");
          handleClose();
          getUsers();
        } else {
          toast("delete failed");
        }
      });
    }
  };

  const handleSearch = (search) => {
    const result = userList2.filter((a) => {
      return a.name.toLowerCase().match(search.toLowerCase());
    });
    setUserList(result);
  };

  const handleSave = () => {
    if (edit) {
      axios.put(BASE_URL + "editItem/" + userInfo._id, userInfo).then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("record Edited");
          handleClose();
          getUsers();
        } else {
          toast("edit failed");
        }
      });
    } else {
      axios.post(BASE_URL + "addItem", userInfo).then((res) => {
        if (res.data) {
          toast.success("record added");
          handleClose();
          getUsers();
        } else {
          toast("add failed");
        }
      });
    }
  };

  console.log(userInfo, "userInfo");
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <h5>{edit ? "EDIT" : "NEW"} ITEM</h5>
          <br />
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

            <br />
            <div>
              <TextField
                variant="outlined"
                label="Price"
                type="number"
                fullWidth={true}
                name="price"
                value={userInfo.price}
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
                value={userInfo.category}
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
                value={userInfo.img}
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
                value={userInfo.note}
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
        <h3>Users List</h3>
        <div className="row1">
          <TextField
            size="small"
            variant="outlined"
            label={<SearchRoundedIcon />}
            onChange={(e) => handleSearch(e.target.value)}
          />{" "}
          <Button
            variant="contained"
            size="small"
            onClick={() => setShow(true)}
          >
            <AddIcon />
            New
          </Button>
        </div>
        <DataTable columns={columns} data={userList} fixedHeader />
      </div>
      <Toaster />
    </>
  );
};

export default Users;
