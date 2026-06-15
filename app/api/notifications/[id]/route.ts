import { NextResponse } from 'next/server';

export async function PATCH() {
  return NextResponse.json({ error: 'Service désactivé' }, { status: 404 });
}
