import * as yup from "yup";

export const validationSchema = yup.object().shape({
  linkedInHandle: yup.string(),
  githubHandle: yup.string(),
  cvLink: yup.string(),

  // Personal Details
  jobTitle: yup.string().required("Job title is required"),
  skills: yup.array().of(yup.string().required("Skill is required")),
  yearsOfExperience: yup
    .number()
    .min(0, "Years of experience must be at least 0")
    .required("Years of experience is required"),
  graduatedFromCS: yup.boolean().required("This field is required"),
  languages: yup.array().of(yup.string().required("Language is required")),
  summary: yup.string().required("Summary is required"),

  // Educations
  educations: yup.array().of(
    yup.object().shape({
      degree: yup.string().required("Degree is required"),
      schoolName: yup.string().required("School name is required"),
      startDate: yup.date().nullable().required("Start date is required"),
      endDate: yup.date().nullable(),
      description: yup.string().required("Description is required"),
    })
  ),

  // Experiences
  experiences: yup.array().of(
    yup.object().shape({
      jobTitle: yup.string().required("Job title is required"),
      companyName: yup.string().required("Company name is required"),
      startDate: yup.date().nullable().required("Start date is required"),
      endDate: yup.date().nullable(),
      description: yup.string().required("Description is required"),
    })
  ),

  // Projects
  projects: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Project name is required"),
      description: yup.string().required("Project description is required"),
      skills: yup
        .array()
        .of(yup.string().required("Skill is required"))
        .required("Skills are required"),
      url: yup.string().url("Enter a valid URL").required("URL is required"),
    })
  ),

  // Certifications
  certifications: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Certification title is required"),
      authority: yup.string().required("Issuing authority is required"),
      issuedAt: yup.date().nullable().required("Issue date is required"),
      validUntil: yup.date().nullable(),
      url: yup.string().url("Enter a valid URL").required("URL is required"),
    })
  ),
});
