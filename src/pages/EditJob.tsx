import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditJobView } from "../components/jobs";
import { getJobDetailsById } from "../api/jobs";
import { IJobDetails } from "../types";
import { AuthGuard, RoleBasedGuard } from "../components/guard";
import { UserType } from "../enums";

function EditJob() {
  document.title = "Edit Job | Intelli-Talent";

  const { jobId } = useParams();

  const [job, setJob] = useState<IJobDetails | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      const response = await getJobDetailsById(jobId!);
      setJob(response);
    };

    fetchJob();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthGuard>
      <RoleBasedGuard roles={[UserType.recruiter]}>
        {job && <EditJobView job={job} />}
      </RoleBasedGuard>
    </AuthGuard>
  );
}

export default EditJob;
