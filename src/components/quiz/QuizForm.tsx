import { useCallback, useEffect, useState } from "react";
import useColors from "../../hooks/useColor";
import { FlexBetween } from "../ui";
import { Button, Modal } from "@mui/material";
import { addLeadingZero } from "../../utils/add-leading-zero";
import { IQuiz } from "../../types";
import { submitAnswers } from "../../api/quiz";
import { useNavigate } from "react-router-dom";

function QuizForm({ slug, questions }: { slug: string; questions: IQuiz[] }) {
  const {
    mode,
    primary,
    primaryContrast,
    success,
    successContrast,
    error,
    errorContrast,
  } = useColors();
  const navigate = useNavigate();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showLeftModal, setShowLeftModal] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(-1));
  const [left, setLeft] = useState(0);

  const handleFinish = useCallback(async () => {
    try {
      await submitAnswers(slug, answers);
    } catch (error) {
      console.log(error);
    }

    navigate("/quizzes");
  }, [answers, navigate, slug]);

  useEffect(() => {
    const handleNotActive = () => {
      setLeft((prev) => prev + 1);
      setShowLeftModal(true);

      if (left > 1) {
        handleFinish();
      }
    };

    window.addEventListener("blur", handleNotActive);

    return () => {
      window.removeEventListener("blur", handleNotActive);
    };
  }, [left, handleFinish]);

  const handleBack = () => {
    if (activeQuestion !== 0) {
      setActiveQuestion((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowFinishModal(true);
    }
  };

  const onAnswerSelected = (answer: string, index: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[activeQuestion] = index;
      return newAnswers;
    });
  };

  const renderQuestionNumber = (
    <div className="mb-2">
      <span className="text-xl font-bold" style={{ color: primary }}>
        {addLeadingZero(activeQuestion + 1)}
      </span>
      /<span className="font-medium">{addLeadingZero(questions.length)}</span>
    </div>
  );

  const renderChoices = (
    <ul className="space-y-2 mb-5">
      {questions[activeQuestion].answers.map(
        (answer: string, index: number) => (
          <li
            aria-label={`answer-${index + 1}`}
            onClick={() => onAnswerSelected(answer, index)}
            key={index}
            style={{
              backgroundColor: answers[activeQuestion] === index ? primary : "",
              color: answers[activeQuestion] === index ? primaryContrast : "",
            }}
            className="p-2 border-2 rounded-xl ps-5 cursor-pointer"
          >
            {answer}
          </li>
        )
      )}
    </ul>
  );

  const renderQuestionNumbers = (
    <ul className="flex gap-3 justify-center flex-wrap mb-4">
      {questions.map((question: any, index: number) => (
        <li
          key={index}
          className="border-2 cursor-pointer w-8 h-8 flex justify-center items-center rounded-full"
          style={{
            backgroundColor:
              index === activeQuestion
                ? primary
                : answers[index] === -1
                ? error
                : success,
            color:
              index === activeQuestion
                ? primaryContrast
                : answers[index] === -1
                ? errorContrast
                : successContrast,
          }}
          onClick={() => setActiveQuestion(index)}
        >
          {index + 1}
        </li>
      ))}
    </ul>
  );

  const renderButtons = (
    <FlexBetween>
      <Button
        variant="outlined"
        onClick={handleBack}
        disabled={activeQuestion === 0}
      >
        Back
      </Button>

      <Button variant="outlined" onClick={handleNext} aria-label="next">
        {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
      </Button>
    </FlexBetween>
  );

  const renderFinishModal = (
    <Modal open={showFinishModal} onClose={() => setShowFinishModal(false)}>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-10 rounded-xl ${
          mode === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        {!answers.every((answer) => answer !== null) && (
          <h1 className="text-3xl font-bold mb-5">
            You didn't answer all the questions.
          </h1>
        )}
        <p className="text-xl font-bold mb-5">
          Are you sure you want to finish?
        </p>

        <FlexBetween>
          <Button
            variant="contained"
            color="error"
            onClick={() => setShowFinishModal(false)}
          >
            No
          </Button>
          <Button variant="contained" color="success" onClick={handleFinish}>
            Yes
          </Button>
        </FlexBetween>
      </div>
    </Modal>
  );

  const renderLeftModal = (
    <Modal open={showLeftModal} onClose={() => setShowLeftModal(false)}>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-10 rounded-xl ${
          mode === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <p className="text-xl font-bold mb-5" style={{ color: error }}>
          You attempted to leave the quiz. If you leave again, your progress
          will be lost.
        </p>
      </div>
    </Modal>
  );

  return (
    <>
      <div>
        {renderQuestionNumber}

        <h2 className="text-xl font-bold mb-5 h-16">
          {questions[activeQuestion].question}
        </h2>

        {renderChoices}

        {renderQuestionNumbers}

        {renderButtons}
      </div>
      {renderFinishModal}
      {renderLeftModal}
    </>
  );
}

export default QuizForm;
