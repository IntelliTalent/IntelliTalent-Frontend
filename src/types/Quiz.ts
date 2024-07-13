export type IQuiz = {
  question: string;
  answers: string[];
};

export type IQuizCard = {
  name: string;
  score: number;
  deadline: Date;
  isTaken: boolean;
  encodedQuizIdentifier: string;
};

export type IQuizStatistics = {
  total: number;
  taken: number;
  notTaken: number;
};
