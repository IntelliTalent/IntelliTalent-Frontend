import EditIcon from "@mui/icons-material/Edit";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PlaceIcon from "@mui/icons-material/Place";

import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { getDurationSince } from "../../utils/format-dates";
import { Link, useNavigate } from "react-router-dom";
import useColors from "../../hooks/useColor";
import { FlexBetween } from "../ui";
import Stages from "./Stages";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { UserType } from "../../enums";
import { useState } from "react";
import ApplyForAJob from "./ApplyForJob";
import { deactivateJob, moveJobToNextStage } from "../../api/jobs";
import { IJob, IJobCard } from "../../types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function JobCard({ job, type }: { job: IJobCard | IJob; type: string }) {
  const navigate = useNavigate();
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const { mode, success, secondary } = useColors();
  const {
    renderInterviewStage,
    renderAppliedStage,
    renderQuizStage,
    renderActiveStage,
    renderFinalStage,
    renderSelected,
    renderCandidate,
    renderFailed,
  } = Stages();
  const [open, setOpen] = useState(false);

  const scrappedJob = !job.url.includes(job.id);
  const isApplied = job?.isApplied;
  const user = useSelector((state: RootState) => state.user.user);

  // Shuffle the skills array and take the first 5
  const skills = job.skills.slice(0, 5);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    if (scrappedJob) {
      window.open(job.url, "_blank");
    } else if (user) {
      setApplyModalOpen(true);
    } else {
      navigate("/auth/sign-in");
    }
  };

  const handleNextStage = async () => {
    try {
      if (job.currentStage === "Active") {
        await deactivateJob(job.id);
        window.location.reload();
      } else {
        await moveJobToNextStage(job.id);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="px-4 py-6 shadow-md hover:shadow-lg transition-shadow rounded-md border flex flex-col justify-between"
      style={{
        borderColor: secondary,
        backgroundColor: mode === "dark" ? "" : "#ffffff78",
      }}
    >
      {/* Title, Company, Location */}
      <div className="space-y-2">
        <FlexBetween>
          <h1 className="text-2xl font-bold tracking-wide">{job.title}</h1>
          {type === "recruiterPage" && (
            <IconButton
              aria-label="edit"
              onClick={() => navigate(`/jobs/${job.id}/edit`)}
            >
              <EditIcon color="success" />
            </IconButton>
          )}
        </FlexBetween>

        {type === "matchedJobs" && (
          <p className="text-end">
            Matching Score:{" "}
            <span className="font-bold text-xl" style={{ color: success }}>
              {(job as IJobCard).matchScore}
            </span>
          </p>
        )}

        {type === "appliedJobs" && (
          <p className="text-end text-xl">
            {(job as IJobCard).isQualified ? (
              <Chip label="Accepted" color="success" />
            ) : (
              <Chip label="Rejected" color="error" />
            )}
          </p>
        )}

        <FlexBetween gap={5} mt={2}>
          <div>
            <p className="flex items-center gap-1 text-sm">
              <ApartmentIcon fontSize="small" />
              {job.company}
            </p>
            <p className="flex items-center gap-1 text-sm">
              <PlaceIcon fontSize="small" />
              {job.jobLocation}
            </p>
          </div>

          {/* Published at */}
          <p
            className="flex gap-2 items-center text-sm"
            style={{ color: secondary }}
          >
            {getDurationSince(job.publishedAt, "en", "Today", "")}
          </p>
        </FlexBetween>

        {/* Job type, Job place */}
        <div className="flex flex-wrap gap-1">
          <Chip label={job.type} color="primary" />
          <Chip label={job.jobPlace || "N/A"} color="success" />
          <Chip label={job.jobSource} color="info" />

          {job.csRequired && <Chip label="CS" color="error" />}
        </div>
      </div>

      <div className="border w-full my-3" />

      {/* Skills */}
      <div className="flex flex-wrap gap-x-2 gap-y-1 items-center justify-center min-h-16">
        {skills.map((skill: string) => (
          <Chip key={skill} label={skill} size="small" color="secondary" />
        ))}
        {skills.length === 0 && (
          <Chip label="No skills" size="small" color="secondary" />
        )}
      </div>

      <div className="border w-full my-3" />

      {/* Apply and View Details */}
      {(type === "listing" || type === "matchedJobs") && (
        <div className="flex gap-3 justify-center">
          {(!user || user?.type === UserType.jobSeeker) && (
            <>
              {!isApplied ? (
                <Button
                  variant="contained"
                  onClick={handleApply}
                  aria-label="apply"
                >
                  Apply
                </Button>
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

          <Button variant="outlined" aria-label="view-details">
            <Link to={`/jobs/${job.id}`}>View Details</Link>
          </Button>
        </div>
      )}

      {/* Current stage for applicant */}
      {type === "appliedJobs" && (
        <div className="flex gap-5 items-center font-semibold">
          Current Stage:{" "}
          {(job as IJobCard).applicationCurrentStage === "applied"
            ? renderAppliedStage
            : (job as IJobCard).applicationCurrentStage === "quiz"
            ? renderQuizStage
            : (job as IJobCard).applicationCurrentStage === "interview"
            ? renderInterviewStage
            : (job as IJobCard).applicationCurrentStage === "failed"
            ? renderFailed
            : (job as IJobCard).applicationCurrentStage === "candidate"
            ? renderCandidate
            : renderSelected}
        </div>
      )}

      {/* Current stage for recruiter */}
      {type === "recruiterPage" && (
        <div className="space-y-3">
          <div className="flex gap-5 items-center font-semibold">
            Current Stage:{" "}
            {job.currentStage === "Active"
              ? renderActiveStage
              : job.currentStage === "Quiz"
              ? renderQuizStage
              : job.currentStage === "Interview"
              ? renderInterviewStage
              : renderFinalStage}
          </div>
          <Stack direction="row" spacing={2}>
            {job.currentStage !== "Final" && (
              <Button
                aria-label="move-to-next"
                fullWidth
                variant="outlined"
                onClick={handleClickOpen}
              >
                {job.currentStage === "Active"
                  ? "Deactivate"
                  : "Move to next stage"}
              </Button>
            )}

            <Button aria-label="view-applicants" fullWidth variant="outlined">
              <Link to={`/jobs/${job.id}/applicants`}>View Applicants</Link>
            </Button>
          </Stack>
        </div>
      )}

      {applyModalOpen && (
        <ApplyForAJob
          applyModalOpen={applyModalOpen}
          setApplyModalOpen={setApplyModalOpen}
          jobId={job.id}
        />
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {job.currentStage === "Active"
            ? "Deactivate job"
            : "Move job to next stage"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to{" "}
            {job.currentStage === "Active"
              ? "deactivate this job?"
              : "move this job to the next stage?"}
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Disagree
          </Button>
          <Button
            onClick={handleNextStage}
            autoFocus
            variant="contained"
            aria-label="move-to-next"
          >
            {job.currentStage === "Active"
              ? "Deactivate"
              : "Move to next stage"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default JobCard;
