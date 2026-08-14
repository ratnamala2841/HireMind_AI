import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../lib/prisma";
import {
  createResume,
  getResumesByCandidate,
  getResumeById,
  updateResume,
  deleteResume,
} from "../services/resume.service";

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

    const {
      fileName,
      fileUrl,
      fileType,
      fileSize,
      extractedText,
    } = req.body;

    if (!fileName) {
      return res.status(400).json({
        success: false,
        message: "fileName is required",
      });
    }

    const resume = await createResume(candidate.id, {
      fileName,
      fileUrl,
      fileType,
      fileSize,
      extractedText,
    });

    return res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create resume",
    });
  }
};

export const getMyResumes = async (
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

    const resumes = await getResumesByCandidate(candidate.id);

    return res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resumes",
    });
  }
};

export const getOne = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID",
      });
    }

    const resume = await getResumeById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume",
    });
  }
};

export const update = async (
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
        message: "Invalid resume ID",
      });
    }

    const resume = await getResumeById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const candidate = await prisma.candidate.findUnique({
      where: {
        userId: req.user.userId,
      },
    });

    if (!candidate || resume.candidateId !== candidate.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this resume",
      });
    }

    const updatedResume = await updateResume(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume: updatedResume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update resume",
    });
  }
};

export const remove = async (
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
        message: "Invalid resume ID",
      });
    }

    const resume = await getResumeById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const candidate = await prisma.candidate.findUnique({
      where: {
        userId: req.user.userId,
      },
    });

    if (!candidate || resume.candidateId !== candidate.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this resume",
      });
    }

    await deleteResume(id);

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete resume",
    });
  }
};