"use client";

import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [loupe, setLoupe] = useState(true);
  console.log(value);
  return (
    <form>
      <div className="relative">
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-[#d9d9d9] px-4 py-2 placeholder:text-end placeholder:text-sm"
          onFocus={() => setLoupe(false)}
          onBlur={() => setLoupe(true)}
        />
        {loupe && (
          <Search
            size={12}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
          />
        )}
      </div>
    </form>
  );
};

export default SearchBar;
