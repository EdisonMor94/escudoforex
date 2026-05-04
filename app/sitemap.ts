import { MetadataRoute } from 'next';
import { supabase } from '../lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.escudoforex.com'; // 🔴 CAMBIA ESTO POR TU DOMINIO REAL

  // 1. Rutas estáticas principales
  const rutasEstaticas = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/blog/educacion`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog/noticias`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
  ];

  // 2. Traer todos los artículos dinámicos desde Supabase
  const { data: articulos } = await supabase
    .from('articulos')
    .select('slug, categoria, fecha_publicacion');

  const rutasDinamicas = (articulos || []).map((articulo) => ({
    url: `${baseUrl}/blog/${articulo.categoria}/${articulo.slug}`,
    lastModified: new Date(articulo.fecha_publicacion),
    changeFrequency: articulo.categoria === 'noticias' ? 'never' as const : 'monthly' as const,
    priority: articulo.categoria === 'noticias' ? 0.7 : 0.8,
  }));

  return [...rutasEstaticas, ...rutasDinamicas];
}