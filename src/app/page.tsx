import { CarouselPlugin } from "@/components/Home/CarouselPlugin";
import FilterBar from "@/components/Home/FilterBar";
import GridCollection from "@/components/Home/GridCollection";
import SearchBar from "@/components/Home/SearchBar";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { bagel } from "./fonts";

export default async function Home() {
  return (
    <>
      <div className="px-4">
        <div className="mb-25">
          <div>
            <SearchBar />
          </div>
          <h1 className={`${bagel.className} mt-12 text-5xl`}>
            <div>New</div> Collection
          </h1>
          <div className="mt-5 mb-12 flex w-full items-center justify-between rounded-2xl bg-black px-4 py-2 text-sm text-white">
            <div>SUMMER</div>
            <div>NOIRÉ</div>
            <div>2025</div>
          </div>
          <CarouselPlugin />
          <Button className="mt-6 gap-5 bg-[#d9d9d9] text-black">
            Go To Shop <MoveRight />
          </Button>
        </div>

        <div className="mb-25">
          <h2 className={`${bagel.className} mt-12 mb-8 text-4xl`}>
            <div>New</div>
            <span className="relative">
              This Week
              <span className="absolute top-0 -right-10 text-xl font-medium text-blue-800">
                (50)
              </span>
            </span>
          </h2>
          <CarouselPlugin />
        </div>

        <div className="mb-25">
          <h2 className={`${bagel.className} mt-12 mb-8 text-4xl`}>
            <div>XIV</div>
            COLLECTIONS
            <div>24-25</div>
          </h2>
          <FilterBar />
          <div className="mt-3 mb-7 w-full border"></div>
          <GridCollection />
        </div>

        <div className="text-center">
          <h3 className="mb-4 text-3xl font-extrabold">
            Our Approach to fashion design
          </h3>
          <p className="mb-18 text-sm leading-5 opacity-80">
            At elegant vogue , we blend creativity with craftsmanship to create
            fashion that transcends trends and stands the test of time each
            design is meticulously crafted, ensuring the highest quality
            exquisite finish
          </p>

          <div className="mb-24 flex h-[200px] gap-2 overflow-hidden">
            <div className="flex">
              <Image
                src={"/z.png"}
                width={120}
                height={160}
                alt=""
                className="h-[160px] max-w-none"
              />
            </div>
            <div className="flex items-end">
              <Image
                src={"/x.png"}
                width={120}
                height={160}
                alt=""
                className="h-[160px] max-w-none"
              />
            </div>
            <div className="flex">
              <Image
                src={"/c.png"}
                width={120}
                height={160}
                alt=""
                className="h-[160px] max-w-none"
              />
            </div>
            <div className="flex items-end">
              <Image
                src={"/v.png"}
                width={120}
                height={160}
                alt=""
                className="h-[160px] max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
