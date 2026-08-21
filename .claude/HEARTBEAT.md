# HEARTBEAT

Append-only live progress + blockers. Workers append one line per beat:

```
HH:MM:SS | T## | <4-5 word status>
```

The first (START) line of a lane also records the model:
`HH:MM:SS | T## | START <status> | model: <sonnet|haiku|opus>`

Use 🚧BLOCKED / ❓DECISION prefixes for anything needing control's attention.
This file is the ground-truth timing source for measured task size.
