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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { ForgotPasswordSchema, ForgotPasswordType } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState } from 'react'
import { toast } from 'sonner'

const ForgotPasswordDialog = () => {
  const [open, setOpen] = useState(false)
  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit() {
    toast.message('A password reset link has been sent to your email address')
    form.reset()
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mt-2 cursor-pointer px-4 text-xs underline opacity-60">
        Forgot your password?
      </DialogTrigger>

      <DialogContent className="max-w-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reset password</DialogTitle>
          <DialogDescription>
            We’ll send you an email with a link to create a new password
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="Email"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="cursor-pointer lg:mx-auto">
                Send reset link
              </Button>
            </DialogFooter>
            <DialogClose asChild>
              <div className="cursor-pointer text-center underline">
                Back to Sign in
              </div>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ForgotPasswordDialog
