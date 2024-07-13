import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useColors from "../../hooks/useColor";

import autofillExtension from "../../assets/images/autofill_extension.jpg";
import jobRecommendation from "../../assets/images/job_recommendation.jpg";
import officeLaptop from "../../assets/images/office_laptop.jpg";

import Person2Icon from "@mui/icons-material/Person2";
import FeedIcon from "@mui/icons-material/Feed";
import WorkIcon from "@mui/icons-material/Work";
import StepsCard from "./StepsCard";
import InfoCard from "./InfoCard";

function JobSeeker() {
  const { info } = useColors();
  const navigate = useNavigate();

  return (
    <>
      {/* Headers */}
      <div className="text-center">
        <h1 className="main-header mt-11 mb-3">
          Search, Apply & <br /> Get Your{" "}
          <span style={{ color: info }}>Dream Job</span>
        </h1>

        <p className="header-description mb-5">
          Start your hunt for the best, life-changing career opportunities.
        </p>

        <h2 className="mb-2">
          <span style={{ color: info }} className="font-bold">
            Countless Career Options
          </span>{" "}
          Are Waiting For You to Explore
        </h2>
        <Button
          variant="contained"
          color="info"
          onClick={() => navigate("/jobs")}
        >
          Browse Jobs
        </Button>
      </div>

      {/* Steps section */}
      <h1 className="text-center secondary-header mt-20">
        Get Hired in <span style={{ color: info }}>3 Quick Easy Steps</span>
      </h1>
      <div className="mt-4 flex justify-center flex-wrap gap-5">
        <StepsCard
          title="Create an Account"
          description="Sign up to create an account with the main information about you."
          icon={<Person2Icon fontSize="large" color="success" />}
          firstCard={true}
        />
        <StepsCard
          title="Create a Custom Profile"
          description="Create a profile for a specific job title, mentioning your qualification, skills, and experiences."
          icon={<FeedIcon fontSize="large" color="error" />}
          firstCard={false}
        />
        <StepsCard
          title="Get Job"
          description="After that you will wait for some time until we find the perfect match for you."
          icon={<WorkIcon fontSize="large" color="primary" />}
          firstCard={false}
        />
      </div>

      {/* What we offer section */}
      <h1 className="text-center secondary-header mt-20 mb-3">What We Offer</h1>
      <p className="text-center">
        Intelli-Talent is the right platform for you to get various job
        recommendations, and find your ideal job profiles.
      </p>
      <div className="mt-10 flex justify-center flex-wrap gap-5 mb-10">
        <InfoCard
          title="Job Recommendations"
          description="Set your preferences and get the best job recommendations."
          image={jobRecommendation}
        />
        <InfoCard
          title="Create & Build Profile"
          description="Create a strong profile with your skills and experiences."
          image={officeLaptop}
        />
        <InfoCard
          title="Autofill Extension"
          description="Automatically fill any job application forms you don't want to fill manually."
          image={autofillExtension}
          link="https://chromewebstore.google.com/detail/form-autofill-extension/anccnjbblfdcfnceofempofneincapac?utm_source=ext_app_menu"
        />
      </div>
    </>
  );
}

export default JobSeeker;
