'use client'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import AddReviewForm from '@/components/Reviews/AddReviewForm'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/routes'
import { ListRestart, LoaderCircle, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Review } from '../../../../prisma/generated/prisma'

export default function CustomerReviewsPage() {
  const [take, setTake] = useState(8)
  const [end, setEnd] = useState(false)
  const [reviews, setReviews] = useState<Omit<Review, 'id' | 'createdAt'>[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const fetchReviews = async () => {
      const response = await fetch(`${ROUTES.GET_REVIEWS}?take=${take}`)
      if (!response.ok) throw new Error('Failed to load reviews')
      const reviews = await response.json()
      setReviews(reviews.reviews)
      if (take > reviews.reviews.length) {
        setEnd(true)
      }
      setLoading(false)
    }
    fetchReviews()
  }, [take])

  return (
    <div className="mb-20 px-2">
      <Breadcrumbs />
      <h1 className="mt-5 mb-5 text-center text-2xl font-bold lg:text-3xl">
        Customer Reviews
      </h1>

      <div className="mx-auto grid max-w-xl gap-6 md:grid-cols-2 lg:max-w-5xl lg:grid-cols-3 2xl:max-w-none 2xl:grid-cols-4">
        {reviews.map((review, index) => (
          <Card
            key={index}
            className="px-2 py-5 shadow-sm transition hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarFallback>{review.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{review.name}</CardTitle>
                <p className="text-sm text-gray-500">{review.country}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="leading-relaxed text-gray-700">{review.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {!end && (
        <Button
          onClick={() => setTake(state => state + 8)}
          variant={'outline'}
          className="mx-auto mt-4 flex w-full max-w-lg justify-center"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <ListRestart />
              Show More
            </>
          )}
        </Button>
      )}
      <div className="mt-12 text-center">
        <AddReviewForm setTake={setTake} />
      </div>
    </div>
  )
}
