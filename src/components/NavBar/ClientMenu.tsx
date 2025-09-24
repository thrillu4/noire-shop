'use client'
import { ROUTES } from '@/routes'
import { useEffect, useState } from 'react'
import Hamburger from './Hamburger'

const ClientMenu = () => {
  const [session, setSession] = useState<{
    isAuth: boolean
    userId: string | null
  }>({
    isAuth: false,
    userId: null,
  })
  useEffect(() => {
    fetch(ROUTES.GET_SESSION)
      .then(res => res.json())
      .then(data => setSession(data))
  }, [])

  return (
    <div className="flex-1">
      <Hamburger isAuth={session.isAuth} userId={session.userId} />
    </div>
  )
}

export default ClientMenu
