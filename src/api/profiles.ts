import { IProfileCard, IProfileDetails } from "../types";
import { endpoints, userRequest } from "./axios";

interface ICreateProfileDto {
  jobTitle: string;
  skills: string[];
  yearsOfExperience: number;
  graduatedFromCS: boolean;
  languages: string[];
  summary: string;
  cv?: string;
  linkedIn?: string;
  gitHub?: string;

  // Educations
  educations: {
    degree: string;
    schoolName: string;
    startDate: Date;
    endDate: Date | null;
    description: string;
  }[];

  // Experiences
  experiences: {
    jobTitle: string;
    companyName: string;
    startDate: Date;
    endDate: Date | null;
    description: string;
  }[];

  // Projects
  projects: {
    name: string;
    description: string;
    skills: string[];
    size: number;
    url?: string;
  }[];

  // Certifications
  certificates: {
    title: string;
    authority: string;
    issuedAt: Date;
    validUntil: Date | null;
    url: string;
  }[];
}

interface IUpdateProfileDto {
  jobTitle?: string;
  skills?: string[];
  yearsOfExperience?: number;
  graduatedFromCS?: boolean;
  languages?: string[];
  summary?: string;
  cv?: string;
  linkedIn?: string;
  gitHub?: string;

  // Educations
  educations?: {
    degree: string;
    schoolName: string;
    startDate: Date;
    endDate: Date | null;
    description: string;
  }[];

  // Experiences
  experiences?: {
    jobTitle: string;
    companyName: string;
    startDate: Date;
    endDate: Date | null;
    description: string;
  }[];

  // Projects
  projects?: {
    name: string;
    description: string;
    skills: string[];
    size: number;
    url?: string;
  }[];

  // Certifications
  certificates?: {
    title: string;
    authority: string;
    issuedAt: Date;
    validUntil: Date | null;
    url: string;
  }[];
}

export async function getProfileCards() {
  const response = await userRequest.get(
    `${endpoints.profiles.getProfileCards}?take=100`
  );
  if (response.data) {
    return response.data.data.map(
      (profile: any) =>
        ({
          id: profile.id,
          jobTitle: profile.jobTitle,
          skills: profile.skills,
          yearsOfExperience: profile.yearsOfExperience,
          cv: profile.cv,
          linkedIn: profile.linkedIn,
          github: profile.gitHub,
          graduatedFromCS: profile.graduatedFromCS,
          summary: profile.summary,
        } as IProfileCard)
    );
  } else {
    return null;
  }
}

export async function createProfile(data: ICreateProfileDto) {
  const response = await userRequest.post(
    endpoints.profiles.createProfile,
    data
  );
  return response.data;
}

export async function editProfile(profileId: string, data: IUpdateProfileDto) {
  const response = await userRequest.patch(
    endpoints.profiles.editProfile(profileId),
    data
  );
  return response.data;
}

export async function deleteProfile(profileId: string) {
  const response = await userRequest.delete(
    endpoints.profiles.deleteProfile(profileId)
  );
  return response.data;
}

export async function getProfile(id: string) {
  const response = await userRequest.get(endpoints.profiles.getProfile(id));

  return {
    id: response.data.id,
    userId: response.data.userId,
    jobTitle: response.data.jobTitle,
    skills: response.data.skills,
    languages: response.data.languages,
    yearsOfExperience: response.data.yearsOfExperience,
    graduatedFromCS: response.data.graduatedFromCS,
    cv: response.data.cv,
    linkedIn: response.data.linkedIn,
    github: response.data.gitHub,
    summary: response.data.summary,
    educations: response.data.educations,
    experiences: response.data.experiences,
    projects: response.data.projects,
    certificates: response.data.certificates,
  } as IProfileDetails;
}

export async function createCV(profileId: string) {
  const response = await userRequest.post(
    endpoints.profiles.createCV(profileId)
  );
  return response.data;
}

export async function createCoverLetter(
  profileId: string,
  jobTitle: string,
  companyName: string
) {
  const response = await userRequest.post(
    endpoints.profiles.createCoverLetter(profileId),
    {
      jobTitle,
      companyName,
    }
  );
  return response.data;
}

export async function scrapeProfile(
  githubUserName: string,
  linkedinUserName: string
) {
  const response = await userRequest.post(endpoints.profiles.scrapeProfile, {
    githubUserName,
    linkedinUserName,
  });
  return response.data;
}

export async function extractGithubRepos(githubUserName: string) {
  const response = await userRequest.get(
    endpoints.profiles.extractGithubRepos(githubUserName) + "?take=100"
  );
  return response.data;
}

export async function getAutoFillFields() {
  const response = await userRequest.get(endpoints.profiles.getAutoFillFields);

  return response.data;
}

export async function submitFields(fields: Record<string, string | null>) {
  const response = await userRequest.patch(endpoints.profiles.submitFields, {
    data: fields,
  });
  return response.data;
}
