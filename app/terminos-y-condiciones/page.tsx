import React from 'react';

export default function TerminosYCondiciones() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-escudo-primary-dark mb-8">
            Términos y Condiciones de Uso
          </h1>
          
          <div className="text-gray-700 space-y-8 leading-relaxed">
            <p className="text-sm text-gray-500">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

            <section>
              <h2 className="text-2xl font-bold text-escudo-primary mb-3">1. Aceptación de los Términos</h2>
              <p>Al acceder y utilizar <strong>EscudoForex</strong> (en adelante, "el Sitio"), usted acepta cumplir y estar sujeto a los siguientes Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-escudo-primary mb-3">2. Naturaleza Informativa y Aviso de Riesgo (Risk Warning)</h2>
              <p>El contenido publicado en EscudoForex tiene un propósito única y exclusivamente <strong>informativo y educativo</strong>. No somos asesores financieros. Operar en los mercados financieros, especialmente en Forex y Contratos por Diferencia (CFDs), conlleva un alto nivel de riesgo y puede no ser adecuado para todos los inversores. Existe la posibilidad de que pierda parte o la totalidad de su inversión inicial.</p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4 text-red-900 font-medium">
                EscudoForex no se hace responsable de las pérdidas o daños que puedan surgir directa o indirectamente del uso de la información contenida en este sitio web.
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-escudo-primary mb-3">3. Declaración de Afiliación (Disclosure)</h2>
              <p>EscudoForex es un sitio web de revisión y comparación independiente. Para mantener nuestro sitio web gratuito, utilizamos enlaces de afiliación (Introducing Broker o IB). Esto significa que, si usted hace clic en un enlace hacia el sitio web de un broker y abre una cuenta, EscudoForex puede recibir una compensación económica sin ningún costo adicional para usted. Nuestras reseñas se basan en investigaciones rigurosas y las calificaciones no se ven alteradas por nuestra relación de afiliación.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-escudo-primary mb-3">4. Reseñas y Contenido Generado por el Usuario</h2>
              <p>Al enviar una reseña o comentario en nuestro Sitio, usted garantiza que:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Su reseña está basada en una experiencia real y demostrable con el broker mencionado.</li>
                <li>No ha recibido compensación o incentivo de ningún tercero para redactar la reseña.</li>
                <li>No utilizará lenguaje difamatorio, ofensivo, o promoverá spam.</li>
              </ul>
              <p className="mt-4">Nos reservamos el derecho exclusivo de moderar, editar o eliminar cualquier comentario que viole estas reglas, que se considere spam, o que sea parte de un ataque coordinado contra la reputación de una empresa.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-escudo-primary mb-3">5. Enlaces a Terceros</h2>
              <p>Nuestro sitio contiene enlaces a sitios web de terceros (brokers, herramientas de trading). EscudoForex no tiene control sobre las políticas de privacidad ni los términos de estos sitios web, por lo que le sugerimos revisarlos al abandonar nuestra plataforma.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-escudo-primary mb-3">6. Modificaciones</h2>
              <p>EscudoForex se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.</p>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}