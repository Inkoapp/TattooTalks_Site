import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ error: 'Service désactivé' }, { status: 404 });
}
