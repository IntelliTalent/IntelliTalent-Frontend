import { Container } from "@mui/material";
import { AuthGuard, RoleBasedGuard } from "../components/guard";
import { UserType } from "../enums";
import { MyInterviewsView } from "../components/interview";

export default function MyInterviews() {
  document.title = "My Interviews | Intelli-Talent";

  return (
    <AuthGuard>
      <RoleBasedGuard roles={[UserType.jobSeeker]}>
        <Container>
          <MyInterviewsView />
        </Container>
      </RoleBasedGuard>
    </AuthGuard>
  );
}
