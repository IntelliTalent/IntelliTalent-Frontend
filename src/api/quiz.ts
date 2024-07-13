import { IQuizCard } from "../types";
import { BASE_URL, endpoints, userRequest } from "./axios";

export async function getQuiz(slug: string) {
  const response = await userRequest.get(endpoints.quiz.getQuiz(slug));

  if (response.data) {
    return response.data;
  } else {
    return null;
  }
}

export async function submitAnswers(
  slug: string,
  userAnswers: (number | null)[]
) {
  const response = await userRequest.post(endpoints.quiz.submitAnswers(slug), {
    userAnswers,
  });

  return response.data;
}

export async function getUserQuizzes(pageNumber: number) {
  const link = new URL(BASE_URL + endpoints.quiz.getUserQuizzes);

  link.searchParams.append("page", String(pageNumber));

  const response = await userRequest.get(link.href);

  if (response.data) {
    return {
      quizzes: response.data.data.map((quiz: any) => ({
        name: quiz.name,
        score: quiz.score,
        deadline: new Date(quiz.deadline),
        isTaken: quiz.isTaken,
        encodedQuizIdentifier: quiz.encodedQuizIdentifier,
      })) as IQuizCard[],
      totalPages: response.data.meta.pageCount,
      totalRecords: response.data.meta.itemCount,
    };
  } else {
    return null;
  }
}

export async function getQuizStatistics() {
  const response = await userRequest.get(endpoints.quiz.getQuizStatistics);

  if (response.data) {
    return response.data;
  } else {
    return null;
  }
}
