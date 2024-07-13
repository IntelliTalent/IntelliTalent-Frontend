import { IJob, IJobApplicant, IJobCard, IJobDetails } from "../types";
import { BASE_URL, endpoints, publicRequest, userRequest } from "./axios";

export interface ICreateJobDto {
  title: string;
  company: string;
  jobLocation: string;
  type: string;
  skills: string[];
  description: string;
  jobPlace: string;
  neededExperience?: number | null;
  education?: string;
  csRequired?: boolean | null;
  jobEndDate?: Date | null;
  customFilters?: {
    languages?: string[];
    country?: string;
    city?: string;
  };
  quizEndDate?: Date | null;
  interview?: {
    endDate: Date | null;
    interviewQuestions: string[];
  } | null;
}

export async function getJobs(data: {
  jobTitle: string;
  jobLocation: string;
  jobType: string[];
  publishDate: string;
  jobPlace: string[];
  jobSource: string[];
  computerScienceRequired: string;
  pageNumber: number;
}) {
  const link = new URL(BASE_URL + endpoints.jobs.getJobs);

  link.searchParams.append("page", String(data.pageNumber));

  if (data.jobTitle) {
    link.searchParams.append("jobTitle", data.jobTitle);
  }
  if (data.jobLocation) {
    link.searchParams.append("jobLocation", data.jobLocation);
  }
  if (data.jobType.length) {
    for (const type of data.jobType) {
      link.searchParams.append("jobType", type);
    }
  }
  if (data.publishDate) {
    link.searchParams.append("publishDate", data.publishDate);
  }
  if (data.jobPlace.length) {
    for (const type of data.jobPlace) {
      link.searchParams.append("jobPlace", type);
    }
  }
  if (data.jobSource.length) {
    for (const type of data.jobSource) {
      link.searchParams.append("jobSource", type);
    }
  }
  if (data.computerScienceRequired) {
    link.searchParams.append("csRequired", data.computerScienceRequired);
  }

  const response = await userRequest.get(link.href);

  if (response.data) {
    return {
      jobs: response.data.jobs.map(
        (job: any) =>
          ({
            id: job.id,
            title: job.title,
            company: job.company,
            type: job.type,
            jobLocation: job.jobLocation,
            jobPlace: job.jobPlace,
            publishedAt: job.publishedAt,
            csRequired: job.csRequired,
            url: job.url,
            skills: job.skills,
            jobSource: job.source,
            isApplied: job.isApplied,
          } as IJob)
      ),
      totalPages: response.data.totalPages,
      totalRecords: response.data.totalRecords,
    };
  } else {
    return null;
  }
}

export async function getJobById(id: string) {
  const response = await userRequest.get(endpoints.jobs.getJobById(id));

  if (response.data) {
    return {
      id: response.data?.id,
      title: response.data?.title,
      company: response.data?.company,
      type: response.data?.type,
      jobLocation: response.data?.jobLocation,
      jobPlace: response.data?.jobPlace,
      publishedAt: response.data?.publishedAt,
      csRequired: response.data?.csRequired,
      url: response.data?.url,
      skills: response.data?.skills,
      description: response.data?.description,
      neededExperience: response.data?.neededExperience,
      education: response.data?.education,
      currentStage: response.data?.currentStage,
      jobSource: response.data?.source,
      isApplied: response.data?.isApplied,
      isActive: response.data?.isActive,
    } as IJobDetails;
  } else {
    return null;
  }
}

export async function getJobDetailsById(id: string) {
  const response = await publicRequest.get(
    endpoints.jobs.getJobDetailsById(id)
  );

  if (response.data) {
    return {
      id: response.data?.id,
      title: response.data?.title,
      company: response.data?.company,
      type: response.data?.type,
      jobLocation: response.data?.jobLocation,
      jobPlace: response.data?.jobPlace,
      publishedAt: response.data?.publishedAt,
      csRequired: response.data?.csRequired,
      url: response.data?.url,
      skills: response.data?.skills,
      description: response.data?.description,
      neededExperience: response.data?.neededExperience,
      education: response.data?.education,
      currentStage: response.data?.currentStage,
      jobEndDate: response.data?.jobEndDate,
      customFilters: {
        languages: response.data?.stages.customFilters.languages,
        country: response.data?.stages.customFilters.country,
        city: response.data?.stages.customFilters.city,
      },
      quizEndDate: response.data?.stages.quizEndDate,
      interviewEndDate: response.data?.stages.interview?.endDate,
      interviewQuestions: response.data?.stages.interview?.interviewQuestions,
    } as IJobDetails;
  } else {
    return null;
  }
}

export async function getJobCards(pageNumber: number) {
  const link = new URL(BASE_URL + endpoints.jobs.getJobCards);
  link.searchParams.append("page", String(pageNumber));

  const response = await userRequest.get(link.href);

  if (response.data) {
    return {
      jobs: response.data.jobs.map(
        (job: any) =>
          ({
            id: job.id,
            title: job.title,
            company: job.company,
            type: job.type,
            jobLocation: job.jobLocation,
            jobPlace: job.jobPlace,
            publishedAt: job.publishedAt,
            csRequired: job.csRequired,
            url: job.url,
            skills: job.skills,
            currentStage: job.currentStage,
            jobSource: job.source,
            isApplied: job.isApplied,
          } as IJobCard)
      ),
      totalPages: response.data.totalPages,
      totalRecords: response.data.totalRecords,
    };
  } else {
    return null;
  }
}

