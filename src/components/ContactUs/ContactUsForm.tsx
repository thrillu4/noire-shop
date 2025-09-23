'use client'
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
import { ContactUsFormSchema, ContactUsType } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import TermsConditionsDialog from '../TermsConditionsDialog'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Mail, Phone } from 'lucide-react'
import { toast } from 'sonner'
const ContactUsForm = () => {
  const form = useForm<ContactUsType>({
    resolver: zodResolver(ContactUsFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      checkbox: false,
    },
  })

  function onSubmit(values: ContactUsType) {
    form.reset()
    toast.success(
      'Message sent successfully! Thank you. we will answer you soon.',
    )
  }
  return (
    <div className="mx-auto max-w-lg lg:max-w-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Enter your message"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkbox"
            render={({ field }) => (
              <FormItem className="mt-6 flex items-start gap-3 px-2">
                <FormControl>
                  <Checkbox
                    id="terms-2"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-zinc-700"
                  />
                </FormControl>
                <div className="grid gap-2">
                  <Label htmlFor="terms-2" className="text-xs xl:text-sm">
                    Accept terms and conditions
                  </Label>
                  <p className="text-muted-foreground text-[10px] xl:text-sm">
                    By clicking this checkbox, you agree to the{' '}
                    <TermsConditionsDialog />
                  </p>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="mx-auto block">
            Send Message
          </Button>
        </form>
      </Form>
      <div>
        <div className="mt-10 mb-4 font-bold">
          You can also Contact Us via:{' '}
        </div>
        <div className="flex flex-col justify-between gap-2 text-sm 2xl:text-base">
          <div className="flex items-center gap-3">
            <div className="rounded-full border p-2 font-bold">
              <Mail className="w-4" />
            </div>
            <a href="mailto:noire.shop.help@gmail.com">
              noire.shop.help@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full border p-2 font-bold">
              <Phone className="w-4" />
            </div>
            <a href="tel:+733213133884">+73 3213133884</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUsForm
