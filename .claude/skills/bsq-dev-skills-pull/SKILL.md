---
name: bsq-dev-skills-pull
description: Install or update the team's shared Claude Code skills from the BSQ-Group/claude-dev-skills single-source-of-truth repo, symlinking the global skills into ~/.claude/skills/. Use when setting up a machine, when a shared skill is missing or stale, or after a claude-dev-skills PR merges. Run this to "pull skills", "update skills", "install the shared skills", or "sync skills".
user-invocable: true
Usage: /bsq-dev-skills-pull
argument-hint: (no arguments)
---

Install / refresh the team's shared skills from the single source of truth: **https://github.com/BSQ-Group/claude-dev-skills**.

## Model — read this first

- **`BSQ-Group/claude-dev-skills` is the single source of truth for all shared skills.** It is the only place a shared skill's content is edited.
- Skills are made available to Claude Code by **symlinking** each one into `~/.claude/skills/<name>/`, pointing at the clone. Claude Code resolves `/skill-name` from both `~/.claude/skills/` (global) and the current project's `.claude/skills/` — symlinks are transparent to the loader.
- **Project repos do NOT vendor copies of shared skills.** A project's `.claude/skills/` holds only the project's bootstrap meta-skills (`bsq-dev-skill-create`, `bsq-dev-skill-update`, `bsq-dev-skills-pull`). Everything else comes from `~/.claude/skills/` via this skill. (This is why these three meta-skills are real files in each project and are NOT symlinked — they have to exist before any symlink does.)
- Because global skills are symlinks, **editing `~/.claude/skills/<name>/SKILL.md` edits the repo file directly.** To change a skill, use `/bsq-dev-skill-update` (branch + PR), never an ad-hoc edit on `main`.

## Canonical clone location

```
${CLAUDE_DEV_SKILLS_DIR:-$HOME/.claude/claude-dev-skills}
```

Use the `CLAUDE_DEV_SKILLS_DIR` env var if it is set; otherwise default to `~/.claude/claude-dev-skills`. If a clone already exists elsewhere (e.g. `~/PROJECTS/claude-dev-skills`), reuse it instead of making a second copy — see Step 1.

## Step 1: Locate or clone the repo

```bash
DEFAULT_DIR="$HOME/.claude/claude-dev-skills"
DIR="${CLAUDE_DEV_SKILLS_DIR:-$DEFAULT_DIR}"

# Reuse an existing clone if one is already on disk (avoid a second copy that
# would leave the symlinks pointing at a stale tree). Always include the default
# path even when CLAUDE_DEV_SKILLS_DIR points elsewhere — otherwise a misconfigured
# env var would clone a duplicate while an existing default clone is ignored.
for cand in "$DIR" "$DEFAULT_DIR" "$HOME/PROJECTS/claude-dev-skills" "$HOME/dev/claude-dev-skills"; do
  if [ -d "$cand/.git" ] && git -C "$cand" remote get-url origin 2>/dev/null | grep -q 'claude-dev-skills'; then
    DIR="$cand"; break
  fi
done

if [ ! -d "$DIR/.git" ]; then
  mkdir -p "$(dirname "$DIR")"
  git clone https://github.com/BSQ-Group/claude-dev-skills.git "$DIR"
fi
echo "Using clone: $DIR"
```

## Step 2: Update to latest `main`

```bash
if [ -n "$(git -C "$DIR" status --porcelain)" ]; then
  # Dirty clone is usually an in-flight /bsq-dev-skill-create or -update — don't clobber it,
  # and don't relink: install.sh would symlink the global skills from this WIP tree.
  echo "STOP: $DIR has uncommitted changes — leaving as-is and NOT relinking. Commit/stash there first, then re-run. Do not run Step 3."
# install.sh symlinks from the CHECKED-OUT tree, so we must end on up-to-date main —
# chain the whole sequence so a failed checkout/pull doesn't leave a stale or feature
# tree that Step 3 would then symlink from.
elif git -C "$DIR" fetch origin \
     && git -C "$DIR" checkout main \
     && git -C "$DIR" pull --ff-only; then
  echo "OK: $DIR on up-to-date main ($(git -C "$DIR" rev-parse --short HEAD)) — safe to run Step 3."
else
  echo "STOP: could not update $DIR to latest main (fetch/checkout/pull failed). Resolve it in $DIR, then re-run. Do not run Step 3."
fi
```

> If the clone is parked on a feature branch with **no** uncommitted changes, switching to `main` here is correct — this skill's job is to surface merged shared skills, not whatever branch was left checked out. The in-flight branch is untouched and still there (`git -C "$DIR" branch`). Only a *dirty* tree blocks the switch (above).

## Step 3: Symlink global skills

**🛑 Gate — only run this step if Step 2 printed `OK:`.** A `STOP:` from Step 2 (dirty tree, or a failed fetch/checkout/pull) means the clone is **not** on up-to-date `main`; running `install.sh` then would symlink the global skills from a WIP or stale tree, contradicting the rule that symlinks must reflect merged `main`. Resolve the clone first, then re-run from Step 2.

`install.sh` is idempotent — it links every **global-scoped** skill into `~/.claude/skills/` using the repo's own directory as the source, and skips ones already linked correctly.

```bash
bash "$DIR/install.sh"
```

Project-specific skills (scope ≠ global in the repo README — e.g. the `qa-clone-*`, `restart-dev`, `theme-foundation`, `clone-live-page-to-payload` skills) are intentionally **not** linked globally. If the current project needs one, link it into that project's `.claude/skills/` manually:

```bash
ln -s "$DIR/<skill-name>" .claude/skills/<skill-name>   # from the project root
```

## Step 4: Verify and report

```bash
ls -la ~/.claude/skills/ | grep ' -> '   # every shared skill should be a symlink into the clone
```

Report to the user:
- The clone path used and the commit it's now at (`git -C "$DIR" log -1 --oneline`).
- Which skills are newly linked vs already present (from `install.sh` output: `LINK` / `RELINK` / `OK`).
- Any `SKIP` lines — those mean a **real directory** (a vendored copy) is shadowing the symlink at `~/.claude/skills/<name>`; that's drift. Remove the real dir and re-run so the symlink can be created.

## Related

- `/bsq-dev-skill-create` — add a new shared skill to the repo.
- `/bsq-dev-skill-update` — change an existing shared skill.
