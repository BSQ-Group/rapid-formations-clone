# QCF — Recurring gotchas checklist

A flat, append-only list of mistakes that have bitten us more than once on this codebase. The `pull-request-create` skill runs each `Detect` command in Step 9a against the PR diff and surfaces hits before handing off to Bugbot. **When a new recurring mistake is identified (by the user, by Bugbot, or by post-merge QA), append a new entry in the same fix commit.**

Each entry has four parts:
- **Name** — one-line summary
- **When it bites** — the user-visible symptom or class of bug
- **Detect** — a concrete shell check that can run against the diff. Prefer `grep` / `git diff` / a `browser_evaluate` snippet — anything an agent can execute mechanically. The check should fail loudly when the smell is present.
- **Fix** — the correct pattern, including a reference to the canonical example in the codebase

---

## CTA uses `<CMSLink>` with non-inline appearance — text not centered

- **When it bites:** A CTA button label renders left-aligned inside a full-width pill (most visible on mobile or in cards on coloured backgrounds). CMSLink's `Button asChild → Slot` chain silently drops the Button's base classes (`inline-flex items-center justify-center text-center`), so the rendered `<a>` ends up `display: block; text-align: start`.
- **Detect:**
  ```bash
  # In the new/modified block files, flag any CMSLink usage that is NOT appearance="inline".
  git diff main...HEAD -- 'src/blocks/**/Component.tsx' \
    | grep -E '^\+.*<CMSLink' \
    | grep -v 'appearance="inline"'
  ```
- **Fix:** Wrap `<Button>` inside `<Link>` directly (the pattern used by `HeroServicesBanner`, `RegisteredOfficeAddress`, `PromoTier3`). Use `getLinkHref` from `@/utilities/links` to resolve the href:
  ```tsx
  import Link from 'next/link'
  import { Button } from '@/components/ui/button'
  import { getLinkHref, type LinkData } from '@/utilities/links'

  const ctaHref = cta ? getLinkHref(cta as LinkData) : null
  // …
  {ctaHref && ctaHref !== '#' && cta?.label && (
    <Link href={ctaHref} className={s.ctaLink}
      {...(cta.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <Button variant="primary" size="lg" className={s.cta}>{cta.label}</Button>
    </Link>
  )}
  ```

## `textStyle="span"` + raw px when a `Text` preset matches the desktop Figma value

- **When it bites:** Typography subtly off at one breakpoint, the rest "works by accident". The styles file is full of `text-[NNpx] leading-[Npx]` chains that ignore the project's responsive Text system, so future global typography tweaks won't reach the block.
- **Detect:**
  ```bash
  # Flag every new block file that uses textStyle="span", and dump the file
  # so the reviewer can confirm whether a matching preset exists in
  # src/components/shared/Text/Text.css for the desktop Figma value.
  git diff main...HEAD -- 'src/blocks/**/*.tsx' 'src/blocks/**/*.styles.ts' \
    | grep -E '^\+.*(textStyle="span"|text-\[[0-9]+px\])'
  # Then for each hit, audit against:
  #   sed -n '/&-body-/,/}/p; /&-headline-/,/}/p' src/components/shared/Text/Text.css
  ```
- **Fix:** Pick the preset that matches the **desktop (1800)** Figma value:
  - 12px / wide:14px → `body-xs`
  - 14px / wide:16px → `body-sm`
  - 16px / wide:18px → `body-base`
  - 20/24/30/30/36 → `headline-3xl` (with optional per-breakpoint overrides at mobile/md)
  - 24/30/36/36/48 → `headline-4xl`
  - …see Text.css for the full list.

  Override divergent smaller breakpoints in `className` per CLAUDE.md's "Per-breakpoint exceptions (Figma takes precedence)" rule. **Restate wide** in the className when overriding md or smaller, because Tailwind utilities are emitted after `@apply`'d preset rules — without `wide:text-Xxl`, an `md:text-Yxl` cascade will override the preset's wide value (e.g. price rendered 30px at 1800 instead of 36px in PromoTier3 v1). Reserve `textStyle="span"` for sizes with truly no preset match.

## Block silently dropped from page layout after registering

- **When it bites:** PATCHing a page with a new `blockType` returns 200 but the layout array comes back without your block. Cause: Payload registers block schemas at server-start, not on hot reload. Editing `Pages/index.ts` doesn't refresh the schema in a running dev server.
- **Detect:**
  ```bash
  # After PATCHing a page with a new block, verify the block actually persisted
  # in an anonymous read (so admin autosave can't mask it):
  curl -sk "https://localhost:3000/api/pages?where%5Bslug%5D%5Bequals%5D=<slug>&depth=0" \
    | python3 -c "import sys,json; d=json.load(sys.stdin); print([b['blockType'] for b in d['docs'][0].get('layout',[])])"
  # If your block name is missing, the dev server has stale schema.
  ```
- **Fix:** Kill the dev server (`lsof -ti:3000 -sTCP:LISTEN | xargs kill`) and restart with `bun run dev`. Re-login + re-PATCH. The agent has standing permission to restart a stuck dev server without asking — see `feedback_restart_stuck_dev_server.md`.

## Style class lists split across array entries / concat — not greppable

- **When it bites:** Trying to grep for a class string copied from DevTools or the rendered markup, can't find it because the source has `[...].join(' ')` or `+` concatenation.
- **Detect:**
  ```bash
  git diff main...HEAD -- 'src/**/*.styles.ts' 'src/blocks/**/*.styles.ts' \
    | grep -E "^\+.*(\.join\(' '\)| \+ ')" || true
  ```
- **Fix:** Single string literal per class list. Prettier handles long lines automatically. See `feedback_styles_array_join.md` and CLAUDE.md.

## `<Text asChild>` wrapping an empty `<span />` or `<p />` — pure boilerplate

- **When it bites:** Components fill up with `<Text textStyle="..." text={...} asChild className={...}><span /></Text>` / `<p />` blocks that don't do anything the plain form wouldn't. The Text component already defaults to `<span>` (`src/components/shared/Text/index.tsx` line 46) and accepts `as="p"` / `as="h2"` / etc., so the `asChild` ceremony just buries the intent. Copy-pasted from blocks like `PromoCard` without anyone checking whether the wrapping was meaningful, the pattern proliferates and reviewers stop seeing it.
- **Detect:**
  ```bash
  # Flag any Text with asChild whose ONLY child is an empty self-closing tag —
  # WITH OR WITHOUT attributes (e.g. <span />, <p />, <span aria-hidden="true" />).
  # The child having attributes does NOT make the wrapper meaningful: any prop on
  # it (aria-*, role, etc.) can be passed to <Text> directly. The earlier regex
  # used `<tag\s*/>` and silently missed attributed children like
  # `<span aria-hidden="true" />` — hence `[^>]*` before the slash. It also kept
  # the diff-prefix `+` on each line, which after `tr` landed between tokens and
  # broke the `\s*` match for wrapped JSX — hence the `sed` strip.
  git diff main...HEAD -- 'src/**/*.tsx' \
    | grep -E '^\+' \
    | sed -E 's/^\+//' \
    | tr '\n' ' ' \
    | grep -oE '<Text[^>]*\basChild\b[^>]*>[[:space:]]*<(span|p|h[1-6]|div)\b[^>]*/>[[:space:]]*</Text>'
  ```
- **Fix:** Drop `asChild` and the empty child element. Use `as="..."` if you need a specific tag, otherwise let the default `<span>` stand. If the empty child only existed to carry an attribute (`aria-hidden`, `role`, …), pass that attribute to `<Text>` directly — `Text` forwards arbitrary props to the emitted element (`...props` in `src/components/shared/Text/index.tsx`). If TypeScript rejects the prop because `TextProps` doesn't list it, add it to `TextProps` (e.g. `aria-hidden` was added for exactly this) rather than reintroducing the Slot wrapper:
  ```tsx
  // ❌ before — redundant
  <Text textStyle="body-xs" text={label} asChild className={s.eyebrow}><span /></Text>
  <Text textStyle="body-sm" text={desc} asChild className={s.desc}><p /></Text>
  // ❌ before — attributed child, same boilerplate (the attr can move onto <Text>)
  <Text textStyle="body-lg" text={n} asChild className={s.num}><span aria-hidden="true" /></Text>

  // ✅ after — same DOM, less noise
  <Text textStyle="body-xs" text={label} className={s.eyebrow} />
  <Text as="p" textStyle="body-sm" text={desc} className={s.desc} />
  <Text textStyle="body-lg" text={n} aria-hidden="true" className={s.num} />
  ```
  Only keep `asChild` when you genuinely need to merge into a non-trivial custom child (e.g. a `next/link` or a motion component). For plain tags, `as=...` is shorter and clearer.

## Element horizontal alignment flips between mobile and desktop — verify per viewport

- **When it bites:** A block's sizes, padding, and typography all match Figma, but an element sits on the wrong side at one breakpoint — e.g. a price block right-aligned (`items-end`) when Figma's mobile layout puts it at the far left with the CTA on the right (`justify-between`). Because every measurable value matches, the per-viewport size/padding checks pass and the misalignment ships. On CORE-3561 the mobile price alignment was wrong and only the user caught it.
- **Detect:** Not a single grep — it's a verification-discipline check. For each row/group that changes layout between breakpoints, read the computed alignment live and compare to Figma at *that* viewport:
  ```js
  // For the suspect container at a given viewport (drive the page there first):
  const row = document.querySelector('<selector>')
  const cs = getComputedStyle(row)
  ;({ justifyContent: cs.justifyContent, alignItems: cs.alignItems, flexDirection: cs.flexDirection })
  // Compare justifyContent/alignItems (and child text-align) against the Figma frame
  // for the SAME viewport — alignment frequently flips mobile↔desktop.
  ```
  Static smell in the styles file: a child with `items-end` / `items-start` / `justify-end` that has **no** breakpoint-prefixed counterpart (`md:items-*`) is suspect when the design's alignment differs between mobile and desktop.
- **Fix:** Set the alignment per breakpoint to match Figma, e.g. `items-start md:items-end` (left on mobile, right from tablet up) and `justify-between` where the design spaces two groups apart. Re-verify the computed `justifyContent`/`alignItems` live at every viewport, not just the sizes.

## CTA href hard-coded with `/${slug}` instead of `getLinkHref`

- **When it bites:** Reference links to nested pages send users to a non-existent leaf-only URL; same logic forked across blocks drifts over time.
- **Detect:**
  ```bash
  git diff main...HEAD -- 'src/blocks/**/Component.tsx' \
    | grep -E "^\+.*reference\?\.value|^\+.*relationTo" \
    | grep -v "getLinkHref"
  ```
- **Fix:** Import `getLinkHref` from `@/utilities/links` and call it on the link field. Any future fix to nested-page URL resolution lands in one place. See `HeroServicesBanner`, `RegisteredOfficeAddress`, `PromoTier3`.

## Block has no `max-w` cap — stretches wider than sibling blocks between 1280 and 1800

- **When it bites:** A block matches Figma exactly at the discrete frame widths (1280, 1800) but at in-between desktop widths (1440, 1512, 1600) its content stretches edge-to-edge and reads as noticeably **wider and larger** than the blocks above/below it on the same page. Cause: the block only constrains its content width at the `wide:` (1800) breakpoint — e.g. via fixed column widths (`wide:w-[708px]`) or `wide:px-[180px]` — and leaves the section `w-full` across 1024–1799. So between 1280 and 1799 it fills the viewport while sibling blocks (ServiceCards, FAQs, etc.) cap at `xl:max-w-[1280px]`. Verified live: at 1440px the uncapped block was 1345px wide vs the 1280px ServiceCards block directly above it (CORE-3563 post-merge fix).
- **Detect:**
  ```bash
  # A block whose styles define a 1800 desktop layout (wide:px-[180px] or wide:w-[…])
  # MUST also cap the section at xl/lg, or it stretches between 1280 and 1800.
  # Check EACH styles file separately — aggregating all added lines into one blob
  # lets a capped block in the same PR mask an uncapped one (false negative).
  git diff main...HEAD --name-only -- 'src/blocks/**/*.styles.ts' | while read -r f; do
    added=$(git diff main...HEAD -- "$f" | grep -E '^\+' | sed -E 's/^\+//')
    if echo "$added" | grep -qE 'wide:(px-\[180px\]|w-\[)' \
       && ! echo "$added" | grep -qE '(xl|lg):max-w-\['; then
      echo "$f: defines a 1800 layout but has no xl/lg max-width cap — will stretch wider than sibling blocks at 1280–1799."
    fi
  done
  ```
  Or measure live at 1440px: a content block should not be wider than the capped siblings on the same page.
