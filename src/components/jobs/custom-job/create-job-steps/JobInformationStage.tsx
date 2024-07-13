import {
  Autocomplete,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { skills } from "../../../../constants/skills.constant";
import { useCallback } from "react";
import { JobType } from "../../../../enums/job-type";
import { JobPlace } from "../../../../enums/job-place";
import { jobTitles } from "../../../../constants/job-titles.constant";

export default function JobInformationStage({
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
      [
        "title",
        "description",
        "company",
        "jobLocation",
        "type",
        "jobPlace",
      ].some(
        (name) =>
          (formik.touched[name] && Boolean(formik.errors[name])) ||
          (!editMode && formik.initialValues[name] === formik.values[name])
      ) ||
      Boolean(formik.errors["yearsOfExperience"]) ||
      Boolean(formik.errors["jobEndDate"]) ||
      Boolean(formik.errors["skills"]),
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
            value={formik.values.title}
            onInputChange={(_, newInputValue) =>
              formik.setFieldValue("title", newInputValue)
            }
            onChange={(_, value) => formik.setFieldValue("title", value)}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus
                name="title"
                variant="outlined"
                label="Job Title"
                placeholder="Select or type job title"
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            )}
          />

          <TextField
            fullWidth
            id="company"
            name="company"
            label="Company"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.company && Boolean(formik.errors.company)}
            helperText={formik.touched.company && formik.errors.company}
          />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            id="jobLocation"
            name="jobLocation"
            label="Job Location"
            value={formik.values.jobLocation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.jobLocation && Boolean(formik.errors.jobLocation)
            }
            helperText={formik.touched.jobLocation && formik.errors.jobLocation}
          />

          <FormControl fullWidth>
            <InputLabel id="job-type-label">Job Type</InputLabel>
            <Select
              labelId="job-type-label"
              label="Job Type"
              value={formik.values.type}
              name="type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                Boolean(formik.touched.type) && Boolean(formik.errors.type)
              }
            >
              {Object.values(JobType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            {Boolean(formik.touched.type) && (
              <Typography
                variant="caption"
                sx={{ color: "error.main", mt: "3px", mx: "14px" }}
              >
                {formik.errors.type}
              </Typography>
            )}
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="job-place-label">Job Place</InputLabel>
            <Select
              labelId="job-place-label"
              label="Job Place"
              value={formik.values.jobPlace}
              name="jobPlace"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                Boolean(formik.touched.jobPlace) &&
                Boolean(formik.errors.jobPlace)
              }
            >
              {Object.values(JobPlace).map((jobPlace) => (
                <MenuItem key={jobPlace} value={jobPlace}>
                  {jobPlace}
                </MenuItem>
              ))}
            </Select>
            {Boolean(formik.touched.jobPlace) && (
              <Typography
                variant="caption"
                sx={{ color: "error.main", mt: "3px", mx: "14px" }}
              >
                {formik.errors.jobPlace}
              </Typography>
            )}
          </FormControl>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            id="education"
            name="education"
            label="Education"
            value={formik.values.education}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.education && Boolean(formik.errors.education)}
            helperText={formik.touched.education && formik.errors.education}
          />

          <Autocomplete
            fullWidth
            multiple
            id="skills"
            options={skills}
            limitTags={3}
            getOptionLabel={(option) => option}
            value={formik.values.skills}
            onChange={(event, value) => formik.setFieldValue("skills", value)}
            onBlur={formik.handleBlur}
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
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="cs-required-label">
              Computer Science Degree Required
            </InputLabel>
            <Select
              labelId="cs-required-label"
              label="Computer Science Degree Required"
              value={formik.values.csRequired}
              name="csRequired"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                Boolean(formik.touched.csRequired) &&
                Boolean(formik.errors.csRequired)
              }
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={0}>No</MenuItem>
            </Select>
            {Boolean(formik.touched.csRequired) && (
              <Typography
                variant="caption"
                sx={{ color: "error.main", mt: "3px", mx: "14px" }}
              >
                {formik.errors.csRequired}
              </Typography>
            )}
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            id="neededExperience"
            name="neededExperience"
            label="Needed Years of Experience"
            type="number"
            value={formik.values.neededExperience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.neededExperience &&
              Boolean(formik.errors.neededExperience)
            }
            helperText={
              formik.touched.neededExperience && formik.errors.neededExperience
            }
          />

          <TextField
            fullWidth
            type="date"
            id="jobEndDate"
            name="jobEndDate"
            label="Job End Date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.jobEndDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.jobEndDate && Boolean(formik.errors.jobEndDate)
            }
            helperText={formik.touched.jobEndDate && formik.errors.jobEndDate}
          />
        </Stack>

        <TextField
          fullWidth
          margin="normal"
          id="description"
          name="description"
          label="Job Description"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />

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
