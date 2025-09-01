import prisma from "@/lib/prisma";

export const getUserCart = async (userId: string) => {
  return await prisma.cart.findFirst({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: { images: true, variants: true },
          },
        },
      },
    },
  });
};
