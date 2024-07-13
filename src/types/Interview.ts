export type IInterviewCard = {
  id: string;
  name: string;
  score: number;
  deadline: Date;
  isTaken: boolean;
  profileId: string;
};

export type IInterviewStatistics = {
  total: number;
  taken: number;
  notTaken: number;
};
