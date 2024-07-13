import { Outlet } from "react-router-dom";
import { Box, Container, Stack } from "@mui/material";
import logo from "../assets/images/logo.png";
import { GuestGuard } from "../components/guard";

function Auth() {
  return (
    <GuestGuard>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "background.paper",
              borderRadius: 4,
              border: "1px solid #e0e0e0",
              py: 6,
              px: 4,
              boxShadow: 3,
            }}
          >
            <Box flex={1} sx={{ display: { xs: "none", md: "block" }, p: 5 }}>
              <img src={logo} alt="logo" />
            </Box>

            <Box flex={1}>
              <Outlet />
            </Box>
          </Stack>
        </Container>
      </Box>
    </GuestGuard>
  );
}

export default Auth;
