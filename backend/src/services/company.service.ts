import prisma from "../lib/prisma";

interface CreateCompanyData {
  name: string;
  description?: string;
  website?: string;
  industry?: string;
  location?: string;
  logoUrl?: string;
}

export const createCompany = async (
  data: CreateCompanyData,
  userId: number
) => {
  const company = await prisma.company.create({
    data: {
      name: data.name,
      description: data.description,
      website: data.website,
      industry: data.industry,
      location: data.location,
      logoUrl: data.logoUrl,
    },
  });

  return company;
};