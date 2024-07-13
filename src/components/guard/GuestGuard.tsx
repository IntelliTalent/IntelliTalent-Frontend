import { ReactNode, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

export default function GuestGuard({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = user !== null;

  const check = useCallback(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
