'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

type StarRatingProps = {
  value?: number
  onChange: (value: number) => void
}

export function StarRating({ value = 0, onChange }: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1
        return (
          <Star
            key={i}
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
            className={`h-8 w-8 cursor-pointer transition ${
              (hover ?? value) >= starValue
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        )
      })}
    </div>
  )
}
