import useColors from "../../hooks/useColor";
import { FlexBetween } from "../ui";
import WorkIcon from "@mui/icons-material/Work";
import FilterSection from "./FilterSection";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { usePagination } from "../../hooks/use-pagination";
import {
  Container,
  Pagination,
  Skeleton,
  Typography,
  paginationClasses,
} from "@mui/material";
import { getJobs } from "../../api/jobs";
import { IJob } from "../../types";

function FindJobs() {
  const { primary, primaryContrast } = useColors();
  const [totalPages, setTotalPages] = useState(0);
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobLocation, setJobLocation] = useState<string>("");
  const [jobType, setJobType] = useState<string[]>([]);
  const [publishDate, setPublishDate] = useState<string>("");
  const [jobPlace, setJobPlace] = useState<string[]>([]);
  const [computerScienceRequired, setComputerScienceRequired] = useState("");
  const [jobSource, setJobSource] = useState<string[]>([]);

  const { pageNumber, navigateToPage } = usePagination();

  const fetchJobs = async () => {
    try {
      const response = await getJobs({
        jobTitle,
        jobLocation,
        jobType,
        publishDate,
        jobPlace,
        jobSource,
        computerScienceRequired,
        pageNumber,
      });

      if (response) {
        setJobs(response.jobs);
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <Container className="py-8">
      <div className="space-y-10">
        <FlexBetween
          className="p-10 rounded-lg shadow-md"
          style={{ backgroundColor: primary, color: primaryContrast }}
        >
          <div className="flex flex-col gap-3">
            <p className="text-4xl font-bold">Looking for a new opportunity?</p>
            <p className="font-semibold">Browse our latest job openings</p>
          </div>
          <WorkIcon style={{ fontSize: "4rem" }} />
        </FlexBetween>

        <FilterSection
          filterJobs={fetchJobs}
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          jobLocation={jobLocation}
          setJobLocation={setJobLocation}
          jobType={jobType}
          setJobType={setJobType}
          publishDate={publishDate}
          setPublishDate={setPublishDate}
          jobPlace={jobPlace}
          setJobPlace={setJobPlace}
          computerScienceRequired={computerScienceRequired}
          setComputerScienceRequired={setComputerScienceRequired}
          jobSource={jobSource}
          setJobSource={setJobSource}
        />

        {loading ? (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <Skeleton variant="rectangular" height={250} />
            <Skeleton variant="rectangular" height={250} />
            <Skeleton variant="rectangular" height={250} />
            <Skeleton variant="rectangular" height={250} />
            <Skeleton variant="rectangular" height={250} />
            <Skeleton variant="rectangular" height={250} />
          </div>
        ) : jobs.length > 0 ? (
          <>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} type="listing" />
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
          <div className="flex justify-center">
            <Typography variant="h5">No jobs found</Typography>
          </div>
        )}
      </div>
    </Container>
  );
}

export default FindJobs;
