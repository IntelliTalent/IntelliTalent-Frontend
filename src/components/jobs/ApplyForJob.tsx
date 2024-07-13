import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";

import { applyForJob } from "../../api/jobs";
import { useEffect, useState } from "react";
import { getProfileCards } from "../../api/profiles";
import { Link, useNavigate } from "react-router-dom";
import { IProfileCard } from "../../types";
import { LoadingModal } from "../ui";

export default function ApplyForAJob({
  applyModalOpen,
  setApplyModalOpen,
  jobId,
}: {
  applyModalOpen: boolean;
  setApplyModalOpen: Function;
  jobId: string;
}) {
  const [selectedProfile, setSelectedProfile] = useState("");
  const [profiles, setProfiles] = useState<IProfileCard[]>([]);
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response: IProfileCard[] = await getProfileCards();
        setProfiles(response);
      } catch (error: any) {
        console.log(error);
        navigate(`/error?message=${error.response.data.message}`);
      }
    };

    fetchProfiles();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApply = async () => {
    try {
      setLoading(true);

      await applyForJob(selectedProfile, jobId);

      setSnackbarOpen(true);
      setSnackbarType("success");
      setSnackbarMessage("Successfully applied for the job");
      // reload the page
      window.location.reload();
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarType("error");
      setSnackbarMessage("Failed to apply for the job");
    }

    setTimeout(() => {
      setApplyModalOpen(false);
      setSnackbarOpen(false);
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <Modal open={applyModalOpen} onClose={() => setApplyModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" component="h2" mb={3}>
            Choose which profile you want to apply with
          </Typography>

          {profiles.length === 0 ? (
            <>
              <Typography
                variant="h6"
                component="p"
                textAlign="center"
                fontWeight={600}
              >
                No profiles found
              </Typography>

              <Button
                variant="contained"
                sx={{ mt: 3, display: "block", ml: "auto" }}
              >
                <Link to="/user/profile/create">Create Profile</Link>
              </Button>
            </>
          ) : (
            <>
              <FormControl fullWidth>
                <InputLabel id="label">Profile</InputLabel>
                <Select
                  labelId="label"
                  name="profile"
                  value={selectedProfile}
                  label="Profile"
                  onChange={(e) => setSelectedProfile(e.target.value as string)}
                >
                  {profiles.map((profile) => (
                    <MenuItem key={profile.id} value={profile.id}>
                      {profile.jobTitle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                id="apply-button"
                variant="contained"
                color="success"
                sx={{ mt: 3, display: "block", ml: "auto" }}
                onClick={handleApply}
                disabled={!selectedProfile || loading}
              >
                Apply
              </Button>
            </>
          )}
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarType as "success" | "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <LoadingModal loading={loading} />
    </>
  );
}
