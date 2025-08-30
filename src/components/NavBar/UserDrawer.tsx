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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { FormState, signin, signup } from "@/app/actions/auth";
import { ROUTES } from "@/routes";
import { Eye, EyeOff, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { Checkbox } from "../ui/checkbox";

const UserDrawer = ({ isAuth }: { isAuth: boolean }) => {
  const router = useRouter();
  const [showPassword, setShoPassword] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    signup,
    { success: false, errors: {}, fields: {} },
  );
  const signIn = useActionState<FormState, FormData>(signin, {
    success: false,
    errors: {},
    fields: {},
  });

  if (isAuth) {
    return (
      <div
        onClick={() => router.push(ROUTES.PROFILE)}
        className="cursor-pointer rounded-full border bg-black p-2"
      >
        <User className="h-auto w-4 text-white" />
      </div>
    );
  }

  return (
    <>
      {!isSignIn ? (
        <Sheet>
          <SheetTrigger asChild>
            <div className="cursor-pointer rounded-full border bg-black p-2">
              <User className="h-auto w-4 text-white" />
            </div>
          </SheetTrigger>
          <SheetContent className="flex max-h-[100vh] items-center justify-center overflow-y-auto">
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <SheetHeader>
                <SheetTitle className="text-center">Register</SheetTitle>
                <SheetDescription className="text-xs">
                  Fill out the form to find out more and become one of the NOIRÉ
                  trends.
                </SheetDescription>
              </SheetHeader>

              <form action={formAction} className="flex flex-col gap-4 px-4">
                <div className="w-full">
                  <Label htmlFor="username">Name</Label>
                  <Input
                    className="mt-2"
                    id="username"
                    placeholder="Jane Doe"
                    name="username"
                    defaultValue={state.fields?.username || ""}
                  />
                  {state?.errors?.name && (
                    <p className="text-xs text-red-600">{state.errors.name}</p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    className="mt-2"
                    id="reg-email"
                    placeholder="yourmail@email.com"
                    name="email"
                    defaultValue={state.fields?.email || ""}
                  />
                  {state?.errors?.email && (
                    <p className="text-xs text-red-600">{state.errors.email}</p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="reg-password">Password</Label>
                  <div className="relative mt-2">
                    <Input
                      id="reg-password"
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
                    <p className="text-xs text-red-600">
                      {state.errors.password}
                    </p>
                  )}
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms-2"
                    name="checkbox"
                    defaultChecked={
                      state?.fields?.checkbox === "on" ? true : false
                    }
                  />
                  <div className="grid gap-2">
                    <Label htmlFor="terms-2" className="text-xs">
                      Accept terms and conditions
                    </Label>
                    <p className="text-muted-foreground text-[10px]">
                      By clicking this checkbox, you agree to the{" "}
                      <Dialog>
                        <DialogTrigger asChild>
                          <span className="cursor-pointer underline">
                            Terms & Conditions and Privacy Policy
                          </span>
                        </DialogTrigger>
                        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Terms & Conditions</DialogTitle>
                            <DialogDescription className="text-xs">
                              Welcome to NOIRÉ. By creating an account or making
                              a purchase on our website, you agree to the
                              following terms:
                            </DialogDescription>
                          </DialogHeader>
                          <ol className="list-decimal space-y-1 text-xs">
                            <li>
                              Eligibility – You must be at least 18 years old to
                              create an account and make purchases.
                            </li>
                            <li>
                              Account Security – You are responsible for keeping
                              account details and password secure
                            </li>
                            <li>
                              Orders & Payments – All orders are subject to
                              availability and confirmation of payment.
                            </li>
                            <li>
                              Returns & Refunds – Please review our return
                              policy before making a purchase.
                            </li>
                            <li>
                              Use of Website – You agree not to misuse our
                              website or engage in fraudulent activity.
                            </li>
                          </ol>
                          <div className="text-xs">
                            By continuing, you confirm that you have read and
                            agree to these Terms & Conditions.
                          </div>
                          <DialogHeader>
                            <DialogTitle>Privacy Policy</DialogTitle>
                            <DialogDescription className="text-xs">
                              Your privacy is important to us. This policy
                              explains how we handle your information:
                            </DialogDescription>
                          </DialogHeader>
                          <ol className="list-decimal space-y-1 text-xs">
                            <li>
                              Data We Collect – We may collect your name, email,
                              shipping address, and payment details when you
                              create an account or make a purchase.
                            </li>
                            <li>
                              How We Use Data – We use this information to
                              process orders, improve our services, and
                              communicate with you.
                            </li>
                            <li>
                              Cookies – We use cookies to improve your shopping
                              experience.
                            </li>
                            <li>
                              Your Rights – You may request access, correction,
                              or deletion of your personal data at any time.
                            </li>
                            <li>
                              Use of Website – You agree not to misuse our
                              website or engage in fraudulent activity.
                            </li>
                          </ol>
                          <div className="text-xs">
                            By creating an account, you acknowledge and accept
                            our Privacy Policy.
                          </div>
                        </DialogContent>
                      </Dialog>
                    </p>
                    {state?.errors?.checkbox && (
                      <p className="text-xs text-red-600">
                        {state.errors.checkbox}
                      </p>
                    )}
                  </div>
                </div>
                <SheetFooter>
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="cursor-pointer"
                  >
                    {isPending ? "Signing up..." : "Create Account"}
                  </Button>
                  {state?.errors?.server && (
                    <p className="text-xs text-red-600">
                      {state.errors.server}
                    </p>
                  )}
                </SheetFooter>
              </form>
              <div className="w-full border opacity-60" />
              <div>Already have an account?</div>
              <Button
                onClick={() => setIsSignIn(true)}
                className="cursor-pointer border-2 border-black bg-white text-black hover:text-white"
              >
                Sign In
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <div className="cursor-pointer rounded-full border bg-black p-2">
              <User className="h-auto w-4 text-white" />
            </div>
          </SheetTrigger>
          <SheetContent className="flex items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center gap-6">
              <SheetHeader>
                <SheetTitle className="text-center">Sign In</SheetTitle>
                <SheetDescription>Explore fashion with NOIRÉ</SheetDescription>
              </SheetHeader>

              <form action={signIn[1]} className="flex flex-col gap-4">
                <div className="w-full px-4">
                  <Label htmlFor="sheet-demo-email">Email</Label>
                  <Input
                    className="mt-2"
                    id="sheet-demo-email"
                    placeholder="yourmail@email.com"
                    name="email"
                    defaultValue={signIn[0].fields?.email || ""}
                  />
                  {signIn[0]?.errors?.email && (
                    <p className="text-xs text-red-600">
                      {signIn[0].errors.email}
                    </p>
                  )}
                </div>

                <div className="w-full px-4">
                  <Label htmlFor="sheet-demo-password">Password</Label>
                  <div className="relative mt-2">
                    <Input
                      id="sheet-demo-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="*******"
                      className="relative"
                      name="password"
                      defaultValue={signIn[0].fields?.password || ""}
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
                  {signIn[0]?.errors?.password && (
                    <p className="text-xs text-red-600">
                      {signIn[0].errors.password}
                    </p>
                  )}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="mt-2 cursor-pointer px-4 text-xs underline opacity-60">
                      Forgot your password?
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Reset password</DialogTitle>
                      <DialogDescription>
                        We’ll send you an email with a link to create a new
                        password
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

                <SheetFooter>
                  <Button
                    disabled={signIn[2]}
                    type="submit"
                    className="cursor-pointer"
                  >
                    {signIn[2] ? "Signing up..." : "Sign In"}
                  </Button>
                  {signIn[0].errors?.server && (
                    <p className="text-xs text-red-600">
                      {signIn[0].errors.server}
                    </p>
                  )}
                </SheetFooter>
              </form>
              <div className="w-full border opacity-60" />
              <div>Don&apos;t have an account?</div>
              <Button
                onClick={() => setIsSignIn(false)}
                className="cursor-pointer border-2 border-black bg-white text-black hover:text-white"
              >
                Create account
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default UserDrawer;
