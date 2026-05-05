"use client";

import { useState, useRef, useEffect } from "react";

export default function BrokerQuiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ prioridad: "", experiencia: "", pais: "", email: "" });
  
  // Estado para controlar si el menú desplegable está abierto o cerrado
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const brokers = [
    { id: 1, nombre: "XTB", tipo: "seguridad", exp: "experto", link: "https://geolink.xtb.com/0EoO6" },
    { id: 2, nombre: "Pepperstone", tipo: "spreads", exp: "experto", link: "https://trk.pepperstonepartners.com/aff_c?offer_id=367&aff_id=42189" },
    { id: 3, nombre: "Tickmill", tipo: "spreads", exp: "experto", link: "https://my.tickmill.com?utm_campaign=ib_link&utm_content=IB64609042&utm_medium=Abrir+cuenta&utm_source=link&lp=https%3A%2F%2Fmy.tickmill.com%2Fes%2Fsign-upc" },
    { id: 4, nombre: "XM", tipo: "retiros", exp: "principiante", link: "https://affs.click/5m0ik" },
    { id: 5, nombre: "OctaFX", tipo: "retiros", exp: "principiante", link: "https://clickto.trade/bqdpP1wLSlB?ib=1102783" }
  ];

  const paisesLATAM = [
    "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica", "Cuba", 
    "Ecuador", "El Salvador", "Guatemala", "Honduras", "México", "Nicaragua", 
    "Panamá", "Paraguay", "Perú", "Puerto Rico", "República Dominicana", "Uruguay", 
    "Venezuela", "Otro en LATAM"
  ];

  const handleNext = () => setStep(step + 1);
  const progressPercentage = Math.min((step / 4) * 100, 100);

  // Cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 my-12 overflow-hidden w-full relative">
      
      {/* BARRA DE PROGRESO */}
      <div className="w-full bg-gray-200 h-2 overflow-hidden relative">
        <div className="bg-[var(--color-escudo-primary)] h-full transition-all duration-500 rounded-r-full" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      
      <div className="p-8 space-y-8 min-h-[350px] flex flex-col justify-center">
        
        {/* PASO 1 */}
        {step === 1 && (
          <div className="text-center animate-fade-in space-y-8">
            <h3 className="text-2xl font-bold text-[var(--color-escudo-primary-dark)]">¿Qué es lo más importante para ti en un broker?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button onClick={() => { setAnswers({ ...answers, prioridad: "spreads" }); handleNext(); }} className="p-6 border-2 border-[var(--color-escudo-security-light)] hover:border-[var(--color-escudo-primary)] hover:bg-gray-50 rounded-xl transition-all font-medium text-lg cursor-pointer">📉 Spreads muy bajos</button>
              <button onClick={() => { setAnswers({ ...answers, prioridad: "retiros" }); handleNext(); }} className="p-6 border-2 border-[var(--color-escudo-security-light)] hover:border-[var(--color-escudo-primary)] hover:bg-gray-50 rounded-xl transition-all font-medium text-lg cursor-pointer">💸 Retiros rápidos y locales</button>
            </div>
          </div>
        )}

        {/* PASO 2 */}
        {step === 2 && (
          <div className="text-center animate-fade-in space-y-8">
            <h3 className="text-2xl font-bold text-[var(--color-escudo-primary-dark)]">¿Cuál es tu nivel de experiencia haciendo Trading?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button onClick={() => { setAnswers({ ...answers, experiencia: "principiante" }); handleNext(); }} className="p-6 border-2 border-[var(--color-escudo-security-light)] hover:border-[var(--color-escudo-primary)] hover:bg-gray-50 rounded-xl transition-all font-medium text-lg cursor-pointer">🌱 Soy Principiante</button>
              <button onClick={() => { setAnswers({ ...answers, experiencia: "experto" }); handleNext(); }} className="p-6 border-2 border-[var(--color-escudo-security-light)] hover:border-[var(--color-escudo-primary)] hover:bg-gray-50 rounded-xl transition-all font-medium text-lg cursor-pointer">⚡ Ya tengo experiencia</button>
            </div>
          </div>
        )}

        {/* PASO 3 (Actualizado con Dropdown Personalizado) */}
        {step === 3 && (
          <div className="text-center animate-fade-in space-y-8 relative">
            <h3 className="text-2xl font-bold text-[var(--color-escudo-primary-dark)]">¿Desde qué país vas a operar?</h3>
            
            <div className="space-y-6 max-w-md mx-auto" ref={dropdownRef}>
              
              {/* Contenedor Relativo para el Dropdown */}
              <div className="relative">
                {/* Botón que actúa como el "select" */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full p-4 border-2 rounded-xl text-lg text-left outline-none bg-white transition-all flex justify-between items-center cursor-pointer ${
                    isDropdownOpen ? 'border-[var(--color-escudo-primary)] shadow-md' : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span className={answers.pais ? "text-slate-900 font-medium" : "text-gray-400"}>
                    {answers.pais || "Selecciona tu país..."}
                  </span>
                  
                  {/* Flechita SVG */}
                  <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Lista desplegable animada */}
                {isDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-60 overflow-y-auto animate-fade-in">
                    {paisesLATAM.map((pais) => (
                      <button
                        key={pais}
                        className={`w-full text-left px-6 py-3 hover:bg-[var(--color-escudo-primary)] hover:text-white transition-colors cursor-pointer text-lg ${
                          answers.pais === pais ? 'bg-gray-50 font-bold text-[var(--color-escudo-primary)]' : 'text-gray-700'
                        }`}
                        onClick={() => {
                          setAnswers({ ...answers, pais: pais });
                          setIsDropdownOpen(false);
                        }}
                      >
                        {pais}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={handleNext} 
                disabled={!answers.pais} 
                className="w-full bg-[var(--color-escudo-primary)] text-white p-4 rounded-xl font-bold text-lg hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer shadow-md mt-4"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* PASO 4 */}
        {step === 4 && (
          <div className="text-center animate-fade-in space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[var(--color-escudo-primary-dark)]">¡Tenemos tus resultados! 🛡️</h3>
              <p className="text-gray-600 text-lg">¿Te gustaría recibir alertas de brokers regulados en <strong>{answers.pais}</strong>?</p>
            </div>
            <div className="space-y-6 max-w-md mx-auto">
              <input type="email" placeholder="Tu mejor correo electrónico" className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-[var(--color-escudo-primary)] outline-none bg-white transition-colors" onChange={(e) => setAnswers({ ...answers, email: e.target.value })} />
              <div className="space-y-4">
                <button onClick={handleNext} className="w-full bg-[var(--color-escudo-accent)] text-[var(--color-escudo-primary-dark)] p-4 rounded-xl font-bold text-lg hover:brightness-105 shadow-md transition-all cursor-pointer">Ver mis Brokers Recomendados</button>
                <button onClick={handleNext} className="text-sm text-gray-400 hover:text-[var(--color-escudo-primary)] underline cursor-pointer transition-colors block mx-auto">Saltar este paso y ver resultados</button>
              </div>
            </div>
          </div>
        )}

        {/* PASO 5 (RESULTADOS) */}
        {step === 5 && (
          <div className="text-center animate-fade-in space-y-8">
            <h3 className="text-3xl font-extrabold text-[var(--color-escudo-primary)]">Tus Brokers Ideales</h3>
            <div className="space-y-6">
              {brokers.filter(b => b.tipo === answers.prioridad || b.exp === answers.experiencia).slice(0, 2).map(broker => (
                  <div key={broker.id} className="p-6 border-2 border-[var(--color-escudo-primary-light)] rounded-xl bg-blue-50/30 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-extrabold text-2xl text-[var(--color-escudo-primary-dark)]">{broker.nombre}</span>
                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                       <a href={broker.link} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-[var(--color-escudo-primary)] text-white px-8 py-3 rounded-xl font-bold hover:bg-[var(--color-escudo-primary-dark)] transition-all cursor-pointer text-center shadow-md">Visitar Web</a>
                       <a href={`/resenas/${broker.nombre.toLowerCase()}`} className="w-full md:w-auto bg-white border-2 border-[var(--color-escudo-primary)] text-[var(--color-escudo-primary)] px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all cursor-pointer text-center">Leer Reseña</a>
                    </div>
                  </div>
              ))}
            </div>
            <button onClick={() => {setStep(1); setAnswers({prioridad: "", experiencia: "", pais: "", email: ""})}} className="mt-8 text-sm font-bold text-gray-400 hover:text-[var(--color-escudo-primary)] cursor-pointer transition-colors">↻ Volver a empezar</button>
          </div>
        )}
      </div>
    </div>
  );
}