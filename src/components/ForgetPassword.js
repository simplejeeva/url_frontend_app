import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../Global";
import { toast, Toaster } from "react-hot-toast";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import UserContext from "../context/UserContext";

const loginValidationSchema = yup.object({
  email: yup.string().email().required().min(6),
});

function ForgetPassword() {
  let navigate = useNavigate();
  const userContextData = useContext(UserContext);

  const { handleSubmit, handleChange, handleBlur, touched, errors, values } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: loginValidationSchema,
      onSubmit: async (values) => {
        userContextData.setmailid(values.email);
        try {
          let mail = await axios.post(`${API}/api/user/sendmail`, values);
          if (mail.data) {
            toast.success(`${mail.data.message}`);
            navigate("/Verification");
          } else {
            toast.error(mail.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(`${error.response.data.message}`);
        }
      },
    });
  const paperStyle = {
    padding: 20,
    height: "40vh",
    width: 380,
    margin: "50px auto",
  };
  const btnstyle = { margin: "8px 0" };
  return (
    <>
      <Grid>
        <Toaster />
        <Paper elevation={3} style={paperStyle}>
          <h3 className="fw-bold text-center">Forgot Password</h3>
          <form onSubmit={handleSubmit} className="mt-5">
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
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              className="my-2"
            >
              Send verification
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
}

export default ForgetPassword;
