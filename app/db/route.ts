import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    // Execute the query with provided username and password
    const result = await sql`SELECT login(${username}, ${password});`;

    // Assuming 'login' function returns true if successful
    const loginSuccess = result.rows[0]?.login;

    // Send response based on login success
    return NextResponse.json(String(loginSuccess), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
