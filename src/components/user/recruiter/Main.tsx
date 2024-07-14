import AddIcon from "@mui/icons-material/Add";

import { Button, Pagination, Skeleton, paginationClasses } from "@mui/material";
import { FlexBetween } from "../../ui";
import { Link, useNavigate } from "react-router-dom";
import useColors from "../../../hooks/useColor";
import JobCard from "../../jobs/JobCard";
import { IJobCard } from "../../../types";
import { useEffect, useState } from "react";
import { getJobCards } from "../../../api/jobs";
import { usePagination } from "../../../hooks/use-pagination";

function RecruiterMain() {
  const { secondary } = useColors();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<IJobCard[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const { pageNumber, navigateToPage } = usePagination();

  const fetchJobs = async () => {
    try {
      const response = await getJobCards(pageNumber);

      if (response) {
        setJobs(response.jobs);
        setTotalPages(response.totalPages);
      }
    } catch (error: any) {
      console.log(error);
      navigate(`/error?message=${error.response.data.message}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <>
      <FlexBetween className="mt-7 mb-10">
        <h1 className="main-header" style={{ color: secondary }}>
          Your Jobs
        </h1>
        <Button variant="outlined" className="flex items-center gap-2">
          <Link to="/jobs/create">
            <AddIcon /> Add Job
          </Link>
        </Button>
      </FlexBetween>

      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton variant="rectangular" height={300} />
          <Skeleton variant="rectangular" height={300} />
          <Skeleton variant="rectangular" height={300} />
        </div>
      ) : jobs.length > 0 ? (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job: any) => (
              <JobCard key={job.id} job={job} type="recruiterPage" />
            ))}
          </div>

          <Pagination
            page={pageNumber}
            onChange={(_, page) => navigateToPage(page)}
            count={totalPages}
            sx={{
              mt: 8,
              [`& .${paginationClasses.ul}`]: {
                justifyContent: "center",
              },
            }}
          />
        </>
      ) : (
        <div className="text-center">
          <h1 className="font-bold text-2xl">No Jobs Found</h1>
        </div>
      )}
    </>
  );
}

export default RecruiterMain;
