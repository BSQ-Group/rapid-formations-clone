# CORE-7108 — SITEWIDE body base font (clone Inter 16px/24px vs live Myriad)

**Verdict: true in the source, zero user-visible consequence. Not a rendering defect. No code written.**

## The premise is literally correct

| element | live | clone |
|---|---|---|
| `<body>` computed `font-family` | `myriad-pro-semi-condensed, verdana-fallback, Geneva, Tahoma, sans-serif` | `Inter, "Inter Fallback"` |
| `<body>` size / line-height | **18px / 27px** | **16px / 24px** |

Confirmed in source: `globals.css` sets no `font-family` on `html` or `body`; Tailwind's base supplies
Inter. Myriad is applied **opt-in per element** by `.font-legacy-condensed`
(`globals.css:626-630`), which resolves
`'myriad-pro-semi-condensed', var(--font-legacy-condensed), var(--font-inter), sans-serif`
and appears **76 times across 74 source files**.

The face genuinely resolves. Canvas fingerprinting against 11 candidate families at the element's own
size and weight: live `<body>` renders 468.79px for a fixed sample string, and
`myriad-pro-semi-condensed` measures **468.79px exactly** — every other candidate is 22-214px away.

## But nothing inherits it

Every visible text-bearing element outside header/footer/nav, grouped by resolved family:

| page | width | elements | chars | Myriad | Inter |
|---|---|---|---|---|---|
| live `/` | 1440 | 261 | 18,582 | **100.0%** | 0 |
| clone `/` | 1440 | 262 | 19,045 | **100.0%** | 0 |
| live `/` | 360 | 260 | 18,572 | **100.0%** | 0 |
| clone `/` | 360 | 261 | 19,035 | **100.0%** | 0 |
| clone `/privacy-policy` | 1440 | 326 | 32,151 | **100.0%** | 0 |
| clone `/id-requirements` | 1440 | 27 | 2,717 | **100.0%** | 0 |
| clone `/site-map` | 1440 | 85 | 1,477 | **100.0%** | 0 |
| clone `/a-z-glossary-of-terms` | 1440 | 176 | 17,818 | **100.0%** | 0 |

Rich-text-heavy pages were chosen deliberately, as the likeliest place for a missed opt-in. There is none.
Not one character of visible copy renders in Inter on either site.

Size distributions match too. Both sites at 1440 report the identical spread
(`50px/57.5px x1, 20px/30px x33, 21px/31.5px x5, 22.8px/28.158px x1, ...`), and the two shared homepage
headings measured by their text are identical:

| heading | live | clone |
|---|---|---|
| "Successful businesses start here" | H2 36px/44.46px w400 | H2 36px/44.46px w400 |
| "Our business banking partners" | H2 36px/44.46px w400 | H2 36px/44.46px w400 |

So the `16px/24px` in the ticket title is the computed style of an element whose typography **no user ever
sees**. The measurable consequence in rendered text is nil.

## Not a licensing matter

Myriad Pro **is already licensed and wired up**. `layout.tsx` injects the Adobe Typekit kit gated on
`NEXT_PUBLIC_ADOBE_FONT_PROJECT_ID`, set to `wrj3hpa` in `.env` and commented "Adobe Fonts kit carrying
Myriad Pro Semi Condensed, the legacy Rapid...". The local build emits the Typekit `<link>` (2 matches in
the served HTML). No procurement decision is needed.

## The real risk, which is already documented

`.claude/QCF_GOTCHAS.md` records an actual production incident on this exact variable: it was absent in
Vercel, so `layout.tsx`'s `{adobeFontProjectId && (...)}` never emitted the Typekit `<link>`, and **every
`.font-legacy-condensed` element on the deployed site fell back to Inter — the whole site in the wrong
typeface, with a green build.** `NEXT_PUBLIC_*` is inlined at build time, so adding the variable is not
enough; the project must be **redeployed**.

That is the failure mode the ticket is probably reaching for, and it is a deployment-config concern rather
than a code defect. The gotchas file already carries the detection recipe:

```bash
curl -s <deployed-url>/ | grep -c typekit   # 0 means the variable never reached the build
```

I could not run that against the deployment: `rapid-formations-clone.vercel.app` sits behind the Vercel
SSO wall and answers HTTP 200 with a login page. **Someone with access should confirm the deployed HTML
still contains the Typekit link** — that check is worth more than any change to this code.

## Why I did not "fix" the base declaration

Adding `font-family: <myriad stack>` to `body` would make the base faithful to live, and is provably
zero-visual-change today (100% opt-in coverage, measured above). But it fixes nothing real:

- It does **not** mitigate the env-var hazard. If Typekit fails to load, Myriad is unavailable wherever it
  is declared.
- It would only change what the site falls back **to**. Live falls back to
  `verdana-fallback, Geneva, Tahoma, sans-serif`; the clone falls back to Encode Sans, then Inter.
  Encode Sans is a **closer metric match** to Myriad Pro Semi Condensed than Verdana is, so copying live's
  chain would arguably make degraded rendering *worse*, not better.

A sitewide base-typography declaration is the highest-blast-radius change available in this repo, and the
case for it here is aesthetic tidiness against a real regression risk. Not worth it on my own judgement.

## Recommended disposition

1. **Close CORE-7108, or re-scope it** off "SITEWIDE ... clone is Inter" — no rendered text is Inter.
2. **Raise a deployment-config check instead**: assert the Typekit `<link>` is present in the deployed
   HTML, ideally as a CI/post-deploy assertion so the documented incident cannot silently recur.
3. If the base declaration is still wanted for tidiness, treat it as a deliberate typography decision with
   its own review — including which fallback chain is preferred — not as a bug fix.

## Correction: the 305-vs-320 observation was an artefact

An earlier draft of this report logged "at 360 the shared `<h2>` box is 305px on live vs 320px on the
clone" as a container-width difference. **That was wrong.** My live probes ran **headed** and my clone
probes **headless**; headed Chrome paints a classic 15px scrollbar that reduces content width, headless
uses overlay scrollbars and does not. Every live-vs-clone width comparison was off by one scrollbar.

Proven by holding the page and viewport fixed and varying only the browser mode (measured on the FAQ
quick-nav panel, `/faqs/directors` @360):

| | panel width |
|---|---|
| live **headed** | 305 |
| live **headless** | **320** |
| clone **headless** | 320 |
| clone **headed** | **305** |

With modes matched the two sites agree exactly, so there is **no** container-width or gutter defect.

This does not affect any conclusion above. Every font verdict rests on fixed-pixel values — computed
`font-family`, `font-size`, `line-height`, `font-weight`, `color` — and on character counts, all of which
read identically in either mode. Only widths and quantities derived from widths were contaminated.

**Method note for future work on this repo: run both sites in the SAME browser mode.** Headless works for
live too, Cookiebot included. A sibling investigation (CORE-7112) hit the same trap and described it as
faking "a 15px content-width gap below 1023 and a 7.5px left-offset at 1440".
