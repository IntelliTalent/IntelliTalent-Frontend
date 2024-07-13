import axios from "axios";
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from "../constants/api.constant";
import store from "../store/store";

// eslint-disable-next-line no-undef
export const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// Set token on every request by intercepting the request
export const userRequest = axios.create({
  baseURL: BASE_URL,
});
userRequest.interceptors.request.use(
  async (config) => {
    config.headers[REQUEST_HEADER_AUTH_KEY] =
      TOKEN_TYPE + store.getState().user?.token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ------------------------------------------------------------------------------

export const endpoints = {
  core: {
    upload: "/v1/uploader/upload",
    triggerExtractInfo: "/v1/cv/info",
    extractInfo: "/v1/cv/extract",
  },
  auth: {
    register: "/v1/auth/register",
    login: "/v1/auth/login",
    logout: "/v1/auth/logout",
    verifyEmail: "/v1/auth/verify-email",
    forgetPassword: "/v1/auth/forget-password",
    resetPassword: "/v1/auth/reset-password",
    changePassword: "/v1/auth/change-password",
    editUser: "/v1/auth/update-me",
    getUser: (id: string) => `/v1/user/${id}`,
  },
  jobs: {
    getJobs: "/v1/jobs",
    getJobById: (id: string) => `/v1/jobs/${id}`,
    getJobDetailsById: (id: string) => `/v1/jobs/${id}/details`,
    getJobCards: "/v1/jobs/me",
    createJob: "/v1/jobs",
    updateJob: (id: string) => `/v1/jobs/${id}`,
    applyForJob: "/v1/filter",
    getMatchedJobs: (id: string) => `/v1/filter/matched-jobs/${id}`,
    getAppliedJobs: (id: string) => `/v1/filter/applied-jobs/${id}`,
    deactivateJob: (id: string) => `/v1/jobs/${id}/deactivate`,
    moveJobToNextStage: (id: string) => `/v1/jobs/${id}/move-to-next-stage`,
    getJobApplicants: (id: string) => `/v1/filter/applied-users/${id}`,
    getInterviewedJobApplicants: (id: string) =>
      `/v1/filter/interviewed-users/${id}`,
    generateCustomJob: "/v1/custom-job",
    selectCandidate: "/v1/filter/select",
  },
  profiles: {
    createProfile: "/v1/profiles/create",
    getProfileCards: "/v1/profiles/cards",
    getProfile: (id: string) => `/v1/profiles/${id}`,
    editProfile: (id: string) => `/v1/profiles/${id}`,
    deleteProfile: (id: string) => `/v1/profiles/${id}`,
    createCV: (id: string) => `/v1/cvs/${id}`,
    createCoverLetter: (id: string) => `/v1/coverLetters/${id}`,
    scrapeProfile: "/v1/profiles/scrape",
    extractGithubRepos: (username: string) => `/v1/profiles/repos/${username}`,
    getAutoFillFields: "/v1/autofill",
    submitFields: "/v1/autofill",
  },
  quiz: {
    getQuiz: (id: string) => `/v1/quiz/${id}`,
    submitAnswers: (id: string) => `/v1/quiz/submit/${id}`,
    getUserQuizzes: "/v1/quiz/my-quizzes",
    getQuizStatistics: "/v1/quiz/my-quizzes-statistics",
  },
  interview: {
    getInterview: (id: string) => `/v1/filter/interview/${id}`,
    submitAnswers: "/v1/filter/submit-interview",
    getInterviewAnswers: (jobId: string, profileId: string) =>
      `/v1/filter/interview-answers/${jobId}/${profileId}`,
    reviewInterview: "/v1/filter/review-interview",
    getUserInterviews: "/v1/filter/user-interviews",
    getInterviewStatistics: "/v1/filter/user-interviews-stats",
  },
};
