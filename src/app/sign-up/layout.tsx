import { verifySession } from '@/lib/sessions'
import { ROUTES } from '@/routes'
import { redirect } from 'next/navigation'

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await verifySession()

  if (session.userId) {
    redirect(ROUTES.PROFILE)
  }

  return <>{children}</>
}

export default layout
