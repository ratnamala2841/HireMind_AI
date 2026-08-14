import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createCandidate,
  getCandidateByUserId,
  getCandidateById,
  updateCandidate,
} from "../services/candidate.service";

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

    const existingCandidate = await getCandidateByUserId(
      req.user.userId
    );

    if (existingCandidate) {
      return res.status(409).json({
        success: false,
        message: "Candidate profile already exists",
      });
    }

    const candidate = await createCandidate(
      req.user.userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Candidate profile created successfully",
      candidate,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create candidate profile",
    });
  }
};

export const getMe = async (
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

    const candidate = await getCandidateByUserId(
      req.user.userId
    );

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      candidate,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch candidate profile",
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
        message: "Invalid candidate ID",
      });
    }

    const candidate = await getCandidateById(id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    return res.status(200).json({
      success: true,
      candidate,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch candidate",
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

    const candidate = await getCandidateByUserId(
      req.user.userId
    );

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate profile not found",
      });
    }

    const updatedCandidate = await updateCandidate(
      candidate.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Candidate profile updated successfully",
      candidate: updatedCandidate,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update candidate profile",
    });
  }
};