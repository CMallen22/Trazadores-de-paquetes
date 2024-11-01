import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    

    

    // Execute the query with provided username and password
    const result = await sql`select fuente, destino, protocolo, area, fecha, riesgo from logs2;`;

    // Assuming 'login' function returns true if successful
    const Logs = result.rows

    // Send response based on login success
    return NextResponse.json({ Logs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
