import type { Lead } from "./schema";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Sends a validated lead to the configured email provider.
 *
 * Web3Forms specifics are isolated here so the provider (e.g. Resend) can be
 * swapped later without touching the API route or the form component.
 */
export async function sendLead(lead: Lead): Promise<{ ok: boolean; error?: string }> {
  const accessKey = process.env.WEB3FORMS_KEY;
  if (!accessKey) {
    return { ok: false, error: "Email not configured" };
  }

  const subject = `New consultation: ${lead.intent} — ${lead.name}`;

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject,
      from_name: lead.name,
      ...lead,
    }),
  });

  if (!response.ok) {
    return { ok: false, error: `Web3Forms request failed (${response.status})` };
  }

  return { ok: true };
}
