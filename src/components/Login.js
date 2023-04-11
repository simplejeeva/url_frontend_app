import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API } from "../Global";
import * as yup from "yup";
import axios from "axios";
import UserContext from "../context/UserContext";

const loginValidationSchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(6),
});
const Login = () => {
  const navigate = useNavigate();
  const userContextData = useContext(UserContext);
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: loginValidationSchema,
      onSubmit: async (values) => {
        try {
          const login = await axios.post(`${API}/api/user/login`, values);
          if (login.data.token) {
            toast.success(login.data.message);
            localStorage.setItem("react_token", login.data.token);
            localStorage.setItem("userName", login.data.username.username);
            localStorage.setItem("userEmail", login.data.username.email);
            userContextData.setLoginPerson(login.data.username.username);
            navigate("/home");
          } else {
            toast.error(login.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Invalid Credential");
        }
      },
    });
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 380,
    margin: "50px auto",
  };
  const btnstyle = { margin: "8px 0" };
  return (
    <>
      <Grid>
        <Toaster />
        <Paper elevation={3} style={paperStyle}>
          <Grid align="center">
            <Avatar
              alt="Travis Howard"
              src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
            />
            <h2 className="fw-bold my-2">Sign In</h2>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && !!errors.username}
              helperText={
                touched.username && errors.username ? errors.username : null
              }
              className="mb-3"
              type="text"
              fullWidth
              required
            />

            <TextField
              label="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && !!errors.password}
              helperText={
                touched.password && errors.password ? errors.password : null
              }
              className="mb-3"
              type="password"
              fullWidth
              required
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              className="my-2"
            >
              Sign in
            </Button>
          </form>
          <Typography className="text-center p-2">
            <Link href="forgot-password">Forgot password ?</Link>
          </Typography>
          <Typography className="text-center p-2">
            Do you have an account ?
            <Link href="/register" className="mx-2 fw-bold">
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
