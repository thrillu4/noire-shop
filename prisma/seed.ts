import { withAccelerate } from '@prisma/extension-accelerate'
import { Prisma, PrismaClient } from './generated/prisma'

const prisma = new PrismaClient().$extends(withAccelerate())

const data: Prisma.ProductCreateInput[] = [
	{
		title: 'Nike Air Pro',
		price: 299,
	},
	{
		title: 'Adidas Yezzy',
		price: 210,
	},
	{
		title: 'Puma V2',
		price: 201,
	},
]

export const seed = async () => {
	for (const product of data) {
		await prisma.product.create({ data: product })
	}
}

seed().then(() => prisma.$disconnect())
