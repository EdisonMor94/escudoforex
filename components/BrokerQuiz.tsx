"use client";

import { useState } from "react";

export default function BrokerQuiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ prioridad: "", experiencia: "", pais: "", email: "" });

  const brokers = [
    { id: 1, nombre: "XTB", tipo: "seguridad", exp: "experto", link: "https://geolink.xtb.com/0EoO6" },
    { id: 2, nombre: "Pepperstone", tipo: "spreads", exp: "experto", link: "https://trk.pepperstonepartners.com/aff_c?offer_id=367&aff_id=42189" },
    { id: 3, nombre: "Tickmill", tipo: "spreads", exp: "experto", link: "https://my.tickmill.com?utm_campaign=ib_link&utm_content=IB64609042&utm_medium=Abrir+cuenta&utm_source=link&lp=https%3A%2F%2Fmy.tickmill.com%2Fes%2Fsign-upc" },
    { id: 4, nombre: "XM", tipo: "retiros", exp: "principiante", link: "https://affs.click/5m0ik" },
    { id: 5, nombre: "OctaFX", tipo: "retiros", exp: "principiante", link: "https://clickto.trade/bqdpP1wLSlB?ib=1102783" }
  ];

  const handleNext = () => setStep(step + 1);
  const progressPercentage = Math.min((step / 4) * 100, 100);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 my-12 overflow-hidden w-full relative">
      <div className="w-full bg-gray-200 h-2 overflow-hidden relative">
        <div className="bg-[var(--color-escudo-primary)] h-full transition-all duration-500 rounded-r-full" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <div className="p-8 space-y-8">
        {step === 1 && (
          <div className="text-center animate-fade-in space-y-8">
            <h3 className="text-2xl font-bold text-[var(--color-escudo-primary-dark)]">¿Qué es lo más importante para ti en un broker?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button onClick={() => { setAnswers({ ...answers, prioridad: "spreads" }); handleNext(); }} className="p-6 border-2 border-[var(--color-escudo-security-light)] hover:border-[var(--color-escudo-primary)] hover:bg-gray-50 rounded-xl transition-all font-medium text-lg cursor-pointer">📉 Spreads muy bajos</button>
              <button onClick={() => { setAnswers({ ...answers, prioridad: "retiros" }); handleNext(); }} className="p-6 border-2 border-[var(--color-escudo-security-light)] hover:border-[var(--color-escudo-primary)] hover:bg-gray-50 rounded-xl transition-all font-medium text-lg cursor-pointer">💸 Retiros rápidos y locales</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="text-center animate-fade-in space-y-8">
            <h3 className="text-2xl font-bold text-[var(--color-escudo-primary-dark)]">¿Cuál es tu nivel de experiencia haciendo Trading?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button onClick={() => { setAnswers({ ...answers, experiencia: "principiante" }); handleNext(); }} className="p-6 border-2 border-[var(--color-escudo-security-light)] hover:border-[var(--color-escudo-primary)] hover:bg-gray-50 rounded-xl transition-all font-medium text-lg cursor-pointer">🌱 Soy Principiante</button>
              <button onClick={() => { setAnswers({ ...answers, experiencia: "experto" }); handleNext(); }} className="p-6 border-2 border-[var(--color-escudo-security-light)] hover:border-[var(--color-escudo-primary)] hover:bg-gray-50 rounded-xl transition-all font-medium text-lg cursor-pointer">⚡ Ya tengo experiencia</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="text-center animate-fade-in space-y-8">
            <h3 className="text-2xl font-bold text-[var(--color-escudo-primary-dark)]">¿Desde qué país vas a operar?</h3>
            <div className="space-y-6">
              <select className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-[var(--color-escudo-primary)] outline-none bg-white" onChange={(e) => setAnswers({ ...answers, pais: e.target.value })} defaultValue="">
                <option value="" disabled>Selecciona tu país...</option>
                <option value="México">México</option>
                <option value="Colombia">Colombia</option>
                <option value="Argentina">Argentina</option>
                <option value="Perú">Perú</option>
                <option value="Chile">Chile</option>
                <option value="Otro">Otro en LATAM</option>
              </select>
              <button onClick={handleNext} disabled={!answers.pais} className="w-full bg-[var(--color-escudo-primary)] text-white p-4 rounded-xl font-bold text-lg hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer">Continuar</button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="text-center animate-fade-in space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[var(--color-escudo-primary-dark)]">¡Tenemos tus resultados! 🛡️</h3>
              <p className="text-gray-600 text-lg">¿Te gustaría recibir alertas de brokers regulados en <strong>{answers.pais}</strong>?</p>
            </div>
            <div className="space-y-6">
              <input type="email" placeholder="Tu mejor correo electrónico" className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-[var(--color-escudo-primary)] outline-none bg-white" onChange={(e) => setAnswers({ ...answers, email: e.target.value })} />
              <div className="space-y-4">
                <button onClick={handleNext} className="w-full bg-[var(--color-escudo-accent)] text-[var(--color-escudo-primary-dark)] p-4 rounded-xl font-bold text-lg hover:brightness-105 shadow-md transition-all cursor-pointer">Ver mis Brokers Recomendados</button>
                <button onClick={handleNext} className="text-sm text-gray-400 hover:text-gray-600 underline cursor-pointer">Saltar este paso y ver resultados</button>
              </div>
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="text-center animate-fade-in space-y-8">
            <h3 className="text-3xl font-extrabold text-[var(--color-escudo-primary)]">Tus Brokers Ideales</h3>
            <div className="space-y-6">
              {brokers.filter(b => b.tipo === answers.prioridad || b.exp === answers.experiencia).slice(0, 2).map(broker => (
                  <div key={broker.id} className="p-6 border-2 border-[var(--color-escudo-primary-light)] rounded-xl bg-blue-50/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <span className="font-bold text-xl text-[var(--color-escudo-primary-dark)]">{broker.nombre}</span>
                    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                       <a href={broker.link} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-[var(--color-escudo-primary)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--color-escudo-primary-dark)] transition-all cursor-pointer text-center">Visitar Web</a>
                       <a href={`/resenas/${broker.nombre.toLowerCase()}`} className="w-full md:w-auto bg-white border border-[var(--color-escudo-primary)] text-[var(--color-escudo-primary)] px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all cursor-pointer text-center">Reseña</a>
                    </div>
                  </div>
              ))}
            </div>
            <button onClick={() => {setStep(1); setAnswers({prioridad: "", experiencia: "", pais: "", email: ""})}} className="mt-8 text-sm font-medium text-gray-500 hover:text-[var(--color-escudo-primary)] cursor-pointer">Volver a empezar</button>
          </div>
        )}
      </div>
    </div>
  );
}