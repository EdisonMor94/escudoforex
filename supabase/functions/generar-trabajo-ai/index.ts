import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Recibimos el payload del Webhook de Supabase (el nuevo registro insertado)
    const payload = await req.json();
    const registroCalendario = payload.record;

    if (!registroCalendario || !registroCalendario.datos_brutos) {
      throw new Error("No se recibieron datos del calendario válidos.");
    }

    const eventos = registroCalendario.datos_brutos;
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY'); // Necesitaremos configurar esto

    if (!geminiApiKey) {
      throw new Error("Falta la clave de API de Gemini en las variables de entorno.");
    }

    console.log("Conectando con la IA de Gemini...");

    // 2. Preparamos el Prompt (Instrucciones exactas)
    const prompt = `Actúa como un analista financiero experto de Forex. Revisa la siguiente lista de eventos macroeconómicos programados para hoy: ${JSON.stringify(eventos)}.
    Identifica estrictamente los 3 eventos más críticos que impactarán el mercado de divisas.
    Debes devolver ÚNICAMENTE un objeto JSON válido con esta estructura exacta, sin texto adicional ni formato markdown:
    {
      "noticias": [
        { "evento": "Nombre del evento", "moneda": "Ej: USD", "impacto_esperado": "Breve explicación de cómo afectará al mercado", "hora": "Hora del evento" }
      ]
    }`;

// 3. Llamamos a la API de Gemini (Actualizado a gemini-2.5-flash)
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: "application/json" } // Forzamos JSON puro
      })
    });

    const geminiData = await geminiResponse.json();
    if (!geminiResponse.ok) throw new Error(JSON.stringify(geminiData));

    // 4. Extraemos el JSON generado por Gemini
    const textoJSON = geminiData.candidates[0].content.parts[0].text;
    const noticiasDestacadas = JSON.parse(textoJSON);

    console.log("¡Gemini analizó los datos correctamente!");

    // 5. Conectamos a Supabase para guardar el trabajo
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 6. Insertamos en la cola de trabajos
    const { error: errorTrabajo } = await supabase
      .from('trabajos_blog')
      .insert([{
        fecha_referencia: registroCalendario.fecha,
        noticias_destacadas: noticiasDestacadas,
        estado: 'pendiente',
        intentos: 0
      }]);

    if (errorTrabajo) throw errorTrabajo;

// ... (después de insertar en trabajos_blog)

    // 7. LIMPIEZA: Borramos el registro del calendario para dejar la tabla limpia para mañana
    const { error: errorLimpieza } = await supabase
      .from('calendario_temporal')
      .delete()
      .eq('id', registroCalendario.id);

    if (errorLimpieza) console.error("Error limpiando tabla temporal:", errorLimpieza);

    return new Response(JSON.stringify({ message: "Trabajo creado y tabla temporal limpia." }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
    
  } catch (error: any) {
    console.error("Error en la Edge Function generar-trabajo-ai:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});