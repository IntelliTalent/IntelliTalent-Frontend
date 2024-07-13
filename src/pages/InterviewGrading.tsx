import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InterviewGradingView } from "../components/interview";
import { getInterviewAnswers } from "../api/interview";
import { AuthGuard, RoleBasedGuard } from "../components/guard";
import { UserType } from "../enums";

function InterviewGrading() {
  document.title = "Interview Grading | Intelli-Talent";

  const { jobId, profileId } = useParams();
  const navigate = useNavigate();

  const [userAnswers, setUserAnswers] = useState({
    answers: [],
    questions: [],
    recordedAnswers: [],
  });

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await getInterviewAnswers(jobId!, profileId!);
        setUserAnswers(response);
      } catch (error: any) {
        console.error(error);
        navigate(`/error?message=${error.response.data.message}`);
      }
    };

    fetchAnswers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthGuard>
      <RoleBasedGuard roles={[UserType.recruiter]}>
        {jobId && profileId && userAnswers.questions.length > 0 && (
          <InterviewGradingView
            jobId={jobId}
            profileId={profileId}
            userAnswers={userAnswers}
          />
        )}
      </RoleBasedGuard>
    </AuthGuard>
  );
}

export default InterviewGrading;
