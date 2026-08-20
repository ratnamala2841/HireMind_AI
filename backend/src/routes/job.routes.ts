import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

/* ============================================================
   HELPERS
   ============================================================ */

const validJobTypes = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
  "FREELANCE",
];

const validWorkModes = [
  "REMOTE",
  "HYBRID",
  "ONSITE",
];

const validExperienceLevels = [
  "ENTRY",
  "JUNIOR",
  "MID",
  "SENIOR",
  "LEAD",
];

const validJobStatuses = [
  "DRAFT",
  "ACTIVE",
  "CLOSED",
  "ARCHIVED",
];

function isValidJobType(value: unknown): boolean {
  return (
    typeof value === "string" &&
    validJobTypes.includes(value)
  );
}

function isValidWorkMode(value: unknown): boolean {
  return (
    typeof value === "string" &&
    validWorkModes.includes(value)
  );
}

function isValidExperienceLevel(value: unknown): boolean {
  return (
    typeof value === "string" &&
    validExperienceLevels.includes(value)
  );
}

function isValidJobStatus(value: unknown): boolean {
  return (
    typeof value === "string" &&
    validJobStatuses.includes(value)
  );
}

function toOptionalNumber(value: unknown): number | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const numberValue = Number(value);

  return Number.isNaN(numberValue) ? null : numberValue;
}

function toOptionalDate(value: unknown): Date | null {
  if (!value) {
    return null;
  }

  const date = new Date(String(value));

  return Number.isNaN(date.getTime()) ? null : date;
}

/* ============================================================
   GET /api/jobs
   Fetch jobs
   ============================================================ */

