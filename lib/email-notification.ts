
/**
 * Gestionnaire d'envoi d'emails avec Resend
 */

import { Resend } from 'resend';
import { prisma } from '@/lib/db';
import {
  getNewLikeEmailTemplate,
  getNewReplyEmailTemplate,
  getNewTalkEmailTemplate,
  getWelcomeEmailTemplate
} from './email-templates';
import fs from 'fs';
import path from 'path';

// Initialiser Resend avec la clé API depuis les secrets
let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    try {
      // Charger la clé API depuis le fichier de secrets
      const homeDir = process.env.HOME || process.env.USERPROFILE || '';
      if (!homeDir) {
        throw new Error('HOME environment variable not set');
      }
      const secretsPath = path.join(homeDir, '.config/abacusai_auth_secrets.json');
      const secrets = JSON.parse(fs.readFileSync(secretsPath, 'utf-8'));
      const apiKey = secrets.resend?.secrets?.api_key?.value;

      if (!apiKey) {
        throw new Error('Resend API key not found in secrets');
      }

      resend = new Resend(apiKey);
    } catch (error) {
      console.error('Error initializing Resend:', error);
      throw new Error('Failed to initialize Resend client');
    }
  }
  return resend;
}

interface EmailNotificationPayload {
  to: string;
  subject: string;
  html: string;
}

/**
 * Envoie un email de notification
 */
export async function sendEmailNotification(
  payload: EmailNotificationPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = getResendClient();
    
    const { data, error } = await client.emails.send({
      from: 'TattooTalks <contact@tattoo-talks.com>',
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      headers: {
        'X-Entity-Ref-ID': `tattootalks-${Date.now()}`,
      },
      tags: [
        {
          name: 'category',
          value: 'notification'
        }
      ]
    });

    if (error) {
      // Log l'erreur mais ne pas faire crasher l'application
      // En mode dev/test, Resend ne permet d'envoyer qu'à l'email du propriétaire
      console.log('⚠️ Email notification skipped:', error.message);
      return { success: false, error: error.message };
    }

    console.log('✅ Email envoyé avec succès:', data?.id);
    return { success: true };
  } catch (error: any) {
    console.log('⚠️ Email notification error:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Envoie un email de notification pour un nouveau like
 */
export async function sendLikeEmailNotification(
  postAuthorId: string,
  likerPseudo: string,
  talkTitle: string,
  talkId: string,
  roomId: string
): Promise<void> {
  try {
    // Vérifier les préférences de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: postAuthorId },
      select: { 
        email: true,
        email_notifications_enabled: true,
        email_notify_on_like: true 
      }
    });

    if (!user?.email_notifications_enabled || !user?.email_notify_on_like) {
      console.log('⏭️  Email de like non envoyé: préférences désactivées pour', postAuthorId);
      return;
    }
    
    console.log('📧 Envoi d\'un email de like à:', user.email);

    const talkUrl = `https://tattoo-talks.com/rooms/${roomId}#${talkId}`;
    const html = getNewLikeEmailTemplate(likerPseudo, talkTitle, talkUrl);

    await sendEmailNotification({
      to: user.email,
      subject: `❤️ ${likerPseudo} a aimé votre talk`,
      html
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de like:', error);
  }
}

/**
 * Envoie un email de notification pour une nouvelle réponse
 */
export async function sendReplyEmailNotification(
  postAuthorId: string,
  replyAuthorPseudo: string,
  talkTitle: string,
  replyContent: string,
  talkId: string,
  roomId: string
): Promise<void> {
  try {
    // Vérifier les préférences de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: postAuthorId },
      select: { 
        email: true,
        email_notifications_enabled: true,
        email_notify_on_reply: true 
      }
    });

    if (!user?.email_notifications_enabled || !user?.email_notify_on_reply) {
      console.log('⏭️  Email de réponse non envoyé: préférences désactivées pour', postAuthorId);
      return;
    }
    
    console.log('📧 Envoi d\'un email de réponse à:', user.email);

    const talkUrl = `https://tattoo-talks.com/rooms/${roomId}#${talkId}`;
    const html = getNewReplyEmailTemplate(replyAuthorPseudo, talkTitle, replyContent, talkUrl);

    await sendEmailNotification({
      to: user.email,
      subject: `💬 ${replyAuthorPseudo} a répondu à votre talk`,
      html
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de réponse:', error);
  }
}

/**
 * Envoie un email de notification pour un nouveau talk
 */
export async function sendNewTalkEmailNotification(
  userIds: string[],
  authorPseudo: string,
  roomTitle: string,
  talkTitle: string,
  roomId: string
): Promise<void> {
  try {
    for (const userId of userIds) {
      // Vérifier les préférences de l'utilisateur
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { 
          email: true,
          email_notifications_enabled: true,
          email_notify_on_new_post: true 
        }
      });

      if (!user?.email_notifications_enabled || !user?.email_notify_on_new_post) {
        console.log('⏭️  Email de nouveau talk non envoyé: préférences désactivées pour', userId);
        continue;
      }
      
      console.log('📧 Envoi d\'un email de nouveau talk à:', user.email);

      const roomUrl = `https://tattoo-talks.com/rooms/${roomId}`;
      const html = getNewTalkEmailTemplate(authorPseudo, roomTitle, talkTitle, roomUrl);

      await sendEmailNotification({
        to: user.email,
        subject: `✨ Nouveau talk dans ${roomTitle}`,
        html
      });
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi des emails de nouveau talk:', error);
  }
}

/**
 * Envoie un email de bienvenue
 */
export async function sendWelcomeEmail(
  email: string,
  pseudo: string
): Promise<void> {
  try {
    const html = getWelcomeEmailTemplate(pseudo);

    await sendEmailNotification({
      to: email,
      subject: `Bienvenue sur TattooTalks, ${pseudo} ! 🎨`,
      html
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de bienvenue:', error);
  }
}
