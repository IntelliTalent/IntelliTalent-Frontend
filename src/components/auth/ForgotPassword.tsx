import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { forgetPassword } from "../../api/auth";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
});

const initialValues = {
  email: "",
};

export default function ForgotPasswordForm() {
  document.title = "Forgot Password | Intelli-Talent";

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleFormSubmit = async (values: typeof initialValues) => {
    const { email } = values;

    try {
      await forgetPassword(email);
      setOpen(true);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Stack spacing={2}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Reset password link sent to your email!
        </Alert>
      </Snackbar>

      <div>
        <Typography component="h1" variant="h4" fontWeight={700}>
          Forget Password
        </Typography>
        <Typography component="h1" variant="body1" mt={1}>
          Enter your email and we will send you a code to reset your password
        </Typography>
      </div>

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
              label="Email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <Button
              fullWidth
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              sx={{ mt: 2, p: 2 }}
            >
              Send Email
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
