import { useCallback, useEffect, useRef, useState } from "react";
import { addLeadingZero } from "../../utils/add-leading-zero";
import useColors from "../../hooks/useColor";
import { Button, Container, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { reviewInterviewQuestions } from "../../api/interview";

export default function InterviewGrading({
  jobId,
  profileId,
  userAnswers,
}: {
  jobId: string;
  profileId: string;
  userAnswers: {
    answers: string[];
    questions: string[];
    recordedAnswers: string[];
  };
}) {
  const navigate = useNavigate();

  const { questions, recordedAnswers, answers } = userAnswers;

  const { mode, primary, error } = useColors();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [grade, setGrade] = useState<number | null>(null);
  const [grades, setGrades] = useState(Array(questions.length).fill(null));
  const [currentVoiceAnswer, setCurrentVoiceAnswer] = useState(
    recordedAnswers[0]
  );
  const [currentTextAnswer, setCurrentTextAnswer] = useState(answers[0]);

  const handleFinish = useCallback(async () => {
    try {
      await reviewInterviewQuestions(jobId, profileId, grades);
    } catch (error: any) {
      console.log(error);
      navigate(`/error?message=${error.response.data.message}`);
    }

    navigate(`/jobs/${jobId}/applicants/interviewed`);
  }, [grades, jobId, navigate, profileId]);

  const handleNext = () => {
    grades[currentQuestion] = grade! > 100 ? 100 : Math.round(grade!);
    setGrades(grades);
    setGrade(null);

    if (currentQuestion !== answers.length - 1) {
      setCurrentQuestion((prev) => prev + 1);

      setCurrentVoiceAnswer(recordedAnswers[currentQuestion + 1]);
      setCurrentTextAnswer(answers[currentQuestion + 1]);
    } else {
      handleFinish();
    }
  };

  const renderQuestionNumber = (
    <div className="mb-2">
      <span className="text-xl font-bold" style={{ color: primary }}>
        {addLeadingZero(currentQuestion + 1)}
      </span>
      /<span className="font-medium">{addLeadingZero(answers.length)}</span>
    </div>
  );

  const renderButtons = (
    <div className="flex justify-between items-center gap-3">
      <TextField
        name="grade"
        label="Grade"
        helperText="Enter grade between 0 and 100"
        value={grade !== null ? grade : ""}
        onChange={(e) =>
          setGrade(Number(e.target.value) > 100 ? 100 : Number(e.target.value))
        }
        type="number"
        inputProps={{
          min: 0,
          max: 100,
        }}
      />

      <Button
        variant="outlined"
        onClick={handleNext}
        disabled={grade === null}
        sx={{ height: "fit-content" }}
      >
        {currentQuestion === answers.length - 1 ? "Finish" : "Next"}
      </Button>
    </div>
  );

  const renderShowAnswer = (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center mb-5">
      <div className="col-span-1 m-auto">
        <audio src={currentVoiceAnswer} controls></audio>
      </div>
      <div className="col-span-2">
        <textarea
          className={`border rounded-md p-3 block m-auto w-full ${
            mode === "dark" ? "bg-[#1a1a1a85]" : ""
          }`}
          readOnly={true}
          rows={6}
          value={currentTextAnswer}
        ></textarea>
      </div>
    </div>
  );

  return (
    <Container>
      <Paper elevation={3} className="p-5 mt-10">
        {renderQuestionNumber}

        <h2 className="text-xl font-bold mb-5 h-16">
          {questions[currentQuestion]}
        </h2>

        {renderShowAnswer}

        {renderButtons}
      </Paper>
    </Container>
  );
}
