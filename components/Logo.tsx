import Image from 'next/image';
import React from 'react';

export default function Logo({ className = "h-10 md:h-12" }: { className?: string }) {
  return (
    <div className="flex items-center gap-3">
      {/* 1. Tu nuevo logo de Canva funcionando como ícono */}
      <Image 
        src="/logo-escudoforex.svg" 
        alt="Ícono EscudoForex" 
        width={48} 
        height={48} 
        className="w-auto h-10 md:h-12 object-contain"
        priority 
      />
      
      {/* 2. El texto original y elegante que querías conservar */}
      <div className="text-2xl font-bold flex items-center mt-1">
        <span className="text-escudo-primary text-xl md:text-2xl">
          ESCUDO<span className="font-light">FOREX</span>
        </span>
      </div>
    </div>
  );
}