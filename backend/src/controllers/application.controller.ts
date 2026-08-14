import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../lib/prisma";
import {
  createApplication,
  getApplicationsByCandidate,
  getApplicationById,
  getApplicationsByJob,
  updateApplicationStatus,
} from "../services/application.service";

export const create = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const candidate = await prisma.candidate.findUnique({
      where: {
        userId: req.user.userId,
      },
    });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate profile not found",
      });
    }

    const { jobId, resumeId, coverLetter } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "jobId is required",
      });
    }

    const job = await prisma.job.findUnique({
      where: {
        id: Number(jobId),
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (resumeId) {
      const resume = await prisma.resume.findFirst({
        where: {
          id: Number(resumeId),
          candidateId: candidate.id,
        },
      });

      if (!resume) {
        return res.status(404).json({
          success: false,
          message: "Resume not found or does not belong to you",
        });
      }
    }

    const existingApplication =
      await prisma.application.findUnique({
        where: {
          candidateId_jobId: {
            candidateId: candidate.id,
            jobId: Number(jobId),
          },
        },
      });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await createApplication(
      candidate.id,
      {
        jobId: Number(jobId),
        resumeId: resumeId ? Number(resumeId) : undefined,
        coverLetter,
      }
    );

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
};

export const getMyApplications = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const candidate = await prisma.candidate.findUnique({
      where: {
        userId: req.user.userId,
      },
    });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate profile not found",
      });
    }

    const applications =
      await getApplicationsByCandidate(candidate.id);

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

export const getOne = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const application = await getApplicationById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch application",
    });
  }
};

export const getByJob = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const jobId = Number(req.params.jobId);

    if (isNaN(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const recruiter = await prisma.recruiter.findUnique({
      where: {
        userId: req.user.userId,
      },
    });

    if (!recruiter) {
      return res.status(403).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        recruiterId: recruiter.id,
      },
    });

    if (!job) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view applications for this job",
      });
    }

    const applications =
      await getApplicationsByJob(jobId);

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch job applications",
    });
  }
};

export const updateStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const id = Number(req.params.id);
    const { status } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const allowedStatuses = [
      "APPLIED",
      "SCREENING",
      "SHORTLISTED",
      "INTERVIEW",
      "SELECTED",
      "REJECTED",
      "WITHDRAWN",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const application = await getApplicationById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const recruiter = await prisma.recruiter.findUnique({
      where: {
        userId: req.user.userId,
      },
    });

    if (!recruiter) {
      return res.status(403).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    if (application.job.recruiterId !== recruiter.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this application",
      });
    }

    const updatedApplication =
      await updateApplicationStatus(id, status);

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};