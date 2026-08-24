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
17:25:44 | T7 | coord-live running background
17:25:47 | CONTROL | T4 | RULING: proceed on FAQ answerText bold (T8 not live, scope=heading only, criterion 3 requires it); check criterion-1 shared-rule approach
17:27:51 | T7 | coord-live retry — section text mismatch, use "Part of"
17:28:01 | CONTROL | T7 | BOUNCE — backgrounded gate + exited turn (stall); work uncommitted; re-dispatched to commit-first then foreground gates
19:29:35 | T7 | commit+push done — 2 src files, next.config.ts excluded
19:29:53 | T7 | coord-live retry #2 — prior run hit transient network blip (ERR_INTERNET_DISCONNECTED / mongo ENOTFOUND)
22:32:57 | CONTROL | ALL | network outage 17:31-18:30 machine-wide (ERR_NETWORK_CHANGED/api_retry); recovered; T4+T6 ordered to commit-first (over context limit)
23:33:36 | T4 | committed + pushed fix/core-7119-bold-body-text
00:34:39 | T7 | scope check: landingHero=home-only, footer instance already correct
00:34:39 | T7 | coord-live start (foreground, blocking)
00:57:24 | T4 | regressions confirmed — ico-reg/business-tel/cookies-policy headings unaffected
00:57:24 | T4 | verify done — all 6 pages + FAQ answerText confirmed #313131
00:57:36 | T4 | coord-live start @360
09:03:07 | T4 | starting gate-and-PR lane | model: sonnet
09:03:46 | T4 | starting coord-live gate
09:12:01 | T8 | starting fix — reading task file | model: sonnet
09:12:04 | T9 | model: sonnet | START read task
09:12:05 | T1 | model: sonnet | START reading task, dev-gate check
09:12:06 | T10 | model: sonnet | START read task file
09:12:39 | T10 | dev server down attempting restart
09:12:57 | T8 | dev server down — restarting once
09:13:36 | T1 | dev server blocked env symlink bug
09:14:36 | T8 | dev server blocked — turbopack symlink env issue, verifying via typecheck
09:15:31 | T1 | fix pushed — ready for gate lane
09:15:59 | T8 | fix pushed — ready for gate lane
09:16:17 | T9 | dev server up, checking banner image
09:16:28 | T10 | fix applied badge shadow
09:19:38 | T4 | coord-live gate cannot pass, investigating why
09:22:09 | T10 | committed pushed writing report
09:22:45 | T10 | fix pushed — ready for gate lane
09:31:30 | T8 | gate-lane starting rebase-done | model: sonnet
