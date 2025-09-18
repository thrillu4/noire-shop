'use server'
import { orderDetails } from '@/app/actions/orderDetails'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Image from 'next/image'

const OrderDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const { order, orderItems } = await orderDetails(id)
  return (
    <div className="px-3">
      <Breadcrumbs />
      <h1 className="mt-2 text-2xl font-extrabold">Order Details</h1>
      <div className="mt-4 mb-20 rounded-2xl border px-4 py-5 text-sm">
        <div className="grid grid-cols-2 gap-x-3">
          <div className="grid gap-y-5">
            <div>Order №: </div>
            <div>Date: </div>
            <div>Status: </div>
            <div>Total price:</div>
            <div>Payment Method:</div>
            <div>Full Name:</div>
            <div>Phone:</div>
            <div>Country:</div>
            <div>City:</div>
            <div>Address:</div>
          </div>

          <div className="grid gap-y-5 font-bold break-all">
            <div className="text-xs">{order.id}</div>
            <div>{new Date(order.createdAt).toLocaleDateString()}</div>
            <div
              className={
                order.status === 'delivered'
                  ? 'text-cyan-500'
                  : order.status === 'cancelled'
                    ? 'text-red-600'
                    : 'text-green-600'
              }
            >
              {order.status.toUpperCase()}
            </div>
            <div>{order.total.toFixed(2)}</div>
            <div>{order.paymentMethod.toUpperCase()}</div>
            <div>{order.fullName}</div>
            <div>{order.phone}</div>
            <div>{order.country}</div>
            <div>{order.city}</div>
            <div>{order.address}</div>
          </div>
        </div>
        <div className="mt-5">
          <div className="mb-2 text-base font-bold">Products:</div>
          {orderItems.map(item => (
            <div
              key={item.product?.id}
              className="flex gap-4 border bg-neutral-100 px-1 py-5"
            >
              <div className="min-w-28">
                <Image
                  src={item.product.images[0].url}
                  alt="product-image"
                  width={112}
                  height={155}
                  className="h-full w-full"
                />
              </div>
              <div className="flex w-full flex-col justify-between text-xs">
                <div className="font-bold">{item.product.title}</div>

                <div className="flex items-center justify-between text-xs">
                  <div>
                    Size: <span className="font-bold">{item.size}</span>
                  </div>
                  <div>
                    Qty: <span className="font-bold">{item.quantity}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Price:</div>
                  <div className="font-bold">${item.product.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
