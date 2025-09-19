import { Skeleton } from '@/components/ui/skeleton'

const ProductsSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[240px] w-[144px]" />
      <Skeleton className="h-[240px] w-[144px]" />
      <Skeleton className="h-[240px] w-[144px]" />
      <Skeleton className="h-[240px] w-[144px]" />
      <Skeleton className="h-[240px] w-[144px]" />
    </>
  )
}

export default ProductsSkeleton
