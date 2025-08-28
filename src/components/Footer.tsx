import { ROUTES } from "@/routes";
import { Copyright, Info, Library } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5] pt-14 pb-3">
      <Image
        src={"/logo.png"}
        width={40}
        height={40}
        alt="logo"
        className="mx-auto"
      />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="mx-auto">
          <div className="mb-4 flex items-center justify-center gap-1 text-sm opacity-65">
            <Library size={15} /> Catalog
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={ROUTES.MEN}>Men</Link>
            </li>
            <li>
              <Link href={ROUTES.WOMEN}>Women</Link>
            </li>
            <li>
              <Link href={ROUTES.COLLECTIONS}>Collection</Link>
            </li>
            <li>
              <Link href={ROUTES.NEW}>New</Link>
            </li>
            <li>
              <Link href={ROUTES.SALE}>Sale</Link>
            </li>
          </ul>
        </div>
        <div className="mx-auto">
          <div className="mb-4 flex items-center justify-center gap-1 text-sm opacity-65">
            <Info size={14} /> Info
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={ROUTES.ABOUT}>About Us</Link>
            </li>
            <li>
              <Link href={ROUTES.DELIVERY}>Delivery & Returns</Link>
            </li>
            <li>
              <Link href={ROUTES.CONTACT}>Contact Us</Link>
            </li>
            <li>
              <Link href={ROUTES.REVIEWS}>Customer Reviews</Link>
            </li>
            <li>
              <Link href={ROUTES.FAQ}>FAQ</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center gap-2 text-xs opacity-60">
        <Copyright size={15} /> 2025 NOIRÉ
      </div>
    </footer>
  );
};

export default Footer;