router.get("/", async (req, res) => {
  try {
    const {
      search,
      location,
      jobType,
      workMode,
      experienceLevel,
      status,
      companyId,
      recruiterId,
    } = req.query;

    const where: any = {};

    /*
     * Candidate-facing requests can use:
     * ?status=ACTIVE
     *
     * Recruiter requests can omit status to see
     * DRAFT / ACTIVE / CLOSED / ARCHIVED jobs.
     */

    if (typeof search === "string" && search.trim()) {
      where.OR = [
        {
          title: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
      ];
    }

    if (typeof location === "string" && location.trim()) {
      where.location = {
        contains: location.trim(),
        mode: "insensitive",
      };
    }

    if (
      typeof jobType === "string" &&
      isValidJobType(jobType)
    ) {
      where.jobType = jobType;
    }

    if (
      typeof workMode === "string" &&
      isValidWorkMode(workMode)
    ) {
      where.workMode = workMode;
    }

    if (
      typeof experienceLevel === "string" &&
      isValidExperienceLevel(experienceLevel)
    ) {
      where.experienceLevel = experienceLevel;
    }

    if (
      typeof status === "string" &&
      isValidJobStatus(status)
    ) {
      where.status = status;
    }

    if (typeof companyId === "string") {
      const parsedCompanyId = Number(companyId);

      if (!Number.isNaN(parsedCompanyId)) {
        where.companyId = parsedCompanyId;
      }
    }

    if (typeof recruiterId === "string") {
      const parsedRecruiterId = Number(recruiterId);

      if (!Number.isNaN(parsedRecruiterId)) {
        where.recruiterId = parsedRecruiterId;
      }
    }

    const jobs = await prisma.job.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },

      include: {
        company: true,

        recruiter: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },

        skills: {
          include: {
            skill: true,
          },
        },

        applications: {
          select: {
            id: true,
            candidateId: true,
            status: true,
            appliedAt: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("GET /api/jobs error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
});

/* ============================================================
   GET /api/jobs/:id
   Fetch one job
   ============================================================ */

router.get("/:id", async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    if (Number.isNaN(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },

      include: {
        company: true,

        recruiter: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },

        skills: {
          include: {
            skill: true,
          },
        },

        applications: {
          select: {
            id: true,
            candidateId: true,
            status: true,
            appliedAt: true,
          },
        },
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("GET /api/jobs/:id error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch job",
    });
  }
});

/* ============================================================
   POST /api/jobs
   Create a new job
   ============================================================ */

router.post("/", async (req, res) => {
  try {
    const {
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

      status,
      openings,
      applicationDeadline,

      companyId,
      recruiterId,

      skillIds,
    } = req.body;

    /* --------------------------------------------------------
       Required fields
       -------------------------------------------------------- */

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    if (!jobType || !isValidJobType(jobType)) {
      return res.status(400).json({
        success: false,
        message:
          "Valid jobType is required: FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP or FREELANCE",
      });
    }

    if (!workMode || !isValidWorkMode(workMode)) {
      return res.status(400).json({
        success: false,
        message:
          "Valid workMode is required: REMOTE, HYBRID or ONSITE",
      });
    }

    if (
      !experienceLevel ||
      !isValidExperienceLevel(experienceLevel)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Valid experienceLevel is required: ENTRY, JUNIOR, MID, SENIOR or LEAD",
      });
    }

    if (!companyId || !recruiterId) {
      return res.status(400).json({
        success: false,
        message:
          "Company ID and recruiter ID are required",
      });
    }

    /* --------------------------------------------------------
       Validate company
       -------------------------------------------------------- */

    const parsedCompanyId = Number(companyId);
    const parsedRecruiterId = Number(recruiterId);

    if (
      Number.isNaN(parsedCompanyId) ||
      Number.isNaN(parsedRecruiterId)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Company ID and recruiter ID must be valid numbers",
      });
    }

    const company = await prisma.company.findUnique({
      where: {
        id: parsedCompanyId,
      },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    /* --------------------------------------------------------
       Validate recruiter
       -------------------------------------------------------- */

    const recruiter = await prisma.recruiter.findUnique({
      where: {
        id: parsedRecruiterId,
      },
    });

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    /* --------------------------------------------------------
       Validate recruiter belongs to company
       -------------------------------------------------------- */

    if (recruiter.companyId !== parsedCompanyId) {
      return res.status(400).json({
        success: false,
        message:
          "Recruiter does not belong to the selected company",
      });
    }

    /* --------------------------------------------------------
       Validate optional values
       -------------------------------------------------------- */

    const parsedMinExperience =
      toOptionalNumber(minExperience);

    const parsedMaxExperience =
      toOptionalNumber(maxExperience);

    const parsedSalaryMin =
      toOptionalNumber(salaryMin);

    const parsedSalaryMax =
      toOptionalNumber(salaryMax);

    const parsedOpenings =
      openings === undefined ||
      openings === null ||
      openings === ""
        ? 1
        : Number(openings);

    if (
      Number.isNaN(parsedOpenings) ||
      parsedOpenings < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Openings must be at least 1",
      });
    }

    if (
      parsedMinExperience !== null &&
      parsedMaxExperience !== null &&
      parsedMinExperience > parsedMaxExperience
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Minimum experience cannot be greater than maximum experience",
      });
    }

    if (
      parsedSalaryMin !== null &&
      parsedSalaryMax !== null &&
      parsedSalaryMin > parsedSalaryMax
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Minimum salary cannot be greater than maximum salary",
      });
    }

    const parsedDeadline =
      toOptionalDate(applicationDeadline);

    if (
      applicationDeadline &&
      !parsedDeadline
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid application deadline",
      });
    }

    const finalStatus =
      status && isValidJobStatus(status)
        ? status
        : "DRAFT";

    /* --------------------------------------------------------
       Validate skill IDs
       -------------------------------------------------------- */

    let normalizedSkillIds: number[] = [];

    if (Array.isArray(skillIds)) {
      normalizedSkillIds = skillIds
        .map((id: unknown) => Number(id))
        .filter(
          (id: number) =>
            !Number.isNaN(id)
        );
    }

    if (normalizedSkillIds.length > 0) {
      const skills = await prisma.skill.findMany({
        where: {
          id: {
            in: normalizedSkillIds,
          },
        },
        select: {
          id: true,
        },
      });

      const existingSkillIds = new Set(
        skills.map((skill) => skill.id)
      );

      const invalidSkillIds =
        normalizedSkillIds.filter(
          (id) => !existingSkillIds.has(id)
        );

      if (invalidSkillIds.length > 0) {
        return res.status(400).json({
          success: false,
          message: "One or more skill IDs do not exist",
          invalidSkillIds,
        });
      }
    }

    /* --------------------------------------------------------
       Create job + job skills
       -------------------------------------------------------- */

    const job = await prisma.$transaction(
      async (transaction) => {
        const createdJob =
          await transaction.job.create({
            data: {
              title: String(title).trim(),
              description: String(
                description
              ).trim(),

              location:
                location
                  ? String(location).trim()
                  : null,

              jobType: jobType as any,
              workMode: workMode as any,
              experienceLevel:
                experienceLevel as any,

              minExperience:
                parsedMinExperience,

              maxExperience:
                parsedMaxExperience,

              salaryMin:
                parsedSalaryMin,

              salaryMax:
                parsedSalaryMax,

              currency:
                currency
                  ? String(currency).trim()
                  : "INR",

              status:
                finalStatus as any,

              openings:
                parsedOpenings,

              applicationDeadline:
                parsedDeadline,

              company: {
                connect: {
                  id: parsedCompanyId,
                },
              },

              recruiter: {
                connect: {
                  id: parsedRecruiterId,
                },
              },
            },
          });

        if (normalizedSkillIds.length > 0) {
          await transaction.jobSkill.createMany({
            data: normalizedSkillIds.map(
              (skillId) => ({
                jobId: createdJob.id,
                skillId,
                required: true,
                importance: 1,
              })
            ),
            skipDuplicates: true,
          });
        }

        return createdJob;
      }
    );

    /* --------------------------------------------------------
       Return complete created job
       -------------------------------------------------------- */

    const completeJob =
      await prisma.job.findUnique({
        where: {
          id: job.id,
        },

        include: {
          company: true,

          recruiter: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },

          skills: {
            include: {
              skill: true,
            },
          },
        },
      });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: completeJob,
    });
  } catch (error) {
    console.error(
      "POST /api/jobs error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create job",
    });
  }
});

