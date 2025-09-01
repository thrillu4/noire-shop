"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/store";
import { Handbag } from "lucide-react";

import { useEffect } from "react";

const CartDrawer = ({ userId }: { userId: string | null }) => {
  const { items, loadCart } = useCartStore();

  useEffect(() => {
    loadCart(userId);
  }, [loadCart, userId]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="rounded-full border bg-black p-2">
          <Handbag className="h-auto w-4 text-white" />
        </div>
      </SheetTrigger>
      <SheetContent className="max-h-[100vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div>
          {!items && <p> Cart is Empty</p>}
          {items &&
            items.map((item) => {
              return (
                <div key={item.id}>
                  <img src={item.product.images[0].url} alt="" />
                  <p>{item.product.title}</p>
                  <p>Размер: {item.size}</p>
                  <p>Кол-во: {item.quantity}</p>
                  <p>{item.product.price}</p>
                </div>
              );
            })}
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
