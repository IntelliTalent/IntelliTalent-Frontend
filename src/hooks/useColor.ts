import { useTheme } from "@mui/material";

const useColors = () => {
  const theme = useTheme();

  const mode = theme.palette.mode;

  // Extracting colors from the theme object
  const primary = theme.palette.primary.main;
  const primaryContrast = theme.palette.primary.contrastText;
  const secondary = theme.palette.secondary.main;
  const secondaryContrast = theme.palette.secondary.contrastText;
  const error = theme.palette.error.main;
  const errorContrast = theme.palette.error.contrastText;
  const warning = theme.palette.warning.main;
  const warningContrast = theme.palette.warning.contrastText;
  const info = theme.palette.info.main;
  const success = theme.palette.success.main;
  const successContrast = theme.palette.success.contrastText;

  // You can add more colors as needed

  return {
    mode,
    primary,
    primaryContrast,
    secondary,
    secondaryContrast,
    error,
    errorContrast,
    warning,
    warningContrast,
    info,
    success,
    successContrast,
  };
};

export default useColors;