/* ============================================================
   PATCH /api/jobs/:id
   Update an existing job
   ============================================================ */

router.patch("/:id", async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    if (Number.isNaN(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const existingJob =
      await prisma.job.findUnique({
        where: {
          id: jobId,
        },
      });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const {
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
      status,
      openings,
      applicationDeadline,
      skillIds,
    } = req.body;

    const updateData: any = {};

    if (title !== undefined) {
      updateData.title =
        String(title).trim();
    }

    if (description !== undefined) {
      updateData.description =
        String(description).trim();
    }

    if (location !== undefined) {
      updateData.location =
        location
          ? String(location).trim()
          : null;
    }

    if (jobType !== undefined) {
      if (!isValidJobType(jobType)) {
        return res.status(400).json({
          success: false,
          message: "Invalid jobType",
        });
      }

      updateData.jobType =
        jobType as any;
    }

    if (workMode !== undefined) {
      if (!isValidWorkMode(workMode)) {
        return res.status(400).json({
          success: false,
          message: "Invalid workMode",
        });
      }

      updateData.workMode =
        workMode as any;
    }

    if (experienceLevel !== undefined) {
      if (
        !isValidExperienceLevel(
          experienceLevel
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid experienceLevel",
        });
      }

      updateData.experienceLevel =
        experienceLevel as any;
    }

    if (minExperience !== undefined) {
      updateData.minExperience =
        toOptionalNumber(
          minExperience
        );
    }

    if (maxExperience !== undefined) {
      updateData.maxExperience =
        toOptionalNumber(
          maxExperience
        );
    }

    if (salaryMin !== undefined) {
      updateData.salaryMin =
        toOptionalNumber(
          salaryMin
        );
    }

    if (salaryMax !== undefined) {
      updateData.salaryMax =
        toOptionalNumber(
          salaryMax
        );
    }

    if (currency !== undefined) {
      updateData.currency =
        currency
          ? String(currency).trim()
          : "INR";
    }

    if (status !== undefined) {
      if (!isValidJobStatus(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid job status",
        });
      }

      updateData.status =
        status as any;
    }

    if (openings !== undefined) {
      const parsedOpenings =
        Number(openings);

      if (
        Number.isNaN(parsedOpenings) ||
        parsedOpenings < 1
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Openings must be at least 1",
        });
      }

      updateData.openings =
        parsedOpenings;
    }

    if (
      applicationDeadline !==
      undefined
    ) {
      const deadline =
        toOptionalDate(
          applicationDeadline
        );

      if (
        applicationDeadline &&
        !deadline
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid application deadline",
        });
      }

      updateData.applicationDeadline =
        deadline;
    }

    const updatedJob =
      await prisma.$transaction(
        async (transaction) => {
          const job =
            await transaction.job.update({
              where: {
                id: jobId,
              },
              data: updateData,
            });

          if (Array.isArray(skillIds)) {
            const normalizedSkillIds =
              skillIds
                .map((id: unknown) =>
                  Number(id)
                )
                .filter(
                  (id: number) =>
                    !Number.isNaN(id)
                );

            await transaction.jobSkill.deleteMany(
              {
                where: {
                  jobId,
                },
              }
            );

            if (
              normalizedSkillIds.length >
              0
            ) {
              await transaction.jobSkill.createMany(
                {
                  data:
                    normalizedSkillIds.map(
                      (
                        skillId
                      ) => ({
                        jobId,
                        skillId,
                        required: true,
                        importance: 1,
                      })
                    ),
                  skipDuplicates: true,
                }
              );
            }
          }

          return job;
        }
      );

    const completeJob =
      await prisma.job.findUnique({
        where: {
          id: updatedJob.id,
        },

        include: {
          company: true,

          recruiter: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },

          skills: {
            include: {
              skill: true,
            },
          },
        },
      });

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: completeJob,
    });
  } catch (error) {
    console.error(
      "PATCH /api/jobs/:id error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update job",
    });
  }
});

/* ============================================================
   DELETE /api/jobs/:id
   Delete a job
   ============================================================ */

router.delete("/:id", async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    if (Number.isNaN(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const existingJob =
      await prisma.job.findUnique({
        where: {
          id: jobId,
        },
      });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await prisma.job.delete({
      where: {
        id: jobId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE /api/jobs/:id error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete job",
    });
  }
});

export default router;