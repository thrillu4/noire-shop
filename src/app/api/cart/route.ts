import { verifySession } from "@/lib/sessions";
import { getUserCart } from "@/services/getUserCart";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await verifySession();

  if (!session.isAuth || !session.userId) {
    return NextResponse.json({ cart: null }, { status: 401 });
  }

  const cart = await getUserCart(session.userId);
  return NextResponse.json(cart);
}
