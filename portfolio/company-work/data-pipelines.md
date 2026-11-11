# Data pipelines — company case study

**Employer:** KMC MAG Solutions (client: AMI)  
**Role in this work:** Analytics engineering for a market-research client  
**Visibility:** Private, shared repository. This page is a case study only — no repository, demo URL, or source is shared.

This work lives in a shared monorepo of BigQuery SQL and Node pipelines for survey and brand-tracking data. I contributed analytics-engineering pieces there; I did not author the whole codebase. The transforms are **dbt-style layered SQL models** (staging, reshape, marts, and dimension and fact tables), not a dbt project.

---

## Problem

Market-research data needed a repeatable path from a survey platform into trustworthy warehouse tables. Loads had to be checked before they landed, and undone if something went wrong. Quality issues in joins, flags, and mappings could silently pollute downstream marts.

## What I built and owned

- **Survey-platform-to-BigQuery pipeline.** I built an end-to-end pipeline that lands a new brand-tracking product in BigQuery. That work included discovery and label-mapping notes, weighting and staging-comparison documentation, layered SQL transforms, a weighting merge script, and a Node pipeline runner. The transforms stage respondents, reshape brand and media data from wide to long, assemble brand-tracking and omnibus tables, and reconcile months and metrics.
- **Production-safe deploys.** For that pipeline I used a backup before writing, preflight checks, append, an enrichment patch, verify queries, and a rollback script for each step.
- **Data-quality fixes.** I fixed join patterns in append scripts that were producing bad rows, corrected brand-name prioritization and item-type filtering, and corrected NPS flags for text-labeled ratings, with a migration and a summary note. I also fixed an append script.
- **Dimension maintenance.** I added new brands to the brand dimension and brand-tracking tables, and fixed a mapping join between lenders and brands.
- **Operations-report fixes.** I stopped a duplicate daily operations report caused by an in-process scheduler, and fixed weekly survey-target counting in that daily report.

The rest of the monorepo is shared work. Changes went through pull requests. Migrations are documented, and production changes are treated as rollback-first.

## Stack

Google BigQuery (dbt-style layered SQL: staging, wide-to-long reshape, marts, and dimension/fact tables); Node.js for pipeline runners and backup / preflight / verify / rollback scripts.

## Impact

A new brand-tracking product can move from the survey platform into verified warehouse tables, deploys can be preflighted and rolled back, and several silent quality issues in joins, flags, and mappings no longer land in downstream tables.

This case study contains no source, repository links, credentials, hostnames, vendor names, or unconfirmed figures.
