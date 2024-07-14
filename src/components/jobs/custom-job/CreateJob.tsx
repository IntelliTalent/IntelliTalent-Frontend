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
import JobPromptStage from "./create-job-steps/JobPromptStage";
import JobInformationStage from "./create-job-steps/JobInformationStage";
import CustomFiltersStage from "./create-job-steps/CustomFiltersStage";
import QuizStage from "./create-job-steps/QuizStage";
import InterviewStage from "./create-job-steps/InterviewStage";
import { ICreateJobDto, createJob } from "../../../api/jobs";
import { useNavigate } from "react-router-dom";
import { LoadingModal } from "../../ui";

// Step titles
const labels = [
  "Job Prompt",
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
      return <JobPromptStage formik={formik} setActiveStep={setActiveStep} />;
    case 1:
      return (
        <JobInformationStage formik={formik} setActiveStep={setActiveStep} />
      );
    case 2:
      return (
        <CustomFiltersStage formik={formik} setActiveStep={setActiveStep} />
      );
    case 3:
      return <QuizStage formik={formik} setActiveStep={setActiveStep} />;
    case 4:
      return <InterviewStage formik={formik} setActiveStep={setActiveStep} />;
    default:
      throw new Error("Unknown step");
  }
};

export default function CreateJob() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      prompt: "",

      title: "",
      description: "",
      company: "",
      jobLocation: "",
      type: "",
      skills: [],
      jobPlace: "",
      neededExperience: null,
      education: "",
      csRequired: null,
      jobEndDate: "",

      // Custom filters
      languages: [],
      country: "",
      city: "",

      // Quiz
      quizEndDate: "",

      // Interview
      interviewEndDate: "",
      interviewQuestions: [],
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
            country: values.country.split(":")[1],
            city: values.city.split(":")[1],
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
        await createJob(data);

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
          Create a New Job
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
