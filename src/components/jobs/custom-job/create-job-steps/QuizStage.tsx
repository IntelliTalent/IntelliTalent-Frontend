import { Button, Container, Stack, TextField } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export default function QuizStage({ formik, setActiveStep }: any) {
  const [quizAdded, setQuizAdded] = useState(!!formik.values.quizEndDate);

  const handleNext = () => {
    if (quizAdded && !formik.values.quizEndDate) {
      formik.setFieldTouched("quizEndDate", true, true);
    } else {
      setActiveStep((prev: number) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev: number) => prev - 1);
  };

  const handleAddQuiz = () => {
    setQuizAdded(true);
  };

  const handleRemoveQuiz = () => {
    setQuizAdded(false);
    formik.setFieldValue("quizEndDate", "");
  };

  return (
    <Container sx={{ mb: 10 }}>
      <Stack spacing={2}>
        {quizAdded ? (
          <>
            <TextField
              fullWidth
              margin="normal"
              type="date"
              id="quizEndDate"
              name="quizEndDate"
              label="Quiz End Date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.quizEndDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.quizEndDate && Boolean(formik.errors.quizEndDate)
              }
              helperText={
                formik.touched.quizEndDate && formik.errors.quizEndDate
              }
            />
            <Button variant="outlined" color="error" onClick={handleRemoveQuiz}>
              Remove Quiz Stage
            </Button>
          </>
        ) : (
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddQuiz}
          >
            Add Quiz Stage
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
            color="primary"
            variant="contained"
            onClick={handleNext}
            disabled={
              (quizAdded && !formik.values.quizEndDate) ||
              Boolean(formik.errors["quizEndDate"])
            }
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
