import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FlexCenter } from "../../ui";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ComputerIcon from "@mui/icons-material/Computer";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import useColors from "../../../hooks/useColor";
import { IProfileCard } from "../../../types";
import { useState } from "react";
import { deleteProfile } from "../../../api/profiles";

function ProfileCard({ profile }: { profile: IProfileCard }) {
  const { primary, error, errorContrast, warning, warningContrast } =
    useColors();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteProfile(profile.id);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Take the first 5 skills
  const skills = profile.skills.slice(0, 5);

  return (
    <>
      <FlexCenter
        className="p-4 max-w-sm m-auto shadow-lg rounded-3xl flex-col text-center border hover:shadow-xl transition-shadow cursor-pointer"
        style={{ borderColor: primary }}
        onClick={() => navigate(`/user/profile/${profile.id}`)}
      >
        <h1 className="text-2xl font-inter font-bold">{profile.jobTitle}</h1>

        <div className="w-full flex items-center justify-between">
          <div className="min-h-[52px]">
            {profile.cv && (
              <IconButton
                color="error"
                onClick={(event) => event.stopPropagation()}
              >
                <Link to={profile.cv} target="_blank">
                  <ContactPageIcon />
                </Link>
              </IconButton>
            )}

            {profile.linkedIn && (
              <IconButton
                color="primary"
                onClick={(event) => event.stopPropagation()}
              >
                <Link to={profile.linkedIn} target="_blank">
                  <LinkedInIcon />
                </Link>
              </IconButton>
            )}

            {profile.github && (
              <IconButton onClick={(event) => event.stopPropagation()}>
                <Link to={profile.github} target="_blank">
                  <GitHubIcon />
                </Link>
              </IconButton>
            )}
          </div>

          <div className="flex items-center justify-between">
            <IconButton
              aria-label="edit"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/user/profile/${profile.id}/edit`);
              }}
            >
              <EditIcon color="success" />
            </IconButton>

            <IconButton
              aria-label="delete"
              onClick={(event) => {
                event.stopPropagation();
                handleClickOpen();
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </div>
        </div>

        <div className="border w-full mt-2 mb-5" />

        <div className="flex flex-wrap justify-center gap-4 min-h-[96px]">
          <span
            className="flex items-center gap-1 p-2 rounded-lg shadow-sm h-fit"
            style={{ backgroundColor: error, color: errorContrast }}
          >
            <ComputerIcon />
            {profile.graduatedFromCS
              ? "Graduated from Computer Science"
              : "Not Graduated from Computer Science"}
          </span>

          {profile.yearsOfExperience > 0 && (
            <span
              className="flex items-center gap-2 p-2 rounded-lg shadow-sm"
              style={{ backgroundColor: warning, color: warningContrast }}
            >
              <ManageAccountsIcon />
              {profile.yearsOfExperience}+ years of experience
            </span>
          )}
        </div>
        <div className="border w-full my-5" />

        <div className="flex flex-wrap gap-x-2 gap-y-1 items-center justify-center min-h-16">
          {skills.map((skill: any) => (
            <Chip key={skill} label={skill} color="primary" />
          ))}
          {skills.length === 0 && (
            <Chip
              label="No Skills"
              color="primary"
              variant="outlined"
              size="medium"
            />
          )}
        </div>
        <div className="border w-full my-5" />

        <div className="flex gap-3 justify-center">
          <Button
            variant="outlined"
            onClick={(event) => event.stopPropagation()}
          >
            <Link to={`/user/profile/${profile.id}/matched-jobs`}>
              Matched Jobs
            </Link>
          </Button>

          <Button
            variant="outlined"
            onClick={(event) => event.stopPropagation()}
          >
            <Link to={`/user/profile/${profile.id}/applied-jobs`}>
              Applied Jobs
            </Link>
          </Button>
        </div>
      </FlexCenter>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Profile</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this profile?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Disagree
          </Button>
          <Button
            onClick={handleDelete}
            autoFocus
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProfileCard;
