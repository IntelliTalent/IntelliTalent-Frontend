import { Container, Skeleton } from "@mui/material";
import useColors from "../../hooks/useColor";
import JobCard from "./JobCard";
import { IJobCard } from "../../types";

function AppliedJobs({
  jobTitle,
  jobs,
  loading,
}: {
  jobTitle: string;
  jobs: IJobCard[];
  loading: boolean;
}) {
  const { secondary } = useColors();

  return (
    <Container>
      <h1 className="main-header mt-7 mb-10" style={{ color: secondary }}>
        {jobTitle} Applied Jobs
      </h1>

      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton variant="rectangular" height={300} />
          <Skeleton variant="rectangular" height={300} />
          <Skeleton variant="rectangular" height={300} />
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job: any) => (
              <JobCard key={job.id} job={job} type="appliedJobs" />
            ))}
          </div>

          {jobs.length === 0 && (
            <p className="ms-2 text-xl">No applied jobs yet</p>
          )}
        </>
      )}
    </Container>
  );
}

export default AppliedJobs;
