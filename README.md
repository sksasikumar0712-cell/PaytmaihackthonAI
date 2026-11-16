# Paytm careers + hackathons | productwithsasi

A mobile-first, static directory built in the same design language as [productwithsasi's SurveySparrow jobs page](https://github.com/Sasisampath/surveysparrow): white background, LinkedIn blue, compact responsive cards, search, pill filters and a fixed follow CTA.

**Snapshot:** 16 November 2026. Independent directory; not affiliated with Paytm or organisers.

## What's inside

- 16 curated Paytm job postings across Chennai and Bangalore/Bengaluru, with searchable job cards, city chips, department information and official job/board links.
- 5 upcoming hackathons, challenges and tech conferences, categorised accurately, with dates, locations and registration links.
- Special warning for Markathon's conflicting organiser deadlines.
- Accessible search and filters, small-screen layout and social preview image.
- No frameworks, paid dependencies or build system.

## Preview

```bash
python3 -m http.server 5600
```

Open http://localhost:5600.

## Deploy to Vercel

Import `Sasisampath/paytm-hackathon-reel` into Vercel. Framework preset: **Other**. Build command: **none**. Output directory: repository root (or leave default for a static project).

## Update content

- Edit `jobs.js` for job cards. Use `linkType: 'direct'` for verified individual jobs and `linkType: 'board'` for city-filtered listings. A listing may appear in more than one city.
- Edit `events.js` to change registration links, event types and dates.
- Update the **curation date** in `index.html`, `script.js`, `README.md` and `SOURCES.md` whenever you actually verify the lists again. Do not label a static list as a live feed.

## Data disclaimer

The Paytm listings and hackathon dates are **not live**. Roles may close and event deadlines may change. The employer or organiser page is always authoritative. In particular, the Markathon event page shows contradictory deadlines and should be checked before making any payment.

The Groww and IBM listings are tech conferences, not hackathons, so they are clearly labelled as tech events.

See [SOURCES.md](SOURCES.md) for source links.