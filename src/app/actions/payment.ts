'use server'
import prisma from '@/lib/prisma'
import { CardType, OrderItemData } from '@/lib/types'

export async function payment(
  currentOrder: OrderItemData | null,
  data: CardType,
) {
  if (!currentOrder) throw new Error('Please fill contact information')

  if (!data) throw new Error('Please select payment method')

  const order = await prisma.order.findUnique({
    where: { id: currentOrder.id },
  })

  if (!order) throw new Error('Your order not found, please try create new one')

  const cod = 2.5

  const updatedOrder = await prisma.order.update({
    where: { id: order.id },
    data: {
      status: 'paid',
      paymentMethod: data.paymentMethod,
      total: data.paymentMethod === 'card' ? order.total : order.total + cod,
    },
  })

  if (!updatedOrder) throw new Error('Failed to confirm agreement')

  return updatedOrder
}
