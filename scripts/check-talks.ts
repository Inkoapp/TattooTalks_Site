import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function main() {
  const talks = await prisma.talk.findMany({
    include: {
      user: {
        select: {
          pseudo: true,
          email: true,
        }
      },
      room: {
        select: {
          title: true,
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  console.log(`\n📊 Total talks: ${talks.length}\n`);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const recentTalks = talks.filter(t => new Date(t.created_at) >= today);
  const olderTalks = talks.filter(t => new Date(t.created_at) < today);
  
  console.log(`📅 Talks créés aujourd'hui: ${recentTalks.length}`);
  console.log(`📅 Talks plus anciens: ${olderTalks.length}\n`);
  
  if (recentTalks.length > 0) {
    console.log('🆕 Talks récents (créés aujourd\'hui):');
    recentTalks.forEach(t => {
      console.log(`  - "${t.title}" par ${t.user.pseudo} dans "${t.room.title}"`);
    });
  }
  
  if (olderTalks.length > 0) {
    console.log('\n📦 Talks plus anciens:');
    olderTalks.slice(0, 5).forEach(t => {
      console.log(`  - "${t.title}" par ${t.user.pseudo} dans "${t.room.title}" (${new Date(t.created_at).toLocaleDateString()})`);
    });
    if (olderTalks.length > 5) {
      console.log(`  ... et ${olderTalks.length - 5} autres`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
