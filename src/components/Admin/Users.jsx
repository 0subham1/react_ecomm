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
import { isMobile } from "react-device-detect";
import Swal from "sweetalert2";
const Users = () => {
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userList2, setUserList2] = useState([]);
  const [edit, setEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    password: "",
  });

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
    axios
      .get(BASE_URL + "users")
      .then((res) => {
        console.log(res);
        res.data.reverse();
        setUserList(res.data);
        setUserList2(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(
          err?.response?.data ? err?.response?.data : "action unsuccessful"
        );
      });
  };

  const columns = [
    {
      name: "NAME",

      selector: (row) => row?.name?.toLowerCase(),
    },
    {
      name: "PHONE",

      selector: (row) => row?.phone,
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
    setUserInfo({
      ...userInfo,
      name: row.name,
      phone: row.phone,
      _id: row._id,
    });
  };

  const handleDelete = (row) => {
    console.log(row, "row");

    if (row.isAdmin) {
      toast.error(" admin cant be deleted!");
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

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(BASE_URL + "editUser/" + userInfo._id, userInfo)
      .then((res) => {
        console.log(res);
        if (res.data.matchedCount > 0) {
          toast.success("user Updated");
          getUsers();
          handleClose();
          setLoading(false);
        } else {
          toast("user not updated");
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(
          err?.response?.data ? err?.response?.data : "action unsuccessful"
        );
      });
  };

  const handleData = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value.toString().toLowerCase(),
    });
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

  console.log(userInfo, "userInfo");
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header id="modalHeader" closeButton={true}>
          {edit ? "EDIT" : "NEW"} USER
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSave}>
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
                  label="Phone"
                  type="number"
                  fullWidth={true}
                  name="phone"
                  value={userInfo.phone}
                  onChange={(e) => handleData(e)}
                />
              </div>

              <br />
              <div className="row0">
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  label="Password"
                  name="password"
                  // type={showPass ? "text" : "password"}
                  value={userInfo.password}
                  onChange={(e) => handleData(e)}
                />
                {/* <VisibilityIcon
                  className="pointer"
                  onClick={() => setShowPass(!showPass)}
                /> */}
              </div>
            </div>
            <br />
            <div style={{ textAlign: "center" }}>
              <Button
                type="submit"
                style={{ width: "50%" }}
                variant="contained"
                onClick={handleSave}
              >
                {loading ? (
                  <CircularProgress size={30} style={{ color: "white" }} />
                ) : (
                  "Edit User"
                )}
              </Button>
            </div>

            <br />
          </form>
        </Modal.Body>
      </Modal>

      <div style={{ width: "100%", paddingLeft: "5px" }} className="card0">
        {isMobile && <h3>Users List </h3>}
        <div className="row1">
          {!isMobile && <h3>Users List </h3>}

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
        </div>

        {userList.length > 0 ? (
          <DataTable
            columns={columns}
            data={userList}
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

export default Users;
