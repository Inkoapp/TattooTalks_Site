
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Bell, BellOff } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export function NotificationManager() {
  const { data: session } = useSession() || {};
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Vérifier si les notifications push sont supportées
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  useEffect(() => {
    if (registration && session?.user) {
      checkSubscription();
    }
  }, [registration, session]);

  const registerServiceWorker = async () => {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker enregistré:', reg);
      setRegistration(reg);

      // Attendre que le service worker soit prêt
      await navigator.serviceWorker.ready;
    } catch (error) {
      console.error('Erreur d\'enregistrement du Service Worker:', error);
    }
  };

  const checkSubscription = async () => {
    if (!registration) return;

    try {
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error('Erreur de vérification de l\'abonnement:', error);
    }
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribeToPush = async () => {
    if (!registration || !session?.user) return;

    setIsLoading(true);

    try {
      // Demander la permission
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        toast.error('Permission de notification refusée');
        setIsLoading(false);
        return;
      }

      // Récupérer la clé VAPID publique depuis l'API
      const vapidResponse = await fetch('/api/push/vapid-key');
      if (!vapidResponse.ok) {
        throw new Error('Impossible de récupérer la clé VAPID');
      }
      
      const { publicKey: vapidPublicKey } = await vapidResponse.json();
      if (!vapidPublicKey) {
        throw new Error('Clé VAPID publique manquante');
      }

      // Créer un abonnement push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });

      // Enregistrer l'abonnement sur le serveur
      const response = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          userAgent: navigator.userAgent
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Échec de l\'enregistrement de l\'abonnement');
      }

      setIsSubscribed(true);
      toast.success('Notifications activées avec succès ! 🔔');
    } catch (error) {
      console.error('Erreur d\'abonnement push:', error);
      toast.error('Erreur lors de l\'activation des notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribeFromPush = async () => {
    if (!registration) return;

    setIsLoading(true);

    try {
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        // Désabonner le client
        await subscription.unsubscribe();

        // Notifier le serveur
        await fetch('/api/push/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            endpoint: subscription.endpoint
          })
        });

        setIsSubscribed(false);
        toast.success('Notifications désactivées');
      }
    } catch (error) {
      console.error('Erreur de désabonnement push:', error);
      toast.error('Erreur lors de la désactivation des notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async () => {
    if (isLoading) return;
    
    if (isSubscribed) {
      await unsubscribeFromPush();
    } else {
      await subscribeToPush();
    }
  };

  if (!session?.user || !isSupported) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-black/20 border border-white/10 backdrop-blur-sm hover:bg-black/30 transition-all duration-300 group">
      <div className="flex items-center gap-2.5">
        <div className={`
          p-1.5 rounded-md transition-all duration-300
          ${isSubscribed 
            ? 'bg-gradient-to-br from-yellow-500/20 to-amber-600/20 text-yellow-500' 
            : 'bg-zinc-800/50 text-zinc-400'
          }
        `}>
          {isSubscribed ? (
            <Bell className="h-4 w-4" />
          ) : (
            <BellOff className="h-4 w-4" />
          )}
        </div>
        <div className="flex flex-col">
          <span className={`
            text-sm font-medium transition-colors duration-300
            ${isSubscribed ? 'text-white' : 'text-zinc-300'}
          `}>
            Notifications
          </span>
          <span className="text-xs text-zinc-500">
            {isSubscribed ? 'Activées' : 'Désactivées'}
          </span>
        </div>
      </div>
      
      <Switch
        checked={isSubscribed}
        onCheckedChange={handleToggle}
        disabled={isLoading}
        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-yellow-500 data-[state=checked]:to-amber-600"
      />
    </div>
  );
}
