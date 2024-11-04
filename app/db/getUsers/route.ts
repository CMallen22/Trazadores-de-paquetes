import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 0; // Forces server-side freshness for each request

export async function GET() {
  try {
    const result = await sql`SELECT id_user, username FROM usuario WHERE block = '0' ORDER BY id_user ASC;`;
    return NextResponse.json({ Logs: result.rows });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
