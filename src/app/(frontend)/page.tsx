import PageTemplate, { generateMetadata } from './[...slug]/page'

export { generateMetadata }

export default function HomePage(props: Parameters<typeof PageTemplate>[0]) {
  return <PageTemplate {...props} />
}
