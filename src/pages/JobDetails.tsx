import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JobInfo } from "../components/jobs";
import { getJobById } from "../api/jobs";
import { IJobDetails } from "../types";

function JobDetails() {
  document.title = "Intelli-Talent";

  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState<IJobDetails | null>(null);

  useEffect(() => {
    const fetchJobById = async () => {
      try {
        const response = await getJobById(jobId!);

        if (response) {
          setJob(response);
          document.title = response.title;
        }
      } catch (error: any) {
        navigate(`/error?message=${error.response.data.message}`);
      }
    };

    fetchJobById();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return job && <JobInfo job={job} />;
}

export default JobDetails;
