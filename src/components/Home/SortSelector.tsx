import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Plus } from 'lucide-react'

export function SortSelector() {
  return (
    <Select>
      <SelectTrigger className="px-2 py-0 text-xs">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="newest" className="flex items-center gap-1">
            <Plus /> Newest
          </SelectItem>
          <SelectItem value="low" className="flex items-center gap-1">
            <ArrowDownWideNarrow /> Low Price
          </SelectItem>
          <SelectItem value="high" className="flex items-center gap-1">
            <ArrowUpNarrowWide /> High Price
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
