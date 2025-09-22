'use client'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { FormState, signin, signup } from '@/app/actions/auth'
import { ROUTES } from '@/routes'
import { Eye, EyeOff, User } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'
import TermsConditionsDialog from '../TermsConditionsDialog'
import { Checkbox } from '../ui/checkbox'
import ForgotPasswordDialog from './ForgotPasswordDialog'

const UserDrawer = ({ isAuth }: { isAuth: boolean }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [showPassword, setShoPassword] = useState(false)

  const [isSignIn, setIsSignIn] = useState(true)
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    signup,
    { success: false, errors: {}, fields: {} },
  )
  const signIn = useActionState<FormState, FormData>(signin, {
    success: false,
    errors: {},
    fields: {},
  })

  if (isAuth) {
    return (
      <button
        disabled={pathname === ROUTES.SIGNIN}
        onClick={() => router.push(ROUTES.PROFILE)}
      >
        <div className="group flex items-center">
          <span className="hidden cursor-pointer rounded-full border-4 border-black bg-white px-4 py-2 text-sm font-bold text-black transition-all duration-300 lg:group-hover:inline-block">
            Profile
          </span>
          <div className="cursor-pointer rounded-full border-4 border-black bg-black p-2 text-white transition-all duration-300 hover:bg-white hover:text-black">
            <User className="h-auto w-4 hover:text-black lg:w-5" />
          </div>
        </div>
      </button>
    )
  }

  if (pathname === ROUTES.SIGNIN || pathname === ROUTES.SIGNUP) return null

  return (
    <>
      {!isSignIn ? (
        <Sheet>
          <SheetTrigger asChild>
            <div className="group flex items-center">
              <span className="hidden cursor-pointer rounded-full border-4 border-black bg-white px-4 py-2 text-sm font-bold text-black transition-all duration-300 lg:group-hover:inline-block">
                Profile
              </span>
              <div className="cursor-pointer rounded-full border-4 border-black bg-black p-2 text-white transition-all duration-300 hover:bg-white hover:text-black">
                <User className="h-auto w-4 hover:text-black lg:w-5" />
              </div>
            </div>
          </SheetTrigger>
          <SheetContent className="max-w-md overflow-y-auto pt-10 pb-5 sm:max-w-lg">
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <SheetHeader>
                <SheetTitle className="text-center">Register</SheetTitle>
                <SheetDescription className="text-xs lg:text-sm">
                  Fill out the form to find out more and become one of the NOIRÉ
                  trends.
                </SheetDescription>
              </SheetHeader>

              <form
                action={formAction}
                className="flex w-full max-w-sm flex-col gap-4 px-4"
              >
                <div className="w-full">
                  <Label htmlFor="username">Name</Label>
                  <Input
                    className="mt-2"
                    id="username"
                    placeholder="Jane Doe"
                    name="username"
                    defaultValue={state.fields?.username || ''}
                  />
                  {state?.errors?.name && (
                    <p className="text-xs text-red-600 lg:text-sm">
                      {state.errors.name}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    className="mt-2"
                    id="reg-email"
                    placeholder="yourmail@email.com"
                    name="email"
                    defaultValue={state.fields?.email || ''}
                  />
                  {state?.errors?.email && (
                    <p className="text-xs text-red-600 lg:text-sm">
                      {state.errors.email}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="reg-password">Password</Label>
                  <div className="relative mt-2">
                    <Input
                      id="reg-password"
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
                    <p className="text-xs text-red-600 lg:text-sm">
                      {state.errors.password}
                    </p>
                  )}
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms-2"
                    name="checkbox"
                    className="border-zinc-700"
                    defaultChecked={
                      state?.fields?.checkbox === 'on' ? true : false
                    }
                  />
                  <div className="grid gap-2">
                    <Label htmlFor="terms-2" className="text-xs">
                      Accept terms and conditions
                    </Label>
                    <p className="text-muted-foreground text-[10px]">
                      By clicking this checkbox, you agree to the{' '}
                      <TermsConditionsDialog />
                    </p>
                    {state?.errors?.checkbox && (
                      <p className="text-xs text-red-600 lg:text-sm">
                        {state.errors.checkbox}
                      </p>
                    )}
                  </div>
                </div>
                <SheetFooter>
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="cursor-pointer"
                  >
                    {isPending ? 'Signing up...' : 'Create Account'}
                  </Button>
                  {state?.errors?.server && (
                    <p className="text-xs text-red-600 lg:text-sm">
                      {state.errors.server}
                    </p>
                  )}
                </SheetFooter>
              </form>
              <div className="w-full border opacity-60" />
              <div>Already have an account?</div>
              <Button
                onClick={() => setIsSignIn(true)}
                className="cursor-pointer border-2 border-black bg-white text-black hover:text-white"
              >
                Sign In
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <div className="group flex items-center">
              <span className="hidden cursor-pointer rounded-full border-4 border-black bg-white px-4 py-2 text-sm font-bold text-black transition-all duration-300 lg:group-hover:inline-block">
                Profile
              </span>
              <div className="cursor-pointer rounded-full border-4 border-black bg-black p-2 text-white transition-all duration-300 hover:bg-white hover:text-black">
                <User className="h-auto w-4 hover:text-black lg:w-5" />
              </div>
            </div>
          </SheetTrigger>
          <SheetContent className="max-w-md overflow-y-auto pt-10 pb-5 sm:max-w-lg">
            <div className="flex w-full flex-col items-center justify-center gap-6">
              <SheetHeader>
                <SheetTitle className="text-center">Sign In</SheetTitle>
                <SheetDescription>Explore fashion with NOIRÉ</SheetDescription>
              </SheetHeader>

              <form
                action={signIn[1]}
                className="flex w-full max-w-sm flex-col gap-4"
              >
                <div className="w-full px-4">
                  <Label htmlFor="sheet-demo-email">Email</Label>
                  <Input
                    className="mt-2"
                    id="sheet-demo-email"
                    placeholder="yourmail@email.com"
                    name="email"
                    defaultValue={signIn[0].fields?.email || ''}
                  />
                  {signIn[0]?.errors?.email && (
                    <p className="text-xs text-red-600 lg:text-sm">
                      {signIn[0].errors.email}
                    </p>
                  )}
                </div>

                <div className="w-full px-4">
                  <Label htmlFor="sheet-demo-password">Password</Label>
                  <div className="relative mt-2">
                    <Input
                      id="sheet-demo-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="*******"
                      className="relative"
                      name="password"
                      defaultValue={signIn[0].fields?.password || ''}
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
                  {signIn[0]?.errors?.password && (
                    <p className="text-xs text-red-600 lg:text-sm">
                      {signIn[0].errors.password}
                    </p>
                  )}
                </div>
                <ForgotPasswordDialog />

                <SheetFooter>
                  <Button
                    disabled={signIn[2]}
                    type="submit"
                    className="cursor-pointer"
                  >
                    {signIn[2] ? 'Signing up...' : 'Sign In'}
                  </Button>
                  {signIn[0].errors?.server && (
                    <p className="text-xs text-red-600 lg:text-sm">
                      {signIn[0].errors.server}
                    </p>
                  )}
                </SheetFooter>
              </form>
              <div className="w-full border opacity-60" />
              <div>Don&apos;t have an account?</div>
              <Button
                onClick={() => setIsSignIn(false)}
                className="cursor-pointer border-2 border-black bg-white text-black hover:text-white"
              >
                Create account
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}

export default UserDrawer
