
'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from '@/lib/i18n-context'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { 
  Mail, Clock, Eye, CheckCircle, AlertTriangle, 
  Users, MessageSquare, Heart, TrendingUp, Activity,
  Search, Trash2, Shield, ShieldOff, Filter,
  BarChart3, PieChart, LineChart, Globe, Target,
  TrendingDown, UserCheck, Calendar, Download
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { fr, enUS, es, pt } from 'date-fns/locale'
import toast from 'react-hot-toast'
import { S3Avatar } from '@/components/ui/s3-avatar'
import { 
  LineChart as RechartsLine, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  created_at: string
}

interface User {
  id: string
  pseudo: string
  email: string
  avatar_url: string | null
  is_admin: boolean
  country: string | null
  city: string | null
  created_at: string
  _count: {
    talks: number
    messages: number
    likes: number
  }
}

interface Talk {
  id: string
  title: string
  content: string
  created_at: string
  user: {
    id: string
    pseudo: string
    email: string
    avatar_url: string | null
  }
  room: {
    id: string
    title: string
  }
  _count: {
    messages: number
    likes: number
  }
}

interface Stats {
  overview: {
    totalUsers: number
    totalTalks: number
    totalMessages: number
    totalRooms: number
    totalLikes: number
    totalContactMessages: number
    newContactMessages: number
    recentUsers: number
    recentTalks: number
    engagementRate: number
    activeUsersCount: number
    usersLastMonth: number
    talksLastMonth: number
  }
  activeUsers: Array<{
    id: string
    pseudo: string
    email: string
    avatar_url: string | null
    _count: {
      talks: number
      messages: number
      likes: number
    }
  }>
  popularRooms: Array<{
    id: string
    title: string
    cover_image_url: string | null
    _count: {
      talks: number
    }
  }>
  dailyActivity: Array<{
    date: Date
    talks: number
    messages: number
  }>
  usersByCountry: Array<{
    country: string
    count: number
  }>
}

const statusConfig = {
  nouveau: { label: 'Nouveau', color: 'bg-blue-500', icon: Mail },
  lu: { label: 'Lu', color: 'bg-yellow-500', icon: Eye },
  traité: { label: 'Traité', color: 'bg-green-500', icon: CheckCircle },
}

