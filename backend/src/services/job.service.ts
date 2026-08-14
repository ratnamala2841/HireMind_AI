import prisma from "../lib/prisma";

interface CreateJobData {
  recruiterId: number;
  companyId: number;
  title: string;
  description: string;
  location?: string;
  jobType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";
  workMode: "REMOTE" | "HYBRID" | "ONSITE";
  experienceLevel: "ENTRY" | "JUNIOR" | "MID" | "SENIOR" | "LEAD";
  minExperience?: number;
  maxExperience?: number;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  openings?: number;
  applicationDeadline?: Date;
}

export const createJob = async (data: CreateJobData) => {
  const job = await prisma.job.create({
    data: {
      recruiterId: data.recruiterId,
      companyId: data.companyId,
      title: data.title,
      description: data.description,
      location: data.location,
      jobType: data.jobType,
      workMode: data.workMode,
      experienceLevel: data.experienceLevel,
      minExperience: data.minExperience,
      maxExperience: data.maxExperience,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      currency: data.currency,
      openings: data.openings,
      applicationDeadline: data.applicationDeadline,
    },
  });

  return job;
};

export const getJobs = async () => {
  return await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      company: true,
      recruiter: {
        include: {
          user: true,
        },
      },
    },
  });
};

export const getJobById = async (id: number) => {
  return await prisma.job.findUnique({
    where: {
      id,
    },
    include: {
      company: true,
      recruiter: {
        include: {
          user: true,
        },
      },
    },
  });
};

export const updateJob = async (
  id: number,
  data: Partial<CreateJobData>
) => {
  return await prisma.job.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteJob = async (id: number) => {
  return await prisma.job.delete({
    where: {
      id,
    },
  });
};

export const updateJobStatus = async (
  jobId: number,
  recruiterId: number,
  status: "DRAFT" | "ACTIVE" | "CLOSED" | "ARCHIVED"
) => {
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      recruiterId,
    },
  });

  if (!job) {
    throw new Error("Job not found or unauthorized");
  }

  const updatedJob = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      status,
    },
  });

  return updatedJob;
};

