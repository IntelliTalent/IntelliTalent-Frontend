import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import useColors from "../hooks/useColor";

function NotFound() {
  document.title = "Page Not Found | Intelli-Talent";
  const { error } = useColors();

  return (
    <div className="flex flex-col items-center justify-center">
      <ErrorOutlineIcon sx={{ fontSize: 100, mt: 16, color: error }} />

      <h1 className="text-5xl my-5 font-extrabold font-mono">Page Not Found</h1>

      <h1
        className="text-7xl font-semibold"
        style={{ letterSpacing: "15px", fontFamily: "cursive" }}
      >
        404
      </h1>
    </div>
  );
}

export default NotFound;
