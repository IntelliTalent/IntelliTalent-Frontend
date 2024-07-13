import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IQuizCard, IQuizStatistics } from "../../types";
import { getQuizStatistics, getUserQuizzes } from "../../api/quiz";
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

export default function MyQuizzes() {
  const { mode, primary, secondary, error, success } = useColors();
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState<IQuizCard[]>([]);
  const [statistics, setStatistics] = useState<IQuizStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [open, setOpen] = useState(false);
  const [quizId, setQuizId] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const rows = quizzes.map((quiz: IQuizCard, index: number) => ({
    id: index + 1,
    name: quiz.name,
    score: quiz.score,
    deadline: fDateTime(quiz.deadline, "dd/MM/yyyy"),
    isTaken: quiz.isTaken ? "Yes" : "No",
    slug: quiz.encodedQuizIdentifier,
  }));

  const fetchQuizzes = async () => {
    try {
      const response = await getUserQuizzes(paginationModel.page + 1);

      if (response) {
        setQuizzes(response.quizzes);
        setTotalRows(response.totalRecords);
      }
    } catch (error: any) {
      console.log(error);
      navigate(`/error?message=${error.response.data.message}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationModel.page]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await getQuizStatistics();
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
        Your Quizzes
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
                Total Quizzes: {statistics?.total}
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
                Taken Quizzes: {statistics?.taken}
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
                Waiting Quizzes: {statistics?.notTaken}
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
                  setQuizId(row.row.slug);
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
        <DialogTitle id="alert-dialog-title">Take Quiz</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to take the quiz now?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Disagree
          </Button>
          <Button
            onClick={() => navigate(`/quiz/${quizId}`)}
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
