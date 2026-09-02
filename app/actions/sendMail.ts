"use server";

import { createRequire } from "node:module";

type NodemailerModule = {
  createTransport: (options: {
    direct: boolean;
    host: string;
    port: number;
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

type SendMailResult = {
  ok: boolean;
  error?: string;
};

const require = createRequire(import.meta.url);
const nodemailer = require("nodemailer") as NodemailerModule;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function textLine(label: string, value: string) {
  return value ? `${label}: ${value}` : null;
}

export async function sendContactMail(
  payload: ContactPayload,
): Promise<SendMailResult> {
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

  if (!receiverEmail) {
    return {
      ok: false,
      error: "Contact receiver email is not configured.",
    };
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
    return {
      ok: false,
      error: "Name, email, and message are required.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      ok: false,
      error: "Please enter a valid email address.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      direct: true,
      host: "localhost",
      port: 25,
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
      from: receiverEmail,
      to: receiverEmail,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text,
    });

    return { ok: true };
  } catch (error) {
    console.error(
      "Direct MX email failed. Port 25 may be blocked by the server environment.",
      error,
    );

    return {
      ok: false,
      error: "Unable to submit your message.",
    };
  }
}
