import prisma from "../lib/prisma";

interface CreateApplicationData {
  jobId: number;
  resumeId?: number;
  coverLetter?: string;
}

export const createApplication = async (
  candidateId: number,
  data: CreateApplicationData
) => {
  // Check that the job exists
  const job = await prisma.job.findUnique({
    where: {
      id: data.jobId,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  // Candidates can apply only to ACTIVE jobs
  if (job.status !== "ACTIVE") {
    throw new Error("Applications are currently closed for this job");
  }

  // Create application
  return await prisma.application.create({
    data: {
      candidateId,
      jobId: data.jobId,
      resumeId: data.resumeId,
      coverLetter: data.coverLetter,
    },
  });
};

export const getApplicationsByCandidate = async (
  candidateId: number
) => {
  return await prisma.application.findMany({
    where: {
      candidateId,
    },
    include: {
      job: true,
      resume: true,
      aiMatchResult: true,
    },
    orderBy: {
      appliedAt: "desc",
    },
  });
};

export const getApplicationById = async (id: number) => {
  return await prisma.application.findUnique({
    where: {
      id,
    },
    include: {
      candidate: true,
      job: true,
      resume: true,
      aiMatchResult: true,
      skillGaps: true,
      interviews: true,
    },
  });
};

export const getApplicationsByJob = async (jobId: number) => {
  return await prisma.application.findMany({
    where: {
      jobId,
    },
    include: {
      candidate: true,
      resume: true,
      aiMatchResult: true,
    },
    orderBy: {
      appliedAt: "desc",
    },
  });
};

export const updateApplicationStatus = async (
  id: number,
  status:
    | "APPLIED"
    | "SCREENING"
    | "SHORTLISTED"
    | "INTERVIEW"
    | "SELECTED"
    | "REJECTED"
    | "WITHDRAWN"
) => {
  return await prisma.application.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};