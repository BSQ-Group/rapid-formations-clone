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

## Heading gap derived from the SCSS instead of measured — margin collapsing makes the same component render two different gaps

- **When it bites:** Porting a Gatsby/SCSS component, you read the SCSS and translate every declaration it contains — but the source's rendered spacing is SCSS **plus** a browser/reset default the SCSS never mentions. Chrome's UA stylesheet puts `margin: 0.5em 0` (8px at 16px root) on `h1`–`h6` and `p`; the source SCSS only sets the *extra* margin on a wrapper. The port renders the heading through `Text` (or a `<span>`), which carries no default margin, so the block is uniformly ~8px shorter than the source and the whole section below it shifts up. Every font-size, padding and width matches, so a typography/box probe passes. Real incidents: PR #10 (source `<h3>` had an 8px reset margin, port `<span>` had none — tile 8px short at 390/768) and PR #21 WhyChooseUs (source `SectionTitle` = `h2 { margin-bottom: 8px }` + `.sectionTitle { margin-bottom: 32px }` = **40px** below the heading; port shipped `mb-8` = 32px at all three breakpoints).
- **Detect:** Never derive spacing from the SCSS alone — read the **computed** margin off the live source element, and diff the total gap between consecutive elements rather than each element's own box:
  ```js
  // Run on localhost:8000 (source) AND localhost:3000 (port) at 390/768/1440.
  // Compare `gapBelow`, not the SCSS: it folds in UA-default margins the SCSS never declares.
  const h = [...document.querySelectorAll('h2')].find(e => /<heading copy>/i.test(e.textContent))
  const next = h.closest('div').nextElementSibling || h.nextElementSibling
  const s = getComputedStyle(h), w = getComputedStyle(h.parentElement)
  ;({ ownMb: s.marginBottom, wrapperMb: w.marginBottom,
      gapBelow: Math.round(next.getBoundingClientRect().top - h.getBoundingClientRect().bottom) })
  // Source gapBelow 40 vs port 32 => the missing UA default. Any non-zero `ownMb`
  // on a source h1-h6/p is a margin the port's <Text>/<span> will NOT reproduce.
  ```
  ```bash
  # Static smell: a ported heading whose margin is a single round Tailwind step is
  # usually the wrapper value copied straight out of the SCSS, minus the UA default.
  git diff origin/main...HEAD -- 'src/blocks/**/*.styles.ts' | grep -E '^\+.*(heading|title).*\bmb-[0-9]+' || true
  ```
