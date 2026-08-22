# PROGRESS-LOG

Append-only control-session log. One entry per session.

## 2026-08-21 — Mode C (Planning) · model Sonnet 4.6

**Session:** first control session on this repo.

- Skills-staleness check: `claude-dev-skills` at `origin/main` (0 behind).
- Task Console launched on http://localhost:3999 with `CONSOLE_REPO_ROOT` = this repo
  (Planner-coupled lifetime — it goes down when this session ends).
- **Bootstrapped the task substrate** (`3d7352a`): this repo had none. Added
  `clone.config.json`, `tasks/` + `schema.json` + README, `tasks/proposals/`,
  `reports/`, and the `tasks` / `proposals` / `console` npm scripts.
  Note: the QCF copy of the `console` script points at `$HOME/PROJECTS/...`, which
  does not exist on this machine; this repo's resolves through the `~/.claude/skills`
  symlink instead.
- **Allocated T1–T11** (`0b46f48`) — the 11 `In Progress` `[RF]` Defect tickets
  assigned to eugeniu.cozac, from the Linear project "Migrate 1ST/RF/QCF to the new
  tech stack". Bodies verbatim from the tickets; acceptance criteria from each
  ticket's own Definition of Done.

**Standing routing decision (recorded so it is not re-litigated):** this repo has
**no clone engine** — no `walk-dom-cdp.ts` / `emit-block.ts` / `verify-clone.ts`, zero
`*Clone` blocks. Every block is hand-authored, so the engine-first rule has nothing to
diagnose into and these defects are direct fixes in the block that has the defect.
Hence `bug`-tagged → **Mode X**, shipped via `clone-pull-request-create` with
per-breakpoint proof, landing `awaiting-user` for the USER to merge. This is not a
fidelity loophole; it is the absence of an engine.

**Ratio guard:** machinery (engine/tooling/process) : live-page work = **0 : 10**
(+1 spike). No machinery imbalance.

**Open for the user:**
- CORE-6962 leaves one question open (does Live's package ⓘ persist on desktop click,
  or is it hover-only?). Encoded as T6 AC1/AC2 — measure on live headed, then match —
  so the task is not blocked, but the answer decides whether any desktop-click code
  change happens at all.
- T3 (CORE-7027) and T9 (CORE-7013) look like CMS/media fixes (masters uploaded below
  display size), not code changes. Confirm before editing code.
