import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUser, register } from "../../ReduxState/Auth/Action";
import { useEffect, useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleClose = () => setOpenSnackBar(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  useEffect(() => {
    if (auth.user || auth.error) setOpenSnackBar(true);
  }, [auth.user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    console.log("User Data:", userData);

    try {
      const success = await dispatch(register(userData));
      if (success) {
        console.log("Registration successful");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="grid gap-6">
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
          />
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
          />
        </div>

        {/* Email */}
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

        {/* Password */}
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

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          className="!mt-4 bg-blue-500 hover:bg-blue-600 text-white"
          fullWidth
        >
          Register
        </Button>
      </form>

      {/* Redirect to Login */}
      <p className="mt-6 text-center text-gray-500">
        Already have an account?{" "}
        <Button
          onClick={() => navigate("/login")}
          className="text-blue-500 hover:text-blue-600"
        >
          Log In
        </Button>
      </p>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {auth.error ? auth.error : auth.user ? "Register Success" : ""}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
