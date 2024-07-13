import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AvatarUpload from "../auth/AvatarUpload";
import { useDispatch, useSelector } from "react-redux";
import { fDateTime } from "../../utils/format-dates";
import { RootState } from "../../store/store";
import { IUser } from "../../types";
import { uploadFile } from "../../api/core";
import { editUser } from "../../api/auth";
import { setUpdate } from "../../store/userReducer";
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
});

export default function EditInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState("");

  const user: IUser = useSelector((state: RootState) => state.user.user)!;

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    country: user?.country,
    city: user?.city,
    phoneNumber: user?.phoneNumber,
    address: user?.address,
    dateOfBirth: user?.dateOfBirth
      ? fDateTime(user?.dateOfBirth, "yyyy-MM-dd")
      : "",
  };

  const getChangedFields = (initial: any, current: any) => {
    return Object.keys(current).reduce((acc, key) => {
      if (initial[key] !== current[key]) {
        acc[key] = current[key];
      }
      return acc;
    }, {} as any);
  };

  useEffect(() => {
    setPhotoUrl(user?.photo);
  }, [user?.photo]);

  const handleFormSubmit = async (values: typeof initialValues) => {
    try {
      // Check if the user has uploaded a new photo
      let link = "";
      if (photo) {
        const { link: url } = await uploadFile(photo);
        link = url;

        setPhotoUrl(url);
        setPhoto(null);
      }

      values.city = values.city.split(":")[1];
      values.country = values.country.split(":")[1];

      const changedFields = getChangedFields(initialValues, values);

      if (link !== "") {
        changedFields.photo = link;
      }

      if (Object.keys(changedFields).length === 0) {
        navigate("/");
        return;
      }
      const response = await editUser(changedFields);

      dispatch(setUpdate(response));
      navigate("/");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Box
        sx={{
          my: 3,
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        <AvatarUpload photo={photoUrl} setPhoto={setPhoto} />
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
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={2}>
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

              <TextField
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
            </Stack>

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
              Edit
            </Button>
          </Box>
        )}
      </Formik>
    </>
  );
}
