import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FlexBetween } from "../../ui";
import Stages from "../../jobs/Stages";
import useColors from "../../../hooks/useColor";
import { getDurationSince } from "../../../utils/format-dates";
import { Container } from "@mui/material";
import { IJobApplicant, IJobDetails } from "../../../types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInterviewedJobApplicants } from "../../../api/jobs";

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

function InterviewedJobApplicantsView({ jobInfo }: { jobInfo: IJobDetails }) {
  const navigate = useNavigate();
  const [jobApplicants, setJobApplicants] = useState<IJobApplicant[]>([]);
  const [totalRows, setTotalRows] = useState(0);

  const rows = jobApplicants.map((applicant: IJobApplicant) => ({
    id: applicant.id,
    email: applicant.email,
    matchScore: applicant.matchScore?.toFixed(2),
    interviewGrade: applicant.interviewGrade
      ? applicant.interviewGrade.toFixed(2)
      : "Not Graded Yet",
    quizGrade: applicant.quizGrade
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
  const { renderInterviewStage } = Stages();

  const fetchJobApplicants = async () => {
    try {
      const response = await getInterviewedJobApplicants(
        jobInfo.id,
        paginationModel.page + 1
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
  }, [paginationModel.page]);

  return (
    <Container className="py-10 space-y-7">
      <FlexBetween sx={{ gap: 2, flexWrap: "wrap" }}>
        <h1 className="text-3xl font-bold tracking-wide">{jobInfo.title}</h1>

        <div className="flex gap-5 items-center font-semibold">
          Current Stage: {renderInterviewStage}
        </div>
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
            navigate(`/jobs/${jobInfo.id}/interview-grading/${row.id}`);
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

export default InterviewedJobApplicantsView;
