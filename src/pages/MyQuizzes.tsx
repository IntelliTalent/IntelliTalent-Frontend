import { Container } from "@mui/material";
import { AuthGuard, RoleBasedGuard } from "../components/guard";
import { UserType } from "../enums";
import { MyQuizzesView } from "../components/quiz";

export default function MyQuizzes() {
  document.title = "My Quizzes | Intelli-Talent";

  return (
    <AuthGuard>
      <RoleBasedGuard roles={[UserType.jobSeeker]}>
        <Container>
          <MyQuizzesView />
        </Container>
      </RoleBasedGuard>
    </AuthGuard>
  );
}
