import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

const TermsConditionsDialog = () => {
  return (
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
            Welcome to NOIRÉ. By creating an account or making a purchase on our
            website, you agree to the following terms:
          </DialogDescription>
        </DialogHeader>
        <ol className="list-decimal space-y-1 text-xs">
          <li>
            Eligibility – You must be at least 18 years old to create an account
            and make purchases.
          </li>
          <li>
            Account Security – You are responsible for keeping account details
            and password secure
          </li>
          <li>
            Orders & Payments – All orders are subject to availability and
            confirmation of payment.
          </li>
          <li>
            Returns & Refunds – Please review our return policy before making a
            purchase.
          </li>
          <li>
            Use of Website – You agree not to misuse our website or engage in
            fraudulent activity.
          </li>
        </ol>
        <div className="text-xs">
          By continuing, you confirm that you have read and agree to these Terms
          & Conditions.
        </div>
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription className="text-xs">
            Your privacy is important to us. This policy explains how we handle
            your information:
          </DialogDescription>
        </DialogHeader>
        <ol className="list-decimal space-y-1 text-xs">
          <li>
            Data We Collect – We may collect your name, email, shipping address,
            and payment details when you create an account or make a purchase.
          </li>
          <li>
            How We Use Data – We use this information to process orders, improve
            our services, and communicate with you.
          </li>
          <li>Cookies – We use cookies to improve your shopping experience.</li>
          <li>
            Your Rights – You may request access, correction, or deletion of
            your personal data at any time.
          </li>
          <li>
            Use of Website – You agree not to misuse our website or engage in
            fraudulent activity.
          </li>
        </ol>
        <div className="text-xs">
          By creating an account, you acknowledge and accept our Privacy Policy.
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TermsConditionsDialog
