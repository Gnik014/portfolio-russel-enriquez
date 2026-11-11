# Loom scripts (~2 minutes each)

Recording scripts for two short walkthroughs. Loom URLs are coming soon. Do **not** show `.env`, tokens, PATs, SSH keys, real client names, logos, production URLs, or identifiable report content on camera.

---

## Loom A — Monitoring tool

**Working title:** From silent dashboards to Slack that pings when ops break  
**Target length:** ~1:45–2:15  
**Safe demo mode:** dry-run only (posts nothing to Slack)

### Shot list / on-screen cues

| Time | On screen | Spoken lines (approx.) |
|---|---|---|
| 0:00–0:20 | VS Code / Explorer on project root; zoom README title | “Ops teams drown in dashboards that nobody opens at 2 a.m. I built a monitoring layer that watches Tableau extracts and live SQL, then posts a short Slack alert with a PNG table only when a rule fires.” |
| 0:20–0:50 | Scroll `reports.yaml` structure (blur channel IDs if sensitive); point at `category: once_a_day` vs `live` | “Architecture is simple: YAML defines each report. Once-a-day digests read Tableau published sources after refresh. Live alerts query the warehouse directly on a one-minute poll, with hour-bucket state so we don’t double-post.” |
| 0:50–1:20 | Terminal dry-run OR open a redacted sample PNG under `out\` if one exists without PII; show Slack message text printed by dry-run | “Here’s a dry run: same query path, message body, and table render — zero Slack post. Failure handling retries transient DB errors and can route hard failures to an error channel.” |
| 1:20–1:45 | Optional: Dockerfile / `scheduler.py` mention, or Windows task install script name only | “Same code path runs on a laptop scheduler or as a single Kubernetes pod with a PVC for state — so closing the lid doesn’t mean missing the morning digest.” |
| 1:45–2:05 | Back to README “Report categories” table | “Outcome: operators get signal, not noise — daily digests once per working day, live alerts only on threshold breaches. That’s the automation layer I’d bring to a one-person data team.” |
| 2:05–2:15 | End card: your name + “Monitoring / Slack alerts” | “Happy to walk through thresholds and onboarding next.” |

### Do not show

- `.env`, Key Vault secret names with values, `*.pem`, live Slack channel filled with real customer amounts if policy forbids
- Production hostnames if you prefer anonymizing to “Azure SQL / Tableau Cloud”

### Post-record

- Paste the Loom URL into the `<LOOM_MONITORING_URL>` placeholder in `share-pack.md` when it is ready.

---

## Loom B — AMI portal (sanitized demo walkthrough)

**Working title:** From Tableau-style report wrangling to a production digital-report portal  
**Target length:** ~2:00  
**Demo:** AMI portal, **demo account and demo data only**  
**Employer context (say if asked, not as on-screen text):** KMC MAG Solutions (client: AMI)  
**Stack to mention:** TypeScript / React portal, widgets and charts, PDF export, BigQuery via the query layer

### Pre-recording checklist

Do not start recording until every item is checked:

- [ ] Signed in with a **demo** account (not a live client org)
- [ ] Opened a **demo** digital report / dashboard only — no real client report titles
- [ ] No real client or brand **names** visible (filters, axis labels, legends, titles, comments, analysis text)
- [ ] No real client or brand **logos** in the chrome, artwork pages, or widgets
- [ ] No internal or production **URLs** in the address bar (use a blurred bar, a local/demo host, or crop the browser chrome)
- [ ] No live report content, comments, or respondent-level rows on screen
- [ ] Notifications, other tabs, and Slack/email popups closed
- [ ] If anything real appears mid-take, stop and reshoot

### Shot list / on-screen cues

| Time | On screen | Spoken lines (approx.) |
|---|---|---|
| 0:00–0:20 | Browser: AMI portal home or report list, demo data only; blur the address bar if needed | “Market-intelligence teams used to rebuild the same lender comparison in Tableau and then fight the PDF. I work on the AMI portal at KMC MAG Solutions — a TypeScript and React reporting app where editors assemble digital reports, present them, and export a client-ready PDF from the same widgets.” |
| 0:20–0:50 | Simple architecture sketch or a slow pan: editor → widgets → query layer → BigQuery, then View / Present / PDF | “Architecture is straightforward: editors place widgets on a page; those widgets query a BigQuery-backed KPI layer for broker-survey, regulatory, and legal-sector survey data; the same view drives presentation mode and PDF export. I used AI pair programming with Cursor and Claude to ship these pieces.” |
| 0:50–1:25 | Demo report: open a lender crosstab or star-rating widget; show General (all lenders) comments or an Analysis box; do **not** linger on any real names | “Here’s a sanitized demo. A lender crosstab and a service star-rating sit on the same page as market-wide broker comments and a per-page Analysis section. Those widgets and the PDF fixes are in production — editors no longer jump back to Tableau for these layouts.” |
| 1:25–1:50 | PDF preview of the **same demo page** (artwork and margins visible, content still demo-only) | “Outcome: what you edit is what you present and what you print. Export no longer drops artwork, uneven margins, or header lines, and analysis typography stays consistent from page to page.” |
| 1:50–2:10 | End card: your name + “AMI portal — digital reports” (no URL, no client logo) | “A written case study is in the share pack. Happy to walk through a live demo under NDA.” |

### Do not show

- Real client or brand names, logos, or report titles
- Production hostnames, query strings, or organisation IDs
- Source code, `.env`, or admin/system screens
- Respondent-level comments that could identify a person or lender

### Post-record

- Paste the Loom URL into the `<LOOM_MARKET_RESEARCH_URL>` placeholder in `share-pack.md` when it is ready.
