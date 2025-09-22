import { faker } from '@faker-js/faker'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate())

async function seeds() {
  console.log('Start seeding...')

  // 1️⃣ Users
  const users = []
  for (let i = 0; i < 3; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: '123321',
        name: faker.person.fullName(),
        role: 'user',
      },
    })
    users.push(user)
  }
  const products = []
  for (let i = 0; i < 50; i++) {
    const product = await prisma.product.create({
      data: {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 300 })),
        gender: faker.helpers.arrayElement(['male', 'female']),
        type: faker.helpers.arrayElement(['shirt', 'pants', 'shoes', 'hat']),
        collection: faker.helpers.arrayElement([
          'summer',
          'winter',
          'spring',
          'fall',
        ]),
        images: {
          create: [
            { url: `https://picsum.photos/seed/${i}/400/400` },
            { url: `https://picsum.photos/seed/${i + 100}/400/400` },
            { url: `https://picsum.photos/seed/${i + 200}/400/400` },
            { url: `https://picsum.photos/seed/${i + 300}/400/400` },
          ],
        },
        variants: {
          create: ['S', 'M', 'L', 'XL'].map(size => ({
            size,
            stock: faker.number.int({ min: 1, max: 50 }),
          })),
        },
      },
    })
    products.push(product)
  }

  // Заказы и OrderItems
  for (const user of users) {
    const numOrders = faker.number.int({ min: 1, max: 5 })
    for (let i = 0; i < numOrders; i++) {
      const order = await prisma.order.create({
        data: {
          userId: user.id,
          total: 0, // потом пересчитаем
          paymentMethod: faker.helpers.arrayElement(['card', 'paypal', 'cash']),
          status: faker.helpers.arrayElement([
            'pending',
            'paid',
            'shipped',
            'delivered',
          ]),
          fullName: user.name,
          phone: faker.phone.number(),
          country: faker.location.country(),
          city: faker.location.city(),
          address: faker.location.streetAddress(),
        },
      })

      const numItems = faker.number.int({ min: 1, max: 5 })
      let total = 0
      for (let j = 0; j < numItems; j++) {
        const product = faker.helpers.arrayElement(products)
        const price = product.price
        const quantity = faker.number.int({ min: 1, max: 3 })
        total += price * quantity

        await prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: product.id,
            quantity,
            size: faker.helpers.arrayElement(['S', 'M', 'L', 'XL']),
            price,
          },
        })
      }

      await prisma.order.update({
        where: { id: order.id },
        data: { total },
      })
    }
  }

  // Корзины и Wishlist (по аналогии)
  for (const user of users) {
    const cart = await prisma.cart.create({ data: { userId: user.id } })
    const wishlist = await prisma.wishlist.create({ data: { userId: user.id } })

    for (let i = 0; i < faker.number.int({ min: 1, max: 5 }); i++) {
      const product = faker.helpers.arrayElement(products)

      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          quantity: faker.number.int({ min: 1, max: 3 }),
          size: faker.helpers.arrayElement(['S', 'M', 'L', 'XL']),
        },
      })

      await prisma.wishlistItem.create({
        data: {
          wishlistId: wishlist.id,
          productId: product.id,
        },
      })
    }
  }

  // Отзывы
  for (let i = 0; i < 100; i++) {
    await prisma.review.create({
      data: {
        name: faker.person.fullName(),
        country: faker.location.country(),
        rating: faker.number.int({ min: 1, max: 5 }),
        text: faker.lorem.sentences(2),
      },
    })
  }

  console.log('Seed completed!')
}

seeds()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
