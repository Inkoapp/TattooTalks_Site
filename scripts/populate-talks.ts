
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

// Charger les variables d'environnement
dotenv.config()

const prisma = new PrismaClient()

// Contenu des talks pour chaque room (4 talks par room)
const talksByRoom = {
  'Inspirations & Styles': [
    {
      title: 'Transition du traditionnel vers le néo-traditionnel',
      content: 'Salut à tous ! Je travaille principalement en style traditionnel américain depuis 5 ans, et je voudrais évoluer vers le néo-traditionnel. Quelqu\'un a déjà fait cette transition ? Quels sont les principaux défis techniques ? J\'aimerais des conseils sur la gestion des dégradés et des volumes plus complexes. Merci !',
      tags: ['neo-traditional', 'traditional', 'evolution', 'techniques'],
    },
    {
      title: 'Recherche références pour mandala géométrique',
      content: 'Je prépare un projet de mandala géométrique pour un client, style dotwork avec des patterns très précis. Est-ce que vous avez des artistes références à me conseiller ? Je cherche particulièrement des inspirations qui mélangent géométrie sacrée et motifs organiques. Des livres ou comptes Insta à suivre ?',
      tags: ['mandala', 'dotwork', 'geometry', 'references'],
    },
    {
      title: 'Le blackwork est-il toujours tendance en 2025 ?',
      content: 'Question ouverte : vous trouvez que le blackwork est toujours aussi demandé qu\'il y a 3-4 ans ? Dans mon studio, je vois de plus en plus de demandes pour du micro-réalisme et du fine-line. Le blackwork massif semble moins populaire... C\'est juste moi ou c\'est une tendance générale ?',
      tags: ['blackwork', 'trends', 'styles', 'discussion'],
    },
    {
      title: 'Tatouage japonais : respecter la tradition ou innover ?',
      content: 'Débat intéressant avec un collègue hier : jusqu\'où peut-on aller dans la réinterprétation du tatouage japonais traditionnel ? J\'adore le style Irezumi classique, mais je vois de plus en plus d\'artistes qui modernisent les codes (couleurs non traditionnelles, compositions asymétriques...). Vous en pensez quoi ? Respecter strictement les règles ou laisser place à la créativité ?',
      tags: ['japanese', 'irezumi', 'tradition', 'innovation'],
    },
  ],
  
  'Matériel & Techniques': [
    {
      title: 'Quelle machine pour débuter le réalisme noir et gris ?',
      content: 'Je suis tatoueur depuis 2 ans, principalement en traditionnel et old school. Je veux me lancer dans le réalisme noir et gris, mais ma machine rotative actuelle ne me donne pas la précision que je veux pour les dégradés fins. Budget autour de 400-500€. Des recommandations ? Rotative ou bobine pour ce style ?',
      tags: ['machines', 'realism', 'black-and-grey', 'equipment'],
    },
    {
      title: 'Retour d\'expérience : encres Dynamic vs Intenze',
      content: 'Après 6 mois d\'utilisation des Dynamic Triple Black, je suis revenu aux Intenze Zuper Black. Quelqu\'un a remarqué que les Dynamic ont tendance à virer un peu bleuté sur certaines peaux après cicatrisation ? Ou c\'est juste moi qui n\'ai pas trouvé la bonne dilution ? J\'aimerais vos retours !',
      tags: ['ink', 'dynamic', 'intenze', 'feedback'],
    },
    {
      title: 'Cartouches vs aiguilles traditionnelles : le grand débat',
      content: 'Studio qui passe aux cartouches exclusivement pour des raisons de praticité et d\'hygiène. Mais honnêtement, je trouve que je perds un peu en feeling, surtout pour le lining fin. Est-ce que c\'est une question d\'habitude ou il y a vraiment une différence de rendu ? Vos avis ?',
      tags: ['cartridges', 'needles', 'techniques', 'debate'],
    },
    {
      title: 'Technique de packing pour du solid black : vos conseils',
      content: 'Je galère un peu sur les grandes surfaces en solid black (genre blackout ou blackwork massif). J\'ai l\'impression de devoir repasser 3-4 fois pour avoir un noir vraiment dense et uniforme. Vous utilisez quelle technique de packing ? Quelle configuration d\'aiguilles ? (Magnum, stacked magnum ?) Des tips pour éviter les traces ?',
      tags: ['packing', 'solid-black', 'blackout', 'technique'],
    },
  ],

  'Portfolios & Feedback': [
    {
      title: 'Premier tatouage réaliste : vos critiques constructives ?',
      content: 'Voilà mon premier portrait réaliste finalisé. C\'est un projet perso sur moi-même pour tester avant de le proposer aux clients. Je sais que les ombres sous le nez sont un peu trop foncées... Qu\'est-ce que vous en pensez ? Tous les retours sont les bienvenus, même (surtout !) les critiques !',
      tags: ['realism', 'portrait', 'feedback', 'first-work'],
    },
    {
      title: 'Mon style blackwork/dotwork après 3 ans de pratique',
      content: 'Salut la commu ! Ça fait maintenant 3 ans que je tatoue principalement en blackwork et dotwork. J\'ai l\'impression de stagner un peu niveau créativité... Est-ce que vous avez des conseils pour sortir de ma zone de confort et évoluer ? Je partage quelques pièces récentes pour avoir vos retours sur mon style actuel.',
      tags: ['blackwork', 'dotwork', 'portfolio', 'evolution'],
    },
    {
      title: 'Flash sheet géométrique : avis avant impression',
      content: 'J\'ai designé une série de flash géométriques pour une convention le mois prochain. Avant de les imprimer, j\'aimerais vos retours ! Est-ce que les compositions sont équilibrées ? Les tailles sont adaptées pour différentes zones du corps ? Merci pour vos yeux experts !',
      tags: ['flash', 'geometry', 'design', 'convention'],
    },
    {
      title: 'Comment photographier correctement ses tatouages ?',
      content: 'Question pratique : vous utilisez quoi comme setup pour photographier vos créations ? J\'ai toujours du mal à avoir un rendu fidèle aux couleurs et aux contrastes. Lumière naturelle ? Ring light ? Vous éditez beaucoup les photos après ou vous essayez d\'avoir un rendu brut fidèle ? Des tips pour un rendu pro sans trop de matos ?',
      tags: ['photography', 'portfolio', 'tips', 'documentation'],
    },
  ],

  'Apprentis & Formations': [
    {
      title: 'Comment trouver un apprentissage sérieux en 2025 ?',
      content: 'Salut ! Je dessine depuis 10 ans, j\'ai un book bien fourni, et je cherche désespérément un apprentissage. J\'ai contacté une quinzaine de studios dans ma région... Soit pas de réponse, soit on me propose de "payer" 5000€ pour la formation. C\'est normal ? Comment vous avez trouvé votre apprentissage à vous ?',
      tags: ['apprentice', 'learning', 'advice', 'career'],
    },
    {
      title: 'Erreurs classiques des débutants à éviter absolument',
      content: 'Pour les nouveaux tatoueurs ou ceux en apprentissage : quelles sont les erreurs que vous avez faites au début et que vous auriez aimé éviter ? Je commence dans 2 semaines et je veux apprendre de vos expériences ! (Technique, relation client, hygiène, business...)',
      tags: ['beginner', 'mistakes', 'advice', 'learning'],
    },
    {
      title: 'Faut-il absolument savoir dessiner pour tatouer ?',
      content: 'Débat récurrent : est-ce qu\'on peut devenir bon tatoueur sans être un dessinateur hors pair ? J\'ai un pote qui dessine incroyablement bien mais galère en tatouage, et inversement j\'en connais qui sont moyens en dessin mais excellents en application. La technique du tatouage est-elle vraiment liée au dessin ? Vos expériences ?',
      tags: ['drawing', 'skills', 'debate', 'learning'],
    },
    {
      title: 'Combien de temps avant de tatouer seul des clients ?',
      content: 'Je suis en apprentissage depuis 8 mois. Mon mentor me laisse maintenant faire des pièces simples (petits textes, fine-line basique) sous supervision. Combien de temps ça vous a pris avant de vous sentir à l\'aise pour gérer des clients seul, sans que votre mentor soit dans la pièce ? Je veux pas brûler les étapes mais je sens que je progresse bien.',
      tags: ['apprentice', 'timeline', 'independence', 'progress'],
    },
  ],

  'Hygiène & Sécurité': [
    {
      title: 'Nouvelle réglementation hygiène 2025 : qui est à jour ?',
      content: 'Avec les nouvelles normes européennes qui entrent en vigueur cette année, vous avez tous mis à jour vos protocoles ? Notamment sur la traçabilité des encres et le registre de stérilisation. Mon ARS locale est hyper stricte, j\'ai eu un contrôle la semaine dernière... Vos retours d\'expérience ?',
      tags: ['regulations', 'hygiene', 'compliance', 'law'],
    },
    {
      title: 'Autoclave : quelle marque est vraiment fiable ?',
      content: 'Mon autoclave commence à montrer des signes de faiblesse après 7 ans de service. Je dois investir dans un nouveau. Vous me conseillez quoi comme marque ? J\'hésite entre Statim et Melag... Budget max 3000€. L\'important c\'est la fiabilité et la facilité de maintenance. Vos expériences ?',
      tags: ['autoclave', 'equipment', 'sterilization', 'investment'],
    },
    {
      title: 'Gestion des déchets DASRI : vos solutions ?',
      content: 'Question pratique : vous utilisez quelle société pour la collecte des déchets DASRI (déchets médicaux) ? Les tarifs varient énormément d\'un prestataire à l\'autre et je trouve que je paie trop cher actuellement. Des recommandations pour un bon rapport qualité/prix ?',
      tags: ['waste', 'DASRI', 'safety', 'regulations'],
    },
    {
      title: 'Réaction allergique à l\'encre rouge : protocole ?',
      content: 'Situation délicate hier : un client a fait une réaction allergique 2h après la séance (tatouage avec du rouge). Rougeur excessive, gonflement, démangeaisons intenses. J\'ai direct envoyé chez le médecin qui a prescrit des antihistaminiques. Comment vous gérez ce genre de situation ? Y a-t-il un protocole préventif (patch test sur encres rouges/jaunes) ?',
      tags: ['allergies', 'red-ink', 'safety', 'protocol'],
    },
  ],

  'Guest Spots & Collaborations': [
    {
      title: 'Cherche guest spot Europe - Été 2025',
      content: 'Salut ! Je suis tatoueur spécialisé en blackwork/ornamental, basé à Lyon. Je cherche des guest spots pour cet été (juin-juillet-août) en Europe. Idéalement Espagne, Portugal ou Italie. Si vous avez des places dispo dans vos studios ou des recommandations, je suis preneur ! Portfolio dispo sur demande.',
      tags: ['guest-spot', 'summer', 'europe', 'blackwork'],
    },
    {
      title: 'Studio à Berlin cherche artiste réalisme noir et gris',
      content: 'Notre studio à Berlin (Kreuzberg) recherche un.e artiste spécialisé.e en réalisme noir et gris pour un guest spot de 2 semaines en avril. Studio bien établi, clientèle internationale, très bonne ambiance. On fournit le logement. Contactez-moi en DM si intéressé ! 🇩🇪',
      tags: ['berlin', 'guest-spot', 'realism', 'opportunity'],
    },
    {
      title: 'Collaboration flash day : retour d\'expérience',
      content: 'On a organisé un flash day collaboratif avec 4 tatoueurs de styles différents le week-end dernier. Ambiance de folie, 38 tatouages en 2 jours ! Par contre niveau organisation c\'était un peu le bordel... Pour ceux qui ont déjà fait ça, vous avez des tips pour mieux gérer les plannings et éviter les temps morts ?',
      tags: ['flash-day', 'collaboration', 'event', 'organization'],
    },
    {
      title: 'Projet collaboratif bodysuit japonais : cherche partenaire',
      content: 'Je travaille actuellement sur un bodysuit japonais full back + sleeves. Le client veut que la partie torse/ventre soit faite par un autre artiste spécialisé en noir et gris pour créer un contraste. Si quelqu\'un est intéressé par ce type de collab sur Paris, contactez-moi ! Projet sur 2-3 ans minimum.',
      tags: ['collaboration', 'bodysuit', 'japanese', 'long-term'],
    },
  ],

  'Business & Marketing': [
    {
      title: 'Instagram : comment booster sa visibilité en 2025 ?',
      content: 'Sérieusement, l\'algorithme Instagram devient de plus en plus compliqué... Je poste régulièrement (3-4 fois/semaine), j\'utilise les bons hashtags, je fais des reels... Mais ma portée est ridicule comparée à avant. Vous avez trouvé des techniques qui marchent vraiment en 2025 ? Reels vs posts ? Stories ? Collaborations ?',
      tags: ['instagram', 'marketing', 'social-media', 'algorithm'],
    },
    {
      title: 'Tarification : augmentation ou stagnation ?',
      content: 'Question délicate : comment vous gérez l\'augmentation de vos tarifs ? Avec l\'inflation, le coût du matériel qui augmente, je réfléchis à passer de 120€/h à 150€/h... Mais j\'ai peur de perdre des clients. Vous augmentez régulièrement vos prix ? Comment vous communiquez ça à votre clientèle existante ?',
      tags: ['pricing', 'business', 'strategy', 'inflation'],
    },
    {
      title: 'Gestion des no-show et des annulations de dernière minute',
      content: 'Problème récurrent : les clients qui annulent à la dernière minute ou pire, qui ne viennent pas du tout sans prévenir. J\'ai mis en place un système d\'acompte de 50€ non remboursable, mais certains s\'en fichent complètement. Comment vous gérez ça ? Acomptes plus élevés ? Blacklist ? Relances automatiques ?',
      tags: ['no-show', 'business', 'booking', 'management'],
    },
    {
      title: 'Ouvrir son propre studio : budget réaliste ?',
      content: 'Je tatoue depuis 6 ans en tant que résident dans différents studios. Je commence à réfléchir sérieusement à ouvrir mon propre espace. Pour ceux qui ont franchi le pas : quel budget total faut-il prévoir ? (Loyer, travaux, matos, assurances, charges...) Et combien de temps avant d\'être rentable ? Je suis sur Lyon, marché plutôt saturé...',
      tags: ['studio', 'business', 'investment', 'entrepreneurship'],
    },
  ],

  'Événements & Conventions': [
    {
      title: 'Mondial du Tatouage Paris 2025 : qui y va ?',
      content: 'Le Mondial du Tatouage à Paris revient en mars ! Qui a prévu d\'y aller, que ce soit en tant qu\'exposant ou visiteur ? C\'est toujours un super moment pour networker et découvrir les nouveaux talents. Des gens intéressés pour organiser un meetup TattooTalks sur place ? 🇫🇷',
      tags: ['convention', 'paris', 'event', 'meetup'],
    },
    {
      title: 'Première convention en tant qu\'exposant : conseils ?',
      content: 'Je vais faire ma première convention en tant qu\'artiste invité le mois prochain (convention régionale, environ 80 artistes). Je stresse un peu... Qu\'est-ce que je dois absolument prévoir ? Flash sheets prêts ? Combien de flash minimum ? Comment gérer les walk-ins ? Des tips pour les premiers ?',
      tags: ['convention', 'first-time', 'advice', 'preparation'],
    },
    {
      title: 'Retour sur la London Tattoo Convention 2025',
      content: 'Je reviens de la London Tattoo Convention, c\'était absolument incroyable ! Le niveau des artistes était insane, surtout du côté des Japonais et des réalistes. Mention spéciale au stand de [nom], ses bodysuits étaient à tomber. Qui d\'autre y était ? On échange nos impressions ?',
      tags: ['london', 'convention', 'review', 'experience'],
    },
    {
      title: 'Organiser sa propre convention locale : viable ?',
      content: 'Idée un peu folle : avec quelques collègues, on réfléchit à organiser une petite convention locale (40-50 artistes max) dans notre région qui n\'a aucun événement tattoo. Budget estimé à 15-20k€. Des gens ici ont déjà organisé des conventions ? C\'est rentable ? Quels sont les pièges à éviter absolument ?',
      tags: ['organization', 'convention', 'entrepreneurship', 'local'],
    },
  ],

  'TattooTalks Café': [
    {
      title: 'Quelle musique dans votre studio pendant les sessions ?',
      content: 'Petite question fun : qu\'est-ce que vous écoutez pendant que vous tatouez ? Perso je suis plutôt metal/rock, mais j\'adapte en fonction du client. Certains veulent du silence absolu, d\'autres veulent discuter pendant 3h non-stop... Et vous, vous avez une playlist signature ? Ou vous laissez le client choisir ?',
      tags: ['music', 'atmosphere', 'lifestyle', 'fun'],
    },
    {
      title: 'Le tatouage le plus bizarre qu\'on vous ait demandé ?',
      content: 'Allez, on se détend avec des anecdotes ! Quel est le tatouage le plus WTF qu\'on vous ait demandé de faire ? (Sans jugement, bien sûr !) Perso j\'ai eu une demande pour tatouer le visage de son ex... sur sa fesse gauche. J\'ai poliment décliné. Vos histoires les plus folles ?',
      tags: ['anecdotes', 'funny', 'stories', 'clients'],
    },
    {
      title: 'Tatoueurs et vie de couple : comment gérer ?',
      content: 'Question perso mais je pense que beaucoup se reconnaîtront : comment vous gérez vie pro/vie perso ? Les horaires décalés, les conventions le week-end, la fatigue... Mon conjoint commence à me faire comprendre que je suis "marié avec mon taf". Vous avez trouvé un équilibre ? Des conseils ?',
      tags: ['lifestyle', 'work-life-balance', 'relationships', 'personal'],
    },
    {
      title: 'Film/série préféré sur le monde du tatouage ?',
      content: 'Soirée Netflix : vous me conseillez quoi comme film ou série sur le tatouage ? J\'ai déjà regardé Ink Master (un peu trop drama à mon goût) et quelques docs. Y a des trucs bien niveau cinéma ou séries qui représentent correctement notre métier ? Ou au contraire, des trucs tellement nuls que c\'en est drôle ?',
      tags: ['movies', 'series', 'entertainment', 'culture'],
    },
  ],

  'Conseils Clients & Couvertures': [
    {
      title: 'Client qui veut une couverture mais le tattoo est trop dark',
      content: 'Situation classique : client avec un tribal bien noir, bien dense, sur l\'avant-bras. Il veut absolument le couvrir avec... un mandala délicat en fine-line. Je lui ai expliqué que c\'est techniquement impossible sans laser, mais il insiste. Comment vous gérez ce genre de clients qui ont des attentes irréalistes ?',
      tags: ['cover-up', 'expectations', 'clients', 'advice'],
    },
    {
      title: 'Refuser un client : comment le dire poliment ?',
      content: 'Vous faites comment quand un projet ne vous inspire vraiment pas, ou que vous sentez que ça va pas coller avec le client ? Je déteste refuser des gens, mais parfois c\'est mieux pour tout le monde... Vous avez des phrases types pour refuser poliment sans vexer ? Ou vous acceptez tout ?',
      tags: ['clients', 'boundaries', 'communication', 'advice'],
    },
    {
      title: 'Retouches après cicatrisation : politique du studio ?',
      content: 'Question importante : quelle est votre politique concernant les retouches ? Perso je propose une retouche gratuite dans les 3 mois suivant le tatouage si besoin (défaut de cicatrisation, petite zone moins dense, etc.). Mais récemment un client est revenu après 1 an en demandant une retouche gratuite... Votre politique ?',
      tags: ['touch-ups', 'policy', 'warranty', 'business'],
    },
    {
      title: 'Client qui veut modifier le design au dernier moment',
      content: 'Scène d\'hier : client arrive pour sa session, on avait validé le design il y a 2 semaines, j\'ai passé 4h à préparer le stencil et les couleurs... Et là il me dit "finalement je veux changer complètement le thème". Comment vous réagissez ? Vous refaites tout ? Vous annulez ? Vous facturez le design initial ?',
      tags: ['clients', 'design', 'changes', 'management'],
    },
  ],
}

