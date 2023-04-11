import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API } from "../Global";
import * as yup from "yup";
import axios from "axios";

const loginValidationSchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(6),
  email: yup.string().email().required().min(6),
});
const Register = () => {
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
        email: "",
      },
      validationSchema: loginValidationSchema,
      onSubmit: async (values) => {
        try {
          await axios.post(`${API}/api/user/signup`, values);
          toast.success("Signup Completed");
          navigate("/");
        } catch (error) {
          console.log(error);
          toast.error("Invalid Credential");
        }
      },
    });
  const paperStyle = {
    padding: 20,
    height: "80vh",
    width: 380,
    margin: "40px auto",
  };
  const btnstyle = { margin: "8px 0" };
  return (
    <Grid>
      <Toaster />
      <Paper elevation={3} style={paperStyle}>
        <Grid align="center">
          <h2 className="fw-bold my-3">Sign Up</h2>
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
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email ? errors.email : null}
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
            className="my-3"
          >
            Sign Up
          </Button>
        </form>
        <Typography className="text-center p-2">
          {" "}
          Already have an account ?
          <Link href="/" className="mx-2 fw-bold">
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Register;
