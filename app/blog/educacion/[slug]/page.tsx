import React from 'react';
import { notFound } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import AdBanner from '../../../../components/AdBanner';

export default async function ArticuloDinamico({ params }: { params: Promise<{ slug: string }> }); 
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Buscamos el artículo
  const { data: articulo, error } = await supabase
    .from('articulos')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="bg-red-50 border-2 border-red-500 p-8 rounded-2xl max-w-2xl text-center shadow-xl">
          <span className="text-5xl block mb-4">🕵️‍♂️</span>
          <h1 className="text-2xl font-bold text-red-700 mb-4">¡Te atrapé! Este es el error de Supabase:</h1>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-left overflow-auto text-sm">
            {JSON.stringify(error, null, 2)}
          </pre>
          <p className="mt-6 text-gray-700 font-medium">Revisa las políticas RLS o si el slug existe.</p>
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
      
      {/* CABECERA CON IMAGEN DE FONDO */}
      <header className="bg-escudo-primary text-white py-16 md:py-24 relative overflow-hidden flex flex-col items-center justify-center min-h-[350px]">
        
        {/* IMAGEN DE FONDO CON OVERLAY OSCURO */}
        {articulo.imagen_portada && articulo.imagen_portada.startsWith('http') && (
          <div className="absolute inset-0 z-0">
            <img 
              src={articulo.imagen_portada} 
              alt="Fondo del artículo" 
              className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-escudo-primary-dark/80"></div>
          </div>
        )}
        
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <div className="flex justify-center gap-3 mb-6">
            <span className="bg-escudo-accent text-escudo-primary-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-block">
              {articulo.subcategoria}
            </span>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide inline-block backdrop-blur-sm">
              📅 {fechaFormateada}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            {articulo.titulo}
          </h1>
        </div>
      </header>

      {/* CUERPO DEL ARTÍCULO */}
      <article className="container mx-auto px-6 max-w-4xl -mt-8 relative z-10">
        <div className="bg-white p-8 md:p-14 rounded-2xl shadow-xl border border-gray-100">
          
          {/* BANNER SUPERIOR */}
          <AdBanner />

          {/* CONTENIDO HTML */}
          <div 
            className="text-gray-800 text-lg leading-relaxed space-y-6 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-escudo-primary-dark [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-escudo-primary [&>h3]:mt-8 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-6 [&>p>a]:text-escudo-accent [&>p>a]:font-bold hover:[&>p>a]:underline"
            dangerouslySetInnerHTML={{ __html: articulo.contenido_html }} 
          />

          {/* BANNER INFERIOR */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <AdBanner />
          </div>

        </div>
      </article>

      {/* CTA FINAL */}
      <section className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-escudo-primary-dark rounded-3xl p-10 text-center text-white shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">¿Listo para aplicar lo aprendido?</h2>
          <p className="text-base text-white/80 mx-auto mb-8">
            Abre tu cuenta en un broker regulado y seguro. Protege tu capital con nuestras recomendaciones auditadas.
          </p>
          <a href="/#tabla-brokers" className="inline-block bg-escudo-accent text-escudo-primary-dark px-8 py-4 rounded-xl font-extrabold text-lg hover:brightness-110 transition-all shadow-lg">
            Ver Mejores Brokers de {new Date().getFullYear()}
          </a>
        </div>
      </section>

    </main>
  );
}