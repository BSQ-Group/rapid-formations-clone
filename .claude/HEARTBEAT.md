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
17:08:38 | T4 | RESUMED after usage limit
17:09:04 | T7 | RESUMED after usage limit
17:09:18 | T6 | RESUMED after usage limit
17:10:10 | T7 | fix diagnosis: z-index stacking
17:11:49 | T7 | dev-server retry: rm .next
17:12:27 | T4 | repro confirmed structurally
17:14:46 | T7 | 🚧BLOCKED: repo-wide TurbopackInternalError symlink-root — all worktree lanes affected, working around locally (not committing next.config.ts)
17:15:20 | T7 | dev-server up @3003
17:16:29 | T6 | repro confirmed — desktop click closes tooltip; tablet dead
17:16:37 | T4 | repro confirmed @1800
17:17:38 | T4 | fix start
17:18:06 | T7 | repro confirmed @1800 — z-index + missing newTab
17:18:06 | T7 | fix start
17:18:17 | T6 | fix applied
17:18:25 | T7 | fix applied
17:19:18 | T4 | fix applied — CSS verified compiled
17:19:22 | T7 | verify @360/768/1024/1800 pass
17:19:41 | T7 | coord-live start @360/768/1024/1800
17:21:05 | T4 | verify start — all 6 pages
17:21:07 | T6 | build end — dev up @3002
17:22:46 | T4 | fix applied to BuyServiceCard too
17:22:46 | T4 | verify done — id-req/vat/bt confirmed #313131
17:23:49 | T4 | ❓DECISION: director-appointment-resignation bold is in FAQs answerText, owned by T8 — filing proposal, not touching
