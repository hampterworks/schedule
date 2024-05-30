import { MetadataRoute } from 'next'

const sitemap =(): MetadataRoute.Sitemap => {
  return [
    {
      url: 'https://hampterworks.github.io/schedule/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://hampterworks.github.io/schedule/design',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    }
  ]
}

export default sitemap
