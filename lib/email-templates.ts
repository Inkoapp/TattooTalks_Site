
/**
 * Templates HTML pour les emails de notification
 */

interface EmailTemplateProps {
  title: string;
  body: string;
  buttonText?: string;
  buttonUrl?: string;
  previewText?: string;
}

/**
 * Template de base pour tous les emails
 */
export function getBaseEmailTemplate({
  title,
  body,
  buttonText,
  buttonUrl,
  previewText
}: EmailTemplateProps): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  ${previewText ? `<meta name="description" content="${previewText}">` : ''}
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #09090b;
      color: #e4e4e7;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      padding-bottom: 30px;
      border-bottom: 2px solid #27272a;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      background: linear-gradient(135deg, #eab308 0%, #f59e0b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 10px;
    }
    .content {
      background-color: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      padding: 32px;
      margin: 30px 0;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
      margin: 0 0 16px 0;
    }
    .body {
      font-size: 16px;
      line-height: 1.6;
      color: #a1a1aa;
      margin: 0 0 24px 0;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #eab308 0%, #f59e0b 100%);
      color: #09090b !important;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      transition: all 0.2s;
    }
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(234, 179, 8, 0.4);
    }
    .footer {
      text-align: center;
      padding-top: 30px;
      border-top: 2px solid #27272a;
      color: #71717a;
      font-size: 14px;
    }
    .footer a {
      color: #eab308;
      text-decoration: none;
    }
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #27272a, transparent);
      margin: 24px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">TattooTalks</div>
      <p style="color: #71717a; margin: 0; font-size: 14px;">La communauté du tatouage</p>
    </div>

    <!-- Content -->
    <div class="content">
      <h1 class="title">${title}</h1>
      <p class="body">${body}</p>
      
      ${buttonText && buttonUrl ? `
        <div style="text-align: center; margin-top: 32px;">
          <a href="${buttonUrl}" class="button">${buttonText}</a>
        </div>
      ` : ''}
    </div>

    <!-- Footer -->
    <div class="footer">
      <p style="margin: 0 0 8px 0;">
        Vous recevez cet email car vous êtes inscrit sur <a href="https://tattoo-talks.com">TattooTalks.com</a>
      </p>
      <p style="margin: 8px 0;">
        <a href="https://tattoo-talks.com/profile">Gérer mes préférences</a> · 
        <a href="https://tattoo-talks.com/privacy">Politique de confidentialité</a> · 
        <a href="https://tattoo-talks.com/profile">Se désabonner</a>
      </p>
      <p style="margin: 16px 0 0 0; font-size: 12px; color: #52525b;">
        TattooTalks - Plateforme communautaire pour artistes tatoueurs et passionnés<br>
        © ${new Date().getFullYear()} TattooTalks. Tous droits réservés.<br>
        Cet email a été envoyé à votre demande suite à votre inscription.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Template pour notification de nouveau like
 */
export function getNewLikeEmailTemplate(
  likerPseudo: string,
  talkTitle: string,
  talkUrl: string
): string {
  return getBaseEmailTemplate({
    title: '❤️ Nouveau like sur votre talk',
    body: `<strong>${likerPseudo}</strong> a aimé votre talk <strong>"${talkTitle}"</strong>.<br><br>Continuez à partager vos idées et expériences avec la communauté !`,
    buttonText: 'Voir le talk',
    buttonUrl: talkUrl,
    previewText: `${likerPseudo} a aimé votre talk`
  });
}

/**
 * Échappe les caractères HTML pour affichage sécurisé
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Template pour notification de nouvelle réponse
 */
export function getNewReplyEmailTemplate(
  replyAuthorPseudo: string,
  talkTitle: string,
  replyContent: string,
  talkUrl: string
): string {
  // Tronquer le contenu avant d'échapper pour avoir la bonne longueur
  const truncatedContent = replyContent.length > 150 
    ? replyContent.substring(0, 150) + '...' 
    : replyContent;
  
  // Échapper les caractères HTML spéciaux
  const safeContent = escapeHtml(truncatedContent);
  
  // Convertir les sauts de ligne en <br> pour l'affichage HTML
  const formattedContent = safeContent.replace(/\n/g, '<br>');

  return getBaseEmailTemplate({
    title: '💬 Nouvelle réponse à votre talk',
    body: `<strong>${replyAuthorPseudo}</strong> a répondu à votre talk <strong>"${talkTitle}"</strong>.<br><br><div style="background: #27272a; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 3px solid #eab308; color: #e4e4e7; line-height: 1.6;">${formattedContent}</div>`,
    buttonText: 'Voir la réponse',
    buttonUrl: talkUrl,
    previewText: `${replyAuthorPseudo} a répondu à votre talk`
  });
}

/**
 * Template pour notification de nouveau talk dans une salle
 */
export function getNewTalkEmailTemplate(
  authorPseudo: string,
  roomTitle: string,
  talkTitle: string,
  roomUrl: string
): string {
  return getBaseEmailTemplate({
    title: '✨ Nouveau talk dans une salle que vous suivez',
    body: `<strong>${authorPseudo}</strong> a publié un nouveau talk <strong>"${talkTitle}"</strong> dans <strong>${roomTitle}</strong>.<br><br>Ne manquez pas cette nouvelle discussion !`,
    buttonText: 'Voir le talk',
    buttonUrl: roomUrl,
    previewText: `Nouveau talk dans ${roomTitle}`
  });
}

/**
 * Template pour email de bienvenue
 */
export function getWelcomeEmailTemplate(pseudo: string): string {
  return getBaseEmailTemplate({
    title: `Bienvenue ${pseudo} ! 🎨`,
    body: `Bonjour ${pseudo},<br><br>Merci d'avoir rejoint TattooTalks !<br><br>Votre compte est maintenant actif. Vous pouvez dès maintenant :<br><br>• Explorer les 10 salles de discussion thématiques<br>• Partager vos réalisations et expériences<br>• Échanger avec d'autres professionnels et passionnés<br>• Personnaliser votre profil<br><br>Nous sommes heureux de vous compter parmi nous.`,
    buttonText: 'Accéder à mon compte',
    buttonUrl: 'https://tattoo-talks.com/dashboard',
    previewText: 'Votre compte TattooTalks est actif'
  });
}
