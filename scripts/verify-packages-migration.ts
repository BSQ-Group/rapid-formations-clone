/** Read-only check that the migration produced a correctly-populated data layer. */
import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  const payload = await getPayload({ config })

  const pkgs = await payload.find({ collection: 'packages', depth: 0, limit: 100, sort: 'order' })
  const prods = await payload.find({ collection: 'products', depth: 0, limit: 200 })
  console.log(`packages=${pkgs.totalDocs}  products=${prods.totalDocs}\n`)
  for (const p of pkgs.docs) {
    console.log(
      `  ${p.slug}  [${p.packageType} #${p.order}]  ${p.price}  products=${(p.products || []).length}  buyLink=${JSON.stringify((p as any).buyLink?.url ?? (p as any).buyLink?.reference ?? null)}`,
    )
  }

  // Simulate the page route query (default depth 2) for each compare page.
  for (const url of ['/compare-packages', '/compare-packages/non-residents', '/compare-packages/guarantee', '/compare-packages/llp']) {
    const res = await payload.find({ collection: 'pages', where: { fullPath: { equals: url } }, limit: 1 })
    const page = res.docs[0]
    const block = (page?.layout || []).find((b: any) => b.blockType === 'comparePackageTable') as any
    if (!block) { console.log(`\n${url}: NO comparePackageTable block`); continue }
    const cols = (block.packages || []).map((c: any) =>
      typeof c.package === 'object' && c.package
        ? `${c.package.name}(${(c.package.products || []).filter((r: any) => typeof r.product === 'object').length} products populated)`
        : `UNPOPULATED(${c.package})`,
    )
    console.log(`\n${url}\n   status=${page?._status}  columns: ${cols.join(' | ')}`)
  }

  process.exit(0)
}
main().catch((e) => { console.error(e); process.exit(1) })
