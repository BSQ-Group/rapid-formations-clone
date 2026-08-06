# Quality Company Formations — Project Conventions

## Shared skills live in `BSQ-Group/claude-dev-skills` (single source of truth)

Skills referenced throughout this file (`create-payload-block`, `figma-to-component`, `figma-update-component`, `pull-request-create`, `check-build-status`, `check-cursor-bot-comments`, `qa-followup`, etc.) are **not vendored in this repo**. They live in **https://github.com/BSQ-Group/claude-dev-skills** and are symlinked into `~/.claude/skills/`, so they resolve as `/<skill-name>` in any project once installed.

This repo's `.claude/skills/` holds only three bootstrap meta-skills that manage that flow:

- **`/bsq-dev-skills-pull`** — clone/update the shared repo and (re)create the `~/.claude/skills/` symlinks. Run this first on a new machine, or whenever a shared skill is missing/stale.
- **`/bsq-dev-skill-create`** — author a new shared skill in the repo (branch + PR), then pull.
- **`/bsq-dev-skill-update`** — change an existing shared skill in the repo (branch + PR, reconcile-don't-clobber), then pull.

**If a `/skill-name` referenced below isn't found, run `/bsq-dev-skills-pull`** — it's not missing, it's just not symlinked yet. Never re-vendor a copy of a shared skill into this repo; edit it in `claude-dev-skills` via `/bsq-dev-skill-update`.

## Recurring gotchas — checklist + append-on-miss

`.claude/QCF_GOTCHAS.md` is the living checklist of project-specific mistakes that have bitten us more than once (CMSLink wrapping for CTAs, Text presets vs raw px, block schema not refreshing without a server restart, etc.). The `pull-request-create` skill runs each entry's Detect command against the diff in Step 9a, before handing off to Bugbot.

**When the user (or Bugbot, or post-merge QA) flags a recurring mistake that isn't in the file, append a new entry to `.claude/QCF_GOTCHAS.md` in the same fix commit.** Shape: Name / When it bites / Detect / Fix. The goal is a checklist that grows monotonically so every known class of mistake is caught on the next PR without anyone having to remember.

## After ANY push to a PR branch — mandatory post-push checks

These run **regardless of how the PR was opened or pushed** — including raw `gh pr create` + `git push` (which bypass the `pull-request-create` skill's Step 10 hand-off). Pushing code without these is a process miss; they get caught later by the user or by post-merge QA, by which point the loop is much longer.

After every `git push` to a PR branch, in this order:

1. **`gh pr view <num> --json statusCheckRollup`** — surface the build / deploy status. If Vercel or unit tests are FAILURE, pull the logs and fix (or document) before doing anything else. Don't move on while CI is red.
2. **Invoke the `check-build-status` skill** (or the equivalent gh poll) — waits for the deploy to finish so subsequent verification has fresh artefacts.
3. **Invoke the `check-cursor-bot-comments` skill** — pulls every new Cursor Bugbot inline comment on the latest commit, classifies each (valid / false-positive / out-of-scope), fixes the valid ones in a single follow-up commit, and posts a brief assessment for the invalid ones. **Bugbot review is part of the PR contract, not an optional extra.**
4. **Ensure the linked Linear ticket is in "In Review"** (only needed on the push that opens the PR; idempotent thereafter). `get_issue` the ticket — if it's not already "In Review", `list_issue_statuses` for its team and `save_issue` to the "In Review" state, then report the move. Don't trust the GitHub↔Linear integration to do this: it attaches the PR off the `CORE-NNNN` in the title but only transitions status when the branch matches the ticket's magic `gitBranchName` (and only if the team automation is on). Real incident — CORE-3488, PR #230: branch was `…core-3488-card-sizing-qa-fixes`, ticket stayed In Progress despite the PR attaching. This In-Review move is the one status transition you make automatically; → "Ready for QA"/"Done" still wait for the user to confirm the merge. See `pull-request-create` Step 8b.

If you opened the PR via `pull-request-create`, its Step 10 already auto-invokes these. If you opened it any other way, you owe the post-push checks manually. Real-incident note — CORE-3571 first round: PR opened with raw `gh pr create`, four pushes followed without ever checking statusCheckRollup; user asked "have you addressed cursor bot comments" and the answer was no — Vercel had been failing, three Bugbot findings (one MEDIUM) were sitting on the PR untouched.

## External Tools / MCPs

Before asking the user to paste content from an external system (Linear, Figma, Notion, etc.), **always check the deferred tool list via `ToolSearch` first**. The relevant MCP (e.g. `mcp__claude_ai_Linear__get_issue`) is usually authenticated and one ToolSearch away — don't make the user paste a ticket description when the MCP can fetch it directly.

**Never proceed on a ticket that references Linear or Figma without the corresponding MCP available.** If the Linear MCP (`mcp__claude_ai_Linear__*`) or Figma MCP (`mcp__*figma*` — `get_design_context`, `get_screenshot`, `get_variable_defs`) is not surfaced as a deferred tool in the current session, stop and tell the user. Do not:
- Substitute `WebFetch` for the Linear ticket (auth-walled, will fail or return stale cache).
- Ask the user to paste the ticket body / Figma screenshots as a workaround — the MCPs are the source of truth and the user has them configured; their absence is a session-setup problem, not a "paste it manually" problem.
- Guess at requirements from the ticket title, branch name, or referenced node-id alone.

The correct action is: report which MCP is missing, ask the user to reconnect / reload the session, and wait. Auto mode does not override this — operating on incomplete ticket/design context produces wrong work, and "make the reasonable call" doesn't apply when the inputs are inaccessible.

## Package Manager

Use **bun** for all commands (`bun run dev`, `bun run storybook`, `bun run payload generate:types`).

## Production URL

Production for this repo is **https://rapid-formations-clone.vercel.app/** — the Vercel deployment, not the `rapidformations.co.uk` domain. Use the Vercel URL for any "live in prod" link in PR bodies, ticket updates, or verification notes. Per-PR preview deployments live under the same Vercel project — pull the `Visit Preview` URL from the PR's deployment status when you need a branch-specific link.

`https://quality-company-formations.vercel.app/` is a **different Vercel project** and does not serve this repo. It answers 200 on `/` and 404s on every route this repo adds, so checking it produces a convincing false negative — a ported page looks unshipped when it is live. Real incident: the 23 FAQ topic pages were reported as "404 in production" for most of a session on that basis, and a merge was nearly reverted because of it.

## Component Structure

Every component follows a **styles + component** pattern:

### 1. Styles file (`ComponentName.styles.ts`)

Single exported `const` object with all base Tailwind classes. No logic, no conditionals.

```ts
export const myComponentStyles = {
  container: 'flex flex-col gap-4 p-6 bg-white rounded-2xl',
  title: 'text-2xl font-bold text-[var(--text-strong)]',
  description: 'text-sm text-[var(--text-muted)]',
} as const
```

### 2. Component file (`Component.tsx`)

Import styles, use `cn()` for all dynamic/conditional class merging.

```tsx
import { cn } from '@/utilities/ui'
import { myComponentStyles as s } from './MyComponent.styles'

export function MyComponent({ isActive, className }) {
  return (
    <div className={cn(s.container, isActive && 'shadow-xl', className)}>
      <h2 className={s.title}>Title</h2>
    </div>
  )
}
```

**Rules:**
- Base styles stay in the styles file — clean, scannable, reusable
- Dynamic logic (`isActive`, `isHighlighted`, `expanded`) lives in the component via `cn()`
- Import styles with short alias: `import { styles as s } from './Name.styles'`
- **All class lists must be a single string literal — never `[...].join(' ')` and never `+` concatenation.** Splitting classes across array entries or concatenated strings makes them unsearchable: you can't grep for a class string copied from DevTools or the rendered markup.

```ts
// ✅ correct — single string literal (Prettier wraps long lines automatically)
section: 'flex flex-col items-center w-full md:flex-row md:h-[393px] lg:h-[510px] xl:h-[526px]',

// ❌ wrong — split strings break grep/search
section: [
  'flex flex-col items-center w-full',
  'md:flex-row md:h-[393px]',
].join(' '),

// ❌ wrong — same problem with concatenation
section:
  'flex flex-col items-center w-full ' +
  'md:flex-row md:h-[393px]',
```

## Text Rendering

**Always use `Text` from `@/components/shared/Text`** for rendering any text — never use raw `<h1>`–`<h6>`, `<p>`, or `<span>` tags directly. The `Text` component has responsive auto-scaling baked in via CSS media queries.

```tsx
import Text from '@/components/shared/Text'

// Headings
<Text text="Section Title" textStyle="h2" className={s.title} />
<Text text="Card Title" textStyle="h4" className={s.cardTitle} />

// Paragraphs
<Text text="Description here" textStyle="p" className={s.description} />
<Text text="Small text" textStyle="p-sm" className={s.small} />

// Inline (renders as span via asChild)
<Text text="£9.99" textStyle="h3" asChild className={s.price}><span /></Text>
```

**Default tag is `<span>`. Use `as="p"` / `as="h2"` / etc. to switch tags — do NOT wrap an empty child in `asChild`.** The Text component renders `<span>` by default and accepts an `as` prop to change the tag. The `asChild` form is for genuinely custom children (e.g. a `next/link` or a `motion.div`); using it with an empty `<span />` or `<p />` is pure boilerplate that hides what the code is doing.

```tsx
// ✅ default span — no ceremony needed
<Text textStyle="body-xs" text={eyebrow} className={s.eyebrow} />

// ✅ switch tag with `as=`
<Text as="p" textStyle="body-sm" text={description} className={s.description} />
<Text as="h2" textStyle="headline-3xl" text={title} className={s.title} />

// ❌ wrong — same DOM as the default, just noisier
<Text textStyle="body-xs" text={eyebrow} asChild className={s.eyebrow}>
  <span />
</Text>
```

**Available `textStyle` values:**
- Headlines (responsive auto-scale baked in): `headline-xl`, `headline-2xl`, `headline-3xl`, `headline-4xl`, `headline-5xl`, `headline-6xl`, `headline-7xl`, `headline-8xl`, `headline-9xl`
- Statistics: `statistic-5xl`, `statistic-7xl`, `statistic-8xl`
- Body (no breakpoint shift): `body-xs`, `body-sm`, `body-base`, `body-lg`
- Display: `display-lg`, `display-sm`
- Legacy aliases (still supported): `h1`–`h6`, `p-lg`, `p`, `p-sm`, `label`, `button`, `a`
- Escape hatch: `span` (no sizing applied — see rule below)

**Pick `textStyle` from the desktop Figma value. Stop.** The preset scales down to tablet and mobile automatically — don't look at the smaller-viewport Figma sizes, don't write `md:text-[Npx]` / `lg:font-bold`, don't add raw `text-[Npx]` to the className.

```tsx
// ❌ bypasses auto-scaling
<Text textStyle="span" className="text-[20px] leading-[28px] font-medium" />

// ✅ uses the preset; the className only carries overrides that apply at every breakpoint
<Text textStyle="headline-xl" className={s.cardTitle} />
```

`textStyle="span"` + raw px is an escape hatch only used when **no** preset matches the desktop Figma value. Open `src/components/shared/Text/Text.css` and check before reaching for it — almost every Figma size has a preset.

### Per-breakpoint exceptions (Figma takes precedence)

**Default rule still wins:** desktop Figma → `textStyle` preset → trust the auto-scale.

**Exception:** if you verify against Figma at the smaller breakpoints (md/lg/xl) and the preset's rendered size diverges from what Figma defines at that breakpoint, **Figma is the source of truth** — override the size for the affected breakpoint(s) on the className with `md:text-[Npx] md:leading-[Mpx]` (and the same shape for `lg:` / `xl:`).

This applies most often to floating UI cards, badges, and component instances that Figma physically resizes per breakpoint (so font-size, icon, padding, and radius all drop together) instead of relying on a font preset's responsive curve.

```tsx
// ✅ Desktop matches body-sm preset; Figma defines smaller, custom sizes
//    at the lower breakpoints, so override there.
const s = {
  cardLabel:
    'font-medium text-[var(--text-subtle)] ' +
    'text-[10px] leading-[14px] ' +              // mobile (Figma 360)
    'md:text-[13px] md:leading-[18px] ' +        // tablet (Figma 768)
    'lg:text-[11px] lg:leading-[15px]',          // laptop (Figma 1024)
                                                 // xl/desktop inherits body-sm
}
<Text textStyle="body-sm" className={s.cardLabel} />
```

**Process:**
1. Pick the desktop preset first, build the component, ship it.
2. Verify each breakpoint live (Playwright) against the Figma node for that viewport.
3. Only when a breakpoint genuinely diverges, add the breakpoint-specific override.
4. Each override is a documented divergence from the preset — keep them rare. If you're adding overrides at every breakpoint, the preset choice is wrong; reconsider.

### Picking the HTML tag vs the visual size

`Text` has two separate controls — **never conflate them**:

- **`as`** — the emitted HTML tag. Pick this from the **document outline** (which heading level makes sense under the page `h1` and the surrounding section). Visual size must not influence this.
- **`textStyle`** — the responsive-size preset. Pick this from the **desktop Figma value** (see "Pick `textStyle` from the desktop Figma value" rule above). When the desktop size doesn't match any preset, use `textStyle="span"` and size via the `className`.

**Heading tags (`h1`–`h6`) are reserved for real headings — always use them semantically, never for visual size.** If the node isn't a heading in the document outline (prices, labels, captions, metadata, pull-quote-style large text, etc.), don't emit a heading tag for it, no matter how big it looks in the design. Use `span` / `p` / `label` as the tag (via `as` or `asChild`) and drive the size from `className`.

**Why it matters:**
- **Screen readers expose `h1`–`h6` as navigation landmarks.** Users press a hotkey (`H` in most readers) to jump between headings, and the reader announces the level ("heading level 3"). A price rendered as `<h3>£1.99</h3>` pollutes that list and lies about what's a section.
- **Correct levels form a tree.** An `h3` must live under an `h2`, which must live under an `h1`. Picking a heading level by font size breaks the tree and leaves the outline nonsensical — e.g. `h1 → h4` (skipped levels) or two `h1`s on one page.
- **Search engines and content parsers use the same outline.** Misused headings degrade SEO and anything that scrapes structure (previews, AI summaries, reader mode).
- **Only one `h1` per page.** It's the page title. Block components must use `h2` or deeper.
- **Visual size and semantic level are independent.** Any tag (`span`, `p`, `div`) can be styled to any size with Tailwind. Visual hierarchy is a design concern; document outline is an accessibility concern.

**Bad example** — picking a heading tag because the design is large:

```tsx
// ❌ Figma shows the price at 36px, which visually matches our h2 preset.
// Rendered as <h2>£1.99</h2> — a screen reader now announces "heading level 2,
// one pound ninety-nine" and lists it in the heading navigator as if it were
// a top-level section of the page.
<Text textStyle="h2" text="£1.99" className={s.price} />

// ❌ Same mistake with an explicit `as`, which is even worse because the
// developer looked at the size preset and aligned the tag to it.
<Text as="h2" textStyle="h2" text="£1.99" className={s.price} />
```

**Good example** — same visual output, honest outline:

```tsx
// ✅ Renders as <span class="... text-4xl ...">. No heading landmark, no
// outline pollution, and the 36px visual size is driven entirely by the
// styles file (`s.price` contains `text-4xl leading-10 font-bold ...`).
<Text textStyle="span" text="£1.99" className={s.price} />
```

The same rule applies to labels, captions, metadata rows, pull quotes, hero eyebrows — any node that looks heading-sized but isn't structurally a heading.

It's normal and expected for `as` and `textStyle` to disagree, e.g. a `h3` subsection that's visually 20px (`textStyle="h5"`), or a price that's visually 36px but is not a heading (`as="span"` or `asChild` + `<span />`).

If you find yourself writing `!important` in the styles file to fight `textStyle`'s auto-scaling, that's the signal to switch to `textStyle="span"` and size via `className` instead.

## Component Reuse Priority

When building new components, check for existing reusable parts in this order:

1. `src/components/shared/` — project-specific components (Badge, Separator, ServiceCard, **Text**, LucideIcon, etc.)
2. `src/components/ui/` — shadcn/ui primitives (Button, Card, Dialog, etc.)
3. `lucide-react` — for icons

**Always use `Button` from `@/components/ui/button`** for any clickable action — never use raw `<button>` tags. Use the appropriate variant (`primary`, `secondary`, `tertiary`, etc.) and size (`sm`, `md`, `lg`, `icon`).

## Payload CMS Blocks

Blocks follow this file structure:

```
src/blocks/{BlockName}/
  config.ts              — Payload block field schema
  Component.tsx          — React server component
  {BlockName}.styles.ts  — Styles object
  {BlockName}.stories.tsx — Storybook story
```

Use `/create-payload-block` slash command to scaffold new blocks, or `/figma-to-component` to build a block from a Figma design URL (includes asset downloads, CMS data, and rendering verification).

### Reusable Payload fields

- `link()` from `@/fields/link` — CMS links. Use `overrides: { name: 'fieldName' }` for multiple link fields
- `linkGroup()` from `@/fields/linkGroup` — array of links
- `defaultLexical` from `@/fields/defaultLexical` — rich text with bold, italic, underline, links

### Block registration

1. Add config to `src/collections/Pages/index.ts` blocks array
2. Add component to `src/blocks/RenderBlocks.tsx` blockComponents map
3. Run `bun run payload generate:types`

## Styling

- **Tailwind CSS** with CSS variables for theming (`var(--text-strong)`, `var(--text-muted)`, `var(--surface-primary)`, etc.)
- **`cn()`** from `@/utilities/ui` for class merging (clsx + tailwind-merge) — **never use `clsx` directly**, always use `cn()` instead
- **Never hardcode hex colors** (e.g. `bg-[#a5dc77]`) — always use CSS variables from the theme or Tailwind config colors (black or white, e,g, bg-white). If a Figma design uses a color not in the config, **ask how to proceed** before implementing (add new CSS var? use closest match?)
- **Never use Tailwind named color tokens** like `bg-gray-900`, `text-red-500`, `bg-blue-100` etc. — these have been removed from `tailwind.config.mjs`. Always use semantic CSS variables instead (e.g. `bg-[var(--surface-canvas)]`, `text-[var(--text-strong)]`). This applies to all code including Storybook stories. When `get_design_context` returns code with named Tailwind colors, replace them with the correct CSS variable before using.
- **Never hardcode pixel values** in Tailwind classes (e.g. `rounded-[4px]`, `text-[14px]`, `p-[10px]`) — always use Tailwind config tokens (`rounded-md`, `text-sm`, `p-2.5`). If no token matches, use the closest available one.
- **Never override base component styles** (Button, Input, etc. in `src/components/ui/`) from block/page code. If a component's style doesn't match the design, fix the base component itself or use a specific variant — don't add className overrides like `rounded-md` on top of a Button.
- Colors are defined in `tailwind.config.mjs` (semantic theme tokens) and `src/app/(frontend)/globals.css` (CSS variables)
- Match Figma designs exactly — map Figma tokens to existing theme variables

## Client-Only / Mount Detection

**Never use `useState(false)` + `useEffect` to detect client mount.** Use `useSyncExternalStore` instead — it resolves synchronously with no extra render cycle.

```tsx
import { useSyncExternalStore } from 'react'

const hasMounted = useSyncExternalStore(() => () => {}, () => true, () => false)
```

The three arguments are `(subscribe, getClientSnapshot, getServerSnapshot)`. React calls `getServerSnapshot()` during SSR/hydration and `getClientSnapshot()` on the client — no second render, no layout shift.

**Bad:**
```tsx
// ❌ Causes a double render — first render skips auth UI, second render shows it
const [hasMounted, setHasMounted] = useState(false)
useEffect(() => { setHasMounted(true) }, [])
```

**Good:**
```tsx
// ✅ Synchronous — server gets false, client gets true, single render
const hasMounted = useSyncExternalStore(() => () => {}, () => true, () => false)
```

## Forms

**Always use `react-hook-form`** for all forms. Use the shadcn/ui form wrapper components from `@/components/ui/form`.

### Pattern

```tsx
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// 1. Define form values type
interface FormValues {
  email: string
  name: string
}

// 2. Initialize useForm
const form = useForm<FormValues>({
  defaultValues: { email: '', name: '' },
})

// 3. Render with Form provider + FormField for each input
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      rules={{ required: 'Email is required' }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Enter email" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>
```

**Rules:**
- Use `FormField` with `control` prop for controlled fields — never use raw `register()` for new forms
- Use `FormMessage` for error display — it reads errors from form context automatically
- For reusable form inputs, follow customer-portal's `InputHookForm` pattern: wrap `FormField` + `FormItem` + `FormControl` into a single component that accepts `control`, `name`, `label`, `error` props
- Place HookForm wrapper components in `src/components/HookForm/` (e.g. `InputHookForm`, `SelectHookForm`)

## Storybook

- Title prefix: `Blocks/` for Payload blocks, `Base Components/` for shared, `Components/` for ui
- Layout: `fullscreen` for blocks, `centered` for smaller components
- Always include the `surface-canvas` decorator for block stories
- Create multiple variants for edge cases

## Live App Verification

Before making any claim about how the deployed or dev-running app renders, fetches, or behaves in the browser, **always verify it live with the Playwright plugin** — do not rely on reading source code and reasoning about what the browser will do.

This includes:
- Image optimization (what `srcset` / `sizes` actually produces, what bytes ship for each viewport)
- Rendering at specific viewports (mobile, tablet, retina)
- Network requests, response sizes, content types, headers
- Console errors, runtime behavior, computed styles

If the Playwright plugin is unavailable in the current session, stop and ask why — do not silently substitute `curl`, WebFetch, `agent-browser`, or another browser tool.

### ALWAYS ignore HTTPS errors when opening the browser (dev server is https with an untrusted cert)

The local dev server runs over **https with a self-signed / `mkcert` certificate** that Chromium does not trust, so a plain browser navigation lands on the **"Your connection is not private" interstitial** and the automation **hangs there forever** (the page never reaches the app, screenshots/`browser_evaluate` capture the warning screen). This is the single most common reason a verification run silently stalls.

**Whenever you open a browser against the dev server (or any branch preview on an untrusted cert), ignore HTTPS/cert errors — never navigate without it:**

- **Standalone Playwright script** (the usual agent fallback): launch Chromium with `--ignore-certificate-errors`, **and** create the context with `ignoreHTTPSErrors: true`:
  ```js
  const browser = await chromium.launch({ args: ['--ignore-certificate-errors'] })
  const context = await browser.newContext({ ignoreHTTPSErrors: true })
  ```
- **Playwright MCP plugin / any CLI launch**: pass `--ignore-https-errors` (the Playwright MCP flag) / the Chromium `--ignore-certificate-errors` arg so the cert interstitial is bypassed.
- Navigate the `https://localhost:<port>` URL **directly** — do NOT stand up an http→https proxy (the old proxy workaround was itself a fragile stall point).
- If you ever see a screenshot that is the browser's "Your connection is not private" / `NET::ERR_CERT_AUTHORITY_INVALID` page, that is this problem — relaunch with the flag, do not retry the same navigation.

(Related: the dev server is **https not http** — see `feedback_restart_stuck_dev_server.md` / `feedback_playwright_mcp_live_checks.md`.)

## Figma Design Verification

After creating any new component from a Figma design, **always verify the rendered output against Figma** using browser automation (Playwright MCP) and Figma MCP:

1. Use `get_screenshot` (Figma MCP) to capture the original design
2. Use `browser_navigate` + `browser_take_screenshot` (Playwright MCP) to capture the rendered component
3. Compare **every element**: typography sizes/weights/colors, spacing, layout, icons, buttons
4. Use `get_variable_defs` (Figma MCP) to look up Figma token names for colors and map them to CSS variables
5. Fix mismatches before considering the component done

**Common pitfalls to check:**
- `Text` component `textStyle` auto-scales — pick the closest match to Figma's fixed px size at desktop
- Icon colors: Figma often uses accent/green, not text-strong
- `text-subtle` vs `text-muted` — these are different colors, check which Figma uses
- Never hardcode hex colors — always map to CSS variables
