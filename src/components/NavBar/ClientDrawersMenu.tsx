'use client'
import { ROUTES } from '@/routes'
import { useEffect, useState } from 'react'
import CartDrawer from './CartDrawer'
import UserDrawer from './UserDrawer'
import WishListDrawer from './WishListDrawer'

const ClientDrawersMenu = ({ open }: { open: boolean }) => {
  const [session, setSession] = useState<{
    isAuth: null | boolean
    userId: null
  }>({
    isAuth: null,
    userId: null,
  })
  useEffect(() => {
    fetch(ROUTES.GET_SESSION)
      .then(res => res.json())
      .then(data => setSession(data))
      .catch(() => setSession({ isAuth: false, userId: null }))
  }, [])

  if (session.isAuth === null) {
    return null
  }
  return (
    <>
      <WishListDrawer userId={session.userId} open={open} />
      <CartDrawer isAuth={session.isAuth} userId={session.userId} />
      <UserDrawer isAuth={session.isAuth} />
    </>
  )
}

export default ClientDrawersMenu
