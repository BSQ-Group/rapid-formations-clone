# COMPLETED-LOG

Append-only done-list. One line per completed task, appended by the worker that
finished it:

```
task T## complete — <summary> (<branch>@<sha>)
```

A line here without a matching `reports/<ID>-<round>.md` is an INCOMPLETE
completion — bounce the lane.
