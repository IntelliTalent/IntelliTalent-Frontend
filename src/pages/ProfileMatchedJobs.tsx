import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MatchedJobs } from "../components/jobs";
import { AuthGuard, RoleBasedGuard } from "../components/guard";
import { UserType } from "../enums";
import { getMatchedJobs } from "../api/jobs";
import { IJobCard, IProfileDetails } from "../types";
import { getProfile } from "../api/profiles";

function ProfileMatchedJobs() {
  document.title = "Matched Jobs | Intelli-Talent";
  const navigate = useNavigate();

  const { profileId } = useParams();

  const [jobs, setJobs] = useState<IJobCard[]>([]);
  const [profile, setProfile] = useState<IProfileDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getMatchedJobs(profileId!);
        setJobs(response.matchedJobs);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    const fetchProfile = async () => {
      try {
        const profileResponse = await getProfile(profileId!);
        setProfile(profileResponse);
      } catch (error: any) {
        console.error(error);
        navigate(`/error?message=${error.response.data.message}`);
      }
    };

    fetchJobs();
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthGuard>
      <RoleBasedGuard roles={[UserType.jobSeeker]}>
        <MatchedJobs
          jobTitle={profile?.jobTitle!}
          jobs={jobs}
          loading={loading}
        />
      </RoleBasedGuard>
    </AuthGuard>
  );
}

export default ProfileMatchedJobs;
