import { Button, Container, IconButton, Stack, TextField } from "@mui/material";
import { FieldArray, FormikProvider, getIn } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useCallback } from "react";

export default function EducationsStage({ formik, setActiveStep }: any) {
  const isError = useCallback(() => {
    return formik.values.educations?.some((_: any, index: number) => {
      const fields = ["schoolName", "degree", "startDate", "description"];
      return fields.some((field) =>
        getIn(formik.errors, `educations[${index}].${field}`)
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
            name="educations"
            validateOnChange
            render={(arrayHelpers) => (
              <>
                {formik.values.educations.map((_: any, index: number) => (
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
                          margin="normal"
                          autoFocus={index === 0}
                          id={`educations[${index}].schoolName`}
                          name={`educations[${index}].schoolName`}
                          label="School Name"
                          value={formik.values.educations[index].schoolName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.educations &&
                            formik.touched.educations[index] &&
                            formik.touched.educations[index].schoolName &&
                            Boolean(
                              formik.errors.educations?.[index]?.schoolName
                            )
                          }
                          helperText={
                            formik.touched.educations &&
                            formik.touched.educations[index] &&
                            formik.touched.educations[index].schoolName &&
                            formik.errors.educations?.[index]?.schoolName
                          }
                        />
                        <TextField
                          fullWidth
                          margin="normal"
                          id={`educations[${index}].degree`}
                          name={`educations[${index}].degree`}
                          label="Degree"
                          value={formik.values.educations[index].degree}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.educations &&
                            formik.touched.educations[index] &&
                            formik.touched.educations[index].degree &&
                            Boolean(formik.errors.educations?.[index]?.degree)
                          }
                          helperText={
                            formik.touched.educations &&
                            formik.touched.educations[index] &&
                            formik.touched.educations[index].degree &&
                            formik.errors.educations?.[index]?.degree
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
                          id={`educations[${index}].startDate`}
                          name={`educations[${index}].startDate`}
                          label="Start Date"
                          InputLabelProps={{ shrink: true }}
                          value={formik.values.educations[index].startDate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.educations &&
                            formik.touched.educations[index] &&
                            formik.touched.educations[index].startDate &&
                            Boolean(
                              formik.errors.educations?.[index]?.startDate
                            )
                          }
                          helperText={
                            formik.touched.educations &&
                            formik.touched.educations[index] &&
                            formik.touched.educations[index].startDate &&
                            formik.errors.educations?.[index]?.startDate
                          }
                        />

                        <TextField
                          fullWidth
                          margin="normal"
                          type="date"
                          id={`educations[${index}].endDate`}
                          name={`educations[${index}].endDate`}
                          label="End Date"
                          InputLabelProps={{ shrink: true }}
                          value={formik.values.educations[index].endDate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.educations &&
                            formik.touched.educations[index] &&
                            formik.touched.educations[index].endDate &&
                            Boolean(formik.errors.educations?.[index]?.endDate)
                          }
                          helperText={
                            formik.touched.educations &&
                            formik.touched.educations[index] &&
                            formik.touched.educations[index].endDate &&
                            formik.errors.educations?.[index]?.endDate
                          }
                        />
                      </Stack>

                      <TextField
                        fullWidth
                        margin="normal"
                        id={`educations[${index}].description`}
                        name={`educations[${index}].description`}
                        label="Description"
                        multiline
                        rows={2}
                        value={formik.values.educations[index].description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.educations &&
                          formik.touched.educations[index] &&
                          formik.touched.educations[index].description &&
                          Boolean(
                            formik.errors.educations?.[index]?.description
                          )
                        }
                        helperText={
                          formik.touched.educations &&
                          formik.touched.educations[index] &&
                          formik.touched.educations[index].description &&
                          formik.errors.educations?.[index]?.description
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
                      degree: "",
                      schoolName: "",
                      startDate: "",
                      endDate: null,
                      description: "",
                    })
                  }
                >
                  Add Education
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
