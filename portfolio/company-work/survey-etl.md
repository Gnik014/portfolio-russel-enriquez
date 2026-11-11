# Survey ETL pipeline ? company case study

**Employer:** KMC MAG Solutions (client: AMI)  
**Role in this work:** I built this pipeline  
**Visibility:** Private pipeline. This page is a case study only ? no repository, demo URL, or source is shared.

A Python ETL that extracts survey data, transforms it, and loads it to BigQuery.

---

## Problem

Survey extracts needed a scheduled, typed path into the warehouse so analysts were not running laptop jobs or repairing schema drift by hand after each load.

## What I built

In late 2025 I built the pipeline: extract, transform, and load to BigQuery, including schema typing fixes with PyArrow. It runs on Cloud Run, is built and deployed with Cloud Build, is scheduled with Cloud Scheduler, and keeps credentials in Secret Manager.

## Stack

Python; PyArrow; Google BigQuery; Cloud Run; Cloud Build (CI/CD); Cloud Scheduler; Secret Manager.

## Impact

Survey data lands in BigQuery on a schedule with consistent types, without depending on a laptop staying on, and without credentials in source.

This case study contains no source, repository links, credentials, hostnames, vendor names, or project identifiers.
