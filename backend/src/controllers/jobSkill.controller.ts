import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../lib/prisma";
import {
  addSkillToJob,
  getJobSkills,
  removeSkillFromJob,
} from "../services/jobSkill.service";

export const addSkill = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const jobId = Number(req.params.jobId);
    const { skillId, required, importance } = req.body;

    if (isNaN(jobId) || !skillId) {
      return res.status(400).json({
        success: false,
        message: "Valid jobId and skillId are required",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
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

    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        recruiterId: recruiter.id,
      },
    });

    if (!job) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to modify this job",
      });
    }

    const jobSkill = await addSkillToJob(
      jobId,
      Number(skillId),
      required ?? true,
      importance ?? 1
    );

    return res.status(201).json({
      success: true,
      message: "Skill added to job successfully",
      jobSkill,
    });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "This skill is already added to the job",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to add skill to job",
    });
  }
};

export const getSkills = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const jobId = Number(req.params.jobId);

    if (isNaN(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const skills = await getJobSkills(jobId);

    return res.status(200).json({
      success: true,
      skills,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch job skills",
    });
  }
};

export const removeSkill = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const jobId = Number(req.params.jobId);
    const skillId = Number(req.params.skillId);

    if (isNaN(jobId) || isNaN(skillId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID or skill ID",
      });
    }

    const result = await removeSkillFromJob(jobId, skillId);

    return res.status(200).json({
      success: true,
      message: "Skill removed from job successfully",
      result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove skill from job",
    });
  }
};
