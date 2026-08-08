import type { MetadataRoute } from 'next';
import { appConfig } from '@/config/app';

const publicRoutes = [
  '',
  '/tarifs',
  '/faq',
  '/contact',
  '/connexion',
  '/inscription',
  '/confidentialite',
  '/conditions',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${appConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.6,
  }));
}
