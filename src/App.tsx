import "./assets/styles/globals.css";
import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import {
  Auth,
  CreateJob,
  CreateProfile,
  EditAutoFillExtension,
  EditJob,
  EditProfile,
  EditUser,
  Error,
  Home,
  Interview,
  InterviewGrading,
  InterviewedJobApplicants,
  JobApplicants,
  JobDetails,
  Jobs,
  MyInterviews,
  MyQuizzes,
  NotFound,
  ProfileAppliedJobs,
  ProfileDetails,
  ProfileMatchedJobs,
  Quiz,
  User,
  SelectJobApplicants,
} from "./pages";

// Components
import {
  ForgotPassword,
  ResetPassword,
  Signin,
  Signup,
  VerifyEmail,
  PostSignup,
} from "./components/auth";

// Utils
import { useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import getDesignTokens from "./theme/theme";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Footer, Navbar } from "./components/shared";

// import bgImage from "../src/assets/images/bg-image.jpg";

function App() {
  const mode = useSelector((state: RootState) => state.user.mode);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const pathname = useLocation().pathname;
  const hideHeaderFooter =
    pathname.indexOf("/quiz/") !== -1 ||
    pathname.indexOf("/interview/") !== -1 ||
    pathname.indexOf("/auth/") !== -1 ||
    pathname.indexOf("/verify-email") !== -1 ||
    pathname.indexOf("/reset-password") !== -1;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div
        className="App flex flex-col min-h-screen"
        style={
          theme.palette.mode === "dark"
            ? {}
            : {
                // backgroundImage: `url(${bgImage})`,
                // backgroundSize: "cover",
                backgroundColor: "rgb(38 95 166 / 8%)",
              }
        }
      >
        <Navbar hide={hideHeaderFooter} />

        <main>
          <Routes>
            {/* Public Routes */}
            <Route index element={<Home />} />

            <Route element={<Auth />}>
              <Route path="/auth/sign-in" element={<Signin />} />
              <Route path="/auth/sign-up" element={<Signup />} />
              <Route path="/auth/post-signup" element={<PostSignup />} />
              <Route
                path="/auth/forget-password"
                element={<ForgotPassword />}
              />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
            <Route path="/verify-email" element={<VerifyEmail />} />

            <Route path="/jobs" element={<Jobs />} />

            <Route path="/jobs/:jobId" element={<JobDetails />} />

            <Route
              path="/user/profile/:profileId"
              element={<ProfileDetails />}
            />
            {/* ------------------------------ */}

            {/* Private Routes for both job seeker and recruiter */}
            <Route path="/user" element={<User />} />
            <Route path="/user/edit" element={<EditUser />} />
            {/* ------------------------------ */}

            {/* Private Routes for job seeker */}
            <Route path="/user/profile/create" element={<CreateProfile />} />
            <Route
              path="/user/profile/:profileId/edit"
              element={<EditProfile />}
            />
            <Route
              path="/user/profile/:profileId/matched-jobs"
              element={<ProfileMatchedJobs />}
            />
            <Route
              path="/user/profile/:profileId/applied-jobs"
              element={<ProfileAppliedJobs />}
            />
            <Route
              path="/user/auto-fill-extension/edit"
              element={<EditAutoFillExtension />}
            />
            <Route path="/quiz/:slug" element={<Quiz />} />
            <Route path="/quizzes" element={<MyQuizzes />} />
            <Route
              path="/interview/:profileId/:jobId"
              element={<Interview />}
            />
            <Route path="/interviews" element={<MyInterviews />} />
            {/* ------------------------------ */}

            {/* Private Routes for recruiter */}
            <Route path="/jobs/:jobId/applicants" element={<JobApplicants />} />
            <Route
              path="/jobs/:jobId/applicants/interviewed"
              element={<InterviewedJobApplicants />}
            />
            <Route
              path="/jobs/:jobId/applicants/select"
              element={<SelectJobApplicants />}
            />
            <Route path="/jobs/create" element={<CreateJob />} />
            <Route path="/jobs/:jobId/edit" element={<EditJob />} />
            <Route
              path="/jobs/:jobId/interview-grading/:profileId"
              element={<InterviewGrading />}
            />

            {/* ------------------------------ */}
            <Route path="/error" element={<Error />} />

            {/* Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer hide={hideHeaderFooter} />
      </div>
    </ThemeProvider>
  );
}

export default App;
