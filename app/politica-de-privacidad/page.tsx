import React from 'react';

export default function PoliticaDePrivacidad() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-escudo-primary-dark mb-8">
            Política de Privacidad
          </h1>
          
          <div className="text-gray-700 space-y-8 leading-relaxed">
            <p className="text-sm text-gray-500">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

            <section>
              <h2 className="text-2xl font-bold text-escudo-primary mb-3">1. Introducción</h2>
              <p>En <strong>EscudoForex</strong>, respetamos su privacidad y nos comprometemos a proteger los datos personales que comparte con nosotros. Esta Política de Privacidad explica cómo recopilamos, usamos y resguardamos su información al utilizar nuestro sitio web.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-escudo-primary mb-3">2. Información que Recopilamos</h2>
              <p>Recopilamos información que usted nos proporciona voluntariamente, la cual incluye, pero no se limita a:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>Datos de contacto:</strong> Nombre, iniciales y dirección de correo electrónico cuando se suscribe a nuestras alertas, boletines informativos o envía una reseña a través de nuestros formularios.</li>
                <li><strong>Contenido generado por el usuario:</strong> Las opiniones, textos y calificaciones que usted decide hacer públicos al evaluar a un broker en nuestra plataforma.</li>
                <li><strong>Datos de uso:</strong> Información anónima sobre su navegación (páginas visitadas, tiempo en el sitio) mediante cookies analíticas para mejorar nuestra web.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-escudo-primary mb-3">3. Uso de la Información</h2>
              <p>La información recopilada se utiliza estrictamente para:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Publicar de forma transparente sus reseñas y experiencias en los perfiles de los brokers (solo se publicará el nombre o iniciales provistos; <strong>su correo nunca será público</strong>).</li>
                <li>Enviarle boletines informativos, alertas de estafas, y contenido educativo relevante para su país (solo si nos ha proporcionado su correo electrónico para este fin).</li>
                <li>Mejorar el diseño, seguridad y experiencia de usuario en nuestra plataforma.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-escudo-primary mb-3">4. Protección y Almacenamiento de Datos</h2>
              <p>Implementamos medidas de seguridad técnicas y organizativas para proteger su información contra el acceso no autorizado. Nuestra base de datos utiliza infraestructura en la nube segura. No obstante, ninguna transmisión de datos por Internet es 100% segura, por lo que no podemos garantizar la seguridad absoluta de los datos transmitidos a nuestro sitio.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-escudo-primary mb-3">5. Compartir Datos con Terceros</h2>
              <p><strong>Nosotros no vendemos, alquilamos ni compartimos su información personal con terceros para fines comerciales.</strong> Podríamos divulgar su información únicamente si así lo requiere la ley o en respuesta a solicitudes válidas de autoridades públicas.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-escudo-primary mb-3">6. Sus Derechos</h2>
              <p>Usted tiene derecho a solicitar la modificación, actualización o eliminación de su información personal y correo electrónico de nuestra base de datos. Para ejercer estos derechos, o si tiene alguna pregunta sobre esta Política de Privacidad, por favor, póngase en contacto con nuestro equipo.</p>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}