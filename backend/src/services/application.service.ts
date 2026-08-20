import prisma from "../lib/prisma";

interface CreateApplicationData {
  userId: number;
  jobId: number;
  coverLetter?: string;
}

export const createApplication = async (
  data: CreateApplicationData
) => {
  const { userId, jobId, coverLetter } = data;

  // ------------------------------------------------------------
  // 1. Verify that the logged-in user is a Candidate
  // ------------------------------------------------------------
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      candidate: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "CANDIDATE") {
    throw new Error("Only candidates can apply for jobs");
  }

  // ------------------------------------------------------------
  // 2. Get or create Candidate profile
  // ------------------------------------------------------------
  let candidate = user.candidate;

  if (!candidate) {
    candidate = await prisma.candidate.create({
      data: {
        userId: user.id,
      },
    });
  }

  // ------------------------------------------------------------
  // 3. Verify Job exists
  // ------------------------------------------------------------
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    include: {
      company: true,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  // ------------------------------------------------------------
  // 4. Job must be active
  // ------------------------------------------------------------
  if (job.status !== "ACTIVE") {
    throw new Error("This job is no longer accepting applications");
  }

  // ------------------------------------------------------------
  // 5. Check application deadline
  // ------------------------------------------------------------
  if (
    job.applicationDeadline &&
    new Date() > job.applicationDeadline
  ) {
    throw new Error("The application deadline has passed");
  }

  // ------------------------------------------------------------
  // 6. Prevent duplicate applications
  // ------------------------------------------------------------
  const existingApplication =
    await prisma.application.findUnique({
      where: {
        candidateId_jobId: {
          candidateId: candidate.id,
          jobId: job.id,
        },
      },
    });

  if (existingApplication) {
    throw new Error(
      "You have already applied for this job"
    );
  }

  // ------------------------------------------------------------
  // 7. Find latest resume if available
  // ------------------------------------------------------------
  const latestResume = await prisma.resume.findFirst({
    where: {
      candidateId: candidate.id,
    },
    orderBy: {
      uploadedAt: "desc",
    },
  });

  // ------------------------------------------------------------
  // 8. Create application
  // ------------------------------------------------------------
  const application = await prisma.application.create({
    data: {
      candidateId: candidate.id,
      jobId: job.id,
      resumeId: latestResume?.id,
      coverLetter: coverLetter || null,
      status: "APPLIED",
    },

    include: {
      job: {
        include: {
          company: true,
        },
      },
      resume: true,
    },
  });

  return application;
};

// ============================================================
// GET CANDIDATE APPLICATIONS
// ============================================================

export const getCandidateApplications = async (
  userId: number
) => {
  const candidate = await prisma.candidate.findUnique({
    where: {
      userId,
    },
  });

  if (!candidate) {
    return [];
  }

  const applications = await prisma.application.findMany({
    where: {
      candidateId: candidate.id,
    },

    orderBy: {
      appliedAt: "desc",
    },

    include: {
      job: {
        include: {
          company: true,
          skills: {
            include: {
              skill: true,
            },
          },
        },
      },

      resume: true,

      aiMatchResult: true,

      interviews: {
        orderBy: {
          scheduledAt: "asc",
        },
      },
    },
  });

  return applications;
};

// ============================================================
// GET ONE CANDIDATE APPLICATION
// ============================================================

export const getCandidateApplicationById = async (
  userId: number,
  applicationId: number
) => {
  const candidate = await prisma.candidate.findUnique({
    where: {
      userId,
    },
  });

  if (!candidate) {
    throw new Error("Candidate profile not found");
  }

  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
      candidateId: candidate.id,
    },

    include: {
      job: {
        include: {
          company: true,
          skills: {
            include: {
              skill: true,
            },
          },
        },
      },

      resume: true,

      aiMatchResult: true,

      interviews: {
        orderBy: {
          scheduledAt: "asc",
        },
      },
    },
  });

  if (!application) {
    throw new Error("Application not found");
  }

  return application;
};