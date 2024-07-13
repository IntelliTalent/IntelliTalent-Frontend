import { AuthGuard, RoleBasedGuard } from "../components/guard";
import { CreateProfileView } from "../components/user";
import { UserType } from "../enums";

function CreateProfile() {
  document.title = "Create Profile | Intelli-Talent";

  return (
    <AuthGuard>
      <RoleBasedGuard roles={[UserType.jobSeeker]}>
        <CreateProfileView />
      </RoleBasedGuard>
    </AuthGuard>
  );
}

export default CreateProfile;
