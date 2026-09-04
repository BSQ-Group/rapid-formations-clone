## 2026-09-04 · Planning (Mode C) · model: Opus 4.8 (user-selected, approval-gated)

Repo: `rapid-formations-clone`. Task Console already up on :3999 (pid 87873, served
from the `bsqgroup/claude-dev-skills` checkout — the *symlinked* `~/.claude/claude-dev-skills`
checkout is 13 commits behind and has no `clone-control-center/console/app`, so a
launch from there fails with ENOENT; do not double-launch).

**Headline: the board was split in two and the pass initially reconciled the wrong half.**
`rapid-formations-clone/tasks/` (36 rows, in-repo, pre-cutover) and
`rapid-formations-clone-task-state/tasks/` (11 rows, the live substrate) both looked
live and both used ids `T1`–`T11` for different tickets. `task-state-root.ts` has no
in-repo fallback, so only the latter is authoritative. Six voids + a proposal drain
landed on the legacy set before this surfaced; they were discarded uncommitted and
redone against the live board.

Actions (all on `task-state`, commits `cdf3979` + `5ca1a72`):
- Voided 6 rows as ALREADY SHIPPED (PRs #186/#187/#188/#194/#195/#201, all by another
  dev, all at Ready for QA in Linear): T2 T3 T4 T5 T10 T11.
- Enriched 5 thin Console stubs with the retired set's investigation findings: T6
  (narrowed to its CMS-media half), T7, T8 (QA-Fail rounds), T9, T11.
- Imported 16 tickets open+assigned at Todo in Linear with no board row → T12–T27.
- Migrated 2 defects that existed only in the legacy set with no Linear ticket → T28
  (FAQ banner missing on 2 `/faqs/` pages), T29 (hero → first-content 45px drift, 17
  pages). Both tagged `needs-linear-ticket`.
- Legacy set archived on branch `chore/retire-legacy-task-set` (needs a PR; Planning
  never merges).

Board after: **23 backlog, all live-page work, 0 machinery** (ratio guard healthy).

### Open items for the next pass
- `chore/retire-legacy-task-set` needs a PR + merge to land the archive on `main`.
- `claude-dev-skills` is 13 commits behind `origin/main` — `/bsq-dev-skills-pull` +
  restart to adopt current skills.
- Tooling defect: `taskRefsTicket` (ingest-qa-fails / import dedup) substring-matches a
  ticket id across every task title+body, so a mere cross-reference in one task's body
  makes dedup report another ticket as "already tracked". It falsely skipped CORE-7340
  here. Worth a real defect-class fix (match a ticket-id *field*, not free text).
- `CORE-7139`'s QA-Fail label is stale — the redo shipped as PR #214 on 2026-09-02. No
  task allocated; the label wants clearing in Linear.
- Untracked `c7332d.mjs` (a Playwright live-vs-clone probe) appeared in the main
  checkout at 10:16 during this pass and was not written by this session — another
  session may have been active.
