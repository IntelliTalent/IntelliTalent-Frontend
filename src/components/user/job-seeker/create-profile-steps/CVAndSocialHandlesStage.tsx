import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  extractInfo,
  triggerExtractInfo,
  uploadFile,
} from "../../../../api/core";
import { scrapeProfile } from "../../../../api/profiles";
import { fDateTime } from "../../../../utils/format-dates";
import { LoadingModal } from "../../../ui";

export default function CVAndSocialHandlesStage({
  formik,
  setActiveStep,
  submitted,
  setSubmitted,
}: any) {
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  const handleNext = async () => {
    if (!submitted) {
      setLoading(true);

      let cvLink = "";
      // Check if there is a cv uploaded
      if (acceptedFiles.length > 0) {
        const { link } = await uploadFile(acceptedFiles[0]);
        cvLink = link;

        // Call api to trigger extract info from cv
        await triggerExtractInfo(cvLink);
      }

      if (
        formik.values.linkedinHandle !== "" ||
        formik.values.githubHandle !== ""
      ) {
        const response = await scrapeProfile(
          formik.values.githubHandle,
          formik.values.linkedinHandle
        );

        // Set the form values from the response
        formik.setFieldValue(
          "jobTitle",
          response.linkedinUserInfo?.job_title || ""
        );
        formik.setFieldValue(
          "graduatedFromCS",
          response.linkedinUserInfo?.educations.some(
            (education: any) =>
              education.degree?.toLowerCase().includes("computer") ||
              education.field_of_study?.toLowerCase().includes("computer")
          ) || false
        );
        formik.setFieldValue("summary", response.linkedinUserInfo?.about || "");
        formik.setFieldValue(
          "educations",
          response.linkedinUserInfo?.educations.map((education: any) => ({
            degree: education?.degree || "",
            schoolName: education?.school || "",
            startDate:
              fDateTime(
                new Date(education?.start_year, education?.start_month - 1),
                "yyyy-MM-dd"
              ) || null,
            endDate:
              (education?.end_year &&
                education?.end_month &&
                fDateTime(
                  new Date(education?.end_year, education?.end_month - 1),
                  "yyyy-MM-dd"
                )) ||
              null,
            description: "",
          })) || []
        );
        formik.setFieldValue(
          "experiences",
          response.linkedinUserInfo?.experiences.map((experience: any) => ({
            jobTitle: experience?.title || "",
            companyName: experience?.company || "",
            startDate:
              fDateTime(
                new Date(experience?.start_year, experience?.start_month - 1),
                "yyyy-MM-dd"
              ) || null,
            endDate: experience?.is_current
              ? null
              : (experience?.end_year &&
                  experience?.end_month &&
                  fDateTime(
                    new Date(experience?.end_year, experience?.end_month - 1),
                    "yyyy-MM-dd"
                  )) ||
                null,
            description: "",
          })) || []
        );
      }

      // Extract the needed info from the cv
      if (cvLink !== "") {
        formik.setFieldValue("cvLink", cvLink);

        let response = await extractInfo();
        while (!response) {
          response = await extractInfo();
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }

        formik.setFieldValue(
          "yearsOfExperience",
          Math.round(response.info?.yearsOfExperience) || 0
        );
        formik.setFieldValue("skills", response.info?.skills || []);
        formik.setFieldValue("languages", response.info?.languages || []);
        formik.setFieldValue(
          "certifications",
          response.info?.certifications.map((certification: any) => ({
            title: certification || "",
            authority: "",
            issuedAt: "",
            validUntil: null,
            url: "",
          })) || []
        );
      }

      setLoading(false);
      setSubmitted(true);
    }

    setActiveStep((prev: number) => prev + 1);
  };

  return (
    <Container>
      <Typography mt={2} variant="h6" textAlign="center">
        By providing your CV, LinkedIn, and GitHub handles, we can automatically
        gather information about your professional background. This will save
        you time by pre-filling parts of the form, allowing you to quickly
        complete your profile.
      </Typography>

      <Box
        {...getRootProps({ className: "dropzone" })}
        p={3}
        border="1px dashed grey"
        borderRadius={2}
        textAlign="center"
        my={2}
      >
        <input {...getInputProps()} disabled={loading} />
        <Typography>
          {acceptedFiles.length > 0
            ? acceptedFiles[0].name
            : "Drop your CV here or click to upload (PDF only)"}
        </Typography>
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          fullWidth
          id="linkedinHandle"
          name="linkedinHandle"
          label="LinkedIn Handle"
          value={formik.values.linkedinHandle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.linkedinHandle &&
            Boolean(formik.errors.linkedinHandle)
          }
          helperText={
            formik.touched.linkedinHandle && formik.errors.linkedinHandle
          }
          disabled={loading}
        />

        <TextField
          fullWidth
          id="githubHandle"
          name="githubHandle"
          label="GitHub Handle"
          value={formik.values.githubHandle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.githubHandle && Boolean(formik.errors.githubHandle)
          }
          helperText={formik.touched.githubHandle && formik.errors.githubHandle}
          disabled={loading}
        />
      </Stack>

      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Button
          sx={{ width: "100px" }}
          color="primary"
          variant="outlined"
          disabled={true}
        >
          Back
        </Button>

        <Button
          sx={{ width: "100px" }}
          color="primary"
          variant="contained"
          onClick={handleNext}
          disabled={loading}
        >
          Next
        </Button>
      </Stack>

      <LoadingModal loading={loading} />
    </Container>
  );
}
