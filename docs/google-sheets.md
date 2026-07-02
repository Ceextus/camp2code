# Logging registrations to Google Sheets

Every time someone submits the [Register form](../src/components/sections/register/RegisterForm.jsx),
the browser POSTs the data to [`/api/register`](../src/app/api/register/route.js).
That route forwards the row to a **Google Apps Script Web App**, which appends it
to a Google Sheet. The user is then handed off to WhatsApp — that hand-off never
waits on the sheet, so a sheet outage can't block a registration.

```
RegisterForm  ──POST /api/register──▶  route.js  ──POST webhook──▶  Apps Script  ──▶  Google Sheet
```

This approach needs **no Google Cloud project, no service account, and no npm
packages** — just one environment variable.

## One-time setup (~5 minutes)

### 1. Create the sheet
1. Go to <https://sheets.google.com> and create a blank spreadsheet, e.g.
   **"Camp2Code Registrations"**. Leave it empty — the header row is added
   automatically on the first submission.

### 2. Add the Apps Script
1. In the sheet: **Extensions → Apps Script**.
2. Delete the default `function myFunction() {}` and paste the entire contents of
   [`google-sheets.gs`](./google-sheets.gs).
3. Click the **Save** icon.

### 3. Deploy as a Web App
1. Click **Deploy → New deployment**.
2. Next to "Select type", click the gear ⚙️ and choose **Web app**.
3. Set:
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`  ← required so the server can POST to it
4. Click **Deploy**, then **Authorize access** and approve the permissions
   (Google will warn it's an unverified app — that's expected for your own script;
   choose *Advanced → Go to <project> (unsafe)*).
5. Copy the **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfy..../exec`

### 4. Wire it into the app
Add the URL as an environment variable named `GOOGLE_SHEETS_WEBHOOK_URL`.

**Local development** — create a file named `.env.local` in the project root:

```bash
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/AKfy..../exec"
```

> `.env.local` is git-ignored, so the URL never gets committed. Restart
> `npm run dev` after adding it.

**Production (Vercel)** — Project → **Settings → Environment Variables** → add
`GOOGLE_SHEETS_WEBHOOK_URL` with the same value, then redeploy.

## Testing it

1. With `GOOGLE_SHEETS_WEBHOOK_URL` set, run `npm run dev`.
2. Submit the form at `/register` (or curl it directly):

   ```bash
   curl -X POST http://localhost:3000/api/register \
     -H "Content-Type: application/json" \
     -d '{"fullName":"Test User","age":"14","phone":"+2348000000000","email":"t@e.com","location":"Wuse","selectedTracks":"frontend, design"}'
   ```
3. A new row should appear in the sheet.

## Behaviour notes

- **The sheet write is best-effort.** If the webhook is missing, slow (>8s), or
  errors, `/api/register` still returns `{ ok: true }` so the user proceeds to
  WhatsApp. The full row is written to the **server logs** (`[register] …`) so no
  registration is ever silently lost — you can recover it from Vercel logs.
- **Updating the script:** after editing `google-sheets.gs` in the Apps Script
  editor, you must **Deploy → Manage deployments → Edit → Deploy** again (or the
  URL keeps running the old version). Re-deploying to the *same* deployment keeps
  the URL stable.

## Want a service-account / Sheets API version instead?

The webhook is the lowest-friction option and is plenty for a marketing site. If
you later need tighter control (private sheet, no "Anyone" access, structured
error handling), switch to the official Sheets API with a service account and the
`googleapis` package. That path requires a Google Cloud project, a service-account
JSON key, and sharing the sheet with the service-account email. Ask and I can wire
it up.
