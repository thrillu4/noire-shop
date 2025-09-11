import prisma from '@/lib/prisma'

export async function orderDetails(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
  })
  if (!order) throw new Error('Order not found!')

  const orderItems = await prisma.orderItem.findMany({
    where: { orderId: order.id },
    include: {
      product: {
        include: {
          images: {
            take: 1,
          },
        },
      },
    },
  })

  if (!orderItems) throw new Error('Orders items not found')

  return { order, orderItems }
}
