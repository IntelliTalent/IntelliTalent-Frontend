import {
  Autocomplete,
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, FormikProvider, getIn } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useEffect, useState } from "react";
import { skills } from "../../../../constants/skills.constant";
import SelectProjects from "./SelectProjects";
import { extractGithubRepos } from "../../../../api/profiles";
import { LoadingModal } from "../../../ui";

type IProject = {
  name: string;
  description: string;
  skills: string[];
  url: string;
};

export default function ProjectsStage({ formik, setActiveStep }: any) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [projectIndexes, setProjectIndexes] = useState<number[]>([]);
  const [selectedprojectsIndexes, setSelectedprojectsIndexes] = useState<
    number[]
  >([]);

  const isError = useCallback(() => {
    return formik.values.projects.some((_: any, index: number) => {
      const fields = ["name", "description", "skills"];
      return fields.some((field) =>
        getIn(formik.errors, `projects[${index}].${field}`)
      );
    });
  }, [formik.errors, formik.values]);

  const handleNext = () => {
    setActiveStep((prev: number) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev: number) => prev - 1);
  };

  const handleSelectProjects = () => {
    // get the projects that are selected
    const selectedProjects = projects.filter((_: any, index: number) =>
      selectedprojectsIndexes.includes(index)
    );

    formik.setFieldValue("projects", selectedProjects);

    setOpen(false);
  };

  useEffect(() => {
    const fetchRepos = async () => {
      // Call api to trigger extract info from github repos
      if (formik.values.githubHandle) {
        setLoading(true);

        const response = await extractGithubRepos(formik.values.githubHandle);

        setProjects(
          response.data?.map((project: any) => ({
            name: project?.name || "",
            description: project?.description || "",
            skills: Object.keys(project?.languages) || [],
            url: project?.html_url || "",
          })) || []
        );
        setProjectIndexes(Array.from({ length: projects.length }, (_, i) => i));

        setOpen(true);
        setLoading(false);
      }
    };

    fetchRepos();
  }, [formik.values.githubHandle, projects.length]);

  return (
    <Container sx={{ mb: 10 }}>
      <Stack spacing={2}>
        <FormikProvider value={formik}>
          <FieldArray
            name="projects"
            validateOnChange
            render={(arrayHelpers) => (
              <>
                {formik.values.projects.map((_: any, index: number) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={
                      index !== 0
                        ? { borderTop: "1px dashed black", pt: 2 }
                        : {}
                    }
                  >
                    <Stack direction="column" spacing={2} flex={1}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                      >
                        <TextField
                          fullWidth
                          autoFocus={index === 0}
                          margin="normal"
                          id={`projects[${index}].name`}
                          name={`projects[${index}].name`}
                          label="Project Name"
                          value={formik.values.projects[index].name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.projects &&
                            formik.touched.projects[index] &&
                            formik.touched.projects[index].name &&
                            Boolean(formik.errors.projects?.[index]?.name)
                          }
                          helperText={
                            formik.touched.projects &&
                            formik.touched.projects[index] &&
                            formik.touched.projects[index].name &&
                            formik.errors.projects?.[index]?.name
                          }
                        />

                        <Autocomplete
                          fullWidth
                          multiple
                          id={`projects[${index}].skills`}
                          options={skills}
                          limitTags={3}
                          getOptionLabel={(option) => option}
                          value={formik.values.projects[index].skills}
                          onChange={(event, value) =>
                            formik.setFieldValue(
                              `projects[${index}].skills`,
                              value
                            )
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name={`projects[${index}].skills`}
                              variant="outlined"
                              label="Skills"
                              placeholder="Select or type skills"
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.projects &&
                                formik.touched.projects[index] &&
                                formik.touched.projects[index].skills &&
                                Boolean(formik.errors.projects?.[index]?.skills)
                              }
                              helperText={
                                formik.touched.projects &&
                                formik.touched.projects[index] &&
                                formik.touched.projects[index].skills &&
                                formik.errors.projects?.[index]?.skills
                              }
                            />
                          )}
                        />
                      </Stack>

                      <TextField
                        fullWidth
                        margin="normal"
                        id={`projects[${index}].url`}
                        name={`projects[${index}].url`}
                        label="Project URL"
                        value={formik.values.projects[index].url}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.projects &&
                          formik.touched.projects[index] &&
                          formik.touched.projects[index].url &&
                          Boolean(formik.errors.projects?.[index]?.url)
                        }
                        helperText={
                          formik.touched.projects &&
                          formik.touched.projects[index] &&
                          formik.touched.projects[index].url &&
                          formik.errors.projects?.[index]?.url
                        }
                      />

                      <TextField
                        fullWidth
                        margin="normal"
                        id={`projects[${index}].description`}
                        name={`projects[${index}].description`}
                        label="Project Description"
                        multiline
                        rows={2}
                        value={formik.values.projects[index].description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.projects &&
                          formik.touched.projects[index] &&
                          formik.touched.projects[index].description &&
                          Boolean(formik.errors.projects?.[index]?.description)
                        }
                        helperText={
                          formik.touched.projects &&
                          formik.touched.projects[index] &&
                          formik.touched.projects[index].description &&
                          formik.errors.projects?.[index]?.description
                        }
                      />
                    </Stack>

                    <IconButton
                      onClick={() => arrayHelpers.remove(index)}
                      sx={{ width: "fit-content" }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Stack>
                ))}

                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() =>
                    arrayHelpers.push({
                      name: "",
                      description: "",
                      skills: [],
                      size: 0,
                    })
                  }
                >
                  Add Project
                </Button>
              </>
            )}
          />
        </FormikProvider>

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
            disabled={isError()}
          >
            Next
          </Button>
        </Stack>
      </Stack>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-center items-center h-full mx-5">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "fit-content",
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 5,
              p: 5,
            }}
          >
            <Typography variant="h5" component="h2" mb={2}>
              Select only the projects you are most interested in:
            </Typography>

            <SelectProjects
              projects={projects}
              projectIndexes={projectIndexes}
              setProjectIndexes={setProjectIndexes}
              selectedprojectsIndexes={selectedprojectsIndexes}
              setSelectedprojectsIndexes={setSelectedprojectsIndexes}
            />

            <Button
              sx={{ display: "block", ml: "auto", mt: 2 }}
              variant="contained"
              color="primary"
              onClick={handleSelectProjects}
            >
              Select
            </Button>
          </Box>
        </div>
      </Modal>

      <LoadingModal loading={loading} />
    </Container>
  );
}
