import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { changePassword } from "../../api/auth";

// Schemas for validation
const validationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current password is required")
    .min(8, "Password must be at least 8 characters"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters")
    .notOneOf([yup.ref("currentPassword")], "New password must be different"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export default function ChangePassword() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleFormSubmit = async (values: typeof initialValues) => {
    try {
      await changePassword(values);

      navigate("/");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          isSubmitting,
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Current Password"
              type={showPassword1 ? "text" : "password"}
              name="currentPassword"
              value={values.currentPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                Boolean(touched.currentPassword) &&
                Boolean(errors.currentPassword)
              }
              helperText={touched.currentPassword && errors.currentPassword}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword1(!showPassword1)}>
                    {showPassword1 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />

            <TextField
              fullWidth
              sx={{ mt: 3 }}
              label="New Password"
              type={showPassword2 ? "text" : "password"}
              name="newPassword"
              value={values.newPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                Boolean(touched.newPassword) && Boolean(errors.newPassword)
              }
              helperText={touched.newPassword && errors.newPassword}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword2(!showPassword2)}>
                    {showPassword2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />

            <TextField
              fullWidth
              sx={{ mt: 3 }}
              label="Confirm Password"
              type={showPassword3 ? "text" : "password"}
              name="confirmPassword"
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                Boolean(touched.confirmPassword) &&
                Boolean(errors.confirmPassword)
              }
              helperText={touched.confirmPassword && errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword3(!showPassword3)}>
                    {showPassword3 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />

            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                width: "100px",
                display: "block",
                ml: "auto",
              }}
            >
              Change
            </Button>
          </Box>
        )}
      </Formik>
    </>
  );
}
