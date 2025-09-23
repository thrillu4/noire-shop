import { Breadcrumbs } from '@/components/Breadcrumbs'
import ContactUsLink from '@/components/ContactUsLink'

export default function AboutUsPage() {
  return (
    <div className="mb-10">
      <div className="px-3">
        <Breadcrumbs />
      </div>
      <div
        className="relative mt-3 flex h-64 items-center justify-center bg-cover bg-center text-white 2xl:h-100"
        style={{ backgroundImage: "url('/about.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 text-3xl font-bold 2xl:text-5xl">
          About Noiré
        </h1>
      </div>

      <div className="container mx-auto space-y-12 px-4 py-12">
        <div>
          <h2 className="mb-4 text-xl font-semibold 2xl:text-2xl">
            Who We Are
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 2xl:text-base">
            We are a forward-thinking modern clothing brand dedicated to
            creating apparel that combines timeless design, everyday
            practicality, and the spirit of contemporary trends. Our team is
            passionate about fashion not only as clothing, but also as a way of
            self-expression and confidence. Every piece we make is carefully
            crafted to reflect our core values: quality, comfort, and style.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold 2xl:text-2xl">
            Our Mission
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 2xl:text-base">
            Our mission goes beyond just selling clothes — we aim to make
            fashion universally accessible. We believe that everyone, no matter
            where they are, deserves the opportunity to wear stylish, durable,
            and comfortable clothing without overpaying. That’s why we
            constantly refine our collections, explore new sustainable fabrics,
            and pay attention to every detail, so that each customer receives
            apparel that lasts, looks great, and feels effortless to wear.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold 2xl:text-2xl">
            What We Offer
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 2xl:text-base">
            From everyday wardrobe staples to unique statement pieces, we design
            versatile collections for people who appreciate simplicity,
            elegance, and modern aesthetics. Whether it’s a perfectly fitted
            T-shirt, a cozy hoodie, or a standout jacket, our products are made
            to seamlessly blend into your lifestyle while helping you feel
            confident on any occasion. We also update our collections seasonally
            to ensure that our customers always have access to fresh styles and
            innovative designs.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold 2xl:text-2xl">
            Why Choose Us
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700 2xl:text-base">
            <li>🌍 Worldwide shipping</li>
            <li>👕 Premium materials</li>
            <li>⚡ Fast and reliable delivery</li>
            <li>💳 Easy returns</li>
          </ul>
          <p className="mt-10">
            By choosing us, you’re not just buying clothing — you’re joining a
            brand that values honesty, quality, and a modern approach to
            fashion.
          </p>
        </div>
      </div>
      <ContactUsLink>Contact Us / Help</ContactUsLink>
    </div>
  )
}
