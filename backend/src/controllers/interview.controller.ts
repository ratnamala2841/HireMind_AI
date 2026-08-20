import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../lib/prisma";

import {
  createInterview,
  getInterviewById as getInterviewService,
  getInterviewsByApplication,
  getInterviewsByCandidate,
  updateInterview,
  updateInterviewStatus,
  deleteInterview,
} from "../services/interview.service";

import { InterviewStatus, InterviewType } from "../types/interview.types";

/**
 * Schedule a new interview
 */
export const scheduleInterview = async (
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

    const {
      applicationId,
      candidateId,
      type,
      scheduledAt,
      duration,
      meetingLink,
      interviewerName,
      interviewerEmail,
      notes,
    } = req.body;

    if (
      !applicationId ||
      !candidateId ||
      !type ||
      !scheduledAt
    ) {
      return res.status(400).json({
        success: false,
        message:
          "applicationId, candidateId, type and scheduledAt are required",
      });
    }

    const recruiter = await prisma.recruiter.findUnique({
      where: {
        userId: req.user.userId,
      },
    });

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    const application = await prisma.application.findUnique({
      where: {
        id: Number(applicationId),
      },
      include: {
        job: true,
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.job.recruiterId !== recruiter.id) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to schedule an interview for this application",
      });
    }

    if (Number(candidateId) !== application.candidateId) {
      return res.status(400).json({
        success: false,
        message: "Candidate does not belong to this application",
      });
    }

    const interview = await createInterview({
      applicationId: Number(applicationId),
      candidateId: Number(candidateId),
      type: type as InterviewType,
      scheduledAt: new Date(scheduledAt),
      duration: duration ? Number(duration) : undefined,
      meetingLink,
      interviewerName,
      interviewerEmail,
      notes,
    });

    return res.status(201).json({
      success: true,
      message: "Interview scheduled successfully",
      interview,
    });
  } catch (error: any) {
    console.error("Schedule interview error:", error);

    if (
      error?.message?.includes(
        "already scheduled for this application"
      )
    ) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to schedule interview",
    });
  }
};

/**
 * Get a single interview by ID
 */
export const getInterview = async (
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

    const interviewId = Number(req.params.id);

    if (isNaN(interviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    const interview = await getInterviewService(interviewId);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error("Get interview error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get interview",
    });
  }
};

/**
 * Get all interviews for an application
 */
export const getApplicationInterviews = async (
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

    const applicationId = Number(req.params.applicationId);

    if (isNaN(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const interviews =
      await getInterviewsByApplication(applicationId);

    return res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.error(
      "Get application interviews error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get application interviews",
    });
  }
};

/**
 * Get all interviews for a candidate
 */
export const getCandidateInterviews = async (
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

    const candidateId = Number(req.params.candidateId);

    if (isNaN(candidateId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid candidate ID",
      });
    }

    const interviews =
      await getInterviewsByCandidate(candidateId);

    return res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.error(
      "Get candidate interviews error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get candidate interviews",
    });
  }
};

/**
 * Update interview details
 */
export const editInterview = async (
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

    const interviewId = Number(req.params.id);

    if (isNaN(interviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    const existingInterview =
      await getInterviewService(interviewId);

    if (!existingInterview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const {
      type,
      scheduledAt,
      duration,
      meetingLink,
      interviewerName,
      interviewerEmail,
      notes,
      score,
      feedback,
    } = req.body;

    const interview = await updateInterview(interviewId, {
      type: type as InterviewType | undefined,
      scheduledAt: scheduledAt
        ? new Date(scheduledAt)
        : undefined,
      duration:
        duration !== undefined
          ? Number(duration)
          : undefined,
      meetingLink,
      interviewerName,
      interviewerEmail,
      notes,
      score:
        score !== undefined ? Number(score) : undefined,
      feedback,
    });

    return res.status(200).json({
      success: true,
      message: "Interview updated successfully",
      interview,
    });
  } catch (error) {
    console.error("Update interview error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update interview",
    });
  }
};

/**
 * Change interview status
 */
export const changeInterviewStatus = async (
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

    const interviewId = Number(req.params.id);

    if (isNaN(interviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const validStatuses = Object.values(InterviewStatus);

    if (!validStatuses.includes(status as InterviewStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview status",
      });
    }

    const existingInterview =
      await getInterviewService(interviewId);

    if (!existingInterview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const interview = await updateInterviewStatus(
      interviewId,
      status as InterviewStatus
    );

    return res.status(200).json({
      success: true,
      message: "Interview status updated successfully",
      interview,
    });
  } catch (error) {
    console.error(
      "Change interview status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update interview status",
    });
  }
};

/**
 * Cancel an interview
 */
export const cancelInterview = async (
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

    const interviewId = Number(req.params.id);

    if (isNaN(interviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    const existingInterview =
      await getInterviewService(interviewId);

    if (!existingInterview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const interview = await updateInterviewStatus(
      interviewId,
      InterviewStatus.CANCELLED
    );

    return res.status(200).json({
      success: true,
      message: "Interview cancelled successfully",
      interview,
    });
  } catch (error) {
    console.error("Cancel interview error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to cancel interview",
    });
  }
};

/**
 * Delete an interview
 */
export const removeInterview = async (
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

    const interviewId = Number(req.params.id);

    if (isNaN(interviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    const existingInterview =
      await getInterviewService(interviewId);

    if (!existingInterview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    await deleteInterview(interviewId);

    return res.status(200).json({
      success: true,
      message: "Interview deleted successfully",
    });
  } catch (error) {
    console.error("Delete interview error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete interview",
    });
  }
};