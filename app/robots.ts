import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Protege rutas privadas si las creas después
    },
    sitemap: 'https://www.escudoforex.com/sitemap.xml', // 🔴 CAMBIA POR TU DOMINIO
  };
}