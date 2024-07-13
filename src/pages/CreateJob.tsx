import { AuthGuard, RoleBasedGuard } from "../components/guard";
import { CreateJobView } from "../components/jobs";
import { UserType } from "../enums";

function CreateJob() {
  document.title = "Create Job | Intelli-Talent";

  return (
    <AuthGuard>
      <RoleBasedGuard roles={[UserType.recruiter]}>
        <CreateJobView />
      </RoleBasedGuard>
    </AuthGuard>
  );
}

export default CreateJob;
