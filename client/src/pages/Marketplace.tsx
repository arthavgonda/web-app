import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import GpuCard from "@/components/GpuCard";
import MarketplaceFilters, { FilterValues } from "@/components/MarketplaceFilters";
import { Gpu } from "@shared/schema";

const Marketplace = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterValues>({
    searchTerm: '',
    minVram: 4,
    maxPrice: 3,
    onlineOnly: false,
    sortBy: 'price_asc'
  });

  // Construct the query string based on filters
  const buildQueryString = () => {
    const params = new URLSearchParams();
    
    if (filters.searchTerm) {
      params.append('name', filters.searchTerm);
    }
    
    if (filters.minVram > 4) {
      params.append('minVram', filters.minVram.toString());
    }
    
    if (filters.maxPrice < 5) {
      params.append('maxPrice', filters.maxPrice.toString());
    }
    
    if (filters.onlineOnly) {
      params.append('isOnline', 'true');
    }
    
    return params.toString();
  };

  const queryString = buildQueryString();
  const queryKey = queryString ? `/api/gpus?${queryString}` : '/api/gpus';

  const { data: gpus, isLoading, isError } = useQuery<Gpu[]>({
    queryKey: [queryKey],
  });

  // Sort the GPUs based on the selected sort option
  const sortedGpus = [...(gpus || [])].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price_asc':
        return a.pricePerHour - b.pricePerHour;
      case 'price_desc':
        return b.pricePerHour - a.pricePerHour;
      case 'performance':
        return b.tensorScore - a.tensorScore;
      case 'rating':
        // In a real app, this would sort by the actual ratings
        return b.tensorScore - a.tensorScore;
      default:
        return 0;
    }
  });

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">GPU Marketplace</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <MarketplaceFilters initialValues={filters} onFilterChange={handleFilterChange} />
        </div>
        
        {/* GPU Cards */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-400">
              {isLoading ? 'Loading...' : `${sortedGpus?.length || 0} GPUs found`}
            </div>
            <div className="flex items-center">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="rounded-l-md rounded-r-none"
                aria-label="List view"
              >
                <LayoutList className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="rounded-r-md rounded-l-none"
                aria-label="Grid view"
              >
                <LayoutGrid className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-[hsl(var(--primary))]" />
            </div>
          ) : isError ? (
            <div className="text-center py-12 bg-card rounded-lg">
              <p className="text-lg text-red-400">Error loading GPUs. Please try again later.</p>
            </div>
          ) : sortedGpus?.length ? (
            <div className={viewMode === 'grid' ? 'grid-cards' : 'space-y-4'}>
              {sortedGpus.map((gpu) => (
                <div key={gpu.id} className={viewMode === 'grid' ? '' : 'w-full'}>
                  <GpuCard gpu={gpu} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg">
              <p className="text-lg text-gray-400">No GPUs match your filters</p>
              <Button 
                className="mt-4"
                onClick={() => setFilters({
                  searchTerm: '',
                  minVram: 4,
                  maxPrice: 3,
                  onlineOnly: false,
                  sortBy: 'price_asc'
                })}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

// Add CSS for grid layout
const gridStyles = `
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
`;

// Add the styles to the page
const styleElement = document.createElement('style');
styleElement.textContent = gridStyles;
document.head.appendChild(styleElement);
