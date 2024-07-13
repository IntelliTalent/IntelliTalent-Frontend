import ApartmentIcon from "@mui/icons-material/Apartment";
import PlaceIcon from "@mui/icons-material/Place";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import WorkIcon from "@mui/icons-material/Work";
import ComputerIcon from "@mui/icons-material/Computer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SchoolIcon from "@mui/icons-material/School";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import useColors from "../../hooks/useColor";
import { FlexBetween } from "../ui";
import { Button, Chip, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { UserType } from "../../enums";
import { useState } from "react";
import ApplyForAJob from "./ApplyForJob";
import { IJobDetails } from "../../types";

function JobInfo({ job }: { job: IJobDetails }) {
  const navigate = useNavigate();
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const {
    mode,
    primary,
    primaryContrast,
    secondary,
    secondaryContrast,
    error,
    errorContrast,
    warning,
    warningContrast,
  } = useColors();

  const scrappedJob = !job.url.includes(job.id);
  const isApplied = job?.isApplied;
  const user = useSelector((state: RootState) => state.user.user);

  const handleApply = () => {
    if (scrappedJob) {
      window.open(job.url, "_blank");
    } else if (user) {
      setApplyModalOpen(true);
    } else {
      navigate("/auth/sign-in");
    }
  };

  return (
    <>
      <Container>
        {/* Start Head of the Job */}
        <FlexBetween
          className="p-5 rounded-b-lg"
          style={{ backgroundColor: primary, color: primaryContrast }}
        >
          <div>
            <h1 className="text-4xl font-bold tracking-wide mb-3 font-inter">
              {job.title}
            </h1>
            <div className="flex gap-5">
              <p className="flex items-center gap-1">
                <ApartmentIcon />
                {job.company}
              </p>
              {job.jobLocation && (
                <p className="flex items-center gap-1">
                  <PlaceIcon />
                  {job.jobLocation}
                </p>
              )}
              {job.jobLocation && (
                <p className="flex items-center gap-1">
                  <WebAssetIcon />
                  {job.jobSource}
                </p>
              )}
            </div>
          </div>

          {(!user || user?.type === UserType.jobSeeker) && (
            <>
              {!isApplied ? (
                job.isActive && (
                  <Button
                    variant="outlined"
                    sx={{
                      color: primaryContrast,
                      borderColor: primaryContrast,
                      "&:hover": { borderColor: primaryContrast },
                    }}
                    onClick={handleApply}
                  >
                    Apply
                  </Button>
                )
              ) : (
                <Button
                  variant="contained"
                  aria-label="apply"
                  color="success"
                  startIcon={<CheckCircleOutlineIcon />}
                >
                  Applied
                </Button>
              )}
            </>
          )}
        </FlexBetween>
        {/* End Head of the Job */}

        <div className="px-10 mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="col-span-2 order-last md:order-first">
            {/* Start Job Description */}
            <div className="mb-7">
              <h1 className="text-2xl font-semibold border-b-2 pb-1 w-fit mb-3">
                Job Description
              </h1>
              <p className="font-inter">{job.description}</p>
            </div>
            {/* End Job Description */}

            {/* Start Skills */}
            <div className="mb-7">
              <h1 className="text-2xl font-semibold border-b-2 pb-1 w-fit mb-3">
                Required Skills
              </h1>

              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill: string) => (
                  <Chip key={skill} label={skill} />
                ))}
              </div>
            </div>
            {/* End Skills */}
          </div>

          <div className="col-span-1">
            {/* Start Education */}
            <div
              className={`mb-7 border p-4 shadow-md rounded-md ${
                mode === "light" ? "bg-white" : ""
              }`}
            >
              <h1 className="text-2xl font-semibold border-b-2 pb-1 w-fit mb-3">
                Education
              </h1>
              <p className="text-lg font-inter flex gap-2 items-center">
                <SchoolIcon /> {job.education}
              </p>
            </div>
            {/* End Education */}

            {/* Start Job Details */}
            <div
              className={`mb-7 border p-4 shadow-md rounded-md ${
                mode === "light" ? "bg-white" : ""
              }`}
            >
              <h1 className="text-2xl font-semibold border-b-2 pb-1 w-fit mb-3">
                Job Details
              </h1>

              <div className="flex flex-wrap gap-4">
                <span
                  className="flex items-center gap-2 p-2 rounded-lg shadow-sm"
                  style={{
                    backgroundColor: secondary,
                    color: secondaryContrast,
                  }}
                >
                  <ManageHistoryIcon />
                  {job.type}
                </span>

                <span
                  className="flex items-center gap-2 p-2 rounded-lg shadow-sm"
                  style={{ backgroundColor: primary, color: primaryContrast }}
                >
                  <WorkIcon />
                  {job.jobPlace}
                </span>

                <span
                  className="flex items-center gap-2 p-2 rounded-lg shadow-sm"
                  style={{ backgroundColor: error, color: errorContrast }}
                >
                  <ComputerIcon />
                  {job.csRequired
                    ? "Computer Science Required"
                    : "Computer Science Not Required"}
                </span>

                {job.neededExperience > 0 && (
                  <span
                    className="flex items-center gap-2 p-2 rounded-lg shadow-sm"
                    style={{ backgroundColor: warning, color: warningContrast }}
                  >
                    <ManageAccountsIcon />
                    {job.neededExperience}+ years of experience
                  </span>
                )}
              </div>
            </div>
            {/* End Job Details */}
          </div>
        </div>
      </Container>

      {applyModalOpen && (
        <ApplyForAJob
          applyModalOpen={applyModalOpen}
          setApplyModalOpen={setApplyModalOpen}
          jobId={job.id}
        />
      )}
    </>
  );
}

export default JobInfo;
