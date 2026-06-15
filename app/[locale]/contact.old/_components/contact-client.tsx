
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, User, MessageSquare, Send, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useTranslations, useLocale } from '@/lib/i18n-context'

export function ContactClient() {
  const t = useTranslations()
  const locale = useLocale()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setIsSubmitted(true)
        toast.success(t('contact.sendSuccess'))
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        const data = await response.json()
        toast.error(data.error || t('contact.sendError'))
      }
    } catch (error) {
      toast.error(t('contact.sendError'))
      console.error('Contact form error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto"
      >
        <Card className="text-center">
          <CardContent className="py-12">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('contact.sendSuccess')}
            </h3>
            <p className="text-zinc-400 mb-6">
              {t('contact.description')}
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              {t('contact.send')}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {t('contact.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    {t('contact.name')} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.enterName')}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    {t('auth.email')} *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('auth.enterEmail')}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  {t('contact.subject')} *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t('contact.enterSubject')}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  {t('contact.message')} *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.enterMessage')}
                  rows={6}
                  className="resize-none"
                  required
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8"
                  size="lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="spinner"></div>
                      <span>{t('contact.sending')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send size={18} />
                      <span>{t('contact.send')}</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-center">{t('contact.subtitle')}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">{t('contact.title')}</h4>
              <p className="text-zinc-400 text-sm">
                {t('contact.description')}
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800">
              <p className="text-zinc-400 text-sm">
                24-48h
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
