---
name: bsq-dev-skill-update
description: Update an existing shared Claude Code skill in the BSQ-Group/claude-dev-skills single-source-of-truth repo, on a branch, reconciling content rather than overwriting, then open a PR. Use when changing, fixing, or improving a skill that already exists (e.g. after Cursor Bugbot flags a skill doc, or a process changes). Run this to "update a skill", "edit a skill", "fix a skill", or "change skill instructions".
user-invocable: true
Usage: /bsq-dev-skill-update <skill-name>
argument-hint: <skill-name>
---

Change an **existing** shared skill in the single source of truth: **https://github.com/BSQ-Group/claude-dev-skills**. All edits happen in that repo, on a branch, via PR — never as an ad-hoc edit on `main` and never in a project's vendored copy.

- Input: `$ARGUMENTS[0]` = the skill's name (e.g. `pull-request-create`).

## Why this skill exists (don't skip)

Global skills are **symlinked** into `~/.claude/skills/`, so the file you'd reach by opening `~/.claude/skills/<name>/SKILL.md` IS the repo file. It's tempting to just edit it in place — but that leaves an uncommitted change on `main` in the clone and no PR. Always go through a branch.

## Step 1: Get the repo on a fresh branch

```bash
# 1a. Locate an existing clone (SAME candidate lookup as /bsq-dev-skills-pull, so we
#     never create a second repo while the symlinks point at an alternate one); else clone.
DEFAULT_DIR="$HOME/.claude/claude-dev-skills"
DIR="${CLAUDE_DEV_SKILLS_DIR:-$DEFAULT_DIR}"
# Always include the default path even when CLAUDE_DEV_SKILLS_DIR points elsewhere,
# so a misconfigured env var doesn't clone a duplicate past an existing default clone.
for cand in "$DIR" "$DEFAULT_DIR" "$HOME/PROJECTS/claude-dev-skills" "$HOME/dev/claude-dev-skills"; do
  if [ -d "$cand/.git" ] && git -C "$cand" remote get-url origin 2>/dev/null | grep -q 'claude-dev-skills'; then
    DIR="$cand"; break
  fi
done
[ -d "$DIR/.git" ] || { mkdir -p "$(dirname "$DIR")" && git clone https://github.com/BSQ-Group/claude-dev-skills.git "$DIR"; }

# 1b. STOP on a dirty tree BEFORE touching the checkout — it may be a prior in-flight
#     edit to fold in, and `git checkout main` would fail on uncommitted changes anyway.
if [ -n "$(git -C "$DIR" status --porcelain)" ]; then
  echo "STOP: $DIR has uncommitted changes. Inspect them (likely an in-flight skill edit to fold into your change), commit or stash there, THEN re-run. Do not reset someone else's work."
else
  # 1c. Branch from up-to-date main. Chain the whole sequence so a failed
  #     fetch/checkout/pull does NOT branch off stale main or print OK.
  if git -C "$DIR" fetch origin \
     && git -C "$DIR" checkout main \
     && git -C "$DIR" pull --ff-only; then
    if git -C "$DIR" checkout -b "update-<skill-name>"; then
      echo "OK: on fresh branch update-<skill-name> from latest main — proceed to Step 2."
    else
      echo "STOP: main is up to date, but branch update-<skill-name> already exists (or checkout -b failed). Pick a new name or delete the stale branch in $DIR, then re-run. Do not proceed to Step 2."
    fi
  else
    echo "STOP: could not update to latest main (fetch/checkout/pull failed) in $DIR. Resolve it, then re-run. Do not proceed to Step 2."
  fi
fi
```

**🛑 Gate — if Step 1 printed `STOP:`, halt here. Do NOT run Step 2 onward.** A dirty clone means the `else` branch never ran, so no `update-<skill-name>` branch exists and the clone is still on whatever was checked out (likely the in-flight edit you're meant to fold in). Editing, committing, or opening a PR now would land on that branch — clobbering uncommitted work or branching from the wrong base. Resolve the dirty tree as the message says (inspect it, then commit or stash *in the clone* — never reset someone else's work), then re-run `/bsq-dev-skill-update` from the top. Only continue once Step 1 prints the `OK: on fresh branch …` line.

## Step 2: ⚠️ Reconcile — never blindly overwrite

A skill can have diverged in more than one place: the repo `main`, an in-flight branch, or a stale **vendored copy** left in some project's `.claude/skills/`. Before writing, establish which version is canonical **per hunk**, not per file:

1. **Diff every candidate against the repo's `main` version.** If a project still has a real (non-symlink) copy of this skill, diff it too.
2. **`diff -q` "differs" is not enough** — line counts can match while content differs, and a difference can be trailing-newline-only noise. Read the actual unified diff and judge each hunk.
3. **Take the union of genuine improvements, not one whole side.** Two copies often each gained *different* real content (one added a new guardrail, the other fixed a breakpoint value). Picking one side wholesale silently drops the other's improvement. Start from whichever side is the richer base, then graft the other side's unique changes onto it.
4. **Watch for contradictions** — two copies can give *opposite* instructions for the same situation (e.g. "always do X" vs "never do X"). That's not a merge, it's a decision: pick the one that matches current project reality (check `CLAUDE.md`, the live tooling, recent incidents) and surface it to the user if it's genuinely a behaviour change.

> Real incident — 2026-06-14 skills SSOT migration: every overlapping skill "differed", but the diffs were two-way — `claude-dev-skills` had the newer `pull-request-create` HTTPS flow and overlay-generating upload script, while `public-brand` had the newer Bugbot fixes and the 390→360 breakpoint migration. A blind copy in *either* direction would have destroyed real work. The correct result was a per-file union. Reconcile, don't clobber.

## Step 3: Make the edit

Edit `$DIR/<skill-name>/SKILL.md` (and any bundled `*.mjs` / `*.md` helpers in the same dir). Keep the frontmatter contract intact (`name`, `description`, `user-invocable`, `Usage`, `argument-hint`). If the change alters *when* the skill should fire, update the `description` triggers too. If the change is a fix for a recurring mistake, state the real incident inline so the lesson sticks.

## Step 4: Commit, push, open a PR

```bash
git -C "$DIR" add "<skill-name>/"
git -C "$DIR" commit -m "<skill-name>: <what changed and why>"
git -C "$DIR" push -u origin "update-<skill-name>"
gh pr create --repo BSQ-Group/claude-dev-skills --base main --head "update-<skill-name>" \
  --title "<skill-name>: <short summary>" --body "<what changed, why, any behaviour change>"
```

Use the dev's own `@bsqgroup.co.uk` git author; no Claude co-author.

## Step 5: Refresh locally (after merge)

Run **`/bsq-dev-skills-pull`** to fast-forward the clone to `main`. Because the skill is symlinked, the updated content is live immediately — no per-project copy to touch.

## Never do this

- **Don't edit a project's vendored copy of a shared skill.** Projects should not have one — they consume shared skills via `~/.claude/skills/` symlinks. If you find a real copy in a project's `.claude/skills/`, it's drift: port any unique content into the repo (Step 2), then delete the vendored copy in that project.
- **Don't commit skill changes straight to `main`** in the clone — always a branch + PR.

## Related

- `/bsq-dev-skill-create` — add a brand-new shared skill.
- `/bsq-dev-skills-pull` — install/refresh shared skills locally.
