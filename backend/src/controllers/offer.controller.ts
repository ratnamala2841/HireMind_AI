import { Request, Response } from "express";
import prisma from "../lib/prisma";

export async function updateOfferDecision(
  req: Request,
  res: Response
) {
  try {
    const offerId = Number(req.params.id);
    const { decision } = req.body;

    if (!Number.isInteger(offerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid offer ID",
      });
    }

    if (
      decision !== "accepted" &&
      decision !== "declined"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Decision must be accepted or declined",
      });
    }

    const application =
      await prisma.application.findUnique({
        where: {
          id: offerId,
        },
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application/offer not found",
      });
    }

    const newStatus =
      decision === "accepted"
        ? "SELECTED"
        : "REJECTED";

    const updatedApplication =
      await prisma.application.update({
        where: {
          id: offerId,
        },
        data: {
          status: newStatus,
        },
      });

    return res.status(200).json({
      success: true,
      message:
        decision === "accepted"
          ? "Offer accepted successfully"
          : "Offer declined successfully",
      status: updatedApplication.status,
    });
  } catch (error) {
    console.error(
      "Offer decision error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update offer decision",
    });
  }
}