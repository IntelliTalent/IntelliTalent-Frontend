import { Button, Container, IconButton, Stack, TextField } from "@mui/material";
import { FieldArray, FormikProvider, getIn } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useCallback } from "react";

export default function ExperiencesStage({ formik, setActiveStep }: any) {
  const isError = useCallback(() => {
    return formik.values.experiences.some((_: any, index: number) => {
      const fields = ["jobTitle", "companyName", "startDate", "description"];
      return fields.some((field) =>
        getIn(formik.errors, `experiences[${index}].${field}`)
      );
    });
  }, [formik.errors, formik.values]);

  const handleNext = () => {
    setActiveStep((prev: number) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev: number) => prev - 1);
  };

  return (
    <Container sx={{ mb: 10 }}>
      <Stack spacing={2}>
        <FormikProvider value={formik}>
          <FieldArray
            name="experiences"
            validateOnChange
            render={(arrayHelpers) => (
              <>
                {formik.values.experiences.map((_: any, index: number) => (
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
                          id={`experiences[${index}].jobTitle`}
                          name={`experiences[${index}].jobTitle`}
                          label="Job Title"
                          value={formik.values.experiences[index].jobTitle}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.experiences &&
                            formik.touched.experiences[index] &&
                            formik.touched.experiences[index].jobTitle &&
                            Boolean(
                              formik.errors.experiences?.[index]?.jobTitle
                            )
                          }
                          helperText={
                            formik.touched.experiences &&
                            formik.touched.experiences[index] &&
                            formik.touched.experiences[index].jobTitle &&
                            formik.errors.experiences?.[index]?.jobTitle
                          }
                        />
                        <TextField
                          fullWidth
                          margin="normal"
                          id={`experiences[${index}].companyName`}
                          name={`experiences[${index}].companyName`}
                          label="Company Name"
                          value={formik.values.experiences[index].companyName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.experiences &&
                            formik.touched.experiences[index] &&
                            formik.touched.experiences[index].companyName &&
                            Boolean(
                              formik.errors.experiences?.[index]?.companyName
                            )
                          }
                          helperText={
                            formik.touched.experiences &&
                            formik.touched.experiences[index] &&
                            formik.touched.experiences[index].companyName &&
                            formik.errors.experiences?.[index]?.companyName
                          }
                        />
                      </Stack>

                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                      >
                        <TextField
                          fullWidth
                          margin="normal"
                          type="date"
                          id={`experiences[${index}].startDate`}
                          name={`experiences[${index}].startDate`}
                          label="Start Date"
                          InputLabelProps={{ shrink: true }}
                          value={formik.values.experiences[index].startDate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.experiences &&
                            formik.touched.experiences[index] &&
                            formik.touched.experiences[index].startDate &&
                            Boolean(
                              formik.errors.experiences?.[index]?.startDate
                            )
                          }
                          helperText={
                            formik.touched.experiences &&
                            formik.touched.experiences[index] &&
                            formik.touched.experiences[index].startDate &&
                            formik.errors.experiences?.[index]?.startDate
                          }
                        />

                        <TextField
                          fullWidth
                          margin="normal"
                          type="date"
                          id={`experiences[${index}].endDate`}
                          name={`experiences[${index}].endDate`}
                          label="End Date"
                          InputLabelProps={{ shrink: true }}
                          value={formik.values.experiences[index].endDate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.experiences &&
                            formik.touched.experiences[index] &&
                            formik.touched.experiences[index].endDate &&
                            Boolean(formik.errors.experiences?.[index]?.endDate)
                          }
                          helperText={
                            formik.touched.experiences &&
                            formik.touched.experiences[index] &&
                            formik.touched.experiences[index].endDate &&
                            formik.errors.experiences?.[index]?.endDate
                          }
                        />
                      </Stack>

                      <TextField
                        fullWidth
                        margin="normal"
                        id={`experiences[${index}].description`}
                        name={`experiences[${index}].description`}
                        label="Description"
                        multiline
                        rows={2}
                        value={formik.values.experiences[index].description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.experiences &&
                          formik.touched.experiences[index] &&
                          formik.touched.experiences[index].description &&
                          Boolean(
                            formik.errors.experiences?.[index]?.description
                          )
                        }
                        helperText={
                          formik.touched.experiences &&
                          formik.touched.experiences[index] &&
                          formik.touched.experiences[index].description &&
                          formik.errors.experiences?.[index]?.description
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
                      jobTitle: "",
                      companyName: "",
                      startDate: "",
                      endDate: null,
                      description: "",
                    })
                  }
                >
                  Add Experience
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
    </Container>
  );
}
