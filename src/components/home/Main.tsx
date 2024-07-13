import jobSeeker from "../../assets/images/job_seeker.svg";
import recruiter from "../../assets/images/recruiter.jpg";

import useColors from "../../hooks/useColor";
import { useNavigate } from "react-router-dom";
import { Button, Paper } from "@mui/material";

function UserCard({
  img,
  title,
  description,
}: {
  img: string;
  title: string;
  description: string;
}) {
  const { info, secondary } = useColors();
  const navigate = useNavigate();

  return (
    <Paper className="p-5 md:w-[48%]">
      <div
        className="image-container"
        style={{ height: "250px", overflow: "hidden" }}
      >
        <img
          src={img}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="text-center my-4">
        <h5
          className="md:text-3xl text-2xl font-extrabold mb-1"
          style={{ color: info }}
        >
          {title}
        </h5>
        <p
          className="font-inter text-sm md:text-base"
          style={{ color: secondary }}
        >
          {description}
        </p>
      </div>

      <Button
        className="w-full"
        color="info"
        onClick={() => navigate(`?page=${title}`)}
        aria-label={title}
      >
        Show More
      </Button>
    </Paper>
  );
}

function Main() {
  const { info } = useColors();

  return (
    <>
      <h1 className="px-6 pt-6 pb-1 text-center main-header">
        Hiring or Want a Job
      </h1>
      <p className="text-center header-description">
        You can either be a hiring manager or a job seeker with{" "}
        <span style={{ color: info }} className="font-bold font-mono">
          Intelli-Talent
        </span>
        .
      </p>

      <div className="flex justify-center flex-wrap gap-4 my-10">
        <UserCard
          title="Recruiter"
          description="Elevate your hiring process to new heights. Our platform provides customizable recruitment tools designed to streamline your hiring journey. From screening to selection, find the ideal candidate effortlessly."
          img={recruiter}
        />
        <UserCard
          title="Job Seeker"
          description="Discover your dream career with ease. Our platform offers personalized profiles tailored to your skills and preferences. Find the perfect job match and take the next step towards your professional goals."
          img={jobSeeker}
        />
      </div>
    </>
  );
}

export default Main;
