import { Skeleton } from '../ui/skeleton'

const LoadingBlockSkeleton = () => {
  return (
    <Skeleton className="flex h-[50vh] w-full items-center justify-center">
      <div className="h-18 w-18 animate-spin rounded-full border-t-2 border-b-2 border-gray-900" />
    </Skeleton>
  )
}

export default LoadingBlockSkeleton
