import { ReactNode, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = user !== null;

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!isAuthenticated) {
      navigate("/auth/sign-in");
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
