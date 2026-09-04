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
10:37:23 | CONTROL | ALL | Mode X dispatch — T6/T13/T30 as Console W workers (sonnet), 3 lanes
10:38:47 | T30 | starting ac fetch | model: sonnet
10:38:46 | T13 | fetched Linear ticket AC | model: sonnet
09:38:53 | T6 | model: sonnet | starting CMS media check
10:40:00 | T13 | AC written repro starting
10:50:00 | T13 | dev server up local root fix
10:42:48 | T30 | ac fetched, building fix | model: sonnet
10:43:13 | T30 | build/restarting dev server | model: sonnet
