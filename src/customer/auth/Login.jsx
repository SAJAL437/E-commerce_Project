import { TextField, Button,Snackbar, Alert } from "@mui/material";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, login } from "../../ReduxState/Auth/Action";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const handleCloseSnakbar=()=>setOpenSnackBar(false);
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  useEffect(() => {
    if (auth.user || auth.error) setOpenSnackBar(true);
  }, [auth.user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(login(userData));

    console.log("User Data:", userData);

    // Add form submission logic here (API call, state update, etc.)
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="grid gap-6">
        <TextField
          required
          id="email"
          name="email"
          label="Email"
          type="email"
          fullWidth
          autoComplete="email"
          variant="outlined"
        />

        <TextField
          required
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          autoComplete="current-password"
          variant="outlined"
        />

        <Button
          type="submit"
          variant="contained"
          className="!mt-4 bg-blue-500 hover:bg-blue-600 text-white"
          fullWidth
        >
          Login
        </Button>
      </form>

      <p className="mt-6 text-center text-gray-500">
        Don't have an account?{" "}
        <Button
          onClick={() => navigate("/register")}
          className="text-blue-500 hover:text-blue-600"
        >
          Register
        </Button>
      </p>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnakbar}
      >
        <Alert
          onClose={handleCloseSnakbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {auth.error ? auth.error : auth.user ? "Register Success" : ""}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
