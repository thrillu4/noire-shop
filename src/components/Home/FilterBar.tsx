import { SortSelector } from "./SortSelector";

const FilterBar = () => {
  return (
    <div className="flex items-center justify-between text-sm opacity-70">
      <ul className="flex items-center gap-4">
        <li className="font-bold opacity-100">(All)</li>
        <li>Men</li>
        <li>Women</li>
      </ul>
      <div className="flex items-center gap-1">
        <SortSelector />
      </div>
    </div>
  );
};

export default FilterBar;
