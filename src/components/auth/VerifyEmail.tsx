import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../api/auth";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/userReducer";

export default function VerifyEmail() {
  document.title = "Verify Email | Intelli-Talent";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const params = new URLSearchParams(search);
  const token = params.get("token");

  const [status, setStatus] = useState("processing");

  const handleContinue = () => {
    navigate("/");
  };

  useEffect(() => {
    const verifyEmailHandler = async () => {
      try {
        if (!token) return;
        const response = await verifyEmail(token);

        dispatch(setLogin({ user: response.user, token: response.token }));

        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

    if (token) {
      verifyEmailHandler();
    } else {
      setStatus("error");
    }
  }, [dispatch, token]);

  return (
    <Container>
      <Box
        mt={20}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {status === "processing" && (
          <>
            <CircularProgress size={50} />
            <Typography variant="h4" align="center" mt={2}>
              Verifying your email...
            </Typography>
          </>
        )}
        {status === "success" && (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Email verified successfully
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
              You can now continue to the home page
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleContinue}
            >
              Continue to Home
            </Button>
          </>
        )}
        {status === "error" && (
          <>
            <Typography variant="h4" align="center" color="error" gutterBottom>
              Something went wrong
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleContinue}
            >
              Go to Home
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
