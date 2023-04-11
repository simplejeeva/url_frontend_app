import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { API } from "../Global";
import { toast, Toaster } from "react-hot-toast";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import * as yup from "yup";

const loginValidationSchema = yup.object({
  vercode: yup.number().required().min(4),
});
function Verification() {
  let navigate = useNavigate();
  const userContextData = useContext(UserContext);
  let mail = userContextData.mailid;
  let { handleBlur, handleChange, handleSubmit, touched, errors, values } =
    useFormik({
      initialValues: {
        email: `${mail}`,
        vercode: "",
      },
      validate: (values) => {
        let errors = {};
        if (!values.vercode) {
          errors.vercode = "Please enter the validation code";
        }
        return errors;
      },
      validationSchema: loginValidationSchema,
      onSubmit: async (values) => {
        try {
          const res = await axios.post(`${API}/api/user/verify`, values);
          userContextData.setforgotUser(res.data);
          if (res.data) {
            toast.success("Verified ✅");
            navigate("/ChangePassword");
          } else {
            toast.error(res.data.message);
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
          <h3 className="fw-bold text-center">OTP Verification</h3>
          <form onSubmit={handleSubmit} className="mt-5">
            <TextField
              label="Enter OTP"
              name="vercode"
              value={values.vercode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.vercode && !!errors.vercode}
              helperText={
                touched.vercode && errors.vercode ? errors.vercode : null
              }
              className="mb-3"
              type="number"
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
              Verify
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
}

export default Verification;
