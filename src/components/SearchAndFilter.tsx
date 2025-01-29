import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
}

const SearchAndFilter = ({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
}: SearchAndFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Cari tugas..."
        className="flex-1"
      />
      <Select value={filter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua</SelectItem>
          <SelectItem value="active">Aktif</SelectItem>
          <SelectItem value="completed">Selesai</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchAndFilter;