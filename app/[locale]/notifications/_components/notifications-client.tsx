
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Bell, Check, CheckCheck, ExternalLink, Filter, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from '@/lib/i18n-context';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

export function NotificationsClient() {
  const { data: session } = useSession() || {};
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'like' | 'reply' | 'new_talk'>('all');
  const [limit, setLimit] = useState(20);

  const fetchNotifications = async () => {
    if (!session?.user) return;
    
    setIsLoading(true);
    try {
      const url = filter === 'unread' 
        ? `/api/notifications?limit=${limit}&unreadOnly=true`
        : `/api/notifications?limit=${limit}`;
      
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        // Apply client-side type filtering if needed
        if (filter !== 'all' && filter !== 'unread') {
          setNotifications(data.filter((n: Notification) => n.type === filter));
        } else {
          setNotifications(data);
        }
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: 'PATCH',
      });
      
      if (res.ok) {
        setNotifications(prev =>
          prev.map(n => (n.id === id ? { ...n, is_read: true } : n))
        );
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch('/api/notifications/read-all', {
        method: 'POST',
      });
      
      if (res.ok) {
        setNotifications(prev =>
          prev.map(n => ({ ...n, is_read: true }))
        );
      }
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [session, filter, limit]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return '❤️';
      case 'reply':
        return '💬';
      case 'new_talk':
        return '📝';
      default:
        return '🔔';
    }
  };

  const getFilterLabel = () => {
    switch (filter) {
      case 'unread':
        return 'Non lues';
      case 'like':
        return 'Likes';
      case 'reply':
        return 'Réponses';
      case 'new_talk':
        return 'Nouveaux talks';
      default:
        return 'Toutes';
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={() => router.push(`/${locale}/dashboard`)}
        className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 -ml-2"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour au tableau de bord
      </Button>

      {/* Header */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="space-y-4">
          {/* Title section */}
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6 text-amber-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-2xl">Notifications</CardTitle>
              {unreadCount > 0 && (
                <p className="text-sm text-zinc-400 mt-1">
                  {unreadCount} notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

          {/* Actions section */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Filter dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 w-full sm:w-auto"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {getFilterLabel()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                <DropdownMenuItem
                  onClick={() => setFilter('all')}
                  className={filter === 'all' ? 'bg-zinc-800' : ''}
                >
                  Toutes
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter('unread')}
                  className={filter === 'unread' ? 'bg-zinc-800' : ''}
                >
                  Non lues
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter('like')}
                  className={filter === 'like' ? 'bg-zinc-800' : ''}
                >
                  ❤️ Likes
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter('reply')}
                  className={filter === 'reply' ? 'bg-zinc-800' : ''}
                >
                  💬 Réponses
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter('new_talk')}
                  className={filter === 'new_talk' ? 'bg-zinc-800' : ''}
                >
                  📝 Nouveaux talks
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 w-full sm:w-auto sm:ml-auto"
              >
                <CheckCheck className="h-4 w-4 mr-2" />
                Tout marquer lu
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Notifications list */}
      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </div>
      ) : notifications.length === 0 ? (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Bell className="h-16 w-16 text-zinc-700 mb-4" />
            <p className="text-zinc-400 text-lg mb-2">Aucune notification</p>
            <p className="text-zinc-500 text-sm">
              {filter !== 'all' 
                ? `Aucune notification de type "${getFilterLabel()}" pour le moment.`
                : 'Vous n\'avez pas encore reçu de notifications.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all ${
                  !notification.is_read ? 'ring-1 ring-amber-500/20' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="text-3xl flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-zinc-100">
                              {notification.title}
                            </h3>
                            {!notification.is_read && (
                              <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            {notification.message}
                          </p>
                        </div>

                        {/* Type badge */}
                        <Badge
                          variant="secondary"
                          className={`${
                            notification.type === 'like'
                              ? 'bg-red-500/20 text-red-400 border-red-500/30'
                              : notification.type === 'reply'
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                              : 'bg-green-500/20 text-green-400 border-green-500/30'
                          }`}
                        >
                          {notification.type === 'like' && 'Like'}
                          {notification.type === 'reply' && 'Réponse'}
                          {notification.type === 'new_talk' && 'Nouveau'}
                        </Badge>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800">
                        <span className="text-xs text-zinc-500">
                          {formatDistanceToNow(new Date(notification.created_at), {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </span>

                        <div className="flex items-center gap-2">
                          {notification.link && (
                            <Link href={notification.link}>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 text-xs text-amber-500 hover:text-amber-400 hover:bg-amber-500/10"
                              >
                                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                                Voir
                              </Button>
                            </Link>
                          )}

                          {!notification.is_read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-8 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                            >
                              <Check className="h-3.5 w-3.5 mr-1.5" />
                              Marquer lu
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Load more button */}
          {notifications.length >= limit && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={() => setLimit(prev => prev + 20)}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                Charger plus de notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
