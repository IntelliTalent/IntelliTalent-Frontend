import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditProfileView } from "../components/user";
import { AuthGuard, RoleBasedGuard } from "../components/guard";
import { UserType } from "../enums";
import { IProfileDetails } from "../types";
import { getProfile } from "../api/profiles";

function EditProfile() {
  document.title = "Edit Profile | Intelli-Talent";

  const { profileId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<IProfileDetails | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(profileId!);
        setProfile(response);
      } catch (error) {
        console.error(error);
        navigate("/404");
      }
    };

    fetchProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    profile && (
      <AuthGuard>
        <RoleBasedGuard roles={[UserType.jobSeeker]}>
          <EditProfileView profile={profile} />;
        </RoleBasedGuard>
      </AuthGuard>
    )
  );
}

export default EditProfile;
