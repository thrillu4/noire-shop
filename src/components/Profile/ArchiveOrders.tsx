'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ROUTES } from '@/routes'
import { useEffect, useState } from 'react'
import { Order } from '../../../prisma/generated/prisma'
import { TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

const ArchiveOrders = ({ userId }: { userId: string | undefined }) => {
  const [orders, setOrders] = useState<Order[]>([])
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(ROUTES.GET_ORDERS_ARCHIVE)
        if (!response.ok) throw new Error('Failed to fetch orders')
        const orders = await response.json()
        setOrders(orders.orders)
      } catch (error) {
        console.log('Error with fetching orders', error)
      }
    }
    fetchOrders()
  }, [userId])

  if (orders.length < 1)
    return (
      <div className="flex items-center gap-2 bg-yellow-100 p-3">
        <TriangleAlert />
        You have no archive orders.
      </div>
    )

  return (
    <>
      <div className="hidden sm:block">
        <Table>
          <TableCaption>A list of archive orders.</TableCaption>
          <TableHeader className="">
            <TableRow>
              <TableHead> №</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {orders.map(order => (
              <TableRow className="text-xs" key={order.id}>
                <TableCell className="overflow-scroll font-medium">
                  {order.id}
                </TableCell>
                <TableCell>{order.status.toUpperCase()}</TableCell>
                <TableCell>{order.paymentMethod.toUpperCase()}</TableCell>
                <TableCell className="text-right">${order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="block sm:hidden">
        <div className="flex flex-col space-y-7">
          {orders.map(order => (
            <div key={order.id} className="border-y">
              <div className="grid grid-cols-2 items-center gap-x-5 py-5">
                <div className="grid gap-y-2">
                  <div>Order №: </div>
                  <div>Date: </div>
                  <div>Status: </div>
                  <div>Total price:</div>
                </div>

                <div className="grid gap-y-2 font-bold">
                  <div className="text-xs break-all">{order.id}</div>
                  <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                  <div
                    className={
                      order.status === 'cancelled'
                        ? 'text-red-600'
                        : 'text-cyan-500'
                    }
                  >
                    {order.status.toUpperCase()}
                  </div>
                  <div>{order.total.toFixed(2)}</div>
                </div>
              </div>
              <Link href={ROUTES.PROFILE + `/${order.id}`}>
                <Button variant="outline" className="w-full">
                  Show Details
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ArchiveOrders
