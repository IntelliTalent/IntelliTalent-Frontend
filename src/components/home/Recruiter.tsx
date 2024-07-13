import useColors from "../../hooks/useColor";
import InfoCard from "./InfoCard";
import StepsCard from "./StepsCard";

import WorkIcon from "@mui/icons-material/Work";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

import filtering from "../../assets/images/filtering.jpg";
import talents from "../../assets/images/talents.png";
import interview from "../../assets/images/interview.jpg";

function Recruiter() {
  const { info } = useColors();

  return (
    <>
      {/* Headers */}
      <div className="text-center">
        <h1 className="main-header mt-10 mb-3">
          Want to find <span style={{ color: info }}>Talents</span>?
        </h1>
        <p className="header-description">
          Streamline your hiring process with our customizable recruitment
          tools.
        </p>
      </div>

      {/* Steps section */}
      <h1 className="text-center secondary-header mt-20">
        Get Your Talented Candidates in{" "}
        <span style={{ color: info }}>3 Quick Easy Steps</span>
      </h1>
      <div className="mt-4 flex justify-center flex-wrap gap-5">
        <StepsCard
          title="Create a Job"
          description="Create a job with all the main information like title, description, and requirements."
          icon={<WorkIcon fontSize="large" color="success" />}
          firstCard={true}
        />
        <StepsCard
          title="Add Filtering Stages"
          description="Add some custom filters, quiz phase, and interview phase to find the right talent with the right skills."
          icon={<AutoFixHighIcon fontSize="large" color="error" />}
          firstCard={false}
        />
        <StepsCard
          title="Choose Candidates"
          description="After that you will wait for all the stages to be completed then you can choose the right talent."
          icon={<TipsAndUpdatesIcon fontSize="large" color="primary" />}
          firstCard={false}
        />
      </div>

      {/* What we offer section */}
      <h1 className="text-center secondary-header mt-20 mb-3">What We Offer</h1>
      <p className="text-center">
        Intelli-Talent is the right platform for you to get find the best
        candidates for your jobs as it helps you to automate the process of
        finding and applying for jobs.
      </p>
      <div className="mt-10 flex justify-center flex-wrap gap-5 mb-10">
        <InfoCard
          title="Wide Talent Pool"
          description="Access to a vast talent pool spanning diverse industries and skill sets."
          image={talents}
        />
        <InfoCard
          title="Advanced Filtering"
          description="Utilize advanced filtering options to pinpoint candidates that best match your criteria."
          image={filtering}
        />
        <InfoCard
          title="Quiz & Interview"
          description="Create quizzes to assess candidate skills, and conduct interviews to know the candidate's experiences."
          image={interview}
        />
      </div>
    </>
  );
}

export default Recruiter;
