import { AuthGuard } from "../components/guard";
import { EditUserView } from "../components/user";

function EditUser() {
  document.title = "Edit User | Intelli-Talent";

  return (
    <AuthGuard>
      <EditUserView />
    </AuthGuard>
  );
}

export default EditUser;
