
import { MainLayout } from '@/components/layout/main-layout'
import { ContactClient } from './_components/contact-client'

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Nous contacter
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Une question, une suggestion ou besoin d'aide ? 
            N'hésitez pas à nous envoyer un message, nous vous répondrons rapidement.
          </p>
        </div>
        
        <ContactClient />
      </div>
    </MainLayout>
  )
}