export function AdminClient() {
  const t = useTranslations()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('stats')
  const [isLoading, setIsLoading] = useState(true)
  
  // Stats state
  const [stats, setStats] = useState<Stats | null>(null)
  
  // Users state
  const [users, setUsers] = useState<User[]>([])
  const [usersPage, setUsersPage] = useState(1)
  const [usersTotalPages, setUsersTotalPages] = useState(1)
  const [usersSearch, setUsersSearch] = useState('')
  
  // Talks state
  const [talks, setTalks] = useState<Talk[]>([])
  const [talksPage, setTalksPage] = useState(1)
  const [talksTotalPages, setTalksTotalPages] = useState(1)
  const [talksSearch, setTalksSearch] = useState('')
  
  // Messages state
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  useEffect(() => {
    // L'authentification est déjà vérifiée au niveau de la page
    fetchStats()
    fetchMessages()
  }, [])

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers()
    }
  }, [activeTab, usersPage, usersSearch])

  useEffect(() => {
    if (activeTab === 'talks') {
      fetchTalks()
    }
  }, [activeTab, talksPage, talksSearch])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `/api/admin/users?page=${usersPage}&limit=20&search=${usersSearch}`
      )
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
        setUsersTotalPages(data.pagination.pages)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTalks = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `/api/admin/talks?page=${talksPage}&limit=20&search=${talksSearch}`
      )
      if (response.ok) {
        const data = await response.json()
        setTalks(data.talks)
        setTalksTotalPages(data.pagination.pages)
      }
    } catch (error) {
      console.error('Error fetching talks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact')
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateMessageStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        await fetchMessages()
        toast.success('Statut mis à jour')
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
      console.error('Status update error:', error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchMessages()
        toast.success('Message supprimé')
        // Fermer le message sélectionné s'il était ouvert
        if (selectedMessage?.id === id) {
          setSelectedMessage(null)
        }
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erreur')
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression')
      console.error('Delete message error:', error)
    }
  }

  const toggleUserAdmin = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_admin: !currentStatus })
      })

      if (response.ok) {
        await fetchUsers()
        toast.success(currentStatus ? 'Admin retiré' : 'Admin ajouté')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erreur')
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
      console.error('Admin toggle error:', error)
    }
  }

  const deleteUser = async (userId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchUsers()
        toast.success('Utilisateur supprimé')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erreur')
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression')
      console.error('Delete user error:', error)
    }
  }

  const exportUsersToCSV = () => {
    try {
      // Format CSV compatible avec Google Contacts
      const csvHeaders = [
        'Name',
        'Given Name',
        'Additional Name',
        'Family Name',
        'Yomi Name',
        'Given Name Yomi',
        'Additional Name Yomi',
        'Family Name Yomi',
        'Name Prefix',
        'Name Suffix',
        'Initials',
        'Nickname',
        'Short Name',
        'Maiden Name',
        'Birthday',
        'Gender',
        'Location',
        'Billing Information',
        'Directory Server',
        'Mileage',
        'Occupation',
        'Hobby',
        'Sensitivity',
        'Priority',
        'Subject',
        'Notes',
        'Language',
        'Photo',
        'Group Membership',
        'E-mail 1 - Type',
        'E-mail 1 - Value',
        'Phone 1 - Type',
        'Phone 1 - Value',
        'Address 1 - Type',
        'Address 1 - Formatted',
        'Address 1 - Street',
        'Address 1 - City',
        'Address 1 - PO Box',
        'Address 1 - Region',
        'Address 1 - Postal Code',
        'Address 1 - Country',
        'Address 1 - Extended Address',
        'Organization 1 - Type',
        'Organization 1 - Name',
        'Organization 1 - Yomi Name',
        'Organization 1 - Title',
        'Organization 1 - Department',
        'Organization 1 - Symbol',
        'Organization 1 - Location',
        'Organization 1 - Job Description',
        'Website 1 - Type',
        'Website 1 - Value'
      ].join(',')

      // Générer les lignes de données
      const csvRows = users.map(user => {
        // Échapper les valeurs pour CSV (guillemets et virgules)
        const escapeCSV = (value: string | null | undefined) => {
          if (!value) return ''
          const stringValue = String(value)
          if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`
          }
          return stringValue
        }

        // Créer un tableau avec toutes les colonnes (la plupart vides)
        const row = new Array(50).fill('')
        
        // Remplir uniquement les colonnes que nous avons
        row[0] = escapeCSV(user.pseudo) // Name
        row[1] = escapeCSV(user.pseudo) // Given Name
        row[29] = '* Other' // E-mail 1 - Type
        row[30] = escapeCSV(user.email) // E-mail 1 - Value
        row[36] = escapeCSV(user.city) // Address 1 - City
        row[40] = escapeCSV(user.country) // Address 1 - Country
        
        return row.join(',')
      }).join('\n')

      // Créer le contenu CSV complet
      const csvContent = `${csvHeaders}\n${csvRows}`

      // Créer un blob et télécharger le fichier
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      link.setAttribute('href', url)
      link.setAttribute('download', `tattootalks-contacts-${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast.success(`${users.length} contacts exportés avec succès`)
    } catch (error) {
      toast.error('Erreur lors de l\'export CSV')
      console.error('CSV export error:', error)
    }
  }

  if (isLoading && !stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-zinc-700 rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-zinc-700 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // L'authentification est vérifiée au niveau de la page (app/admin/page.tsx)
  // Pas besoin de vérifier ici

  const messageStats = {
    total: messages?.length || 0,
    nouveau: messages?.filter(m => m.status === 'nouveau').length || 0,
    lu: messages?.filter(m => m.status === 'lu').length || 0,
    traité: messages?.filter(m => m.status === 'traité').length || 0,
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      toast.success('Déconnexion réussie')
      // Redirection vers la page de login admin
      window.location.href = '/admin/login'
    } catch (error) {
      toast.error('Erreur lors de la déconnexion')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="text-center">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1"></div>
            <h1 className="text-4xl font-bold gradient-text flex-1">
              Administration
            </h1>
            <div className="flex-1 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                Déconnexion
              </Button>
            </div>
          </div>
          <p className="text-zinc-400 text-lg">
            Tableau de bord administrateur
          </p>
        </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <BarChart3 size={16} />
            <span className="hidden sm:inline">Statistiques</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users size={16} />
            <span className="hidden sm:inline">Utilisateurs</span>
          </TabsTrigger>
          <TabsTrigger value="talks" className="flex items-center gap-2">
            <MessageSquare size={16} />
            <span className="hidden sm:inline">Talks</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <Mail size={16} />
            <span className="hidden sm:inline">Messages</span>
          </TabsTrigger>
        </TabsList>

        {/* STATS TAB */}
        <TabsContent value="stats" className="space-y-6">
          {stats && (
            <>
              {/* Overview Cards - Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="border-blue-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-zinc-400">Utilisateurs</p>
                          <p className="text-3xl font-bold text-white">{stats.overview.totalUsers}</p>
                          <p className="text-xs text-green-400 mt-1">
                            +{stats.overview.recentUsers} cette semaine
                          </p>
                        </div>
                        <Users size={32} className="text-blue-400" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <Card className="border-purple-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-zinc-400">Talks</p>
                          <p className="text-3xl font-bold text-white">{stats.overview.totalTalks}</p>
                          <p className="text-xs text-green-400 mt-1">
                            +{stats.overview.recentTalks} cette semaine
                          </p>
                        </div>
                        <MessageSquare size={32} className="text-purple-400" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Card className="border-green-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-zinc-400">Messages</p>
                          <p className="text-3xl font-bold text-white">{stats.overview.totalMessages}</p>
                          <p className="text-xs text-zinc-400 mt-1">
                            Réponses totales
                          </p>
                        </div>
                        <MessageSquare size={32} className="text-green-400" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Card className="border-red-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-zinc-400">Likes</p>
                          <p className="text-3xl font-bold text-white">{stats.overview.totalLikes}</p>
                          <p className="text-xs text-zinc-400 mt-1">
                            Total des likes
                          </p>
                        </div>
                        <Heart size={32} className="text-red-400" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Overview Cards - Row 2: Engagement & Growth */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <Card className="border-cyan-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-zinc-400">Taux d'engagement</p>
                          <p className="text-3xl font-bold text-white">{stats.overview.engagementRate}%</p>
                          <p className="text-xs text-zinc-400 mt-1">
                            {stats.overview.activeUsersCount} utilisateurs actifs
                          </p>
                        </div>
                        <Target size={32} className="text-cyan-400" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <Card className="border-amber-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-zinc-400">Nouveaux utilisateurs</p>
                          <p className="text-3xl font-bold text-white">{stats.overview.usersLastMonth}</p>
                          <p className="text-xs text-amber-400 mt-1">
                            Ces 30 derniers jours
                          </p>
                        </div>
                        <UserCheck size={32} className="text-amber-400" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <Card className="border-pink-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-zinc-400">Nouveaux talks</p>
                          <p className="text-3xl font-bold text-white">{stats.overview.talksLastMonth}</p>
                          <p className="text-xs text-pink-400 mt-1">
                            Ces 30 derniers jours
                          </p>
                        </div>
                        <Calendar size={32} className="text-pink-400" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                  <Card className="border-teal-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-zinc-400">Pays représentés</p>
                          <p className="text-3xl font-bold text-white">{stats.usersByCountry.length}</p>
                          <p className="text-xs text-zinc-400 mt-1">
                            Communauté mondiale
                          </p>
                        </div>
                        <Globe size={32} className="text-teal-400" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity size={20} />
                    Activité des 7 derniers jours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLine data={stats.dailyActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#9ca3af"
                        tickFormatter={(date) => new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                      />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: '#f3f4f6' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="talks" stroke="#8b5cf6" name="Talks" strokeWidth={2} />
                      <Line type="monotone" dataKey="messages" stroke="#10b981" name="Messages" strokeWidth={2} />
                    </RechartsLine>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Users by Country */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe size={20} />
                    Distribution géographique des utilisateurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats.usersByCountry} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis type="number" stroke="#9ca3af" />
                      <YAxis 
                        type="category" 
                        dataKey="country" 
                        stroke="#9ca3af"
                        width={150}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: '#f3f4f6' }}
                      />
                      <Bar dataKey="count" fill="#06b6d4" name="Utilisateurs" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 pt-4 border-t border-zinc-800">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {stats.usersByCountry.slice(0, 10).map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                          <span className="text-sm text-zinc-300">{item.country}</span>
                          <span className="text-sm text-zinc-500">({item.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Users & Popular Rooms */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp size={20} />
                      Utilisateurs les plus actifs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stats.activeUsers.slice(0, 5).map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <S3Avatar cloudStoragePath={user.avatar_url} fallback={user.pseudo[0]} />
                            <div>
                              <p className="font-medium text-white">{user.pseudo}</p>
                              <p className="text-sm text-zinc-400">{user.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-white">
                              {user._count.talks + user._count.messages} actions
                            </p>
                            <p className="text-xs text-zinc-400">
                              {user._count.talks} talks • {user._count.messages} messages
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart size={20} />
                      Salles populaires
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={stats.popularRooms}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="title" 
                          stroke="#9ca3af"
                          angle={-45}
                          textAnchor="end"
                          height={100}
                          interval={0}
                        />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                          labelStyle={{ color: '#f3f4f6' }}
                        />
                        <Bar dataKey="_count.talks" fill="#f59e0b" name="Talks" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        {/* USERS TAB */}
        <TabsContent value="users" className="space-y-6">
          <Card className="border-blue-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users size={20} />
                  Liste complète des utilisateurs
                </CardTitle>
                <Button
                  onClick={exportUsersToCSV}
                  variant="outline"
                  className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/30"
                >
                  <Download size={16} className="mr-2" />
                  Exporter CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                  <Input
                    placeholder="Rechercher par pseudo ou email..."
                    value={usersSearch}
                    onChange={(e) => setUsersSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-zinc-800 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {users.map((user) => (
                  <Card key={user.id} className="hover:border-zinc-700 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* User Info */}
                        <div className="flex items-center gap-4 flex-1">
                          <S3Avatar cloudStoragePath={user.avatar_url} fallback={user.pseudo[0]} className="w-14 h-14" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-semibold text-white text-lg">{user.pseudo}</h4>
                              {user.is_admin && (
                                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                  <Shield size={12} className="mr-1" />
                                  Admin
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-zinc-400 truncate">{user.email}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Globe size={14} className="text-teal-400" />
                              <p className="text-sm font-medium text-teal-400">
                                {user.city && user.country 
                                  ? `${user.city}, ${user.country}` 
                                  : user.country 
                                    ? user.country 
                                    : 'Localisation non spécifiée'}
                              </p>
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">
                              Membre depuis {new Date(user.created_at).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 justify-center lg:justify-start px-4 py-2 bg-zinc-800/30 rounded-lg">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-400">{user._count.talks}</p>
                            <p className="text-xs text-zinc-400">Talks</p>
                          </div>
                          <div className="w-px h-10 bg-zinc-700"></div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-400">{user._count.messages}</p>
                            <p className="text-xs text-zinc-400">Messages</p>
                          </div>
                          <div className="w-px h-10 bg-zinc-700"></div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-red-400">{user._count.likes}</p>
                            <p className="text-xs text-zinc-400">Likes</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            variant={user.is_admin ? "destructive" : "default"}
                            size="sm"
                            onClick={() => toggleUserAdmin(user.id, user.is_admin)}
                          >
                            {user.is_admin ? (
                              <>
                                <ShieldOff size={16} className="mr-1" />
                                <span className="hidden sm:inline">Retirer admin</span>
                              </>
                            ) : (
                              <>
                                <Shield size={16} className="mr-1" />
                                <span className="hidden sm:inline">Faire admin</span>
                              </>
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteUser(user.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {usersTotalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setUsersPage(p => Math.max(1, p - 1))}
                    disabled={usersPage === 1}
                  >
                    Précédent
                  </Button>
                  <span className="flex items-center px-4 text-zinc-400">
                    Page {usersPage} sur {usersTotalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setUsersPage(p => Math.min(usersTotalPages, p + 1))}
                    disabled={usersPage === usersTotalPages}
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </>
          )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TALKS TAB */}
        <TabsContent value="talks" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <Input
                placeholder="Rechercher un talk..."
                value={talksSearch}
                onChange={(e) => setTalksSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-zinc-800 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {talks.map((talk) => (
                  <Card key={talk.id}>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-lg mb-1">{talk.title}</h4>
                            <p className="text-zinc-300 text-sm line-clamp-2 mb-2">{talk.content}</p>
                            <div className="flex items-center gap-4 text-sm text-zinc-400">
                              <div className="flex items-center gap-2">
                                <S3Avatar cloudStoragePath={talk.user.avatar_url} fallback={talk.user.pseudo[0]} className="w-6 h-6" />
                                <span>{talk.user.pseudo}</span>
                              </div>
                              <span>•</span>
                              <span>{talk.room.title}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {formatDistanceToNow(new Date(talk.created_at), { addSuffix: true, locale: fr })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 pt-3 border-t border-zinc-800">
                          <div className="flex items-center gap-2 text-zinc-400">
                            <Heart size={16} className="text-red-400" />
                            <span className="text-sm">{talk._count.likes}</span>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400">
                            <MessageSquare size={16} className="text-blue-400" />
                            <span className="text-sm">{talk._count.messages}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {talksTotalPages > 1 && (
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setTalksPage(p => Math.max(1, p - 1))}
                    disabled={talksPage === 1}
                  >
                    Précédent
                  </Button>
                  <span className="flex items-center px-4 text-zinc-400">
                    Page {talksPage} sur {talksTotalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setTalksPage(p => Math.min(talksTotalPages, p + 1))}
                    disabled={talksPage === talksTotalPages}
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* MESSAGES TAB */}
        <TabsContent value="messages" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">Total</p>
                    <p className="text-3xl font-bold text-white">{messageStats.total}</p>
                  </div>
                  <Mail size={32} className="text-zinc-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">Nouveaux</p>
                    <p className="text-3xl font-bold text-blue-400">{messageStats.nouveau}</p>
                  </div>
                  <AlertTriangle size={32} className="text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">Lus</p>
                    <p className="text-3xl font-bold text-yellow-400">{messageStats.lu}</p>
                  </div>
                  <Eye size={32} className="text-yellow-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">Traités</p>
                    <p className="text-3xl font-bold text-green-400">{messageStats.traité}</p>
                  </div>
                  <CheckCircle size={32} className="text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Messages List */}
          {messages?.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Mail size={48} className="mx-auto text-zinc-500 mb-4" />
                <h3 className="text-lg font-semibold text-zinc-300 mb-2">
                  Aucun message
                </h3>
                <p className="text-zinc-500">
                  Aucun message de contact n'a été reçu pour le moment.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {messages?.map((message, index) => {
                const statusInfo = statusConfig[message.status as keyof typeof statusConfig]
                const StatusIcon = statusInfo.icon
                
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="card-hover">
                      <CardHeader 
                        onClick={() => setSelectedMessage(selectedMessage?.id === message.id ? null : message)}
                        className="hover:bg-zinc-800/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-white text-lg">
                                {message.subject}
                              </h4>
                              <Badge className={`${statusInfo.color} text-white`}>
                                <StatusIcon size={12} className="mr-1" />
                                {statusInfo.label}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-zinc-400 mb-3">
                              <span className="font-medium">{message.name}</span>
                              <span>{message.email}</span>
                              <div className="flex items-center space-x-1">
                                <Clock size={14} />
                                <span>
                                  {formatDistanceToNow(new Date(message.created_at), { 
                                    addSuffix: true, 
                                    locale: fr 
                                  })}
                                </span>
                              </div>
                            </div>
                            {/* Afficher un extrait du message */}
                            <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">
                              {message.message}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedMessage(selectedMessage?.id === message.id ? null : message)
                              }}
                            >
                              {selectedMessage?.id === message.id ? 'Fermer' : 'Voir'}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteMessage(message.id)
                              }}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>

                      {selectedMessage?.id === message.id && (
                        <CardContent className="border-t border-zinc-800">
                          <div className="space-y-6">
                            <div>
                              <h5 className="font-medium text-white mb-2">Message complet</h5>
                              <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                {message.message}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-800">
                              <span className="text-sm text-zinc-400">Changer le statut :</span>
                              {Object.entries(statusConfig).map(([status, config]) => {
                                const Icon = config.icon
                                return (
                                  <Button
                                    key={status}
                                    variant={message.status === status ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => updateMessageStatus(message.id, status)}
                                    disabled={message.status === status}
                                  >
                                    <Icon size={14} className="mr-1" />
                                    {config.label}
                                  </Button>
                                )
                              })}
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}
