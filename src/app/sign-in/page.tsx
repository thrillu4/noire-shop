'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'
import { useActionState, useState } from 'react'
import { FormState, signin } from '../actions/auth'
import { ROUTES } from '@/routes'
import { useRouter } from 'next/navigation'
import ForgotPasswordDialog from '@/components/NavBar/ForgotPasswordDialog'

const SignIn = () => {
  const [showPassword, setShoPassword] = useState(false)
  const router = useRouter()
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    signin,
    {
      success: false,
      errors: {},
      fields: {},
    },
  )
  return (
    <div className="mx-auto my-6 flex min-h-[80vh] max-w-lg flex-col justify-center gap-5 px-5 text-center">
      <h2 className="text-2xl font-bold">Sign In</h2>
      <div>Explore fashion with NOIRÉ</div>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="w-full">
          <Label htmlFor="sheet-demo-email">Email</Label>
          <Input
            className="mt-2"
            id="sheet-demo-email"
            placeholder="yourmail@email.com"
            name="email"
            defaultValue={state.fields?.email || ''}
          />
          {state?.errors?.email && (
            <p className="text-left text-xs text-red-600">
              {state.errors.email}
            </p>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="sheet-demo-password">Password</Label>
          <div className="relative mt-2">
            <Input
              id="sheet-demo-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="*******"
              className="relative"
              name="password"
              defaultValue={state.fields?.password || ''}
            />
            {showPassword ? (
              <EyeOff
                size={17}
                className="absolute top-1/2 right-2 -translate-y-1/2"
                onClick={() => setShoPassword(!showPassword)}
              />
            ) : (
              <Eye
                size={17}
                className="absolute top-1/2 right-2 -translate-y-1/2"
                onClick={() => setShoPassword(!showPassword)}
              />
            )}
          </div>
          {state?.errors?.password && (
            <p className="text-left text-xs text-red-600">
              {state.errors.password}
            </p>
          )}
        </div>
        <div className="text-left">
          <ForgotPasswordDialog />
        </div>

        <Button disabled={isPending} type="submit" className="cursor-pointer">
          {isPending ? 'Signing up...' : 'Sign In'}
        </Button>
        {state.errors?.server && (
          <p className="text-xs text-red-600">{state.errors.server}</p>
        )}
      </form>
      <div className="w-full border opacity-60" />
      <div>Don&apos;t have an account?</div>
      <Button
        onClick={() => router.push(ROUTES.SIGNUP)}
        className="cursor-pointer border-2 border-black bg-white text-black hover:text-white"
      >
        Create account
      </Button>
    </div>
  )
}

export default SignIn