- **Fix:** Cap the **content container's** `max-width` directly at the Figma *content* widths and let the section center it — don't cap the section frame and inset with padding. The horizontal padding only needs to handle small viewports (where content would otherwise touch the edge); on large viewports the `max-width` + centering produces the gutters automatically, so a `wide:px-[180px]` is redundant. Keeping the section full-width also avoids the bg-edge-to-edge gotcha (`bg-*` + `max-w-*` on one element):
  ```ts
  // section stays full-width (bg edge-to-edge); only small-screen padding.
  section: 'flex flex-col items-center w-full px-4 md:px-8 lg:px-10',
  // the container carries the cap, stepped to the Figma CONTENT widths.
  container:
    'flex flex-col gap-6 w-full md:flex-row md:justify-between xl:max-w-[1200px] wide:max-w-[1440px]',
  ```
  `xl:max-w-[1200px]` holds content at 1200px across 1280–1799 (flush with the other blocks); `wide:max-w-[1440px]` opens to the 1440px content area the 1800 frame designs for (centering yields the 180px gutters with no `wide:px-`). Prefer `justify-between` over a hardcoded `wide:gap-[Npx]` when the gap is just whatever's left between two fixed-width columns inside a capped container — it derives from the geometry (1440 − 708 − 464 = 268) instead of duplicating a magic number. See `HowItWorksList`. (Some older blocks like `ServiceCards` still cap the section + pad inward — same visual result, but the container-cap form above is preferred.)

## DESTRUCTIVE: PATCHing a page `layout` through a worktree server whose branch is missing other blocks' configs silently deletes those blocks

- **When it bites:** You add **one** block to a shared page (e.g. drop a testimonial onto `/confirmation-statement`) by reading the page's `layout`, appending your block, and PATCHing the whole array back. The page comes back looking right *to you* — but every block authored on a **different branch that isn't merged into your current worktree** has been **permanently removed from the live document on the shared Atlas DB**. This is data loss, not a cosmetic bug, and it hits other people's in-flight work.
  - **Mechanism:** Payload registers `layout` block schemas from `Pages/index.ts` at server start. A worktree on a feature branch only has the blocks that existed when it branched. When that server **reads** a page, Payload **silently strips** any block whose `blockType` isn't in *that branch's* registered list — so the array you read is already missing the other session's block. Your read-modify-write then PATCHes the stripped array back, and Payload's REST PATCH **replaces the whole `layout` field**, committing the deletion. There is no array-append primitive, so read-modify-write is unavoidable — which means a lossy read becomes a lossy write.
  - This is the **write-side, destructive** sibling of "Block silently dropped from page layout after registering" above. That entry is about *your* new block vanishing on read; this one is about *other people's existing* blocks vanishing on write. Real incident: CORE-3560 wiped concurrently-published blocks off `/confirmation-statement` because the worktree branched before `promoTier2`/`promoTier3`/`howItWorksList` were merged, so the server didn't recognise them and dropped them on the next PATCH.
- **Detect:** the guard must run **before** you read/write, because the loss happens at the read layer — there is no after-the-fact diff that catches it (see the warning below). Prove the running server's registered blocks are a **superset** of the page by confirming its branch is not behind `main`:
  ```bash
  PID=$(lsof -tiTCP:3000 -sTCP:LISTEN); CWD=$(lsof -a -p "$PID" -d cwd -Fn | sed -n 's/^n//p')
  git -C "$CWD" fetch -q origin main
  behind=$(git -C "$CWD" rev-list --count HEAD..origin/main)
  echo "server cwd=$CWD  commits behind main=$behind"
  # behind > 0  => do NOT read or PATCH layout from this server; see Fix.
  ```
  **Do NOT try to detect the loss with a `before`/`after` block-set diff read through the same server.** It is circular: Payload strips the unknown blocks *on read*, so `before` is already missing the at-risk blocks and the diff always "passes" (`before` + your block) even though the PATCH just deleted another author's work. Confirming the loss requires an **authoritative full-schema read** — a `main` server or the raw `_pages_versions` rows in Atlas (the latter is a production read needing user approval) — never the possibly-stale server you wrote through. The behind-main check above is the real protection precisely because it runs first and makes the read non-lossy.
- **Fix:**
  - **Do page-`layout` writes from a server whose schema is a superset of the page** — i.e. a dev server running **`main` (or a branch freshly rebased on latest main)**, never a stale feature worktree. The whole-array PATCH is only safe when every block already on the page is registered in the server you write through. After this PR, layout content-population (the `payload-publish-component` flow, `figma-to-component` Step 5) must check the "behind main" guard above and rebase/restart before writing.
  - **If you only have a stale worktree server,** rebase the branch on `origin/main` and restart the server (re-registers the merged blocks), or hand the layout write to a session on main. Do not PATCH "just this once" — the array is replaced wholesale.
  - **Recovery if it already happened:** the pre-write rows in Mongo `_pages_versions` still hold the dropped blocks in raw form. Restore the prior version **through a full-schema (main) server**, or have the block's author re-publish from a main-rebased branch — never restore through the stale server, which re-drops them. Reading the raw Atlas doc to confirm what was lost is a production read and needs explicit user approval.

## Card / inner-element INTERNAL padding measured on the section wrapper, not the padded box

- **When it bites:** A block matches Figma on every section-level check yet ships with the card's own padding missing — the top label sits flush to the card's top edge and the bottom row touches the bottom edge (no breathing room). Cause: the verification measured `paddingBlock`/`paddingInline` on the **outer section wrapper**, which is correct, while the actual padding Figma specifies lives on the **inner card frame** (e.g. 32px all sides). The section measurement passes, the card padding is never asserted, and the bug ships. Real incident: CORE-3564 promo tier 3 desktop — card internal padding was ~0 while the section padding was fine; QA's section-only measurement said "pass". The equal-width Figma vs impl screenshots in the PR were 360px vs 302px tall (16% delta) — the signal was there but uncomputed.
- **Detect:**
  ```js
  // Drive the live page to a viewport, then measure the CARD (the padded box Figma
  // puts the 32px on), NOT the section. Compare all four sides to the Figma value.
  const card = document.querySelector('<card-selector>') // the inner padded frame
  const cs = getComputedStyle(card)
  ;({ pt: cs.paddingTop, pb: cs.paddingBottom, pl: cs.paddingLeft, pr: cs.paddingRight })
  // Any side reading 0px / near-0 when Figma's card frame has padding === bug.
  ```
  Mechanical screenshot gate (catches it without knowing the selector): after normalising the Figma and impl screenshots to the same width per viewport, a height delta > 3% means a real vertical-spacing/padding discrepancy — see `pull-request-create` Step 4b (the sharp height-delta gate exits non-zero and blocks the PR). 360 vs 302 at 1280 width = 16% would have failed.
- **Fix:** Add the padding to the **card element itself** (the box Figma frames), not the section. Re-measure `getComputedStyle(card)` on all four sides at every viewport and confirm it matches the Figma card frame's padding. Carry the card's internal padding into the PR's Measured-vs-Figma table so it's an explicit checked number. The section wrapper's padding and the card's internal padding are two independent boxes — measure both. See `figma-to-component` Step 6 (`cardInternalPadding`) and `figma-update-component` Step 5b.

## Price / CTA anchored to the wrong vertical edge of the card at one breakpoint (top vs bottom)

- **When it bites:** All sizes, padding, and typography match Figma, but at one breakpoint (often tablet only) a group like the price + CTA sits at the **top** of the card when Figma anchors it to the **bottom** (level with the pills), or vice-versa. Because every measurable size matches, size/padding checks pass and the misalignment ships. The vertical-axis sibling of the existing "horizontal alignment flips" gotcha. Real incident: CORE-3564 tablet (768px) — price + "Find out more" floated top-right instead of bottom-right.
- **Detect:**
  ```js
  // At each viewport, measure the element's distance from the card's top vs bottom
  // edge and the flex alignment of its parent. Compare to Figma at THAT viewport.
  const card = document.querySelector('<card-selector>')
  const el = document.querySelector('<price-or-cta-selector>')
  const c = card.getBoundingClientRect(), e = el.getBoundingClientRect()
  ;({
    distFromTop: Math.round(e.top - c.top),
    distFromBottom: Math.round(c.bottom - e.bottom), // ~= card padding when bottom-anchored
    alignItems: getComputedStyle(el.parentElement).alignItems,
    justifyContent: getComputedStyle(el.parentElement).justifyContent,
  })
  ```
  Static smell: a flex child with no `items-*` / `self-*` / `justify-*` that re-anchors per breakpoint, checked only at desktop. Anchoring frequently flips between breakpoints, so a desktop-only spot-check misses a tablet-only bug.
- **Fix:** Set the vertical anchor per breakpoint to match Figma (`items-start` / `items-end` / `self-end`, or `justify-between` on the column) and **verify the computed alignment at every viewport**, not just desktop. See `figma-to-component` Step 6 alignment row and `figma-update-component` Step 5b vertical-anchor assertion.

## Storybook stories render with serif fallback — `next/font` variables not wired into `.storybook/preview.tsx`

- **When it bites:** PR screenshots taken from Storybook show text in a serif (Times) instead of Inter / Work Sans / Montserrat. The live site renders correctly; only Storybook is wrong. Cause: `src/app/(frontend)/layout.tsx` loads fonts via `next/font/google` and applies `inter.variable` / `workSans.variable` / `montserrat.variable` as classes on `<html>`. Storybook doesn't wrap stories in that layout, so `var(--font-inter)` etc. don't resolve and the cascade falls back to serif. The screenshots ship in PRs and look like a bug in the component, when it's a Storybook chrome issue. Real incident: CORE-3571 ServiceCards PR shipped with Storybook screenshots in serif; user caught it.
- **Detect:**
  ```bash
  # In .storybook/preview.tsx, the next/font imports + variable classes must
  # be applied to <html> by the decorator.
  grep -q "next/font" .storybook/preview.tsx \
    && grep -qE "inter\.variable|workSans\.variable|montserrat\.variable" .storybook/preview.tsx \
    || echo ".storybook/preview.tsx is missing next/font wiring — Storybook will render with serif fallback"
  ```
  Live check during PR prep:
  ```js
  // Open the story in Storybook, then:
  getComputedStyle(document.querySelector('h2') || document.body).fontFamily
  // Should be "Inter" / "Inter, sans-serif" — NOT "Times" / serif.
  ```
- **Fix:** Mirror the `next/font/google` setup from `src/app/(frontend)/layout.tsx` in `.storybook/preview.tsx`. Import the same fonts with the same `variable: '--font-inter'` config and add `inter.variable workSans.variable montserrat.variable` as classNames on `document.documentElement` inside the theme decorator. See [.storybook/preview.tsx](.storybook/preview.tsx) for the canonical wiring.

## "Verification" without actually opening the artifact — screenshots written but never compared

- **When it bites:** A skill workflow checks "screenshot saved" or "file exists" and treats that as visual verification. Reality: the file might be empty, or use the wrong font (see Storybook gotcha above), or capture the wrong viewport. Ticking the "matches Figma" box without opening the file misses obvious defects and ships a PR with broken comparison images. Real incident: CORE-3571 ServiceCards PR — Storybook screenshots ticked off as "matches Figma" without opening them; user noticed they were in a serif font.
- **Detect:** It's a discipline check, not a grep. Before opening a PR or marking a verification step complete:
  ```bash
  # For every screenshot you intend to embed in a PR body, open the file
  # (Read tool, or any image viewer) and look at it. Do this AFTER capture,
  # BEFORE upload + embed.
  ls -la .playwright-mcp/figma-*.png .playwright-mcp/impl-*.png  # confirm files exist + non-zero
  # Then for each pair (figma-XXX vs impl-XXX) at every viewport:
  #   Read both files
  #   Compare: font family, type sizes, spacing, color, layout
  ```
- **Fix:** In skill workflows that capture screenshots for PR comparison, the verification step is **"Read the file and visually diff against its Figma counterpart"**, not "screenshot saved successfully". The PR-body assembly step must be *gated* on having opened every embedded image. See `figma-update-component` Step 5c, `figma-to-component` Step 6, `pull-request-create` Step 4b — they now require explicit Read+compare before checking the box.

## `cn(positioning, widgetCard)` — tailwind-merge collapses `hidden` into `flex` on the same element

- **When it bites:** A slot/positioning class includes a responsive display utility (`hidden md:block`, `hidden lg:flex`) and is merged with a card-styling class that has a base `flex` or `block`. Tailwind-merge treats `hidden` and `flex` as the same display-utility category at the base scope and keeps the LAST one — `flex` wins, `hidden` is silently dropped. The element that was supposed to disappear at a breakpoint renders anyway, and the surviving `md:block` overrides `flex` at md+ via source order so the card's flex layout breaks too. Real incident: CORE-3557 follow-up PR #207 — `cn(threeWidgetSlot1, s.widgetCard)` where slot started with `hidden md:block` and `widgetCard` started with `flex items-center`. Cursor Bugbot caught it; screenshots happened to look fine because the rendered display fell back to `flex`-on-block which still produced a usable layout, but the mobile-hidden intent was lost.
- **Detect:**
  ```bash
  # Flag any cn()/clsx call in a block component that combines a class
  # string containing `hidden` (a responsive hide) with a sibling class
  # string containing a base `flex` or `block` — that's the conflict.
  git diff main...HEAD -- 'src/blocks/**/Component.tsx' \
    | grep -E '^\+.*\bcn\(' \
    | grep -E 'hidden' || true
  # If any hits, audit the merged class strings: does the OTHER side
  # contain a base `flex`/`block`/`grid`? If yes, this gotcha applies.
  ```
