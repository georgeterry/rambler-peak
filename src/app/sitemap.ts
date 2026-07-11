import type { MetadataRoute } from 'next';
import { site } from '@/lib/seo';
import { products } from '@/data/products';
import { guides } from '@/data/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    '',
    '/shop',
    '/guides',
    '/about',
    '/support',
    '/contact',
    '/privacy',
    '/terms',
    '/shipping-returns',
  ];

  return [
    ...routes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.7,
    })),
    ...products.map((p) => ({
      url: `${site.url}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...guides.map((g) => ({
      url: `${site.url}/guides/${g.slug}`,
      lastModified: new Date(g.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
