import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../lib/prisma";

import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  updateJobStatus,
} from "../services/job.service";

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

    const {
      companyId,
      title,
      description,
      location,
      jobType,
      workMode,
      experienceLevel,
      minExperience,
      maxExperience,
      salaryMin,
      salaryMax,
      currency,
      openings,
      applicationDeadline,
    } = req.body;

    if (!companyId || !title || !description || !jobType || !workMode || !experienceLevel) {
      return res.status(400).json({
        success: false,
        message: "companyId, title, description, jobType, workMode and experienceLevel are required",
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

    if (recruiter.companyId !== Number(companyId)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to create jobs for this company",
      });
    }

    const job = await createJob({
      recruiterId: recruiter.id,
      companyId: Number(companyId),
      title,
      description,
      location,
      jobType,
      workMode,
      experienceLevel,
      minExperience,
      maxExperience,
      salaryMin,
      salaryMax,
      currency,
      openings,
      applicationDeadline: applicationDeadline
        ? new Date(applicationDeadline)
        : undefined,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create job",
    });
  }
};

export const getAll = async (
  _req: AuthRequest,
  res: Response
) => {
  try {
    const jobs = await getJobs();

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
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
        message: "Invalid job ID",
      });
    }

    const job = await getJobById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch job",
    });
  }
};

export const update = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await updateJob(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update job",
    });
  }
};

export const remove = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await deleteJob(id);

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      job,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete job",
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

    const jobId = Number(req.params.id);
    const { status } = req.body;

    if (isNaN(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Job status is required",
      });
    }

    const allowedStatuses = [
      "DRAFT",
      "ACTIVE",
      "CLOSED",
      "ARCHIVED",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job status",
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

    const job = await updateJobStatus(
      jobId,
      recruiter.id,
      status as "DRAFT" | "ACTIVE" | "CLOSED" | "ARCHIVED"
    );

    return res.status(200).json({
      success: true,
      message: "Job status updated successfully",
      job,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update job status",
    });
  }
};