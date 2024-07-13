import {
  Autocomplete,
  Button,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { languages } from "../../../../constants/languages.constant";
import GeoLocation from "../../../forms/GeoLocation";

export default function CustomFiltersStage({ formik, setActiveStep }: any) {
  const handleNext = () => {
    setActiveStep((prev: number) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev: number) => prev - 1);
  };

  return (
    <Container sx={{ mb: 10 }}>
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <GeoLocation
            locationTitle="Country"
            name="country"
            value={formik.values.country}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            error={formik.errors.country}
            touched={formik.touched.country}
            isCountry
          />

          <GeoLocation
            locationTitle="City"
            name="city"
            value={formik.values.city}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            error={formik.errors.city}
            touched={formik.touched.city}
            geoId={Number(formik.values.country.split(":")[0]) || null}
          />
        </Stack>

        <Autocomplete
          fullWidth
          multiple
          id="languages"
          options={languages}
          limitTags={3}
          getOptionLabel={(option) => option}
          value={formik.values.languages}
          onChange={(event, value) => formik.setFieldValue("languages", value)}
          renderInput={(params) => (
            <TextField
              {...params}
              name="languages"
              variant="outlined"
              label="Languages"
              placeholder="Select or type languages"
              onBlur={formik.handleBlur}
              error={
                formik.touched.languages && Boolean(formik.errors.languages)
              }
              helperText={formik.touched.languages && formik.errors.languages}
            />
          )}
        />

        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Button
            sx={{ width: "100px" }}
            color="primary"
            variant="outlined"
            onClick={handleBack}
          >
            Back
          </Button>

          <Button
            sx={{ width: "100px" }}
            color="primary"
            variant="contained"
            onClick={handleNext}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
