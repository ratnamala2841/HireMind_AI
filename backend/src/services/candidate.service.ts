import prisma from "../lib/prisma";

interface CreateCandidateData {
  headline?: string;
  summary?: string;
  location?: string;
  experience?: number;
  education?: string;
  currentRole?: string;
  currentCompany?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export const createCandidate = async (
  userId: number,
  data: CreateCandidateData
) => {
  return await prisma.candidate.create({
    data: {
      userId,
      headline: data.headline,
      summary: data.summary,
      location: data.location,
      experience: data.experience,
      education: data.education,
      currentRole: data.currentRole,
      currentCompany: data.currentCompany,
      githubUrl: data.githubUrl,
      linkedinUrl: data.linkedinUrl,
      portfolioUrl: data.portfolioUrl,
    },
  });
};

export const getCandidateByUserId = async (userId: number) => {
  return await prisma.candidate.findUnique({
    where: {
      userId,
    },
  });
};

export const getCandidateById = async (id: number) => {
  return await prisma.candidate.findUnique({
    where: {
      id,
    },
  });
};

export const updateCandidate = async (
  id: number,
  data: Partial<CreateCandidateData>
) => {
  return await prisma.candidate.update({
    where: {
      id,
    },
    data,
  });
};