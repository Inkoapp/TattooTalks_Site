
'use client';

import { useEffect, useState } from 'react';
import { Bell, MessageSquare, Heart, Sparkles, Loader2, Mail, BellRing } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useTranslations } from '@/lib/i18n-context';

interface NotificationPreferences {
  // Push notifications
  notifications_enabled: boolean;
  notify_on_reply: boolean;
  notify_on_like: boolean;
  notify_on_new_post: boolean;
  // Email notifications
  email_notifications_enabled: boolean;
  email_notify_on_reply: boolean;
  email_notify_on_like: boolean;
  email_notify_on_new_post: boolean;
}

export function NotificationPreferences() {
  const t = useTranslations()
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    notifications_enabled: true,
    notify_on_reply: true,
    notify_on_like: true,
    notify_on_new_post: true,
    email_notifications_enabled: true,
    email_notify_on_reply: true,
    email_notify_on_like: true,
    email_notify_on_new_post: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const response = await fetch('/api/users/preferences');
      if (response.ok) {
        const data = await response.json();
        setPreferences(data);
      }
    } catch (error) {
      console.error(t('notifications.loadingPreferences'), error);
      toast.error(t('notifications.loadingPreferences'));
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = async (key: keyof NotificationPreferences, value: boolean) => {
    setSaving(true);
    try {
      const updatedPreferences = { ...preferences, [key]: value };
      setPreferences(updatedPreferences);

      const response = await fetch('/api/users/preferences', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [key]: value }),
      });

      if (!response.ok) {
        throw new Error(t('notifications.updateFailed'));
      }

      toast.success(t('notifications.preferenceUpdated'));
    } catch (error) {
      console.error(t('notifications.updateFailed'), error);
      toast.error(t('notifications.updateFailed'));
      // Rétablir l'ancienne valeur en cas d'erreur
      loadPreferences();
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-zinc-900 to-zinc-900/80 border-zinc-800/50">
        <CardContent className="p-8">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-yellow-500" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const pushNotificationOptions = [
    {
      key: 'notifications_enabled' as keyof NotificationPreferences,
      icon: BellRing,
      title: t('notifications.pushNotifications'),
      description: t('notifications.enableAllNotifications'),
      isMain: true,
    },
    {
      key: 'notify_on_reply' as keyof NotificationPreferences,
      icon: MessageSquare,
      title: t('notifications.replies'),
      description: t('notifications.someoneReplies'),
      isMain: false,
    },
    {
      key: 'notify_on_like' as keyof NotificationPreferences,
      icon: Heart,
      title: t('notifications.likes'),
      description: t('notifications.someoneLikes'),
      isMain: false,
    },
    {
      key: 'notify_on_new_post' as keyof NotificationPreferences,
      icon: Sparkles,
      title: t('notifications.newPosts'),
      description: t('notifications.newPostsInRooms'),
      isMain: false,
    },
  ];

  const emailNotificationOptions = [
    {
      key: 'email_notifications_enabled' as keyof NotificationPreferences,
      icon: Mail,
      title: 'Notifications par email',
      description: 'Activer toutes les notifications par email',
      isMain: true,
    },
    {
      key: 'email_notify_on_reply' as keyof NotificationPreferences,
      icon: MessageSquare,
      title: 'Réponses (Email)',
      description: 'Recevoir un email quand quelqu\'un répond',
      isMain: false,
    },
    {
      key: 'email_notify_on_like' as keyof NotificationPreferences,
      icon: Heart,
      title: 'Likes (Email)',
      description: 'Recevoir un email quand quelqu\'un aime votre talk',
      isMain: false,
    },
    {
      key: 'email_notify_on_new_post' as keyof NotificationPreferences,
      icon: Sparkles,
      title: 'Nouveaux talks (Email)',
      description: 'Recevoir un email pour les nouveaux talks dans les salles',
      isMain: false,
    },
  ];

  const renderNotificationSection = (
    title: string,
    subtitle: string,
    options: typeof pushNotificationOptions,
    mainToggleKey: keyof NotificationPreferences
  ) => (
    <Card className="bg-gradient-to-br from-zinc-900 to-zinc-900/80 border-zinc-800/50 shadow-xl">
      <CardHeader className="border-b border-zinc-800/50 pb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg border ${
            title.includes('email') 
              ? 'bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border-blue-500/30' 
              : 'bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border-yellow-500/30'
          }`}>
            {title.includes('email') ? (
              <Mail className="h-5 w-5 text-blue-500" />
            ) : (
              <Bell className="h-5 w-5 text-yellow-500" />
            )}
          </div>
          <div>
            <CardTitle className={`text-xl ${
              title.includes('email') ? 'text-blue-400' : 'gradient-text'
            }`}>
              {title}
            </CardTitle>
            <p className="text-sm text-zinc-400 mt-1">
              {subtitle}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-3">
        {options.map((option) => {
          const Icon = option.icon;
          const isEnabled = preferences[option.key];
          const isDisabled = !option.isMain && !preferences[mainToggleKey];
          
          return (
            <div
              key={option.key}
              className={`
                group relative overflow-hidden rounded-xl transition-all duration-300
                ${option.isMain 
                  ? title.includes('email')
                    ? 'bg-gradient-to-r from-blue-500/10 to-cyan-600/10 border-2 border-blue-500/30 hover:border-blue-500/50'
                    : 'bg-gradient-to-r from-yellow-500/10 to-amber-600/10 border-2 border-yellow-500/30 hover:border-yellow-500/50'
                  : 'bg-zinc-800/40 border border-zinc-700/50 hover:border-zinc-600'
                }
                ${isDisabled ? 'opacity-50' : ''}
              `}
            >
              <div className="flex items-center justify-between p-4 gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`
                    p-2.5 rounded-lg shrink-0 transition-all duration-300
                    ${option.isMain 
                      ? title.includes('email')
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-gradient-to-br from-yellow-500 to-amber-600 text-white shadow-lg shadow-yellow-500/25' 
                      : isEnabled && !isDisabled
                        ? title.includes('email')
                          ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30'
                          : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                        : 'bg-zinc-700 text-zinc-400'
                    }
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`
                      font-semibold text-base leading-tight
                      ${option.isMain 
                        ? title.includes('email') ? 'text-blue-400' : 'text-yellow-500'
                        : isDisabled ? 'text-zinc-500' : 'text-white'
                      }
                    `}>
                      {option.title}
                    </h4>
                    <p className={`
                      text-sm mt-0.5 leading-tight
                      ${isDisabled ? 'text-zinc-600' : 'text-zinc-400'}
                    `}>
                      {option.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <Switch
                    id={option.key}
                    checked={isEnabled}
                    onCheckedChange={(value) => updatePreference(option.key, value)}
                    disabled={isDisabled || saving}
                  />
                </div>
              </div>

              {/* Effet de brillance au hover */}
              {!isDisabled && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {renderNotificationSection(
        'Notifications Push',
        'Gérez vos notifications dans le navigateur',
        pushNotificationOptions,
        'notifications_enabled'
      )}
      
      {renderNotificationSection(
        'Notifications par Email',
        'Gérez vos notifications par email',
        emailNotificationOptions,
        'email_notifications_enabled'
      )}
    </div>
  );
}
