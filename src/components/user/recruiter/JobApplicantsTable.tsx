import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FlexBetween } from "../../ui";
import Stages from "../../jobs/Stages";
import useColors from "../../../hooks/useColor";
import { getDurationSince } from "../../../utils/format-dates";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { IJobApplicant, IJobDetails } from "../../../types";
import { getJobApplicants } from "../../../api/jobs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "appliedAt",
    headerName: "Applied At",
    width: 130,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "currentStage",
    headerName: "Current Stage",
    width: 130,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "matchScore",
    headerName: "Match Score",
    width: 130,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "quizGrade",
    headerName: "Quiz Grade",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "interviewGrade",
    headerName: "Interview Grade",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
];

const IsQualifiedFilter = ({
  isQualified,
  setIsQualified,
}: {
  isQualified: string;
  setIsQualified: Function;
}) => {
  const handleChange = (event: SelectChangeEvent<typeof isQualified>) => {
    setIsQualified(event.target.value as string);
  };

  return (
    <FormControl sx={{ minWidth: 150 }}>
      <InputLabel id="is-qualified">Show Applicants</InputLabel>
      <Select
        labelId="is-qualified"
        value={isQualified}
        onChange={handleChange}
        input={<OutlinedInput label="Show Applicants" />}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 150,
            },
          },
        }}
      >
        <MenuItem value="All" selected>
          All
        </MenuItem>
        <MenuItem value="Yes">Qualified</MenuItem>
        <MenuItem value="No">Not Qualified</MenuItem>
      </Select>
    </FormControl>
  );
};

function JobApplicantsTable({ jobInfo }: { jobInfo: IJobDetails }) {
  const navigate = useNavigate();
  const [isQualified, setIsQualified] = useState("All");
  const [jobApplicants, setJobApplicants] = useState<IJobApplicant[]>([]);
  const [totalRows, setTotalRows] = useState(0);

  const rows = jobApplicants.map((applicant: IJobApplicant) => ({
    id: applicant.id,
    email: applicant.email,
    matchScore: applicant.matchScore?.toFixed(2),
    interviewGrade:
      applicant.interviewGrade || applicant.interviewGrade === 0
        ? applicant.interviewGrade.toFixed(2)
        : "Not Graded Yet",
    quizGrade:
      applicant.quizGrade || applicant.quizGrade === 0
        ? applicant.quizGrade.toFixed(2)
        : "Not Graded Yet",
    currentStage:
      applicant.currentStage[0].toUpperCase() + applicant.currentStage.slice(1),
    appliedAt: getDurationSince(applicant.appliedAt, "en", "Today", ""),
  }));

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { mode } = useColors();
  const {
    renderQuizStage,
    renderInterviewStage,
    renderActiveStage,
    renderFinalStage,
  } = Stages();

  const fetchJobApplicants = async () => {
    try {
      const response = await getJobApplicants(
        jobInfo.id,
        paginationModel.page + 1,
        isQualified === "All" ? null : isQualified === "Yes"
      );

      if (response) {
        setJobApplicants(response.applicants);
        setTotalRows(response.totalRecords);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobApplicants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationModel.page, isQualified]);

  return (
    <Container className="py-10 space-y-7">
      <FlexBetween sx={{ gap: 2, flexWrap: "wrap" }}>
        <h1 className="text-3xl font-bold tracking-wide">{jobInfo.title}</h1>

        <div className="flex gap-5 items-center font-semibold">
          Current Stage:{" "}
          {jobInfo.currentStage === "Active"
            ? renderActiveStage
            : jobInfo.currentStage === "Quiz"
            ? renderQuizStage
            : jobInfo.currentStage === "Interview"
            ? renderInterviewStage
            : renderFinalStage}
        </div>
      </FlexBetween>

      <FlexBetween sx={{ gap: 2, flexWrap: "wrap" }}>
        <IsQualifiedFilter
          isQualified={isQualified}
          setIsQualified={setIsQualified}
        />

        {jobInfo.currentStage === "Interview" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate(`/jobs/${jobInfo.id}/applicants/interviewed`)
            }
          >
            Interviewed Applicants
          </Button>
        )}
        {jobInfo.currentStage === "Final" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/jobs/${jobInfo.id}/applicants/select`)}
          >
            Select Applicants
          </Button>
        )}
      </FlexBetween>

      <div
        className={`${
          mode === "dark" ? "" : "bg-white"
        } shadow-xl mt-5 rounded-xl`}
      >
        <DataGrid
          rowSelection={false}
          autoHeight
          rows={rows}
          columns={columns}
          onRowClick={(row) => {
            navigate(`/user/profile/${row.id}`);
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          paginationMode="server"
          rowCount={totalRows}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </div>
    </Container>
  );
}

export default JobApplicantsTable;
