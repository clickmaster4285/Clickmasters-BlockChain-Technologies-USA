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

const CRM_LEAD_ENDPOINT =
  process.env.CRM_LEAD_ENDPOINT || "https://crm.clickmasters.pk/api/leads";

type CrmLead = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
  service: string;
  landingPage: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
};

async function submitLeadToCrm(lead: CrmLead): Promise<boolean> {
  try {
    const response = await fetch(CRM_LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");

      console.error(
        `CRM lead submission failed (${response.status}): ${detail}`,
      );

      return false;
    }

    return true;
  } catch (error) {
    console.error("CRM lead submission failed:", error);

    return false;
  }
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
    const crmSubmitted = await submitLeadToCrm({
      name,
      email,
      phone,
      message,
      website,
      service,
      landingPage,
      referrer,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
    });

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
    } catch (error) {
      console.error(
        "Direct MX email failed. Port 25 may be blocked by the server environment.",
        error,
      );

      if (crmSubmitted) {
        return { ok: true };
      }
    }

    if (!crmSubmitted) {
      return {
        ok: false,
        error: "Unable to submit your message.",
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("Contact form submission failed:", error);

    return {
      ok: false,
      error: "Unable to submit your message.",
    };
  }
}
