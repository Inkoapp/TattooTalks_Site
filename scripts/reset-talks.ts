
import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Charger les variables d'environnement
config()

const prisma = new PrismaClient()

async function resetTalks() {
  try {
    console.log('🗑️  Suppression de tous les messages...')
    const deletedMessages = await prisma.message.deleteMany({})
    console.log(`✅ ${deletedMessages.count} messages supprimés`)

    console.log('🗑️  Suppression de tous les likes...')
    const deletedLikes = await prisma.like.deleteMany({})
    console.log(`✅ ${deletedLikes.count} likes supprimés`)

    console.log('🗑️  Suppression de toutes les talks...')
    const deletedTalks = await prisma.talk.deleteMany({})
    console.log(`✅ ${deletedTalks.count} talks supprimées`)

    console.log('\n🎉 Toutes les talks ont été supprimées avec succès!')
    console.log('📊 Base de données réinitialisée à 0 talk')
  } catch (error) {
    console.error('❌ Erreur lors de la suppression:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

resetTalks()
