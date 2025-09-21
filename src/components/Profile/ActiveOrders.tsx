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
import { TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Order } from '../../../prisma/generated/prisma'
import LoadingBlockSkeleton from '../Skeletons/LoadingBlockSkeleton'
import { Button } from '../ui/button'

const ActiveOrders = ({ userId }: { userId: string | undefined }) => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchOrders = async () => {
      try {
        const response = await fetch(ROUTES.GET_ORDERS_ACTIVE)
        if (!response.ok) throw new Error('Failed to fetch orders')
        const orders = await response.json()
        setOrders(orders.activeOrders)
      } catch (error) {
        console.log('Error with fetching active orders', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [userId])

  if (orders.length < 1 && !loading)
    return (
      <div className="flex items-center gap-2 bg-yellow-100 p-3">
        <TriangleAlert />
        You have no active orders.
      </div>
    )

  return (
    <>
      {loading && <LoadingBlockSkeleton />}
      <div className="hidden md:block">
        <Table>
          <TableCaption>A list of active orders.</TableCaption>
          <TableHeader className="">
            <TableRow>
              <TableHead> №</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {orders.map(order => (
              <TableRow className="text-xs" key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell className="text-green-600">
                  {order.status.toUpperCase()}
                </TableCell>
                <TableCell>{order.paymentMethod.toUpperCase()}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Link href={ROUTES.PROFILE + `/${order.id}`}>
                    <Button className="cursor-pointer px-2 text-xs">
                      Show Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="block md:hidden">
        <div className="flex flex-col space-y-7">
          {orders.map(order => (
            <div key={order.id} className="border-y">
              <div className="grid grid-cols-2 gap-x-5 py-5">
                <div className="grid gap-y-2">
                  <div>Order №: </div>
                  <div>Date: </div>
                  <div>Status: </div>
                  <div>Total price:</div>
                </div>

                <div className="grid gap-y-2 font-bold">
                  <div className="text-xs break-all">{order.id}</div>
                  <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                  <div className="text-green-600">
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

export default ActiveOrders
