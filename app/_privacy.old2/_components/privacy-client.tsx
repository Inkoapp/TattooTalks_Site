'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Mail } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyClient() {
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
                Privacy Policy
              </CardTitle>
              <p className="text-sm text-zinc-400 mt-1">Last updated: December 3, 2025</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 text-zinc-200">
          {/* Introduction */}
          <section>
            <p className="leading-relaxed">
              TattooTalks ("we", "our", or "us") is committed to protecting your privacy. This privacy policy explains how we collect, use, disclose, and protect your information when you use our mobile application.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">1. Information We Collect</h3>
            
            <h4 className="text-lg font-medium text-zinc-100 mt-4 mb-2">Personal Information</h4>
            <p className="leading-relaxed mb-2">When you create an account, we collect:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              <li>Username and display name (pseudo)</li>
              <li>Email address</li>
              <li>Password (encrypted)</li>
              <li>City and country (optional)</li>
              <li>Profile picture (optional)</li>
              <li>Native language and learning languages</li>
            </ul>

            <h4 className="text-lg font-medium text-zinc-100 mt-4 mb-2">Content Information</h4>
            <p className="leading-relaxed mb-2">We collect the content you create and share on the platform:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              <li>Posts (Talks) and discussions</li>
              <li>Comments and replies</li>
              <li>Images and media you upload</li>
              <li>Likes and interactions</li>
            </ul>

            <h4 className="text-lg font-medium text-zinc-100 mt-4 mb-2">Usage Information</h4>
            <p className="leading-relaxed mb-2">We automatically collect certain information about your device and how you interact with the app:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              <li>Device type and operating system</li>
              <li>App usage statistics</li>
              <li>IP address and location data</li>
              <li>Pages viewed and features used</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">2. How We Use Your Information</h3>
            <p className="leading-relaxed mb-2">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              <li>Provide and maintain the app</li>
              <li>Create and manage your account</li>
              <li>Enable social features and interactions</li>
              <li>Send you notifications about activity on your content</li>
              <li>Personalize your experience</li>
              <li>Improve our services</li>
              <li>Respond to your requests and support needs</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">3. How We Share Your Information</h3>
            
            <h4 className="text-lg font-medium text-zinc-100 mt-4 mb-2">Public Information</h4>
            <p className="leading-relaxed">
              Your profile information, posts, and comments are public by default and can be viewed by other users of the app.
            </p>

            <h4 className="text-lg font-medium text-zinc-100 mt-4 mb-2">Service Providers</h4>
            <p className="leading-relaxed mb-2">We may share your information with third-party service providers who help us operate the app:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              <li>Cloud hosting services (Supabase)</li>
              <li>Email service providers (Resend)</li>
              <li>Analytics providers</li>
            </ul>

            <h4 className="text-lg font-medium text-zinc-100 mt-4 mb-2">Legal Requirements</h4>
            <p className="leading-relaxed">
              We may disclose your information if required by law or in response to valid legal requests.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">4. Data Security</h3>
            <p className="leading-relaxed mb-2">We implement appropriate security measures to protect your information:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              <li>Passwords are encrypted using industry-standard methods</li>
              <li>Data is transmitted via secure HTTPS connections</li>
              <li>Access to personal data is limited to authorized personnel</li>
              <li>Regular security audits and updates</li>
            </ul>
            <p className="leading-relaxed mt-3">
              However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">5. Your Data Rights</h3>
            <p className="leading-relaxed mb-2">You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              <li>Access personal information we hold about you</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your account and data</li>
              <li>Object to processing of your information</li>
              <li>Export your data in a portable format</li>
              <li>Withdraw consent for certain processing activities</li>
            </ul>
            <p className="leading-relaxed mt-3">
              To exercise these rights, please contact us at{' '}
              <a href="mailto:privacy@tattootalks.com" className="text-yellow-400 hover:text-yellow-300 underline">
                privacy@tattootalks.com
              </a>
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">6. Data Retention</h3>
            <p className="leading-relaxed">
              We retain your information for as long as your account is active or as needed to provide services. When you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain it for legal purposes.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">7. Children's Privacy</h3>
            <p className="leading-relaxed">
              TattooTalks is intended for users aged 18 and above. We do not knowingly collect information from anyone under 18 years old. If we discover we have collected personal information from someone under 18, we will take steps to delete that information.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">8. International Data Transfers</h3>
            <p className="leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. These countries may have different data protection laws. By using the app, you consent to these transfers.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">9. Cookies and Tracking</h3>
            <p className="leading-relaxed mb-2">We use local storage and similar technologies to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              <li>Remember your preferences</li>
              <li>Keep you logged in</li>
              <li>Understand how you use the app</li>
              <li>Improve our services</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">10. Third-Party Links</h3>
            <p className="leading-relaxed">
              The app may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">11. Email Communications</h3>
            <p className="leading-relaxed mb-2">We may send you:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-zinc-300">
              <li>Welcome emails upon registration</li>
              <li>Notification emails about activity on your content</li>
              <li>Service updates and announcements</li>
              <li>Security alerts</li>
            </ul>
            <p className="leading-relaxed mt-3">
              You can manage your email preferences in your account settings.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">12. Changes to This Policy</h3>
            <p className="leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the app after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Section 13 - Contact */}
          <section className="border-t border-zinc-700 pt-6">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">13. Contact Us</h3>
            <p className="leading-relaxed mb-4">
              If you have any questions about this privacy policy or our data practices, please contact us at:
            </p>
            <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4">
              <p className="font-semibold text-zinc-100 mb-2">Support:</p>
              <a
                href="mailto:support@tattoo-talks.com"
                className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <Mail className="h-4 w-4" />
                support@tattoo-talks.com
              </a>
            </div>
          </section>

          {/* Footer */}
          <section className="border-t border-zinc-700 pt-6 text-center">
            <p className="text-sm text-zinc-400">
              © 2025 TattooTalks. All rights reserved.
            </p>
          </section>
        </CardContent>
      </Card>
    </motion.div>
  );
}
