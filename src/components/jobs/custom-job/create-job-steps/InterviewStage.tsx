import { Button, Container, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { FieldArray, FormikProvider, getIn } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function InterviewStage({ formik, setActiveStep }: any) {
  const [interviewAdded, setInterviewAdded] = useState(
    !!formik.values.interviewEndDate
  );

  const handleBack = () => {
    setActiveStep((prev: number) => prev - 1);
  };

  const handleFinish = () => {
    formik.handleSubmit();
  };

  const handleAddInterview = () => {
    setInterviewAdded(true);
    formik.setFieldValue("interviewQuestions", [""]);
  };

  const handleRemoveInterview = () => {
    setInterviewAdded(false);
    formik.setFieldValue("interviewEndDate", "");
    formik.setFieldValue("interviewQuestions", []);
  };

  const isInterviewStageValid = () => {
    return (
      formik.values.interviewEndDate &&
      formik.values.interviewQuestions.every(
        (question: string) => question.trim() !== ""
      )
    );
  };

  return (
    <Container sx={{ mb: 10 }}>
      <Stack spacing={2}>
        {interviewAdded ? (
          <FormikProvider value={formik}>
            <>
              <TextField
                fullWidth
                margin="normal"
                type="date"
                id="interviewEndDate"
                name="interviewEndDate"
                label="Interview End Date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.interviewEndDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.interviewEndDate &&
                  Boolean(formik.errors.interviewEndDate)
                }
                helperText={
                  formik.touched.interviewEndDate &&
                  formik.errors.interviewEndDate
                }
              />

              <FieldArray
                name="interviewQuestions"
                render={(arrayHelpers) => (
                  <>
                    {formik.values.interviewQuestions.map(
                      (_: any, index: number) => (
                        <Stack
                          key={index}
                          direction="row"
                          spacing={2}
                          alignItems="center"
                        >
                          <TextField
                            fullWidth
                            margin="normal"
                            id={`interviewQuestions[${index}]`}
                            name={`interviewQuestions[${index}]`}
                            label={`Question ${index + 1}`}
                            value={formik.values.interviewQuestions[index]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              getIn(
                                formik.touched,
                                `interviewQuestions[${index}]`
                              ) &&
                              Boolean(
                                getIn(
                                  formik.errors,
                                  `interviewQuestions[${index}]`
                                )
                              )
                            }
                            helperText={
                              getIn(
                                formik.touched,
                                `interviewQuestions[${index}]`
                              ) &&
                              getIn(
                                formik.errors,
                                `interviewQuestions[${index}]`
                              )
                            }
                          />
                          <IconButton
                            onClick={() => arrayHelpers.remove(index)}
                            sx={{ width: "fit-content" }}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Stack>
                      )
                    )}
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => arrayHelpers.push("")}
                    >
                      Add Question
                    </Button>
                  </>
                )}
              />

              <Button
                variant="outlined"
                color="error"
                onClick={handleRemoveInterview}
              >
                Remove Interview Stage
              </Button>
            </>
          </FormikProvider>
        ) : (
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddInterview}
          >
            Add Interview Stage
          </Button>
        )}

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
            disabled={
              (interviewAdded && !isInterviewStageValid()) ||
              Boolean(formik.errors["interviewEndDate"])
            }
          >
            Finish
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
