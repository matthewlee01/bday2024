import { json } from "@sveltejs/kit";
import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASS } from '$env/static/private';

export async function POST({ request }) {
  const formData = await request.json();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: '"bday2024" <laughew@gmail.com>',
    to: "laughew@gmail.com",
    subject: "rsvp: " + formData.name + " - " + formData.email,
    text: JSON.stringify(formData, null, 2),
  };

  try {
    await transporter.sendMail(mailOptions);
    return json({ success: true, message: "thanks for rsvping! see you there ^^" });
  } catch (error) {
    console.error("Error sending email:", error);
    return json(
      { success: false, message: "error submitting form" },
      { status: 500 }
    );
  }
}
