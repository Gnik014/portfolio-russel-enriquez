# Media-mention RSS pipeline — company case study

**Employer:** KMC MAG Solutions (client: AMI)  
**Role in this work:** Data Analyst / engineer who built the September 2025 media-mention ingestion pipeline  
**Visibility:** Private product. This page is a case study only — no repository, demo URL, or source is shared.

This pipeline pulls RSS and Google Alerts feeds into BigQuery so AMI can track media mentions of major Australian lenders / clients, flag new brands, and review coverage by industry and bank relevance.

---

## Problem

Media mentions lived in inboxes and one-off spreadsheets. Adding a newly tracked brand meant hand-building alert feeds, and analysts had no consistent warehouse table or dashboard for sentiment, industry category, or whether an article was relevant to banking.

## What I built

In September 2025 I built and deployed this pipeline:

- **RSS and Google Alerts into BigQuery.** Extraction scripts pull configured feeds, handle pagination and errors, and load articles into warehouse tables for raw and enhanced mention data.
- **Brand tracking and new-brand detection.** Brands marked for RSS tracking in the warehouse generate alert feeds automatically. The pipeline can detect brands that appear in coverage but are not yet on the tracking list, so the registry can be extended deliberately rather than by manual inbox scanning.
- **Bank-relevance and industry-category fields.** Enhanced columns classify whether an article is relevant to banking and which industry category it belongs to, alongside sentiment and channel-type enrichment used by the dashboard.
- **Cloud Run, Cloud Scheduler, and Secret Manager.** The job runs on a schedule in the cloud so it does not depend on a laptop being open. Feed configuration and credentials sit in Secret Manager rather than in source. I also wrote setup, monitoring, and troubleshooting notes for that deploy path.
- **Windows app to update feeds.** A desktop app lets an operator enable or disable brand tracking, regenerate alert feeds, update configuration, and trigger the cloud job without editing files by hand. It supports search, bulk updates, and dry-run or full runs, and can be built as a standalone executable.
- **Mention dashboard.** A Python web dashboard (`rss_dashboard`) reads the BigQuery tables and shows feed performance, sentiment, industry breakdown, and search/filter views so analysts can inspect the warehouse without writing SQL every time.

I implemented a priority-tiered LLM classification system with conditional logic on Gemini, which classifies and cleans messy media-mention text before analysis.

I used AI pair programming with Cursor on this work.

## Stack

Python; Google BigQuery; Cloud Run (containerised job) and Cloud Scheduler; Secret Manager; a Windows desktop app (Python GUI, optional packaged executable); a Flask/Plotly dashboard for exploration.

## Impact

Tracked-brand mentions land in the warehouse on a schedule, new brands can be spotted from coverage, and analysts can filter by bank relevance and industry category in a dashboard instead of rebuilding extracts. Operators can update which brands are tracked from a desktop app without a deploy for every list change.

This case study contains no source, repository links, credentials, hostnames, or project identifiers.
