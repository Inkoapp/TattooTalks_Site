
import { AdminClient } from './_components/admin-client'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated()
  
  if (!authenticated) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black">
      <AdminClient />
    </div>
  )
}
