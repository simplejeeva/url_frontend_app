import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../Global";
import { useFormik } from "formik";
import { toast, Toaster } from "react-hot-toast";
import UserContext from "../context/UserContext";
// import { Button, Grid, Paper, TextField } from "@material-ui/core";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import * as yup from "yup";

const loginValidationSchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(6),
  email: yup.string().email().required().min(6),
});

const ChangePassword = () => {
  const navigate = useNavigate();
  const userContextData = useContext(UserContext);
  let input = userContextData.forgotUser;

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        username: `${input.username}`,
        email: `${input.email}`,
        password: "",
      },
      validationSchema: loginValidationSchema,
      onSubmit: async (values) => {
        try {
          const register = await axios.post(
            `${API}/api/user/changepassword/${input.email}`,
            values
          );
          toast.success(register.data.message);
          navigate("/");
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
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
          <h2 className="fw-bold my-3">Change Password</h2>
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
            label="New Password"
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
            Submit
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default ChangePassword;
