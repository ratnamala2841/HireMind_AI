import prisma from "../src/lib/prisma";

async function main() {
  console.log("🌱 Starting database seed...");

  // ------------------------------------------------------------
  // 1. Create Company
  // ------------------------------------------------------------

  const company = await prisma.company.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      name: "TechNova",
      description:
        "Technology company focused on AI, software development and digital solutions.",
      website: "https://technova.example.com",
      industry: "Technology",
      location: "Chennai",
    },
  });

  console.log("✅ Company created:", company.id, company.name);

  // ------------------------------------------------------------
  // 2. Create Recruiter User
  // ------------------------------------------------------------

  const user = await prisma.user.upsert({
    where: {
      email: "recruiter@hiremind.ai",
    },
    update: {
      role: "RECRUITER",
    },
    create: {
      name: "HireMind Recruiter",
      email: "recruiter@hiremind.ai",
      passwordHash: "$2b$10$j5wtjbq52jaR0ys.BQJmyOhgWxdex9LP2k94V7Usqeio7B7xssxEG",
      role: "RECRUITER",
      phone: null,
      profileImage: null,
    },
  });

  console.log("✅ Recruiter user created:", user.id);

  // ------------------------------------------------------------
  // 3. Create Recruiter Profile
  // ------------------------------------------------------------

  const recruiter = await prisma.recruiter.upsert({
    where: {
      userId: user.id,
    },
    update: {
      companyId: company.id,
      designation: "Recruiter",
    },
    create: {
      userId: user.id,
      companyId: company.id,
      designation: "Recruiter",
    },
  });

  console.log("✅ Recruiter profile created:", recruiter.id);

  console.log("");
  console.log("========================================");
  console.log("🌱 DATABASE SEED COMPLETED");
  console.log("========================================");
  console.log("Company ID:", company.id);
  console.log("User ID:", user.id);
  console.log("Recruiter ID:", recruiter.id);
  console.log("========================================");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });