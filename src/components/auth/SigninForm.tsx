import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setLogin } from "../../store/userReducer";
import { signIn } from "../../api/auth";
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
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const initialValues = {
  email: "",
  password: "",
};

export default function SigninForm() {
  document.title = "Signin | Intelli-Talent";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (values: typeof initialValues) => {
    const { email, password } = values;

    try {
      const response = await signIn(email, password);

      dispatch(setLogin({ user: response.user, token: response.token }));
      navigate("/");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Stack spacing={2}>
      <div>
        <Typography component="h1" variant="h4" fontWeight={700}>
          Welcome Back
        </Typography>
        <Typography component="h1" variant="body1" mt={1}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" variant="body1">
            Sign up
          </Link>
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

            <TextField
              fullWidth
              sx={{ mt: 3 }}
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
              Login
            </Button>
          </Box>
        )}
      </Formik>

      <Link href="/auth/forget-password" variant="body1">
        Forgot password?
      </Link>
    </Stack>
  );
}
