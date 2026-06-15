'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Mail, Scale } from 'lucide-react'

export default function TermsClient() {
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
                  Terms and Conditions
                </CardTitle>
                <p className="text-zinc-400 mt-2">Last updated: December 3, 2025</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Section 1: Acceptance of Terms */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>
              By accessing and using TattooTalks ("the App"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms and Conditions, please do not use the App.
            </p>
          </CardContent>
        </Card>

        {/* Section 2: Description of Service */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">2. Description of Service</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>
              TattooTalks is a social platform designed for tattoo artists and enthusiasts to connect, share ideas, discuss techniques, and build a community around tattoo art and culture.
            </p>
          </CardContent>
        </Card>

        {/* Section 3: User Accounts */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">3. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <ul className="list-disc list-inside space-y-2">
              <li>You must be at least 18 years old to create an account</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You are responsible for all activities that occur under your account</li>
              <li>You must provide accurate and complete information when creating your account</li>
              <li>You may not use another user's account without permission</li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 4: User Content */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">4. User Content</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <ul className="list-disc list-inside space-y-2">
              <li>You retain ownership of content you post on TattooTalks</li>
              <li>By posting content, you grant TattooTalks a non-exclusive license to use, display, and distribute your content</li>
              <li>You are solely responsible for the content you post</li>
              <li>You must not post content that is illegal, offensive, or infringes on others' rights</li>
              <li>We reserve the right to remove content that violates these terms</li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 5: Prohibited Activities */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">5. Prohibited Activities</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Use the App for any illegal purpose</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Post spam or unsolicited advertising</li>
              <li>Impersonate others or provide false information</li>
              <li>Attempt to gain unauthorized access to the App</li>
              <li>Use automated systems to access the App without permission</li>
              <li>Post content containing viruses or malicious code</li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 6: Intellectual Property */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">6. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>
              The App and its original content, features, and functionality are owned by TattooTalks and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </CardContent>
        </Card>

        {/* Section 7: Age Requirements */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">7. Age Requirements</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>
              Given the nature of tattoo-related content, users must be at least 18 years old to use this App. We do not knowingly collect information from anyone under 18 years of age.
            </p>
          </CardContent>
        </Card>

        {/* Section 8: Content Moderation */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">8. Content Moderation</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>
              We reserve the right to monitor, review, and remove content at our discretion. This includes content that violates these terms or is otherwise objectionable.
            </p>
          </CardContent>
        </Card>

        {/* Section 9: Privacy */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">9. Privacy</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>
              Your use of the App is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
            </p>
          </CardContent>
        </Card>

        {/* Section 10: Account Deletion */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">10. Account Deletion</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>
              You have the right to delete your account at any time through the Profile settings in the App. When you delete your account:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>All your personal data will be permanently removed from our servers</li>
              <li>Your posts, comments, and other content will be permanently deleted</li>
              <li>This action is irreversible and cannot be undone</li>
              <li>You will need to create a new account if you wish to use the App again</li>
            </ul>
            <p className="mt-4">
              To delete your account, go to Profile &gt; Delete My Account, and follow the confirmation steps.
            </p>
          </CardContent>
        </Card>

        {/* Section 11: Termination by TattooTalks */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">11. Termination by TattooTalks</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>
              We may terminate or suspend your account and access to the App immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </CardContent>
        </Card>

        {/* Section 12: Disclaimer of Warranties */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">12. Disclaimer of Warranties</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>
              The App is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the App will be uninterrupted, secure, or error-free.
            </p>
          </CardContent>
        </Card>

        {/* Section 13: Limitation of Liability */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">13. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>
              In no event shall TattooTalks be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the App.
            </p>
          </CardContent>
        </Card>

        {/* Section 14: Changes to Terms */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">14. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes. Your continued use of the App after changes constitutes acceptance of the new terms.
            </p>
          </CardContent>
        </Card>

        {/* Section 15: Governing Law */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">15. Governing Law</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions.
            </p>
          </CardContent>
        </Card>

        {/* Section 16: Contact Information */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-500">16. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-4">
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="flex items-center space-x-2 text-yellow-500 mt-4">
              <Mail className="h-5 w-5" />
              <a href="mailto:support@tattoo-talks.com" className="hover:underline">
                support@tattoo-talks.com
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
