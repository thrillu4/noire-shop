"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";

const UserDrawer = () => {
  const [showPassword, setShoPassword] = useState(false);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <User className="h-auto w-4 text-white" />
      </SheetTrigger>
      <SheetContent className="flex items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <SheetHeader>
            <SheetTitle className="text-center">Sign In</SheetTitle>
            <SheetDescription>Explore fashion with NOIRÉ</SheetDescription>
          </SheetHeader>

          <form action="" className="flex flex-col gap-4">
            <div className="w-full px-4">
              <Label htmlFor="sheet-demo-name">Email</Label>
              <Input
                className="mt-2"
                id="sheet-demo-name"
                placeholder="yourmail@email.com"
              />
            </div>

            <div className="w-full px-4">
              <Label htmlFor="sheet-demo-username">Password</Label>
              <div className="relative mt-2">
                <Input
                  id="sheet-demo-username"
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  className="relative"
                />
                {showPassword ? (
                  <EyeOff
                    size={17}
                    className="absolute top-1/2 right-2 -translate-y-1/2"
                    onClick={() => setShoPassword(!showPassword)}
                  />
                ) : (
                  <Eye
                    size={17}
                    className="absolute top-1/2 right-2 -translate-y-1/2"
                    onClick={() => setShoPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
            <div className="px-4 text-sm underline opacity-60">
              Forgot your password?
            </div>

            <SheetFooter>
              <Button type="submit">Sign In</Button>
            </SheetFooter>
          </form>
          <div>Create account</div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserDrawer;
