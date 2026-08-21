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
