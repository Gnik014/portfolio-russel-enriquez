# PDF Report Generator ? company case study

**Employer:** KMC MAG Solutions (client: AMI)  
**Role in this work:** I built this tool  
**Visibility:** Private product. This page is a case study only ? no repository, demo URL, or source is shared.

A full-stack app for exporting Tableau Cloud dashboards ? with custom filters ? to PDF, PowerPoint, or a ZIP of images.

---

## Problem

Analysts and editors needed repeatable, filtered Tableau exports without walking through each view by hand, and without keeping credentials in source. Reusable templates and batch runs were missing.

## What I built

I built the tool, working from AgentOS specs:

- Export of Tableau Cloud dashboards with custom filters to PDF, PowerPoint, or an image ZIP
- Saved templates and batch export
- A wizard-style user interface
- Central authentication middleware
- A Cloud Run deploy, with Tableau credentials stored in Secret Manager rather than in source

## Stack

Full-stack web application; Tableau Cloud; Cloud Run; Secret Manager; AgentOS specs.

## Impact

Filtered Tableau dashboards can be exported in the formats editors already use, templates can be reused, and batch exports can run without leaving credentials in the repository.

This case study contains no source, repository links, credentials, hostnames, or project identifiers.
