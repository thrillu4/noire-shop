import prisma from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany();
  return (
    <>
      <div className="text-4xl">Hello Next Js and Prisma!</div>
      <ul className="mb-[2000px]">
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <div>{product.price}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