export async function createJob(data: ICreateJobDto) {
  const response = await userRequest.post(endpoints.jobs.createJob, data);
  return response.data;
}

export async function editJob(id: string, data: ICreateJobDto) {
  const response = await userRequest.put(endpoints.jobs.updateJob(id), data);
  return response.data;
}

export async function applyForJob(profileId: string, jobId: string) {
  const response = await userRequest.post(endpoints.jobs.applyForJob, {
    profileId,
    jobId,
  });
  return response.data;
}

export async function getMatchedJobs(profileId: string) {
  const response = await userRequest.get(
    endpoints.jobs.getMatchedJobs(profileId)
  );
  return {
    matchedJobs: response.data.matchedJobs.map(
      (job: any) =>
        ({
          id: job.id,
          title: job.title,
          company: job.company,
          type: job.type,
          jobLocation: job.jobLocation,
          jobPlace: job.jobPlace,
          publishedAt: job.publishedAt,
          csRequired: job.csRequired,
          url: job.url,
          skills: job.skills,
          currentStage: job.currentStage,
          jobSource: job.source,
          isApplied: job.isApplied,
          matchScore: job.matchScore,
          isQualified: job.isQualified,
        } as IJobCard)
    ),
  };
}

export async function getAppliedJobs(profileId: string) {
  const response = await userRequest.get(
    endpoints.jobs.getAppliedJobs(profileId)
  );

  return {
    appliedJobs: response.data.appliedJobs.map(
      (job: any) =>
        ({
          id: job.id,
          title: job.title,
          company: job.company,
          type: job.type,
          jobLocation: job.jobLocation,
          jobPlace: job.jobPlace,
          publishedAt: job.publishedAt,
          csRequired: job.csRequired,
          url: job.url,
          skills: job.skills,
          currentStage: job.currentStage,
          jobSource: job.source,
          isApplied: job.isApplied,
          applicationCurrentStage: job.applicationCurrentStage,
          isQualified: job.isQualified,
        } as IJobCard)
    ),
  };
}

export async function deactivateJob(jobId: string) {
  const response = await userRequest.patch(endpoints.jobs.deactivateJob(jobId));
  return response.data;
}

export async function moveJobToNextStage(jobId: string) {
  const response = await userRequest.patch(
    endpoints.jobs.moveJobToNextStage(jobId)
  );
  return response.data;
}

export async function getJobApplicants(
  jobId: string,
  pageNumber: number,
  isQualified: boolean | null
) {
  const link = new URL(
    BASE_URL +
      endpoints.jobs.getJobApplicants(jobId) +
      (isQualified
        ? "?isQualified=true"
        : isQualified === false
        ? "?isQualified=false"
        : "")
  );

  link.searchParams.append("page", String(pageNumber));

  const response = await userRequest.get(link.href);

  if (response.data) {
    return {
      applicants: response.data.appliedUsers.map(
        (user: any) =>
          ({
            id: user.profileId,
            email: user.email,
            isQualified: user.isQualified,
            appliedAt: user.appliedData.appliedAt,
            currentStage: user.currentStage,
            interviewGrade: user.interviewData?.grade,
            quizGrade: user.quizData?.grade,
            matchScore: user.matchData?.matchScore,
          } as IJobApplicant)
      ),
      totalPages: response.data.metadata.pageCount,
      totalRecords: response.data.metadata.itemCount,
    };
  } else {
    return null;
  }
}

export async function getInterviewedJobApplicants(
  jobId: string,
  pageNumber: number
) {
  const link = new URL(
    BASE_URL + endpoints.jobs.getInterviewedJobApplicants(jobId)
  );

  link.searchParams.append("page", String(pageNumber));

  const response = await userRequest.get(link.href);

  if (response.data) {
    return {
      applicants: response.data.appliedUsers.map(
        (user: any) =>
          ({
            id: user.profileId,
            email: user.email,
            isQualified: user.isQualified,
            appliedAt: user.appliedData.appliedAt,
            currentStage: user.currentStage,
            interviewGrade: user.interviewData?.grade,
            quizGrade: user.quizData?.grade,
            matchScore: user.matchData?.matchScore,
          } as IJobApplicant)
      ),
      totalPages: response.data.metadata.pageCount,
      totalRecords: response.data.metadata.itemCount,
    };
  } else {
    return null;
  }
}

export async function generateCustomJob(jobPrompt: string) {
  const response = await userRequest.post(endpoints.jobs.generateCustomJob, {
    jobPrompt,
  });
  return response.data;
}

export async function selectCandidate(jobId: string, profileId: string) {
  const response = await userRequest.post(endpoints.jobs.selectCandidate, {
    jobId,
    profileId,
  });
  return response.data;
}
