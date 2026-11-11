# Tableau Cloud site administration — company case study

**Employer:** KMC MAG Solutions (client: AMI)  
**Role in this work:** Tableau Cloud site administration and workbook library management  
**Visibility:** Process and library case study only. No client names, published workbook links, or server URLs.

Alongside building the AMI portal, I administered AMI’s Tableau Cloud site — the reporting library clients and internal analysts used before (and alongside) the portal.

---

## Problem

AMI ships several research products, each with current workbooks, personalised packs, PDF-extract variants, and older copies. Without a structured library, data-source transitions and “which file is live?” questions become risky, and there is no clean way to compare a Tableau metric to the newer warehouse query layer.

## What I managed

A structured workbook library across more than six report products, using generic product names only:

- broker survey (residential and commercial)
- consumer survey
- brand intelligence
- adviser survey
- tech review
- third-party lending report (and related public-data or client-page packs, held separately)

Within that library I kept:

- **Personalised workbooks** and **PDF-extract workbooks** in their own folders so a client-ready pack is not confused with the canonical product file
- **Old-version archiving**, so superseded workbooks leave the live product folder but remain recoverable
- **Data-source transition workbooks**, used when a product’s extract or live source had to move from one month’s cut to the next without breaking published views
- **A Tableau-versus-query-layer ground-truth project**, where the same consumer-survey and broker-survey metrics were compared between Tableau and the warehouse MCP/query layer before trusting the portal

I do not share client-branded packs, request folders, or row-level extracts.

## Stack

Tableau Cloud (workbooks, extracts, and project folders); Tableau Desktop for library maintenance; comparison against the BigQuery-backed query layer used by the AMI portal.

## Impact

Editors and analysts can find the current workbook for a product, keep personalised and PDF variants from overwriting it, archive safely, and check Tableau figures against the query layer during the portal transition.

## Sanitized screenshots that would help

For a review pack or Loom, capture only dummy or fully blurred client views. Prefer a personal/demo site if one exists.

| Shot | What to show | What to blur or exclude |
|---|---|---|
| 1. Site project list | Top-level Tableau Cloud projects named with generic product labels (or renamed for the shot) | Real client project names, user names, site URL, org ID |
| 2. One product folder | Canonical workbooks vs “Personalised” vs “PDF extract” vs “Old versions” subfolders | Workbook titles that include a client or brand; thumbnails with logos or figures |
| 3. Archive folder | An “Old versions” list that makes the retention pattern obvious | Dates or titles that identify a client pack; preview thumbnails |
| 4. Data-source transition | A transition workbook open on the Data Source tab (generic field names only) | Live server/host names, extract paths, credentials, warehouse project IDs |
| 5. Ground-truth comparison | A simple side-by-side of a generic KPI from Tableau and from the query layer (demo numbers or fully blurred values) | Real client filters, lender names, exact published scores, internal tool URLs |

This case study contains no source, repository links, credentials, hostnames, client names, or folder counts.