- **Fix:** Set the port's margin to the source's **measured rendered gap**. Do NOT compute it — neither the wrapper value from the SCSS nor wrapper + UA default is reliable, because whether the two margins collapse depends on what follows the wrapper. Same `SectionTitle`, two sections, two different answers: S18/WhyChooseUs renders **40px** (next sibling is an inline `<span>`, so the h2's 8px does not collapse away) while S19/RegisteredOffices renders **32px** (next sibling is a block, the 8px and 32px collapse to 32). Read `gapBelow` off the live source at 390/768/1440, set the port to that number, re-measure both servers and require an exact match. The same applies to `<p>`: a source paragraph's margin can come from a UA default or a global rule the block's SCSS never mentions — and measure the *inner* `<p>`, not the wrapper, whose computed `font-size`/`line-height` are inherited values that the paragraph then overrides (S19: wrapper reported 18px/27px, the `<p>` inside was 20px/30px).
## The page `H1` belongs to a `PageTitle` block, never inside a content block

- **When it bites:** A ported page renders its heading plus its body, so the obvious move is one block carrying both — a `title` field above the content. It works for that page and quietly fails for the family. The source site composes the heading as its own section (`components/directus/page-title`), used on **60 pages**, and only **5** of those pair it with the text body; the rest pair it with `service-content`, `faq-page-questions`, `page-sections`, `package-inclusions` and others. Bake the `H1` into one content block and every other family needs its own copy of the same field, with nothing guaranteeing exactly one `H1` per page. The heading is also **not always first** — on 8 pages (`affiliate-program`, `contact-us`, `go-digital`, `site-map`, all four `help-centre/*`) it renders *below* `MainBanner`, which rules out emitting it from the page template. Real incident: the first cut of the TextContent port put the `H1` in the block's own `title` field and deleted the `PageTitle` block as "duplication of `page.title`"; it had to be rebuilt before the FAQ family (23 pages) could be started.
  > Gate-escape: the block was reviewed against one page, where a self-contained title reads as the simpler design. Tightening: before adding a `title`/heading field to a block, grep the source for how many pages use that heading component and what else they compose it with. More than one composition == it is its own block.
- **Detect:**
  ```bash
  # No block other than PageTitle (and the hero blocks, which own their own H1)
  # may emit an H1.
  grep -rn 'as="h1"' src/blocks --include=Component.tsx \
    | grep -vE 'src/blocks/(PageTitle|LandingHero)/' || true
  # And a `title` field on a block that renders body copy is the same smell:
  git diff main...HEAD -- 'src/blocks/**/config.ts' | grep -B2 "name: 'title'" || true
  ```
  Runtime check — every page must have exactly one `H1`:
  ```js
  document.querySelectorAll('h1').length // must be 1
  ```
- **Fix:** Give the heading its own `PageTitle` block so editors can position it (above or below a banner), and make its `title` field **optional, falling back to the page's own `title`** — passed down as `RenderBlocks({ pageTitle })` and injected as `fallbackTitle`. That keeps a single source of truth for the 52 pages whose heading is just the page name, without a second copy to drift, while still allowing an override where the `H1` should read differently from the page/SEO title.

## `NEXT_PUBLIC_*` is baked in at build time — a missing one degrades silently in production

- **When it bites:** Local renders correctly, production renders in the wrong font (or with a feature quietly absent) and nothing errors. `NEXT_PUBLIC_*` values are inlined into the bundle **when Vercel builds**, not read at runtime, so a variable that exists in `.env` but not in the Vercel project simply resolves to `undefined` there. When the value gates a JSX branch, the whole branch disappears from the HTML rather than failing loudly. Real incident: `NEXT_PUBLIC_ADOBE_FONT_PROJECT_ID` was absent in Vercel, so `layout.tsx`'s `{adobeFontProjectId && (...)}` never emitted the Typekit `<link>`, and every `.font-legacy-condensed` element on the deployed site fell back to Inter — the entire site in the wrong typeface, with a green build. The first guess was an unrelated variable (`FONTAWESOME_NPM_AUTH_TOKEN`), which would have *failed* the build rather than changed a font.
  > Adding the variable is not enough — an existing deployment keeps the old bundle. It must be **redeployed** to bake the value in.
- **Detect:**
  ```bash
  # Every NEXT_PUBLIC_* the code reads must be present in the deployed HTML's effects.
  grep -rhoE 'process\.env\.NEXT_PUBLIC_[A-Z0-9_]+' src/ | sort -u
  ```
  ```bash
  # Then assert the resulting markup on the deployed URL, not just that the build is green.
  # e.g. for the Adobe font — 0 means the variable never reached the build:
  curl -s https://rapid-formations-clone.vercel.app/ | grep -c typekit   # expect 3
  ```
- **Fix:** For each `NEXT_PUBLIC_*` the code branches on, assert the *rendered consequence* on the deployed URL after the first deploy of a branch that introduces it — the tag, the script, the attribute — not merely that the build passed. Prefer a check on markup over a check on the dashboard: the dashboard shows the variable exists now, the HTML shows whether the running bundle was built with it.

## Storybook renders `.font-legacy-condensed` in Inter — never size-check a port there

- **When it bites:** You port a component, compare it against the Gatsby source in Storybook, and everything matches except height — the text wraps onto an extra line, so a step/card/label is one line-height taller than the source. You start hunting for a padding or `line-height` bug that does not exist. Storybook loads Inter/Work Sans/Montserrat via `next/font` (`.storybook/preview.tsx`) but **never loads the Adobe Typekit face**, and the `.font-legacy-condensed` rule does not win there even though it is present in the CSSOM. Inter is measurably wider than `myriad-pro-semi-condensed`, so any text near a wrap boundary breaks differently. Real incident: `OrderSteps` measured 117px against the source's 90px at 390 — pure font, the component was already exact. 768 and 1440 matched 54/54 because no label sat near a wrap point there.
- **Detect:**
  ```js
  // In the story, before trusting ANY width/height/wrap measurement:
  getComputedStyle(el).fontFamily.split(',')[0]
  // 'Inter' => the measurement is invalid. The source renders 'myriad-pro-semi-condensed'.
  ```
- **Fix:** Do not "fix" the component. Either force the real face before measuring:
  ```js
  await page.addStyleTag({ url: 'https://use.typekit.net/wrj3hpa.css' })
  await page.addStyleTag({ content: `[data-step], [data-step] * {
    font-family: 'myriad-pro-semi-condensed', sans-serif !important;
    font-variation-settings: 'wdth' 75.6 !important; }` })
  await page.evaluate(() => document.fonts.ready)
  ```
  or verify on the Next dev server / preview deploy instead, which loads Typekit properly. Storybook stays valid for colour, spacing, flex rules and state variants — it is only text-metric checks that are untrustworthy.

## `duration-[…]` / `ease-[…]` are ambiguous with `tailwindcss-animate` and get silently dropped

- **When it bites:** You write an arbitrary transition value copied from the source's CSS — `duration-[350ms]`, `ease-[ease]` — the class appears on the element in DevTools, and the transition still runs at Tailwind's default. Nothing errors. `tailwindcss-animate` registers its own `duration-*`, `ease-*` and `delay-*` utilities for the **animation** properties, so an arbitrary value matches two utilities at once; Tailwind refuses to guess and **emits no rule at all**. The build prints `warn - The class 'duration-[350ms]' is ambiguous and matches multiple utilities`, which is easy to scroll past. Found while porting `OrderSteps`: the source eases with plain `ease`, `ease-[ease]` produced nothing, and the step kept Tailwind's `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Detect:**
  ```bash
  # Any hit here is a class that is probably not being emitted:
  grep -rhoE '(duration|ease|delay)-\[[^]]+\]' src/ | sort | uniq -c
  ```
  ```bash
  # Confirm against a real build — 0 means the class was dropped:
  echo '@tailwind utilities;' > /tmp/in.css
  npx tailwindcss -c tailwind.config.mjs -i /tmp/in.css 2>/dev/null | grep -c 'duration-\\\[350ms\\\]'
  ```
- **Fix:** Use the arbitrary-property form, which names the CSS property and cannot be ambiguous — `[transition-timing-function:ease]`, `[transition-duration:350ms]`. Standard tokens (`duration-300`, `ease-in-out`) are unaffected; only the `[...]` form collides. Note `ease-in-out` is **not** CSS `ease` — it is `cubic-bezier(0.4, 0, 0.2, 1)` against `ease`'s `cubic-bezier(0.25, 0.1, 0.25, 1)` — so it is not a valid substitute when matching a source that uses plain `ease`.

## Tailwind `fontSize` tokens bundle `letter-spacing` — a ported heading on `text-4xl` ships `-1px` where the source is `normal`

- **When it bites:** You reach for `text-4xl` because the source heading measures 36px, override the line-height (`leading-[1.235]`) because the token's bundled `2.5rem` is wrong, and stop there. `tailwind.config.mjs` defines `'4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-1px' }]`, so the token also emits `letter-spacing: -1px` — and every heading on the rapidformations source measures `letter-spacing: normal`. Nothing in the class list resets it, no build warning fires, and the defect is invisible in a screenshot diff at anything below ~200% zoom: it only shows as a fractionally narrower heading. `text-3xl` / `text-5xl` / `text-6xl` carry the same bundled tracking. Shipped twice: `OurAddress` caught in review (#56), `PurchaseAnAddress` merged with it (#54) and fixed post-merge.
- **Detect:**
  ```bash
  # A ported heading using a bundled-tracking token without resetting it:
  grep -rnE "text-(3xl|4xl|5xl|6xl)" src/blocks/*/*.styles.ts src/components/shared/*/*.styles.ts \
    | grep -v 'tracking-'
  ```
  ```bash
  # Confirm against the render — must print "normal", not "-1px":
  # node -e "...getComputedStyle(h2).letterSpacing"  (Storybook or the dev server)
  ```
- **Fix:** Add `tracking-normal` alongside the `leading-` override, or use the raw `text-[36px]` form which carries no bundled tracking (most ported headings in this repo use `text-[36px] leading-[44.46px]` for exactly this reason). Blocks of QCF origin that intentionally want the tight tracking already write `tracking-[-1px]` explicitly — an explicit `tracking-*` in either direction is the signal that the value was considered.

## A ported section with no `bg-` of its own inherits `--surface-primary`, which is dark navy in this theme

- **When it bites:** You build a block that renders through `SectionWrapper` and never set a background, because the source section looks white and "no background" feels like the honest port. `SectionWrapper` defaults `background` to `light`, and in `.theme-rapidformations` **`--surface-primary` is `rgb(42 42 67)`** while `--surface-canvas` is `rgb(255 255 255)` — so the section paints navy. It is invisible in a Storybook story and in any screenshot of the block alone, because the block's own inner card covers the middle: the navy only shows in the **two strips either side of the `Container`**, at widths above the 1230px content column. Shipped in `TestimonialQuote` (#50), which sat on zero pages until the Tier 3 port put it on seven, at which point every one of them had a navy band behind the quote.
- **Detect:**
  ```bash
  # Blocks rendering through SectionWrapper whose section style sets no background:
  for f in $(grep -rl "SectionWrapper" src/blocks/*/Component.tsx); do
    s=$(ls $(dirname $f)/*.styles.ts 2>/dev/null | head -1); [ -z "$s" ] && continue
    grep -A1 "^  section:" $s | grep -q "bg-" || echo "no bg- : $s"
  done
  ```
  ```bash
  # Confirm against the render — must be rgb(255, 255, 255), not rgb(42, 42, 67):
  # getComputedStyle(section).backgroundColor at 1440, where the container is inset
  ```
- **Fix:** Add `bg-[var(--surface-canvas)]` to the block's `section` style, as every other ported block does — it comes after the layout classes in `cn()`, so it wins over the `sectionLayout.background` default. A hit from the grep is not automatically a bug: QCF-origin blocks designed to take `dark`/`inverse` from the CMS legitimately leave it to `sectionLayout`. Judge by whether the source section is white.

## The 75px gap under a ported section goes missing twice over — the field isn't in the schema, and the card margin collapses away

- **When it bites:** You port a section, it measures right, and the page still ends short of the source. Two independent causes stack. **(1)** Every section on the rapidformations source is wrapped in `Section--section`, whose bottom margin is **responsive — 50px, 75px from lg (1023), 110px from xl (1590)**. That is the `gap` field's `M` token, *not* `S`: `S` is a flat 75px, which matches only between 1023 and 1589 and is silently 25px too big at mobile and 35px too small on a wide monitor. Worse, the field only exists when the block passes `gap: true` — call `sectionLayoutField({ defaults: {...} })` without it and Payload **accepts the write, strips the key and returns 200**, so a populate script that sets `gap` looks like it worked and the section renders with no margin at all. Both halves shipped: `SiteMap` and `RenewalItems` went out with a flat `S`, and `ContactUs`/`OurOffices` had their gap silently dropped. **(3)** The same collapse costs a block its own last child's margin. In the source every block root is a child of the flex `Section`, so it is a flex item and therefore a BFC, and margins cannot escape it. In the port a block root is an ordinary block inside `Container` inside `SectionWrapper`, so the last child's `mb-*` collapses straight out and the section renders that much shorter — 48px in `ContactUs`, 30px in `SiteMap`. Three separate blocks have now hit this. **(2)** `Section--section` is `display: flex` in the source, so it contains its children's bottom margins. `SectionWrapper` renders a block-level `<section>`, so the last child's `mb-*` collapses up through the intervening block wrappers and **merges** with the section's own bottom margin instead of adding to it — `mb-[30px]` under `mb-[75px]` yields 75px, not 105px. Shipped in `SiteMap`, which landed 95px short of the source (30px of gap against 125px) with both causes present at once.
- **Detect:**
  ```bash
  # Blocks that take a section layout but cannot express the source's inter-section margin:
  grep -rl "sectionLayoutField" src/blocks/*/config.ts | while read -r f; do
    grep -q "gap: true" "$f" || echo "no gap field: $f"
  done
  # And a flat S where the responsive M is almost always what the source means:
  grep -rn "gap: 's'" src/blocks/*/config.ts
  ```
  ```bash
  # Confirm against the render — a list container must be taller than its last child
  # by that child's margin-bottom. Equal bottoms means the margin collapsed out:
  # node -e "...lastCard.getBoundingClientRect().bottom vs container.getBoundingClientRect().bottom"
  ```
- **Fix:** Pass `gap: true` to `sectionLayoutField` and default it to `m`, the responsive value a default source `<Section>` contributes. Reserve `s` for a source rule that really is a flat 75px, `sm` for `<Section bottom={30}>`, and `inherit` for `bottom={0}`. Read the number off the render at 390 **and** 1440 before choosing — one width cannot tell `s` from `m`. Some older blocks (`TestimonialQuote`, `ReviewRatings`) bake the 50/75 curve into their own `section` style instead; adding a gap to those would double it, so check before assuming. Then set the value on the CMS document — the schema change alone does nothing to pages already authored. For the collapse, give the block's list container `flex flex-col`, which contains the margins exactly as the source's flex Section does and leaves inter-item spacing untouched. A hit from the grep is not automatically a bug: a block that is always the only section on its page, or whose source section has no following sibling, has no gap to reproduce. Note the port is still ~20px short at the bottom of **every** page — that is the source's global `Wrapper--wrapper__content` `padding-bottom`, not a per-block defect, and it should not be absorbed into a block's gap to make one page measure right.

## `CtaLink`'s `[overflow-wrap:anywhere]` lets a short button label break mid-word where the source keeps it on one line

- **When it bites:** You put a `CtaLink` in a flex row beside body copy, the way most source cards do — content on the left, button on the right. At wide and narrow viewports it looks right, and at one or two widths in between the label silently breaks in half ("Ord / er") and the button doubles in height. `ctaLinkStyles.base` carries `[overflow-wrap:anywhere]`, which drops the anchor's min-content width to a single character, so the flex item shrinks past the word instead of flooring at it. The source's equivalent button has no such rule: its min-content is the whole unbreakable word, which is what stops the row from squeezing it. Nothing about the class list looks wrong, and it is invisible at the two viewports people usually check — caught in `RenewalItems` only by measuring the anchor's box at five widths, where it read `85x69` against the source's `89x44` at 1024 and `78x69` at 470 while 768 and 1440 both matched.
- **Detect:**
  ```bash
  # CtaLink used inside a flex row that can shrink — every hit needs the width check below:
  grep -rl "CtaLink" src/blocks/*/*.tsx | while read -r f; do
    grep -q "flex-row\|min-\[470px\]:flex-row\|md:flex-row" "$(dirname "$f")"/*.styles.ts 2>/dev/null && echo "check: $f"
  done
  ```
  ```bash
  # Confirm against the render — sweep widths, not just 390 and 1440. The anchor's height
  # must not change between breakpoints:
  # node -e "...a.getBoundingClientRect() at 390, 470, 768, 1024, 1440"
  ```
- **Fix:** Pass `[overflow-wrap:normal]` on the instance's `className` — it restores the word as the min-content floor, exactly like the source, while still letting a genuinely long multi-word label wrap between words. Do **not** reach for `whitespace-nowrap` (a long label then overflows its card instead of wrapping) and do **not** strip `[overflow-wrap:anywhere]` from `ctaLinkStyles.base` — it is there so an unbroken URL or email in a CTA cannot burst the button, which is the case the Storybook `UnbrokenToken` story covers.

## A Payload media upload can write a perfect database record and never store the file

- **When it bites:** A populate script uploads several images in one run. Payload returns a document for each, with the right `filename`, `mimeType`, `filesize` and — because sharp really did read the buffer — the correct `width`/`height`. The script prints four successes. Three of the files were never written to Vercel Blob. `/api/media/file/<name>` then 404s, `next/image` answers **400 "The requested resource isn't a valid image"**, and the page still renders because the banner band is a fixed `h-[300px]`: same height, same headings, same document height, just a blank white strip where the photo should be. Hit on the four help-centre pages — the first upload of the run landed, the other three did not, with no error thrown and no clue in the returned document.
- **Detect:**
  ```bash
  # Every media file referenced by a page must actually serve. Run after any populate:
  for f in $(node -e '…print each layout image filename…'); do
    printf "%s -> " "$f"; curl -sk -o /dev/null -w "%{http_code}\n" "https://localhost:3000/api/media/file/$f"
  done
  ```
  ```bash
  # Or ask the blob store directly — the database is not the authority on this:
  # bun -e "import {list} from '@vercel/blob'; …list({limit:1000})… compare pathnames"
  ```
- **Fix:** Re-`put` the missing files straight to the blob store at the exact pathname Payload serves (`filename`, no prefix, `addRandomSuffix: false, allowOverwrite: true`) and confirm with `head()` that the stored size equals the source size — the media document already holds the right metadata, so the IDs and every page reference stay valid. `payload.update` with a fresh `file` on the same filename does **not** reliably re-trigger the write; going to the blob API directly does. Better still, assert inside the populate script: after each upload, fetch the served URL and fail loudly if it is not 200 with a non-zero body. **A geometry-and-headings comparison cannot catch this** — the band keeps its height whether or not the image loads, so a screenshot is the only signal, and only if you look at it.

## The source component on disk is stale, so DOM order read from it can be wrong where the live site differs

- **When it bites:** A ported block puts two sibling regions in the order the local Gatsby component declares them, because that file is the obvious place to read the structure from. The deployed site has since been changed and renders them the other way round. It stays invisible at desktop when one of the two is `display: none` there, and only shows at the breakpoint where the hidden one becomes visible. Hit on `ComparePackageTable`: `ComparePackageTable.tsx` on disk renders grid → footnote → mobile, so the port did too, and at 1440 that is correct because the mobile block is hidden. At 390 the desktop grid is hidden instead, and the live site puts the footnote *after* the cards — the port put "Please note:" above them. Every desktop check passed; the page shipped wrong at mobile. The same staleness had already been established for *copy* (name-check verdicts), but the lesson was not carried across to *structure*.
- **Detect:**
  ```bash
  # Compare visible heading ORDER, not just the set, at every breakpoint. Y position is
  # the authority — DOM order lies whenever anything is display:none or reordered.
  # For each of source and port, at 390 / 768 / 1024 / 1440:
  #   [...document.querySelectorAll('h1,h2,h3,h4')]
  #     .filter(h => h.getClientRects().length)          // NOT getComputedStyle(h).display
  #     .map(h => `${h.innerText.slice(0,24)}@${Math.round(h.getBoundingClientRect().top + scrollY)}`)
  # A mismatch count that is higher at one breakpoint than the others is this bug.
  ```
- **Fix:** Take render order from the **live DOM at the breakpoint in question**, never from the local component file — the checkout is behind the deployment. Where two regions swap by breakpoint and each is hidden at the other, ordering them so the visible one always comes second is usually enough; no CSS `order` is needed. Note `getComputedStyle(el).display` does **not** report an ancestor's `display: none`, so a visibility filter written that way silently counts hidden nodes and hides the very mismatch you are looking for — use `getClientRects().length`.
