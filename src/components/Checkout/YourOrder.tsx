import { useCartStore } from '@/store/cart'
import Image from 'next/image'
import React from 'react'

const YourOrder = () => {
  const { totalItems, items, totalPrice } = useCartStore()
  return (
    <div className="rounded-2xl border px-5 py-8">
      <div className="mb-7 flex items-center justify-between font-bold">
        <div>YOUR ORDER</div>
        <div className="text-blue-700">({totalItems()})</div>
      </div>
      <div className="flex flex-col gap-5">
        {items.map(item => (
          <div className="flex gap-3 text-sm" key={item.productId}>
            <div className="min-w-[115px]">
              <Image
                src={item.product.images[0].url}
                alt="product image"
                width={113}
                height={134}
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-1 font-bold">{item.product.title}</div>
                <div>
                  {item.product.type.toUpperCase()} /{' '}
                  <span className="font-bold">{item.size}</span>
                </div>
              </div>
              <div className="flex items-center justify-between font-bold">
                <div className="text-blue-700">({item.quantity})</div>
                <div>${item.product.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-3 border-t border-b py-3 font-bold">
        <div className="flex items-center justify-between">
          <div>Subtotal:</div>
          <div>${totalPrice()}</div>
        </div>
        <div className="flex items-center justify-between">
          <div>Shipping:</div>
          <div>$10</div>
        </div>
      </div>
      <div className="mt-10 flex items-center justify-between font-extrabold">
        <div>Total Price: </div>
        <div>${(+totalPrice() + 10).toFixed(2)}</div>
      </div>
    </div>
  )
}

export default YourOrder
