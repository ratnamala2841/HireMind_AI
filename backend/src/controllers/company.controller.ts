import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { createCompany } from "../services/company.service";

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
      name,
      description,
      website,
      industry,
      location,
      logoUrl,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    const company = await createCompany(
      {
        name,
        description,
        website,
        industry,
        location,
        logoUrl,
      },
      req.user.userId
    );

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create company",
    });
  }
};