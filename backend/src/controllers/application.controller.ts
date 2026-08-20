import { Response } from "express";

import {
  createApplication,
  getCandidateApplications,
  getCandidateApplicationById,
} from "../services/application.service";

import { AuthRequest } from "../middleware/auth.middleware";

// ============================================================
// APPLY FOR JOB
// ============================================================

export const applyForJob = async (
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

    const jobId = Number(req.body.jobId);

    if (!jobId || Number.isNaN(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Valid jobId is required",
      });
    }

    const coverLetter =
      typeof req.body.coverLetter === "string"
        ? req.body.coverLetter
        : undefined;

    const application = await createApplication({
      userId: req.user.userId,
      jobId,
      coverLetter,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error(
      "Apply for job error:",
      error
    );

    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to submit application",
    });
  }
};

// ============================================================
// GET MY APPLICATIONS
// ============================================================

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

    const applications =
      await getCandidateApplications(
        req.user.userId
      );

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(
      "Get applications error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch applications",
    });
  }
};

// ============================================================
// GET ONE APPLICATION
// ============================================================

export const getMyApplicationById = async (
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

    const applicationId = Number(
      req.params.id
    );

    if (
      !applicationId ||
      Number.isNaN(applicationId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const application =
      await getCandidateApplicationById(
        req.user.userId,
        applicationId
      );

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(
      "Get application error:",
      error
    );

    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Application not found",
    });
  }
};