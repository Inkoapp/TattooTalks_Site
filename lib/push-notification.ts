
import { prisma } from '@/lib/db';
import webpush from 'web-push';
import {
  sendLikeEmailNotification,
  sendReplyEmailNotification,
  sendNewTalkEmailNotification
} from './email-notification';

// Configuration VAPID
webpush.setVapidDetails(
  `mailto:${process.env.VAPID_CONTACT_EMAIL}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  url?: string;
  tag?: string;
  requireInteraction?: boolean;
}

/**
 * Envoie une notification push à un utilisateur spécifique
 */
export async function sendPushNotification(
  userId: string,
  payload: NotificationPayload
): Promise<{ success: boolean; sentCount: number; totalCount: number }> {
  try {
    // Vérifier les préférences de notification de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { notifications_enabled: true }
    });

    if (!user?.notifications_enabled) {
      return { success: true, sentCount: 0, totalCount: 0 };
    }

    // Récupérer tous les abonnements de l'utilisateur
    const subscriptions = await prisma.pushSubscription.findMany({
      where: { user_id: userId }
    });

    if (subscriptions.length === 0) {
      return { success: true, sentCount: 0, totalCount: 0 };
    }

    const notificationPayload = JSON.stringify({
      title: payload.title,
      body: payload.body,
      icon: payload.icon || '/logo.png',
      badge: payload.badge || '/favicon.png',
      data: { url: payload.url || '/dashboard' },
      tag: payload.tag || 'default',
      requireInteraction: payload.requireInteraction || false
    });

    // Envoyer la notification à tous les abonnements
    let sentCount = 0;

    for (const sub of subscriptions) {
      try {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: sub.keys as { p256dh: string; auth: string }
        };

        await webpush.sendNotification(pushSubscription, notificationPayload);
        sentCount++;
      } catch (error: any) {
        console.error('Erreur d\'envoi de notification:', error);

        // Si l'abonnement est expiré ou invalide, le supprimer
        if (error.statusCode === 410 || error.statusCode === 404) {
          await prisma.pushSubscription.delete({
            where: { id: sub.id }
          }).catch((err: any) => console.error('Erreur de suppression:', err));
        }
      }
    }

    return {
      success: true,
      sentCount,
      totalCount: subscriptions.length
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de notification push:', error);
    return { success: false, sentCount: 0, totalCount: 0 };
  }
}

/**
 * Crée une notification en base de données
 */
async function createNotificationInDB(
  userId: string,
  type: string,
  title: string,
  message: string,
  link?: string
) {
  try {
    await prisma.notification.create({
      data: {
        user_id: userId,
        type,
        title,
        message,
        link,
        is_read: false
      }
    });
  } catch (error) {
    console.error('Erreur création notification DB:', error);
  }
}

/**
 * Envoie une notification de nouvelle réponse (Push + Email + DB)
 */
export async function sendReplyNotification(
  postAuthorId: string,
  replyAuthorPseudo: string,
  postContent: string,
  talkId: string,
  roomId: string,
  talkTitle?: string,
  replyContent?: string
) {
  // Vérifier les préférences
  const user = await prisma.user.findUnique({
    where: { id: postAuthorId },
    select: { 
      notify_on_reply: true,
      email_notifications_enabled: true,
      email_notify_on_reply: true
    }
  });

  if (!user?.notify_on_reply && !user?.email_notify_on_reply) {
    return;
  }

  const truncatedContent = postContent.length > 50 
    ? postContent.substring(0, 50) + '...' 
    : postContent;

  // Créer la notification en DB
  await createNotificationInDB(
    postAuthorId,
    'reply',
    'Nouvelle réponse',
    `${replyAuthorPseudo} a répondu à votre talk: "${truncatedContent}"`,
    `/rooms/${roomId}#${talkId}`
  );

  // Envoyer la notification push
  if (user?.notify_on_reply) {
    await sendPushNotification(postAuthorId, {
      title: 'Nouvelle réponse',
      body: `${replyAuthorPseudo} a répondu à votre talk: "${truncatedContent}"`,
      url: `/rooms/${roomId}`,
      tag: `reply-${talkId}`
    });
  }

  // Envoyer l'email
  if (user?.email_notifications_enabled && user?.email_notify_on_reply && talkTitle && replyContent) {
    sendReplyEmailNotification(
      postAuthorId,
      replyAuthorPseudo,
      talkTitle,
      replyContent,
      talkId,
      roomId
    ).catch(err => console.error('Erreur envoi email:', err));
  }
}

/**
 * Envoie une notification de nouveau like (Push + Email + DB)
 */
export async function sendLikeNotification(
  postAuthorId: string,
  likerPseudo: string,
  postContent: string,
  talkId: string,
  roomId: string,
  talkTitle?: string
) {
  // Vérifier les préférences
  const user = await prisma.user.findUnique({
    where: { id: postAuthorId },
    select: { 
      notify_on_like: true,
      email_notifications_enabled: true,
      email_notify_on_like: true
    }
  });

  if (!user?.notify_on_like && !user?.email_notify_on_like) {
    return;
  }

  const truncatedContent = postContent.length > 50 
    ? postContent.substring(0, 50) + '...' 
    : postContent;

  // Créer la notification en DB
  await createNotificationInDB(
    postAuthorId,
    'like',
    'Nouveau like',
    `${likerPseudo} a aimé votre talk: "${truncatedContent}"`,
    `/rooms/${roomId}#${talkId}`
  );

  // Envoyer la notification push
  if (user?.notify_on_like) {
    await sendPushNotification(postAuthorId, {
      title: 'Nouveau like',
      body: `${likerPseudo} a aimé votre talk: "${truncatedContent}"`,
      url: `/rooms/${roomId}`,
      tag: `like-${talkId}`
    });
  }

  // Envoyer l'email
  if (user?.email_notifications_enabled && user?.email_notify_on_like && talkTitle) {
    sendLikeEmailNotification(
      postAuthorId,
      likerPseudo,
      talkTitle,
      talkId,
      roomId
    ).catch(err => console.error('Erreur envoi email:', err));
  }
}

/**
 * Envoie une notification de nouveau talk dans une salle suivie (Push + Email + DB)
 */
export async function sendNewPostNotification(
  userIds: string[],
  authorPseudo: string,
  roomTitle: string,
  roomId: string,
  talkTitle?: string
) {
  for (const userId of userIds) {
    // Vérifier les préférences
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        notify_on_new_post: true,
        email_notifications_enabled: true,
        email_notify_on_new_post: true
      }
    });

    if (!user?.notify_on_new_post && !user?.email_notify_on_new_post) {
      continue;
    }

    // Créer la notification en DB
    await createNotificationInDB(
      userId,
      'new_talk',
      'Nouveau talk',
      `${authorPseudo} a publié dans "${roomTitle}"`,
      `/rooms/${roomId}`
    );

    // Envoyer la notification push
    if (user?.notify_on_new_post) {
      await sendPushNotification(userId, {
        title: 'Nouveau talk',
        body: `${authorPseudo} a publié dans "${roomTitle}"`,
        url: `/rooms/${roomId}`,
        tag: `new-talk-${roomId}`
      });
    }

    // Envoyer l'email
    if (user?.email_notifications_enabled && user?.email_notify_on_new_post && talkTitle) {
      sendNewTalkEmailNotification(
        [userId],
        authorPseudo,
        roomTitle,
        talkTitle,
        roomId
      ).catch(err => console.error('Erreur envoi email:', err));
    }
  }
}
