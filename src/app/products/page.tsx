import { AddToCartButton } from "@/components/Products/AddToCartButton";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/sessions";
import React from "react";

const page = async () => {
  const session = await verifySession();
  const products = await prisma.product.findMany({
    take: 5,
    include: {
      variants: true,
      images: true,
    },
  });

  return (
    <div>
      {products.map((pr) => (
        <div key={pr.id}>
          {pr.title}
          <div>{pr.price}</div>
          <AddToCartButton product={pr} userId={session.userId || ""} />
        </div>
      ))}
    </div>
  );
};

export default page;
