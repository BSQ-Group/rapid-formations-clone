# QA evidence — business-templates

Screenshots backing PR review, on an orphan branch so they never land in `main`.
Nothing here is built, imported or served. Safe to delete once the PR is closed.

`business-templates/video-width.png` — the explainer video at a 900px viewport,
live / before / after. Red rules mark the content column's edges (x=20 and x=880).
The live cookie banner is hidden before capture.

Captured with a fresh page load per viewport: resizing an already-loaded page keeps
the previously-chosen srcset candidate, which changes the measured width.
