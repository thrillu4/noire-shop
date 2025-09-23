import { Breadcrumbs } from '@/components/Breadcrumbs'
import ContactUsLink from '@/components/ContactUsLink'

export default function AboutUsPage() {
  return (
    <div className="mb-10">
      <div className="px-3">
        <Breadcrumbs />
      </div>
      <div
        className="relative mt-3 flex h-64 items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/about.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 text-3xl font-bold">About Noiré</h1>
      </div>

      <div className="container mx-auto max-w-lg space-y-12 px-4 py-12 sm:max-w-xl lg:max-w-3xl">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Who We Are</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            We are a modern clothing brand committed to providing high-quality
            apparel that blends timeless design with contemporary trends.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Our Mission</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Our mission is to make fashion accessible worldwide by offering
            stylish, comfortable, and durable clothing at fair prices.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">What We Offer</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            From everyday essentials to statement pieces, we provide collections
            designed for people who value quality, simplicity, and modern
            aesthetics.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Why Choose Us</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>🌍 Worldwide shipping</li>
            <li>👕 Premium materials</li>
            <li>⚡ Fast and reliable delivery</li>
            <li>💳 Easy returns</li>
          </ul>
        </div>
      </div>
      <ContactUsLink>Contact Us / Help</ContactUsLink>
    </div>
  )
}
