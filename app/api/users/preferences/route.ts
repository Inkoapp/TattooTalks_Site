import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'Service désactivé' }, { status: 404 });
}

export async function PATCH() {
  return NextResponse.json({ error: 'Service désactivé' }, { status: 404 });
}
