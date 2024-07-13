import * as yup from "yup";
import { JobType } from "../../../../enums/job-type";
import { JobPlace } from "../../../../enums/job-place";

export const validationSchema = yup.object().shape({
  prompt: yup.string(),

  // Job Information
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Job description is required"),
  company: yup.string().required("Company name is required"),
  jobLocation: yup.string().required("Job location is required"),
  type: yup
    .string()
    .oneOf(Object.values(JobType), "Invalid job type")
    .required("Job type is required"),
  skills: yup
    .array()
    .of(yup.string().required("Skill is required"))
    .min(1, "At least one skill is required"),
  jobPlace: yup
    .string()
    .oneOf(Object.values(JobPlace), "Invalid job place")
    .required("Job place is required"),
  neededExperience: yup
    .number()
    .nullable()
    .min(0, "Experience must be at least 0"),
  education: yup.string(),
  csRequired: yup.boolean().nullable(),

  // Check that the dates are not in the past
  jobEndDate: yup
    .date()
    .nullable()
    .min(new Date(), "Job end date cannot be in the past"),

  // Custom Filters
  yearsOfExperience: yup
    .number()
    .nullable()
    .min(0, "Years of experience must be at least 0"),
  graduatedFromCS: yup.boolean().nullable(),
  languages: yup.array().of(yup.string().required("Language is required")),
  country: yup.string(),
  city: yup.string(),

  // Quiz
  // Quiz end date cannot be in the past and can not be before job end date
  quizEndDate: yup
    .date()
    .nullable()
    .min(new Date(), "Quiz end date cannot be in the past")
    .test(
      "is-after-job-end-date",
      "Quiz end date cannot be before job end date",
      function (value) {
        const { jobEndDate } = this.parent;
        return !value || !jobEndDate || value > jobEndDate;
      }
    ),

  // Interview
  // Interview end date cannot be in the past and can not be before quiz end date
  interviewEndDate: yup
    .date()
    .nullable()
    .min(new Date(), "Interview end date cannot be in the past")
    .test(
      "is-after-quiz-end-date",
      "Interview end date cannot be before quiz end date",
      function (value) {
        const { quizEndDate } = this.parent;
        return !value || !quizEndDate || value > quizEndDate;
      }
    ),
  interviewQuestions: yup
    .array()
    .of(yup.string().required("Interview question is required")),
});
