import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { event_code, source_ip, host_ip } = await request.json();

    // Execute the query with provided username and password
    const result = await sql`INSERT INTO alertas (event_code, source_ip, host_ip) VALUES (${event_code}, ${source_ip}, ${host_ip});`;

    // Assuming 'login' function returns true if successful
    //const loginSuccess = result.rows[0]?.login;

    // Send response based on login success
    return NextResponse.json(String(result), { status: 200,
        //headers: {
        //  'Access-Control-Allow-Origin': '*', // Allows all origins
        //  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Allowed methods
        //  'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allowed headers
        //}
      });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
