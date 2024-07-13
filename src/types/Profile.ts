export type IProfileCard = {
  id: string;
  jobTitle: string;
  skills: string[];
  yearsOfExperience: number;
  cv: string;
  linkedIn: string;
  github: string;
  graduatedFromCS: boolean;
  summary: string;
};

export type IProfileDetails = {
  id: string;
  userId: string;
  jobTitle: string;
  skills: string[];
  languages: string[];
  yearsOfExperience: number;
  graduatedFromCS: boolean;
  cv: string;
  linkedIn: string;
  github: string;
  summary: string;
  experiences: {
    id: number;
    jobTitle: string;
    companyName: string;
    startDate: Date;
    endDate: Date;
    description: string;
  }[];
  educations: {
    id: number;
    degree: string;
    schoolName: string;
    startDate: Date;
    endDate: Date;
    description: string;
  }[];
  projects: {
    id: number;
    name: string;
    description: string;
    skills: string[];
    size: number;
  }[];
  certificates: {
    id: number;
    title: string;
    authority: string;
    issuedAt: Date;
    validUntil: Date;
    url: string;
  }[];
};
