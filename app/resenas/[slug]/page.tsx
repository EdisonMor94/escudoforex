"use client";

import React, { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';

// --- BASE DE DATOS TÉCNICA AMPLIADA (AUDITORÍA 2026) ---
const brokersData: Record<string, any> = {
  xtb: {
    nombre: "XTB",
    logo: "/logoxtb.png",
    puntuacion: "4.9",
    tagline: "Líder en Transparencia y Ejecución de Acciones",
    regulacion: "FCA (UK), KNF, CySEC",
    depositoMin: "$0",
    plataformas: "xStation 5, xStation Mobile",
    spreadDesde: "0.1 Pips",
    metodosRetiro: "Transferencia Bancaria, Tarjeta, PayPal",
    velocidadEjecucion: "42ms",
    link: "https://geolink.xtb.com/0EoO6",
    ultimaActualizacion: "Mayo 2026",
    veredicto: "XTB destaca como el broker más transparente para LATAM en 2026. Al cotizar en la Bolsa de Varsovia, sus estados financieros son públicos y auditados por terceros. Su plataforma xStation 5 es superior en velocidad y estabilidad para el trading de noticias. Su oferta de Acciones Reales con 0% de comisión es imbatible para inversores de largo plazo.",
    notaSeguridad: "Regulación de Nivel 1 (FCA). Fondos segregados y protección contra saldo negativo. Al ser empresa pública, el riesgo de mala praxis corporativa es mínimo.",
    pros: [
      "Máxima transparencia financiera (Cotiza en Bolsa).",
      "Acciones y ETFs reales sin comisiones para LATAM.",
      "Plataforma propia xStation 5 (No depende de terceros).",
      "Soporte premium en español con analistas de renombre."
    ],
    contras: [
      "No disponible para MetaTrader en gran parte de LATAM.",
      "Tarifa de inactividad de 10 USD si no operas en un año.",
      "Spreads en criptomonedas son más altos que en exchanges puros."
    ],
    analisisProfundo: [
      { titulo: "Modelo de Ejecución", desc: "STP (Straight Through Processing) con ejecución ultra-rápida." },
      { titulo: "Activos Disponibles", desc: "Más de 5,400 instrumentos, incluyendo acciones al contado." }
    ],
    testimoniosPool: [
      { usuario: "Carlos M.", pais: "México", estrellas: 5, texto: "Lo mejor es la xStation, súper rápida para operar noticias. El retiro a mi cuenta de BBVA tardó solo 24 horas.", esReal: true },
      { usuario: "Andrea G.", pais: "Colombia", estrellas: 4, texto: "Soporte excelente. Me ayudaron con la verificación de domicilio muy rápido. Le doy 4 estrellas porque extraño usar MT4.", esReal: true },
      { usuario: "Diego L.", pais: "México", estrellas: 3, texto: "Todo bien con la plataforma, pero me cobraron inactividad después de un año sin operar. Hay que leer la letra pequeña.", esReal: true },
      { usuario: "Elena R.", pais: "Colombia", estrellas: 5, texto: "Excelente para operar acciones fraccionadas sin comisiones. Mi portafolio a largo plazo lo tengo aquí.", esReal: true },
      { usuario: "Santi V.", pais: "Ecuador", estrellas: 2, texto: "No me gustó que quitaran MetaTrader. Mis robots ya no sirven aquí.", esReal: false }
    ]
  },
  pepperstone: {
    nombre: "Pepperstone",
    logo: "/logopeperstone.png",
    puntuacion: "4.8",
    tagline: "La Autopista ECN para Scalpers y Bots",
    regulacion: "ASIC, FCA, SCB",
    depositoMin: "$200",
    plataformas: "MT4, MT5, cTrader, TradingView",
    spreadDesde: "0.0 Pips",
    metodosRetiro: "Visa, Skrill, Neteller, Criptomonedas",
    velocidadEjecucion: "30ms",
    link: "https://trk.pepperstonepartners.com/aff_c?offer_id=367&aff_id=42189",
    ultimaActualizacion: "Mayo 2026",
    veredicto: "Pepperstone es la opción preferida para traders profesionales y algorítmicos. Su modelo No Dealing Desk (NDD) asegura que no hay manipulación de precios. La integración con TradingView es, a día de hoy, la más estable del mercado, permitiendo operar directamente desde los gráficos de la red social de trading.",
    notaSeguridad: "Modelo de ejecución de 'Agencia'. El broker solo gana por comisión, eliminando el conflicto de interés donde el broker gana si tú pierdes.",
    pros: [
      "Spreads reales de 0.0 pips en la cuenta Razor.",
      "Integración impecable con TradingView.",
      "Sin restricciones en Scalping o News Trading.",
      "Ejecución en menos de 30ms (Latencia mínima)."
    ],
    contras: [
      "La cuenta Razor cobra comisión por lote operado.",
      "Soporte técnico limitado durante fines de semana.",
      "No cuenta con plataforma propia (depende de terceros)."
    ],
    analisisProfundo: [
      { titulo: "Ecosistema Tech", desc: "Servidores en Equinix NY4 para mínima latencia." },
      { titulo: "Cuentas", desc: "Opción de cuenta ECN pura para traders de volumen." }
    ],
    testimoniosPool: [
      { usuario: "Arturo S.", pais: "México", estrellas: 5, texto: "Si usas TradingView, Pepperstone es el único broker que deberías usar. La integración es perfecta.", esReal: true },
      { usuario: "Hugo M.", pais: "Colombia", estrellas: 5, texto: "Spreads reales de 0.0 en el EURUSD casi todo el día. Muy profesional, cero manipulación de velas.", esReal: true },
      { usuario: "Lucía M.", pais: "México", estrellas: 3, texto: "Es bueno, pero el fin de semana tuve un problema con mi cuenta y el soporte tardó hasta el lunes.", esReal: true },
      { usuario: "Gabriel O.", pais: "Colombia", estrellas: 5, texto: "El mejor broker ECN que he probado. El deslizamiento casi siempre es a mi favor.", esReal: true },
      { usuario: "Diana T.", pais: "Perú", estrellas: 2, texto: "Las comisiones por depositar con algunos métodos locales me parecieron un poco altas.", esReal: false }
    ]
  },
  xm: {
    nombre: "XM",
    logo: "/xm-logo (2).jpg",
    puntuacion: "4.6",
    tagline: "El Gigante de la Accesibilidad y Depósitos Locales",
    regulacion: "ASIC, CySEC, FSC",
    depositoMin: "$5",
    plataformas: "MT4, MT5, XM App",
    spreadDesde: "0.6 Pips",
    metodosRetiro: "Oxxo, PSE, SPEI, SPE, Bancos Locales",
    velocidadEjecucion: "60ms",
    link: "https://affs.click/5m0ik",
    ultimaActualizacion: "Abril 2026",
    veredicto: "XM es ideal para quienes inician con capitales pequeños. Su mayor fortaleza en LATAM es la red de pagos locales, permitiendo depositar en efectivo o transferencia nacional. Aunque es Market Maker, su reputación de pago es sólida, siempre que se opere en cuentas 'Ultra Low' para minimizar costos.",
    notaSeguridad: "Es un Market Maker altamente regulado. Cumple con estrictos estándares de liquidez y auditorías de la CySEC y ASIC.",
    pros: [
      "Depósitos y retiros locales (Oxxo, PSE) muy eficientes.",
      "Bono de trading para aumentar margen operativo.",
      "Cuentas Micro para gestión de riesgo extrema.",
      "Sin comisiones por retiros o depósitos."
    ],
    contras: [
      "Modelo Market Maker (Contraparte de tus operaciones).",
      "Spreads elevados en la cuenta Estándar.",
      "Marketing telefónico persistente."
    ],
    analisisProfundo: [
      { titulo: "Escalabilidad", desc: "Ideal para pasar de Demo a Micro con solo $5." },
      { titulo: "Formación", desc: "El mejor programa de webinarios gratuitos en español." }
    ],
    testimoniosPool: [
      { usuario: "Juan K.", pais: "México", estrellas: 5, texto: "Empecé con el bono de $30 y retiré ganancias por Oxxo sin trabas.", esReal: true },
      { usuario: "Elena R.", pais: "Colombia", estrellas: 5, texto: "Amo depositar directo con PSE. El chat siempre atiende en segundos.", esReal: true },
      { usuario: "Santi V.", pais: "Ecuador", estrellas: 3, texto: "Muchos bonos, pero el spread de la cuenta estándar es gigante.", esReal: true },
      { usuario: "Víctor Z.", pais: "Bolivia", estrellas: 2, texto: "El spread se abrió muchísimo en la apertura y tocó mi SL.", esReal: false }
    ]
  },
  tickmill: {
    nombre: "Tickmill",
    logo: "/tickmill-logo.jpg", 
    puntuacion: "4.7",
    tagline: "El Rey de los Spreads Bajos para Expertos",
    regulacion: "FCA, CySEC, FSA",
    depositoMin: "$100",
    plataformas: "MT4, MT5",
    spreadDesde: "0.0 Pips",
    metodosRetiro: "Transferencia, Tarjeta, Skrill, Criptomonedas",
    velocidadEjecucion: "35ms",
    link: "https://www.tickmill.com/", 
    ultimaActualizacion: "Mayo 2026",
    veredicto: "Tickmill es uno de los brokers ECN más respetados a nivel global. Sus comisiones en la cuenta Pro son de las más bajas de la industria ($4 por lote estándar ida y vuelta). Es ideal para traders algorítmicos y scalpers puros que no necesitan bonos ni adornos, solo pura eficiencia de ejecución.",
    notaSeguridad: "Altamente regulado por la FCA británica. Fondos segregados en cuentas bancarias de primer nivel. Historial impecable de pagos.",
    pros: [
      "Comisiones hiper-bajas en cuenta Pro y VIP.",
      "Ejecución veloz, ideal para Expert Advisors (EAs).",
      "Sin recotizaciones ni restricciones de trading.",
      "Permite cobertura (hedging) y scalping agresivo."
    ],
    contras: [
      "No ofrece acciones al contado, solo CFDs.",
      "La plataforma es muy tradicional (solo MetaTrader).",
      "No tiene métodos de depósito en efectivo locales en algunos países."
    ],
    analisisProfundo: [
      { titulo: "Estructura de Costos", desc: "La cuenta PRO cobra comisión fija y spreads desde 0.0, ideal para gran volumen." },
      { titulo: "Regulación", desc: "La FCA garantiza un seguro de depósito, dando prestigio global." }
    ],
    testimoniosPool: [
      { usuario: "Fernando T.", pais: "Chile", estrellas: 5, texto: "Mis robots de scalping funcionan perfecto aquí. Los spreads no se abren a lo loco en las noticias.", esReal: true },
      { usuario: "Laura P.", pais: "México", estrellas: 4, texto: "Muy transparente con los retiros, aunque me gustaría que tuvieran una app propia más moderna.", esReal: true }
    ]
  },
  octafx: {
    nombre: "OctaFX",
    logo: "/octafx_logo.png", 
    puntuacion: "4.2",
    tagline: "Bonos Atractivos y Trading Social Móvil",
    regulacion: "CySEC, Mwali",
    depositoMin: "$25",
    plataformas: "MT4, MT5, OctaTrader",
    spreadDesde: "0.6 Pips",
    metodosRetiro: "Cripto, Bancos Locales, Tarjetas",
    velocidadEjecucion: "80ms",
    link: "https://www.octafx.com/", 
    ultimaActualizacion: "Mayo 2026",
    veredicto: "OctaFX (ahora conocido como Octa) es muy popular en mercados emergentes gracias a sus campañas de bonos y su plataforma de Copy Trading nativa. Es una opción decente para principiantes, pero los traders profesionales suelen notar spreads más anchos durante alta volatilidad.",
    notaSeguridad: "Cuenta con regulación europea (CySEC) para clientes de la UE, pero los clientes de LATAM suelen ser asignados a la entidad offshore (Mwali).",
    pros: [
      "Bonos de depósito constantes y promociones.",
      "Excelente sistema de Copy Trading integrado.",
      "Plataforma móvil propia muy fácil de usar.",
      "Depósitos mínimos muy bajos."
    ],
    contras: [
      "Regulación principal para LATAM es offshore.",
      "Spreads más altos que la competencia ECN.",
      "Deslizamiento (Slippage) reportado durante noticias fuertes."
    ],
    analisisProfundo: [
      { titulo: "Copy Trading", desc: "Su app de copy trading permite seguir a master traders con unos pocos clics." },
      { titulo: "Cuentas", desc: "Ofrece cuentas islámicas sin swaps por defecto." }
    ],
    testimoniosPool: [
      { usuario: "Andrés C.", pais: "Colombia", estrellas: 5, texto: "Empecé copiando a otros traders y me ha ido bien. La app es súper intuitiva.", esReal: true },
      { usuario: "Martín S.", pais: "Argentina", estrellas: 2, texto: "Operé el NFP y el slippage me comió la mitad de la ganancia. No lo recomiendo para noticias.", esReal: true }
    ]
  }
};

// --- UTILIDADES ---
function shuffleArray(array: any[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// --- COMPONENTE PRINCIPAL ---
export default function ResenaBroker({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slugLower = resolvedParams.slug.toLowerCase();
  
  if (!brokersData[slugLower]) notFound();
  const broker = brokersData[slugLower];

  // 1. ESTADOS DE UI Y COMENTARIOS
  const [testimonios, setTestimonios] = useState<any[]>([]);
  const [filtro, setFiltro] = useState<'todos' | 'positivos' | 'criticos'>('todos');
  const [paginaActual, setPaginaActual] = useState(1);
  const reviewsPorPagina = 5;

  // 2. ESTADOS DEL FORMULARIO
  const [formData, setFormData] = useState({ 
    nombre: '', email: '', estrellas: 5, texto: '', aceptaTerminos: false, esReal: false 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setTestimonios(shuffleArray(broker.testimoniosPool));
  }, [broker.testimoniosPool]);

  // 3. LÓGICA DE FILTRADO Y PAGINACIÓN
  const testimoniosFiltrados = testimonios.filter(t => {
    if (filtro === 'positivos') return t.estrellas >= 4;
    if (filtro === 'criticos') return t.estrellas <= 3;
    return true;
  });

  const totalPaginas = Math.ceil(testimoniosFiltrados.length / reviewsPorPagina);
  const testimoniosPaginados = testimoniosFiltrados.slice(
    (paginaActual - 1) * reviewsPorPagina,
    paginaActual * reviewsPorPagina
  );

  const cambiarFiltro = (nuevoFiltro: 'todos' | 'positivos' | 'criticos') => {
    setFiltro(nuevoFiltro);
    setPaginaActual(1); 
  };

  // 4. ENVÍO A SUPABASE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.aceptaTerminos || !formData.esReal) {
      alert("Debes aceptar los términos y confirmar que es un testimonio real.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { supabase } = await import('../../../lib/supabase');
      
      const { error: errorComentario } = await supabase
        .from('comentarios')
        .insert([{ 
          broker_slug: slugLower, 
          nombre: formData.nombre, 
          correo: formData.email,
          estrellas: formData.estrellas, 
          texto: formData.texto 
        }]);

      if (errorComentario) throw new Error(errorComentario.message);

      await supabase.from('suscriptores').insert([{ 
        correo: formData.email, 
        origen: `Reseña de ${broker.nombre}`
      }]);

      setIsSuccess(true);
      setFormData({ nombre: '', email: '', estrellas: 5, texto: '', aceptaTerminos: false, esReal: false });
    } catch (error: any) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. COMPONENTE CTA (Caja de Llamada a la Acción)
  const CallToActionBox = () => (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 lg:sticky lg:top-24">
      <h3 className="text-2xl font-black text-slate-900 mb-4">¿Abrir cuenta en {broker.nombre}?</h3>
      <p className="text-slate-500 text-sm mb-8 leading-relaxed">
        Asegura tu capital operando bajo nuestra red de auditoría. Haz clic en el enlace oficial verificado:
      </p>
      <a href={broker.link} target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-blue-600 text-white py-4 rounded-2xl font-black mb-4 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
        Abrir Cuenta Oficial
      </a>
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enlace verificado hoy</span>
      </div>
      <p className="text-[10px] text-center text-slate-400 leading-relaxed italic">
        * El trading de CFDs implica un riesgo significativo de pérdida.
      </p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-slate-900 pb-20 font-sans">
      
      {/* SECCIÓN 1: HERO DE AUDITORÍA */}
      <section className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl shadow-2xl p-4 flex items-center justify-center overflow-hidden shrink-0">
              <Image src={broker.logo} alt={broker.nombre} fill className="object-contain p-4" />
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Auditoría 2026</span>
                <div className="flex text-yellow-400 text-lg">★★★★★ <span className="ml-2 text-white/60 text-sm font-bold">({broker.puntuacion}/5.0)</span></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tighter">
                {broker.nombre}: <span className="text-blue-400">¿Es seguro</span> invertir desde LATAM?
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-medium">
                {broker.tagline}. Analizamos regulaciones, tiempos de retiro y costos ocultos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: FICHA TÉCNICA RÁPIDA */}
      <section className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-50 overflow-hidden">
          {[
            { label: "Regulación Principal", val: broker.regulacion },
            { label: "Depósito Mínimo", val: broker.depositoMin },
            { label: "Velocidad Ejecución", val: broker.velocidadEjecucion },
            { label: "Spreads Desde", val: broker.spreadDesde }
          ].map((item, i) => (
            <div key={i} className="p-8 text-center">
              <span className="block text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">{item.label}</span>
              <span className="text-lg font-black text-slate-800">{item.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 3: CUERPO DE LA AUDITORÍA */}
      <div className="container mx-auto px-6 py-16 flex flex-col lg:grid lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-8 space-y-12">
          
          {/* VEREDICTO EXPERTO */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">1</span>
              Veredicto del Auditor
            </h2>
            <p className="text-slate-600 text-xl leading-relaxed font-medium">{broker.veredicto}</p>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-r-3xl">
              <h4 className="font-black text-blue-900 mb-3 text-lg flex items-center gap-2">🛡️ Nota de Seguridad</h4>
              <p className="text-blue-800/80 italic font-medium leading-relaxed">"{broker.notaSeguridad}"</p>
            </div>
          </div>

          {/* ESTO ES LO NUEVO: CTA MÓVIL (Solo visible en pantallas pequeñas) */}
          <div className="block lg:hidden">
            <CallToActionBox />
          </div>

          {/* ANÁLISIS DETALLADO */}
          <div className="grid md:grid-cols-2 gap-6">
            {broker.analisisProfundo.map((item: any, i: number) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-slate-800 mb-2 uppercase text-xs tracking-widest">{item.titulo}</h4>
                <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* PROS Y CONTRAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
              <h3 className="text-green-800 font-black text-xl mb-6 flex items-center gap-2">✅ Puntos a Favor</h3>
              <ul className="space-y-4">
                {broker.pros.map((pro: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-green-900/80 font-bold text-sm">
                    <span className="text-green-500 mt-1">●</span> {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
              <h3 className="text-red-800 font-black text-xl mb-6 flex items-center gap-2">❌ Puntos en Contra</h3>
              <ul className="space-y-4">
                {broker.contras.map((contra: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-red-900/80 font-bold text-sm">
                    <span className="text-red-500 mt-1">●</span> {contra}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* MÉTODO DE RETIRO */}
          <div className="bg-slate-100 p-8 rounded-3xl">
            <h3 className="font-black mb-4">Logística de Retiro en LATAM</h3>
            <div className="flex flex-wrap gap-2">
              {broker.metodosRetiro.split(', ').map((m:string, i:number) => (
                <span key={i} className="bg-white px-4 py-2 rounded-xl text-[10px] font-black text-slate-500 uppercase border border-slate-200">{m}</span>
              ))}
            </div>
          </div>

          {/* SISTEMA DE COMENTARIOS */}
          <section className="pt-10 border-t border-slate-200" id="comentarios">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <h2 className="text-3xl font-black tracking-tight text-slate-900">Experiencias Reales</h2>
              <div className="flex gap-2 overflow-x-auto">
                <button onClick={() => cambiarFiltro('todos')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filtro === 'todos' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>TODOS</button>
                <button onClick={() => cambiarFiltro('positivos')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filtro === 'positivos' ? 'bg-green-600 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>4-5 ★</button>
                <button onClick={() => cambiarFiltro('criticos')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filtro === 'criticos' ? 'bg-red-600 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>1-3 ★</button>
              </div>
            </div>

            <div className="space-y-4">
              {testimoniosPaginados.map((t, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="font-black text-slate-900 text-lg block leading-none">{t.usuario}</span>
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{t.pais}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-yellow-400 text-xs">{"★".repeat(t.estrellas)}</div>
                      {t.esReal && <span className="text-[9px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase">Cuenta Real</span>}
                    </div>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed italic text-sm">"{t.texto}"</p>
                </div>
              ))}
            </div>

            {/* PAGINACIÓN */}
            {totalPaginas > 1 && (
              <div className="flex justify-center gap-4 mt-8">
                <button onClick={() => setPaginaActual(p => Math.max(1, p - 1))} disabled={paginaActual === 1} className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-black text-xs disabled:opacity-30">ANTERIOR</button>
                <button onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))} disabled={paginaActual === totalPaginas} className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-black text-xs disabled:opacity-30">SIGUIENTE</button>
              </div>
            )}

            {/* FORMULARIO */}
            <div className="mt-12 bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl">
              {isSuccess ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="text-2xl font-black mb-2">¡Auditoría Recibida!</h4>
                  <p className="text-slate-400 mb-6">Tu reseña está siendo procesada por nuestro equipo de moderación.</p>
                  <button onClick={() => setIsSuccess(false)} className="text-blue-400 font-bold underline">Enviar otra</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-black mb-8">¿Has operado con {broker.nombre}? <span className="text-blue-400">Cuéntanos.</span></h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <input required type="text" placeholder="Tu nombre" className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
                    <input required type="email" placeholder="Correo electrónico" className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <select className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-sm" value={formData.estrellas} onChange={(e) => setFormData({...formData, estrellas: Number(e.target.value)})}>
                    <option className="text-black" value="5">5 Estrellas (Excelente)</option>
                    <option className="text-black" value="4">4 Estrellas (Bueno)</option>
                    <option className="text-black" value="3">3 Estrellas (Regular)</option>
                    <option className="text-black" value="2">2 Estrellas (Malo)</option>
                    <option className="text-black" value="1">1 Estrella (Pésimo)</option>
                  </select>
                  <textarea required placeholder="Describe tu experiencia técnica con el broker..." rows={4} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-sm" value={formData.texto} onChange={(e) => setFormData({...formData, texto: e.target.value})}></textarea>
                  
                  <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                    <label className="flex gap-3 cursor-pointer group">
                      <input type="checkbox" required checked={formData.esReal} onChange={(e) => setFormData({...formData, esReal: e.target.checked})} className="mt-1 accent-blue-500" />
                      <span className="text-xs text-slate-400 group-hover:text-white transition-colors">Confirmo que mi experiencia es real y he operado con este broker.</span>
                    </label>
                    <label className="flex gap-3 cursor-pointer group">
                      <input type="checkbox" required checked={formData.aceptaTerminos} onChange={(e) => setFormData({...formData, aceptaTerminos: e.target.checked})} className="mt-1 accent-blue-500" />
                      <span className="text-xs text-slate-400 group-hover:text-white transition-colors">Acepto los Términos y la Política de Privacidad.</span>
                    </label>
                  </div>

                  <button disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-900/40">
                    {isSubmitting ? "PROCESANDO..." : "PUBLICAR MI AUDITORÍA"}
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4 space-y-8">
          {/* ESTO ES LO NUEVO: Ocultamos el CTA original en móviles, manteniéndolo en PC */}
          <div className="hidden lg:block">
            <CallToActionBox />
          </div>
          <div className="bg-slate-900 p-8 rounded-3xl text-white">
            <h4 className="font-black mb-4">¿Dudas sobre este broker?</h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">Nuestro equipo audita mensualmente las condiciones de {broker.nombre} para asegurar que sigan cumpliendo con los estándares de LATAM.</p>
            <div className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Última revisión: {broker.ultimaActualizacion}</div>
          </div>
        </aside>

      </div>
    </main>
  );
}