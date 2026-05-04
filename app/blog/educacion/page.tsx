"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

interface Articulo {
  id: number;
  slug: string;
  titulo: string;
  categoria: string;
  subcategoria: string;
  imagen_portada: string;
  fecha_publicacion: string;
}

export default function BlogEducacion() {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [filtro, setFiltro] = useState<string>('Todos');
  const [paginaActual, setPaginaActual] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Estados para el Newsletter
  const [emailBlog, setEmailBlog] = useState('');
  const [isSubmittingBlog, setIsSubmittingBlog] = useState(false);
  const [successBlog, setSuccessBlog] = useState(false);
  
  const articulosPorPagina = 10;

  // Cargar artículos desde Supabase
  useEffect(() => {
    let isMounted = true;

    const fetchArticulos = async () => {
      try {
        const { data, error } = await supabase
          .from('articulos')
          .select('*')
          .eq('categoria', 'educacion')
          .order('fecha_publicacion', { ascending: false });

        if (error) throw error;

        if (isMounted) {
          setArticulos(data || []);
        }
      } catch (error) {
        console.error("Error fatal cargando artículos:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchArticulos();

    return () => {
      isMounted = false;
    };
  }, []);

  // Guardar correo de forma segura (sin upsert que bloquea RLS)
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBlog(true);

    try {
      const { error } = await supabase
        .from('suscriptores')
        .insert([{ 
          correo: emailBlog, 
          origen: 'Blog Educativo'
        }]);

      if (error && error.code !== '23505') {
        throw new Error(error.message);
      }
      
      setSuccessBlog(true);
      setEmailBlog('');
    } catch (error: any) {
      console.error(error);
      alert(`Hubo un error al suscribirte: ${error.message || "Intenta nuevamente."}`);
    } finally {
      setIsSubmittingBlog(false);
    }
  };

  const articulosFiltrados = articulos.filter(a => 
    filtro === 'Todos' ? true : a.subcategoria === filtro
  );

  const totalPaginas = Math.ceil(articulosFiltrados.length / articulosPorPagina);
  const articulosPaginados = articulosFiltrados.slice(
    (paginaActual - 1) * articulosPorPagina,
    paginaActual * articulosPorPagina
  );

  const cambiarFiltro = (nuevoFiltro: string) => {
    setFiltro(nuevoFiltro);
    setPaginaActual(1);
  };

  const articuloDestacado = (paginaActual === 1 && articulosPaginados.length > 0) ? articulosPaginados[0] : null;
  const articulosRegulares = paginaActual === 1 ? articulosPaginados.slice(1) : articulosPaginados;

  const categoriasMenu = ['Todos', 'Principiantes', 'Estrategias', 'Seguridad', 'Psicología'];
  const anioActual = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-gray-50 text-escudo-text pb-20">
      
      {/* 1. HERO DEL BLOG */}
      <section className="bg-escudo-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <span className="text-escudo-accent font-bold tracking-widest uppercase text-sm mb-4 block">Academia de Trading</span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Aprende a Invertir como un Profesional
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Guías, estrategias y análisis transparentes para traders de Latinoamérica. Sin falsas promesas, solo educación financiera real.
          </p>
        </div>
      </section>

      {/* 2. BARRA DE FILTROS TRANSLÚCIDA */}
      <div className="sticky top-[68px] md:top-[72px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-4 flex gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide text-sm font-bold text-gray-500">
          {categoriasMenu.map((cat) => (
            <button 
              key={cat}
              onClick={() => cambiarFiltro(cat)}
              className={`pb-1 border-b-2 transition-all cursor-pointer ${filtro === cat ? 'text-escudo-primary border-escudo-primary' : 'border-transparent hover:text-escudo-primary'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 -mt-4 relative z-10">
        
        {isLoading ? (
          <div className="text-center py-20 text-gray-500 font-bold animate-pulse text-xl">
            Cargando artículos desde la base de datos...
          </div>
        ) : articulosFiltrados.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <span className="text-4xl block mb-4">📭</span>
            <h3 className="text-2xl font-bold text-escudo-primary-dark mb-2">Aún no hay artículos aquí</h3>
            <p className="text-gray-500">Estamos preparando contenido increíble para esta categoría.</p>
          </div>
        ) : (
          <>
            {/* 3. ARTÍCULO DESTACADO (Arreglado para imágenes) */}
            {articuloDestacado && (
              <a href={`/blog/educacion/${articuloDestacado.slug}`} className="block group mb-12">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  
                  {/* IMAGEN DEL DESTACADO */}
                  <div className="md:w-2/5 bg-gray-100 relative overflow-hidden shrink-0 min-h-[250px] md:min-h-full">
                    {articuloDestacado.imagen_portada && articuloDestacado.imagen_portada.startsWith('http') ? (
                      <img 
                        src={articuloDestacado.imagen_portada} 
                        alt={articuloDestacado.titulo}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full absolute inset-0 bg-escudo-primary-dark flex items-center justify-center text-8xl">📰</div>
                    )}
                  </div>

                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-escudo-accent text-escudo-primary-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        {articuloDestacado.subcategoria}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-escudo-primary-dark mb-4 group-hover:text-escudo-primary transition-colors">
                      {articuloDestacado.titulo}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      Haz clic para leer esta guía completa y mejorar tu rentabilidad en el mercado.
                    </p>
                    <div className="text-escudo-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Leer artículo completo <span>→</span>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* 4. GRILLA REGULARES (Arreglado para imágenes) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articulosRegulares.map((articulo) => (
                <a key={articulo.id} href={`/blog/educacion/${articulo.slug}`} className="block group">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    
                    {/* IMAGEN DE LA TARJETA */}
                    <div className="h-48 bg-gray-100 relative overflow-hidden shrink-0">
                      {articulo.imagen_portada && articulo.imagen_portada.startsWith('http') ? (
                        <img 
                          src={articulo.imagen_portada} 
                          alt={articulo.titulo}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">📰</div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-escudo-primary text-xs font-extrabold uppercase tracking-wide">
                          {articulo.subcategoria}
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-escudo-primary-dark mb-3 group-hover:text-escudo-primary transition-colors line-clamp-2">
                        {articulo.titulo}
                      </h3>
                      <div className="text-escudo-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto pt-4">
                        Leer más <span>→</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* 5. CONTROLES DE PAGINACIÓN */}
            {totalPaginas > 1 && (
              <div className="flex justify-between items-center mt-12 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <button 
                  onClick={() => setPaginaActual(p => Math.max(1, p - 1))} 
                  disabled={paginaActual === 1} 
                  className="px-6 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg disabled:opacity-40 cursor-pointer font-bold text-sm hover:bg-gray-100 transition-colors"
                >
                  ← Anteriores
                </button>
                <span className="text-sm font-bold text-gray-500">
                  Página {paginaActual} de {totalPaginas}
                </span>
                <button 
                  onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))} 
                  disabled={paginaActual === totalPaginas} 
                  className="px-6 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg disabled:opacity-40 cursor-pointer font-bold text-sm hover:bg-gray-100 transition-colors"
                >
                  Siguientes →
                </button>
              </div>
            )}
          </>
        )}

      </div>

      {/* 6. SECCIÓN NEWSLETTER */}
      <section className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <span className="text-4xl mb-3 block">📩</span>
            <h3 className="text-2xl font-extrabold text-escudo-primary-dark mb-2">Mantente siempre al día</h3>
            <p className="text-gray-600">Únete a nuestra lista VIP y recibe en tu correo guías exclusivas, estrategias y alertas de estafas en LATAM antes que nadie.</p>
          </div>
          <div className="md:w-1/2 w-full">
            {successBlog ? (
              <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 font-bold text-center">
                ✅ ¡Perfecto! Revisa tu correo, ya eres parte de la comunidad.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input 
                  type="email" 
                  required
                  value={emailBlog}
                  onChange={(e) => setEmailBlog(e.target.value)}
                  placeholder="Tu mejor correo electrónico" 
                  className="w-full p-4 rounded-xl border-2 border-gray-200 outline-none focus:border-escudo-primary transition-colors bg-gray-50"
                />
                <button 
                  type="submit" 
                  disabled={isSubmittingBlog}
                  className="w-full bg-escudo-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-escudo-primary-dark transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmittingBlog ? "Suscribiendo..." : "Suscribirme Gratis"}
                </button>
                <p className="text-xs text-gray-400 text-center mt-2">Cero spam. Solo trading real.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 7. LLAMADA A LA ACCIÓN FINAL */}
      <section className="container mx-auto px-6 pb-12">
        <div className="bg-escudo-primary-dark rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">¿Ya te sientes listo para dar el salto?</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              No arriesgues tu capital en brokers no regulados. Compara las comisiones y la seguridad de las mejores opciones en nuestra tabla verificada.
            </p>
            <a href="/#tabla-brokers" className="inline-block bg-escudo-accent text-escudo-primary-dark px-10 py-4 rounded-xl font-extrabold text-lg hover:brightness-110 transition-all shadow-lg">
              Ver Mejores Brokers de {anioActual}
            </a>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-escudo-primary rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-escudo-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/3 translate-y-1/3"></div>
        </div>
      </section>

    </main>
  );
}