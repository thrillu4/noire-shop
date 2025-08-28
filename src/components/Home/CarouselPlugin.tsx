"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import * as React from "react";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({
      delay: 1000,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{
        align: "start",
      }}
      className="mx-auto w-full"
    >
      <CarouselContent className="-ml-2">
        {["/1.png", "/2.png", "/1.png", "/2.png", "/1.png"].map(
          (src, index) => (
            <CarouselItem key={index} className="w-[170px] flex-none pl-2">
              <CardContent className="relative aspect-square">
                <Image
                  src={src}
                  alt={`Slide ${index}`}
                  width={170}
                  height={170}
                />
                <div className="mt-2 text-xs opacity-40">Cotton T-Shirt</div>
                <div className="flex items-center justify-between text-sm font-semibold">
                  <div>Full Sleeve Zipper</div>
                  <div>$ 199</div>
                </div>
              </CardContent>
            </CarouselItem>
          ),
        )}
      </CarouselContent>
    </Carousel>
  );
}
