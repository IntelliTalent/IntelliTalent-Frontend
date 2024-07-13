import { Box, CircularProgress, Modal, Typography } from "@mui/material";

export default function LoadingModal({ loading }: { loading: boolean }) {
  return (
    <Modal
      open={loading}
      aria-labelledby="loading-modal-title"
      aria-describedby="loading-modal-description"
      closeAfterTransition
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100vh"
        bgcolor={"rgba(0, 0, 0, 0.7)"}
      >
        <CircularProgress size={80} />
        <Typography
          id="loading-modal-description"
          variant="h6"
          color="white"
          mt={2}
        >
          Your request is being processed, please wait...
        </Typography>
      </Box>
    </Modal>
  );
}
