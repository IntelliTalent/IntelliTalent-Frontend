import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InterviewForm } from "../components/interview";
import useColors from "../hooks/useColor";
import { AuthGuard, RoleBasedGuard } from "../components/guard";
import { UserType } from "../enums";
import { getInterview } from "../api/interview";
import { FlexCenter } from "../components/ui";

function Interview() {
  document.title = "Interview | Intelli-Talent";

  const { mode } = useColors();
  const navigate = useNavigate();
  const { profileId, jobId } = useParams();
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await getInterview(jobId!);

        setQuestions(response.questions);
      } catch (error: any) {
        console.error(error);
        navigate(`/error?message=${error.response.data.message}`);
      }
    };

    fetchInterview();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthGuard>
      <RoleBasedGuard roles={[UserType.jobSeeker]}>
        <FlexCenter>
          <Container
            sx={{ mx: 5 }}
            className={`${
              mode === "dark" ? "bg-black" : "bg-white"
            } mt-20 rounded-xl p-10 m-auto shadow-xl border`}
          >
            {questions.length > 0 && jobId && profileId && (
              <InterviewForm
                jobId={jobId}
                profileId={profileId}
                questions={questions}
              />
            )}
          </Container>
        </FlexCenter>
      </RoleBasedGuard>
    </AuthGuard>
  );
}

export default Interview;
