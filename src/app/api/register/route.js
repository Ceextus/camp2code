// POST /api/register
//
// Appends one submission row to a Google Sheet, then returns. The client
// (RegisterForm) redirects to WhatsApp regardless of the result of this write,
// so a sheet outage never blocks a registration — failures are logged server
// side for manual recovery.
//
// The sheet write goes through a Google Apps Script Web App (a "webhook") whose
// URL lives in the GOOGLE_SHEETS_WEBHOOK_URL env var. See docs/google-sheets.md
// for the one-time setup.

export const dynamic = "force-dynamic"; // never cache; every POST must run

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // Normalize + validate. Name and phone are the only hard requirements.
  const fields = {
    fullName: String(body.fullName ?? "").trim(),
    age: String(body.age ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    email: String(body.email ?? "").trim(),
    location: String(body.location ?? "").trim(),
    tracks: String(body.selectedTracks ?? "").trim(),
  };

  if (!fields.fullName || !fields.phone) {
    return Response.json(
      { ok: false, error: "Name and WhatsApp number are required." },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  // No webhook configured yet — don't fail the registration, just log the row
  // so it can be recovered from server logs until the sheet is wired up.
  if (!webhookUrl) {
    console.warn(
      "[register] GOOGLE_SHEETS_WEBHOOK_URL is not set — registration not saved to sheet:",
      fields
    );
    return Response.json({ ok: true, logged: false });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
      // Fail fast rather than hanging the request if Apps Script is slow.
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      throw new Error(`Sheet webhook responded with ${res.status}`);
    }

    return Response.json({ ok: true, logged: true });
  } catch (err) {
    // Log the full row so no registration is lost if the webhook is down.
    console.error(
      "[register] Failed to append registration to Google Sheet:",
      err,
      fields
    );
    // Still return ok so the client proceeds to WhatsApp.
    return Response.json({ ok: true, logged: false });
  }
}
