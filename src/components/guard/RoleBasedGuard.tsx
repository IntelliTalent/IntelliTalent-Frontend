import { ReactNode, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Container, Typography } from "@mui/material";

export default function RoleBasedGuard({
  children,
  roles,
}: {
  children: ReactNode;
  roles: string[];
}) {
  const user = useSelector((state: RootState) => state.user.user);
  const currentRole = user?.type;

  if (!roles.includes(currentRole!)) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <div>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permission Denied
          </Typography>
        </div>

        <div>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            You do not have permission to access this page
          </Typography>
        </div>
      </Container>
    );
  }

  return <>{children}</>;
}
