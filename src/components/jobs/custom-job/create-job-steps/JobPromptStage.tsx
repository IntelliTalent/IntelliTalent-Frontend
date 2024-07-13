import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { generateCustomJob } from "../../../../api/jobs";
import { fDateTime } from "../../../../utils/format-dates";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import WorkIcon from "@mui/icons-material/Work";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import HouseIcon from "@mui/icons-material/House";
import ApartmentIcon from "@mui/icons-material/Apartment";
import TranslateIcon from "@mui/icons-material/Translate";
import DateRangeIcon from "@mui/icons-material/DateRange";

// ------------------------------------------------------------------------

const RULES = [
  {
    icon: <WorkIcon />,
    text: `Use common terms for job types, such as "Full-Time", "Part-Time", "Contract", ...etc`,
  },
  {
    icon: <AddLocationIcon />,
    text: "Clearly specify the location of the job.",
  },
  {
    icon: <HouseIcon />,
    text: `For remote or hybrid roles, explicitly mention "remote" or "hybrid".`,
  },
  {
    icon: <ApartmentIcon />,
    text: "Mention the company name clearly in the prompt. Use the full company name and avoid abbreviations or acronyms unless they are well-known.",
  },
  {
    icon: <StarBorderIcon />,
    text: "Use the standard names for skills, especially those with special characters like C++ or C#, and separate them with commas.",
  },
  {
    icon: <TranslateIcon />,
    text: "List the languages required for the job, separated by commas. Use full language names and avoid abbreviations.",
  },
  {
    icon: <DateRangeIcon />,
    text: `Specify the required years of experience clearly, using common phrases like "years of experience" or "yrs of experience". For ranges, use a hyphen (e.g., "3-5 years of experience").`,
  },
];

// ------------------------------------------------------------------------

function CustomListItem({ icon, text }: any) {
  return (
    <ListItem>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </ListItem>
  );
}

export default function JobPromptStage({ formik, setActiveStep }: any) {
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    setLoading(true);

    if (formik.values.prompt !== "") {
      try {
        const response = await generateCustomJob(formik.values.prompt);

        if (response.job) {
          formik.setFieldValue("title", response.job.title || "");
          formik.setFieldValue("company", response.job.company || "");
          formik.setFieldValue("type", response.job.type || "");
          formik.setFieldValue("skills", response.job.skills || []);
          formik.setFieldValue("jobPlace", response.job.jobPlace || "");
          formik.setFieldValue(
            "neededExperience",
            Number(response.job.neededExperience) || null
          );
          formik.setFieldValue(
            "csRequired",
            response.job.csRequired ? 1 : 0 || null
          );
          formik.setFieldValue(
            "jobEndDate",
            response.job.jobEndDate
              ? fDateTime(response.job.jobEndDate, "yyyy-MM-dd")
              : ""
          );
          formik.setFieldValue("languages", response.job.languages || []);
        }
      } catch (error) {
        console.log(error);
      }
    }

    setLoading(false);
    setActiveStep((prev: number) => prev + 1);
  };

  return (
    <Container>
      <Typography mt={2} variant="h6">
        By providing a detailed job description and requirements, we can
        automatically extract all of the information about the job. This will
        save you time by pre-filling parts of the form, allowing you to quickly
        complete the form.
      </Typography>

      <Box>
        <Typography mt={2} variant="body1" fontWeight={700}>
          List of rules that can help you to write a good prompt:
        </Typography>

        <List dense>
          {RULES.map((rule, index) => (
            <CustomListItem key={index} icon={rule.icon} text={rule.text} />
          ))}
        </List>
      </Box>

      <TextField
        fullWidth
        sx={{ my: 2 }}
        id="jobPrompt"
        name="prompt"
        label="Job Prompt"
        multiline
        rows={4}
        value={formik.values.prompt}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.prompt && Boolean(formik.errors.prompt)}
        helperText={formik.touched.prompt && formik.errors.prompt}
        disabled={loading}
      />
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
      <Modal
        open={loading}
        aria-labelledby="loading-modal-title"
        aria-describedby="loading-modal-description"
        closeAfterTransition
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height="100vh"
          bgcolor={"rgba(0, 0, 0, 0.7)"}
        >
          <CircularProgress size={80} />
          <Typography
            id="loading-modal-description"
            variant="h6"
            color="white"
            mt={2}
          >
            Your request is being processed, please wait...
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
}
