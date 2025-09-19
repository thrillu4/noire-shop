import { Skeleton } from '@/components/ui/skeleton'

const loading = () => {
  return (
    <Skeleton className="flex h-[80vh] w-full items-center justify-center">
      <div className="h-22 w-22 animate-spin rounded-full border-t-2 border-b-2 border-gray-900" />
    </Skeleton>
  )
}

export default loading
