# T11 / CORE-6966 — SPIKE: is the "Helpful guides" blog feed dynamic or curated?

**Answered:** 2026-08-24 · **Verdict:** **DYNAMIC** — and working correctly.
**Recommendation:** close [CORE-6966](https://linear.app/bsq-group/issue/CORE-6966/rf-helpful-guides-blog-shows-different-posts-to-live-confirm-dynamic) as **by-design. No code change.**
**Scope honoured:** no source changes, no merge — report only.

## The answer

The homepage "Helpful guides, advice and business tips from our team" section is the
`ourLatestBlogs` block. It fetches the **latest 3 posts from the brand's live WordPress
REST API at render time**:

`src/blocks/OurLatestBlogs/Component.tsx`

```ts
const POST_COUNT = 3

async function fetchBlogPosts(): Promise<WpPost[] | null> {
  const { blogUrl } = getDomainConfig(getBrand())
  if (!blogUrl) return null
  const res = await fetch(`${blogUrl}/wp-json/wp/v2/posts?_embed&per_page=${POST_COUNT}`, {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(5000),
  })
  ...
}
```

`blogUrl` resolves per brand (`src/lib/brand.ts`) — for RF, `https://www.rapidformationsblog.co.uk`.
Cached for **1 hour** (`revalidate: 3600`), 5s timeout.

The CMS `cards` array is **not** the content source. Its own admin description in
`config.ts` says so:

> "Editorial fallback. Used only when the brand blog feed cannot be reached at render time."

The component renders `feedCards` when the fetch succeeds and falls back to `cmsCards`
only when it returns nothing.

## Proof it is on the live-feed path, not the fallback

The two paths render differently — feed cards use a raw `<img src>` pointing at
WordPress; fallback cards use the Payload `<Media>` component (`/api/media/file/...`).
The clone serves the WordPress URLs, so the feed path is active.

**What the RF WordPress feed returns right now:**

1. A small business guide to taking card payments
2. Issuing shares 101: What startup founders should know
3. 15 Out of office email templates for small business owners

**What the clone homepage renders right now:** the same three titles, same order, with
images from `rapidformationsblog.co.uk/wp-content/uploads/…` and links to
`rapidformations.co.uk/blog/…`.

Exact match. Correct brand blog. Feed path confirmed.

## Why the ticket saw a mismatch

Both sites render "the latest 3 posts" from the same feed, each behind its own cache
(the clone revalidates hourly). Two snapshots taken at different moments — or either
side's cache being warm at a different point — show different posts. That is the
designed behaviour, not a defect: **the clone will never match a live snapshot, and
should not.**

Two of the three titles the ticket lists as "clone-only" (*Issuing shares 101*, *15 Out
of office email templates*) are in today's feed, which is consistent with cache timing
rather than divergent content.

The ticket also notes "Read Post links are each correctly wired to their own post" —
confirmed; each card links to its own `rapidformations.co.uk/blog/…` URL.

## Acceptance criteria

| AC | Result |
|---|---|
| Report states definitively dynamic vs curated, citing block config + query | **PASS** — dynamic; `config.ts` + `Component.tsx` cited above |
| If dynamic: document as by-design, recommend closing, no code change | **PASS** — recommended, no code touched |
| If curated: name the selecting field | n/a — not curated |
| No source changes, no merge | **PASS** |
