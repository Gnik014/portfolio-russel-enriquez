# Tableau MCP server ? company case study

**Employer:** KMC MAG Solutions (client: AMI)  
**Role in this work:** I built this service  
**Visibility:** Private service. This page is a case study only ? no repository, demo URL, or source is shared.

A Model Context Protocol (MCP) server for Tableau Cloud, used from Cursor.

---

## Problem

Workbook discovery, view data, file exports, and extract refreshes lived behind the Tableau Cloud UI or one-off scripts, so they were hard to call consistently from an editor session.

## What I built

I built the server. It supports:

- Discovery of workbooks, views, and data sources
- View data as CSV or JSON
- Export to PDF, PNG, or PowerPoint
- Triggers for extract refreshes

## Stack

Node.js on Cloud Run; Secret Manager; Google Cloud Storage; Tableau Cloud; used from Cursor.

## Impact

From Cursor, workbooks and views can be discovered, view data pulled, files exported, and extracts refreshed through one service instead of ad-hoc clicks or scripts.

This case study contains no source, repository links, credentials, hostnames, or project identifiers.
