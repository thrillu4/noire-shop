"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/routes";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { FormState, signup } from "../actions/auth";

const SignUp = () => {
  const [showPassword, setShoPassword] = useState(false);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    signup,
    {
      success: false,
      errors: {},
      fields: {},
    },
  );
  return (
    <div className="my-6 flex min-h-[80vh] flex-col justify-center gap-5 px-5">
      <h2 className="text-center text-2xl font-bold">Register</h2>
      <div className="text-center">
        Fill out the form to find out more and become one of the NOIRÉ trends.
      </div>
      <form action={formAction} className="flex flex-col gap-4">
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
          <Label htmlFor="sheet-demo-email">Email</Label>
          <Input
            className="mt-2"
            id="sheet-demo-email"
            placeholder="yourmail@email.com"
            name="email"
            defaultValue={state.fields?.email || ""}
          />
          {state?.errors?.email && (
            <p className="text-xs text-red-600">{state.errors.email}</p>
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
            <p className="text-xs text-red-600">{state.errors.password}</p>
          )}
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms-2"
            name="checkbox"
            defaultChecked={state?.fields?.checkbox === "on" ? true : false}
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
                      Welcome to NOIRÉ. By creating an account or making a
                      purchase on our website, you agree to the following terms:
                    </DialogDescription>
                  </DialogHeader>
                  <ol className="list-decimal space-y-1 text-xs">
                    <li>
                      Eligibility – You must be at least 18 years old to create
                      an account and make purchases.
                    </li>
                    <li>
                      Account Security – You are responsible for keeping account
                      details and password secure
                    </li>
                    <li>
                      Orders & Payments – All orders are subject to availability
                      and confirmation of payment.
                    </li>
                    <li>
                      Returns & Refunds – Please review our return policy before
                      making a purchase.
                    </li>
                    <li>
                      Use of Website – You agree not to misuse our website or
                      engage in fraudulent activity.
                    </li>
                  </ol>
                  <div className="text-xs">
                    By continuing, you confirm that you have read and agree to
                    these Terms & Conditions.
                  </div>
                  <DialogHeader>
                    <DialogTitle>Privacy Policy</DialogTitle>
                    <DialogDescription className="text-xs">
                      Your privacy is important to us. This policy explains how
                      we handle your information:
                    </DialogDescription>
                  </DialogHeader>
                  <ol className="list-decimal space-y-1 text-xs">
                    <li>
                      Data We Collect – We may collect your name, email,
                      shipping address, and payment details when you create an
                      account or make a purchase.
                    </li>
                    <li>
                      How We Use Data – We use this information to process
                      orders, improve our services, and communicate with you.
                    </li>
                    <li>
                      Cookies – We use cookies to improve your shopping
                      experience.
                    </li>
                    <li>
                      Your Rights – You may request access, correction, or
                      deletion of your personal data at any time.
                    </li>
                    <li>
                      Use of Website – You agree not to misuse our website or
                      engage in fraudulent activity.
                    </li>
                  </ol>
                  <div className="text-xs">
                    By creating an account, you acknowledge and accept our
                    Privacy Policy.
                  </div>
                </DialogContent>
              </Dialog>
            </p>
            {state?.errors?.checkbox && (
              <p className="text-xs text-red-600">{state.errors.checkbox}</p>
            )}
          </div>
        </div>

        <Button disabled={isPending} type="submit" className="cursor-pointer">
          {isPending ? "Signing up..." : "Create Account"}
        </Button>
        {state?.errors?.server && (
          <p className="text-xs text-red-600">{state.errors.server}</p>
        )}
      </form>
      <div className="w-full border opacity-60" />
      <div className="text-center">Already have an account?</div>
      <Button
        onClick={() => router.push(ROUTES.SIGNIN)}
        className="cursor-pointer border-2 border-black bg-white text-black hover:text-white"
      >
        Sign In
      </Button>
    </div>
  );
};

export default SignUp;
