'use client'
import { checkout } from '@/app/actions/checkout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import YourOrder from '@/components/Checkout/YourOrder'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CheckoutDatatype, CheckoutFormSchema } from '@/lib/types'
import { useCartStore } from '@/store/cart'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard } from 'lucide-react'
import { useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const Checkout = () => {
  const form = useForm<CheckoutDatatype>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      country: '',
      city: '',
      address: '',
    },
  })

  const { items, isAuthenticated } = useCartStore()

  async function onSubmit(data: CheckoutDatatype) {
    try {
      await checkout(data, items, isAuthenticated.userId)
      form.reset()
    } catch (error) {
      console.log('Failed to submit data to database', error)
    }
  }

  return (
    <div className="px-2">
      <Breadcrumbs />
      <h2 className="mt-4 text-2xl font-extrabold">Checkout</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-3 mb-30 space-y-6"
        >
          <div className="font-bold">Contact Information</div>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PhoneInput
                    international
                    defaultCountry="UA"
                    {...field}
                    className="w-full rounded-lg border p-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="font-bold">Shipping address</div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <YourOrder />
          <Button type="submit" className="mt-3 w-full gap-2">
            <CreditCard /> Proceed to Payment
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Checkout
