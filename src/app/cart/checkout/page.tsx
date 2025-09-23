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
import { ROUTES } from '@/routes'
import { useCartStore } from '@/store/cart'
import { useOrderStore } from '@/store/order'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const Checkout = () => {
  const router = useRouter()
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
  const [loading, setLoading] = useState(false)
  const { setCurrentOrder } = useOrderStore()

  async function onSubmit(data: CheckoutDatatype) {
    setLoading(true)
    try {
      const order = await checkout(data, items, isAuthenticated.userId)
      setCurrentOrder({
        address: order.address,
        id: order.id,
        total: order.total,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        paymentMethod: order.paymentMethod,
        status: order.status,
        userId: order.userId,
        fullName: order.fullName,
        phone: order.phone,
        country: order.country,
        city: order.city,
      })
      router.push(ROUTES.PAYMENT)
    } catch (error) {
      console.log('Failed to submit data to database', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-2">
      <Breadcrumbs />
      <h2 className="mt-4 text-2xl font-extrabold lg:text-3xl xl:text-4xl">
        Checkout
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mt-8 mb-30 max-w-lg space-y-6 sm:max-w-xl md:max-w-4xl"
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
            <CreditCard />
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Checkout
