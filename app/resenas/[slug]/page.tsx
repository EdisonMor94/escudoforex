"use client";

import React, { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';

// 1. BASE DE DATOS LOCAL
const brokersData: Record<string, any> = {
  xtb: {
    nombre: "XTB", logo: "/logoxtb.png", puntuacion: "4.9", regulacion: "FCA, KNF, CySEC", depositoMin: "$0", plataformas: "xStation 5", spreadDesde: "0.1 Pips", link: "https://geolink.xtb.com/0EoO6",
    veredicto: "XTB destaca como uno de los brokers más transparentes para LATAM. Al ser una empresa que cotiza en la Bolsa de Varsovia, sus estados financieros son públicos. Su plataforma propietaria xStation 5 es galardonada y excelente para análisis técnico. Sin embargo, los traders que dependen de Expert Advisors (bots) en MT4/MT5 deberán buscar otras opciones.",
    notaSeguridad: "Al cotizar en bolsa, XTB está sometido a auditorías externas constantes, lo que reduce drásticamente el riesgo de fraude corporativo.",
    pros: ["Empresa cotizada en bolsa (máxima transparencia).", "Plataforma xStation 5 ultra rápida.", "Sin depósito mínimo requerido.", "Excelente servicio al cliente en español."],
    contras: ["No ofrece MetaTrader en LATAM.", "Spreads en criptomonedas superiores al promedio.", "Tarifa de inactividad si no operas en 12 meses."],
    testimoniosPool: [
      { usuario: "Carlos M.", pais: "México", estrellas: 5, texto: "Lo mejor es la xStation, súper rápida para operar noticias. El retiro a mi cuenta de BBVA tardó solo 24 horas." },
      { usuario: "Andrea G.", pais: "Colombia", estrellas: 4, texto: "Soporte excelente. Me ayudaron con la verificación de domicilio muy rápido. Le doy 4 estrellas porque extraño usar MT4." },
      { usuario: "Roberto P.", pais: "Argentina", estrellas: 5, texto: "De los pocos brokers serios que quedan. Me gusta que no hay problemas raros con los retiros ni comisiones ocultas." },
      { usuario: "Luis H.", pais: "Chile", estrellas: 4, texto: "La formación gratuita y los análisis de Pablo Gil son de otro nivel. Los spreads en índices son muy competitivos." },
      { usuario: "Marta F.", pais: "Perú", estrellas: 5, texto: "Soy scalper y la ejecución es instantánea. Muy confiable para capitales grandes." },
      { usuario: "Diego L.", pais: "México", estrellas: 3, texto: "Todo bien con la plataforma, pero me cobraron inactividad después de un año sin operar. Hay que leer la letra pequeña." },
      { usuario: "Elena R.", pais: "Colombia", estrellas: 5, texto: "Excelente para operar acciones fraccionadas sin comisiones. Mi portafolio a largo plazo lo tengo aquí." },
      { usuario: "Felipe T.", pais: "Uruguay", estrellas: 4, texto: "Buena app móvil, no se cuelga. Los retiros por tarjeta de crédito llegan a los dos días exactos." },
      { usuario: "Juan K.", pais: "Chile", estrellas: 5, texto: "Transparencia total. Se nota que cotizan en bolsa porque su soporte no te presiona para que deposites más dinero." },
      { usuario: "Santi V.", pais: "Ecuador", estrellas: 2, texto: "No me gustó que quitaran MetaTrader. La plataforma nueva es buena pero mis robots ya no sirven aquí." }
    ]
  },
  pepperstone: {
    nombre: "Pepperstone", logo: "/logopeperstone.png", puntuacion: "4.8", regulacion: "ASIC, FCA, SCB", depositoMin: "$200", plataformas: "MT4, MT5, cTrader, TradingView", spreadDesde: "0.0 Pips", link: "https://trk.pepperstonepartners.com/aff_c?offer_id=367&aff_id=42189",
    veredicto: "Pepperstone es la opción premium para scalpers y traders algorítmicos. Su modelo de ejecución asegura que no hay mesa de dinero interviniendo en tus operaciones, ofreciendo spreads desde 0.0 pips.",
    notaSeguridad: "Operan con un modelo de ejecución de 'Agencia', lo que significa que el broker no gana cuando tú pierdes; ganan por volumen de comisiones.",
    pros: ["Ejecución de órdenes ultrarrápida.", "Spreads desde 0.0 pips en cuenta Razor.", "Integración nativa con TradingView.", "Sin mesa de dinero (No Dealing Desk)."],
    contras: ["La cuenta Razor cobra comisión por lote.", "Soporte limitado los fines de semana.", "Carece de bonos de bienvenida."],
    testimoniosPool: [
      { usuario: "Arturo S.", pais: "México", estrellas: 5, texto: "Si usas TradingView, Pepperstone es el único broker que deberías usar. La integración es perfecta." },
      { usuario: "Hugo M.", pais: "Colombia", estrellas: 5, texto: "Spreads reales de 0.0 en el EURUSD casi todo el día. Muy profesional, cero manipulación de velas." },
      { usuario: "Valentina P.", pais: "Uruguay", estrellas: 4, texto: "No es para principiantes por el tema de las comisiones por lote, pero si eres rentable, es el mejor entorno." },
      { usuario: "Esteban R.", pais: "Chile", estrellas: 5, texto: "Uso cTrader con ellos y la velocidad de ejecución es bestial. Retiros por Skrill en menos de 2 horas." },
      { usuario: "Lucía M.", pais: "México", estrellas: 3, texto: "Es bueno, pero el fin de semana tuve un problema con mi cuenta y el soporte tardó hasta el lunes en responder." },
      { usuario: "Gabriel O.", pais: "Colombia", estrellas: 5, texto: "El mejor broker ECN que he probado. El deslizamiento casi siempre es a mi favor." },
      { usuario: "Patricia D.", pais: "Ecuador", estrellas: 4, texto: "Piden muchos documentos para verificar, pero una vez dentro todo fluye impecable." },
      { usuario: "Raúl G.", pais: "Chile", estrellas: 5, texto: "Sin mesa de dinero. Pongo mis Stop Loss tranquilos sabiendo que no van a cazar mi liquidez." },
      { usuario: "Andrés V.", pais: "Argentina", estrellas: 5, texto: "Mis EAs (Robots) corren en su VPS sin caídas. El ping es bajísimo." },
      { usuario: "Diana T.", pais: "Perú", estrellas: 2, texto: "Las comisiones por depositar con algunos métodos locales me parecieron un poco altas." }
    ]
  },
  tickmill: {
    nombre: "Tickmill", logo: "/tickmill_logo.png", puntuacion: "4.7", regulacion: "FCA, CySEC, FSA", depositoMin: "$100", plataformas: "MT4, MT5", spreadDesde: "0.0 Pips", link: "https://my.tickmill.com?utm_campaign=ib_link&utm_content=IB64609042&utm_medium=Abrir+cuenta&utm_source=link&lp=https%3A%2F%2Fmy.tickmill.com%2Fes%2Fsign-upc",
    veredicto: "Tickmill es un broker estrictamente enfocado en la eficiencia de costos. Su cuenta PRO es una de las más económicas de toda la industria para operar Forex.",
    notaSeguridad: "Para cuentas de gran capital, la regulación británica ofrece una protección sólida y fondos segregados.",
    pros: ["Comisiones por lote extremadamente bajas.", "Permite Hedging y Scalping.", "Ejecución de mercado muy sólida.", "Protección contra saldo negativo."],
    contras: ["Poca oferta de acciones individuales.", "Solo MetaTrader disponible.", "Área personal algo anticuada."],
    testimoniosPool: [
      { usuario: "Marcos L.", pais: "Colombia", estrellas: 5, texto: "Mis robots funcionan perfecto aquí. Las comisiones de la cuenta Pro son ridículamente bajas." },
      { usuario: "Javier D.", pais: "México", estrellas: 5, texto: "He retirado montos superiores a $5,000 por transferencia y llegan sin problemas." },
      { usuario: "Sofía C.", pais: "Perú", estrellas: 4, texto: "Genial para Forex, pero si quieres operar acciones, búscate otro broker." },
      { usuario: "Tomás R.", pais: "Chile", estrellas: 5, texto: "Nunca he tenido recotizaciones. Si le das a comprar, se compra al precio exacto." },
      { usuario: "Laura M.", pais: "Argentina", estrellas: 3, texto: "La página web parece del año 2010 y depositar me dio un pequeño error al principio." },
      { usuario: "Miguel A.", pais: "Ecuador", estrellas: 5, texto: "Cero dramas, todo funciona como un reloj suizo." },
      { usuario: "Diana P.", pais: "Uruguay", estrellas: 4, texto: "Spreads reales de cero en horas pico. Extraño cTrader." },
      { usuario: "Héctor S.", pais: "México", estrellas: 5, texto: "Pagan los retiros por cripto el mismo día." },
      { usuario: "Carmen V.", pais: "Colombia", estrellas: 4, texto: "Buen broker, su bono me sirvió para probar la ejecución." },
      { usuario: "Jorge L.", pais: "Chile", estrellas: 2, texto: "El soporte demoró mucho en verificar mis documentos de identidad, perdí varios días." }
    ]
  },
  xm: {
    nombre: "XM", logo: "/xm-logo (2).jpg", puntuacion: "4.6", regulacion: "CySEC, ASIC, FSC", depositoMin: "$5", plataformas: "MT4, MT5, XM App", spreadDesde: "0.6 Pips", link: "https://affs.click/5m0ik",
    veredicto: "XM es uno de los titanes del mercado minorista. Su fuerza radica en la accesibilidad: cuentas Micro y depósito de $5. Aconsejamos usar la cuenta 'XM Ultra Low'.",
    notaSeguridad: "Es un broker Market Maker altamente regulado. Actúan como contraparte pero cumplen con estrictos estándares de liquidez.",
    pros: ["Ideal para principiantes.", "Promociones y bonos constantes.", "Depósitos locales (Oxxo, PSE).", "Sin comisiones por retiros."],
    contras: ["Spreads altos en la cuenta Estándar.", "Modelo Market Maker.", "Para bonos, regulación offshore."],
    testimoniosPool: [
      { usuario: "Juan K.", pais: "México", estrellas: 5, texto: "Empecé con el bono de $30 y retiré ganancias por Oxxo sin trabas." },
      { usuario: "Santi V.", pais: "Ecuador", estrellas: 3, texto: "Muchos bonos, pero el spread de la cuenta estándar es gigante." },
      { usuario: "Elena R.", pais: "Colombia", estrellas: 5, texto: "Amo depositar directo con PSE. El chat siempre atiende en segundos." },
      { usuario: "Felipe T.", pais: "Perú", estrellas: 4, texto: "A veces en noticias fuertes la plataforma se congela un milisegundo." },
      { usuario: "Diego L.", pais: "Chile", estrellas: 5, texto: "Sus webinarios y educación gratuita son lo mejor que hay en español." },
      { usuario: "Ana F.", pais: "Argentina", estrellas: 4, texto: "Si retiras ganancias, te descuentan un porcentaje del bono que te dieron." },
      { usuario: "Pablo M.", pais: "Uruguay", estrellas: 5, texto: "La cuenta Micro es perfecta para probar robots con poco capital real." },
      { usuario: "Lorena C.", pais: "México", estrellas: 3, texto: "Te llaman mucho por teléfono para ofrecerte promociones." },
      { usuario: "Sebastián H.", pais: "Colombia", estrellas: 5, texto: "Nunca cobran comisión por depositar ni por retirar." },
      { usuario: "Víctor Z.", pais: "Bolivia", estrellas: 2, texto: "El spread se abrió muchísimo en la apertura del mercado y tocó mi Stop Loss." }
    ]
  },
  octafx: {
    nombre: "OctaFX", logo: "/octafx_logo.png", puntuacion: "4.1", regulacion: "CySEC, MISA", depositoMin: "$25", plataformas: "MT4, MT5, OctaTrader", spreadDesde: "0.6 Pips", link: "https://clickto.trade/bqdpP1wLSlB?ib=1102783",
    veredicto: "OctaFX ha ganado terreno por su CopyTrading. Ofrecen condiciones flexibles, pero su marco regulatorio para LATAM es offshore (MISA). Requiere cautela con capitales grandes.",
    notaSeguridad: "Advertencia: La regulación MISA no ofrece protección estricta en caso de insolvencia del broker.",
    pros: ["CopyTrading nativo.", "Sin comisiones swaps.", "Depósitos y retiros por cripto.", "Alto apalancamiento."],
    contras: ["Regulación offshore débil.", "Quejas por deslizamientos (slippage).", "Pocos instrumentos financieros."],
    testimoniosPool: [
      { usuario: "Fernando Q.", pais: "Colombia", estrellas: 4, texto: "El copytrading da buenos resultados, pero hay que saber elegir al master." },
      { usuario: "Paola B.", pais: "México", estrellas: 2, texto: "El spread se abre muchísimo con noticias, me ha tocado el Stop Loss." },
      { usuario: "Kevin S.", pais: "Argentina", estrellas: 5, texto: "Me encanta que no cobran swap por dejar operaciones abiertas." },
      { usuario: "Juliana M.", pais: "Chile", estrellas: 4, texto: "Retiros por USDT en menos de 30 minutos. Son muy cumplidos." },
      { usuario: "David R.", pais: "Perú", estrellas: 1, texto: "Tuve un deslizamiento terrible en el oro y el soporte no me dio solución." },
      { usuario: "Mario V.", pais: "Ecuador", estrellas: 5, texto: "Para empezar con $50 está muy bien. Los bonos ayudan." },
      { usuario: "Tatiana L.", pais: "Uruguay", estrellas: 3, texto: "Casi no tienen acciones para operar, solo lo básico." },
      { usuario: "Carlos E.", pais: "Colombia", estrellas: 4, texto: "Los concursos de trading en demo son entretenidos y sí pagan." },
      { usuario: "Natalia P.", pais: "México", estrellas: 4, texto: "La plataforma OctaTrader es muy fácil de usar." },
      { usuario: "José C.", pais: "Chile", estrellas: 3, texto: "Es buen broker secundario para jugar con capital de riesgo." }
    ]
  }
};

// Algoritmo para mezclar array
function shuffleArray(array: any[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ResenaBroker({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Resolvemos parámetros
  const resolvedParams = use(params);
  const slugLower = resolvedParams.slug.toLowerCase();
  
  if (!brokersData[slugLower]) notFound();
  const broker = brokersData[slugLower];

  // 2. Estados para el sistema de reseñas y UI
  const [testimonios, setTestimonios] = useState<any[]>([]);
  const [filtro, setFiltro] = useState<'todos' | 'positivos' | 'criticos'>('todos');
  const [paginaActual, setPaginaActual] = useState(1);
  const reviewsPorPagina = 5;

  // Estados del Formulario
  const [formData, setFormData] = useState({ 
    nombre: '', 
    email: '', 
    estrellas: 5, 
    texto: '',
    aceptaTerminos: false,
    esReal: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mezclamos comentarios falsos al cargar
  useEffect(() => {
    setTestimonios(shuffleArray(broker.testimoniosPool));
  }, [broker.testimoniosPool]);

  // Lógica de filtrado y paginación
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

  const cambiarFiltro = (nuevoFiltro: any) => {
    setFiltro(nuevoFiltro);
    setPaginaActual(1); 
  };

// Función de Envío a Supabase (Mejorada para ver el error exacto)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.aceptaTerminos || !formData.esReal) {
      alert("Debes aceptar los términos y confirmar que es un testimonio real.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Importamos el cliente de Supabase
      const { supabase } = await import('../../../lib/supabase');

      // 1. Guardar el Comentario
      const { error: errorComentario } = await supabase
        .from('comentarios')
        .insert([{ 
          broker_slug: slugLower, 
          nombre: formData.nombre, 
          correo: formData.email,
          estrellas: formData.estrellas, 
          texto: formData.texto 
        }]);

      if (errorComentario) {
        console.error("Error en tabla comentarios:", errorComentario);
        throw new Error(errorComentario.message || "Error al guardar en la tabla de comentarios.");
      }

      // 2. Guardar el Correo en Marketing (Solo Insertar, mucho más seguro)
      const { error: errorCorreo } = await supabase
        .from('suscriptores')
        .insert([{ 
          correo: formData.email, 
          origen: `Reseña de ${broker.nombre}`
        }]);

      // El código de error '23505' en PostgreSQL significa "Llave duplicada" (el correo ya existe).
      // Si el correo ya está en nuestra lista, simplemente lo ignoramos y dejamos que el proceso continúe.
      if (errorCorreo && errorCorreo.code !== '23505') {
        console.error("Error en tabla suscriptores:", errorCorreo);
        throw new Error(errorCorreo.message || "Error al guardar el correo de marketing.");
      }
      // Éxito
      setIsSuccess(true);
      setFormData({ nombre: '', email: '', estrellas: 5, texto: '', aceptaTerminos: false, esReal: false });
    } catch (error: any) {
      // AQUÍ ESTÁ LA MAGIA: Ahora veremos el texto real
      console.error("Detalle del error completo:", error);
      alert(`Error de Supabase: ${error.message || "No se pudo conectar"}\n\nRevisa la consola (F12) para más detalles.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. COMPONENTE REUTILIZABLE: CAJA CTA
  const CallToActionBox = () => (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 lg:sticky lg:top-24">
      <h3 className="text-2xl font-extrabold text-escudo-primary-dark mb-4">¿Decidido por {broker.nombre}?</h3>
      <p className="text-gray-500 text-base mb-8">Asegura tu cuenta bajo la red de EscudoForex haciendo clic en el enlace oficial a continuación.</p>
      <a href={broker.link} target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-escudo-primary text-white py-4 rounded-xl font-bold mb-4 hover:bg-escudo-primary-dark transition-all shadow-lg text-lg">
        Abrir Cuenta Oficial
      </a>
      <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
        * Operar en los mercados financieros conlleva un alto riesgo. Nunca inviertas dinero que no te puedas permitir perder.
      </p>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 text-escudo-text pb-20">
      
      {/* SECCIÓN 1: HERO */}
      <section className="bg-escudo-primary text-white py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="relative w-28 h-28 md:w-36 md:h-36 bg-white rounded-2xl shadow-lg shrink-0 overflow-hidden flex items-center justify-center p-4">
               <Image src={broker.logo} alt={broker.nombre} fill className="object-contain p-4" sizes="(max-width: 768px) 112px, 144px" />
            </div>
            <div className="text-center md:text-left flex-grow">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="bg-escudo-accent text-escudo-primary-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Investigación Completa</span>
                <div className="flex text-escudo-accent">★★★★★ <span className="ml-2 text-white/80 text-sm font-medium">({broker.puntuacion}/5)</span></div>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                Análisis de {broker.nombre}: <br className="hidden md:block" />¿Es Seguro para LATAM?
              </h1>
              <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto md:mx-0">
                Nuestro equipo ha auditado las regulaciones, costos ocultos y plataformas de {broker.nombre}. Lee nuestro veredicto neutral.
              </p>
            </div>
            <div className="w-full md:w-auto shrink-0 mt-6 md:mt-0 lg:hidden">
              <a href={broker.link} target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-escudo-accent text-escudo-primary-dark px-10 py-5 rounded-xl font-extrabold text-lg shadow-xl">
                Abrir Cuenta
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: FICHA TÉCNICA */}
      <section className="container mx-auto px-6 -mt-8 md:-mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 overflow-hidden">
          <div className="text-center p-6"><span className="block text-gray-400 text-xs font-bold uppercase mb-2">Regulación</span><span className="text-base md:text-lg font-extrabold text-escudo-primary">{broker.regulacion}</span></div>
          <div className="text-center p-6"><span className="block text-gray-400 text-xs font-bold uppercase mb-2">Depósito Mín.</span><span className="text-base md:text-lg font-extrabold text-escudo-primary">{broker.depositoMin}</span></div>
          <div className="text-center p-6"><span className="block text-gray-400 text-xs font-bold uppercase mb-2">Plataformas</span><span className="text-base md:text-lg font-extrabold text-escudo-primary">{broker.plataformas}</span></div>
          <div className="text-center p-6"><span className="block text-gray-400 text-xs font-bold uppercase mb-2">Spread Desde</span><span className="text-base md:text-lg font-extrabold text-escudo-primary">{broker.spreadDesde}</span></div>
        </div>
      </section>

      {/* SECCIÓN 3: CONTENIDO PRINCIPAL */}
      <div className="container mx-auto px-6 py-16 flex flex-col lg:grid lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2 space-y-12">
          
          <div className="text-gray-700 text-lg leading-relaxed space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-escudo-primary-dark mb-8">Reporte Confidencial</h2>
            <p>{broker.veredicto}</p>
            <div className="bg-blue-50 border-l-4 border-escudo-primary p-6 md:p-8 my-10 rounded-r-xl">
              <h4 className="font-extrabold text-escudo-primary-dark mb-3 text-xl">🛡️ Auditoría de Seguridad:</h4>
              <p className="text-base text-escudo-primary-light italic font-medium">"{broker.notaSeguridad}"</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
            <div className="bg-green-50 p-8 rounded-2xl border border-green-200 shadow-sm">
              <h3 className="text-green-800 font-extrabold text-xl mb-6 flex items-center gap-2"><span className="text-2xl">✅</span> A Favor</h3>
              <ul className="space-y-4 text-green-900 font-medium text-base">
                {broker.pros.map((pro: string, i: number) => <li key={i} className="flex items-start gap-2"><span className="text-green-500">•</span> {pro}</li>)}
              </ul>
            </div>
            <div className="bg-red-50 p-8 rounded-2xl border border-red-200 shadow-sm">
              <h3 className="text-red-800 font-extrabold text-xl mb-6 flex items-center gap-2"><span className="text-2xl">❌</span> En Contra</h3>
              <ul className="space-y-4 text-red-900 font-medium text-base">
                {broker.contras.map((contra: string, i: number) => <li key={i} className="flex items-start gap-2"><span className="text-red-500">•</span> {contra}</li>)}
              </ul>
            </div>
          </div>

          <div className="block lg:hidden py-6">
            <CallToActionBox />
          </div>

          {/* --- SISTEMA DE RESEÑAS --- */}
          <section className="space-y-6 pt-10 mt-10 border-t border-gray-200" id="comentarios">
              <h2 className="text-2xl md:text-3xl font-extrabold text-escudo-primary-dark mb-2">Experiencias de la Comunidad</h2>
              
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 scrollbar-hide">
                <button onClick={() => cambiarFiltro('todos')} className={`shrink-0 px-5 py-2 rounded-full text-sm font-bold border transition-colors ${filtro === 'todos' ? 'bg-escudo-primary text-white border-escudo-primary' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>Todas ({testimonios.length})</button>
                <button onClick={() => cambiarFiltro('positivos')} className={`shrink-0 px-5 py-2 rounded-full text-sm font-bold border transition-colors ${filtro === 'positivos' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-green-50'}`}>Positivas (4-5★)</button>
                <button onClick={() => cambiarFiltro('criticos')} className={`shrink-0 px-5 py-2 rounded-full text-sm font-bold border transition-colors ${filtro === 'criticos' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-red-50'}`}>Críticas (1-3★)</button>
              </div>

              <div className="grid gap-5">
                {testimoniosPaginados.length > 0 ? (
                  testimoniosPaginados.map((t, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="font-extrabold text-escudo-primary-dark block text-lg">{t.usuario}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t.pais}</span>
                        </div>
                        <div className="text-escudo-accent text-lg">
                          {"★".repeat(t.estrellas)}{"☆".repeat(5 - t.estrellas)}
                        </div>
                      </div>
                      <p className="text-gray-600 text-base leading-relaxed">"{t.texto}"</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-gray-500 font-medium">No hay comentarios en esta categoría aún.</p>
                  </div>
                )}
              </div>

              {totalPaginas > 1 && (
                <div className="flex justify-between items-center pt-4">
                  <button onClick={() => setPaginaActual(p => Math.max(1, p - 1))} disabled={paginaActual === 1} className="px-5 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg disabled:opacity-40 font-bold text-sm hover:bg-gray-50 transition-colors">
                    ← Anterior
                  </button>
                  <span className="text-sm font-bold text-gray-400">Página {paginaActual} de {totalPaginas}</span>
                  <button onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))} disabled={paginaActual === totalPaginas} className="px-5 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg disabled:opacity-40 font-bold text-sm hover:bg-gray-50 transition-colors">
                    Siguiente →
                  </button>
                </div>
              )}

              {/* FORMULARIO DE RESEÑA CONECTADO Y CON LEGALES */}
              <div className="bg-escudo-primary-dark text-white p-8 md:p-10 rounded-2xl shadow-xl mt-12">
                <h3 className="text-2xl font-extrabold mb-3">Deja tu reseña sobre {broker.nombre}</h3>
                <p className="text-white/80 text-base mb-8">Tu testimonio honesto ayuda a miles de traders de LATAM a invertir seguros.</p>
                
                {isSuccess ? (
                  <div className="bg-green-500/20 border border-green-500/50 p-8 rounded-xl text-center animate-fade-in">
                    <span className="text-5xl block mb-4">✅</span>
                    <h4 className="text-2xl font-extrabold text-white mb-3">¡Gracias por tu aporte!</h4>
                    <p className="text-green-50 text-base leading-relaxed">Tu reseña ha sido enviada exitosamente. Nuestro equipo de moderación la revisará para evitar el spam y será publicada a la brevedad.</p>
                    <button onClick={() => setIsSuccess(false)} className="mt-8 text-sm text-white/70 hover:text-white underline font-medium">
                      Escribir otra reseña
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input 
                        type="text" 
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        placeholder="Tu nombre o iniciales" 
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-escudo-accent placeholder-white/40" 
                      />
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Tu correo electrónico" 
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-escudo-accent placeholder-white/40" 
                      />
                    </div>
                    
                    <select 
                      value={formData.estrellas}
                      onChange={(e) => setFormData({...formData, estrellas: Number(e.target.value)})}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-escudo-accent"
                    >
                      <option className="text-black" value="5">5 Estrellas (Excelente)</option>
                      <option className="text-black" value="4">4 Estrellas (Bueno)</option>
                      <option className="text-black" value="3">3 Estrellas (Regular)</option>
                      <option className="text-black" value="2">2 Estrellas (Malo)</option>
                      <option className="text-black" value="1">1 Estrella (Pésimo/Estafa)</option>
                    </select>

                    <textarea 
                      required
                      value={formData.texto}
                      onChange={(e) => setFormData({...formData, texto: e.target.value})}
                      placeholder="Describe tu experiencia (retiros, soporte, plataforma)..." 
                      rows={4} 
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-escudo-accent placeholder-white/40"
                    ></textarea>

                    {/* Casillas de Verificación Legales y de Autenticidad */}
                    <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          required
                          checked={formData.esReal}
                          onChange={(e) => setFormData({...formData, esReal: e.target.checked})}
                          className="mt-1 w-5 h-5 accent-escudo-accent cursor-pointer" 
                        />
                        <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                          Confirmo que esta reseña se basa en mi propia experiencia real operando con este broker y no he recibido compensación por escribirla.
                        </span>
                      </label>
                      
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          required
                          checked={formData.aceptaTerminos}
                          onChange={(e) => setFormData({...formData, aceptaTerminos: e.target.checked})}
                          className="mt-1 w-5 h-5 accent-escudo-accent cursor-pointer" 
                        />
                        <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                          He leído y acepto los <a href="/terminos-y-condiciones" target="_blank" className="text-escudo-accent hover:underline">Términos y Condiciones</a> y la <a href="/politica-de-privacidad" target="_blank" className="text-escudo-accent hover:underline">Política de Privacidad</a>.
                        </span>
                      </label>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-escudo-accent text-escudo-primary-dark py-4 rounded-xl font-extrabold text-lg hover:brightness-110 transition-all shadow-lg disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                      {isSubmitting ? (
                        <><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-escudo-primary-dark"></span> Procesando...</>
                      ) : (
                        "Publicar Reseña Segura"
                      )}
                    </button>
                  </form>
                )}
              </div>
          </section>

        </div>

        <aside className="hidden lg:block">
          <CallToActionBox />
        </aside>

      </div>
    </main>
  );
}