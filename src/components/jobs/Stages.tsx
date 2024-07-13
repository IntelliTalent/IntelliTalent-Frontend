import useColors from "../../hooks/useColor";
import interviewIcon from "../../assets/icons/interview-icon.svg";
import darkInterviewIcon from "../../assets/icons/interview-icon-dark.svg";
import quizIcon from "../../assets/icons/quiz-icon.svg";
import darkQuizIcon from "../../assets/icons/quiz-icon-dark.svg";
import appliedIcon from "../../assets/icons/applied-icon.svg";
import darkAppliedIcon from "../../assets/icons/applied-icon-dark.svg";
import activeIcon from "../../assets/icons/active-icon-light.png";
import darkActiveIcon from "../../assets/icons/active-icon-dark.png";
import finalIcon from "../../assets/icons/final-icon-light.png";
import darkFinalIcon from "../../assets/icons/final-icon-dark.png";
import failedIcon from "../../assets/icons/failed-icon-light.png";
import darkFailedIcon from "../../assets/icons/failed-icon-dark.png";

function Stages() {
  const { mode } = useColors();

  const renderQuizStage = (
    <div className="flex gap-2 items-center">
      <img
        src={mode === "dark" ? darkQuizIcon : quizIcon}
        alt="interview-icon"
        width={30}
      />{" "}
      Quiz
    </div>
  );

  const renderInterviewStage = (
    <div className="flex gap-2 items-center">
      <img
        src={mode === "dark" ? darkInterviewIcon : interviewIcon}
        alt="interview-icon"
        width={30}
      />{" "}
      Interview
    </div>
  );

  const renderAppliedStage = (
    <div className="flex gap-2 items-center">
      <img
        src={mode === "dark" ? darkAppliedIcon : appliedIcon}
        alt="interview-icon"
        width={30}
      />{" "}
      Applied
    </div>
  );

  const renderActiveStage = (
    <div className="flex gap-2 items-center">
      <img
        src={mode === "dark" ? darkActiveIcon : activeIcon}
        alt="interview-icon"
        width={30}
      />{" "}
      Active
    </div>
  );

  const renderFinalStage = (
    <div className="flex gap-2 items-center">
      <img
        src={mode === "dark" ? darkFinalIcon : finalIcon}
        alt="final-icon"
        width={30}
      />{" "}
      Final
    </div>
  );

  const renderFailed = (
    <div className="flex gap-2 items-center">
      <img
        src={mode === "dark" ? darkFailedIcon : failedIcon}
        alt="failed-icon"
        width={30}
      />{" "}
      Failed
    </div>
  );

  const renderCandidate = (
    <div className="flex gap-2 items-center">
      <img
        src={mode === "dark" ? darkFinalIcon : finalIcon}
        alt="candidate-icon"
        width={30}
      />{" "}
      Candidate
    </div>
  );

  const renderSelected = (
    <div className="flex gap-2 items-center">
      <img
        src={mode === "dark" ? darkFinalIcon : finalIcon}
        alt="selected-icon"
        width={30}
      />{" "}
      Selected
    </div>
  );

  return {
    renderQuizStage,
    renderInterviewStage,
    renderAppliedStage,
    renderActiveStage,
    renderFinalStage,
    renderFailed,
    renderCandidate,
    renderSelected,
  };
}

export default Stages;
