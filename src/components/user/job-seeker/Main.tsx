import { Button, Skeleton } from "@mui/material";
import { FlexBetween } from "../../ui";

import AddIcon from "@mui/icons-material/Add";
import ProfileCard from "./ProfileCard";
import useColors from "../../../hooks/useColor";
import { Link, useNavigate } from "react-router-dom";
import { IProfileCard } from "../../../types";
import { useEffect, useState } from "react";
import { getProfileCards } from "../../../api/profiles";

function JobSeekerMain() {
  const { secondary } = useColors();
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState<IProfileCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response: IProfileCard[] = await getProfileCards();
        setProfiles(response);
      } catch (error: any) {
        console.log(error);
        navigate(`/error?message=${error.response.data.message}`);
      }
      setLoading(false);
    };

    fetchProfiles();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FlexBetween className="mt-7 mb-10">
        <h1 className="main-header" style={{ color: secondary }}>
          Your Profiles
        </h1>
        <Button variant="outlined" className="flex items-center gap-2">
          <Link to="/user/profile/create">
            <AddIcon /> Add Profile
          </Link>
        </Button>
      </FlexBetween>

      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton variant="rectangular" height={300} />
          <Skeleton variant="rectangular" height={300} />
          <Skeleton variant="rectangular" height={300} />
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile: any) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
          {profiles.length === 0 && (
            <div className="text-center">
              <h1 className="font-bold text-2xl">No Profiles Found</h1>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default JobSeekerMain;
