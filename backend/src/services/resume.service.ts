import prisma from "../lib/prisma";

interface CreateResumeData {
  fileName: string;
  fileUrl?: string;
  fileType?: string;
  fileSize?: number;
  extractedText?: string;
}

export const createResume = async (
  candidateId: number,
  data: CreateResumeData
) => {
  return await prisma.resume.create({
    data: {
      candidateId,
      fileName: data.fileName,
      fileUrl: data.fileUrl,
      fileType: data.fileType,
      fileSize: data.fileSize,
      extractedText: data.extractedText,
    },
  });
};

export const getResumesByCandidate = async (
  candidateId: number
) => {
  return await prisma.resume.findMany({
    where: {
      candidateId,
    },
    orderBy: {
      uploadedAt: "desc",
    },
  });
};

export const getResumeById = async (id: number) => {
  return await prisma.resume.findUnique({
    where: {
      id,
    },
  });
};

export const updateResume = async (
  id: number,
  data: Partial<CreateResumeData>
) => {
  return await prisma.resume.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteResume = async (id: number) => {
  return await prisma.resume.delete({
    where: {
      id,
    },
  });
};
