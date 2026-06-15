import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Les 10 ROOMS FIXES (thèmes principaux) - Images réalistes et professionnelles
const fixedRooms = [
  {
    title: 'Inspirations & Styles',
    icon: '🎨',
    description: 'Partage de références, croquis, et échanges sur les styles (blackwork, réaliste, japonais, etc.)',
    tags: ['inspiration', 'styles', 'blackwork', 'realism', 'japanese'],
    cover_image_url: 'https://static.abacusaicdn.net/images/ca10b3a4-3300-4b36-a263-e5b40c0a4786.png',
  },
  {
    title: 'Matériel & Techniques',
    icon: '🖋',
    description: 'Discussions sur les machines, aiguilles, encres, gants, papier transfert, etc.',
    tags: ['equipment', 'machines', 'needles', 'ink', 'techniques'],
    cover_image_url: 'https://static.abacusaicdn.net/images/947ed02c-b545-4adf-baf9-a61e7f80cbec.png',
  },
  {
    title: 'Portfolios & Feedback',
    icon: '📸',
    description: 'Les artistes partagent leurs créations pour recevoir des avis constructifs.',
    tags: ['portfolio', 'feedback', 'critique', 'work'],
    cover_image_url: 'https://static.abacusaicdn.net/images/8a11633b-67fd-4882-8519-94f3ced7f67b.png',
  },
  {
    title: 'Apprentis & Formations',
    icon: '🧠',
    description: 'Conseils pour débutants, apprentissages, et échanges entre mentors et apprentis.',
    tags: ['apprentice', 'learning', 'mentorship', 'beginner'],
    cover_image_url: 'https://static.abacusaicdn.net/images/503c30d4-4369-4c9e-9c9e-5504da648934.png',
  },
  {
    title: 'Hygiène & Sécurité',
    icon: '🧴',
    description: 'Bonnes pratiques, normes sanitaires, et expériences des inspections.',
    tags: ['hygiene', 'safety', 'health', 'regulations'],
    cover_image_url: 'https://static.abacusaicdn.net/images/734606d6-25e7-4215-81ba-8d624214db05.png',
  },
  {
    title: 'Guest Spots & Collaborations',
    icon: '🌍',
    description: 'Studios et artistes publient leurs offres, dates disponibles et projets collaboratifs.',
    tags: ['guest-spot', 'collaboration', 'travel', 'networking'],
    cover_image_url: 'https://static.abacusaicdn.net/images/923dd5f3-9d56-4793-8403-3ebd6f031ea3.png',
  },
  {
    title: 'Business & Marketing',
    icon: '💼',
    description: 'Gestion de studio, réseaux sociaux, communication, et stratégies clients.',
    tags: ['business', 'marketing', 'social-media', 'clients'],
    cover_image_url: 'https://static.abacusaicdn.net/images/8992d4e7-71e4-4728-80b3-489fc2982a7e.png',
  },
  {
    title: 'Événements & Conventions',
    icon: '📅',
    description: 'Infos sur les conventions, festivals, et rassemblements d\'artistes.',
    tags: ['events', 'conventions', 'festivals', 'meetups'],
    cover_image_url: 'https://static.abacusaicdn.net/images/9eee04f8-78a3-4e0a-be7a-39b0798a61cb.png',
  },
  {
    title: 'TattooTalks Café',
    icon: '💬',
    description: 'Discussion libre : musique, art, lifestyle, anecdotes du métier.',
    tags: ['off-topic', 'lifestyle', 'community', 'chat'],
    cover_image_url: 'https://static.abacusaicdn.net/images/6c0529aa-6669-4a6a-a52e-96a05318592d.png',
  },
  {
    title: 'Conseils Clients & Couvertures',
    icon: '🧩',
    description: 'Échanges sur la relation client, retouches, couvertures de vieux tatouages, etc.',
    tags: ['clients', 'cover-ups', 'touch-ups', 'advice'],
    cover_image_url: 'https://static.abacusaicdn.net/images/60cdc1d5-ac69-4440-962d-ca17d33847a0.png',
  },
]

// Pas de talks ni de messages d'exemple - les utilisateurs créeront leur propre contenu

async function main() {
  console.log('🚀 Starting seed with new structure (Rooms → Talks → Messages)...')

  // Hashage des mots de passe
  const adminPasswordHash = await bcrypt.hash('Admin123!', 10)
  const testPasswordHash = await bcrypt.hash('Johndoe123!', 10)

  // Création des utilisateurs
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@tattootalks.com' },
    update: {},
    create: {
      email: 'admin@tattootalks.com',
      password_hash: adminPasswordHash,
      pseudo: 'Admin',
      bio: 'Administrateur de TattooTalks.com - Passionné de tatouage depuis plus de 15 ans',
      country: 'France',
      city: 'Paris',
      is_admin: true,
      accepted_privacy_policy: true,
    },
  })

  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password_hash: testPasswordHash,
      pseudo: 'TestUser123',
      bio: 'Tatoueur passionné spécialisé en blackwork et géométrie',
      country: 'Canada',
      city: 'Montreal',
      is_admin: false,
      accepted_privacy_policy: true,
    },
  })

  console.log('✅ Users created')

  // Création des 10 ROOMS FIXES
  const createdRooms = []
  for (const room of fixedRooms) {
    const existingRoom = await prisma.room.findFirst({
      where: { title: room.title },
    })
    
    let createdRoom
    if (existingRoom) {
      // Mettre à jour la room existante avec les nouvelles données (notamment l'image)
      createdRoom = await prisma.room.update({
        where: { id: existingRoom.id },
        data: {
          ...room,
          is_fixed: true,
          is_public: true,
          creator_id: null,
        },
      })
      console.log(`✅ Fixed room "${room.icon} ${room.title}" updated with new image`)
    } else {
      createdRoom = await prisma.room.create({
        data: {
          ...room,
          is_fixed: true,
          is_public: true,
          creator_id: null, // Les rooms fixes n'ont pas de créateur
        },
      })
      console.log(`✅ Fixed room "${room.icon} ${room.title}" created`)
    }
    createdRooms.push(createdRoom)
  }

  console.log('✅ No sample talks, messages or likes created - users will create their own content')
  console.log('🎉 Seed completed successfully!')
  console.log('📊 Structure: 10 Fixed ROOMS → Ready for user-created TALKS → MESSAGES')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })