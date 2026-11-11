# Ad and newsletter email capture pipeline — company case study

**Employer:** KMC MAG Solutions (client: AMI)  
**Role in this work:** Data Analyst / engineer on the email capture and brand-matching pipeline  
**Visibility:** Private product. This page is a case study only — no repository, demo URL, or source is shared.

This pipeline captures advertising and newsletter emails, classifies them, detects ads, and matches advertisers to a brand registry in BigQuery so AMI reporting stays complete and consistent.

---

## Problem

Overnight email capture could miss publisher sends, drop batches, or stall later stages. Brand matching often left events, industry bodies, and other non-brands in a permanent “needs review” state, which then failed health checks. A cold Cloud Run instance could shut down while capture was still writing, which looked like a blank capture day with no obvious cause.

## What I built

I did not create the email pipeline from scratch. My work, from late 2025 into 2026, focused on capture quality, verification reliability, safer brand matching, and operational keep-warm:

- **Publisher-aware Capture.** Selection prefers allowlisted publishers and older uncaptured mail, instead of simply taking the most recently arrived messages. Leftover senders can be stored as metadata-only discovery rows so domain review still sees real sending domains. Duplicate newsletter copies are dropped, and calendar-day filters are applied before caps.
- **Readable newsletter screenshots.** First-pass newsletter screenshots are sliced so advertiser names stay legible for detection, rather than shrinking a full page into one unreadable image.
- **Verification retries and queue ordering.** Verification uses stage-specific retry timestamps, harder retry behaviour, and stricter queue ordering so later stages do not run ahead of a ready verify step. Related reliability work included resolving HTML before shadow verification, atomic verification status, and retries on transient crop-API failures.
- **Brand Match shadow pipeline and not-a-brand rules.** An isolated shadow brand-matching path lets a new matcher run without blocking production. Reviews can now mark events, industry bodies, and non-financial sponsors as a terminal “not a brand” outcome instead of leaving them in review forever (publishers can still stay in review when they may be registry brands). I also fixed text-only and zero-ad queue blockages, advertiser backfill, logo-reference matching, and alias resolution.
- **Keep-warm schedulers and failure alerting.** Cloud Scheduler jobs raise a minimum instance floor over the overnight capture window in Australia/Sydney, then release it afterward, so background capture is not treated as idle and stopped mid-batch. Job failures raise an alert, because a silent scale-up miss reproduces the same outage. Deploy guidance records that a deploy must not overwrite that floor during the keep-warm window.
- **Pipeline summary email.** The morning summary reports whether the overnight keep-warm floor actually held, so a blank capture day can be traced to a scaling miss rather than looking like “no emails.” The email still sends if that lookup fails, and says so.

I used AI pair programming with Cursor and Claude on this work.

## Stack

Node.js (ES modules) on Cloud Run; IMAP and Gmail API for capture; BigQuery and Cloud Storage for results; Cloud Scheduler for pipeline and keep-warm jobs; LLM-assisted classification and brand review; Cloud Build for deploys.

## Impact

Capture is less likely to skip publisher mail or lose a morning batch. Advertiser review no longer piles up non-brands that fail nightly health. Operators get a summary that explains keep-warm and pipeline health, and verification and brand-match queues recover instead of stalling.

This case study contains no source, repository links, credentials, hostnames, or project identifiers.
