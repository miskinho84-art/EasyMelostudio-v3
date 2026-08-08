import type { MetadataRoute } from 'next';
import { appConfig } from '@/config/app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/creer-une-chanson', '/bibliotheque', '/historique', '/parametres'],
    },
    sitemap: `${appConfig.url}/sitemap.xml`,
  };
}
