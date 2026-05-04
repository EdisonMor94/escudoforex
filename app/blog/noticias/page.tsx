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

export default function BlogNoticias() {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [filtro, setFiltro] = useState<string>('Todos');
  const [paginaActual, setPaginaActual] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Estados para el Newsletter del Radar de Mercado
  const [emailNoticias, setEmailNoticias] = useState('');
  const [isSubmittingNoticias, setIsSubmittingNoticias] = useState(false);
  const [successNoticias, setSuccessNoticias] = useState(false);
  
  const articulosPorPagina = 10;

  useEffect(() => {
    let isMounted = true;

    const fetchNoticias = async () => {
      try {
        const { data, error } = await supabase
          .from('articulos')
          .select('*')
          .eq('categoria', 'noticias')
          .order('fecha_publicacion', { ascending: false });

        if (error) throw error;

        if (isMounted) {
          setArticulos(data || []);
        }
      } catch (error) {
        console.error("Error cargando noticias:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchNoticias();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingNoticias(true);

    try {
      const { error } = await supabase
        .from('suscriptores')
        .insert([{ 
          correo: emailNoticias, 
          origen: 'Radar de Mercado'
        }]);

      if (error && error.code !== '23505') {
        throw new Error(error.message);
      }
      
      setSuccessNoticias(true);
      setEmailNoticias('');
    } catch (error: any) {
      console.error(error);
      alert(`Hubo un error al suscribirte: ${error.message}`);
    } finally {
      setIsSubmittingNoticias(false);
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

  const categoriasMenu = ['Todos', 'Análisis Diario', 'Eventos Macro', 'Alertas de Volatilidad'];
  const anioActual = new Date().getFullYear();

  const formatearFecha = (fechaISO: string) => {
    return new Date(fechaISO).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <main className="min-h-screen bg-gray-50 text-escudo-text pb-20">
      
      {/* 1. HERO DE NOTICIAS (Institucional) */}
      <section className="bg-[#0f172a] text-white py-16 md:py-24 border-b-4 border-escudo-accent relative overflow-hidden">
        <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-gray-300 font-bold tracking-widest uppercase text-sm">Radar de Mercado En Vivo</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Análisis Macro y <span className="text-escudo-accent">Oportunidades</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Anticípate a los movimientos del mercado. Reportes diarios impulsados por IA sobre los eventos económicos que mueven las divisas en LATAM.
          </p>
        </div>
      </section>

      {/* 2. BARRA DE FILTROS */}
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
            Sincronizando con los mercados globales...
          </div>
        ) : articulosFiltrados.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <span className="text-4xl block mb-4">🌍</span>
            <h3 className="text-2xl font-bold text-escudo-primary-dark mb-2">Aún no hay análisis publicados hoy</h3>
            <p className="text-gray-500">Nuestra IA está procesando el calendario de ForexFactory. Vuelve pronto.</p>
          </div>
        ) : (
          <>
            {/* 3. NOTICIA DEL DÍA (Destacado con imagen) */}
            {articuloDestacado && (
              <a href={`/blog/noticias/${articuloDestacado.slug}`} className="block group mb-12">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  
                  {/* Imagen dinámica */}
                  <div className="md:w-2/5 bg-[#1e293b] relative shrink-0 overflow-hidden min-h-[250px] md:min-h-full">
                    {articuloDestacado.imagen_portada && articuloDestacado.imagen_portada.startsWith('http') ? (
                      <img 
                        src={articuloDestacado.imagen_portada} 
                        alt={articuloDestacado.titulo}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-8xl text-white/10">🌍</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a]/40 to-transparent pointer-events-none"></div>
                  </div>

                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        {articuloDestacado.subcategoria}
                      </span>
                      <span className="text-gray-400 text-sm font-medium flex items-center gap-1">
                        📅 {formatearFecha(articuloDestacado.fecha_publicacion)}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] mb-4 group-hover:text-escudo-primary transition-colors">
                      {articuloDestacado.titulo}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      Revisa el impacto técnico y fundamental de los eventos macroeconómicos de esta sesión.
                    </p>
                    <div className="text-escudo-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Leer el reporte completo <span>→</span>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* 4. GRILLA DE NOTICIAS ANTERIORES (Con imágenes) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articulosRegulares.map((articulo) => (
                <a key={articulo.id} href={`/blog/noticias/${articulo.slug}`} className="block group">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    
                    {/* Imagen de la tarjeta */}
                    <div className="h-48 bg-[#f8fafc] relative overflow-hidden border-b border-gray-100 shrink-0">
                      {articulo.imagen_portada && articulo.imagen_portada.startsWith('http') ? (
                        <img 
                          src={articulo.imagen_portada} 
                          alt={articulo.titulo}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">📰</div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-escudo-primary text-xs font-extrabold uppercase tracking-wide">
                          {articulo.subcategoria}
                        </span>
                        <span className="text-gray-400 text-xs font-medium">
                          {formatearFecha(articulo.fecha_publicacion)}
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-escudo-primary transition-colors line-clamp-3">
                        {articulo.titulo}
                      </h3>
                      <div className="text-escudo-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto pt-4">
                        Ver análisis <span>→</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* PAGINACIÓN */}
            {totalPaginas > 1 && (
              <div className="flex justify-between items-center mt-12 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <button 
                  onClick={() => setPaginaActual(p => Math.max(1, p - 1))} 
                  disabled={paginaActual === 1} 
                  className="px-6 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg disabled:opacity-40 cursor-pointer font-bold text-sm hover:bg-gray-100 transition-colors"
                >
                  ← Más recientes
                </button>
                <span className="text-sm font-bold text-gray-500">
                  Página {paginaActual} de {totalPaginas}
                </span>
                <button 
                  onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))} 
                  disabled={paginaActual === totalPaginas} 
                  className="px-6 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg disabled:opacity-40 cursor-pointer font-bold text-sm hover:bg-gray-100 transition-colors"
                >
                  Anteriores →
                </button>
              </div>
            )}
          </>
        )}

      </div>

      {/* 5. NEWSLETTER DE ALERTAS */}
      <section className="container mx-auto px-6 py-8">
        <div className="bg-[#0f172a] rounded-3xl p-8 md:p-12 border border-gray-800 shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="md:w-1/2 text-center md:text-left relative z-10 text-white">
            <span className="text-4xl mb-3 block animate-bounce">⚡</span>
            <h3 className="text-2xl font-extrabold mb-2">Alertas de Alta Volatilidad</h3>
            <p className="text-gray-400">Recibe notificaciones en tu correo minutos antes de que se publiquen datos de impacto como el NFP o las tasas de la FED.</p>
          </div>
          <div className="md:w-1/2 w-full relative z-10">
            {successNoticias ? (
              <div className="bg-green-500/20 text-green-400 p-4 rounded-xl border border-green-500/50 font-bold text-center">
                ✅ Radar activado. Vigila tu bandeja de entrada.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input 
                  type="email" 
                  required
                  value={emailNoticias}
                  onChange={(e) => setEmailNoticias(e.target.value)}
                  placeholder="Tu correo electrónico" 
                  className="w-full p-4 rounded-xl border border-gray-700 outline-none focus:border-escudo-accent transition-colors bg-[#1e293b] text-white placeholder-gray-500"
                />
                <button 
                  type="submit" 
                  disabled={isSubmittingNoticias}
                  className="w-full bg-escudo-accent text-escudo-primary-dark py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmittingNoticias ? "Conectando..." : "Activar Alertas Gratis"}
                </button>
              </form>
            )}
          </div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-escudo-accent rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container mx-auto px-6 pb-12 mt-4">
        <div className="bg-escudo-primary rounded-3xl p-10 text-center text-white shadow-xl">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Opera las noticias de forma segura</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Durante eventos macroeconómicos de alto impacto, los spreads se disparan. Utiliza brokers institucionales ECN comprobados por nuestro equipo.
          </p>
          <a href="/#tabla-brokers" className="inline-block bg-white text-escudo-primary-dark px-8 py-3 rounded-xl font-extrabold text-lg hover:bg-gray-100 transition-all shadow-md">
            Ir a la Comparativa {anioActual}
          </a>
        </div>
      </section>

    </main>
  );
}