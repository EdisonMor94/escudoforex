import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  const geminiApiKey = Deno.env.get('GEMINI_API_KEY') ?? '';
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Declaramos el ID fuera del try para que el catch pueda usarlo si falla
  let trabajoId: number | null = null;

  try {
    // 1. Buscamos un trabajo pendiente
    const { data: trabajo, error: errorBusqueda } = await supabase
      .from('trabajos_blog')
      .select('*')
      .eq('estado', 'pendiente')
      .lt('intentos', 5)
      .order('created_at', { ascending: true })
      .limit(1)
      .single();

    if (errorBusqueda || !trabajo) {
      return new Response(JSON.stringify({ message: "No hay trabajos pendientes." }), { headers: corsHeaders });
    }

    trabajoId = trabajo.id;
    console.log(`Procesando trabajo ID: ${trabajo.id}. Intento: ${trabajo.intentos + 1}`);

    // Marcamos como 'en_proceso' e incrementamos el intento
    await supabase.from('trabajos_blog').update({ 
      estado: 'en_proceso', 
      intentos: trabajo.intentos + 1 
    }).eq('id', trabajo.id);

    // 2. EL MEGA-PROMPT
    const promptFinal = `
    Actúa como el Analista Jefe de Mercado Institucional de EscudoForex. Redacta el "Radar de Mercado Diario" basado ESTRICTAMENTE en estos 3 eventos:
    ${JSON.stringify(trabajo.noticias_destacadas)}

    DIRECTRICES:
    1. Tono: Experto, objetivo y analítico para traders de LATAM.
    2. SEO: Usa palabras clave como "Trading Forex LATAM", "análisis técnico", "volatilidad".
    3. Análisis: Explica el impacto en la divisa y plantea un escenario alcista y bajista.
    4. Cierre: Consejo de Gestión de Riesgo y operar en Brokers Regulados ECN/STP.

    REGLAS DE SALIDA:
    - Devuelve ÚNICAMENTE un objeto JSON.
    - Estructura: { "titulo_seo": "Título max 65 chars", "contenido_html": "Todo el código HTML" }
    - 'contenido_html' solo usa <h2>, <h3>, <p>, <ul>, <li>, <strong>. CERO <html> o <body>.
    `;

    // 3. Llamada a Gemini 
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptFinal }] }],
        generationConfig: { 
          response_mime_type: "application/json", 
          temperature: 0.7 
        }
      })
    });

    const geminiData = await geminiResponse.json();
    if (!geminiResponse.ok) throw new Error(JSON.stringify(geminiData));

    // 4. Extraemos el JSON
    const respuestaTexto = geminiData.candidates[0].content.parts[0].text;
    const blogTerminado = JSON.parse(respuestaTexto);

    // 5. Creamos el Slug dinámico
    const fechaLimpia = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }).replace(/ de /g, '-').toLowerCase();
    const slugGenerado = `radar-mercado-${fechaLimpia}-${trabajo.id}`;

    // Imágenes aleatorias
    const imagenesFinancieras = [
      "https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6771178/pexels-photo-6771178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ];
    const imagenAleatoria = imagenesFinancieras[Math.floor(Math.random() * imagenesFinancieras.length)];

    // 6. Insertamos en Blogs
    const { error: errorInsert } = await supabase.from('articulos').insert([{
      slug: slugGenerado,
      titulo: blogTerminado.titulo_seo,
      categoria: 'noticias',
      subcategoria: 'Análisis Diario',
      contenido_html: blogTerminado.contenido_html,
      imagen_portada: imagenAleatoria
    }]);

    if (errorInsert) throw errorInsert;

    // 7. Marcamos como completado
    await supabase.from('trabajos_blog').update({ 
      estado: 'completado', 
      error_log: null 
    }).eq('id', trabajo.id);

    return new Response(JSON.stringify({ message: "Éxito", slug: slugGenerado }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }});

  } catch (err: any) {
    console.error("Error procesando trabajo:", err);
    
    // 👇 ESTO ES LO QUE FALTABA: REVERTIR EL ESTADO SI HAY ERROR 👇
    if (trabajoId) {
      await supabase.from('trabajos_blog').update({ 
        estado: 'pendiente', 
        error_log: err.message 
      }).eq('id', trabajoId);
    }

    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
  }
});