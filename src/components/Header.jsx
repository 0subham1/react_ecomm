import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {Modal} from "react-bootstrap";
import Button from "@mui/material/Button";

const Header = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };



  return (
    <>
     <Modal show={show} onHide={handleClose}>
        <Modal.Body>
helllos

        </Modal.Body>

        
      </Modal>
    <div className="row header" style={{ height:"50px" }}>
      <div onClick={() => navigate("/")}>home</div>
    
      <div onClick={() => setShow(true)}>signUp</div>
    </div>
   
    </>
  );
};

export default Header;
