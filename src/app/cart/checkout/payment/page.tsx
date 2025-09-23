'use client'
import { payment } from '@/app/actions/payment'
import { Breadcrumbs } from '@/components/Breadcrumbs'

import YourInfo from '@/components/Checkout/YourInfo'
import YourOrder from '@/components/Checkout/YourOrder'
import TermsConditionsDialog from '@/components/TermsConditionsDialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CardSchema, CardType } from '@/lib/types'
import { ROUTES } from '@/routes'
import { useCartStore } from '@/store/cart'
import { useOrderStore } from '@/store/order'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard, Nfc, PackageOpen, Truck } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

const Payment = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const { clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)

  const { setCurrentOrder } = useOrderStore()
  const { currentOrder } = useOrderStore()
  const form = useForm<CardType>({
    resolver: zodResolver(CardSchema),
    defaultValues: {
      paymentMethod: 'card',
      cardNumber: '',
      expiry: '',
      cvv: '',
      checkbox: false,
    },
  })

  const onSubmit = async (data: CardType) => {
    setLoading(true)
    const success = await payment(currentOrder, data)
    if (success) {
      setCurrentOrder(success)
      clearCart()
      router.push(ROUTES.PAYMENT_SUCCESS)
      setLoading(false)
    }
  }

  return (
    <div className="mb-20 px-2">
      <Breadcrumbs />
      <h2 className="mt-4 text-2xl font-extrabold lg:text-3xl">
        Payment & Delivery
      </h2>

      <h3 className="mt-5 mb-2 font-bold">Payment method</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-lg sm:max-w-xl md:max-w-4xl"
        >
          <div className="mx-auto mt-8 mb-10 max-w-lg sm:max-w-xl md:max-w-4xl">
            <RadioGroup
              defaultValue="card"
              onValueChange={(val: 'card' | 'delivery') =>
                form.setValue('paymentMethod', val)
              }
            >
              <Label htmlFor="r1" className="flex justify-between">
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    value="card"
                    className="border-black"
                    id="r1"
                    onClick={() => setIsOpen(true)}
                  />
                  <CreditCard /> Credit or Debit Card
                </div>
                <div className="flex items-center gap-2">
                  <Truck /> <span className="text-sm text-green-600">Free</span>
                </div>
              </Label>
              {isOpen && (
                <Tabs defaultValue="master" className="max-w-sm">
                  <TabsList>
                    <TabsTrigger value="master">
                      <Image
                        src="/master.png"
                        alt="master card"
                        width={20}
                        height={8}
                      />{' '}
                      Master Card
                    </TabsTrigger>
                    <TabsTrigger value="visa">
                      <Image
                        src="/visa.png"
                        alt="master card"
                        width={20}
                        height={8}
                      />{' '}
                      Visa
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="master">
                    <div className="rounded-2xl border bg-black p-5 pb-10 text-white">
                      <div className="flex-1">
                        <h3 className="mb-10 flex items-center justify-between text-lg font-bold">
                          <Image
                            src="/master.png"
                            alt="master card"
                            width={50}
                            height={50}
                          />
                          <Nfc />
                        </h3>
                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <PatternFormat
                                    {...field}
                                    customInput={Input}
                                    format="#### #### #### ####"
                                    mask="_"
                                    placeholder="1234 5678 9012 3456"
                                    className="font-mono tracking-widest"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex gap-4">
                            <FormField
                              control={form.control}
                              name="expiry"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <PatternFormat
                                      {...field}
                                      customInput={Input}
                                      format="##/##"
                                      placeholder="MM / YY"
                                      className="font-mono tracking-widest"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      placeholder="CVV"
                                      type="password"
                                      maxLength={3}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="visa">
                    <div className="rounded-2xl border bg-blue-900 p-5 pb-10 text-white">
                      <div className="flex-1">
                        <h3 className="mb-8 flex items-center justify-between text-lg font-bold">
                          <Image
                            src="/visa.png"
                            alt="master card"
                            width={50}
                            height={8}
                          />
                          <Nfc />
                        </h3>
                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <PatternFormat
                                    {...field}
                                    customInput={Input}
                                    format="#### #### #### ####"
                                    mask="_"
                                    placeholder="1234 5678 9012 3456"
                                    className="font-mono tracking-widest"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex gap-4">
                            <FormField
                              control={form.control}
                              name="expiry"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <PatternFormat
                                      {...field}
                                      customInput={Input}
                                      format="##/##"
                                      placeholder="MM / YY"
                                      className="font-mono tracking-widest"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      placeholder="CVV"
                                      type="password"
                                      maxLength={3}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
              <Label htmlFor="r2" className="flex justify-between">
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    value="delivery"
                    className="border-black"
                    id="r2"
                    onClick={() => setIsOpen(false)}
                  />
                  <PackageOpen /> Pay on delivery
                </div>
                <div className="flex items-center gap-2">
                  <Truck /> <span>$2.5</span>
                </div>
              </Label>
            </RadioGroup>
          </div>
          <div className="space-y-3">
            <YourInfo />
            <YourOrder cod={!isOpen} />
          </div>
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
                  <Label htmlFor="terms-2" className="text-xs">
                    Accept terms and conditions
                  </Label>
                  <p className="text-muted-foreground text-[10px]">
                    By clicking this checkbox, you agree to the{' '}
                    <TermsConditionsDialog />
                  </p>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="my-8 w-full">
            {loading ? 'Processing...' : 'Confirm Your Agreement'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Payment
