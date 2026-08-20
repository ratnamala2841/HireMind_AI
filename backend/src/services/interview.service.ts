import prisma from "../lib/prisma";

interface CreateInterviewData {
  applicationId: number;
  candidateId: number;
  type: any;
  scheduledAt: Date;
  duration?: number;
  meetingLink?: string;
  interviewerName?: string;
  interviewerEmail?: string;
  notes?: string;
}

interface UpdateInterviewData {
  type?: any;
  scheduledAt?: Date;
  duration?: number;
  meetingLink?: string;
  interviewerName?: string;
  interviewerEmail?: string;
  notes?: string;
  score?: number;
  feedback?: string;
}

/**
 * Common include object for interview responses.
 *
 * IMPORTANT:
 * We explicitly select the user fields so that sensitive
 * fields such as passwordHash are NEVER returned.
 */
const interviewInclude = {
  application: {
    include: {
      job: true,
    },
  },

  candidate: {
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          profileImage: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  },
};

/**
 * Create a new interview.
 *
 * Prevents duplicate scheduling for the same:
 * - application
 * - candidate
 * - interview type
 * - scheduled time
 *
 * A cancelled interview does not block rescheduling.
 */
export const createInterview = async (
  data: CreateInterviewData
) => {
  const existingInterview = await prisma.interview.findFirst({
    where: {
      applicationId: data.applicationId,
      candidateId: data.candidateId,
      type: data.type,
      scheduledAt: data.scheduledAt,

      // Cancelled interviews can be rescheduled.
      status: {
        not: "CANCELLED",
      },
    },
  });

  if (existingInterview) {
    throw new Error(
      "An interview is already scheduled for this application at the selected time"
    );
  }

  const interview = await prisma.interview.create({
    data: {
      applicationId: data.applicationId,
      candidateId: data.candidateId,
      type: data.type,
      scheduledAt: data.scheduledAt,
      duration: data.duration,
      meetingLink: data.meetingLink,
      interviewerName: data.interviewerName,
      interviewerEmail: data.interviewerEmail,
      notes: data.notes,
    },

    include: interviewInclude,
  });

  return interview;
};

/**
 * Get a single interview by ID.
 */
export const getInterviewById = async (
  interviewId: number
) => {
  const interview = await prisma.interview.findUnique({
    where: {
      id: interviewId,
    },

    include: interviewInclude,
  });

  return interview;
};

/**
 * Get all interviews for an application.
 */
export const getInterviewsByApplication = async (
  applicationId: number
) => {
  const interviews = await prisma.interview.findMany({
    where: {
      applicationId,
    },

    orderBy: {
      scheduledAt: "asc",
    },

    include: interviewInclude,
  });

  return interviews;
};

/**
 * Get all interviews for a candidate.
 */
export const getInterviewsByCandidate = async (
  candidateId: number
) => {
  const interviews = await prisma.interview.findMany({
    where: {
      candidateId,
    },

    orderBy: {
      scheduledAt: "asc",
    },

    include: interviewInclude,
  });

  return interviews;
};

/**
 * Update interview details.
 */
export const updateInterview = async (
  interviewId: number,
  data: UpdateInterviewData
) => {
  const interview = await prisma.interview.update({
    where: {
      id: interviewId,
    },

    data,

    include: interviewInclude,
  });

  return interview;
};

/**
 * Update interview status.
 */
export const updateInterviewStatus = async (
  interviewId: number,
  status: any
) => {
  const interview = await prisma.interview.update({
    where: {
      id: interviewId,
    },

    data: {
      status,
    },

    include: interviewInclude,
  });

  return interview;
};

/**
 * Cancel an interview.
 *
 * We use CANCELLED instead of deleting the record.
 * This preserves the interview history.
 */
export const cancelInterview = async (
  interviewId: number
) => {
  const interview = await prisma.interview.update({
    where: {
      id: interviewId,
    },

    data: {
      status: "CANCELLED",
    },

    include: interviewInclude,
  });

  return interview;
};

/**
 * Delete an interview permanently.
 *
 * This should only be used when a hard delete is required.
 */
export const deleteInterview = async (
  interviewId: number
) => {
  const interview = await prisma.interview.delete({
    where: {
      id: interviewId,
    },
  });

  return interview;
};