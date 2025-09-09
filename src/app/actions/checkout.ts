'use server'
import prisma from '@/lib/prisma'
import { CartItemData, CheckoutDatatype, CheckoutFormSchema } from '@/lib/types'

export async function checkout(
  data: CheckoutDatatype,
  items: CartItemData[],
  userId: string | null,
) {
  const parsed = CheckoutFormSchema.parse(data)

  if (!items || items.length === 0) {
    throw new Error('Cart is empty')
  }

  const productsId = items.map(item => item.productId)
  const products = await prisma.product.findMany({
    where: { id: { in: productsId } },
    select: { id: true, price: true },
  })

  let subtotal = 0

  for (const item of items) {
    const product = products.find(p => p.id === item.productId)
    if (!product) throw new Error(`Product ${item.productId} not found!`)
    subtotal += Number(product.price) * item.quantity
  }

  const shipping = 10
  const total = subtotal + shipping

  const order = await prisma.order.create({
    data: {
      total,
      userId,
      fullName: parsed.fullName,
      phone: parsed.phone,
      country: parsed.country,
      paymentMethod: '',
      city: parsed.city,
      address: parsed.address,
      orderItems: {
        create: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          price: item.product.price,
        })),
      },
    },
    include: { orderItems: true },
  })
  return order
}
