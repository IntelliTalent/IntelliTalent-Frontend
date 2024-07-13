import { Container } from "@mui/material";
import { useEffect } from "react";
import { JobSeekerMain, RecruiterMain } from "../components/user";
import { UserType } from "../enums";
import { AuthGuard } from "../components/guard";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function User() {
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    document.title = `${user?.firstName}'s ${
      user?.type === UserType.jobSeeker ? "Profiles" : "Jobs"
    }`;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthGuard>
      <Container>
        {user?.type === UserType.jobSeeker ? (
          <JobSeekerMain />
        ) : (
          <RecruiterMain />
        )}
      </Container>
    </AuthGuard>
  );
}

export default User;
