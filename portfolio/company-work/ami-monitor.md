# Internal monitoring and audit tool — company case study

**Employer:** KMC MAG Solutions (client: AMI)  
**Role in this work:** Data Analyst / engineer on pipeline health, media audit, and truth comparison  
**Visibility:** Private internal tool. This page is a case study only — no repository, live product URL, or source is shared. A short redacted walkthrough is linked below.

AMI Monitor is a TypeScript application (React frontend, Express backend) used by the team to audit data flowing into the AMI portal: email/ad capture health, media-feed review (including paywalled sites), and a truth-comparison check against the query layer.


## Walkthrough

[A short walkthrough of the website and data-pipeline monitoring tool. Sensitive names and figures are blurred.](https://gnik014.github.io/portfolio-russel-enriquez/assets/video/monitoring-demo.mp4)

---

## Problem

Overnight capture and classification pipelines could fail quietly. Reviewers needed to see which emails or ads failed each stage, whether a site was paywalled, and whether warehouse KPIs still matched an expected “truth” table — without opening raw logs or treating every scoring anomaly as a real incident. Before Pipeline Health, triaging overnight capture failures took 1-2 days of work.

## What I built

I did not build the whole monitor. My work covered three areas:

- **Email / ad pipeline health.** Replaced earlier quality reports with a Capture-focused pipeline health view, then extended scoring through later overnight stages (verify through creative identity). Failing checks list the underlying emails or ads (sender, subject, sent/captured, and links to the captured page and screenshot). Capture scores publisher captures separately from discovery lookups; inbox double-check matches on message identity or subject plus sent time over a short recent window. Scoring fixes after an overnight investigation: do not treat a known publisher as “unknown” when its real sending domain already has a rule; score only publisher captures as in-scope; treat “nothing eligible” as unknown rather than a hard fail; allow morning-window crop and brand-match records for older items still waiting on that step. Shared domain rules (including a for-review status) read the same domain table as the pipeline and are subdomain-aware. UI: pass/fail colour that ignores unknown when choosing the pass tone, and overnight windows shown in Australia/Sydney rather than UTC.
- **Brand reference data.** Brand logo management and advertiser alias review, including inactive logo status and a refreshed alias count.
- **Media monitor and paywalled sites.** Date filters and article-source visibility; a paywalled-site list (add from an article, loading state, and a clear “paywalled website” label beside the URL in the list). Completeness and queue refresh on login plus a manual refresh, and optimistic updates so an approval does not require a full list reload. Audit metadata on new paywalled-site rows.
- **Truth comparison.** Comparison coverage for commercial and consumer-lender modules, including batched KPI calls, fallback brands/metrics when bulk options are empty, and end-of-month date ranges. Correct identifier column for a consumer truth table, and empty-chunk handling when the query layer returns “no data.” Summary views that roll results up by metric or brand (overall / metrics / brand). Compatibility routes so a production 404 on the comparison API was resolved. A TypeScript type clash that had broken the Cloud Build compile for a related report-monitor route.

I used AI pair programming with Cursor and Claude on this work.

## Stack

TypeScript, React, Vite, Tailwind, TanStack Query, and Recharts on the frontend; Express and BigQuery on the backend; Cloud Scheduler for overnight jobs; Cloud Build / container deploy for the API. Auth is shared with the AMI portal (admin-only audit pages).

## Impact

Operators can see overnight pipeline health stage by stage, mark paywalled sources in the media queue, and compare portal metrics to a truth table. False fails from discovery rows, timezone display, and empty-result handling are reduced. Before Pipeline Health, triaging overnight capture failures took 1-2 days of work; now it takes an hour at most, usually about 30 minutes.

This case study contains no source, repository links, credentials, hostnames, or project identifiers.
