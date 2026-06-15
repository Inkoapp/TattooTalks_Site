import { NextResponse } from 'next/server';

export async function GET() {
  // Retourne un objet vide pour les tests, mais le service est désactivé
  return NextResponse.json({});
}

export async function POST() {
  return NextResponse.json({ error: 'Service désactivé' }, { status: 404 });
}
