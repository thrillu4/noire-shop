'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ReviewFormSchema, ReviewType } from '@/lib/types'
import { ROUTES } from '@/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { StarRating } from './StarRating'
import { toast } from 'sonner'

const AddReviewForm = ({
  setTake,
}: {
  setTake: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ReviewType>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      name: '',
      country: '',
      rating: 0,
      text: '',
    },
  })

  async function onSubmit(values: ReviewType) {
    setLoading(true)
    const response = await fetch(ROUTES.POST_REVIEWS_ADD, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ values }),
    })

    if (!response.ok) throw new Error('Failed to leave a review')

    setTake(state => state + 1)
    form.reset()
    setOpen(false)
    setLoading(false)
    toast.success('Thank for your feedback!')
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger className="rounded-xl bg-black px-6 py-3 text-white shadow transition hover:bg-gray-800">
        Leave a Review
      </DialogTrigger>
      <DialogContent className="mx-auto max-w-lg">
        <DialogHeader>
          <DialogTitle>Write a review</DialogTitle>
          <div className="mt-7">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your rating</FormLabel>
                      <FormControl>
                        <StarRating
                          value={field.value}
                          onChange={val => form.setValue('rating', val)}
                        />
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
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Germany" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your review..."
                          className="resize-none"
                          maxLength={100}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {loading ? 'Submitting...' : 'Submit Review'}
                </Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddReviewForm
