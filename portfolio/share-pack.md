# Share pack — send this

Copy everything inside the fenced block for outreach. Replace placeholders before any real send. Do **not** attach `.env`, keys, client extracts, or private repository links.

---

```markdown
Subject / opener: One-person data team — warehouse -> dashboard -> AI tooling

Hi <NAME>,

I build the layer between raw systems and decisions: BigQuery models, Tableau, and light AI/automation. Quick proof pack (under 5 minutes):

1) **Looms**
   - Monitoring (Tableau + SQL -> Slack alerts): <LOOM_MONITORING_URL>
   - AMI portal (sanitized demo walkthrough, demo data only): <LOOM_MARKET_RESEARCH_URL>

2) **Flagship GitHub — Ops KPI cost & quality (sample retail/ops -> BigQuery -> transform -> Tableau Public -> freshness monitor)**
   - https://github.com/Gnik014/portfolio-russel-enriquez
   - Live site: https://gnik014.github.io/portfolio-russel-enriquez/
   - README walks problem -> architecture -> stack -> outcome (partitioned fact table cut a Q1 query from 646,869 bytes scanned to 27,820; 2026-11-06 freshness run 4/4 ok)

3) **Tableau Public**
   - Profile: https://public.tableau.com/app/profile/russel.king.enriquez7984/vizzes
   - Flagship workbook: <TABLEAU_PUBLIC_WORKBOOK_URL>

4) **Company work (private, case studies)**
   - Employer: KMC MAG Solutions (client: AMI). I contribute to the AMI portal (TypeScript/React digital reports), a Node/BigQuery MCP query layer (broker-survey, regulatory, and legal-sector survey datasets), and an internal pipeline-health / media / truth-comparison monitor.
   - Related case studies also cover an ad/newsletter email capture pipeline, a media-mention RSS pipeline into BigQuery, analytics-engineering data pipelines, Tableau Cloud site administration, and a short “How I build at AMI” workflow note (GitHub flow, Actions, AgentOS specs, LangChain/LangSmith, Cloud Run).
   - Private repos are not shared. Anonymized case studies can be sent on request. No client or brand names, source, or internal URLs.

5) **Side project (not the headline):** Skyward Tower ? a Unity 6 3D action climber I built solo with AI pair programming. Short note: https://gnik014.github.io/portfolio-russel-enriquez/side-projects/skyward-tower.html (unreleased; no public repo).

6) **Outcome language**
   - Same pattern I use professionally: reliable warehouse refresh, decision-ready BI, and tooling that cuts repetitive analysis work.
   - Flagship cost/bytes and freshness are in the README. On AMI Monitor, overnight capture triage dropped from 1-2 days of work to an hour at most, usually about 30 minutes.
   - Other measured figures: <METRICS_BANK>

Thanks,
Russel King Enriquez
Data Analyst · AI Automation · AI Development
kingenriquez01@gmail.com · General Trias, Cavite, PH
```

---

## Company work (private, case studies)

These notes can be attached or quoted in outreach. They are not public product repositories.

| Case study | File | One-line |
|---|---|---|
| AMI portal | `portfolio/company-work/ami.md` | Production digital-report widgets, PDF export fidelity, and chart editor work on a TypeScript/React portal |
| Query MCP server | `portfolio/company-work/thesus-mcp.md` | Production BigQuery KPI, all-lenders comments, and regulatory query work on a Node MCP server |
| AMI Monitor | `portfolio/company-work/ami-monitor.md` | Pipeline health, paywalled media review, and truth comparison on an internal TypeScript audit tool |
| Ad / newsletter email capture | `portfolio/company-work/admonitor-email.md` | Publisher-aware capture, verification retries, brand-match shadow path, and keep-warm scheduling |
| Media-mention RSS pipeline | `portfolio/company-work/rss-media-mentions.md` | RSS and Google Alerts into BigQuery, brand tracking, a Windows feed app, and a mention dashboard |
| How I build at AMI | `portfolio/company-work/how-i-build.md` | Branch-to-staging-to-production workflow with Actions, Husky, AgentOS, and Cloud Run |
| Tableau Cloud site admin | `portfolio/company-work/tableau-site-admin.md` | Structured workbook library, archives, source transitions, and Tableau-vs-query-layer checks |
| Data pipelines | `portfolio/company-work/data-pipelines.md` | dbt-style layered BigQuery SQL, a survey-platform-to-warehouse pipeline, quality fixes, and rollback-safe deploys |
| Skyward Tower (personal side project) | `portfolio/side-projects/skyward-tower.md` | Solo Unity 6 3D action climber with a toy-diorama look; only the later v1.1.0 balance plan is still in the design phase |

Do not send source or repo URLs. Employer line in every case study: **KMC MAG Solutions (client: AMI)**.

## Placeholder checklist

| Placeholder | Status |
|---|---|
| `<LOOM_MONITORING_URL>` | Coming soon |
| `<LOOM_MARKET_RESEARCH_URL>` | Coming soon (sanitized AMI portal demo) |
| `<GITHUB_FLAGSHIP_URL>` | https://github.com/Gnik014/portfolio-russel-enriquez |
| `<TABLEAU_PUBLIC_WORKBOOK_URL>` | Coming soon (no workbook published yet) |
| `<METRICS_BANK>` | Optional extras; flagship scan bytes, freshness, and AMI Monitor triage time may be used |
