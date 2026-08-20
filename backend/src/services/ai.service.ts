import prisma from "../lib/prisma";

export const calculateJobMatch = async (applicationId: number) => {
  /*
   * Fetch application along with:
   * - Job and required skills
   * - Candidate
   * - Candidate's existing skills
   * - Resume
   */
  const application = await prisma.application.findUnique({
    where: {
      id: applicationId,
    },
    include: {
      job: {
        include: {
          skills: {
            include: {
              skill: true,
            },
          },
        },
      },
      resume: true,
      candidate: {
        include: {
          skills: {
            include: {
              skill: true,
            },
          },
        },
      },
    },
  });

  /*
   * Validate application
   */
  if (!application) {
    throw new Error("Application not found");
  }

  /*
   * Validate resume
   */
  if (!application.resume) {
    throw new Error("Resume not found for this application");
  }

  const resumeText =
    application.resume.extractedText?.toLowerCase() || "";

  /*
   * Job skills required by the recruiter
   */
  const jobSkills = application.job.skills;

  /*
   * Arrays used for the AI match result
   */
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  /*
   * Compare every required job skill against:
   *
   * 1. Resume extracted text
   * 2. Candidate's manually added skills
   */
  for (const jobSkill of jobSkills) {
    const skillName = jobSkill.skill.name.toLowerCase();

    const resumeHasSkill = resumeText.includes(skillName);

    const candidateHasSkill =
      application.candidate.skills.some(
        (candidateSkill) =>
          candidateSkill.skill.name.toLowerCase() === skillName
      );

    /*
     * Skill is considered matched if it exists
     * either in the resume OR candidate profile.
     */
    if (resumeHasSkill || candidateHasSkill) {
      matchedSkills.push(jobSkill.skill.name);
    } else {
      missingSkills.push(jobSkill.skill.name);
    }
  }

  /*
   * Calculate skills score
   */
  const totalSkills = jobSkills.length;

  const skillsScore =
    totalSkills === 0
      ? 0
      : (matchedSkills.length / totalSkills) * 100;

  /*
   * Determine recommendation based on skills score
   */
  let recommendation:
    | "STRONG_MATCH"
    | "GOOD_MATCH"
    | "PARTIAL_MATCH"
    | "WEAK_MATCH"
    | "NOT_RECOMMENDED";

  if (skillsScore >= 80) {
    recommendation = "STRONG_MATCH";
  } else if (skillsScore >= 60) {
    recommendation = "GOOD_MATCH";
  } else if (skillsScore >= 40) {
    recommendation = "PARTIAL_MATCH";
  } else if (skillsScore > 0) {
    recommendation = "WEAK_MATCH";
  } else {
    recommendation = "NOT_RECOMMENDED";
  }

  /*
   * Generate explanation
   */
  const explanation =
    `Matched ${matchedSkills.length} out of ${totalSkills} required skills.`;

await prisma.skillGap.deleteMany({
  where: {
    applicationId,
  },
});

// Create new skill-gap records for missing skills
for (const jobSkill of jobSkills) {
  const skillName = jobSkill.skill.name.toLowerCase();

  const isMissing = missingSkills.some(
    (skill) => skill.toLowerCase() === skillName
  );

  if (isMissing) {
    await prisma.skillGap.create({
      data: {
        candidateId: application.candidateId,
        applicationId,
        skillId: jobSkill.skillId,
        importance: jobSkill.importance,
        recommendation: `Improve ${jobSkill.skill.name} skills to better match this job.`,
      },
    });
  }
}

  /*
   * ============================================================
   * AI MATCH RESULT
   * ============================================================
   *
   * Create the result if it doesn't exist.
   *
   * Update it if it already exists.
   */
  const result = await prisma.aIMatchResult.upsert({
    where: {
      applicationId,
    },

    update: {
      overallScore: skillsScore,
      skillsScore,
      matchedSkills,
      missingSkills,
      recommendation,
      explanation,
      modelName: "Rule-Based Matcher",
      modelVersion: "1.0",
    },

    create: {
      applicationId,
      overallScore: skillsScore,
      skillsScore,
      matchedSkills,
      missingSkills,
      recommendation,
      explanation,
      modelName: "Rule-Based Matcher",
      modelVersion: "1.0",
    },
  });

  /*
   * Return the AI match result
   */
  return result;
};