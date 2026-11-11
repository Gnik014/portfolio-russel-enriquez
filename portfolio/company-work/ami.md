# AMI portal — company case study

**Employer:** KMC MAG Solutions (client: AMI)  
**Role in this work:** Data Analyst / engineer contributing to the client-facing reporting portal  
**Visibility:** Private product. This page is a case study only — no repository, demo URL, or source is shared.

The AMI portal is a TypeScript/React application that lets market-intelligence clients build digital reports: widgets, charts, and PDF export of survey and research findings for major Australian lenders / clients.

---

## Problem

Client reports had to look as polished in a live presentation and a PDF as they did in the editor. Several report types still depended on Tableau-style layouts (lender crosstabs, level-of-service stars, market-wide broker comments) that the portal could not yet reproduce faithfully. Editors also needed per-page written analysis and control over what appeared in the export, without those choices breaking layout, typography, or filters.

## What I built

I did not build the portal from scratch. My work focused on digital-report authoring, chart widgets, and PDF-export quality. These widgets and PDF fixes are in production.

- **New report widgets.** A lender-crosstab block that lists every lender in grouped categories with period columns and a grand-total row, rendered from the normal multi-brand KPI response so view, present, share, and PDF all use the same data path. A star-rating block that bands a percentage service metric into a five-star scale, plus making that chart type available in the editor (not only via the agent/API).
- **Market-wide comment themes.** A “General (all lenders)” feedback focus so broker comment widgets can show market-wide themes instead of a single primary brand, including title handling so the card does not still name one lender.
- **Per-page analysis.** An Analysis section under each report page (generated from that page’s chart data, then editable), plus a switch to hide the box in view, present, share links, and PDF without deleting the stored text.
- **PDF and presentation fidelity.** JPEG as well as PNG artwork pages (upload, placement, and wait-for-load in export); even side margins on scaled slides; consistent Analysis typography after per-page scale-to-fit; pairing of leftover half- and third-width tiles so they sit side by side the way the editor does; crosstab header separators that still print in PDF.
- **Chart editor controls.** Custom drag-to-reorder sort for bar and star-rating charts; a scale-axis toggle that is reachable from widget options; data-label modes including “primary brand at every period”; area-chart labels on comparison series (not only the primary); scatter-matrix “general” label sizing; stacked facet defaults and PDF spacing; competitor colour fallback when the viewer’s competitive set does not overlap the chart; periods restored on the axis for multi-brand KPI trend bars (with an opt-in to group by brand); regulatory Top N ranking controls scoped to the regulatory dataset, and series labelled when the query layer returns identifiers instead of names.
- **Correct data into notes and tooltips.** Server-side expansion of brand presets before KPI fetches, so analyst notes and report coverage see the full lender list rather than only the primary brand plus averages. Segment-breakdown bars routed to the segment transformer. General-population denominators shown in tooltips. HTML stripped from chart callouts so interpretation text does not render as markup.

I used AI pair programming with Cursor and Claude on this work.

## Stack

TypeScript, React, and the portal’s existing chart/widget design system; digital-report view/present/PDF export (Chromium print path); JSON display options and widget query contracts; integration with the company’s MCP/KPI query layer for multi-brand and regulatory queries.

## Impact

These production changes let report editors ship Tableau-like lender tables, service-star charts, market-wide comments, and per-page analysis as first-class portal pages. Export quality improved: artwork that used to go missing now loads, slide margins stay even, header separators print, and typography no longer shrinks unevenly from page to page. Analyst notes that previously covered only the primary brand now include the full lender preset.

This case study contains no source, repository links, credentials, hostnames, or project identifiers.
