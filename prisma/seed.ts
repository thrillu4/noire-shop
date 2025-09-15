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

  // 2️⃣ Products
  const products = []
  const genders = ['male', 'female']
  const types = ['t-shirt', 'dress', 'hoodie', 'jeans']
  const sizes = ['S', 'M', 'L', 'XL']
  for (let i = 0; i < 15; i++) {
    const product = await prisma.product.create({
      data: {
        gender: faker.helpers.arrayElement(genders),
        type: faker.helpers.arrayElement(types),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 100, dec: 2 })),
        collection: faker.commerce.department(),
        images: {
          create: [
            {
              url: faker.image.personPortrait({ sex: 'male' }),
            },
            { url: faker.image.personPortrait({ sex: 'female' }) },
          ],
        },
        variants: {
          create: sizes.map(size => ({
            size,
            stock: faker.number.float({ min: 5, max: 20 }),
          })),
        },
      },
    })
    products.push(product)
  }

  // 3️⃣ Carts
  const carts = []
  for (const user of users) {
    const cart = await prisma.cart.create({
      data: {
        userId: user.id,
        items: {
          create: [
            {
              productId: products[0].id,
              quantity: 2,
              size: 'M',
            },
            {
              productId: products[1].id,
              quantity: 1,
              size: 'S',
            },
          ],
        },
      },
    })
    carts.push(cart)
  }

  // 4️⃣ Wishlists
  const wishlists = []
  for (const user of users) {
    const wishlist = await prisma.wishlist.create({
      data: {
        userId: user.id,
        items: {
          create: [
            { productId: products[2].id },
            { productId: products[3].id },
          ],
        },
      },
    })
    wishlists.push(wishlist)
  }

  // 5️⃣ Orders
  const orders = []
  for (const user of users) {
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: 99.99,
        status: 'pending',
        paymentMethod: 'card',
        fullName: user.name,
        phone: faker.phone.number(),
        country: faker.location.country(),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        orderItems: {
          create: [
            {
              productId: products[0].id,
              quantity: 1,
              size: 'M',
              price: products[0].price,
            },
            {
              productId: products[1].id,
              quantity: 2,
              size: 'L',
              price: products[1].price,
            },
          ],
        },
      },
    })
    orders.push(order)
  }

  console.log('Seeding finished!')
}

seeds()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
