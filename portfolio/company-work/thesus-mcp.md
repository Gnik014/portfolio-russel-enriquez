# Query MCP server (warehouse KPI layer) — company case study

**Employer:** KMC MAG Solutions (client: AMI)  
**Role in this work:** Data Analyst / engineer contributing SQL and tool contracts over BigQuery  
**Visibility:** Private service. This page is a case study only — no repository, demo URL, or source is shared.

The company runs a Node.js Model Context Protocol (MCP) server that exposes KPI, distribution, and comment queries over BigQuery. The AMI portal and internal agents call it for broker-survey, regulatory, and legal-sector survey datasets, among others. It is built and shipped with Cloud Build and Docker.

---

## Problem

A reporting portal is only as trustworthy as the query layer behind it. Survey and regulatory metrics were easy to mis-define (NPS components, commercial denominators, segment joins), and several features the portal needed — market-wide comments, regulatory Top N, housing-book change metrics, legal-sector survey distributions — were incomplete or returned empty or wrong fields.

## What I built

I did not invent the MCP platform. My work was in the query tools, dataset config, and contract tests.

- **Consumer survey NPS.** Added promoter, passive, and detractor metrics, and corrected component calculations by parsing stored ratings as numbers. Adjusted broker-survey NPS so a zero rating is excluded and detractors follow the product’s defined score band.
- **Broker-survey comments and brands.** Added an all-lenders flag so NPS comments can be returned for the whole market (no lender filter), with labels omitted in that mode. This all-lenders comments feature is in production. Joined respondent dimensions so state and aggregator columns are actually populated on those comments. Preloaded broker-survey brand records when a foreign key is present, so brand identifiers resolve instead of dropping or mismatching.
- **Commercial KPI correctness.** Fixed commercial “broker usage” to use the intended helper field and commercial denominator. Applied lender-dimension joins in weighted denominator calculations when lender filters are present, and removed a duplicate join. Stopped a schema-level rating-type filter from being applied to fact tables that do not have that column, which had caused BigQuery “unrecognized name” failures on commercial funnel KPIs.
- **Regulatory metrics.** Added Top N ranking (including empty-result and drill-down scope so a Top N response stays correctly bounded). Added a two-month period and anchored rolling periods to the latest data rather than a drifting calendar window. Added housing-book month-on-month and quarter-on-quarter metrics, plus Tableau-compatible regulatory metrics, and preserved aggregate market-ratio semantics so market totals are not incorrectly recomputed. Regulatory Top N and housing-book month-on-month / quarter-on-quarter metrics are in production.
- **Legal-sector survey dataset.** Config and distribution support for gap-remediation work; fact-based distribution for platform-review segments; secondary platforms and gap-reason fields; corrected multi-select segment joins and denominator SQL; applied cross-tab filters in segment counts; fixed AI segment joins.
- **Agent/widget contract.** Accepted the portal’s new star-rating block type in widget create/update validation so agents can author that chart.
- **Distribution filters.** Tightened a base-filter tautology on a third-party lending dataset so generated SQL stays valid.

I used AI pair programming with Cursor and Claude on this work.

## Stack

Node.js MCP server, BigQuery SQL (KPI / distribution / comments tools and dataset manifests), contract tests, Docker, and Google Cloud Build.

## Impact

The AMI portal can request market-wide broker comments, regulatory Top N, and housing-book change metrics from the same warehouse path, and those features are in production. NPS component calculations and zero-rating handling were corrected so published scores follow the intended definitions. Commercial funnel queries no longer fail when a rating-type filter is applied to the wrong table. Legal-sector survey segment and denominator results are more accurate after the join and filter fixes, with fewer silent empty columns.

This case study contains no source, repository links, credentials, hostnames, or project identifiers.
