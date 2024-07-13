import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileSkeleton, UserProfileDetails } from "../components/user";
import { getProfile } from "../api/profiles";
import { IProfileDetails } from "../types";
import { IUser } from "../types";
import { getUser } from "../api/auth";

function ProfileDetails() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<IProfileDetails | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileResponse = await getProfile(profileId!);
        setProfile(profileResponse);

        const userResponse = await getUser(profileResponse.userId);
        setUser(userResponse);
      } catch (error: any) {
        console.error(error);
        navigate(`/error?message=${error.response.data.message}`);
      }

      setLoading(false);
    };

    fetchProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  document.title = `${user?.firstName} ${user?.lastName} | Intelli-Talent`;

  return (
    <>
      {loading ? (
        <ProfileSkeleton />
      ) : (
        profile && user && <UserProfileDetails profile={profile} user={user} />
      )}
    </>
  );
}

export default ProfileDetails;
