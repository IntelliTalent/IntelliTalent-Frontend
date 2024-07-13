import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSearchParams } from "react-router-dom";
import useColors from "../hooks/useColor";

function Error() {
  document.title = "Something went wrong | Intelli-Talent";
  const query = useSearchParams();
  const { error } = useColors();

  return (
    <div className="flex flex-col items-center justify-center">
      <ErrorOutlineIcon sx={{ fontSize: 100, mt: 16, color: error }} />

      <h1 className="text-5xl my-5 font-extrabold font-mono">
        Something went wrong
      </h1>

      <h1 className="mt-4 text-2xl font-semibold" style={{ color: error }}>
        {query[0].get("message") !== null && query[0].get("message")}
      </h1>
    </div>
  );
}

export default Error;
