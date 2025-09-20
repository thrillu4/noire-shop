'use client'
import React, { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { PasswordEditSchema, PasswordEditType } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { updatePassword } from '@/app/actions/updatePassword'
import { toast } from 'sonner'

const ChangePassword = () => {
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const form = useForm<PasswordEditType>({
    resolver: zodResolver(PasswordEditSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: PasswordEditType) {
    setLoading(true)
    const response = await updatePassword(values)

    if (!response.success) {
      setServerError(response.error || 'Something went wrong')
      setLoading(false)
      return
    }

    form.reset()
    setServerError(null)
    setLoading(false)
    toast.success('Password successfully changed', {
      description: new Date().toLocaleString(),
    })
  }

  return (
    <div className="mt-10 mb-20 px-3">
      <Form {...form}>
        <div className="mt-4 font-bold">Change Password</div>
        <div className="mb-5 text-sm opacity-65">
          Update your password below
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
                {serverError && (
                  <p className="text-sm text-red-500">{serverError}</p>
                )}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isDirty}
          >
            {loading ? 'Processing...' : 'Change Password'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ChangePassword