- **Fix:** Don't put responsive `hidden` on the same element as another display utility. Either:
  1. Move positioning + visibility to an outer wrapper, keep flex/grid/block on the inner element. tailwind-merge can't collapse classes that live on different elements.
  2. Use a JSX conditional render (`{!hideAtMobile && <Widget />}`) — server doesn't render at all when hidden.
  See [src/blocks/HeroServicesBanner/Component.tsx](src/blocks/HeroServicesBanner/Component.tsx) for the canonical wrapper pattern.

## Commit author email must match the rest of the branch — wrong email fails Vercel deploy checks

- **When it bites:** A commit is authored with an email the project's Vercel Git integration doesn't recognise (e.g. a harness `userEmail` service account instead of the developer's own `@bsqgroup.co.uk` address that every prior commit on the branch / main uses). Both Vercel deploy checks (`quality-company-formations`, `rapid-formations`) come back **FAILURE** with the GitHub `setting-your-commit-email-address` doc as their target URL — i.e. it's an author-email policy failure, not a build/code failure. Real incident: CORE-3471 PR #241 — a commit authored with the wrong account email; both Vercel checks failed instantly while Unit Tests passed.
- **Detect:**
  ```bash
  # The HEAD commit's author email must match the email used by the rest of
  # the branch / main. Compare before pushing.
  git log -1 --format='%ae'                       # HEAD author email
  git log origin/main -1 --format='%ae'           # expected email
  # If they differ, fix the author before pushing.
  ```
- **Fix:** Author commits with `-c user.email="<your-dev-email>" -c user.name="<your-name>"`, matching the address used by `git log origin/main -1 --format='%ae'`. If a wrong-email commit was already pushed, the clean fix is `git commit --amend --reset-author` + force-push — but force-push is gated, so the fallback is a follow-up commit authored with the correct email (Vercel re-checks the new HEAD). Do NOT rely on the global git config; pass `-c user.email` explicitly on every commit in this repo.

## Collapsed Figma's multi-tier desktop spacing into ONE CSS tier — read every breakpoint, map each to a tier

- **When it bites:** A responsive Figma token resolves to **different values across the desktop frames** (1024, 1280, 1800), but the CSS represents them with a **single tier** (`@media(min-width:1024px)` / `lg:` / `xl:` / `wide:`) that serves 1024px→∞. One value then ships for the whole range, so every viewport whose Figma value differs from that one is wrong — site-wide. The trap has two failure modes, and **picking any single frame as "the design" is the mistake** — the largest frame is authoritative *only for the largest tier*, not the whole range. Real incident: CORE-3575. The `--section-spacing` tokens resolve per breakpoint as: mobile `L56/XL64/XXL96` · tablet `L64/XL80/XXL112` · **1024 = 1280 `L80/XL96/XXL128`** · **1800 `L96/XL112/XXL144`**. The original `globals.css` had one `≥1024` tier carrying the **1800** values (`96/112/144`) — so 1024–1799 rendered one step **too large**. The closed PR #254 over-corrected by flattening `≥1024` to the **1280** values (`80/96/128`) — fixing 1024–1799 but breaking 1800. **Neither single value is right; the range needs two tiers.** (Also note: the published BSQ library variable *descriptions* say desktop = `96/112/144`, which is stale — they don't distinguish the 1024 tier from wide; the frames are the truth.)
- **Detect:**
  ```bash
  # When a spacing/size token lives in a CSS tier that spans MULTIPLE Figma desktop frames
  # (1024 / 1280 / 1800 all served by one ≥1024 media query), read EVERY frame and build the
  # full per-breakpoint table before writing one value:
  #   get_variable_defs on each of the 360 / 768 / 1024 / 1280 / 1800 frame nodes.
  #   (Fetch 1800 even if the ticket omits it — it's a sibling node of the desktop frames.)
  # If the value differs across the range a single CSS tier covers, you need a tier PER distinct
  # value — do NOT pick one frame (neither the largest nor a mid one) and apply it to the whole range.
  # Cross-check the implementation has a tier per distinct Figma value:
  grep -nE -- '--section-spacing-(l|xl|xxl)|min-width' src/app/\(frontend\)/globals.css
  #   Expect tiers at base / 768 / 1024 / 1800 (the project's `wide` breakpoint), not just up to 1024.
  ```
- **Fix:** Map **each distinct Figma breakpoint value to its own CSS `@media` tier.** For section-spacing the correct scale is base `<768` (XL=64) · `768+` (unchanged) · `1024+` `L80/XL96/XXL128` · `1800+` (`wide`) `L96/XL112/XXL144`. Two desktop tiers, because 1024–1799 and 1800+ genuinely differ in Figma. When frames disagree, that's not "one is the anomaly" — it's a real responsive step, and the CSS must reproduce it. The CMS token *names* per block are viewport-invariant and stay correct across both tiers; only the token *values* (globals) need the split. Global token-value changes are site-wide (all pages) → DS-owner sign-off, and update the stale library descriptions to match. Documented in [figma-update-component](skills/figma-update-component/SKILL.md) (Step 2) and [figma-to-component](skills/figma-to-component/SKILL.md) / qa-implementation.

## Removing a per-block `!leading-[…]` override assuming it only compensated for a broken token — over-corrects when the override was a real Figma per-breakpoint divergence

- **When it bites:** A design-system token fix lands (e.g. CORE-3721 / #261 fixed headline `lineHeight` tokens) and a block that previously carried `!leading-[…]` / `md:leading-[…]` / `wide:leading-[…]` overrides is rebased onto it. The assumption is "the override only existed to patch the old broken token, so it's now redundant — delete it." That is true ONLY for the breakpoints where the preset token now equals Figma. It is FALSE where the override was actually a CLAUDE.md-sanctioned per-breakpoint divergence (the preset's responsive curve genuinely doesn't match Figma at that one viewport). Deleting those over-corrects and reintroduces line-height drift — which then accumulates down a stacked list. Real incident: CORE-3619 PR #256 round-4 rebase — removed four overrides; `bigTitle`/`sectionHeading` removals were genuinely redundant (tokens now supply lh56/68), but `serviceLabel !leading-[28px]` (mobile: `body-lg` base = `text-base` lh24, Figma body-400 = lh28, -4px) and `detailValue wide:!leading-[32px]` (`headline-xl` has no `wide:` variant → stays `text-xl` lh28, Figma heading-100 wide = lh32, -4px × 3 cost rows → 12px cumulative drift) were real divergences and broke at the edge breakpoints.
- **Detect:** For EACH `!leading`/`leading-[Npx]` override you intend to remove, prove the preset token now equals Figma at the SAME breakpoint before deleting — don't reason "token was fixed, so all overrides are redundant":
  ```bash
  # 1. List the overrides being removed and the breakpoint each targets.
  git diff -- '*.styles.ts' | grep -E '^-.*(leading-\[|!leading)'
  # 2. For each, map the Text preset -> Tailwind text-* token at that bp (read Text.css),
  #    then read the token's lineHeight in tailwind.config.mjs, and compare to the Figma
  #    node's lineHeight AT THAT BREAKPOINT. Equal -> safe to remove. Differ -> KEEP it.
  ```
  Then verify live at every breakpoint (a probe span with `text text-<preset>` + the override-stripped className, computed `lineHeight` vs Figma per viewport) — the cumulative-drift check at the affected viewport must stay within tolerance.
- **Fix:** Keep (re-add) only the overrides whose preset token still diverges from Figma at that breakpoint; the CLAUDE.md per-breakpoint exception explicitly sanctions `md:leading-[Npx]` / `wide:!leading-[Npx]` when the preset's rendered size diverges from the Figma value at that viewport. Remove only the ones the token fix genuinely made redundant.

## Typography-only QA probe misses inter-element GAPS — a wrong container `gap-N` ghosts the overlay even when every element's own size matches

- **When it bites:** A line-height/font-size probe (measure each element's `fs/lh/fw` against Figma, no full-section overlay) returns "maxCumulativeDelta 0 — PASS", yet the rendered block still ghosts/doubles in the 50% Figma overlay, drifting **downward** from one point. The probe only checked each element's *own* box; it never measured the **gap above** each element (the container `gap-N` / margin). A single wrong container gap shifts that element and everything below it uniformly, which looks exactly like cumulative drift but is one structural mistake, not many line-height errors. Real incident: CORE-3619 PR #256 — the right pricing card ghosted from the price down; round-5 typography probe had passed (all lh/fs matched), but `priceGroup` collapsed price + service-label into one `gap-1` (4px) container where Figma's price-block gap is `gap-3` (12px, the *Service Type → Service Name* / *Description* container gap at every breakpoint). That −8px cascaded into every element below → whole-card downward ghost.
- **Detect:** When diagnosing overlay ghosting, measure `gapAbove` (= `el.top − prevEl.bottom`) for every element in document order, not just `fs/lh`, and join to the Figma per-element spec's container gaps. The FIRST element whose `gapAbove` (or own height) exceeds tolerance top-down is the root cause; if its own height matches Figma but the gap-above doesn't, the cause is the container `gap-N`/margin, not line-height. A typography-only matrix that reports "cumulative delta 0" is NOT sufficient evidence of overlay crispness — it cannot see gaps.
  ```bash
  # Pull the Figma container gaps for the subtree and grep the block's gap-* keys to compare:
  grep -nE "gap-(0\.5|1|2|3|4|5|6|8|10|12)|gap-\[" src/blocks/<Block>/<Block>.styles.ts
  # For each parent container in the Figma node tree, confirm its gap token == the live container's gap-N.
  ```
- **Fix:** Set the offending container's `gap-N` (or element margin) to the Figma value — always block-fixable, single string literal, Tailwind token (`gap-3` = 12px). Re-measure `gapAbove` down the whole column once; cumulative-Y delta must be flat within tolerance (±2px ≤768, ±4px >768). Build the overlay padding-inclusive / section-origin aligned to confirm the ghost is gone — never rely on a typography-only probe to declare an overlay crisp.

## `headline-*` preset font-WEIGHT diverges from Figma at small breakpoints — picking the preset by desktop value silently ships semibold where Figma wants bold

- **When it bites:** You pick a heading `textStyle` from the desktop (1800) Figma value per the CLAUDE.md rule, build, and it looks right at desktop/laptop — but the preset's `font-weight` is **not constant across breakpoints**. `headline-4xl` is `font-semibold` (600) at base + `md:`, and only `lg:font-bold` (700) from 1024px up. If the Figma node specifies **Bold at every breakpoint** (heading-4xl token = Bold at 360/768/1024/1800), the rendered heading is 600 at mobile + tablet and the divergence ships because the desktop check passed. Pure typography-size probes that only assert `fontSize`/`lineHeight` miss it too — you have to assert `fontWeight` per viewport. Real incident: CORE-3618 ContentWithPricingCard — both section H2s rendered `font-weight: 600` at 360px and 768px (Figma: Bold/700 at all bps); human QA caught it after the pre-PR gate passed.
  > Gate-escape: the `qa-implementation` gate's typography matrix asserted size/line-height but not `font-weight` per breakpoint, so the 600-vs-700 split at mobile/tablet slipped through. Tightening: add `fontWeight` to the per-viewport typography assertions for every heading element, compared against the Figma node's weight token AT THAT viewport (not just desktop).
- **Detect:**
  ```js
  // Drive the page to EACH breakpoint, then for every heading rendered with a
  // headline-* preset, compare computed fontWeight to the Figma node's weight
  // token at THAT viewport. headline-4xl below lg = 600; if Figma says Bold there,
  // it's wrong.
  Array.from(document.querySelectorAll('[class*="text-headline-"]')).map((h) => ({
    text: (h.textContent || '').trim().slice(0, 20),
    fontWeight: getComputedStyle(h).fontWeight,
    vw: window.innerWidth,
  }))
  // Static smell: a headline element whose Figma weight is Bold at all bps but whose
  // preset (see Text.css) only sets font-bold at lg: — and the className has no
  // `font-bold` of its own.
  ```
- **Fix:** When the Figma weight is constant across breakpoints but the preset's isn't, add the weight directly on the className so it applies at every breakpoint: `font-bold` (the preset's `lg:font-bold` is a no-op once an unprefixed `font-bold` wins, so no conflict). Do NOT switch presets — `headline-4xl` is the correct SIZE curve; only its low-breakpoint weight diverges. Verify computed `fontWeight === '700'` live at 360/768 (the breakpoints where the preset would otherwise emit 600).

## Section top/bottom padding is a CMS PRESET, not a style — a wrong preset ghosts the whole section on EVERY breakpoint

- **When it bites:** A block's outer vertical padding comes from the per-instance CMS field `sectionLayout.paddingTop` / `paddingBottom` (presets `none / xs / s / m / l / xl / xxl` → responsive px via `--section-spacing-*` in `globals.css`, applied by `SectionWrapper`). It is NOT a hardcoded `py-*` on the block. If the chosen preset doesn't match Figma's section spacing, the **entire** section's content sits uniformly too high/low by the same amount **on every breakpoint** — the 50% overlay ghosts top-to-bottom and reads as a catastrophic layout failure, when it is actually **one CMS-data fix**. Two traps follow: (a) "fixing" it with a `py-*` style override on the block (makes it inconsistent with every sibling using the same preset), and (b) mis-escalating it as an "accepted site-wide token deviation" when a different preset on this instance already expresses Figma's value exactly. Real incident: CORE-3618 ContentWithPricingCard — instance + config default were `s` (48/32/24) where Figma wanted `l` (80/64/56); ~16px uniform drift on all 5 breakpoints, briefly mis-escalated as a token deviation. `l` was a valid preset matching Figma exactly; the fix was selecting it in the CMS + updating the `config.ts` default. This is the FIRST thing to set in block creation/updates and the FIRST systemic cause to suspect in QA when all viewports ghost uniformly.
  > Gate-escape: a whole-section uniform offset was read as either a per-element drift or an unfixable token deviation, not as the wrong CMS padding preset. Tightening: when the overlay ghosts uniformly on every breakpoint, map Figma's section top/bottom padding to the preset whose px row matches at every tier and check the instance + config default against it BEFORE blaming inner gaps or escalating a token.
- **Detect:**
  ```bash
  # Surface the scaffold default for every block's section padding...
  grep -rnE "sectionLayoutField\(" src/blocks --include=config.ts -A2 | grep -nE "paddingTop|paddingBottom"
  # ...and confirm the LIVE instance value matches Figma (read the deployed/live render's
  # computed section padding and compare to the Figma section frame at each breakpoint):
  #   getComputedStyle(sectionEl).paddingTop / paddingBottom  vs  --section-spacing-* px
  #   ( l = 56/64/80/96 ; s = 24/32/48/48 ; mobile/tablet/desktop/wide )
  # A whole-section uniform top-to-bottom ghost on EVERY breakpoint == wrong preset, full stop.
  ```
- **Fix:** Select the preset whose `--section-spacing-*` px row matches Figma at every breakpoint, in BOTH places: the instance's `sectionLayout.paddingTop`/`paddingBottom` via the Payload API, and the `sectionLayoutField({ defaults: { paddingTop, paddingBottom } })` in `config.ts`. NEVER add a `py-*` override on the block, and never accept it as a "token deviation" without first confirming no preset matches (one almost always does). If genuinely no preset row matches Figma, ask how to proceed (add a token tier) — don't override.

## Full-bleed carousel/strip centred but narrower than the viewport — shows side margins instead of bleeding at ≥1800

- **When it bites:** A component meant to run edge-to-edge (full-bleed carousel, marquee, card strip) is built as a centred fixed-width cluster (`justify-center` of N cards). It only clips/bleeds while the cluster is wider than the viewport; once the viewport exceeds the cluster width (typically >~1600px — i.e. the `wide`/1800 frame) the cluster centres and leaves empty side margins, reading as "not full width". Scaling the card sizes *down* per breakpoint makes the cluster even narrower and worsens it. Verified at laptop/desktop only, the margins appear solely at ≥1800 and ship. Real incident: CORE-3524 — the bank-accounts carousel centred a ~1584px cluster (3 cards/side, sizes scaled down per breakpoint); at 1800 it sat centred with ~108px margins each side instead of cards bleeding to the edges. QA flagged "no longer full width at 1800px".
  > Gate-escape: the pre-PR gate verified the carousel at laptop/desktop, where the cluster still clipped; the margins only appear at ≥1800. Tightening: full-bleed components must be measured at the `wide` (1800) breakpoint specifically, asserting the outermost content **clips** (negative left/right gap), not just "looks centred".
- **Detect:**
  ```js
  // Drive the page to 1800 (the `wide` frame), then measure the strip's outermost
  // children: a full-bleed strip must OVERFLOW the viewport (clip at both edges),
  // not sit centred with margins.
  const strip = document.querySelector('<card-strip-selector>') // the flex row of cards
  const cards = [...strip.children]
  const first = cards[0].getBoundingClientRect()
  const last = cards[cards.length - 1].getBoundingClientRect()
  ;({ leftGap: Math.round(first.left), rightGap: Math.round(window.innerWidth - last.right) })
  // Full bleed => leftGap < 0 AND rightGap < 0 (outermost cards clipped).
  // leftGap/rightGap > ~24px at 1800 == centred-with-margins bug.
  ```
  Static smell:
  ```bash
  # A carousel/strip styled `justify-center` with a FIXED card count and no mechanism
  # to exceed the largest viewport width will margin at >=1800.
  git diff main...HEAD -- 'src/blocks/**/*.styles.ts' | grep -E '^\+.*justify-center' || true
  ```
- **Fix:** Make the strip intrinsically wider than the largest supported viewport so it always overflows and clips — render enough fixed-size cards each side (e.g. 4) that the outermost clip at the edges, keep the featured/centre item centred, and let a full-width `overflow-x-hidden` wrapper do the clipping. Don't scale card sizes down per breakpoint when the design uses fixed-size cards + clip. See `BusinessBankAccounts` (CORE-3524): fixed 180×113 side / 280×176 featured cards, 4 per side, `justify-center` inside a `w-full overflow-x-hidden` wrapper; verified at 1800 that the outer cards clip (negative left/right gap).

## Ported font-size copied from the wrapper's SCSS rule, when a child `<p>` is what actually paints

- **When it bites:** A section ported from the legacy Gatsby site comes out a few px short per item and the columns don't line up with the source, even though the styles file matches the source stylesheet line for line. The legacy SCSS sets the size on a *wrapper* (`&__body { font-size: 18px }`), but the copy is rendered through Markdown/rich text into a child `<p>`, and a global paragraph rule wins on that child (20px/30px). The wrapper's declared size never paints. Reading the stylesheet — normally the fix for a bad port — is what introduces this defect, so it survives a careful review. Real incident: `UniqueSellingPoints` was measured correctly at 20px, then "corrected" to 18px on the authority of `UniqueSellingPoints.scss`, making every item 6px shorter than the source (219 vs 225 at 1440).
- **Detect:**
  ```js
  // On the SOURCE page: for the section's text wrapper, compare its own computed
  // font-size against the element the text is actually in. A mismatch means the
  // wrapper's rule is dead and the child's value is the one to port.
  const wrapper = document.querySelector('<section-body-selector>')
  const leaf = wrapper.querySelector('p, li, td') || wrapper
  ;({
    wrapper: getComputedStyle(wrapper).fontSize + '/' + getComputedStyle(wrapper).lineHeight,
    painted: getComputedStyle(leaf).fontSize + '/' + getComputedStyle(leaf).lineHeight,
  })
  // wrapper !== painted  ==>  port the `painted` value, not the SCSS one.
  ```
  Static smell — a ported size that came from a wrapper rule over a rich-text field:
  ```bash
  # Any legacy SCSS rule setting font-size on a *__body / *__content / *__description
  # wrapper is a candidate; confirm against the rendered child before porting it.
  grep -rn -B2 'font-size' <source-repo>/src/components/**/*.scss \
    | grep -E '__(body|content|description|text)\b' || true
  ```
- **Fix:** Take typography from the element the text is literally in, measured live — not from the wrapper's rule. Use the stylesheet for *which property produced the value and at which breakpoints*, and the measurement for *what the value is*. When they disagree, walk the subtree and compare each node's computed size against its parent's; a child that differs from its wrapper is the tell. See `UniqueSellingPoints.styles.ts`, where the `description` key carries a comment recording exactly this.

## Ported type renders heavier than the source — `-webkit-font-smoothing` not carried across

- **When it bites:** A ported section matches the legacy site on every measured property — font-family, font-size, line-height, font-weight, colour, and every box in the child stack — and the text still looks noticeably bolder/darker than the source side by side. The legacy site sets `-webkit-font-smoothing: antialiased` (which renders lighter on macOS); the target inherits the browser default `auto`/`subpixel-antialiased`, which renders heavier. **No computed property reports a difference** — both sides say `font-weight: 400` — so a property table, a child-stack comparison and a completeness check all pass. It is only visible in a pixel diff of the two renders. Real incident: `UniqueSellingPoints` at 1440 was 2.24% different across 35 regions with every measurement matching; adding the smoothing declaration took it to 0.01% and zero regions.
- **Detect:**
  ```js
  // Run on BOTH pages and compare. Any mismatch means the ported type will
  // render at a different visual weight regardless of the CSS matching.
  ;({
    body: getComputedStyle(document.body).webkitFontSmoothing,
    section: getComputedStyle(document.querySelector('<section-selector>')).webkitFontSmoothing,
  })
  // source "antialiased" vs target "auto"  ==>  carry it across.
  ```
  Static smell:
  ```bash
  # The legacy repo sets it somewhere; the port usually does not.
  grep -rn "font-smoothing" <source-repo>/src --include='*.scss' --include='*.css' | head
  grep -rn "font-smoothing" src/app/\(frontend\)/globals.css || echo "NOT SET IN TARGET"
  ```
- **Fix:** Carry `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;` across, **scoped to the ported sections** — not globally, which would change the rendering of every untouched page in the app. In this repo it lives on the `.font-legacy-condensed` utility in `src/app/(frontend)/globals.css`, alongside the legacy font stack, so it applies exactly where the legacy type does. Verify with `diff-screenshots.mjs` before and after; this is the one class of difference that only a pixel diff can confirm.

## A section ported from desktop measurements is actually a carousel at mobile

- **When it bites:** A legacy section is measured, ported and verified at desktop, where every check passes — the property table matches, the completeness diff is clean, the screenshot diff is at zero. The section is signed off as a static grid. It is a carousel below some breakpoint: `pure-react-carousel`/`react-glider` render **all** slides into the DOM and lay them out in a row, so at 1440 a four-slide carousel at rest is indistinguishable from a four-column grid. The dot controls and the clipping only appear at the narrow widths nobody measured. Real incidents, twice: `UniqueSellingPoints` (caught before authoring) and `FourSteps` (**not** caught — ported as a static four-up grid, signed off, and only found weeks later by a full-page sweep; it shows 1 of 4 slides at 390px with dot controls up to 1023).
- **Detect:**
  ```bash
  # The gate, per section, BEFORE authoring — it sweeps the source's own breakpoints.
  SOURCE_REPO=<source-repo> node ~/.claude/skills/gatsby-section-to-payload-block/scripts/detect-behaviour.mjs \
    "<source-url>" "TEXT:<a line of the section's copy>"
  # Non-zero exit = behaviour found = STOP AND ASK.

  # And once per project, over EVERY section — this is what caught FourSteps:
  node ~/.claude/skills/gatsby-section-to-payload-block/scripts/list-sections.mjs \
    "<page-url>" --target <target-url> --repo <source-repo>
  ```
  Static smell — the legacy repo's dependencies name the library outright:
  ```bash
  grep -E 'carousel|slider|glider|swiper|slick|embla|splide|flickity' <source-repo>/package.json
  ```
- **Fix:** Run the gate before authoring, and the sweep before starting the project — a per-section flow structurally cannot catch a section nobody thought to re-examine. When behaviour is found, it is a **product decision, not a styling one** (it changes the CMS schema, turns a server component into a client one, and carries a11y obligations): put it to the user as build / ship static / ticket it, and record the answer in `decisions` in `.port-source-facts.json`. A substitution the user chose is fine; one they find out about later is a defect.

## `sectionLayout: 'light'` renders DARK — the theme is dark-first

- **When it bites:** A section that is plainly white on the legacy site is ported with `background: 'light'`, because that is what "a white band" sounds like. It renders dark navy, and every `--text-on-light-*` colour on it becomes near-invisible against it. In this theme `--surface-primary` (which `'light'` maps to) is `rgb(42 42 67)` and `--surface-canvas-inverse` (which `'inverse'` maps to) is `rgb(255 255 255)` — the names are relative to the dark-first base, not to the ink. Real incident: `CaseStudyMosaic` shipped with its heading at `--text-on-light-base` (dark grey) on a dark navy band; every geometry and typography check passed, because the heading colour matched the source exactly — only the band behind it was wrong.
- **Detect:**
  ```bash
  # What the three options actually resolve to in the active theme.
  grep -n -- "--surface-primary:\|--surface-canvas:\|--surface-canvas-inverse:" "src/app/(frontend)/globals.css"
  ```
  ```js
  // Live, on the rendered block — the pair must contrast.
  const el = document.querySelector('<section-selector>')
  ;({ band: getComputedStyle(el).backgroundColor, ink: getComputedStyle(el.querySelector('h2')).color })
  ```
- **Fix:** Take the band from the SOURCE's measured `backgroundColor`, not from the option's name. White source band → `'inverse'`; dark source band → `'light'` or `'dark'`. `UniqueSellingPoints.styles.ts` is the reference: it uses `bg-[var(--surface-canvas-inverse)]` for exactly this reason. A property comparison cannot catch this, because both sides' ink matches — it is only visible in a render.

## `Media` keeps its wrapper in flow, so `fill` does not take it out of the layout

- **When it bites:** A block puts `<Media resource={...} fill />` inside a flex or grid container expecting it to sit behind the content, as a CSS background would. `Media` renders an outer `<div>` (its `htmlElement` prop, default `'div'`) around a `<picture>` around the `<img>`, and `fill` absolutely positions only the **img**. The outer div stays a normal flex/grid child, takes real width, and displaces everything after it. Real incident: the B Corp banner caption sat 215px from the section's left edge against the source's 48px; every typographic property matched, so the property check said OK. Putting the class on `pictureClassName` instead styles the wrong element and moves the offset rather than fixing it (215px → 259px).
- **Detect:**
  ```js
  // The named element's offset from the section box, both sides. They must match.
  const root = document.querySelector('<section-selector>')
  const el = root.querySelector('<child-selector>')
  const r = el.getBoundingClientRect(), rr = root.getBoundingClientRect()
  ;({ left: Math.round(r.left - rr.left), right: Math.round(rr.right - r.right) })
  ```
  ```bash
  # Any Media with `fill` inside a flex/grid parent is a candidate.
  grep -rn -B4 "fill$" src/blocks/**/Component.tsx | grep -A4 "flex\|grid"
  ```
- **Fix:** Pass the positioning on `className` — that is the OUTER div — e.g. `className="absolute inset-0"`. Then the img's `fill` resolves against it and nothing is left in flow. Note the source usually paints these as a CSS `background-image`, which never affects flow at all, so there is no equivalent element to compare against and the diff will not be obvious.

## The block may already exist and simply not be on the page

- **When it bites:** A section is picked off the port menu as new work and authored from scratch, when the repo already contains a finished, registered block for it. `list-sections.mjs` derives "ported" from the **target page's rendered text**, so a block that exists in `src/blocks/`, is registered in the Pages collection and in `RenderBlocks`, but is on no CMS page, reads as `— missing`. Real incident: the sp-rapid home hero was offered as unported section #2; `LandingHero` already implemented all of it — headline, benefits, the name-check form with live API and result states, review cards and the eight bank tiles — and was registered in both places. Authoring `HomeHero` would have shipped a duplicate block and a second CMS schema for the same section.
- **Detect:**
  ```bash
  # Before authoring ANY block: does something already cover this section?
  ls src/blocks/ | grep -i "<keyword>"
  grep -rn "<keyword>" src/blocks/RenderBlocks.tsx src/collections/Pages/index.ts
  ```
  ```bash
  # Registered blocks that are on no page at all — candidates for exactly this trap.
  comm -13 \
    <(curl -sk "https://localhost:3000/api/pages?limit=200&depth=0" | python3 -c "import json,sys;print('\n'.join(sorted({b['blockType'] for p in json.load(sys.stdin)['docs'] for b in (p.get('layout') or [])})))") \
    <(grep -oE "^  [a-zA-Z]+:" src/blocks/RenderBlocks.tsx | tr -d ' :' | sort -u)
  ```
- **Fix:** Populate and correct the existing block. Read its styles file first — its comments record decisions that may have been made against a different design or at one viewport, and those are the parts most likely to be wrong (see the next entry).

## A comment explaining why something was omitted is not evidence, and may be a one-viewport conclusion

- **When it bites:** A styles file documents a deliberate omission — "the source has X but it never paints, so it is not carried across" — and the note is taken at face value on a later pass. The reasoning behind it was sampled at ONE viewport. Real incident: `LandingHero.styles.ts` recorded the source's `rgba(0,0,0,0.45)` hero overlay as dead markup because reproducing it gave `rgb(21,51,124)`, "far too dark" against a desktop sample of raw blue. The source sets that overlay to `opacity: 0` **only from the md breakpoint**; below 768 it paints at full strength and `rgb(21,51,124)` is precisely what the live site shows. The hero shipped ~30% too bright on every phone, and no check caught it — a property comparison agrees when the element is simply absent from both sides.
- **Detect:**
  ```js
  // Re-derive the claim at EVERY breakpoint before trusting it. Computed style
  // and painted pixel, either side of each source breakpoint.
  for (const w of [390, 767, 768, 1023, 1440]) { /* setViewport, then: */ }
  const ov = document.querySelector('[class*="overlay"]')
  ;({ opacity: getComputedStyle(ov).opacity, bg: getComputedStyle(ov).backgroundColor })
  ```
  ```bash
  # Omission notes in styles files are all candidates for re-checking.
  grep -rn "never paints\|not carried across\|dead markup\|deliberately not" src/blocks/**/*.styles.ts
  ```
- **Fix:** Treat every such note as a claim with a viewport attached. If the note does not say which widths it was verified at, re-measure across the source's own breakpoints before relying on it — and when you confirm or correct it, write the widths into the comment so the next pass does not have to guess.

## A bot-check token that gates a submit button disables it wherever the key is unset

- **When it bites:** A form's submit button is disabled until a Turnstile/reCAPTCHA token arrives. Where the site key env var is not configured the widget renders nothing at all, so the token never arrives and the button is disabled **forever** — the feature fails closed instead of degrading. Real incident: the hero's Search button, the section's primary CTA, rendered permanently greyed on every environment without `NEXT_PUBLIC_TURNSTILE_SITE_KEY`; it looked like a styling bug (blue instead of the brand green) rather than a dead control.
- **Detect:**
  ```js
  // On the rendered page — a submit that is disabled with an empty form is suspect.
  const b = document.querySelector('button[type="submit"], button[aria-label*="Check"]')
  ;({ disabled: b?.disabled, bg: b && getComputedStyle(b).backgroundColor })
  ```
  ```bash
  # Any disabled= that depends on a captcha token.
  grep -rn "disabled=.*[tT]oken\|!isReady" src/ --include=*.tsx
  ```
- **Fix:** Gate on the token only when the provider is actually configured — expose an `isEnabled` flag from the hook and use `!isEnabled || token !== null`. Verify the button's computed `background-color` against the source, not just its geometry: a disabled variant keeps its box and only changes colour, so a size-and-position check passes.

## Tailwind's `lg:` is 1024, but the legacy site breaks at 1023 — the two are not the same breakpoint

- **When it bites:** A port transcribes a source media query as the nearest Tailwind prefix, and 1023 becomes `lg:`. Tailwind's `lg` is `min-width: 1024px`, so **at exactly 1023px the source has switched and the port has not** — the layout is a full breakpoint behind in a 1px-wide band. It reads as a rounding error and is easy to wave through, but the legacy SCSS uses `lg: 1023` as a real, deliberate stop and several sections change column count there. Real incident: `FourSteps` used `lg:grid-cols-4` and `lg:block` for the chevrons; at 1023 the source showed four columns with chevrons and the port showed two columns with none. Third time this project has hit it — `min-[1023px]:` is now the house form for anything transcribed from the source's `lg`.
- **Detect:**
  ```bash
  # Any lg:/xl: in a ported block is suspect — the source's stops are 1023 and 1200,
  # neither of which is a Tailwind breakpoint.
  grep -rn "\blg:\|\bxl:" src/blocks/**/*.styles.ts
  # What the source actually declares:
  grep -rn "1023\|1200\|1590" <source-repo>/src/**/*.scss | head
  ```
  ```js
  // Compare the two sides at the boundary itself, not at round widths.
  for (const w of [1022, 1023, 1024, 1199, 1200]) { /* setViewport, compare */ }
  ```
- **Fix:** Use the arbitrary-value form for every source-derived stop: `min-[1023px]:`, `min-[1200px]:`. Only use `lg:`/`xl:` when the value genuinely is the Tailwind one. Sweep at the source's breakpoints **and one pixel either side** — a sweep at 1024 alone agrees with a port that is wrong at 1023.

## Tailwind preflight zeroes the `<p>` margins the source was relying on for spacing

- **When it bites:** A section is measured on the source, the gaps look like they come from flex `gap` or the wrapper's padding, and the port reproduces those. But the source ships **no CSS reset**, so its `<p>` still carries the UA's `1em` top and bottom margin, and part of every vertical gap is that margin. Tailwind's preflight sets `margin: 0` on everything, so the port loses spacing that was never written down anywhere — it is absent from the stylesheet because nobody authored it. Real incident: `FourSteps` step bodies collapsed against their titles and CTA; the missing space was the UA `<p>` margin, restored as an explicit `mt-2 mb-4`.
- **Detect:**
  ```js
  // On the SOURCE — is any of this gap actually a UA margin?
  const p = document.querySelector('<section-selector> p')
  const cs = getComputedStyle(p)
  ;({ mt: cs.marginTop, mb: cs.marginBottom, sheet: p.style.marginTop || '(from UA)' })
  ```
  ```bash
  # A ported block with no vertical margin on its text nodes, where the source has <p>s.
  grep -rn "description\|content\|body" src/blocks/<Name>/*.styles.ts
  ```
- **Fix:** Measure the **computed** box of source text nodes (`marginTop`/`marginBottom`), not just the stylesheet, and carry any non-zero UA margin across as an explicit Tailwind class. This applies to `<ul>`/`<ol>`/`<h1>`–`<h6>`/`<blockquote>` equally — anything preflight flattens.

## A scrim in the source markup can be dead CSS the image loader fades out

- **When it bites:** A source section has an overlay element with a real background colour in its stylesheet, so the port faithfully reproduces it — and ships a section visibly darker than the original. `gatsby-background-image` animates its `::before`/`::after` layers to `opacity: 0` once the full image has loaded, so the scrim declared in the SCSS never actually paints on a warm page. Reading the stylesheet says "there is a scrim"; the live pixels say there is not. Real incident: `BCorpCertification` carried a scrim the source does not paint. Note this is the **exact inverse** of the `LandingHero` case above, where an overlay that looked dead at desktop paints at full strength below 768 — which is why neither the stylesheet nor a single sample settles it.
- **Detect:**
  ```js
  // Sample the PAINTED pixel on the source, on a fully-loaded page, at several widths.
  // The computed opacity of the pseudo-element is the tell.
  const el = document.querySelector('[class*="background"], [class*="overlay"]')
  getComputedStyle(el, '::before').opacity   // '0' => the scrim is dead
  ```
  ```bash
  grep -rn "gatsby-background-image\|BackgroundImage" <source-repo>/src | head
  ```
- **Fix:** Decide from sampled pixels on a loaded page across the source's breakpoints, never from the stylesheet alone. When you drop or keep a scrim, record **which widths you sampled** in the styles-file comment, and put the call in `.port-source-facts.json` under `decisions` — it is a judgement about the design, not a fact about the code.

## `Text` renders NOTHING without a `text` prop — `asChild` with children silently swallows the subtree

- **When it bites:** You need a wrapper element that `Text` cannot express directly — a heading containing a link, an element with mixed inline content — so you reach for `asChild` and put the content in as children instead of passing `text`. But `Text`'s first line is `if (!text || text.length === 0) return null`, and it runs **before** `asChild` is considered. The whole subtree disappears. Nothing errors, nothing typechecks red (`text` is optional), the layout still looks plausible because the surrounding box has a `min-height`, and the block ships with content missing. Real incident: `<Text textStyle="span" className={s.packageName} asChild><h3><Link>{pkg.name}</Link></h3></Text>` removed the package name — Basic / Privacy / All Inclusive — from **every card**, in SSR HTML and live DOM, at every width. It survived a full verification round because the checks compared boxes that were still the right size.
- **Detect:**
  ```bash
  # asChild with no text prop on the same element is the shape that fails.
  grep -rn "asChild" src/ --include=*.tsx -A3 | grep -B1 -A3 "asChild" | grep -L "text="
  # Better: every asChild use, read each one.
  grep -rn "asChild" src/blocks/ --include=*.tsx
  ```
  ```js
  // On the rendered page — does the copy actually exist?
  document.querySelector('#package-grid h3')?.textContent   // '' or null => swallowed
  ```
- **Fix:** Pass `text`. When you need a link, use `Text`'s own `href` prop (`<h3 className={s.name}><Text text={name} href={href} className="text-inherit" /></h3>`) — it renders a `next/link` with the class list applied, and an inline `a` inside a block `h3` is usually what the source does anyway. Only use `asChild` for a genuinely custom child (a `motion.div`, a `next/link` you must configure), and always alongside `text`. **After any change to how copy is rendered, assert the copy is present** — `check-completeness` catches this; a geometry comparison does not.

## A `mt-*` on the next element does not add to the previous element's `mb-*` — it collapses

- **When it bites:** Two stacked blocks each get a vertical margin — a grid with `mb-[25px] md:mb-[35px]` and the footer under it with `mt-10` — on the assumption the gap is the sum, or that the later one wins. Adjacent vertical margins **collapse to the larger of the two**, so the rendered gap is `max(25, 40) = 40` and `max(35, 40) = 40`, not 25 and 35. The desktop value happened to be `max(45, 40) = 45` and was correct, so the bug looked like "mobile spacing is slightly off" rather than "these two rules are fighting". Real incident: `packageGrid`'s grid→compare-button gap was +15 at 390 and +5 at 768, the second-largest contributor to that section's height error.
- **Detect:**
  ```js
  // Measure the GAP between boxes, never trust the computed margin — a collapsed
  // margin still computes as its declared value and will lie to you.
  const gap = (a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().bottom
  ```
  ```bash
  # Both halves of a collapsing pair, in one file.
  grep -rn "mb-\[\|mb-[0-9]" src/blocks/<Name>/*.styles.ts
  grep -rn "mt-\[\|mt-[0-9]" src/blocks/<Name>/*.styles.ts
  ```
- **Fix:** Put the gap on **one** side only and delete the other. Where both really are needed, break the collapse deliberately (a flex/grid parent with `gap`, `overflow-hidden`, or padding on the container) and say so in a comment. Always verify spacing by measuring rendered box-to-box distance at every breakpoint — the declared value and the painted gap are different numbers.

## A page renders `undefined` while the API returns the data — it's `.next/cache`, not the schema

- **When it bites:** You change a block's or global's Payload schema, write new content, and the page renders `undefined` in every new field. `/api/globals/<slug>` returns all of it correctly, so the data is fine and the component is fine. Restarting the dev server does NOT fix it, which sends you hunting for a schema or HMR problem. The cause is `unstable_cache` (see `src/utilities/getGlobals.ts`): Next's **data cache lives in `.next/cache` and survives a restart**, so the entry captured before the schema changed is still being served. Real incidents: the footer global rendered `undefined` seven times with 7 links where the source has 51; then the header shipped with zero dropdown panels and every dropdown-bearing nav item ~21px narrow, because the CMS write landed after the previous cache clear.
- **Detect:**
  ```bash
  # If these disagree, it is the cache. The API bypasses unstable_cache.
  curl -sk "https://localhost:3000/api/globals/footer?depth=0" | head -c 400
  ```
  ```js
  // On the page — new fields missing while old ones render is the tell.
  document.querySelector('footer')?.textContent.includes('undefined')
  ```
- **Fix:** Stop the dev server, `rm -rf .next`, restart. Do this after **every** CMS write that follows a schema change, not just the first — a later write re-poisons a cache you already cleared. Do not add a scratch `revalidateTag` route to work around it; one was left behind in `src/app/(frontend)/next/` and became the repo's only typecheck error.

## Every block passes its own checks and the page still looks wrong — nothing owns the space between blocks

- **When it bites:** You port a page block by block, verify each one against its source section, and every check passes. Then someone puts the two full-page screenshots side by side and the port is obviously wrong: different spacing between every block, colour bands the source does not have, sections missing. Every verification in the block flow — completeness, headings, property/geometry, pixel diff — is scoped to **one block's root selector**, so the gap between two blocks (which belongs to neither), the page canvas (behind everything, inside nothing), and a section that was never built (no block to point a check at) are all structurally invisible to it. Real incident: six blocks each verified against the Gatsby source, on a page whose `<body>` was `#040429` where the source's is `#ffffff` — every inter-block margin painted a navy band, and `bCorpCertification` asked `SectionWrapper` for `background: 'light'`, which maps to `--surface-primary` (navy in this theme) and rendered navy against the source's white.
- **Detect:**
  ```bash
  # The whole-page check. Run it after EVERY block lands, not once at the end.
  node ~/.claude/skills/gatsby-section-to-payload-block/scripts/compare-page.mjs \
    "http://localhost:8000/" --target https://localhost:3000 --path / \
    --widths 390,768,1440 --out ./page-compare
  ```
  ```js
  // The one-line version: the canvas is the highest-leverage single value.
  getComputedStyle(document.body).backgroundColor
  ```
- **Fix:** Match the source's page canvas first — it repaints every gap at once. Then check each block's `sectionLayout.background` actually resolves to the colour you meant: this repo's theme is dark-first (seeded from the public-brand codebase) while the site being cloned is light, so `light` → `--surface-primary` is **navy** and `inverse` → `--surface-canvas-inverse` is white. Then open the side-by-side crops the script writes — the measured table cannot see a wrong icon, a lost radius, an image at a different zoom or type a shade off, and those are the differences that ship.

## A decorative icon where the source has a control

- **When it bites:** An icon is ported as an `aria-hidden` `<svg>` because that is what it looks like in a screenshot at rest — but on the source it is a `<button>` that reveals a tooltip, expands a row or opens a panel. The port is pixel-identical and a whole feature is gone, along with the copy inside it, which was never extracted because it is not in the DOM until the control is used. Every at-rest check agrees: the geometry matches, the pixel diff is at zero, and the completeness sweep compares text neither side is showing. Real incident: `PackageGrid` shipped 22 decorative info discs where the source has 22 tooltip triggers, one per package feature; 22 titled explanations were absent from the CMS entirely, and only the interaction sweep's control count disagreed.
- **Detect:**
  ```bash
  # Every aria-hidden icon in a changed block component. Each one is a claim that
  # the SOURCE node is decorative — confirm that claim before accepting it.
  git diff main...HEAD --name-only -- 'src/blocks/**/*.tsx' | while read -r f; do
    grep -nE 'aria-hidden' "$f" 2>/dev/null \
      | grep -iE 'svg|icon|disc|chevron|arrow|plus|caret' \
      | sed "s|^|$f:|"
  done
  ```
  ```js
  // On the SOURCE page, for the list the icon sits in: are those icons controls?
  const list = document.querySelector('<feature-list-selector>')
  ;({
    controls: list.querySelectorAll('button, [role="button"], [tabindex="0"]').length,
    firstTag: list.querySelector('svg')?.closest('button, a') ? 'BUTTON/LINK' : 'decorative',
  })
  // controls > 0  ==>  port the behaviour, not just the glyph.
  ```
- **Fix:** Read the source node's **tag** before copying its appearance — `svg.closest('button, a')` on the source settles it in one line. When it is a control, port it as one: extend the repo's existing tooltip/disclosure rather than adding a decorative substitute (see the next entry), add the CMS field the revealed copy needs, and populate every instance from the source by hovering or clicking each trigger. `verify-interaction.mjs` is the check that catches this; a property table, a pixel diff and a completeness sweep all pass on a control rendered as a picture. See `src/blocks/PackageGrid/Component.tsx` + `src/components/shared/InfoTooltip`.

## Extending a shared component beats forking it

- **When it bites:** A block needs a slight variant of something that already lives in `src/components/shared/` — a tooltip that takes plain text instead of rich content, a card with one extra slot — and the quickest path is a new component inside the block folder. The repo then carries two implementations of one concept that drift apart: a fix, an a11y attribute or a token change lands on one and not the other, and the next block picks whichever it finds first. The forked copy is usually a strict subset of the shared one, so nothing was gained. Real incident: `PackageGrid` needed a plain-text tooltip with a custom icon; `src/components/shared/InfoTooltip` already did everything else and two optional props (`text`, `icon`) closed the gap — a block-local copy would have been the repo's third tooltip.
- **Detect:**
  ```bash
  # Every component file ADDED under src/blocks — does a shared component already
  # own that role? A name collision on the role word is the reliable tell.
  git diff main...HEAD --name-only --diff-filter=A -- 'src/blocks/**/*.tsx' | while read -r f; do
    for role in Tooltip Card Carousel Accordion Modal Dialog Tabs Badge Popover Slider Table Select Input Separator; do
      case "$(basename "$f")" in *"$role"*)
        [ -e "src/components/shared/$role" ] \
          && echo "$f duplicates src/components/shared/$role — extend it instead" ;;
      esac
    done
  done
  ```
  ```bash
  # Weaker but catches renames: a new block-local component whose markup matches
  # a shared one. Read both before adding the second implementation.
  ls src/components/shared/
  ```
- **Fix:** Add an **optional** prop to the shared component and default it to today's behaviour, so every existing call site is untouched and the new one is a one-line difference. If the shared component cannot be adjusted at the call site, that is the actual defect — a component that cannot be varied gets copied instead of used, and the copy is what ships. `InfoTooltip` is the reference: `text` and `icon` were added for `PackageGrid` and every prior caller (`ComparePackages`, `WhatsIncludedSinglePackage`, `PackageCard`) kept working unchanged.

## The `<head>` belongs to no block

- **When it bites:** A page is ported block by block, every block is verified against its source section, and the page's `<head>` never gets written — no title, no meta description, no canonical, no structured data. None of it belongs to a block and none of it paints, so no block-scoped check can point at it and no screenshot diff can see it. It is the same structural blind spot as the inter-block spacing and the page canvas: nobody's job by construction. Two variants are worse than missing — a canonical or `og:url` copied verbatim from the source tells every crawler the legacy domain is the real one, and JSON-LD copied as a string carries the old domain, phone number and prices while still parsing cleanly. Real incident: this port reached nine ported blocks before anyone read the source's head; the source emits six JSON-LD types and the port emitted none, and the starter template's `/website-template-OG.webp` was still the share image on every page.
- **Detect:**
  ```bash
  # Run after EVERY block lands, not once at the end.
  curl -sk https://localhost:3000/ | grep -c 'application/ld+json'
  curl -sk https://localhost:3000/ | grep -oE '<title>[^<]*</title>|<meta name="description"[^>]*>|rel="canonical" href="[^"]*"|og:image[^>]*'
  # Same three greps on the source, then compare COUNTS and VALUES:
  curl -s http://localhost:8000/ | grep -c 'application/ld+json'
  ```
  ```bash
  # The whole check, including the canonical-points-at-the-source trap:
  node ~/.claude/skills/gatsby-section-to-payload-block/scripts/check-seo.mjs \
    "http://localhost:8000/" --target https://localhost:3000 --path /
  # Non-zero exit = a tag the source has is missing/empty on the port, or the
  # canonical/og:url still points at the SOURCE origin.
  ```
- **Fix:** Run the head check after every block, not at the end of the port — it is cheap and it is the only check that sees the head at all. Build the structured data from **real data** (globals, block content, the page's SEO meta), never as a copied string: in this repo `src/components/StructuredData` derives Organization/LocalBusiness from the Footer global and HowTo from the `fourSteps` block, so the JSON-LD cannot go stale against the page. Leave a type out rather than fabricate it — an `FAQPage` for questions the page does not render is worse than the failing check, and the failing check is what makes the gap visible when the block finally lands. Record every deliberate head difference (title suffix, an absent type) in `decisions` in `.port-source-facts.json`, so the next run's notes are expected rather than alarming.

## An unbroken token an editor can type overflows the viewport — and `break-words` is not enough on a flex item

- **When it bites:** Every CMS text field is a place someone can paste an email address, a URL or a long product code, and none of them wrap. The block is verified against the one string the source page happens to contain — which always wraps, because a human wrote it — so the check passes and the defect ships. It surfaces at 390 only, on content nobody has typed yet. Real incident: content-variance stories on `RegisterCtaPanel` and `RegisteredOfficeAddress` put the section's `scrollWidth` at **1309** and **894** inside a 390 box, with the CTA anchor starting at **x −65.41** — off the left edge of the screen. Every existing check was green: the property tables matched, the pixel diff matched, the source comparison matched. The subtlety is that adding `break-words` to the button did **not** fix it — a flex item's automatic minimum size is its *min-content* width (519px here), so the item is forced past its column no matter how the text inside wraps. `overflow-wrap: break-word` does not reduce min-content; only `anywhere` does.
- **Detect:**
  ```bash
  # Any element wider than the viewport, at the width where it bites:
  node -e 'const{chromium}=require("playwright");(async()=>{
    const b=await chromium.launch({args:["--ignore-certificate-errors"]})
    const c=await b.newContext({ignoreHTTPSErrors:true,viewport:{width:390,height:900}})
    const p=await c.newPage();await p.goto(process.argv[1],{waitUntil:"domcontentloaded"})
    console.log(await p.evaluate(()=>({page:document.documentElement.scrollWidth,
      over:[...document.querySelectorAll("body *")].filter(n=>n.getBoundingClientRect().right>innerWidth+1||n.getBoundingClientRect().left<-1).map(n=>n.tagName+"."+n.className).slice(0,10)})))
    await b.close()})()' "https://localhost:3000/"
  ```
- **Fix:** `break-words` on every heading, paragraph and inline link that renders CMS text — and `[overflow-wrap:anywhere]` on anything that is a **flex item** (buttons, CTAs, cards in a row), because only `anywhere` reduces the min-content contribution that sets the item's automatic minimum size. `PackageGrid` is the reference. Then add the case to the story: an unbroken token in every editable field is one of the two mandatory content-variance variants (the other is the longest plausible string in the narrowest column at 390) — see the skill's `reference/story.md`. Fix it in the block, never by shortening the story's copy.

## A `{' '}` outside the guard that produces it leaves an orphan space when the value is blank

- **When it bites:** Conditional content is written as `{value && <Link/>}` with the separator space sitting outside the guard — `…please call{' '}{phone && <Link/>}.` — so when the optional value is absent the space survives and the sentence renders `…for this campaign .` with a gap before the full stop. It is one character, it never appears in the source page (which populates the field), and no property table, pixel diff or geometry check reports it: the boxes are identical to within a rounding error. It is only visible by reading the rendered string. Real incident: `RegisterCtaPanel` shipped `…for this campaign .` for every page that left the phone label empty.
- **Detect:**
  ```bash
  # Space before punctuation, or a doubled space, in rendered copy:
  node -e 'const{chromium}=require("playwright");(async()=>{
    const b=await chromium.launch({args:["--ignore-certificate-errors"]})
    const c=await b.newContext({ignoreHTTPSErrors:true});const p=await c.newPage()
    await p.goto(process.argv[1],{waitUntil:"domcontentloaded"})
    console.log(await p.evaluate(()=>[...document.querySelectorAll("p,h1,h2,h3,li,span")]
      .map(n=>n.innerText).filter(t=>t&&/\s[.,;:!?]|\s\s/.test(t)).slice(0,10)))
    await b.close()})()' "https://localhost:3000/"
  ```
  Then render the block's story with the optional field **absent** and read the string, not the box.
- **Fix:** Put the separator *inside* the guard so it cannot outlive the value it separates: `{phone && <>{' '}<Link/></>}`. Check all four permutations of every optional pair (both present, each absent, both absent) — the trailing case matters too, since a guard at the end of a sentence must not leave a trailing space before the closing punctuation.

## Porting an unguarded dereference from a build-time source into a request-time port

- **When it bites:** The Gatsby source resolves its CMS at **build** time, so it can afford to dereference `node.image.localFile.childImageSharp.fluid` with no guard — bad data fails `gatsby build`, loudly, before any visitor exists. That is a legitimate strategy *there*. Copy the same expression into this port, which resolves Payload **per request**, and the identical code is a 500 on a live page instead of a red CI run. Same expression, opposite blast radius, purely because the data fetch moved. It is invisible in review because the ported line looks *more* faithful than a guarded one, and it never fires on the content you tested with — only on whatever an editor saves later. The mirror-image mistake is just as common: seeing the source render nothing for an absent value and reproducing an "empty state" the source's schema actually forbids, when the faithful port is to make the state unreachable.
- **Detect:**
  ```bash
  # Property chains 3+ deep on CMS data, unguarded, in ported components:
  grep -rnE '\b(node|item|doc|block)\.[a-zA-Z_]+\.[a-zA-Z_]+\.[a-zA-Z_]+' src/blocks src/components \
    | grep -v '?\.' | grep -v '\.test\.' | head -20
  ```
  Then check the source's TypeScript interface for that field: an explicit `?` marks the states the CMS actually permits, and its **absence is load-bearing** — `image: DirectusImage` beside `video_banner?: DirectusImage` means the schema guarantees one and not the other.
- **Fix:** Split the source's behaviour in two and port each half to the right place. The *enforcement* (this field is mandatory) becomes `required: true` in the Payload config — that is the real equivalent of the source's build failure, and it stops bad content at the door. The *crash* does not get ported at all; add a render guard so legacy or partial data degrades instead of 500ing. Do not invent UI for a state the source's schema forbids — a placeholder for a case that cannot legitimately occur is developer-facing UI shipped to the public. And before making an existing field required, check the live documents: retroactive `required` can leave a saved document unsaveable, so an editor fixing an unrelated typo is blocked by a validation error they did not cause.

## Legacy SCSS `lg` (1023) and `tb` (1200) collapsed into one "desktop" breakpoint

- **When it bites:** `sp-rapid`'s ladder is `xs:360 sm:470 md:768 lg:1023 tb:1200 xl:1590`. Both `lg` and `tb` read as "desktop" while porting, so a `breakpoint(tb)` rule gets written as `min-[1023px]:` and fires **177px early**. It is engineered to survive review: everyone measures at 390 / 768 / 1440, and a rule firing at 1023 instead of 1200 is **identical at all three**. It is only wrong in the band between them — which is most laptops. The two literals differ by four digits in the middle of an 80-character class string, so neither a reviewer nor a grep catches it. Real incident: `CustomerQuote` had four such keys. At 1100px the quote rendered **8px larger, 100 weight heavier and 74px taller** than the source, the panel **48px taller** with **20px more side padding**, and the image column **48px wider**. Every existing check was green. A full audit found the port had it right in ~60 other places, so this is a per-declaration slip, not a systematic mis-mapping — which is exactly why a sweep is needed rather than a find-and-replace.
- **Detect:**
  ```bash
  # For each 1023 in the diff, check whether the SOURCE file has any tb rule at all:
  git diff -U0 | grep -c 'min-\[1023px\]'
  grep -rl 'min-\[1023px\]' src/ | while read f; do
    n=$(basename "$(dirname "$f")")
    src=$(find ~/bsqgroup/sp-rapid/src -iname "*${n}*.scss" | head -1)
    [ -n "$src" ] && echo "$f -> $(grep -c 'breakpoint(tb)' "$src") tb rule(s) in $(basename "$src")"
  done
  ```
  Any file whose source stylesheet contains a `breakpoint(tb)` needs each `1023` hand-traced to the declaration it came from.
- **Fix:** `min-[1200px]:` for every `tb`-derived declaration. Then **add 1100 to the comparison widths** — the facts file already sweeps 1023/1199/1200, but that sweep measures the *source only*; no side-by-side port-vs-source comparison ever ran inside the band, which is the whole reason four wrong values shipped. One extra width at 1100 in whatever compares the two sides catches this class on the day it is written. Beware two false leads: `LandingHero`'s `min-[1200px]:w-7/12` and friends are **Bootstrap 5 `xl`**, not SCSS `tb` — numerically identical, semantically different, and renaming them under a `tb` alias would make them stop tracking their real source. And the source's `@media (min-width: 1100px) { top: 44px }` on the nav dropdown is dead code, since the panel is `position: static` until 1200.

## Pre-existing `[...].join(' ')` class lists in the public-brand seed — 15 styles files still split

- **When it bites:** Companion to "Style class lists split across array entries / concat" above, which only greps the **diff** and therefore only catches occurrences someone writes *today*. The 15 files below were inherited whole from the public-brand seed and predate every diff-scoped check, so they never trip it — they are simply always broken. CLAUDE.md forbids the pattern because splitting a class list makes it unsearchable: you copy a class off a DevTools element, grep for it, get nothing, and conclude the style comes from somewhere else entirely. The remaining files are `PackagesHero`, `OtherWaysToBuy`, `OfficePhotoAddress`, `ComparePackages`, `AboutThisService`, `WiseBusinessAccount`, `WhatsIncluded`, `ServicesTestimonial`, `WhatIsPrivateLimitedCompany`, `ComparePackagesHeader`, `HowItWorks`, `WhatsIncludedSinglePackage`, `HeroStepper`, `CallOutCTA`, `PromoCard`. Any of them touched for an unrelated reason is a chance to clear one.
- **Detect:**
  ```bash
  # Whole tree, not just the diff — this is inherited debt, not new code:
  grep -rlE "\.join\(' '\)" src --include='*.styles.ts' | sort
  grep -rnE "^\s*'[^']*'\s*\+$" src --include='*.styles.ts' | head -20
  # 15 files as of the sweep. The number must only ever go down.
  grep -rlE "\.join\(' '\)" src --include='*.styles.ts' | wc -l
  ```
- **Fix:** Collapse each entry to a single string literal — concatenate the pieces by hand, keep the spaces that separated them, and let Prettier wrap the long line. Do not "fix" it by reformatting into a template literal or a `cn()` call in the styles file: the requirement is that the exact class string appears contiguously in the source so it is greppable. The rest of the codebase is the reference; see CLAUDE.md's "All class lists must be a single string literal" rule and `feedback_styles_array_join.md`.

## One source page holding TWO instances of the same block — `populate-block.mjs` cannot place them

- **When it bites:** A page renders the same component twice with different content. The home page does exactly this: `sp-rapid/src/pages/index.tsx:78` renders `<FAQInfoPanel slug="home-key-questions">` (§6, 8 questions) and line 127 renders `<FAQInfoPanel slug="home">` (§23, 9 questions) — one component, two content sets, ~17 sections apart. Two failure modes, both silent. Passing both specs in one populate call exits early with `two specs share blockType "faqs" — a page holds one block per type here; merge them`, which is *wrong advice*: merging them would fuse two separate page sections into one. Populating them as two sequential calls is worse — it looks like it works, but `populate-block.mjs` matches an existing block with `layout.findIndex((b) => b.blockType === spec.blockType)`, so the second call **overwrites the first block in place** rather than adding a second, and you end up with §6 silently holding §23's copy. `sourceOrder` cannot express it either: `rank` is a `Map` keyed by blockType, so both instances collapse to one rank and tie-break on existing layout index, clustering them adjacent instead of ~17 sections apart.
- **Detect:**
  ```bash
  # Does the target page hold repeats of any blockType?
  node -e "const l=require('./page-home-backup-<id>.json');const c={};l.forEach(b=>c[b.blockType]=(c[b.blockType]||0)+1);console.log(Object.entries(c).filter(([,n])=>n>1))"
  # Does the SOURCE render one component more than once?
  grep -n '<FAQInfoPanel\|<SectionTitle' ~/bsqgroup/sp-rapid/src/pages/index.tsx
  # list-sections.mjs prints the duplicate as two adjacent identical rows (e.g. rows 5 and 6).
  ```
- **Fix:** Populate the unambiguous specs through the script as normal, then insert the second instance with one explicit, backed-up PATCH: GET the page at `depth=0`, assert the expected instance count before touching anything (`if (layout.filter(b => b.blockType === X).length !== 1) abort`), `splice` the new block in after its true source-order neighbour rather than appending, and PATCH once. Write the pre-change layout to disk first — the script's own backup is taken before *its* write and will not contain your insert. Never fix this by merging the two sections into one block, and never by running the script twice.

## `detect-behaviour.mjs` returns "safe to port as static layout" for a section that opens a modal

- **When it bites:** Home §14 ("Company formation for beginners") opens a Vimeo modal. The probe exited **0** with `No behaviour detected — safe to port as static layout`, while simultaneously printing **8 `click-target` signals** — `cursor:pointer` on `div.FormationVideo-module--formationVideo__image` and `div.gatsby-image-wrapper`, a non-link non-interactive tag, at every width. The verdict contradicted the evidence in its own output. Trusting the exit code would have shipped a dead still image where the source plays a video, and no Step 8 check could catch it: completeness, headings, verify-block, diff-screenshots and compare-page all photograph the page **at rest**, where a modal trigger is indistinguishable from a plain image. The skill's gate for exactly this class of defect is the thing that failed. Related trap: the modal payload differs per section — §13 (case-study mosaic) is a native `<video>` mp4, §14 is a Vimeo `<iframe>` — so "it's like the last one" is not safe either; `VideoModal` dispatches on `/\.(mp4|webm|ogv)(?:[?#]|$)/` and picks the branch from the URL.
- **Detect:**
  ```bash
  # Never read the verdict alone — read the SIGNALS section, and treat any
  # click-target / cursor:pointer on a non-link as behaviour regardless of exit code:
  SOURCE_REPO=~/bsqgroup/sp-rapid node ~/.claude/skills/gatsby-section-to-payload-block/scripts/detect-behaviour.mjs \
    "http://localhost:8000/" "TEXT:<a line of the section's copy>" | tee /tmp/probe.txt
  grep -cE 'click-target|cursor:pointer' /tmp/probe.txt   # >0 means investigate, whatever the verdict says
  # Then confirm in the source component — this is the authority, not the DOM:
  grep -rnE '<Modal|isVideo|vimeo|<video|onClick' ~/bsqgroup/sp-rapid/src/components/<Section>/
  ```
- **Fix:** Treat `detect-behaviour.mjs` as a *signal collector*, not a verdict. Any `click-target` on a non-anchor, any `cursor:pointer` on a `div`, means open the source component before authoring. Grep the component for `<Modal`, `onClick`, `isVideo`, `slider`, `carousel`, `useState`. Reuse `src/components/shared/VideoModal/` rather than forking a second modal, and read the actual video URL from the source (Directus field, not the markup) to know which branch it takes.

## Each agent inserted its own slug into `sourceOrder`, so no two specs agreed — and one block landed unranked

- **When it bites:** Porting two sections in parallel. Both agents were handed the SAME 12-entry `sourceOrder` and each correctly inserted its own new slug — producing two 13-entry lists that disagree, because neither knew about the other's block. `populate-block.mjs` does not merge them: it takes `withOrder[0].sourceOrder`, warns `SPECS DISAGREE ABOUT "sourceOrder"`, and every block absent from the winning list is reported `not in sourceOrder, keeping in place` and lands wherever the append left it. Real incident: `formationVideo` (§14) was missing from the banking spec's list and landed BEFORE `caseStudyMosaic` (§13). Compounding it, that same re-sort collapsed the page's two `faqs` instances to adjacent positions 4 and 5 — populating ANY block re-sorts the WHOLE layout, so a previously correct duplicate placement silently regresses.
- **Detect:**
  ```bash
  # Before populating, prove every spec carries an identical list:
  node -e "const fs=require('fs');const f=process.argv.slice(1);const s=f.map(x=>JSON.stringify(JSON.parse(fs.readFileSync(x,'utf8')).sourceOrder));console.log(new Set(s).size===1?'IDENTICAL':'DIVERGENT — '+new Set(s).size+' variants');f.forEach((x,i)=>console.log(' ',x,JSON.parse(s[i]||'[]').length+' entries'))" port/*/block.json
  # Watch populate's output for BOTH of these lines — either one means the order is wrong:
  #   SPECS DISAGREE ABOUT "sourceOrder"
  #   not in sourceOrder, keeping in place: <slug>
  # And ALWAYS re-run check-order.mjs after populate, even when you only added one block.
  ```
- **Fix:** Derive the full `sourceOrder` for the page ONCE, including every slug that will exist by the end of the batch, and write that same list into every spec before populating — do not let each agent author its own. When agents run in parallel, the orchestrator owns the list, not the agents. After populate, re-run `check-order.mjs`; if a page holds two instances of one block, expect to re-place the second one by hand every time (see the duplicate-instance entry above).

## `line-clamp-N` is silently dead when a `display` utility sits in the same class list

- **When it bites:** You clamp a CMS-authored excerpt with `line-clamp-3` and the class list also carries `block` (or `flex`, `grid`, `inline-block`, `inline-flex`) — usually because the element needed to be a block-level box and someone added the utility separately, at a different time, for a different reason. `line-clamp-N` is not self-contained: Tailwind expands it to `overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: N`. The sibling `display` utility overwrites `display: -webkit-box`, and `-webkit-line-clamp` has no effect on anything that is not a `-webkit-box`. The clamp disappears with **no warning of any kind** — no Tailwind error, no typecheck failure, no lint rule, and no visual signal in Storybook where the fixture excerpt is two lines long anyway. Real incident: `OurLatestBlogs.styles.ts` had `cardDescription: 'mb-4 line-clamp-3 block …'`. The excerpt rendered at **450px / 15 lines instead of 90px / 3 lines**, which pushed each blog card to **820px tall against the source's 375** — a 445px per-card error, more than doubling the card. It passed typecheck, lint and every block-scoped check; the only thing that caught it was a page-level height comparison against the source.
- **Detect:**
  ```bash
  # Any class list that clamps AND sets display — every hit is dead clamping.
  grep -rnE "line-clamp-[0-9]" src/ --include=*.ts --include=*.tsx \
    | grep -E "(^|[ '\"])(block|flex|grid|inline|inline-block|inline-flex|table)([ '\"]|$)"
  ```
  ```js
  // Runtime assertion — the computed display is the whole truth.
  Array.from(document.querySelectorAll('[class*="line-clamp"]')).map((el) => [
    el.className,
    getComputedStyle(el).display,          // must be '-webkit-box'
    el.getBoundingClientRect().height,
  ])
  ```
- **Fix:** Delete the competing `display` utility — `line-clamp-N` already makes the element a block-level `-webkit-box`, so `block` was never buying anything. If you genuinely need `flex`/`grid` on that node, the clamp has to move to an inner element; you cannot have both on one box. Whenever you add a clamp, verify the **rendered height** at the widest breakpoint rather than trusting that the class is present — a dead clamp looks exactly like a live clamp in the class list and nowhere else.

## Margin collapse where the source nests and the port is flat

- **When it bites:** You flatten the source's wrapper elements away because they look decorative — the source's CTA row is a flex `ButtonGroup`, its heading sits inside a wrapper `div` — and you re-express the spacing as a plain `mt-*` on a sibling block box. Adjacent vertical margins collapse to the larger of the two, so every gap where the port is flat and the source is nested silently loses the smaller margin. Two separate losses landed in the same block in one sitting: the CTA row used `mt-4` as a plain block directly under a `<p>` carrying `mb-4`, collapsing to `max(16,16) = 16` and **losing 16px**; and an `h2 mb-2` collapsed with the grid's `mt-8`, giving 32px where the source has 40 — **losing 8px**. The source never hits either, because its flex/grid parents and wrapper divs break the collapse for free. The insidious part is that neither loss is visible in a section-height total when some other element (a clamp, an image, a min-height) absorbs the difference.
- **Detect:**
  ```js
  // Compare per-element box positions on both sides, not the section height.
  // Any element whose top-Y differs while its own height matches is a spacing bug.
  const rows = (root) => Array.from(root.querySelectorAll('*')).map((el) => ({
    tag: el.tagName, cls: el.className.toString().slice(0, 40),
    top: Math.round(el.getBoundingClientRect().top),
    h: Math.round(el.getBoundingClientRect().height),
  }))
  // And measure the painted gap, never the declared margin:
  const gap = (a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().bottom
  ```
  ```bash
  # Any mt-* on a non-flex, non-grid sibling directly under an element with mb-* is suspect.
  grep -rnE "\bm[tb]-" src/blocks/<Name>/*.styles.ts
  ```
- **Fix:** Reach for padding or a flex parent rather than a margin whenever the source has a wrapper you removed. The two fixes here were `flex pt-4` instead of `mt-4` on the CTA row (the `flex` also breaks the collapse for anything inside it), and `mt-10` on the grid to recover the 8px the heading's `mb-2` was eating. Before assuming a total height match means the spacing is right, diff the per-element top-Y ladder — collapse hides in a total whenever another element is independently wrong in the opposite direction.

## A full-width CTA prop applied unconditionally where the source scopes it to mobile

- **When it bites:** The source CTA is full-width on a phone, so the port sets the shared CTA component's `block` (or `fullWidth`) prop once, at the component, with no breakpoint qualifier — and the button stays full-width on desktop where the source has snapped back to hugging its label. Nothing flags it: the prop is real, the component honours it, the mobile screenshot is correct, and the desktop button is merely *wide*, which reads as a styling choice rather than a bug. Real incident: `CtaLink … block` in `OurLatestBlogs` made the "Read Post" CTA **327px wide at 1440**. The source is **300px at 390 but only 117px from 768 up** — its `btnBlock` modifier is applied inside a mobile-only media query. A 210px error at desktop that no at-rest desktop-only check questioned.
- **Detect:**
  ```js
  // Measure the SAME CTA at 390 and at 768+ on both sides. Identical width at
  // every breakpoint is the smell — real CTAs almost always hug from md up.
  document.querySelectorAll('a[class*="cta"], button[class*="cta"]').forEach((el) =>
    console.log(el.textContent.trim(), Math.round(el.getBoundingClientRect().width)))
  ```
  ```bash
  # Unqualified full-width props on a shared CTA in block code.
  grep -rnE "<(CtaLink|CMSLink|Button)[^>]*\b(block|fullWidth)\b" src/blocks/ --include=*.tsx
  # And check the source's own modifier is not media-scoped before mirroring it:
  grep -rn "btnBlock\|block" ~/bsqgroup/sp-rapid/src/components/<Section>/*.scss
  ```
- **Fix:** Drive the width from the **wrapper**, not from the shared component: `flex flex-col pt-4 md:flex-row` makes the child stretch on mobile and hug from `md` up, and the `block` prop comes off entirely. This keeps the fix inside block code and out of the shared component, which is what the repo's "never override base component styles" rule is asking for — a `md:w-auto` className slapped on the CTA would have worked visually and been the wrong layer.

## Payload starter-template branding still shipping in SEO titles and route `<title>`s

- **When it bites:** The repo was seeded from the Payload website template, and the template's own brand string survives in places nobody reads after the first week: `src/plugins/index.ts` supplied the SEO plugin's `generateTitle` fallback, so **every** page whose SEO title was empty rendered `"… | Payload Website Template"`, and three route files hardcoded the same string into their `<title>` directly — `src/app/(frontend)/posts/page.tsx`, `src/app/(frontend)/posts/page/[pageNumber]/page.tsx` and `src/app/(frontend)/search/page.tsx`. None of it is visible in the page body, so no screenshot comparison, no DOM diff and no geometry check can see it; it shows up in the browser tab, in Google's SERP, and in every link preview. It is also brand-hostile in a multi-brand repo: the string is a constant, so it cannot follow the active brand even after the brand system exists.
- **Detect:**
  ```bash
  # Must return nothing.
  grep -rn "Payload Website Template" src/ tests/
  # More generally, after any template-seeded port, sweep for the starter's strings:
  grep -rniE "payload website template|payload blank template|payload cms template|example\.com" src/ tests/
  # And check every route that hardcodes a title instead of deriving one:
  grep -rn "title:" src/app/\(frontend\)/**/page.tsx | grep -v "generateTitle\|siteName"
  ```
- **Fix:** Derive the suffix from the active brand — read `siteName` off `getDomainConfig(getBrand())` in `src/lib/brand.ts` and use it in both the SEO plugin's `generateTitle` and every route-level `<title>`, so the string follows whichever brand the deployment is serving. Watch for **dead tests asserting on the template string** while you are in there: `tests/e2e/frontend.e2e.spec.ts` asserted on it and was deleted; its sibling `tests/int/api.int.spec.ts` had already been removed in port commit `2b4413c` and this one was simply missed, so a grep for the string is also a grep for leftover template tests.

## Test files that no vitest `include` glob can ever match

- **When it bites:** Tests exist, are well written, are committed, show up in review, and have **never once run**. `vitest.config.mts` sets `include: ['tests/int/**/*.int.spec.ts']`, which cannot match anything under `src/` and cannot match a `.test.tsx` suffix — so `src/components/**/DatePicker.test.tsx` and `src/components/**/Pagination/__tests__/Pagination.test.tsx` were pure decoration. The failure is fully silent in both directions: the runner reports a clean pass over the files it *did* collect, and the uncollected files never fail, so the repo looks like it has component coverage it does not have. It bites hardest right after a port, when test files arrive from a source tree whose runner config used different conventions.
- **Detect:**
  ```bash
  # Every test-shaped file on disk, versus what the config can collect.
  find src tests -type f \( -name '*.test.*' -o -name '*.spec.*' \) | sort > /tmp/on-disk.txt
  grep -n "include\|exclude" vitest.config.mts playwright.config.ts 2>/dev/null
  # Authoritative: ask vitest what it would actually collect, and diff.
  bunx vitest list --reporter=json 2>/dev/null | grep -o '"file":"[^"]*"' | sort -u
  # Anything in on-disk.txt that vitest does not list is a file that never runs.
  ```
- **Fix:** Either widen the `include` globs to cover the convention the files actually use (`src/**/*.test.{ts,tsx}` alongside `tests/int/**/*.int.spec.ts`), or move the files to where the existing glob looks — but decide deliberately, and re-run the suite afterwards to confirm the newly collected tests actually pass, because tests that have never executed are usually not green. Add the on-disk-vs-collected diff to the checks you run after any port that brings test files with it.

## The dev server is NOT a production build — `bun run dev` runs Next in dev mode

- **When it bites:** Someone reads `package.json`, sees `dev` invoking `node server.js` rather than `next dev`, concludes the dev server is serving a prebuilt standalone production bundle, and therefore decides that **live verification against `https://localhost:3000` proves nothing about the code they just edited**. They then skip — or, worse, actively discount — the browser check that would have caught a real defect, and reason about the rendered output from the source instead. `server.js` here is a *custom server wrapping Next in dev mode*: edits are compiled and served live, exactly as with `next dev`. This has now cost work **three separate times in one session**, with three different agents independently reaching the same wrong conclusion from the same `package.json` line and each dismissing their own correct live measurements.
- **Detect:**
  ```bash
  # Dev mode leaves a dev webpack compiler process and a .next/dev tree.
  ps aux | grep -i '[.]next/dev'          # a hit means dev mode
  ls -d .next/dev 2>/dev/null && echo "dev-mode build tree present"
  # Empirical version, ~15 seconds, settles it for good:
  # 1. edit a visible string in a block component
  # 2. curl -sk https://localhost:3000/ | grep '<the new string>'
  #    present without a restart => dev mode, live verification is valid
  ```
- **Fix:** Treat live verification against the dev server as **valid evidence** and do it. If you find yourself about to write "the dev server serves a prebuilt bundle so this measurement may be stale", run the two commands above first — the answer is that it does not. The genuine caveat is a different one and is documented separately: Next's **data cache in `.next/cache` survives restarts**, so stale *CMS data* after a schema change is real (`rm -rf .next`) while stale *code* is not.
