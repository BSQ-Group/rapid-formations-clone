import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { OurLatestBlogsBlock as OurLatestBlogsBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { Media } from '@/components/Media'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { ScrollCarousel } from '@/components/shared/ScrollCarousel'
import { stripHtml, readingTime } from '@/utilities/formatting'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { ourLatestBlogsStyles as s } from './OurLatestBlogs.styles'

type Props = OurLatestBlogsBlockProps

type WpPost = {
  link: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      alt_text?: string
      source_url?: string
      media_details?: { sizes?: Record<string, { source_url?: string }> }
    }>
  }
}

type ApiCard = {
  id: string
  title: string
  description: string
  readTime: string
  href: string
  imageUrl?: string
  imageAlt: string
}

const BLOG_API_URL = 'https://www.qualityformationsblog.co.uk/wp-json/wp/v2/posts?_embed&per_page=6'

async function fetchBlogPosts(): Promise<WpPost[] | null> {
  try {
    const res = await fetch(BLOG_API_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return null
    const data = (await res.json()) as unknown
    return Array.isArray(data) ? (data as WpPost[]) : null
  } catch {
    return null
  }
}

function mapApiCards(posts: WpPost[]): ApiCard[] {
  return posts.map((p, i) => {
    const featured = p._embedded?.['wp:featuredmedia']?.[0]
    const sizes = featured?.media_details?.sizes ?? {}
    const imageUrl =
      sizes.medium_large?.source_url ??
      sizes.medium?.source_url ??
      sizes.large?.source_url ??
      featured?.source_url
    return {
      id: `wp-${i}`,
      title: stripHtml(p.title?.rendered ?? ''),
      description: stripHtml(p.excerpt?.rendered ?? ''),
      readTime: readingTime(p.content?.rendered ?? ''),
      href: p.link,
      imageUrl,
      imageAlt: featured?.alt_text || stripHtml(p.title?.rendered ?? ''),
    }
  })
}

export const OurLatestBlogsBlock: React.FC<Props> = async ({
  heading,
  cards: cmsCards,
  viewBlogLink,
  sectionLayout,
}) => {
  const posts = await fetchBlogPosts()
  const apiCards = posts && posts.length > 0 ? mapApiCards(posts) : null

  if (!apiCards && (!cmsCards || cmsCards.length === 0)) return null

  const viewBlogHref = getLinkHref(viewBlogLink as LinkData)
  const viewBlogLabel = viewBlogLink?.label || 'View our Blog'

  const viewBlogButton = viewBlogLink ? (
    <Link
      href={viewBlogHref}
      target={viewBlogLink.newTab ? '_blank' : undefined}
      className={cn(buttonVariants({ variant: 'secondary', size: 'md' }), 'w-full md:w-auto')}
    >
      {viewBlogLabel}
    </Link>
  ) : null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.header}>
        {heading && <Text as="h2" textStyle="headline-5xl" text={heading} className={s.heading} />}
      </div>
      <ScrollCarousel bleedBoth centerControl={viewBlogButton}>
        {apiCards
          ? apiCards.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className={s.card}
              >
                {card.imageUrl && (
                  <div className={s.cardImageWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.imageUrl}
                      alt={card.imageAlt}
                      className={`${s.cardImage} absolute inset-0 w-full h-full`}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className={s.cardText}>
                  <Text as="h3" textStyle="headline-xl" text={card.title} className={s.cardTitle} />
                  <Text
                    textStyle="body-sm"
                    text={card.description}
                    className={`${s.cardDescription} line-clamp-3`}
                  />
                </div>
                <div className={s.cardFooter}>
                  <span className={s.cardBadge}>
                    <Text textStyle="body-sm" text={card.readTime} className={s.cardBadgeText} />
                  </span>
                  <span className={s.cardCta}>
                    <Text textStyle="body-sm" text="Read more" className={s.cardCtaText} />
                    <ArrowUpRight size={24} className={s.cardCtaIcon} />
                  </span>
                </div>
              </Link>
            ))
          : (cmsCards ?? []).map((card, index) => {
              const cardLink = card.link as LinkData | undefined
              const href = getLinkHref(cardLink)
              const hasImage = card.image && typeof card.image === 'object'
              return (
                <Link
                  key={card.id ?? index}
                  href={href}
                  target={cardLink?.newTab ? '_blank' : undefined}
                  className={s.card}
                >
                  {hasImage && (
                    <div className={s.cardImageWrapper}>
                      <Media
                        resource={card.image}
                        alt={card.title}
                        fill
                        imgClassName={s.cardImage}
                      />
                    </div>
                  )}
                  <div className={s.cardText}>
                    <Text
                      as="h3"
                      textStyle="headline-xl"
                      text={card.title}
                      className={s.cardTitle}
                    />
                    <Text
                      textStyle="body-sm"
                      text={card.description}
                      className={`${s.cardDescription} line-clamp-3`}
                    />
                  </div>
                  <div className={s.cardFooter}>
                    {card.readTime && (
                      <span className={s.cardBadge}>
                        <Text
                          textStyle="body-sm"
                          text={card.readTime}
                          className={s.cardBadgeText}
                        />
                      </span>
                    )}
                    <span className={s.cardCta}>
                      <Text textStyle="body-sm" text="Read more" className={s.cardCtaText} />
                      <ArrowUpRight size={24} className={s.cardCtaIcon} />
                    </span>
                  </div>
                </Link>
              )
            })}
      </ScrollCarousel>
    </SectionWrapper>
  )
}
