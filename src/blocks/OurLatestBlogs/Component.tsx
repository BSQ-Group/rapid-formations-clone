import React from 'react'
import Link from 'next/link'

import type { OurLatestBlogsBlock as OurLatestBlogsBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { CtaLink } from '@/components/shared/CtaLink'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getBrand, getDomainConfig } from '@/lib/brand'
import { stripHtml } from '@/utilities/formatting'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { ourLatestBlogsStyles as s } from './OurLatestBlogs.styles'

type Props = OurLatestBlogsBlockProps

type WpPost = {
  link: string
  title: { rendered: string }
  excerpt: { rendered: string }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      alt_text?: string
      source_url?: string
      media_details?: { sizes?: Record<string, { source_url?: string }> }
    }>
  }
}

type FeedCard = {
  id: string
  title: string
  description: string
  href: string
  imageUrl?: string
  imageAlt: string
}

const POST_COUNT = 3

async function fetchBlogPosts(): Promise<WpPost[] | null> {
  const { blogUrl } = getDomainConfig(getBrand())
  if (!blogUrl) return null

  try {
    const res = await fetch(
      `${blogUrl}/wp-json/wp/v2/posts?_embed&per_page=${POST_COUNT}`,
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      },
    )
    if (!res.ok) return null
    const data = (await res.json()) as unknown
    return Array.isArray(data) ? (data as WpPost[]) : null
  } catch {
    return null
  }
}

function mapFeedCards(posts: WpPost[]): FeedCard[] {
  return posts.map((p, i) => {
    const featured = p._embedded?.['wp:featuredmedia']?.[0]
    const sizes = featured?.media_details?.sizes ?? {}
    const imageUrl =
      sizes.medium_large?.source_url ??
      sizes.medium?.source_url ??
      sizes.large?.source_url ??
      featured?.source_url
    const title = stripHtml(p.title?.rendered ?? '')
    return {
      id: `wp-${i}`,
      title,
      description: stripHtml(p.excerpt?.rendered ?? ''),
      href: p.link,
      imageUrl,
      imageAlt: featured?.alt_text || title,
    }
  })
}

export const OurLatestBlogsBlock: React.FC<Props> = async ({
  heading,
  cardCtaLabel,
  cards: cmsCards,
  viewBlogLink,
  sectionLayout,
}) => {
  const posts = await fetchBlogPosts()
  const feedCards = posts && posts.length > 0 ? mapFeedCards(posts) : null

  if (!feedCards && (!cmsCards || cmsCards.length === 0)) return null

  const ctaLabel = cardCtaLabel || 'Read Post'
  const viewBlogHref = getLinkHref(viewBlogLink as LinkData | undefined)

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <Text as="h2" textStyle="span" text={heading} className={s.heading} />
        <div className={s.grid}>
          {feedCards
            ? feedCards.map((card) => (
                <article key={card.id} className={s.card}>
                  {card.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={card.imageUrl}
                      alt={card.imageAlt}
                      className={s.cardImage}
                      loading="lazy"
                    />
                  )}
                  <div className={s.cardBody}>
                    <Text as="h3" textStyle="span" className={s.cardTitle} asChild>
                      <Link href={card.href} className={s.cardTitleLink}>
                        {card.title}
                      </Link>
                    </Text>
                    <Text
                      as="p"
                      textStyle="span"
                      text={card.description}
                      className={s.cardDescription}
                    />
                    <div className={s.cardCtaWrap}>
                      <CtaLink href={card.href} label={ctaLabel} size="md" />
                    </div>
                  </div>
                </article>
              ))
            : (cmsCards ?? []).map((card, index) => {
                const cardLink = card.link as LinkData | undefined
                const href = getLinkHref(cardLink)
                return (
                  <article key={card.id ?? index} className={s.card}>
                    {card.image && (
                      <Media
                        resource={card.image}
                        alt={card.title}
                        imgClassName={s.cardImage}
                        loading="lazy"
                      />
                    )}
                    <div className={s.cardBody}>
                      <Text as="h3" textStyle="span" className={s.cardTitle} asChild>
                        <Link
                          href={href}
                          target={cardLink?.newTab ? '_blank' : undefined}
                          className={s.cardTitleLink}
                        >
                          {card.title}
                        </Link>
                      </Text>
                      <Text
                        as="p"
                        textStyle="span"
                        text={card.description}
                        className={s.cardDescription}
                      />
                      <div className={s.cardCtaWrap}>
                        <CtaLink
                          href={href}
                          label={ctaLabel}
                          newTab={cardLink?.newTab}
                          size="md"
                        />
                      </div>
                    </div>
                  </article>
                )
              })}
        </div>
        {viewBlogLink?.label && (
          <div className={s.ctaWrap}>
            <CtaLink
              href={viewBlogHref}
              label={viewBlogLink.label}
              newTab={viewBlogLink.newTab}
              size="lg"
              className={s.viewBlogCta}
            />
          </div>
        )}
      </Container>
    </SectionWrapper>
  )
}
