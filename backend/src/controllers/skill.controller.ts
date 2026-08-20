import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const create = async (req: Request, res: Response) => {
  try {
    const { name, description, type } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required",
      });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        description,
        type: type || "TECHNICAL",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Skill created successfully",
      skill,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create skill",
    });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      skills,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
    });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill ID",
      });
    }

    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    return res.status(200).json({
      success: true,
      skill,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch skill",
    });
  }
};
