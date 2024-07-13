import {
  Autocomplete,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { skills } from "../../../../constants/skills.constant";
import { useCallback } from "react";
import { languages } from "../../../../constants/languages.constant";
import { jobTitles } from "../../../../constants/job-titles.constant";

export default function PersonalDetailsStage({
  formik,
  setActiveStep,
  firstStage,
  editMode = false,
}: {
  formik: any;
  setActiveStep: any;
  firstStage?: boolean;
  editMode?: boolean;
}) {
  const isError = useCallback(
    () =>
      ["jobTitle", "summary"].some(
        (name) =>
          (formik.touched[name] && Boolean(formik.errors[name])) ||
          (!editMode && formik.initialValues[name] === formik.values[name])
      ) || Boolean(formik.errors["yearsOfExperience"]),
    [formik, editMode]
  );

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
          <Autocomplete
            fullWidth
            id="jobTitle"
            options={jobTitles}
            getOptionLabel={(option) => option}
            value={formik.values.jobTitle}
            onInputChange={(_, newInputValue) =>
              formik.setFieldValue("jobTitle", newInputValue)
            }
            onChange={(_, value) => formik.setFieldValue("jobTitle", value)}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus
                name="jobTitle"
                variant="outlined"
                label="Job Title"
                placeholder="Select or type job title"
                onBlur={formik.handleBlur}
                error={
                  formik.touched.jobTitle && Boolean(formik.errors.jobTitle)
                }
                helperText={formik.touched.jobTitle && formik.errors.jobTitle}
              />
            )}
          />

          <TextField
            fullWidth
            margin="normal"
            id="yearsOfExperience"
            name="yearsOfExperience"
            label="Years of Experience"
            type="number"
            value={formik.values.yearsOfExperience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.yearsOfExperience &&
              Boolean(formik.errors.yearsOfExperience)
            }
            helperText={
              formik.touched.yearsOfExperience &&
              formik.errors.yearsOfExperience
            }
          />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Autocomplete
            fullWidth
            multiple
            id="skills"
            options={skills}
            limitTags={3}
            getOptionLabel={(option) => option}
            value={formik.values.skills}
            onChange={(event, value) => formik.setFieldValue("skills", value)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="skills"
                variant="outlined"
                label="Skills"
                placeholder="Select or type skills"
                onBlur={formik.handleBlur}
                error={formik.touched.skills && Boolean(formik.errors.skills)}
                helperText={formik.touched.skills && formik.errors.skills}
              />
            )}
          />

          <Autocomplete
            fullWidth
            multiple
            id="languages"
            options={languages}
            limitTags={3}
            getOptionLabel={(option) => option}
            value={formik.values.languages}
            onChange={(event, value) =>
              formik.setFieldValue("languages", value)
            }
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
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            margin="normal"
            id="summary"
            name="summary"
            label="Professional Summary"
            multiline
            rows={4}
            value={formik.values.summary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.summary && Boolean(formik.errors.summary)}
            helperText={formik.touched.summary && formik.errors.summary}
          />

          <FormControlLabel
            control={
              <Checkbox
                id="graduatedFromCS"
                name="graduatedFromCS"
                checked={formik.values.graduatedFromCS}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            label="Graduated from a Computer Science program"
          />
        </Stack>

        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Button
            sx={{ width: "100px" }}
            color="primary"
            variant="outlined"
            onClick={handleBack}
            disabled={firstStage}
          >
            Back
          </Button>

          <Button
            sx={{ width: "100px" }}
            aria-description="Next"
            color="primary"
            variant="contained"
            onClick={handleNext}
            disabled={isError()}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
