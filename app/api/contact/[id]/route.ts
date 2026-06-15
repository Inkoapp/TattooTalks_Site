
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAdminAuthenticatedFromRequest } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await isAdminAuthenticatedFromRequest(request)

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 403 }
      )
    }

    const { status } = await request.json()

    if (!['nouveau', 'lu', 'traité'].includes(status)) {
      return NextResponse.json(
        { error: 'Statut invalide' },
        { status: 400 }
      )
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id: params.id },
      data: { status },
    })

    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du message:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await isAdminAuthenticatedFromRequest(request)

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 403 }
      )
    }

    await prisma.contactMessage.delete({
      where: { id: params.id },
    })

    return NextResponse.json(
      { message: 'Message supprimé avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur lors de la suppression du message:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
