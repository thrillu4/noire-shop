import { ChevronDown } from "lucide-react";
import Image from "next/image";

const GridCollection = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {["/q.png", "/w.png", "/e.png", "/q.png"].map((src, i) => (
          <div key={i} className="mx-auto w-full">
            <Image
              src={src}
              width={140}
              height={140}
              alt=""
              className="mx-auto"
            />
            <div>Cotton</div>
            <div>Basic Heavy Weight T-Shirt</div>
          </div>
        ))}
      </div>
      <button className="mx-auto mt-8 block">
        <div className="text-sm leading-1 opacity-65">More</div>
        <ChevronDown className="mx-auto" />
      </button>
    </>
  );
};

export default GridCollection;