- **Not yet ingested:** 45 `Todo` + 1 `Backlog` `[RF]` Defect tickets (46). Several are
  the *class* of tickets already allocated here — notably CORE-6965 ("SITEWIDE: content
  images served under-resolution") which likely subsumes T9/T3 and CORE-7133. Needs a
  class-collapse decision at allocation time rather than 46 parallel tasks.

## 2026-08-21 — Mode X (Automation · Bug-Fixing) · model Sonnet 4.6

Session start: control mode **X**, model **Sonnet 4.6**. Skills clone 0 commits behind origin/main.
Machine role `local-integrator`; Console UP on :3999 → all lanes spawned as Console `W · Worker`
sessions (never Agent subagents). Mode X **never merges** — every task ships as a USER-merged PR.

Task set at start: T1–T11 all `backlog` (11 tasks, allocated by the Mode C bootstrap).
Eligible = backlog + deps satisfied + tagged `bug`. Out of scope this mode: **T11** (`spike`, not `bug`).
Dep-blocked: T2←T1, T3←T2, T5←T4.

**Round 1 — 5 lanes dispatched (= the ≤5 parallel-lane cap), priority order ‼️/🔺 first:**

| Lane | Task | Pri | Area (ownership) | Branch | Port | Worker session |
|---|---|---|---|---|---|---|
| L1 | T4 CORE-7119 | 🔺 | shared richtext `strong`/`b` colour | `fix/core-7119-bold-body-text` | 3001 | 06f94dc4 |
| L2 | T6 CORE-6962 | 🔺 | pkg ⓘ + bank-partner popups/modal | `fix/core-6962-package-bank-popups` | 3002 | 48329f54 |
| L3 | T7 CORE-6995 | 🔺 | Header top-bar logo links/stacking | `fix/core-6995-topbar-logo-links` | 3003 | fbecc67e |
| L4 | T1 CORE-7009 | — | reviews widget star sizing (unblocks T2→T3) | `fix/core-7009-review-star-size` | 3004 | 4c5b43c6 |
| L5 | T8 CORE-7018 | — | FAQ accordion heading level h3→h4 | `fix/core-7018-faq-heading-level` | 3005 | c99cfc6c |

**Held (file-conflict / deps / scope), next-eligible in this order:**
- **T9** CORE-7013 (FAQ banner resolution) — fully disjoint, first into the next free slot.
- **T10** CORE-7000 (BEST VALUE ribbon shadow) — same packages block as T6 → serialized behind L2.
- **T2** ← T1, **T3** ← T2 (same reviews widget), **T5** ← T4 (same richtext layer).
- **T11** — `spike`, out of Mode X scope; needs Planning/user, not a bug lane.

**Repo adaptations recorded (this repo lacks the 1stformations pipeline `scripts/`):**
- No `scripts/setup-worktree.sh` → worktrees created by hand (`git worktree add` + symlinked
  `node_modules` + copied `.env`) at `../rf-t{1,4,6,7,8}`.
- No `scripts/gen-field11-from-heartbeat.ts` → lanes derive field 11 mechanically from their own
  HH:MM:SS HEARTBEAT spans; estimating is explicitly forbidden in the prompt.
- No `scripts/check-task-complete.sh` → the enforced gate is `clone-task-qa-permission-to-finish`
  plus the state-machine's `submit-pr` rail.
- Step 2f coord gate IS satisfiable: `qa-coord-live.ts` exists in `clone-live-page-to-payload`.
  Breakpoints are Erin's **360/768/1024/1800** (not 390/768/1440/1800) per the acceptance criteria.
- `clone-pull-request-create` doc hardcodes 1stformations/QCF URLs → prompts override the LIVE
  source of truth to `https://www.rapidformations.co.uk/<slug>`.
- No `.claude/qa-bg-waivers.json` in this repo — lanes run the coord gate without it.

### Round 1 ABORTED — account 5-hour usage limit (16:54 BST)

All five lanes were **rejected at spawn** by the account quota, not stalled. Console session events
show `rate_limit_event` → `five_hour` utilization **0.99 → rejected**
(`overageStatus: rejected`, `overageDisabledReason: org_level_disabled`), then
`"You've hit your session limit · resets 7pm (Europe/London)"`. Each lane ran 37–54s, got through
repo orientation, and died mid-first-turn.

| Lane | Turn | Cost | Work committed |
|---|---|---|---|
| T4 | 0.4s | $1.56 | none |
| T6 | 52s | $0.94 | none |
| T7 | 37s | $0.76 | none |
| T1 | 54s | $0.82 | none |
| T8 | 43s | $0.79 | 1 uncommitted edit — `src/components/shared/Collapsible/Collapsible.tsx` (left in the worktree) |

Total burn ~**$4.87** for zero delivered work.

**Wind-down applied:** 5 × `CONTROL … WATCHDOG` heartbeat lines appended; all five tasks re-queued
`running → backlog` via `restart-from-scratch` with the reason recorded. Worktrees and branches at
`../rf-t{1,4,6,7,8}` are **preserved** for re-dispatch. The five Console `W` sessions are `idle`
(not exited), holding 86–105k tokens of repo orientation each — if they survive to the reset they can
be relayed instead of re-spawned, saving that re-read.

**Lesson (for the next control session — this is the durable fix, not a prompt tweak):**
⛔ **Check the account quota BEFORE dispatching a fan-out.** The Budget wind-down rule in
`mode-b-automation.md` says stop dispatching near ~93% — this session dispatched at **99%** because it
never checked. The in-session signal exists and is cheap to read: a `rate_limit_event` with
`status: allowed_warning` + `utilization` appears in the Console session event stream, and `/usage`
shows it directly. A five-lane fan-out is the *most* expensive thing this mode does; it is the worst
possible thing to start on a nearly-spent quota. Next session: read the quota first, and if it is
over ~90%, dispatch **one** lane or nothing at all.

**Next action (post-19:00 BST reset):** re-dispatch the same five lanes (T4/T6/T7/T1/T8) — either by
relaying the idle Console workers or by re-spawning against the existing worktrees. Held queue is
unchanged: T9 next-free-slot, T10 behind T6, T2←T1, T3←T2, T5←T4, T11 out of Mode X scope.

### Resume plan (USER directive: fewer lanes on resume)

Armed a one-shot in-session wake-up for **19:07 BST** (job `322640e0`) that will:
1. **Check the quota FIRST** — if still near the ceiling, dispatch one lane or nothing, and report.
2. Resume **three lanes only** — the 🔺 priority set **T4 / T6 / T7**. T1, T8, T9, T10 stay in
   backlog this round; T2←T1, T3←T2, T5←T4 remain dep-blocked; T11 stays out of Mode X scope.
3. **Prefer relay over re-spawn** — the idle W workers (T4 `06f94dc4`, T6 `48329f54`, T7 `fbecc67e`)
   hold 86–105k tokens of orientation already paid for; re-spawn only a session that has died, using
   the saved lane prompts in the session scratchpad.
4. Set each task `running` via the rails with the real owner-session id, then push task state.
5. Run the normal round loop + 20-min heartbeat watchdog. Mode X still **never merges**.

⛔ **The wake-up is SESSION-ONLY** — it lives in this control session's memory and dies with it. If
this session is closed before 19:07, nothing self-resumes (the documented plain-session limitation);
the operator must relaunch Mode X manually, and the task set + this log carry everything needed.

### Round 1 RESUMED 17:07 BST — reduced to 3 lanes (USER: different account, fresh quota)

The blocker was account-level, not time-based: the session moved to a **different account**, so the
19:00 reset was moot. Resumed early and cancelled the 19:07 wake-up (`322640e0`).

All five Console `W` workers survived the ~70-minute idle with contexts intact (86–112k tokens), so
every resumed lane went the **relay** route — no re-spawn, no re-paid orientation. T4 was relayed
first as the lead lane and confirmed `running` (no rejection) before T6/T7 followed.

| Lane | Task | Session | Delivery | Status |
|---|---|---|---|---|
| L1 | T4 CORE-7119 | 06f94dc4 | relayed | running |
| L2 | T6 CORE-6962 | 48329f54 | relayed | running |
| L3 | T7 CORE-6995 | fbecc67e | relayed | running |

**Held back this round (USER directive — fewer lanes so a partly-recovered quota isn't spent at once):**
T1 (`4c5b43c6`) and T8 (`c99cfc6c`) stay **idle with context preserved** and their tasks in `backlog`
— they can be relayed into the next free slot without re-spawning. T9/T10 unchanged in the held queue;
T2←T1, T3←T2, T5←T4 dep-blocked; T11 out of Mode X scope.

Watchdog armed (`bg8dfwbkn`): polls every 120s for new 🚧BLOCKED/❓DECISION lines, a lane turn ending,
HEARTBEAT staleness >20 min, and any task reaching `awaiting-user`/`needs-manual`.

### Round 1 CLOSED 05:11 (2026-08-22) — 3 branches pushed, 0 PRs, lanes context-exhausted

**Outcome: the fixes exist and are pushed; none reached a gate or a PR.** After ~12h wall-clock and
**$38.53**, every lane ran past its context window and stopped. Sessions stopped; tasks `deferred`
with their branch SHAs so a fresh lane can finish cheaply.

| Task | Branch @ SHA | Fix landed | Outstanding |
|---|---|---|---|
| T4 | `fix/core-7119-bold-body-text@ff0bb84` | shared `.payload-richtext strong` rule in `globals.css` | coord-live, QA, PR |
| T6 | `fix/core-6962-package-bank-popups@826fb25` | InfoTooltip ×2 + PackageCard (**control rescue commit**) | headed-browser confirm of live desktop click, coord-live, QA, PR |
| T7 | `fix/core-6995-topbar-logo-links@c4447af` | LandingHero top-bar anchors | **shared-scope question unanswered**, coord-live, QA, PR |

**What actually went wrong — three distinct causes, only one of them the lanes' fault:**

1. **Dispatched at 99% quota** (control error, ~$4.87). Fixed forward: check quota before any fan-out.
2. **Machine-wide network outage 17:31–18:30** — `ERR_NETWORK_CHANGED`, `EADDRNOTAVAIL`, mongo
   `ENOTFOUND`, API retry to attempt 7/10, then repeated "Connection closed mid-response" for hours.
   Environmental. Cost most of the wall-clock and forced repeated gate retries.
3. **Context exhaustion — the structural failure.** Lanes ended at 268k / 256k / 197k against a 200k
   limit. The Mode X worker contract is simply too heavy for one context: read the full ticket, repro
   at 4 breakpoints, fix, verify across many shared pages, run a whole-block coord sweep at 4
   breakpoints, run an inline QA subagent, then open a screenshot PR. Screenshot-heavy verification
   burns context fastest, and the gates come LAST — so a lane reliably dies before shipping.

**⛔ LESSON — split the worker contract in two (durable fix, not a prompt tweak).**
A single lane should FIX and PUSH only, then stop. Gating + PR belongs to a SECOND, fresh lane that
starts with a clean context and reads the branch diff. Evidence: all three lanes produced correct-looking
fixes well inside their budget (T7 by 17:18, ~25 min) and then spent 10+ hours failing to get through
the gates. The gate work is cheap from a clean context and impossible from a spent one.

**Also observed:** worker HEARTBEAT timestamps ran +1h against `date` on this machine, so field-11
timings from this round are not trustworthy. Worth pinning the clock source before the next round.

**Next action:** three fresh short-lived lanes, one per pushed branch — run coord-live + QA + PR only.
No re-fixing. T7's lane must first answer whether the top-bar cluster renders outside LandingHero.
