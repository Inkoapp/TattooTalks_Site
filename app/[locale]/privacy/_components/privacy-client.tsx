'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Mail, Lock, Share2, Users } from 'lucide-react';
import { useTranslations } from '@/lib/i18n-context';

export default function PrivacyClient() {
  const t = useTranslations('privacyPage');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl"
    >
      <Card className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {t('title')}
              </CardTitle>
              <p className="text-sm text-zinc-400 mt-1">{t('lastUpdated')}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 text-zinc-200">
          {/* Introduction */}
          <section>
            <p className="leading-relaxed">
              {t('intro')}
            </p>
          </section>

          {/* Section 1: Information We Collect */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t('sections.infoCollect.title')}</h3>
            
            <h4 className="text-lg font-medium text-zinc-100 mt-4 mb-2">{t('sections.infoCollect.personal')}</h4>
            <p className="leading-relaxed mb-2">{t('sections.infoCollect.personalDesc')}</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              {(t('sections.infoCollect.personalItems') as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h4 className="text-lg font-medium text-zinc-100 mt-4 mb-2">{t('sections.infoCollect.content')}</h4>
            <p className="leading-relaxed mb-2">{t('sections.infoCollect.contentDesc')}</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              {(t('sections.infoCollect.contentItems') as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h4 className="text-lg font-medium text-zinc-100 mt-4 mb-2">{t('sections.infoCollect.usage')}</h4>
            <p className="leading-relaxed mb-2">{t('sections.infoCollect.usageDesc')}</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              {(t('sections.infoCollect.usageItems') as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 2: How We Use Your Information */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t('sections.dataUse.title')}</h3>
            <p className="leading-relaxed mb-2">{t('sections.dataUse.description')}</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              {(t('sections.dataUse.items') as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 3: How We Share Your Information */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t('sections.dataShare.title')}</h3>
            
            {/* Visibility and Privacy Settings */}
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-5 w-5 text-blue-400" />
                <h4 className="text-lg font-medium text-blue-300">{t('sections.dataShare.visibility')}</h4>
              </div>
              <p className="leading-relaxed mb-3">{t('sections.dataShare.visibilityDesc')}</p>
              
              <div className="space-y-3">
                <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-700">
                  <p className="font-medium text-yellow-400 mb-1">{t('sections.dataShare.publicProfiles')}</p>
                  <p className="text-zinc-300 text-sm">{t('sections.dataShare.publicProfilesDesc')}</p>
                </div>
                
                <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-700">
                  <p className="font-medium text-blue-400 mb-1">{t('sections.dataShare.privateProfiles')}</p>
                  <p className="text-zinc-300 text-sm">{t('sections.dataShare.privateProfilesDesc')}</p>
                </div>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Share2 className="h-5 w-5 text-purple-400" />
                <h4 className="text-lg font-medium text-purple-300">{t('sections.dataShare.socialSharing')}</h4>
              </div>
              <p className="leading-relaxed mb-2">{t('sections.dataShare.socialSharingDesc')}</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
                {(t('sections.dataShare.socialSharingItems') as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Service Providers */}
            <h4 className="text-lg font-medium text-zinc-100 mt-4 mb-2">{t('sections.dataShare.serviceProviders')}</h4>
            <p className="leading-relaxed mb-2">{t('sections.dataShare.serviceProvidersDesc')}</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              {(t('sections.dataShare.serviceProvidersItems') as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            {/* Legal Requirements */}
            <h4 className="text-lg font-medium text-zinc-100 mt-4 mb-2">{t('sections.dataShare.legalRequirements')}</h4>
            <p className="leading-relaxed">{t('sections.dataShare.legalRequirementsDesc')}</p>
          </section>

          {/* Section 4: Data Security */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t('sections.dataSecurity.title')}</h3>
            <p className="leading-relaxed mb-2">{t('sections.dataSecurity.description')}</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              {(t('sections.dataSecurity.items') as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="leading-relaxed mt-3 text-zinc-400 italic">
              {t('sections.dataSecurity.disclaimer')}
            </p>
          </section>

          {/* Section 5: Your Data Rights */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t('sections.dataRights.title')}</h3>
            <p className="leading-relaxed mb-2">{t('sections.dataRights.description')}</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              {(t('sections.dataRights.rights') as string[]).map((right: string, index: number) => (
                <li key={index}>{right}</li>
              ))}
            </ul>
            
            {/* Account Deletion Highlight */}
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-red-400" />
                <h4 className="text-lg font-medium text-red-300">{t('sections.dataRights.accountDeletion')}</h4>
              </div>
              <p className="leading-relaxed text-zinc-100 mb-3">
                {t('sections.dataRights.accountDeletionDesc')}
              </p>
              
              <p className="font-medium text-zinc-200 mb-2">{t('sections.dataRights.accountDeletionSteps')}</p>
              <ol className="list-decimal list-inside space-y-1 ml-4 text-zinc-300">
                {(t('sections.dataRights.accountDeletionStepsList') as string[]).map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              
              <p className="leading-relaxed mt-3 text-zinc-300 text-sm italic">
                {t('sections.dataRights.accountDeletionNote')}
              </p>
            </div>
            
            <p className="leading-relaxed mt-3">
              {t('sections.dataRights.contact')}{' '}
              <a href="mailto:privacy@tattootalks.com" className="text-yellow-400 hover:text-yellow-300 underline">
                privacy@tattootalks.com
              </a>
            </p>
          </section>

          {/* Section 6: Data Retention */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t('sections.dataRetention.title')}</h3>
            <p className="leading-relaxed">
              {t('sections.dataRetention.description')}
            </p>
          </section>

          {/* Section 7: Children's Privacy */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t('sections.childrenPrivacy.title')}</h3>
            <p className="leading-relaxed">
              {t('sections.childrenPrivacy.description')}
            </p>
          </section>

          {/* Section 8: International Data Transfers */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t('sections.dataTransfers.title')}</h3>
            <p className="leading-relaxed">
              {t('sections.dataTransfers.description')}
            </p>
          </section>

          {/* Section 9: Cookies and Tracking */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t('sections.cookies.title')}</h3>
            <p className="leading-relaxed mb-2">{t('sections.cookies.description')}</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              {(t('sections.cookies.items') as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 10: Third-Party Links */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t('sections.thirdParty.title')}</h3>
            <p className="leading-relaxed">
              {t('sections.thirdParty.description')}
            </p>
          </section>

          {/* Section 11: Email Communications */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t('sections.emailComms.title')}</h3>
            <p className="leading-relaxed mb-2">{t('sections.emailComms.description')}</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              {(t('sections.emailComms.items') as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="leading-relaxed mt-3 text-zinc-300">
              {t('sections.emailComms.preferences')}
            </p>
          </section>

          {/* Section 12: Changes to This Policy */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t('sections.policyChanges.title')}</h3>
            <p className="leading-relaxed">
              {t('sections.policyChanges.description')}
            </p>
          </section>

          {/* Section 13: Contact Us */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t('sections.contact.title')}</h3>
            <p className="leading-relaxed mb-3">{t('sections.contact.description')}</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-yellow-400">
                <Mail className="h-5 w-5" />
                <span className="mr-2">{t('sections.contact.email')}</span>
                <a href="mailto:privacy@tattootalks.com" className="hover:underline">
                  privacy@tattootalks.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <Mail className="h-5 w-5" />
                <span className="mr-2">{t('sections.contact.support')}</span>
                <a href="mailto:support@tattootalks.com" className="hover:underline">
                  support@tattootalks.com
                </a>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </motion.div>
  )
}
