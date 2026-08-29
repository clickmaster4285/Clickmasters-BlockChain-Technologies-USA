import { createRequire } from "node:module";

import { NextResponse } from "next/server";

export const runtime = "nodejs";

type NodemailerModule = {
  createTransport: (options: {
    service: string;
    auth: {
      user: string;
      pass: string;
    };
  }) => {
    sendMail: (message: {
      from: string;
      to: string;
      replyTo: string;
      subject: string;
      text: string;
    }) => Promise<unknown>;
  };
};

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
  service?: unknown;
  landingPage?: unknown;
  referrer?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  utm_term?: unknown;
  utm_content?: unknown;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function textLine(label: string, value: string) {
  return value ? `${label}: ${value}` : null;
}

const require = createRequire(import.meta.url);
const nodemailer = require("nodemailer") as NodemailerModule;

export async function POST(request: Request) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

  if (!gmailUser || !gmailAppPassword || !receiverEmail) {
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 500 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const phone = clean(payload.phone);
  const message = clean(payload.message);
  const website = clean(payload.website);
  const service = clean(payload.service);
  const landingPage = clean(payload.landingPage);
  const referrer = clean(payload.referrer);
  const utmSource = clean(payload.utm_source);
  const utmMedium = clean(payload.utm_medium);
  const utmCampaign = clean(payload.utm_campaign);
  const utmTerm = clean(payload.utm_term);
  const utmContent = clean(payload.utm_content);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const text = [
      "New contact form submission",
      "",
      textLine("Name", name),
      textLine("Email", email),
      textLine("Phone", phone),
      textLine("Service", service),
      textLine("Website", website),
      "",
      "Message:",
      message,
      "",
      "Submission context:",
      textLine("Landing Page", landingPage),
      textLine("Referrer", referrer),
      textLine("UTM Source", utmSource),
      textLine("UTM Medium", utmMedium),
      textLine("UTM Campaign", utmCampaign),
      textLine("UTM Term", utmTerm),
      textLine("UTM Content", utmContent),
    ]
      .filter((line) => line !== null)
      .join("\n");

    await transporter.sendMail({
      from: gmailUser,
      to: receiverEmail,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);

    return NextResponse.json(
      { error: "Unable to submit your message." },
      { status: 500 },
    );
  }
}
