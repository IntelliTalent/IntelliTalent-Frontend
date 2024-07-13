import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InterviewedJobApplicantsView } from "../components/user";
import { getJobById } from "../api/jobs";
import { IJobDetails } from "../types";
import { AuthGuard, RoleBasedGuard } from "../components/guard";
import { UserType } from "../enums";

function InterviewedJobApplicants() {
  document.title = "Interviewed Applicants | Intelli-Talent";

  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState<IJobDetails | null>(null);

  useEffect(() => {
    const fetchJobById = async () => {
      try {
        const response = await getJobById(jobId!);

        if (response?.currentStage !== "Interview") {
          navigate("/404");
        }

        if (response) {
          setJob(response);
        }
      } catch (error: any) {
        navigate(`/error?message=${error.response.data.message}`);
      }
    };

    fetchJobById();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthGuard>
      <RoleBasedGuard roles={[UserType.recruiter]}>
        {job && <InterviewedJobApplicantsView jobInfo={job} />}
      </RoleBasedGuard>
    </AuthGuard>
  );
}

export default InterviewedJobApplicants;
