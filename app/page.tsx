import BrokerQuiz from "../components/BrokerQuiz";
import Logo from "../components/Logo";
import BrokerTable from "../components/BrokerTable";

export default function Home() {
  return (
    <main className="min-h-screen bg-escudo-white text-escudo-text">
      
      {/* 1. HEADER / BARRA DE NAVEGACIÓN */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* LOGO OFICIAL (SVG) */}
          <a href="/" className="hover:opacity-90 transition-opacity">
            <Logo className="h-10 md:h-12" />
          </a>
          
          {/* MENÚ DE NAVEGACIÓN */}
          <div className="hidden md:flex items-center gap-6 font-medium text-gray-700">
            <a href="/#tabla-brokers" className="hover:text-escudo-primary transition-colors">
              Reseñas Brokers
            </a>
            <a href="/blog/educacion" className="hover:text-escudo-primary transition-colors">
              Blog Educativo
            </a>
            <a href="/blog/noticias" className="hover:text-escudo-primary transition-colors">
              Noticias
            </a>
          </div>
          
          <div className="md:hidden flex items-center">
             <button className="text-escudo-primary text-2xl cursor-pointer">☰</button>
          </div>
        </nav>
      </header>

      {/* 2. SECCIÓN: HERO (INTRODUCCIÓN PRINCIPAL) */}
      <section className="bg-escudo-primary text-escudo-white py-16 md:py-32">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <span className="text-escudo-accent font-semibold mb-4 block text-sm md:text-base">
            Protección para el Trader de LATAM
          </span>
          
          <h1 className="text-3xl md:text-6xl font-extrabold leading-tight mb-6 md:mb-8">
            Encuentra tu Broker de Forex Ideal. Sin Estafas. Con Reseñas Reales.
          </h1>
          
          <p className="text-base md:text-xl text-escudo-white/90 mb-10 md:mb-12 max-w-2xl mx-auto">
            EscudoForex es tu guía transparente en América Latina. Analizamos, calificamos y recomendamos los mejores brokers regulados basándonos en experiencias genuinas de la comunidad.
          </p>
          
          {/* BOTONES CON ENLACES FUNCIONALES */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <a 
              href="#tabla-brokers" 
              className="w-full md:w-auto bg-escudo-accent text-escudo-primary-dark px-8 py-4 md:px-10 rounded-full font-bold text-base md:text-lg hover:brightness-110 transition-all shadow-md text-center block"
            >
              Ver Mejores Brokers
            </a>
            <a 
              href="/blog/educacion" 
              className="w-full md:w-auto bg-transparent border-2 border-escudo-white px-8 py-4 md:px-10 rounded-full font-medium text-base md:text-lg hover:bg-escudo-white/10 transition-all text-center block"
            >
              Leer Últimos Blogs
            </a>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN: QUIZ INTERACTIVO (FUNNEL) */}
      <section className="bg-gray-50 py-12 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <BrokerQuiz />
        </div>
      </section>

      {/* 4. TABLA GENERAL DE BROKERS */}
      <section id="tabla-brokers" className="container mx-auto px-6 py-16 scroll-mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-escudo-primary mb-4">
            Comparativa de los Mejores Brokers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Analizamos las comisiones, regulaciones y plataformas de los brokers más populares en Latinoamérica.
          </p>
        </div>
        <BrokerTable />
      </section>

      {/* 5. SECCIÓN: FOOTER (PIE DE PÁGINA) */}
      <footer className="bg-escudo-security-dark text-escudo-white/80 py-10">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} EscudoForex.com - Todos los derechos reservados.</p>
          <p className="text-xs mt-4 max-w-lg mx-auto text-escudo-white/50 leading-relaxed">
            <strong>Aviso de Riesgo:</strong> El trading de Forex y CFDs conlleva un alto nivel de riesgo para su capital y puede no ser adecuado para todos los inversores. Asegúrese de comprender completamente los riesgos involucrados y busque asesoramiento independiente si es necesario.
          </p>
        </div>
      </footer>

    </main>
  );
}