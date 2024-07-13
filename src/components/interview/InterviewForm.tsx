import { useCallback, useEffect, useRef, useState } from "react";
import { addLeadingZero } from "../../utils/add-leading-zero";
import useColors from "../../hooks/useColor";
import { Button, Modal } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

import "./interview.css";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../../api/core";
import { submitInterviewAnswers } from "../../api/interview";
import { LoadingModal } from "../ui";

function VoiceRecord({
  setCurrentVoiceAnswer,
}: {
  setCurrentVoiceAnswer: any;
}) {
  const { startListening, stopListening } = useSpeechRecognition();
  const [isRecording, setIsRecording] = useState(false);
  const [canRecord, setCanRecord] = useState(false);
  const chunksRef = useRef<Blob[]>([]);
  const [recorder, setRecorder] = useState<MediaRecorder>();

  const setupStream = (stream: MediaStream) => {
    const recorder = new MediaRecorder(stream);
    setRecorder(recorder);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, {
        type: "audio/ogg; codecs=opus",
      });
      setCurrentVoiceAnswer(blob);

      // TODO: Remove this part
      // Download the audio
      // const url = URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", "recording.ogg");
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);

      chunksRef.current = [];
    };

    setCanRecord(true);
  };

  const toggleMic = () => {
    if (!canRecord) return;

    setIsRecording((prev) => !prev);

    if (isRecording) {
      recorder?.stop();
      stopListening();
    } else {
      recorder?.start();
      startListening();
    }
  };

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then(setupStream)
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return canRecord ? (
    <button
      className={`mic-toggle ${isRecording ? "is-recording" : ""}`}
      onClick={toggleMic}
    >
      <MicIcon className="z-10 text-[#fff]" fontSize="large" />
    </button>
  ) : (
    <p>Please allow microphone access</p>
  );
}

function InterviewForm({
  jobId,
  profileId,
  questions,
}: {
  jobId: string;
  profileId: string;
  questions: string[];
}) {
  const { mode, primary, error } = useColors();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { text } = useSpeechRecognition();

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [currentVoiceAnswer, setCurrentVoiceAnswer] = useState(null);
  const [currentTextAnswer, setCurrentTextAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const [showLeftModal, setShowLeftModal] = useState(false);
  const [left, setLeft] = useState(0);

  const handleFinish = useCallback(async () => {
    try {
      setLoading(true);

      const textAnswers = [];
      const linksAnswers = [];

      // Upload all recoreded answers and get the links
      for (const answer in answers) {
        const { link } = await uploadFile(answers[answer].voice);
        textAnswers.push(answers[answer].text);
        linksAnswers.push(link);
      }

      await submitInterviewAnswers(
        jobId,
        profileId,
        questions,
        textAnswers,
        linksAnswers
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    navigate("/interviews");
  }, [answers, jobId, navigate, profileId, questions]);

  useEffect(() => {
    if (text) {
      setCurrentTextAnswer(text);
    }
  }, [text]);

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

  const handleNext = () => {
    answers[currentQuestion] = {
      voice: currentVoiceAnswer,
      text: currentTextAnswer,
    };
    setAnswers(answers);

    setCurrentVoiceAnswer(null);
    setCurrentTextAnswer("");

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const renderQuestionNumber = (
    <div className="mb-2">
      <span className="text-xl font-bold" style={{ color: primary }}>
        {addLeadingZero(currentQuestion + 1)}
      </span>
      /<span className="font-medium">{addLeadingZero(questions.length)}</span>
    </div>
  );

  const renderButtons = (
    <div className="flex justify-end">
      <Button
        variant="outlined"
        onClick={handleNext}
        disabled={currentVoiceAnswer === null}
      >
        {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
      </Button>
    </div>
  );

  const renderRecordVoice = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center mb-5">
      <div className="col-span-1 m-auto">
        <VoiceRecord setCurrentVoiceAnswer={setCurrentVoiceAnswer} />
      </div>
      <div className="col-span-2">
        <textarea
          className={`border rounded-md p-3 block m-auto w-full ${
            mode === "dark" ? "bg-[#1a1a1a85]" : ""
          }`}
          readOnly={true}
          rows={6}
          value={currentTextAnswer}
          placeholder="Your Answer Will Appear Here"
        ></textarea>
      </div>
    </div>
  );

  const renderLeftModal = (
    <Modal open={showLeftModal} onClose={() => setShowLeftModal(false)}>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-10 rounded-xl ${
          mode === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <p className="text-xl font-bold mb-5" style={{ color: error }}>
          You attempted to leave the interview. If you leave again, your
          progress will be lost.
        </p>
      </div>
    </Modal>
  );

  return (
    <>
      <div>
        {renderQuestionNumber}

        <h2 className="text-xl font-bold mb-5 h-16">
          {questions[currentQuestion]}
        </h2>

        {renderRecordVoice}

        {renderButtons}
      </div>
      {renderLeftModal}

      <LoadingModal loading={loading} />
    </>
  );
}

export default InterviewForm;
