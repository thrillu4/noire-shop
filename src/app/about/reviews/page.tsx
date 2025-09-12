import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { reviewsData } from '@/lib/reviews-data'
import { Star } from 'lucide-react'

export default function CustomerReviewsPage() {
  return (
    <div className="mb-20 px-2">
      <Breadcrumbs />
      <h1 className="mt-3 mb-10 text-2xl font-bold">Customer Reviews</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviewsData.map((review, index) => (
          <Card
            key={index}
            className="px-2 py-5 shadow-sm transition hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={review.avatar} alt={review.name} />
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

      <div className="mt-12 text-center">
        <button className="rounded-xl bg-black px-6 py-3 text-white shadow transition hover:bg-gray-800">
          Leave a Review
        </button>
      </div>
    </div>
  )
}
