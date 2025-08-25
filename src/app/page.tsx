import prisma from '@/lib/prisma'

export default async function Home() {
	const products = await prisma.product.findMany()
	return (
		<>
			<div className='text-8xl'>Hello Next Js and Prisma!</div>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
						<h2>{product.title}</h2>
						<div>{product.price}</div>
					</li>
				))}
			</ul>
		</>
	)
}
