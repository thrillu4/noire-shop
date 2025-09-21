'use client'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import ChangePassword from '@/components/Profile/ChangePassword'
import EditProfile from '@/components/Profile/EditProfile'
import MyOrders from '@/components/Profile/MyOrders'
import { ROUTES } from '@/routes'
import {
  ClipboardClock,
  Heart,
  KeyRound,
  LogOut,
  ShoppingCart,
  UserRoundPen,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { logout } from '../actions/auth'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const tabs = [
    { title: 'Edit Profile', state: 'profile', icon: <UserRoundPen /> },
    { title: 'Password', state: 'password', icon: <KeyRound /> },
    { title: 'My Cart', state: 'cart', icon: <ShoppingCart /> },
    { title: 'Wish List', state: 'wish', icon: <Heart /> },
    { title: 'My Orders', state: 'orders', icon: <ClipboardClock /> },
    { title: 'Log Out', state: 'logout', icon: <LogOut /> },
  ]
  const router = useRouter()
  const handleClick = (state: string) => {
    if (state === 'cart') {
      router.push(ROUTES.CART)
    } else if (state === 'wish') {
      router.push(ROUTES.WISHLIST)
    } else if (state === 'logout') {
      logout()
    }
    setActiveTab(state)
  }

  return (
    <div className="mb-20 px-3">
      <Breadcrumbs />
      <h1 className="mt-3 text-2xl font-extrabold">My Profile</h1>
      <div className="mx-auto mt-8 mb-4 grid max-w-lg grid-cols-2 gap-2 sm:max-w-xl sm:grid-cols-3">
        {tabs.map(tab => (
          <div
            className={`${tab.state === activeTab && 'border-black'} flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 p-3 text-center transition duration-150 hover:scale-105`}
            key={tab.state}
            onClick={() => handleClick(tab.state)}
          >
            {tab.icon}
            {tab.title}
          </div>
        ))}
      </div>
      {activeTab === 'profile' && <EditProfile />}
      {activeTab === 'password' && <ChangePassword />}
      {activeTab === 'orders' && <MyOrders />}
    </div>
  )
}

export default Profile
