'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Scale, Shield, AlertTriangle, Share2, Lock } from 'lucide-react'
import { useTranslations } from '@/lib/i18n-context'

export default function TermsClient() {
  const t = useTranslations('termsPage')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-8 px-4"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                  {t('title')}
                </CardTitle>
                <p className="text-zinc-400 mt-2">{t('lastUpdated')}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Section 1: Acceptance of Terms */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">1. {t('sections.acceptance.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>{t('sections.acceptance.description')}</p>
          </CardContent>
        </Card>

        {/* Section 2: Description of Service */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">2. {t('sections.service.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>{t('sections.service.description')}</p>
          </CardContent>
        </Card>

        {/* Section 3: User Accounts with Privacy Settings */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">3. {t('sections.accounts.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <ul className="list-disc list-inside space-y-2">
              {(t('sections.accounts.items') as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-blue-400" />
                <h4 className="font-semibold text-blue-300">{t('sections.accounts.privacySettings')}</h4>
              </div>
              <p className="text-zinc-300 text-sm">{t('sections.accounts.privacySettingsDesc')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: User Content & Social Sharing */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">4. {t('sections.userContent.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <ul className="list-disc list-inside space-y-2">
              {(t('sections.userContent.items') as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Share2 className="h-5 w-5 text-purple-400" />
                <h4 className="font-semibold text-purple-300">{t('sections.userContent.socialSharing')}</h4>
              </div>
              <p className="text-zinc-300 text-sm">{t('sections.userContent.socialSharingDesc')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Prohibited Activities */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">5. {t('sections.prohibited.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>{t('sections.prohibited.description')}</p>
            <ul className="list-disc list-inside space-y-2">
              {(t('sections.prohibited.items') as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Section 6: Intellectual Property */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">6. {t('sections.intellectualProperty.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>{t('sections.intellectualProperty.description')}</p>
          </CardContent>
        </Card>

        {/* Section 7: Age Requirements */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">7. {t('sections.ageRequirements.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>{t('sections.ageRequirements.description')}</p>
          </CardContent>
        </Card>

        {/* Section 8: Content Moderation */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">8. {t('sections.moderation.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>{t('sections.moderation.description')}</p>
          </CardContent>
        </Card>

        {/* Section 9: UGC Policy - Enhanced with Red Border */}
        <Card className="bg-zinc-900/50 border-2 border-red-900/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-red-400" />
              <CardTitle className="text-xl text-red-400">9. {t('sections.ugcPolicy.title')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p className="font-medium text-zinc-200">{t('sections.ugcPolicy.intro')}</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-red-300 mb-2">{t('sections.ugcPolicy.prohibitedContent')}</h4>
                <p className="mb-2">{t('sections.ugcPolicy.prohibitedContentDesc')}</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  {(t('sections.ugcPolicy.prohibitedItems') as string[]).map((item: string, index: number) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-red-300 mb-2">{t('sections.ugcPolicy.enforcement')}</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  {(t('sections.ugcPolicy.enforcementItems') as string[]).map((item: string, index: number) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-red-300 mb-2">{t('sections.ugcPolicy.userResponsibility')}</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  {(t('sections.ugcPolicy.userResponsibilityItems') as string[]).map((item: string, index: number) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-red-300 mb-2">{t('sections.ugcPolicy.moderationMethods')}</h4>
                <p className="mb-2">{t('sections.ugcPolicy.moderationMethodsDesc')}</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  {(t('sections.ugcPolicy.moderationMethodsItems') as string[]).map((item: string, index: number) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
              
              <p className="font-medium text-zinc-200 italic bg-red-500/10 p-3 rounded">
                {t('sections.ugcPolicy.acknowledgment')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section 10: Privacy */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">10. {t('sections.privacy.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>{t('sections.privacy.description')}</p>
          </CardContent>
        </Card>

        {/* Section 11: Account Deletion */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">11. {t('sections.accountDeletion.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>{t('sections.accountDeletion.description')}</p>
            <ul className="list-disc list-inside space-y-2">
              {(t('sections.accountDeletion.items') as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-zinc-400 italic">{t('sections.accountDeletion.instructions')}</p>
          </CardContent>
        </Card>

        {/* Section 12: Termination by TattooTalks */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">12. {t('sections.termination.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>{t('sections.termination.description')}</p>
          </CardContent>
        </Card>

        {/* Section 13: Medical Disclaimer - Critical with Orange/Red Border */}
        <Card className="bg-zinc-900/50 border-2 border-orange-900/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-orange-400" />
              <CardTitle className="text-xl text-orange-400">13. {t('sections.medicalDisclaimer.title')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p className="font-medium text-zinc-200 bg-orange-500/10 p-3 rounded">
              {t('sections.medicalDisclaimer.intro')}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {(t('sections.medicalDisclaimer.items') as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Section 14: Disclaimer of Warranties */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">14. {t('sections.warranties.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>{t('sections.warranties.description')}</p>
          </CardContent>
        </Card>

        {/* Section 15: Limitation of Liability */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">15. {t('sections.liability.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>{t('sections.liability.description')}</p>
          </CardContent>
        </Card>

        {/* Section 16: Changes to Terms */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">16. {t('sections.changes.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>{t('sections.changes.description')}</p>
          </CardContent>
        </Card>

        {/* Section 17: Governing Law */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">17. {t('sections.governingLaw.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>{t('sections.governingLaw.description')}</p>
          </CardContent>
        </Card>

        {/* Section 18: Contact Information */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">18. {t('sections.contact.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>{t('sections.contact.description')}</p>
            <div className="flex items-center space-x-2 text-yellow-500 mt-4">
              <Mail className="h-5 w-5" />
              <span className="mr-2">{t('sections.contact.email')}</span>
              <a href="mailto:support@tattootalks.com" className="hover:underline">
                {t('sections.contact.emailAddress')}
              </a>
            </div>
            <p className="text-zinc-400 text-sm mt-6">{t('sections.contact.copyright')}</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
