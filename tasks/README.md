# `tasks/` — the typed task board

Every clone-pipeline task is one strictly-typed JSON file here: `tasks/T####.json`.
Proposals (the cross-session handoff queue) live at `tasks/proposals/P####.json` —
same shape, `kind: 'proposal'`.

- **Schema**: [`schema.json`](./schema.json) (JSON Schema draft-07) — the contract every
  reader/writer and gate validates against.
- **Owning skill**: `~/.claude/skills/task-orchestration` (project-agnostic; anything
  repo-specific is read from this repo's [`../clone.config.json`](../clone.config.json)).
- **Control loop**: `~/.claude/skills/clone-control-center`.

## Everyday commands

```bash
bun run tasks              # actionable board (hides done/void/icebox)
bun run tasks --all        # every task
bun run tasks --open       # only open/actionable states
bun run tasks --status running,ready
bun run tasks --tag bug
bun run tasks T0001        # one task in detail
bun run tasks --json       # the filtered set as JSON (for piping)

bun run proposals          # the open proposal queue
bun run console            # the ops UI on http://localhost:3999
```

## Rules

- **Never hand-edit a task file's `status`.** State changes go through the reducer
  (`applyAction`), invoked via
  `bun ~/.claude/skills/task-orchestration/scripts/set-task-status.ts T## <status> --by <who> --repo .`
  which enforces legal transitions and stamps `statusHistory`.
- **Never allocate an id by hand.** Use `allocateTask()` — atomic (`O_EXCL`) and
  collision-proof.
- One task = one file. Two lanes editing two different tasks never conflict.
- Task files live on the task-state root (this repo's `main`, pre-cutover) — **never**
  on a code lane's worktree branch.
