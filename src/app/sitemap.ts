import type { MetadataRoute } from 'next';
import { site } from '@/lib/seo';
import { products } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    '',
    '/shop',
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
  ];
}
