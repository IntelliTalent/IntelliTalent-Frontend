import { Container } from "@mui/material";
import { JobSeeker, Main, Recruiter } from "../components/home";
import { useSearchParams } from "react-router-dom";

function Home() {
  document.title = "Intelli-Talent";
  const query = useSearchParams();

  return (
    <Container>
      {query[0].get("page") === null ? (
        <Main />
      ) : query[0].get("page") === "Job Seeker" ? (
        <JobSeeker />
      ) : (
        <Recruiter />
      )}
    </Container>
  );
}

export default Home;
