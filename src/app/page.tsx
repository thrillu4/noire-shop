import SearchBar from "@/components/Home/SearchBar";
import { bagel } from "./fonts";

export default async function Home() {
  return (
    <div className="px-4">
      <div>
        <SearchBar />
      </div>
      <h1 className={`${bagel.className} mt-12 text-5xl`}>New Collection</h1>
      <div className="mt-5 flex w-full items-center justify-between rounded-2xl bg-black px-4 py-2 text-sm text-white">
        <div>SUMMER</div>
        <div>NOIRÉ</div>
        <div>2025</div>
      </div>
    </div>
  );
}
