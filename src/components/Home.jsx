import React from "react";

import { useEffect, useState } from "react";
import Select from "react-select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Modal } from "react-bootstrap";
import Button from "@mui/material/Button";

import {BASE_URL} from "../Const"


console.log(BASE_URL,"BASE_URL")

const Home = () => {
  const [list, setList] = useState([]);

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
      my first ..
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
