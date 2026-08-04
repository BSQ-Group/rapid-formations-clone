import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { HeaderClient } from './Component.client'

import type { Header as HeaderType } from '@/payload-types'

const getHeaderGlobal = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    return payload.findGlobal({ slug: 'header', depth: 1 })
  },
  ['global', 'header'],
  { tags: ['global_header'] },
)

export async function Header({ onDark = false }: { onDark?: boolean }) {
  const headerData = (await getHeaderGlobal()) as HeaderType

  return <HeaderClient data={headerData} onDark={onDark} />
}