async function main() {
  console.log('🚀 Starting talk population...')

  try {
    // Récupérer tous les utilisateurs
    const users = await prisma.user.findMany()
    
    if (users.length === 0) {
      console.error('❌ No users found. Please run seed script first.')
      return
    }

    console.log(`✅ Found ${users.length} users`)

    // Récupérer toutes les rooms
    const rooms = await prisma.room.findMany()
    
    if (rooms.length === 0) {
      console.error('❌ No rooms found. Please run seed script first.')
      return
    }

    console.log(`✅ Found ${rooms.length} rooms`)

    let totalTalksCreated = 0

    // Pour chaque room, créer les talks correspondants
    for (const room of rooms) {
      const talks = talksByRoom[room.title as keyof typeof talksByRoom]
      
      if (!talks) {
        console.log(`⚠️  No talks defined for room: ${room.title}`)
        continue
      }

      console.log(`\n📝 Creating talks for room: ${room.icon} ${room.title}`)

      for (const talkData of talks) {
        // Sélectionner un utilisateur aléatoire
        const randomUser = users[Math.floor(Math.random() * users.length)]

        try {
          await prisma.talk.create({
            data: {
              title: talkData.title,
              content: talkData.content,
              tags: talkData.tags,
              room_id: room.id,
              user_id: randomUser.id,
              likes_count: Math.floor(Math.random() * 15), // Entre 0 et 15 likes
            },
          })

          totalTalksCreated++
          console.log(`  ✅ Created: "${talkData.title}"`)
        } catch (error) {
          console.error(`  ❌ Error creating talk "${talkData.title}":`, error)
        }
      }
    }

    console.log(`\n✨ Successfully created ${totalTalksCreated} talks across ${rooms.length} rooms!`)
    console.log('🎉 Talk population complete!')

  } catch (error) {
    console.error('❌ Error during talk population:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
