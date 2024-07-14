import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FlexBetween } from "../../ui";
import Stages from "../../jobs/Stages";
import useColors from "../../../hooks/useColor";
import { getDurationSince } from "../../../utils/format-dates";
import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { IJobApplicant, IJobDetails } from "../../../types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobApplicants, selectCandidate } from "../../../api/jobs";

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

function SelectJobApplicantsView({ jobInfo }: { jobInfo: IJobDetails }) {
  const navigate = useNavigate();
  const [jobApplicants, setJobApplicants] = useState<IJobApplicant[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [open, setOpen] = useState(false);
  const [profileId, setProfileId] = useState("");

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
  const { renderFinalStage } = Stages();

  const fetchJobApplicants = async () => {
    try {
      const response = await getJobApplicants(
        jobInfo.id,
        paginationModel.page + 1,
        true
      );

      if (response) {
        setJobApplicants(response.applicants);
        setTotalRows(response.totalRecords);
      }
    } catch (error: any) {
      console.log(error);
      navigate(`/error?message=${error.response.data.message}`);
    }
  };

  const handleSelectCandidate = async () => {
    try {
      await selectCandidate(jobInfo.id, profileId);
      setOpen(false);
      setProfileId("");

      fetchJobApplicants();
    } catch (error: any) {
      console.log(error);
      navigate(`/error?message=${error.response.data.message}`);
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
          Current Stage: {renderFinalStage}
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
            if (row.row.currentStage !== "Selected") {
              setProfileId(row.id as string);
              setOpen(true);
            }
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

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setProfileId("");
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" component="h2" mb={3}>
            Are you sure you want to select this candidate?
          </Typography>

          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSelectCandidate}
              sx={{ mr: 2 }}
            >
              Yes
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
}

export default SelectJobApplicantsView;
