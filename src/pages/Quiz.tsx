import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizForm } from "../components/quiz";
import useColors from "../hooks/useColor";
import { getQuiz } from "../api/quiz";
import { IQuiz } from "../types";
import { AuthGuard, RoleBasedGuard } from "../components/guard";
import { UserType } from "../enums";
import { FlexCenter } from "../components/ui";

function Quiz() {
  document.title = "Quiz | Intelli-Talent";

  const { mode } = useColors();
  const { slug } = useParams();
  const [questions, setQuestions] = useState<IQuiz[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuiz(slug!);

        setQuestions(response.questions);
      } catch (error: any) {
        console.log(error);
        navigate(`/error?message=${error.response.data.message}`);
      }
    };

    fetchQuiz();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

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
            {questions.length > 0 && slug && (
              <QuizForm slug={slug} questions={questions} />
            )}
          </Container>
        </FlexCenter>
      </RoleBasedGuard>
    </AuthGuard>
  );
}

export default Quiz;
