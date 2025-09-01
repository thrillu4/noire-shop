"use client";

import { ProductWithRelations } from "@/lib/types";
import { useCartStore } from "@/store/store";

export function AddToCartButton({
  userId,
  product,
}: {
  userId: string;
  product: ProductWithRelations;
}) {
  const addItemToCart = useCartStore((state) => state.addItemToCart);
  const itemToAdd = {
    product,
    quantity: 1,
    size: product.variants[0]?.size || "M",
  };
  return (
    <button
      onClick={() => addItemToCart(userId, itemToAdd)}
      className="rounded bg-black px-4 py-2 text-white"
    >
      Add to cart
    </button>
  );
}
