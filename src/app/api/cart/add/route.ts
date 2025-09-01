import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/sessions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await verifySession();

  if (!session.isAuth || !session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { product, size, quantity } = body;

  if (!product || !quantity || !size) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  let cart = await prisma.cart.findFirst({
    where: { userId: session.userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: session.userId },
    });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      size,
      productId: product.id,
    },
  });

  let cartItem;

  if (existingItem) {
    cartItem = await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
      include: {
        product: {
          include: {
            images: true,
            variants: true,
          },
        },
      },
    });
  } else {
    cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        quantity,
        size,
        productId: product.id,
      },
      include: {
        product: {
          include: {
            images: true,
            variants: true,
          },
        },
      },
    });
  }

  return NextResponse.json(cartItem);
}
