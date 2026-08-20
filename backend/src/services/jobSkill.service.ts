import prisma from "../lib/prisma";

export const addSkillToJob = async (
  jobId: number,
  skillId: number,
  required: boolean = true,
  importance: number = 1
) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  const skill = await prisma.skill.findUnique({
    where: { id: skillId },
  });

  if (!skill) {
    throw new Error("Skill not found");
  }

  return await prisma.jobSkill.create({
    data: {
      jobId,
      skillId,
      required,
      importance,
    },
    include: {
      skill: true,
    },
  });
};

export const getJobSkills = async (jobId: number) => {
  return await prisma.jobSkill.findMany({
    where: {
      jobId,
    },
    include: {
      skill: true,
    },
    orderBy: {
      importance: "desc",
    },
  });
};

export const removeSkillFromJob = async (
  jobId: number,
  skillId: number
) => {
  return await prisma.jobSkill.delete({
    where: {
      jobId_skillId: {
        jobId,
        skillId,
      },
    },
  });
};
