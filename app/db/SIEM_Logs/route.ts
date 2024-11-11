// route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 0; // Forces server-side freshness for each request

export async function GET() {
  try {
    

    

    // Execute the query with provided username and password
    const result = await sql`SELECT 
    a.source_ip, 
    a.host_ip, 
    a.descripcion, 
    a.protocolo, 
    a.area, 
    a.fecha, 
    a.riesgo, 
    r.respuesta
FROM 
    alertas a
INNER JOIN 
    ai_respuestas r 
ON 
    a.id_alert = r.id_alert;`;

    // Assuming 'login' function returns true if successful
    const Logs = result.rows

    // Send response based on login success
    return NextResponse.json({ Logs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
