"use client";

import React from 'react';
import Image from 'next/image'; // Importamos el componente optimizado de Next.js

const brokers = [
  {
    id: 1,
    nombre: "XTB",
    logo: "/logoxtb.png", // Tu archivo en public
    regulacion: "FCA, KNF, CySEC",
    depositoMin: "$0",
    apalancamiento: "1:500",
    puntuacion: 4.9,
    destacado: "Mejor Regulación",
    link: "https://geolink.xtb.com/0EoO6"
  },
  {
    id: 2,
    nombre: "Pepperstone",
    logo: "/logopeperstone.png", // Tu archivo en public
    regulacion: "ASIC, FCA",
    depositoMin: "$200",
    apalancamiento: "1:500",
    puntuacion: 4.8,
    destacado: "Mejor Ejecución",
    link: "https://trk.pepperstonepartners.com/aff_c?offer_id=367&aff_id=42189"
  },
  {
    id: 3,
    nombre: "Tickmill",
    logo: "/tickmill_logo.png", // Tu archivo en public
    regulacion: "FCA, CySEC",
    depositoMin: "$100",
    apalancamiento: "1:500",
    puntuacion: 4.7,
    destacado: "Spreads Bajos",
    link: "https://my.tickmill.com?utm_campaign=ib_link&utm_content=IB64609042&utm_medium=Abrir+cuenta&utm_source=link&lp=https%3A%2F%2Fmy.tickmill.com%2Fes%2Fsign-upc"
  },
  {
    id: 4,
    nombre: "XM",
    logo: "/xm-logo (2).jpg", // Tu archivo en public
    regulacion: "CySEC, ASIC, FSC",
    depositoMin: "$5",
    apalancamiento: "1:1000",
    puntuacion: 4.6,
    destacado: "Bono de Bienvenida",
    link: "https://affs.click/5m0ik"
  },
  {
    id: 5,
    nombre: "OctaFX",
    logo: "/octafx_logo.png", // Asegúrate de subir este logo a la carpeta public
    regulacion: "CySEC, MISA",
    depositoMin: "$25",
    apalancamiento: "1:500",
    puntuacion: 4.1,
    destacado: "Depósitos Locales",
    link: "https://clickto.trade/bqdpP1wLSlB?ib=1102783"
  }
];

export default function BrokerTable() {
  return (
    <div className="w-full">
      <div className="hidden lg:grid grid-cols-6 gap-4 p-4 bg-escudo-primary text-white rounded-t-xl font-bold text-sm text-center items-center">
        <div>Broker</div>
        <div>Regulación</div>
        <div>Depósito Mín.</div>
        <div>Apalancamiento</div>
        <div>Puntuación</div>
        <div>Acción</div>
      </div>

      <div className="flex flex-col gap-4 lg:gap-0">
        {brokers.map((broker) => (
          <div key={broker.id} className="bg-white border border-gray-200 lg:border-t-0 lg:grid lg:grid-cols-6 lg:gap-4 p-6 lg:p-4 items-center text-center hover:bg-blue-50/30 transition-all rounded-xl lg:rounded-none last:lg:rounded-b-xl shadow-sm lg:shadow-none">
            
            {/* Contenedor del Logo con tamaño fijo */}
            <div className="flex flex-col items-center gap-2 mb-4 lg:mb-0">
              <div className="relative w-28 h-14 flex items-center justify-center">
                <Image 
                  src={broker.logo} 
                  alt={`Logo de ${broker.nombre}`} 
                  fill 
                  className="object-contain" // Esto evita que se deformen
                  sizes="(max-width: 768px) 100vw, 112px"
                />
              </div>
              <span className="text-[10px] bg-escudo-accent/20 text-escudo-primary-dark px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {broker.destacado}
              </span>
            </div>

            <div className="mb-3 lg:mb-0">
              <span className="lg:hidden text-xs text-gray-400 block uppercase font-bold">Regulación</span>
              <span className="text-sm font-medium text-gray-700">{broker.regulacion}</span>
            </div>
            <div className="mb-3 lg:mb-0">
              <span className="lg:hidden text-xs text-gray-400 block uppercase font-bold">Depósito Mín.</span>
              <span className="text-lg font-bold text-escudo-primary">{broker.depositoMin}</span>
            </div>
            <div className="mb-3 lg:mb-0">
              <span className="lg:hidden text-xs text-gray-400 block uppercase font-bold">Apalancamiento</span>
              <span className="text-sm text-gray-600">{broker.apalancamiento}</span>
            </div>
            <div className="mb-5 lg:mb-0">
              <span className="lg:hidden text-xs text-gray-400 block uppercase font-bold mb-1">Puntuación</span>
              <div className="flex items-center justify-center gap-1">
                <span className="text-escudo-accent text-lg">★</span>
                <span className="font-bold text-escudo-primary-dark">{broker.puntuacion}</span>
              </div>
            </div>
            <div>
              <a href={broker.link} target="_blank" rel="noopener noreferrer" className="block w-full bg-escudo-primary text-white py-3 lg:py-2 rounded-lg font-bold hover:bg-escudo-primary-dark transition-colors shadow-md text-sm cursor-pointer">
                Visitar Web
              </a>
              <a href={`/resenas/${broker.nombre.toLowerCase()}`} className="text-xs text-escudo-primary-light mt-3 block hover:text-escudo-primary hover:underline font-medium transition-colors cursor-pointer">
                Leer Reseña Completa →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}