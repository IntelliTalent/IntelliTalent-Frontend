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
import { validationSchema } from "./create-profile-steps/validationSchema";
import PersonalDetailsStage from "./create-profile-steps/PersonalDetailsStage";
import EducationsStage from "./create-profile-steps/EducationsStage";
import ExperiencesStage from "./create-profile-steps/ExperiencesStage";
import ProjectsStage from "./create-profile-steps/ProjectsStage";
import CertificationsStage from "./create-profile-steps/CertificationsStage";
import { IProfileDetails } from "../../../types";
import { editProfile } from "../../../api/profiles";
import { useNavigate } from "react-router-dom";
import { LoadingModal } from "../../ui";

// Step titles
const labels = [
  "Personal Details",
  "Educations",
  "Experiences",
  "Projects",
  "Certifications",
];
const handleSteps = (
  step: number,
  formik: any,
  setActiveStep: (step: number) => void
) => {
  switch (step) {
    case 0:
      return (
        <PersonalDetailsStage
          formik={formik}
          setActiveStep={setActiveStep}
          firstStage
          editMode
        />
      );
    case 1:
      return <EducationsStage formik={formik} setActiveStep={setActiveStep} />;
    case 2:
      return <ExperiencesStage formik={formik} setActiveStep={setActiveStep} />;
    case 3:
      return <ProjectsStage formik={formik} setActiveStep={setActiveStep} />;
    case 4:
      return (
        <CertificationsStage formik={formik} setActiveStep={setActiveStep} />
      );
    default:
      throw new Error("Unknown step");
  }
};

export default function EditProfile({ profile }: { profile: IProfileDetails }) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      jobTitle: profile?.jobTitle || "",
      yearsOfExperience: profile?.yearsOfExperience || 0,
      graduatedFromCS: profile?.graduatedFromCS || false,
      summary: profile?.summary || "",
      skills: profile?.skills || [],
      languages: profile?.languages || [],
      educations: profile?.educations || [],
      experiences: profile?.experiences || [],
      projects: profile?.projects || [],
      certifications: profile?.certificates || [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        await editProfile(profile.id, {
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
          Edit Your Profile
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
