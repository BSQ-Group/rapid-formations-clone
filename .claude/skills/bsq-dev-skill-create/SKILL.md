---
name: bsq-dev-skill-create
description: Create a new shared Claude Code skill in the BSQ-Group/claude-dev-skills single-source-of-truth repo, on a branch, with the correct SKILL.md frontmatter and scope, then open a PR. Use when adding a new reusable skill for BSQ projects (NOT a project-only one-off). Run this to "create a skill", "add a new skill", or "make a shared skill".
user-invocable: true
Usage: /bsq-dev-skill-create <skill-name>
argument-hint: <skill-name>
---

Add a **new** shared skill to the single source of truth: **https://github.com/BSQ-Group/claude-dev-skills**. New shared skills are authored in that repo (never vendored into a project), reviewed via PR, then symlinked locally with `/bsq-dev-skills-pull`.

- Input: `$ARGUMENTS[0]` = the new skill's kebab-case name (e.g. `seed-test-data`).

## Step 0: Is this actually a shared skill?

- **Shared** (useful across BSQ projects, or project-specific-but-reusable) → author it here.
- **A true one-off** for the current repo only that will never be reused → it can live in that project's `.claude/skills/`, but prefer the shared repo unless you're sure. When unsure, ask the user.
- The three `bsq-dev-skill-*` meta-skills are the only skills that intentionally live per-project — do not recreate those here.

## Step 1: Get the repo, on a fresh branch

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

# 1b. STOP on a dirty tree BEFORE touching the checkout — it may be an in-flight skill
#     edit to fold in, and `git checkout main` would fail on uncommitted changes anyway.
if [ -n "$(git -C "$DIR" status --porcelain)" ]; then
  echo "STOP: $DIR has uncommitted changes. Inspect them (likely an in-flight skill edit), commit or stash there, THEN re-run. Do not reset someone else's work."
else
  # 1c. Branch from up-to-date main. Chain the whole sequence so a failed
  #     fetch/checkout/pull does NOT branch off stale main or print OK.
  if git -C "$DIR" fetch origin \
     && git -C "$DIR" checkout main \
     && git -C "$DIR" pull --ff-only; then
    if git -C "$DIR" checkout -b "add-<skill-name>"; then
      echo "OK: on fresh branch add-<skill-name> from latest main — proceed to Step 2."
    else
      echo "STOP: main is up to date, but branch add-<skill-name> already exists (or checkout -b failed). Pick a new name or delete the stale branch in $DIR, then re-run. Do not proceed to Step 2."
    fi
  else
    echo "STOP: could not update to latest main (fetch/checkout/pull failed) in $DIR. Resolve it, then re-run. Do not proceed to Step 2."
  fi
fi
```

**🛑 Gate — if Step 1 printed `STOP:`, halt here. Do NOT run Step 2 onward.** A dirty clone means the `else` branch never ran, so no `add-<skill-name>` branch exists and the clone is still on whatever was checked out (likely someone's in-flight edit). Scaffolding, committing, or opening a PR now would land on that branch — clobbering uncommitted work or branching from the wrong base. Resolve the dirty tree as the message says (inspect it, then commit or stash *in the clone* — never reset someone else's work), then re-run `/bsq-dev-skill-create` from the top. Only continue once Step 1 prints the `OK: on fresh branch …` line.

## Step 2: Scaffold the skill directory

```bash
mkdir -p "$DIR/<skill-name>"
```

Write `$DIR/<skill-name>/SKILL.md`. Match the shape of existing skills in the repo — frontmatter then instructions:

```markdown
---
name: <skill-name>
description: <one sentence on what it does> + <one sentence on WHEN to use it, with trigger phrases>. The description is what Claude matches on to decide whether to invoke — make it specific and include the natural-language triggers.
user-invocable: true
Usage: /<skill-name> <args>
argument-hint: <args>
---

<Imperative, step-by-step instructions. Number the steps. Give runnable commands.
Cite real incidents where a step exists to prevent a known mistake. Keep it
operational — a skill is a runbook the agent executes, not prose.>
```

Conventions (copy an existing skill if unsure):
- **Frontmatter:** `name`, `description` (required), `user-invocable: true`, `Usage:`, `argument-hint:`. The `description` drives matching — lead with what it does, then "Use when…" with trigger phrases.
- **Bundle helpers next to `SKILL.md`** — `*.mjs` / `*.js` scripts and `*.md` reference docs in the same skill dir. Reference them by relative path from the skill.
- Read the repo README's "Repo layout" + "Adding a new skill" sections for the current contract.

## Step 3: Set the scope (global vs project-specific)

- **Global** (belongs in every project context) → add the skill name to the `GLOBAL_SKILLS` array in `$DIR/install.sh`, keeping the array alphabetical. `install.sh` will then symlink it into `~/.claude/skills/` for everyone.
- **Project-specific** (only meaningful in one project — e.g. a clone-fidelity QA skill) → leave it OUT of `GLOBAL_SKILLS`; it gets symlinked per-project on demand. Note the scope in the README table.
- Add a row to the README "Skills" table with the skill, its scope, and a one-line description.

## Step 4: Commit, push, open a PR

```bash
git -C "$DIR" add "<skill-name>/" install.sh README.md
git -C "$DIR" commit -m "Add <skill-name> skill"
git -C "$DIR" push -u origin "add-<skill-name>"
gh pr create --repo BSQ-Group/claude-dev-skills --base main --head "add-<skill-name>" \
  --title "Add <skill-name> skill" --body "<what it does, when to use, scope>"
```

Use the dev's own `@bsqgroup.co.uk` git author; do not add a Claude co-author.

## Step 5: Make it available locally (after merge)

Once the PR merges, run **`/bsq-dev-skills-pull`** to pull `main` and (re)create the symlinks. A global skill then resolves as `/<skill-name>` everywhere; a project-specific one needs the manual per-project symlink shown in that skill.

## Related

- `/bsq-dev-skill-update` — change an existing shared skill.
- `/bsq-dev-skills-pull` — install/refresh shared skills locally.
