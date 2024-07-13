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
import CVAndSocialHandlesStage from "./create-profile-steps/CVAndSocialHandlesStage";
import { validationSchema } from "./create-profile-steps/validationSchema";
import PersonalDetailsStage from "./create-profile-steps/PersonalDetailsStage";
import EducationsStage from "./create-profile-steps/EducationsStage";
import ExperiencesStage from "./create-profile-steps/ExperiencesStage";
import ProjectsStage from "./create-profile-steps/ProjectsStage";
import CertificationsStage from "./create-profile-steps/CertificationsStage";
import { createProfile } from "../../../api/profiles";
import { useNavigate } from "react-router-dom";
import { LoadingModal } from "../../ui";

// Step titles
const labels = [
  "CV and Social Handles",
  "Personal Details",
  "Educations",
  "Experiences",
  "Projects",
  "Certifications",
];
const handleSteps = (
  step: number,
  formik: any,
  setActiveStep: (step: number) => void,
  submitted: boolean,
  setSubmitted: (submitted: boolean) => void
) => {
  switch (step) {
    case 0:
      return (
        <CVAndSocialHandlesStage
          formik={formik}
          setActiveStep={setActiveStep}
          submitted={submitted}
          setSubmitted={setSubmitted}
        />
      );
    case 1:
      return (
        <PersonalDetailsStage formik={formik} setActiveStep={setActiveStep} />
      );
    case 2:
      return <EducationsStage formik={formik} setActiveStep={setActiveStep} />;
    case 3:
      return <ExperiencesStage formik={formik} setActiveStep={setActiveStep} />;
    case 4:
      return <ProjectsStage formik={formik} setActiveStep={setActiveStep} />;
    case 5:
      return (
        <CertificationsStage formik={formik} setActiveStep={setActiveStep} />
      );
    default:
      throw new Error("Unknown step");
  }
};

export default function CreateProfile() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      githubHandle: "",
      linkedinHandle: "",
      cvLink: "",
      jobTitle: "",
      yearsOfExperience: 0,
      graduatedFromCS: false,
      summary: "",
      skills: [],
      languages: [],
      educations: [],
      experiences: [],
      projects: [],
      certifications: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        await createProfile({
          gitHub: values.githubHandle,
          linkedIn: values.linkedinHandle,
          cv: values.cvLink,
          jobTitle: values.jobTitle,
          yearsOfExperience: values.yearsOfExperience,
          graduatedFromCS: values.graduatedFromCS,
          summary: values.summary,
          skills: values.skills,
          languages: values.languages,
          educations: values.educations,
          experiences: values.experiences,
          projects: values.projects,
          certificates: values.certifications,
        });

        navigate("/user");
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
          Create a New Profile
        </Typography>

        <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
          Create a personalized profile to help you find your dream job.
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
        {handleSteps(
          activeStep,
          formik,
          setActiveStep,
          submitted,
          setSubmitted
        )}
      </form>

      <LoadingModal loading={loading} />
    </Container>
  );
}
