import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { signUp } from "../../api/auth";
import AvatarUpload from "./AvatarUpload";
import { UserType } from "../../enums";
import { uploadFile } from "../../api/core";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GeoLocation from "../forms/GeoLocation";

// Schemas for validation
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  address: yup.string().required("Address is required"),
  dateOfBirth: yup.date().required("Date of birth is required"),
  userType: yup.string().required("User type is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

// Intial values for the form
const initialValues = {
  firstName: "",
  lastName: "",
  country: "",
  city: "",
  phoneNumber: "",
  address: "",
  dateOfBirth: "",
  userType: "",
  email: "",
  password: "",
};

function SignupForm() {
  document.title = "Signup | Intelli-Talent";

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (values: typeof initialValues) => {
    try {
      // Upload the photo and get the url
      let link = "";
      if (photo && photoUrl === "") {
        const { link: url } = await uploadFile(photo!);

        link = url;
        setPhotoUrl(url);
      }

      await signUp({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
        dateOfBirth: values.dateOfBirth,
        country: values.country.split(":")[1],
        city: values.city.split(":")[1],
        address: values.address,
        photo: photoUrl !== "" ? photoUrl : link === "" ? null : link,
        type: values.userType as UserType,
      });

      navigate("/auth/post-signup");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Stack spacing={2}>
      <div>
        <Typography component="h1" variant="h4" fontWeight={700}>
          Let&apos;s start
        </Typography>
        <Typography component="h1" variant="body1" mt={1}>
          Already have account?{" "}
          <Link href="/auth/sign-in" variant="body1">
            Log in
          </Link>
        </Typography>
      </div>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <AvatarUpload setPhoto={setPhoto} />
      </Box>

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
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={values.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />

              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Stack>

            <Stack direction="row" spacing={2} mt={2}>
              <GeoLocation
                locationTitle="Country"
                name="country"
                value={values.country}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.country}
                touched={touched.country}
                isCountry
              />

              <GeoLocation
                locationTitle="City"
                name="city"
                value={values.city}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.city}
                touched={touched.city}
                geoId={Number(values.country.split(":")[0]) || null}
              />
            </Stack>

            <Stack direction="row" spacing={2} mt={2}>
              <TextField
                fullWidth
                margin="normal"
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                label="Date of Birth"
                InputLabelProps={{ shrink: true }}
                value={values.dateOfBirth}
                onBlur={handleBlur}
                onChange={handleChange}
                error={
                  Boolean(touched.dateOfBirth) && Boolean(errors.dateOfBirth)
                }
                helperText={touched.dateOfBirth && errors.dateOfBirth}
              />

              <FormControl fullWidth>
                <InputLabel id="user-type-label">User Type</InputLabel>
                <Select
                  labelId="user-type-label"
                  label="User Type"
                  value={values.userType}
                  name="userType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.userType) && Boolean(errors.userType)}
                >
                  <MenuItem value={UserType.jobSeeker}>Job Seeker</MenuItem>
                  <MenuItem value={UserType.recruiter}>Recruiter</MenuItem>
                </Select>
                {Boolean(touched.userType) && (
                  <Typography
                    variant="body2"
                    sx={{ color: "error.main", mt: 0.5 }}
                  >
                    {errors.userType}
                  </Typography>
                )}
              </FormControl>
            </Stack>

            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Phone"
              name="phoneNumber"
              value={values.phoneNumber}
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
              }
              helperText={touched.phoneNumber && errors.phoneNumber}
            />

            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Address"
              name="address"
              value={values.address}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.address) && Boolean(errors.address)}
              helperText={touched.address && errors.address}
            />

            <TextField
              sx={{ mt: 2 }}
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
              sx={{ mt: 2 }}
              fullWidth
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
              disabled={isSubmitting}
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                p: 2,
              }}
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </Button>
          </Box>
        )}
      </Formik>
    </Stack>
  );
}

export default SignupForm;
