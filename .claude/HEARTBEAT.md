# HEARTBEAT

Append-only live progress + blockers. Workers append one line per beat:

```
HH:MM:SS | T## | <4-5 word status>
```

The first (START) line of a lane also records the model:
`HH:MM:SS | T## | START <status> | model: <sonnet|haiku|opus>`

Use 🚧BLOCKED / ❓DECISION prefixes for anything needing control's attention.
This file is the ground-truth timing source for measured task size.
16:53:45 | T4 | START — worktree up | model: sonnet
16:53:46 | T6 | START — worktree up | model: sonnet
16:53:47 | T7 | START — worktree up | model: sonnet
16:53:50 | T8 | START — worktree up | model: sonnet
16:53:54 | T1 | START — worktree up | model: sonnet
16:53:54 | T7 | repro start
16:54:00 | T1 | repro start
16:54:02 | T4 | repro start
16:54:03 | T8 | repro start
17:01:27 | CONTROL | T1 | WATCHDOG — lane died at usage limit (5h quota rejected, resets 19:00 BST); re-queued to backlog
17:01:27 | CONTROL | T4 | WATCHDOG — lane died at usage limit (5h quota rejected, resets 19:00 BST); re-queued to backlog
17:01:27 | CONTROL | T6 | WATCHDOG — lane died at usage limit (5h quota rejected, resets 19:00 BST); re-queued to backlog
17:01:27 | CONTROL | T7 | WATCHDOG — lane died at usage limit (5h quota rejected, resets 19:00 BST); re-queued to backlog
17:01:27 | CONTROL | T8 | WATCHDOG — lane died at usage limit (5h quota rejected, resets 19:00 BST); re-queued to backlog
