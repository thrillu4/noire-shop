import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('rounded-md bg-gray-100 opacity-60', className)}
      {...props}
    />
  )
}

export { Skeleton }
