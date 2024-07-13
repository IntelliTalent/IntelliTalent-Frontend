export type IJob = {
  id: string;
  title: string;
  company: string;
  type: string;
  jobLocation: string;
  jobPlace: string;
  publishedAt: string;
  csRequired: string;
  url: string;
  skills: string[];
  currentStage?: string;
  jobSource?: string;
  isApplied?: boolean;
};

export type IJobDetails = {
  id: string;
  title: string;
  company: string;
  type: string;
  jobLocation: string;
  jobPlace: string;
  publishedAt: string;
  csRequired: boolean;
  url: string;
  skills: string[];
  description: string;
  neededExperience: number;
  education: string;
  currentStage: string;
  isActive?: boolean;
  jobEndDate?: Date;
  customFilters?: {
    languages: string[];
    country: string;
    city: string;
  };
  quizEndDate?: Date;
  interviewEndDate?: Date;
  interviewQuestions?: string[];
  jobSource?: string;
  isApplied?: boolean;
};

export type IJobCard = {
  id: string;
  title: string;
  company: string;
  type: string;
  jobLocation: string;
  jobPlace: string;
  publishedAt: string;
  csRequired: boolean;
  url: string;
  skills: string[];
  currentStage: string;
  applicationCurrentStage?: string;
  isQualified?: boolean;
  matchScore?: number;
  jobSource?: string;
  isApplied?: boolean;
};

export type IJobApplicant = {
  id: string;
  email: string;
  isQualified: boolean;
  currentStage: string;
  appliedAt: Date;
  quizGrade?: number;
  interviewGrade?: number;
  matchScore?: number;
};
