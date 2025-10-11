import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"EasyMart" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: `
      <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; padding: 40px 0;">
        <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #2a2a2a; margin-bottom: 10px;">🔐 Email Verification</h2>
            <p style="color: #555; font-size: 15px; margin: 0;">
              Please use the OTP below to verify your email address.
            </p>
          </div>

          <!-- OTP Section -->
          <div style="text-align: center; background-color: #f0f7ff; border-radius: 10px; padding: 25px 0; margin: 30px 0;">
            <span style="font-size: 32px; letter-spacing: 8px; color: #007bff; font-weight: bold;">
              ${otp}
            </span>
          </div>

          <!-- Message -->
          <div style="text-align: center; margin-bottom: 30px;">
            <p style="color: #444; font-size: 15px; line-height: 1.6; margin: 0;">
              This OTP will expire in <strong>5 minutes</strong>.<br>
              If you didn’t request this, please ignore this email.
            </p>
          </div>

          <!-- Divider -->
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

          <!-- Footer -->
          <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; text-align: center;">
            <p style="color: #888; font-size: 13px; margin: 0;">
              © ${new Date().getFullYear()} <strong>EasyMart</strong>. All rights reserved.<br>
              This is an automated email — please do not reply.
            </p>
          </div>

        </div>
      </div>
    `
  });
};
