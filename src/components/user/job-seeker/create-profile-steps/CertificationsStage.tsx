import { Button, Container, IconButton, Stack, TextField } from "@mui/material";
import { FieldArray, FormikProvider, getIn } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useCallback } from "react";

export default function CertificationsStage({ formik, setActiveStep }: any) {
  const isError = useCallback(() => {
    return formik.values.certifications.some((_: any, index: number) => {
      const fields = ["title", "authority", "issuedAt", "url"];
      return fields.some((field) =>
        getIn(formik.errors, `certifications[${index}].${field}`)
      );
    });
  }, [formik.errors, formik.values]);

  const handleFinish = () => {
    formik.handleSubmit();
  };

  const handleBack = () => {
    setActiveStep((prev: number) => prev - 1);
  };

  return (
    <Container sx={{ mb: 10 }}>
      <Stack spacing={2}>
        <FormikProvider value={formik}>
          <FieldArray
            name="certifications"
            validateOnChange
            render={(arrayHelpers) => (
              <>
                {formik.values.certifications.map((_: any, index: number) => (
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
                          id={`certifications[${index}].title`}
                          name={`certifications[${index}].title`}
                          label="Certification Title"
                          value={formik.values.certifications[index].title}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.certifications &&
                            formik.touched.certifications[index] &&
                            formik.touched.certifications[index].title &&
                            Boolean(
                              formik.errors.certifications?.[index]?.title
                            )
                          }
                          helperText={
                            formik.touched.certifications &&
                            formik.touched.certifications[index] &&
                            formik.touched.certifications[index].title &&
                            formik.errors.certifications?.[index]?.title
                          }
                        />
                        <TextField
                          fullWidth
                          margin="normal"
                          id={`certifications[${index}].authority`}
                          name={`certifications[${index}].authority`}
                          label="Issuing Authority"
                          value={formik.values.certifications[index].authority}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.certifications &&
                            formik.touched.certifications[index] &&
                            formik.touched.certifications[index].authority &&
                            Boolean(
                              formik.errors.certifications?.[index]?.authority
                            )
                          }
                          helperText={
                            formik.touched.certifications &&
                            formik.touched.certifications[index] &&
                            formik.touched.certifications[index].authority &&
                            formik.errors.certifications?.[index]?.authority
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
                          id={`certifications[${index}].issuedAt`}
                          name={`certifications[${index}].issuedAt`}
                          label="Issue Date"
                          InputLabelProps={{ shrink: true }}
                          value={formik.values.certifications[index].issuedAt}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.certifications &&
                            formik.touched.certifications[index] &&
                            formik.touched.certifications[index].issuedAt &&
                            Boolean(
                              formik.errors.certifications?.[index]?.issuedAt
                            )
                          }
                          helperText={
                            formik.touched.certifications &&
                            formik.touched.certifications[index] &&
                            formik.touched.certifications[index].issuedAt &&
                            formik.errors.certifications?.[index]?.issuedAt
                          }
                        />

                        <TextField
                          fullWidth
                          margin="normal"
                          type="date"
                          id={`certifications[${index}].validUntil`}
                          name={`certifications[${index}].validUntil`}
                          label="Valid Until"
                          InputLabelProps={{ shrink: true }}
                          value={formik.values.certifications[index].validUntil}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.certifications &&
                            formik.touched.certifications[index] &&
                            formik.touched.certifications[index].validUntil &&
                            Boolean(
                              formik.errors.certifications?.[index]?.validUntil
                            )
                          }
                          helperText={
                            formik.touched.certifications &&
                            formik.touched.certifications[index] &&
                            formik.touched.certifications[index].validUntil &&
                            formik.errors.certifications?.[index]?.validUntil
                          }
                        />
                      </Stack>

                      <TextField
                        fullWidth
                        margin="normal"
                        id={`certifications[${index}].url`}
                        name={`certifications[${index}].url`}
                        label="Certification URL"
                        value={formik.values.certifications[index].url}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.certifications &&
                          formik.touched.certifications[index] &&
                          formik.touched.certifications[index].url &&
                          Boolean(formik.errors.certifications?.[index]?.url)
                        }
                        helperText={
                          formik.touched.certifications &&
                          formik.touched.certifications[index] &&
                          formik.touched.certifications[index].url &&
                          formik.errors.certifications?.[index]?.url
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
                      title: "",
                      authority: "",
                      issuedAt: "",
                      validUntil: null,
                      url: "",
                    })
                  }
                >
                  Add Certification
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
            color="success"
            variant="contained"
            onClick={handleFinish}
            disabled={isError()}
          >
            Finish
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
