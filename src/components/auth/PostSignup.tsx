import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function PostSignup() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <CheckCircleOutlineIcon sx={{ fontSize: 150 }} color="success" />

      <Typography
        variant="h4"
        color="primary.main"
        fontWeight={700}
        sx={{ textAlign: "center" }}
      >
        Welcome to Intelli-Talent!
      </Typography>

      <Box>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Your account has been created successfully
        </Typography>

        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Please check your email for verification link!
        </Typography>
      </Box>

      <Link to="/">
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            border: "1px solid",
            padding: 1,
            borderRadius: 2,
            color: "primary.main",
          }}
        >
          Continue
        </Typography>
      </Link>
    </Stack>
  );
}
