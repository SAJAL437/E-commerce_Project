import { Box, Fade, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Register from "./Register";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import { useSelector } from "react-redux";

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

const AuthModel = ({ handleClose, open }) => {
  const location = useLocation();
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    if (auth.user) handleClose();
  }, [auth.user]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {location.pathname === "/login" ? <Login /> : <Register />}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModel;
