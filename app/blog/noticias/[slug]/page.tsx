import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import AdBanner from '../../../../components/AdBanner';

// ==========================================
// 1. FUNCIÓN DE METADATA (EXCLUSIVA PARA SEO)
// ==========================================
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const { data: articulo } = await supabase
    .from('articulos')
    .select('titulo, subcategoria, imagen_portada')
    .eq('slug', slug)
    .single();

  if (!articulo) {
    return { title: 'Reporte no encontrado | EscudoForex' };
  }

  return {
    title: `${articulo.titulo} | Radar de Mercado EscudoForex`,
    description: `Análisis técnico y fundamental sobre eventos macroeconómicos. Descubre el impacto en las principales divisas de LATAM.`,
    openGraph: {
      title: articulo.titulo,
      description: `Radar de Mercado: Análisis en profundidad y escenarios de volatilidad para traders institucionales.`,
      url: `https://www.escudoforex.com/blog/noticias/${slug}`, // Cambia por tu dominio real
      siteName: 'EscudoForex',
      images: [
        {
          url: articulo.imagen_portada?.startsWith('http') ? articulo.imagen_portada : 'https://www.escudoforex.com/default-news.jpg',
          width: 1200,
          height: 630,
        },
      ],
      type: 'article',
    },
  };
}

// ==========================================
// 2. FUNCIÓN PRINCIPAL (EL DISEÑO VISUAL)
// ==========================================
export default async function NoticiaDinamica({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const { data: articulo, error } = await supabase
    .from('articulos')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] p-6 text-white">
        <div className="bg-red-900/20 border-2 border-red-500/50 p-8 rounded-2xl max-w-2xl text-center shadow-2xl">
          <span className="text-5xl block mb-4">🕵️‍♂️</span>
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error al buscar el reporte</h1>
          <pre className="bg-black/50 text-green-400 p-4 rounded-xl text-left overflow-auto text-sm border border-gray-800">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  if (!articulo) {
    notFound();
  }

  const fechaFormateada = new Date(articulo.fecha_publicacion).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="min-h-screen bg-gray-50 text-escudo-text pb-20">
      
      {/* CABECERA CON IMAGEN DE FONDO (Diseño Radar de Mercado) */}
      <header className="bg-[#0f172a] text-white py-16 md:py-24 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] border-b-4 border-escudo-accent">
        
        {articulo.imagen_portada && articulo.imagen_portada.startsWith('http') && (
          <div className="absolute inset-0 z-0">
            <img 
              src={articulo.imagen_portada} 
              alt="Fondo del artículo" 
              className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
          </div>
        )}
        
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <div className="flex justify-center gap-3 mb-6">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-block shadow-lg">
              {articulo.subcategoria}
            </span>
            <span className="bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide inline-block backdrop-blur-md">
              📅 {fechaFormateada}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-xl text-white">
            {articulo.titulo}
          </h1>
        </div>
      </header>

      {/* CUERPO DEL ANÁLISIS */}
      <article className="container mx-auto px-6 max-w-4xl -mt-8 relative z-10">
        <div className="bg-white p-8 md:p-14 rounded-2xl shadow-xl border border-gray-100">
          
          <AdBanner />

          {/* EL CONTENIDO HTML GENERADO POR LA IA */}
          <div 
            className="text-gray-800 text-lg leading-relaxed space-y-6 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-[#0f172a] [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:border-b [&>h2]:border-gray-100 [&>h2]:pb-2 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-escudo-primary [&>h3]:mt-8 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-6 [&>ul>li]:mb-2 [&>p>strong]:text-[#0f172a] [&>p>a]:text-escudo-accent hover:[&>p>a]:underline"
            dangerouslySetInnerHTML={{ __html: articulo.contenido_html }} 
          />

          <div className="mt-12 pt-8 border-t border-gray-100">
            <AdBanner />
          </div>

        </div>
      </article>

      {/* CTA FINAL */}
      <section className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-escudo-primary rounded-3xl p-10 text-center text-white shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">¿Impactará a tu moneda favorita?</h2>
          <p className="text-base text-white/80 mx-auto mb-8">
            Los datos fundamentales requieren una ejecución ultra rápida. Compara y elige brokers con tecnología ECN real y spreads desde 0.0 pips.
          </p>
          <a href="/#tabla-brokers" className="inline-block bg-white text-escudo-primary-dark px-8 py-4 rounded-xl font-extrabold text-lg hover:bg-gray-100 transition-all shadow-lg">
            Ver Brokers Recomendados
          </a>
        </div>
      </section>

    </main>
  );
}