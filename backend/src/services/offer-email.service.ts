import nodemailer from "nodemailer";

type OfferEmailData = {
  candidate: string;
  email: string;
  role: string;
  department: string;
  salary: string;
  location: string;
  joiningDate: string;
  employmentType: string;
  probation: string;
  workingHours: string;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendOfferEmail(
  offer: OfferEmailData
) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error(
      "Email configuration is missing. Please configure EMAIL_USER and EMAIL_PASSWORD."
    );
  }

  const mailOptions = {
    from:
      process.env.EMAIL_FROM ||
      `"HireMind AI" <${process.env.EMAIL_USER}>`,

    to: offer.email,

    subject: `Offer Letter - ${offer.role} | HireMind AI`,

    html: `
      <div style="font-family: Arial, sans-serif; background:#f5f7fb; padding:30px;">
        <div style="max-width:700px; margin:auto; background:white; padding:35px; border-radius:12px;">

          <h1 style="color:#4f46e5; margin-bottom:5px;">
            HireMind AI
          </h1>

          <p style="color:#64748b;">
            Official Employment Offer
          </p>

          <hr style="border:none; border-top:1px solid #e2e8f0; margin:25px 0;" />

          <h2 style="color:#0f172a;">
            Congratulations, ${offer.candidate}! 🎉
          </h2>

          <p style="color:#475569; line-height:1.7;">
            We are pleased to offer you the position of
            <strong>${offer.role}</strong> at HireMind AI.
          </p>

          <h3 style="color:#0f172a; margin-top:30px;">
            Offer Details
          </h3>

          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0; color:#64748b;">Position</td>
              <td style="padding:10px 0; font-weight:bold;">${offer.role}</td>
            </tr>

            <tr>
              <td style="padding:10px 0; color:#64748b;">Department</td>
              <td style="padding:10px 0; font-weight:bold;">${offer.department}</td>
            </tr>

            <tr>
              <td style="padding:10px 0; color:#64748b;">Salary</td>
              <td style="padding:10px 0; font-weight:bold;">${offer.salary}</td>
            </tr>

            <tr>
              <td style="padding:10px 0; color:#64748b;">Location</td>
              <td style="padding:10px 0; font-weight:bold;">${offer.location}</td>
            </tr>

            <tr>
              <td style="padding:10px 0; color:#64748b;">Joining Date</td>
              <td style="padding:10px 0; font-weight:bold;">${offer.joiningDate}</td>
            </tr>

            <tr>
              <td style="padding:10px 0; color:#64748b;">Employment Type</td>
              <td style="padding:10px 0; font-weight:bold;">${offer.employmentType}</td>
            </tr>

            <tr>
              <td style="padding:10px 0; color:#64748b;">Probation</td>
              <td style="padding:10px 0; font-weight:bold;">${offer.probation}</td>
            </tr>

            <tr>
              <td style="padding:10px 0; color:#64748b;">Working Hours</td>
              <td style="padding:10px 0; font-weight:bold;">${offer.workingHours}</td>
            </tr>
          </table>

          <h3 style="color:#0f172a; margin-top:30px;">
            Important Company Guidelines
          </h3>

          <ul style="color:#475569; line-height:1.8;">
            <li>Maintain professional conduct and workplace ethics.</li>
            <li>Follow company policies and security guidelines.</li>
            <li>Protect confidential company and customer information.</li>
            <li>Follow assigned working hours and attendance policies.</li>
            <li>Complete required onboarding and training programs.</li>
            <li>Comply with applicable company rules and procedures.</li>
          </ul>

          <div style="margin-top:30px; padding:20px; background:#eef2ff; border-radius:10px;">
            <p style="margin:0; color:#3730a3;">
              Please review the offer details carefully and respond through
              the HireMind AI platform.
            </p>
          </div>

          <div style="margin-top:30px;">
            <a
              href="http://localhost:3000/offers"
              style="
                display:inline-block;
                background:#4f46e5;
                color:white;
                padding:13px 22px;
                border-radius:8px;
                text-decoration:none;
                font-weight:bold;
              "
            >
              Review Offer
            </a>
          </div>

          <p style="margin-top:35px; color:#94a3b8; font-size:13px;">
            This is an automated email from HireMind AI.
            Please do not reply directly to this email.
          </p>

        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);

  return {
    success: true,
    message: "Offer email sent successfully",
  };
}