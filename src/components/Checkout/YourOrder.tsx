import { ROUTES } from '@/routes'
import { useCartStore } from '@/store/cart'
import Image from 'next/image'
import Link from 'next/link'

const YourOrder = ({ cod }: { cod?: boolean }) => {
  const { totalItems, items, totalPrice } = useCartStore()

  const totalOrderPrice = (+totalPrice() + 10).toFixed(2)
  const totalOrderPriceWithCod = (+totalOrderPrice + 2.5).toFixed(2)

  return (
    <div className="mx-auto max-w-lg rounded-2xl border px-5 py-8 sm:max-w-xl md:max-w-3xl lg:max-w-full">
      <div className="mb-7 flex items-center justify-between font-bold">
        <div>YOUR ORDER</div>
        <div className="text-blue-700">({totalItems()})</div>
      </div>
      <div className="mx-auto flex max-w-xs flex-col gap-5 sm:max-w-md md:grid md:max-w-xl md:grid-cols-2 lg:gap-x-10">
        {items.map((item, i) => (
          <Link
            href={`${ROUTES.PRODUCTS}/${item.product.title}?productId=${item.product.id}`}
            className="flex gap-3 text-sm"
            key={i}
          >
            <div className="relative h-40 w-full lg:h-60">
              <Image
                src={item.product.images[0].url}
                alt="product image"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-evenly">
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
          </Link>
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
        {cod && (
          <div className="flex items-center justify-between">
            <div>Cash on delivery: </div>
            <div>$2.5</div>
          </div>
        )}
      </div>
      <div className="mt-10 flex items-center justify-between font-extrabold">
        <div>Total Price: </div>
        <div>${cod ? totalOrderPriceWithCod : totalOrderPrice}</div>
      </div>
    </div>
  )
}

export default YourOrder
