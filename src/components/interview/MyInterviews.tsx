import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useColors from "../../hooks/useColor";
import {
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fDateTime } from "../../utils/format-dates";
import { getInterviewStatistics, getUserInterviews } from "../../api/interview";
import { IInterviewCard, IInterviewStatistics } from "../../types/Interview";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "deadline",
    headerName: "Deadline",
    width: 130,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "score",
    headerName: "Score",
    width: 130,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "isTaken",
    headerName: "Taken",
    width: 130,
    headerAlign: "center",
    align: "center",
  },
];

export default function MyInterviews() {
  const { mode, primary, secondary, error, success } = useColors();
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState<IInterviewCard[]>([]);
  const [statistics, setStatistics] = useState<IInterviewStatistics | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [open, setOpen] = useState(false);
  const [jobId, setJobId] = useState(0);
  const [profileId, setProfileId] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const rows = interviews.map((interview: IInterviewCard, index: number) => ({
    id: interview.id,
    name: interview.name,
    score: interview.score,
    deadline: fDateTime(interview.deadline, "dd/MM/yyyy"),
    isTaken: interview.isTaken ? "Yes" : "No",
    profileId: interview.profileId,
  }));

  const fetchInterviews = async () => {
    try {
      const response = await getUserInterviews(paginationModel.page + 1);

      if (response) {
        setInterviews(response.interviews);
        setTotalRows(response.totalRecords);
      }
    } catch (error: any) {
      console.log(error);
      navigate(`/error?message=${error.response.data.message}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInterviews();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationModel.page]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await getInterviewStatistics();
        if (response) {
          setStatistics(response);
        }
      } catch (error: any) {
        console.log(error);
        navigate(`/error?message=${error.response.data.message}`);
      }
    };

    fetchStatistics();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="main-header mt-7 mb-10" style={{ color: secondary }}>
        Your Interviews
      </h1>

      {loading ? (
        <Skeleton variant="rectangular" height={300} />
      ) : (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <div
              className="p-4 max-w-sm m-auto shadow-xl rounded-md border-e-4 hover:shadow-xl transition-shadow"
              style={{ borderRightColor: primary }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: primary,
                }}
              >
                Total Interviews: {statistics?.total}
              </Typography>
            </div>

            <div
              className="p-4 max-w-sm m-auto shadow-xl rounded-md border-e-4 hover:shadow-xl transition-shadow"
              style={{ borderRightColor: success }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: success,
                }}
              >
                Taken Interviews: {statistics?.taken}
              </Typography>
            </div>

            <div
              className="p-4 max-w-sm m-auto shadow-xl rounded-md border-e-4 hover:shadow-xl transition-shadow"
              style={{ borderRightColor: error }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: error,
                }}
              >
                Waiting Interviews: {statistics?.notTaken}
              </Typography>
            </div>
          </Stack>

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
                if (row.row.isTaken === "No") {
                  setOpen(true);
                  setJobId(row.row.id);
                  setProfileId(row.row.profileId);
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
        </>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Take Interview</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to take the interview now?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Disagree
          </Button>
          <Button
            onClick={() => navigate(`/interview/${profileId}/${jobId}`)}
            autoFocus
            variant="contained"
            color="success"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
