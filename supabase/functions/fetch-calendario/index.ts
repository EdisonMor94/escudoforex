import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

// Configuración de CORS para poder llamarla si es necesario desde el frontend
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // 1. Manejo de peticiones OPTIONS (CORS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 2. Conectarse a Supabase saltándose las reglas RLS (Nivel Dios/Admin)
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. Llamar al Feed JSON público de ForexFactory
    console.log("Obteniendo datos de ForexFactory...");
    const ffResponse = await fetch("https://nfs.faireconomy.media/ff_calendar_thisweek.json");
    
    if (!ffResponse.ok) {
      throw new Error(`Error en ForexFactory: ${ffResponse.statusText}`);
    }

    const ffData = await ffResponse.json();

    // 4. Filtrar solo las noticias de HOY y de alto/medio impacto
    // Extraemos la fecha de hoy en formato YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    
    const eventosDeHoy = ffData.filter((evento: any) => {
      // ForexFactory devuelve la fecha en formato "2026-05-01T08:30:00-04:00"
      const fechaEvento = evento.date.split('T')[0];
      // Solo nos importan eventos de hoy y que tengan algún impacto (High, Medium)
      return fechaEvento === today && (evento.impact === 'High' || evento.impact === 'Medium');
    });

    console.log(`Se encontraron ${eventosDeHoy.length} eventos relevantes para hoy.`);

    // Si no hay eventos importantes hoy (Ej. un domingo o feriado bancario mundial), cancelamos el proceso
    if (eventosDeHoy.length === 0) {
      return new Response(
        JSON.stringify({ message: "No hay eventos económicos de alto impacto hoy." }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // 5. Insertar el JSON crudo en la tabla 'calendario_temporal'
    const { data, error } = await supabase
      .from('calendario_temporal')
      .insert([
        { 
          fecha: today, 
          datos_brutos: eventosDeHoy,
          procesado: false 
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Éxito
    return new Response(
      JSON.stringify({ 
        message: "Calendario de ForexFactory guardado con éxito.", 
        eventosGuardados: eventosDeHoy.length,
        registro_id: data.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error("Error en Edge Function fetch-calendario:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
})