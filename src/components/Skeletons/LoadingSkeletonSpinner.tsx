import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LoadingSkeletonSpinner = () => {
  return (
    <Skeleton className="fixed top-0 z-50 h-full w-screen">
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-22 w-22 animate-spin rounded-full border-t-2 border-b-2 border-gray-900" />
      </div>
    </Skeleton>
  )
}

export default LoadingSkeletonSpinner
