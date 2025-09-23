import { Breadcrumbs } from '@/components/Breadcrumbs'
import ContactUsLink from '@/components/ContactUsLink'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function FAQPage() {
  return (
    <div className="min-h-[80vh] px-3">
      <Breadcrumbs />
      <h1 className="mt-5 mb-8 text-center text-2xl font-bold lg:text-3xl xl:text-4xl">
        Frequently Asked Questions
      </h1>

      <Accordion
        type="single"
        collapsible
        className="mb-20 w-full space-y-2 lg:mx-auto lg:max-w-3xl"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>How long does shipping take?</AccordionTrigger>
          <AccordionContent>
            Standard shipping takes 3–5 business days, while express shipping
            takes 1–2 business days.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
          <AccordionContent>
            Yes, we ship worldwide. Delivery times vary depending on the
            destination.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            Items can be returned within 14 days of delivery if unused and in
            original condition.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>How do I start a return?</AccordionTrigger>
          <AccordionContent>
            Contact us at{' '}
            <a
              href="mailto:noire.shop.help@gmail.com"
              className="text-blue-600 hover:underline"
            >
              noire.shop.help@gmail.com
            </a>{' '}
            to request a return.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>When will I get my refund?</AccordionTrigger>
          <AccordionContent>
            Refunds are processed within 5–7 business days after we receive the
            returned item.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ContactUsLink>Contact Us / Help</ContactUsLink>
    </div>
  )
}
