
import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { 
  sendWelcomeEmail, 
  sendLikeEmailNotification, 
  sendReplyEmailNotification, 
  sendNewTalkEmailNotification 
} from '../lib/email-notification'

// Charger les variables d'environnement
config()

const prisma = new PrismaClient()

const TEST_EMAIL = 'tattooshop.l.ink@gmail.com'
const TEST_PSEUDO = 'EmailTestUser'

async function sendTestEmails() {
  console.log('🚀 Envoi des emails de test à:', TEST_EMAIL)
  console.log('-------------------------------------------')

  try {
    // Créer ou récupérer un utilisateur de test
    console.log('📝 Création/récupération de l\'utilisateur de test...')
    let testUser = await prisma.user.findUnique({
      where: { email: TEST_EMAIL }
    })

    if (!testUser) {
      const hashedPassword = await bcrypt.hash('test123', 10)
      testUser = await prisma.user.create({
        data: {
          email: TEST_EMAIL,
          pseudo: TEST_PSEUDO,
          password_hash: hashedPassword,
          country: 'France',
          city: 'Paris',
          accepted_privacy_policy: true,
          email_notifications_enabled: true,
          email_notify_on_like: true,
          email_notify_on_reply: true,
          email_notify_on_new_post: true
        }
      })
      console.log('✅ Utilisateur de test créé')
    } else {
      // Mettre à jour les préférences de notification
      testUser = await prisma.user.update({
        where: { email: TEST_EMAIL },
        data: {
          email_notifications_enabled: true,
          email_notify_on_like: true,
          email_notify_on_reply: true,
          email_notify_on_new_post: true
        }
      })
      console.log('✅ Utilisateur de test existant trouvé et préférences mises à jour')
    }

    // Récupérer une room et un talk existants pour les tests
    const room = await prisma.room.findFirst()
    const talk = await prisma.talk.findFirst()

    if (!room || !talk) {
      console.error('❌ Pas de room ou talk disponible dans la base de données')
      return
    }

    // 1. Email de bienvenue
    console.log('\n📧 1. Envoi de l\'email de bienvenue...')
    await sendWelcomeEmail(TEST_EMAIL, TEST_PSEUDO)
    console.log('✅ Email de bienvenue envoyé')
    
    // Attendre 2 secondes entre chaque email
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 2. Email de notification de like
    console.log('\n📧 2. Envoi de l\'email de notification de like...')
    await sendLikeEmailNotification(
      testUser.id,
      'ArtistePro',
      'Mon premier tatouage japonais - Dragon sur le dos',
      talk.id,
      room.id
    )
    console.log('✅ Email de notification de like envoyé')
    
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 3. Email de notification de réponse
    console.log('\n📧 3. Envoi de l\'email de notification de réponse...')
    await sendReplyEmailNotification(
      testUser.id,
      'TattooLover',
      'Conseils pour choisir son premier tatouage',
      'Super conseil ! J\'ajouterais qu\'il est important de bien réfléchir à l\'emplacement. Certaines zones sont plus douloureuses que d\'autres.',
      talk.id,
      room.id
    )
    console.log('✅ Email de notification de réponse envoyé')
    
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 4. Email de notification de nouveau talk
    console.log('\n📧 4. Envoi de l\'email de notification de nouveau talk...')
    await sendNewTalkEmailNotification(
      [testUser.id],
      'InkMaster',
      'Matériel & Techniques',
      'Nouvelles aiguilles révolutionnaires pour le réalisme',
      room.id
    )
    console.log('✅ Email de notification de nouveau talk envoyé')

    console.log('\n-------------------------------------------')
    console.log('🎉 Tous les emails de test ont été envoyés avec succès !')
    console.log(`📬 Vérifiez votre boîte mail : ${TEST_EMAIL}`)
    console.log('\n⚠️  Note : Si vous utilisez Resend en mode test,')
    console.log('    les emails ne seront envoyés que si cette adresse')
    console.log('    correspond à l\'email du compte Resend.')

  } catch (error) {
    console.error('\n❌ Erreur lors de l\'envoi des emails:', error)
    
    if (error instanceof Error) {
      console.error('Message:', error.message)
      if (error.message.includes('Can only send emails to')) {
        console.log('\n💡 Solution:')
        console.log('   1. Vérifiez que l\'adresse tattooshop.l.ink@gmail.com')
        console.log('      correspond à votre compte Resend')
        console.log('   2. Ou passez en mode production sur Resend')
        console.log('   3. Ou ajoutez un domaine vérifié sur Resend')
      }
    }
  } finally {
    await prisma.$disconnect()
    process.exit(0)
  }
}

// Exécuter le script
sendTestEmails()
