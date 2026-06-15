# 🎨 TattooTalks - Design System & Documentation Technique

> **Version**: 2.0  
> **Dernière mise à jour**: Février 2026  
> **Stack**: Next.js 14 + TypeScript + Tailwind CSS + Prisma

---

## 📋 Table des matières

1. [Architecture du projet](#architecture-du-projet)
2. [Palette de couleurs](#palette-de-couleurs)
3. [Typographie](#typographie)
4. [Composants UI](#composants-ui)
5. [Layouts](#layouts)
6. [Internationalisation (i18n)](#internationalisation-i18n)
7. [Base de données](#base-de-données)
8. [Authentification](#authentification)
9. [Stockage S3](#stockage-s3)
10. [APIs](#apis)
11. [Notifications](#notifications)
12. [Conventions de code](#conventions-de-code)

---

## 🏗️ Architecture du projet

```
tattootalks/nextjs_space/
├── app/                      # App Router (Next.js 14)
│   ├── [locale]/             # Pages localisées (fr, en, es, pt)
│   │   ├── _components/      # Composants landing page
│   │   ├── auth/             # Pages connexion/inscription
│   │   ├── contact/          # Page contact
│   │   ├── dashboard/        # Tableau de bord utilisateur
│   │   ├── privacy/          # Politique de confidentialité
│   │   ├── profile/          # Profil utilisateur
│   │   ├── rooms/            # Salles de discussion
│   │   ├── talks/            # Discussions individuelles
│   │   └── terms/            # Conditions d'utilisation
│   ├── admin/                # Interface admin (non localisée)
│   ├── api/                  # Routes API
│   └── globals.css           # Styles globaux
├── components/
│   ├── layout/               # Header, Sidebar, MainLayout
│   ├── notifications/        # Système de notifications
│   └── ui/                   # Composants Shadcn/Radix
├── lib/                      # Utilitaires et configurations
├── messages/                 # Fichiers de traduction JSON
├── prisma/                   # Schéma base de données
├── public/                   # Assets statiques
└── scripts/                  # Scripts de seed et utilitaires
```

---

## 🎨 Palette de couleurs

### Thème "Premium Molten Gold"

Le design system utilise un thème sombre premium avec des accents dorés/ambrés.

#### Couleurs de base (Backgrounds)

| Nom | Hex | Usage |
|-----|-----|-------|
| `ink-DEFAULT` | `#121212` | Fond principal (Cod Gray) |
| `ink-surface` | `#1A1A1A` | Cards, surfaces (Deep Charcoal) |
| `ink-deep` | `#0D0D0D` | Ombres profondes |

#### Accents Molten Gold

| Nom | Hex | Usage |
|-----|-----|-------|
| `molten-gold` | `#C5A059` | Or métallique (accent principal) |
| `molten-amber` | `#CC5500` | Ambre brûlé (accent secondaire) |
| `highlight` | `#FF7A00` | Orange vif (mise en évidence CTA) |

#### Couleurs de texte

| Nom | Classe Tailwind | Usage |
|-----|-----------------|-------|
| Blanc | `text-white` | Titres, texte principal |
| Gris clair | `text-zinc-400` | Texte secondaire |
| Gris moyen | `text-[#A3A3A3]` | Sous-titres, descriptions |

#### Gradients

```css
/* Gradient principal */
bg-molten-gold: linear-gradient(135deg, #C5A059 0%, #CC5500 100%)

/* Glow effect */
bg-molten-glow: radial-gradient(ellipse at center, rgba(197, 160, 89, 0.15) 0%, transparent 70%)

/* Mesh gradient premium */
bg-molten-mesh: radial-gradient(circle at 20% 50%, #C5A059 0%, transparent 50%),
                radial-gradient(circle at 80% 50%, #CC5500 0%, transparent 50%)
```

#### Shadows (Gold Glow)

```css
shadow-gold-sm: 0 2px 8px rgba(197, 160, 89, 0.15)
shadow-gold-md: 0 4px 16px rgba(197, 160, 89, 0.2)
shadow-gold-lg: 0 8px 32px rgba(197, 160, 89, 0.25)
```

---

## 🔤 Typographie

### Familles de polices

| Type | Police | Usage |
|------|--------|-------|
| Serif | `Playfair Display` | Titres éditoriaux, headlines |
| Sans-serif | `Inter` | Corps de texte, UI |
| Alternative | `Cinzel` | Titres premium optionnels |

### Échelle typographique

```css
/* Mobile */
text-3xl  → 1.875rem (30px)  /* H1 mobile */
text-lg   → 1.125rem (18px)  /* Sous-titres */
text-sm   → 0.875rem (14px)  /* Body mobile */
text-xs   → 0.75rem (12px)   /* Captions */

/* Desktop */
text-5xl  → 3rem (48px)      /* H1 desktop */
text-6xl  → 3.75rem (60px)   /* H1 large */
text-2xl  → 1.5rem (24px)    /* Sous-titres desktop */
text-xl   → 1.25rem (20px)   /* Body large */
```

### Exemple d'utilisation

```tsx
{/* Titre principal */}
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
  Rejoignez TattooTalks
</h1>

{/* Sous-titre avec highlight */}
<p className="text-lg md:text-2xl text-white">
  1ère communauté 100% <span className="text-[#FF7A00] font-bold">tatouage</span>
</p>

{/* Texte secondaire */}
<p className="text-sm md:text-base text-[#A3A3A3]">
  Téléchargez l'appli et lancez la discussion!
</p>
```

---

## 🧩 Composants UI

### Composants Shadcn/Radix disponibles

Tous les composants sont dans `/components/ui/` :

| Composant | Fichier | Description |
|-----------|---------|-------------|
| `Button` | `button.tsx` | Boutons avec variants |
| `Dialog` | `dialog.tsx` | Modales |
| `Card` | `card.tsx` | Cartes de contenu |
| `Avatar` | `avatar.tsx` | Avatars utilisateur |
| `Badge` | `badge.tsx` | Tags et indicateurs |
| `Input` | `input.tsx` | Champs de saisie |
| `Textarea` | `textarea.tsx` | Zones de texte |
| `Switch` | `switch.tsx` | Toggles |
| `Tabs` | `tabs.tsx` | Navigation par onglets |
| `Toast` | `toast.tsx` | Notifications toast |
| `Tooltip` | `tooltip.tsx` | Infobulles |

### Composants personnalisés

| Composant | Fichier | Description |
|-----------|---------|-------------|
| `S3Image` | `s3-image.tsx` | Images S3 avec loading/error |
| `S3Avatar` | `s3-avatar.tsx` | Avatars depuis S3 |
| `ImageUpload` | `image-upload.tsx` | Upload avec crop |
| `ImageCropModal` | `image-crop-modal.tsx` | Recadrage d'images |
| `ImageLightbox` | `image-lightbox.tsx` | Visionneuse plein écran |
| `ShareButton` | `share-button.tsx` | Partage social |
| `PremiumButton` | `premium-button.tsx` | Bouton avec gradient gold |

### Exemple de Button variants

```tsx
<Button variant="default">Action principale</Button>
<Button variant="secondary">Action secondaire</Button>
<Button variant="outline">Bouton outline</Button>
<Button variant="ghost">Bouton ghost</Button>
<Button variant="destructive">Supprimer</Button>
```

---

## 📐 Layouts

### MainLayout (authentifié)

```tsx
import { MainLayout } from '@/components/layout/main-layout';

export default function DashboardPage() {
  return (
    <MainLayout>
      {/* Contenu avec sidebar */}
    </MainLayout>
  );
}
```

### PublicLayout (non authentifié)

```tsx
import { PublicLayout } from '@/components/layout/public-layout';

export default function PrivacyPage() {
  return (
    <PublicLayout showBackButton backHref="/" backText="Retour">
      {/* Contenu public */}
    </PublicLayout>
  );
}
```

### Header

Le header inclut :
- Logo TattooTalks (icône seule sur mobile)
- Navigation responsive
- Sélecteur de langue
- Boutons CTA (App Store / Play Store)

---

## 🌍 Internationalisation (i18n)

### Langues supportées

| Code | Langue | Fichier |
|------|--------|--------|
| `fr` | Français | `messages/fr.json` |
| `en` | English | `messages/en.json` |
| `es` | Español | `messages/es.json` |
| `pt` | Português | `messages/pt.json` |

### Structure des traductions

```json
{
  "landing": {
    "hero": {
      "title": "Rejoignez TattooTalks",
      "subtitle1": "1ère communauté 100%",
      "subtitleHighlight": "tatouage",
      "cta1": "Téléchargez",
      "cta2": "l'appli et lancez la discussion!"
    },
    "cta": {
      "appStore": {
        "title": "App Store",
        "subtitle": "Télécharger sur"
      },
      "playStore": {
        "title": "Google Play",
        "subtitle": "Disponible sur"
      }
    }
  }
}
```

### Utilisation dans les composants

```tsx
import { useTranslations } from '@/lib/i18n-context';

export function HeroSection() {
  const t = useTranslations('landing');
  
  return (
    <h1>{t('hero.title')}</h1>
  );
}
```

### Configuration middleware

Le middleware (`middleware.ts`) gère la redirection automatique vers la locale de l'utilisateur.

---

## 🗄️ Base de données

### Prisma Schema (modèles principaux)

```prisma
model User {
  id                  String   @id @default(cuid())
  email               String   @unique
  pseudo              String   @unique
  password_hash       String
  avatar_url          String?
  is_admin            Boolean  @default(false)
  created_at          DateTime @default(now())
  
  // Préférences notifications
  email_notifications_enabled  Boolean @default(true)
  push_notifications_enabled   Boolean @default(true)
}

model Room {
  id          String   @id @default(cuid())
  name        String
  description String?
  cover_image String?
  talks       Talk[]
}

model Talk {
  id          String    @id @default(cuid())
  title       String
  content     String
  image_url   String?
  user        User      @relation(...)
  room        Room      @relation(...)
  messages    Message[]
  likes       Like[]
  likes_count Int       @default(0)
}

model Message {
  id          String   @id @default(cuid())
  content     String
  user        User     @relation(...)
  talk        Talk     @relation(...)
  likes       Like[]
  likes_count Int      @default(0)
}
```

### Commandes Prisma

```bash
# Générer le client
yarn prisma generate

# Appliquer les migrations
yarn prisma db push

# Ouvrir Prisma Studio
yarn prisma studio

# Seed la base de données
yarn prisma db seed
```

---

## 🔐 Authentification

### NextAuth.js Configuration

Fichier : `lib/auth-options.ts`

```typescript
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // Email + Password
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      // Ajoute pseudo, is_admin, avatar_url au token
    },
    session({ session, token }) {
      // Transfère les données du token à la session
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  }
};
```

### Types étendus

Fichier : `types/next-auth.d.ts`

```typescript
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      pseudo: string;
      is_admin: boolean;
      avatar_url?: string;
    }
  }
}
```

### Utilisation

```tsx
// Client-side
import { useSession } from 'next-auth/react';
const { data: session } = useSession();

// Server-side (API routes)
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
const session = await getServerSession(authOptions);
```

---

## ☁️ Stockage S3

### Configuration AWS

Fichier : `lib/aws-config.ts`

```typescript
import { S3Client } from '@aws-sdk/client-s3';

export function createS3Client() {
  return new S3Client({});
}

export function getBucketConfig() {
  return {
    bucketName: process.env.AWS_BUCKET_NAME,
    folderPrefix: process.env.AWS_FOLDER_PREFIX
  };
}
```

### Fonctions S3

Fichier : `lib/s3.ts`

| Fonction | Description |
|----------|-------------|
| `uploadFile(buffer, key)` | Upload un fichier |
| `downloadFile(key)` | Génère une signed URL (1h) |
| `deleteFile(key)` | Supprime un fichier |
| `generatePresignedUploadUrl()` | URL pour upload direct |

### Variables d'environnement

```env
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=eu-west-3
AWS_BUCKET_NAME=tattootalks-uploads
AWS_FOLDER_PREFIX=prod/
```

---

## 🔌 APIs

### Routes principales

| Route | Méthode | Description |
|-------|---------|-------------|
| `/api/auth/[...nextauth]` | * | Authentification NextAuth |
| `/api/signup` | POST | Inscription (désactivé) |
| `/api/contact` | GET, POST | Messages de contact |
| `/api/rooms` | GET | Liste des salles |
| `/api/rooms/[id]` | GET | Détails d'une salle |
| `/api/rooms/[id]/talks` | GET, POST | Talks d'une salle |
| `/api/talks/[id]` | GET, PUT, DELETE | Gestion d'un talk |
| `/api/talks/[id]/like` | POST | Like/unlike un talk |
| `/api/talks/[id]/messages` | GET, POST | Messages d'un talk |
| `/api/upload` | POST | Upload d'images |
| `/api/images/[key]` | GET | Redirection vers S3 |
| `/api/users/preferences` | GET, PUT | Préférences utilisateur |
| `/api/notifications` | GET | Liste des notifications |

### Routes Admin

| Route | Méthode | Description |
|-------|---------|-------------|
| `/api/admin/auth` | POST | Connexion admin |
| `/api/admin/stats` | GET | Statistiques |
| `/api/admin/users` | GET | Liste utilisateurs |
| `/api/admin/talks` | GET | Liste des talks |

---

## 🔔 Notifications

### Types de notifications

1. **Push notifications** (navigateur)
2. **Email notifications** (via Resend)
3. **In-app notifications** (base de données)

### Préférences utilisateur

```typescript
interface NotificationPreferences {
  email_notifications_enabled: boolean;
  push_notifications_enabled: boolean;
  notify_on_like: boolean;
  notify_on_reply: boolean;
  notify_on_new_talk: boolean;
}
```

### Templates email

Fichier : `lib/email-templates.ts`

- `welcomeEmail()` - Email de bienvenue
- `likeNotificationEmail()` - Notification de like
- `replyNotificationEmail()` - Notification de réponse
- `newTalkNotificationEmail()` - Nouveau talk dans une salle

---

## 📝 Conventions de code

### Structure des composants

```tsx
'use client'; // Si composant client

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// ... autres imports

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export function Component({ title, onAction }: ComponentProps) {
  const [state, setState] = useState(false);
  
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

### Conventions de nommage

| Type | Convention | Exemple |
|------|------------|--------|
| Composants | PascalCase | `HeroSection.tsx` |
| Fichiers pages | kebab-case | `sign-in/page.tsx` |
| Hooks | camelCase avec "use" | `useToast.ts` |
| Utils | camelCase | `formatDate.ts` |
| Types/Interfaces | PascalCase | `UserProfile` |
| Variables env | SCREAMING_SNAKE | `DATABASE_URL` |

### Classes Tailwind (ordre recommandé)

```tsx
className="
  {/* Layout */}
  flex flex-col items-center justify-center
  {/* Dimensions */}
  w-full h-screen max-w-7xl
  {/* Spacing */}
  px-4 py-8 gap-4
  {/* Background */}
  bg-[#121212]
  {/* Border */}
  border border-white/10 rounded-xl
  {/* Typography */}
  text-white text-lg font-bold
  {/* Effects */}
  shadow-gold-md backdrop-blur-sm
  {/* Transitions */}
  transition-all duration-300
  {/* Responsive */}
  md:flex-row md:px-8 lg:px-12
"
```

---

## 🚀 Commandes utiles

```bash
# Développement
yarn dev

# Build production
yarn build

# Linting
yarn lint

# Base de données
yarn prisma studio
yarn prisma db push
yarn prisma db seed

# Scripts personnalisés
yarn tsx scripts/seed.ts
yarn tsx scripts/populate-talks.ts
yarn tsx scripts/test-email-templates.ts
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Taille | Usage |
|------------|--------|-------|
| `sm` | 640px | Petits mobiles → grands mobiles |
| `md` | 768px | Tablettes |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Grand desktop |
| `2xl` | 1536px | Très grand écran |

### Pattern mobile-first

```tsx
{/* Mobile par défaut, desktop avec md: */}
<div className="px-4 md:px-8 lg:px-12">
  <h1 className="text-3xl md:text-5xl lg:text-6xl">
    Titre
  </h1>
</div>
```

---

## 📦 Dépendances principales

| Package | Version | Usage |
|---------|---------|-------|
| `next` | 14.2.28 | Framework React |
| `react` | 18.2.0 | UI Library |
| `typescript` | 5.2.2 | Typage |
| `tailwindcss` | 3.3.3 | Styling |
| `prisma` | 6.7.0 | ORM Database |
| `next-auth` | 4.24.11 | Authentification |
| `framer-motion` | 10.18.0 | Animations |
| `lucide-react` | 0.446.0 | Icônes |
| `@radix-ui/*` | various | Composants UI |
| `next-intl` | - | i18n (via custom context) |

---

## 🔗 Liens utiles

- **Production**: [tattoo-talks.com](https://tattoo-talks.com)
- **App Store**: [TattooTalks iOS](https://apps.apple.com/fr/app/tattootalks/id6756529301)
- **Play Store**: [TattooTalks Android](https://play.google.com/store/apps/details?id=com.tattoo.talks)

---

*Documentation générée pour TattooTalks - Février 2026*
