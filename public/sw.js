
// Service Worker pour les notifications push de TattooTalks
const CACHE_NAME = 'tattootalks-v1';

// Installation du service worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installation');
  self.skipWaiting();
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activation');
  event.waitUntil(
    self.clients.claim()
  );
});

// Gestion des notifications push
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push reçu');
  
  let data = {
    title: 'TattooTalks',
    body: 'Nouvelle notification',
    icon: '/logo.png',
    badge: '/favicon.png',
    data: {
      url: '/dashboard'
    }
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.error('[Service Worker] Erreur de parsing JSON:', e);
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/logo.png',
    badge: data.badge || '/favicon.png',
    data: data.data || { url: '/dashboard' },
    tag: data.tag || 'default',
    requireInteraction: data.requireInteraction || false,
    vibrate: [200, 100, 200],
    actions: data.actions || []
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Gestion du clic sur la notification
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Clic sur notification');
  
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/dashboard';

  event.waitUntil(
    self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList) => {
      // Chercher une fenêtre ouverte de l'application
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.focus();
          client.navigate(urlToOpen);
          return;
        }
      }
      
      // Si aucune fenêtre n'est ouverte, en ouvrir une nouvelle
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});

// Gestion de la fermeture de la notification
self.addEventListener('notificationclose', (event) => {
  console.log('[Service Worker] Notification fermée');
});

// Gestion des messages du client
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Message reçu:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
