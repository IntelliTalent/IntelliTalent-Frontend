import * as yup from "yup";
import { Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { resetPassword } from "../../api/auth";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const initialValues = {
  password: "",
  confirmPassword: "",
};

export default function ResetPasswordForm() {
  document.title = "Reset Password | Intelli-Talent";

  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const params = new URLSearchParams(search);
  const token = params.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/auth/sign-in");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleFormSubmit = async (values: typeof initialValues) => {
    const { password } = values;

    try {
      await resetPassword(token, password);
      navigate("/auth/sign-in");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h4" fontWeight={700}>
        Create New Password
      </Typography>

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
              label="Password"
              type={showPassword1 ? "text" : "password"}
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
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
              label="Confirm Password"
              type={showPassword2 ? "text" : "password"}
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
                  <IconButton onClick={() => setShowPassword2(!showPassword2)}>
                    {showPassword2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />

            <Button
              fullWidth
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              sx={{ mt: 2, p: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        )}
      </Formik>

      <Link href="/auth/sign-in" variant="body1">
        Back to Sign In
      </Link>
    </Stack>
  );
}
