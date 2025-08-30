"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useActionState, useState } from "react";
import { FormState, signin } from "../actions/auth";
import { ROUTES } from "@/routes";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [showPassword, setShoPassword] = useState(false);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    signin,
    {
      success: false,
      errors: {},
      fields: {},
    },
  );
  return (
    <div className="my-6 flex min-h-[80vh] flex-col justify-center gap-5 px-5 text-center">
      <h2 className="text-2xl font-bold">Sign In</h2>
      <div>Explore fashion with NOIRÉ</div>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="w-full">
          <Label htmlFor="sheet-demo-email">Email</Label>
          <Input
            className="mt-2"
            id="sheet-demo-email"
            placeholder="yourmail@email.com"
            name="email"
            defaultValue={state.fields?.email || ""}
          />
          {state?.errors?.email && (
            <p className="text-left text-xs text-red-600">
              {state.errors.email}
            </p>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="sheet-demo-password">Password</Label>
          <div className="relative mt-2">
            <Input
              id="sheet-demo-password"
              type={showPassword ? "text" : "password"}
              placeholder="*******"
              className="relative"
              name="password"
              defaultValue={state.fields?.password || ""}
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
          {state?.errors?.password && (
            <p className="text-left text-xs text-red-600">
              {state.errors.password}
            </p>
          )}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <div className="mt-2 cursor-pointer px-4 text-left text-xs underline opacity-60">
              Forgot your password?
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Reset password</DialogTitle>
              <DialogDescription>
                We’ll send you an email with a link to create a new password
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="Email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="Email"
                  placeholder="Enter your email address"
                  name="email"
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <Button type="button" className="cursor-pointer">
                Send reset link
              </Button>
            </DialogFooter>
            <DialogClose asChild>
              <span className="cursor-pointer text-center underline">
                Back to Sign in
              </span>
            </DialogClose>
          </DialogContent>
        </Dialog>

        <Button disabled={isPending} type="submit" className="cursor-pointer">
          {isPending ? "Signing up..." : "Sign In"}
        </Button>
        {state.errors?.server && (
          <p className="text-xs text-red-600">{state.errors.server}</p>
        )}
      </form>
      <div className="w-full border opacity-60" />
      <div>Don&apos;t have an account?</div>
      <Button
        onClick={() => router.push(ROUTES.SIGNUP)}
        className="cursor-pointer border-2 border-black bg-white text-black hover:text-white"
      >
        Create account
      </Button>
    </div>
  );
};

export default SignIn;
