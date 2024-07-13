import { IInterviewCard } from "../types/Interview";
import { BASE_URL, endpoints, userRequest } from "./axios";

export async function getInterview(jobId: string) {
  const response = await userRequest.get(
    endpoints.interview.getInterview(jobId)
  );

  if (response.data) {
    return response.data;
  } else {
    return null;
  }
}

export async function submitInterviewAnswers(
  jobId: string,
  profileId: string,
  questions: string[],
  answers: string[],
  recordedAnswers: string[]
) {
  const response = await userRequest.post(endpoints.interview.submitAnswers, {
    jobId,
    profileId,
    questions,
    answers,
    recordedAnswers,
  });

  return response.data;
}

export async function getInterviewAnswers(jobId: string, profileId: string) {
  const response = await userRequest.get(
    endpoints.interview.getInterviewAnswers(jobId, profileId)
  );

  return response.data;
}

export async function reviewInterviewQuestions(
  jobId: string,
  profileId: string,
  grades: number[]
) {
  const response = await userRequest.post(endpoints.interview.reviewInterview, {
    jobId,
    profileId,
    grades,
  });

  return response.data;
}

export async function getUserInterviews(pageNumber: number) {
  const link = new URL(BASE_URL + endpoints.interview.getUserInterviews);

  link.searchParams.append("page", String(pageNumber));

  const response = await userRequest.get(link.href);

  if (response.data) {
    return {
      interviews: response.data.userInterviews.map((interview: any) => ({
        id: interview.jobId,
        name: interview.name,
        score: interview.score,
        deadline: new Date(interview.deadline),
        isTaken: interview.isTaken,
        profileId: interview.profileId,
      })) as IInterviewCard[],
      totalPages: response.data.metadata.pageCount,
      totalRecords: response.data.metadata.itemCount,
    };
  } else {
    return null;
  }
}

export async function getInterviewStatistics() {
  const response = await userRequest.get(
    endpoints.interview.getInterviewStatistics
  );

  if (response.data) {
    return response.data;
  } else {
    return null;
  }
}
