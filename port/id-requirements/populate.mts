/**
 * Creates the /id-requirements page. Run from the repo root:
 *   DRY_RUN=1 NODE_OPTIONS=--no-deprecation bunx tsx port/id-requirements/populate.mts
 *   NODE_OPTIONS=--no-deprecation bunx tsx port/id-requirements/populate.mts
 *
 * MUST NOT run before the `noindex` field is on the deployed build. The source
 * marks this page `noindex, nofollow`; Payload drops unknown fields on read, so
 * a build without it would serve the page indexable and an admin save would
 * strip the stored value.
 */
import 'dotenv/config'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import config from '@payload-config'

import { defaultLexical } from '../../src/fields/defaultLexical.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DRY_RUN = Boolean(process.env.DRY_RUN)

type Data = {
  slug: string
  title: string
  meta: { title: string; description: string }
  robots: string
  canonical: string
  variant: string
  body: string
}

const data: Data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'))

const payload = await getPayload({ config })

const pages = payload.config.collections.find((c) => c.slug === 'pages')
const has = (token: string) => pages?.fields.some((f) => JSON.stringify(f).includes(token))

if (!has('textContent') || !has('pageTitle')) {
  throw new Error('pageTitle/textContent are not registered — run this from a build that has them')
}

if (!has('noindex')) {
  throw new Error('the noindex field is not registered — this page is noindex, nofollow at source')
}

const editorConfig = await editorConfigFactory.fromEditor({
  config: payload.config,
  editor: defaultLexical,
})

const body = convertMarkdownToLexical({ editorConfig, markdown: data.body })

const payloadData = {
  title: data.title,
  layout: [
    {
      blockType: 'pageTitle' as const,
      sectionLayout: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    },
    {
      blockType: 'textContent' as const,
      body,
      variant: data.variant,
      sectionLayout: { background: 'light', paddingTop: 'none', paddingBottom: 'l' },
    },
  ] as never,
  meta: {
    title: data.meta.title,
    description: data.meta.description,
    noindex: data.robots.includes('noindex'),
  },
  _status: 'published' as const,
}

const existing = await payload.find({
  collection: 'pages',
  where: { slug: { equals: data.slug } },
  limit: 1,
})

if (DRY_RUN) {
  const headings = body.root.children.filter((c: { type: string }) => c.type === 'heading').length
  console.log(
    `${existing.docs.length ? 'would update' : 'would create'}  /${data.slug}`,
    `\n    h1           ${payloadData.title}`,
    `\n    meta.title   ${payloadData.meta.title}`,
    `\n    noindex      ${payloadData.meta.noindex}`,
    `\n    variant      ${data.variant}`,
    `\n    body         ${body.root.children.length} nodes, ${headings} headings, ${data.body.split(/\s+/).length} words`,
  )
  process.exit(0)
}

if (existing.docs.length) {
  await payload.update({
    collection: 'pages',
    id: existing.docs[0].id,
    data: payloadData,
    context: { disableRevalidate: true },
  })
  console.log('updated', data.slug)
} else {
  await payload.create({
    collection: 'pages',
    data: { ...payloadData, slug: data.slug },
    context: { disableRevalidate: true },
  })
  console.log('created', data.slug)
}

process.exit(0)
