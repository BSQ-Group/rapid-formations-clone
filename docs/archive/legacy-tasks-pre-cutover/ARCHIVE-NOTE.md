# ARCHIVED — the pre-cutover in-repo task set

**This directory is dead. Nothing reads it. Do not add to it, and do not work any
row in it.**

It is the task board as it stood *before* the task-state-branch cutover. Task state
now lives on the **`task-state` branch**, in a worktree that the tooling discovers
from git with no configuration:

```bash
bun run tasks       # reads <task-state worktree>/tasks — never this directory
```

`task-state-root.ts` resolves the task root to the `task-state` worktree and has
**no in-repo fallback by design** — "task state must NEVER be written to the
protected release branch". So from the moment the `task-state` branch existed, this
directory stopped being authoritative, while still *looking* live: the two sets even
reused the ids `T1`–`T11` for entirely different tickets.

## Why it is archived rather than deleted

The 36 rows here carry investigation write-ups that are still worth reading — in
particular the verification verdicts whose reports remain on `main` under
[`reports/`](../../../reports/):

| Row | Verdict | Report |
|---|---|---|
| `T11` | "Helpful guides" feed is **dynamic** (WordPress REST, `revalidate: 3600`) → CORE-6966 closes by-design | `reports/T11-spike.md` |
| `T19` | CORE-7041 does **not reproduce** — FAQ trigger row pixel-identical at 8 widths | `reports/T19-verification.md` |
| `T25` | CORE-6999's premise is **materially wrong** — 8 legal/policy pages, not SHARED; looser below 1440; the fix is CMS data, not code | `reports/T25-CORE-6999-verification.md` |
| `T31` | CORE-6965 is **not a code defect** — 0/86 under-resolution images were next/image under-requesting; 9 CMS assets are the real regression | — |
| `T33` | CORE-7130 **not reproducible at any width** — 22 pages × 7 breakpoints, max delta 0.01px | — |
| `T35` | CORE-7108 true at `<body>` but **nothing inherits it** — no rendered text is Inter on either site | `reports/T35-CORE-7108-verification.md` |

The parts of those findings that still gate open work were carried forward onto the
live board on 2026-09-04 (see the `task-state` commit "control: sync RF board to
Linear"), including two defects that existed **only** here and had no Linear ticket:
the FAQ banner missing on `/faqs/limited-by-guarantee/` + `/faqs/limited-by-shares/`,
and the hero → first-content 45px drift across 17 pages.

Everything else in here was either shipped by another dev via PR, resolved as a
verdict, or superseded. Nothing is outstanding.
