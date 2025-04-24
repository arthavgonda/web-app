import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { debounce } from "@/lib/utils";

export interface FilterValues {
  searchTerm: string;
  minVram: number;
  maxPrice: number;
  onlineOnly: boolean;
  sortBy: string;
}

interface MarketplaceFiltersProps {
  initialValues?: Partial<FilterValues>;
  onFilterChange: (filters: FilterValues) => void;
}

const MarketplaceFilters = ({
  initialValues,
  onFilterChange
}: MarketplaceFiltersProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    searchTerm: initialValues?.searchTerm || '',
    minVram: initialValues?.minVram || 4,
    maxPrice: initialValues?.maxPrice || 3,
    onlineOnly: initialValues?.onlineOnly || false,
    sortBy: initialValues?.sortBy || 'price_asc'
  });
  
  const [searchValue, setSearchValue] = useState(filters.searchTerm);
  
  // Debounced search to prevent too many API calls
  const debouncedSearch = debounce((value: string) => {
    setFilters(prev => ({ ...prev, searchTerm: value }));
  }, 300);
  
  // Update search term when input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };
  
  // Update filters when any value changes
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);
  
  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden flex justify-between items-center mb-4">
        <div className="relative w-full mr-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search GPUs..."
            className="pl-9"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsVisible(!isVisible)}
          aria-label="Toggle filters"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      <div className={`
        lg:block 
        ${isVisible ? 'block fixed inset-0 z-40 bg-background p-4 overflow-auto' : 'hidden'}
      `}>
        {isVisible && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Filters</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(false)}
              aria-label="Close filters"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        <div className={`
          bg-card p-4 rounded-lg
          ${isVisible ? 'border-none' : 'border border-border'}
        `}>
          <h3 className="text-lg font-medium mb-4 hidden lg:block">Filters</h3>
          
          <div className="space-y-6">
            {/* Search - desktop only (mobile is above) */}
            <div className="hidden lg:block">
              <Label className="text-sm font-medium text-gray-400 mb-2">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search GPU models..."
                  className="pl-9"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            
            {/* GPU Type / Manufacturer */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-400">GPU Type</Label>
              <Select 
                defaultValue="all"
                onValueChange={(value) => {
                  setFilters(prev => ({ ...prev, searchTerm: value === 'all' ? '' : value }));
                  setSearchValue(value === 'all' ? '' : value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All GPUs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All GPUs</SelectItem>
                  <SelectItem value="NVIDIA">NVIDIA</SelectItem>
                  <SelectItem value="RTX 4090">NVIDIA RTX 4090</SelectItem>
                  <SelectItem value="RTX 3080">NVIDIA RTX 3080</SelectItem>
                  <SelectItem value="A100">NVIDIA A100</SelectItem>
                  <SelectItem value="AMD">AMD</SelectItem>
                  <SelectItem value="Radeon">AMD Radeon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Memory (VRAM) filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-400">Memory (VRAM)</Label>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>4 GB</span>
                <span>80 GB</span>
              </div>
              <Slider
                defaultValue={[filters.minVram]}
                min={4}
                max={80}
                step={4}
                onValueChange={(values) => setFilters(prev => ({ ...prev, minVram: values[0] }))}
              />
              <div className="text-center text-xs text-gray-500 mt-1">
                Min: {filters.minVram} GB
              </div>
            </div>
            
            {/* Price per hour filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-400">Price per hour</Label>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>$0.10</span>
                <span>$5.00</span>
              </div>
              <Slider
                defaultValue={[filters.maxPrice]}
                min={0.1}
                max={5}
                step={0.1}
                onValueChange={(values) => setFilters(prev => ({ ...prev, maxPrice: values[0] }))}
              />
              <div className="text-center text-xs text-gray-500 mt-1">
                Max: ${filters.maxPrice.toFixed(2)} / hr
              </div>
            </div>
            
            {/* Online Providers Only */}
            <div className="flex items-center space-x-2">
              <Switch
                id="online-only"
                checked={filters.onlineOnly}
                onCheckedChange={(checked) => setFilters(prev => ({ ...prev, onlineOnly: checked }))}
              />
              <Label htmlFor="online-only">Online Providers Only</Label>
            </div>
            
            {/* Sort By */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-400">Sort By</Label>
              <Select 
                defaultValue={filters.sortBy}
                onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Price: Low to High" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Mobile Apply Button */}
            {isVisible && (
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-black"
                onClick={() => setIsVisible(false)}
              >
                Apply Filters
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketplaceFilters;
