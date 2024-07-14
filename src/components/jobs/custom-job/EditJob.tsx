import {
  Alert,
  Box,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "./create-job-steps/validationSchema";

import JobInformationStage from "./create-job-steps/JobInformationStage";
import CustomFiltersStage from "./create-job-steps/CustomFiltersStage";
import QuizStage from "./create-job-steps/QuizStage";
import InterviewStage from "./create-job-steps/InterviewStage";
import { IJobDetails } from "../../../types";
import { ICreateJobDto, editJob } from "../../../api/jobs";
import { useNavigate } from "react-router-dom";
import { fDateTime } from "../../../utils/format-dates";
import { LoadingModal } from "../../ui";

// Step titles
const labels = [
  "Job Information",
  "Custom Filters",
  "Quiz Stage",
  "Interview Stage",
];
const handleSteps = (
  step: number,
  formik: any,
  setActiveStep: (step: number) => void
) => {
  switch (step) {
    case 0:
      return (
        <JobInformationStage
          formik={formik}
          setActiveStep={setActiveStep}
          firstStage
          editMode
        />
      );
    case 1:
      return (
        <CustomFiltersStage formik={formik} setActiveStep={setActiveStep} />
      );
    case 2:
      return <QuizStage formik={formik} setActiveStep={setActiveStep} />;
    case 3:
      return <InterviewStage formik={formik} setActiveStep={setActiveStep} />;
    default:
      throw new Error("Unknown step");
  }
};

export default function EditJob({ job }: { job: IJobDetails }) {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      title: job?.title || "",
      description: job?.description || "",
      company: job?.company || "",
      jobLocation: job?.jobLocation || "",
      type: job?.type || "",
      skills: job?.skills || [],
      jobPlace: job?.jobPlace || "",
      neededExperience: job?.neededExperience || null,
      education: job?.education || "",
      csRequired: job?.csRequired ? 1 : 0 || null,
      jobEndDate: job?.jobEndDate
        ? fDateTime(job?.jobEndDate, "yyyy-MM-dd")
        : "",

      // Custom filters
      languages: job?.customFilters?.languages || [],
      country: job?.customFilters?.country || "",
      city: job?.customFilters?.city || "",

      // Quiz
      quizEndDate: job?.quizEndDate
        ? fDateTime(job?.quizEndDate, "yyyy-MM-dd")
        : "",

      // Interview
      interviewEndDate: job?.interviewEndDate
        ? fDateTime(job?.interviewEndDate, "yyyy-MM-dd")
        : "",
      interviewQuestions: job?.interviewQuestions || [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const data: ICreateJobDto = {
          title: values.title,
          description: values.description,
          company: values.company,
          jobLocation: values.jobLocation,
          type: values.type,
          skills: values.skills,
          jobPlace: values.jobPlace,
          neededExperience: values.neededExperience,
          education: values.education,
          csRequired: values.csRequired ? Boolean(values.csRequired) : null,
          jobEndDate: values.jobEndDate ? new Date(values.jobEndDate) : null,
          customFilters: {
            languages: values.languages,
            country: values.country,
            city: values.city,
          },
          quizEndDate: values.quizEndDate ? new Date(values.quizEndDate) : null,
          interview: null,
        };

        if (values.interviewEndDate) {
          data.interview = {
            endDate: values.interviewEndDate
              ? new Date(values.interviewEndDate)
              : null,
            interviewQuestions: values.interviewQuestions,
          };
        }

        await editJob(job.id, data);

        navigate("/user?page=1");
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
        console.log(error);
      }
      setLoading(false);
    },
  });

  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight={700} align="center">
          Edit Job
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel>
        {labels.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {errorMessage && (
        <Container sx={{ my: 3 }}>
          <Alert severity="error">{errorMessage}</Alert>
        </Container>
      )}

      <form onSubmit={formik.handleSubmit}>
        {handleSteps(activeStep, formik, setActiveStep)}
      </form>

      <LoadingModal loading={loading} />
    </Container>
  );
}
