"use client";

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase'; 

export default function AdBanner() {
  const [adHtml, setAdHtml] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAd = async () => {
      const isMobile = window.innerWidth < 768;
      
      const { data, error } = await supabase
        .from('banners')
        .select('codigo_html')
        .in('tipo_dispositivo', isMobile ? ['movil', 'ambos'] : ['escritorio', 'ambos']);

      if (error) {
        console.error("Error cargando banner:", error);
        return;
      }

      if (data && data.length > 0) {
        const randomAd = data[Math.floor(Math.random() * data.length)];
        setAdHtml(randomAd.codigo_html);
      }
    };

    fetchAd();
  }, []);

  // EL "HACK" EXPERTO: Forzar la ejecución de scripts inyectados
  useEffect(() => {
    if (adHtml && containerRef.current) {
      const scripts = containerRef.current.querySelectorAll('script');
      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        // Copiamos todos los atributos (como el src)
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        // Reemplazamos el script dormido por el nuevo script activo
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    }
  }, [adHtml]);

  if (!adHtml) {
    return (
      <div className="my-10 w-full flex justify-center">
        <div className="w-full max-w-[300px] md:max-w-[728px] h-[50px] md:h-[90px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center border border-gray-200">
           <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">Publicidad</span>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 flex justify-center w-full overflow-hidden relative z-0">
       <span className="absolute -top-4 text-[9px] text-gray-400 uppercase font-bold tracking-widest">Publicidad Patrocinada</span>
       {/* Añadimos la referencia (ref) al contenedor */}
       <div ref={containerRef} dangerouslySetInnerHTML={{ __html: adHtml }} className="mt-2" />
    </div>
  );
}