import React from "react";

import { useEffect, useState } from "react";
import Select from "react-select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import  Modal  from "react-bootstrap/Modal";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { BASE_URL } from "../Const";

console.log(BASE_URL, "BASE_URL");

const Home = () => {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(BASE_URL + "prodList", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    setList(result);
    console.log(result, "result");
  };

  return (
    <>
      <Modal open={show} onClose={handleClose}>
        <Box sx={style}>hello</Box>
      </Modal>

      <span onClick={() => setShow(true)}>click</span>
      {list &&
        list.map((a, i) => {
          return (
            <table>
              <tr
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "400px",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <img
                    src={a.img}
                    width="100px"
                    height="100px"
                    style={{ borderRadius: "15px" }}
                  />
                </div>
                &nbsp;
                <div>
                  {" "}
                  <div>{a.name}</div>
                  <div>
                    {
                      <RadioGroup
                        row
                        aria-label="gender"
                        name="row-radio-buttons-group"
                        // value={a.}
                        // onChange={handleTypeChange}
                      >
                        <FormControlLabel
                          value="full"
                          control={<Radio size="small" />}
                          label="full"
                        />
                        <FormControlLabel
                          value="half"
                          control={<Radio size="small" />}
                          label="half"
                        />
                      </RadioGroup>
                    }
                  </div>
                </div>
                <Button variant="contained" size="small">
                  add
                </Button>
              </tr>
            </table>
          );
        })}
    </>
  );
};

export default Home;
