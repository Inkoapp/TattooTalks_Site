import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Recherche des talks générés automatiquement...\n');
  
  // Définir la date du jour (début de journée)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Récupérer tous les talks créés aujourd'hui
  const talksToDelete = await prisma.talk.findMany({
    where: {
      created_at: {
        gte: today
      }
    },
    include: {
      user: {
        select: {
          pseudo: true
        }
      },
      room: {
        select: {
          title: true
        }
      }
    }
  });
  
  console.log(`📊 ${talksToDelete.length} talks générés trouvés (créés aujourd'hui)\n`);
  
  if (talksToDelete.length === 0) {
    console.log('✅ Aucun talk à supprimer');
    return;
  }
  
  // Afficher un aperçu
  console.log('📝 Aperçu des talks à supprimer:');
  talksToDelete.slice(0, 5).forEach(t => {
    console.log(`  - "${t.title}" par ${t.user.pseudo}`);
  });
  if (talksToDelete.length > 5) {
    console.log(`  ... et ${talksToDelete.length - 5} autres\n`);
  }
  
  // Supprimer les messages associés
  console.log('🗑️  Suppression des messages associés...');
  const deletedMessages = await prisma.message.deleteMany({
    where: {
      talk_id: {
        in: talksToDelete.map(t => t.id)
      }
    }
  });
  console.log(`   ✓ ${deletedMessages.count} messages supprimés`);
  
  // Supprimer les likes associés
  console.log('🗑️  Suppression des likes associés...');
  const deletedLikes = await prisma.like.deleteMany({
    where: {
      talk_id: {
        in: talksToDelete.map(t => t.id)
      }
    }
  });
  console.log(`   ✓ ${deletedLikes.count} likes supprimés`);
  
  // Supprimer les talks
  console.log('🗑️  Suppression des talks...');
  const deletedTalks = await prisma.talk.deleteMany({
    where: {
      created_at: {
        gte: today
      }
    }
  });
  console.log(`   ✓ ${deletedTalks.count} talks supprimés\n`);
  
  // Vérifier ce qui reste
  const remainingTalks = await prisma.talk.findMany({
    include: {
      user: {
        select: {
          pseudo: true
        }
      },
      room: {
        select: {
          title: true
        }
      }
    }
  });
  
  console.log(`✅ Opération terminée !`);
  console.log(`📊 ${remainingTalks.length} talks préservés (créés par les utilisateurs):\n`);
  
  remainingTalks.forEach(t => {
    console.log(`  - "${t.title}" par ${t.user.pseudo} dans "${t.room.title}"`);
  });
}

main()
  .catch((error) => {
    console.error('❌ Erreur:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
