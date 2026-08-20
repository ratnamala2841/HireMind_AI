import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../lib/prisma";
import { calculateJobMatch } from "../services/ai.service";

export const matchApplication = async (
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
        id: applicationId,
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
        message: "You are not authorized to analyze this application",
      });
    }

    const matchResult = await calculateJobMatch(applicationId);

    return res.status(200).json({
      success: true,
      message: "Application matched successfully",
      matchResult,
    });
  } catch (error) {
    console.error("AI matching error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to calculate application match",
    });
  }
};