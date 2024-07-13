import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAutoFillFields } from "../api/profiles";
import { AuthGuard, RoleBasedGuard } from "../components/guard";
import { UserType } from "../enums";
import { EditAutoFillExtensionView } from "../components/autofill-extension";

function EditAutoFillExtension() {
  document.title = "Edit AutoFill Extension | Intelli-Talent";

  const [fields, setFields] = useState<Record<string, string | null> | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await getAutoFillFields();

        const filteredFields: { [key: string]: string } = {};
        for (const [key, value] of Object.entries(response.formFields)) {
          if (
            typeof value === "string" &&
            value.length <= 100 &&
            value !== ""
          ) {
            filteredFields[key] = value;
          }
        }

        setFields(filteredFields);
      } catch (error: any) {
        console.log(error);
        navigate(`/error?message=${error.response.data.message}`);
      }
    };

    fetchFields();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthGuard>
      <RoleBasedGuard roles={[UserType.jobSeeker]}>
        {fields && <EditAutoFillExtensionView fields={fields} />}
      </RoleBasedGuard>
    </AuthGuard>
  );
}

export default EditAutoFillExtension;
