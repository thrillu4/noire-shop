'use client'
import { updateProfileInfo } from '@/app/actions/updateProfileInfo'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ProfileEditSchema, ProfileEditType } from '@/lib/types'
import { useUserState } from '@/store/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
const EditProfile = () => {
  const { currentUser, getUser, setCurrentUser } = useUserState()

  useEffect(() => {
    getUser()
  }, [getUser])

  const form = useForm<ProfileEditType>({
    resolver: zodResolver(ProfileEditSchema),
    values: {
      email: currentUser?.email || '',
      name: currentUser?.name || '',
    },
  })

  async function onSubmit(values: ProfileEditType) {
    const updatedUser = await updateProfileInfo(currentUser, values)
    setCurrentUser(updatedUser)
    toast.success('User profile updated successfully', {
      description: new Date().toLocaleString(),
    })
  }

  return (
    <div className="mt-10 mb-20 px-3">
      <Form {...form}>
        <div className="mt-4 font-bold">Profile Edit</div>
        <div className="mb-5 text-sm opacity-65">
          Here you can change your user information
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={!form.formState.isDirty}
            type="submit"
            className="w-full"
          >
            Edit Profile
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default EditProfile
