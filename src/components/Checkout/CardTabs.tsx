import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CardSchema, CardType } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
const CardTabs = () => {
  const form = useForm<CardType>({
    resolver: zodResolver(CardSchema),
    defaultValues: { cardNumber: '', expiry: '', cvv: '' },
  })
  const onSubmit = (data: CardType) => {
    console.log('Payment Data', data)
    alert('Mock payment processed!')
  }
  return (
    <Tabs defaultValue="master">
      <TabsList>
        <TabsTrigger value="master">
          <Image src="/master.png" alt="master card" width={20} height={8} />{' '}
          Master Card
        </TabsTrigger>
        <TabsTrigger value="visa">
          <Image src="/visa.png" alt="master card" width={20} height={8} /> Visa
        </TabsTrigger>
      </TabsList>

      <TabsContent value="master">
        <div className="rounded-2xl border bg-black p-5 pb-10 text-white">
          <div className="flex-1">
            <h3 className="mb-10 text-lg font-bold">
              <Image
                src="/master.png"
                alt="master card"
                width={50}
                height={50}
              />
            </h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Card Number"
                          maxLength={16}
                          {...field}
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
                          <Input placeholder="MM/YY" maxLength={5} {...field} />
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
                          <Input placeholder="CVV" maxLength={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="visa">
        <div className="rounded-2xl border bg-blue-900 p-5 pb-10 text-white">
          <div className="flex-1">
            <h3 className="mb-4 text-lg font-bold">
              <Image src="/visa.png" alt="master card" width={50} height={8} />
            </h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Card Number"
                          maxLength={16}
                          {...field}
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
                          <Input placeholder="MM/YY" maxLength={5} {...field} />
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
                          <Input placeholder="CVV" maxLength={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default CardTabs
