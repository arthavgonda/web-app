import { Link } from "wouter";
import { type Gpu } from "@shared/schema";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, StarHalf } from "lucide-react";

interface GpuCardProps {
  gpu: Gpu;
  showRentButton?: boolean;
}

const GpuCard = ({ gpu, showRentButton = true }: GpuCardProps) => {
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        <div className="flex items-center mr-2">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={`full-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />
          ))}
          
          {hasHalfStar && <StarHalf size={16} className="text-yellow-400 fill-yellow-400" />}
          
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={`empty-${i}`} size={16} className="text-gray-500" />
          ))}
        </div>
        <span className="text-sm text-gray-400">(48 reviews)</span>
      </div>
    );
  };
  
  return (
    <div className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition gpu-card cursor-pointer">
      <div className="p-4 border-b border-gray-800">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{gpu.name}</h3>
          <span className="flex items-center">
            <span className={`status-dot ${gpu.isOnline ? 'online' : 'offline'}`}></span>
            <span className={`text-sm ${gpu.isOnline ? 'text-green-500' : 'text-red-500'}`}>
              {gpu.isOnline ? 'Online' : 'Offline'}
            </span>
          </span>
        </div>
        <p className="text-sm text-gray-400">Provider: {`Provider-${gpu.providerId}`}</p>
      </div>
      
      <div className="p-4">
        <Link href={`/gpu/${gpu.id}`}>
          <img 
            src={gpu.imageUrl || 'https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
            alt={gpu.name} 
            className="w-full h-40 object-cover rounded mb-4"
          />
        </Link>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-black/30 p-2 rounded">
            <div className="text-xs text-gray-400">VRAM</div>
            <div className="font-medium">{gpu.vram} GB</div>
          </div>
          <div className="bg-black/30 p-2 rounded">
            <div className="text-xs text-gray-400">Cores</div>
            <div className="font-medium">{formatNumber(gpu.cores)}</div>
          </div>
          <div className="bg-black/30 p-2 rounded">
            <div className="text-xs text-gray-400">TensorScore</div>
            <div className="font-medium">{gpu.tensorScore.toFixed(1)}</div>
          </div>
          <div className="bg-black/30 p-2 rounded">
            <div className="text-xs text-gray-400">Price</div>
            <div className="font-medium text-[hsl(var(--primary))]">{formatCurrency(gpu.pricePerHour)}/hr</div>
          </div>
        </div>
        
        <div className="mb-4">
          {renderRatingStars(4.5)}
        </div>
        
        {showRentButton && (
          <Link href={`/gpu/${gpu.id}`}>
            {gpu.isOnline ? (
              <Button className="w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-black font-medium hover:opacity-90 transition">
                Rent Now
              </Button>
            ) : (
              <Button variant="secondary" className="w-full cursor-not-allowed opacity-70" disabled>
                Currently Offline
              </Button>
            )}
          </Link>
        )}
      </div>
    </div>
  );
};

export default GpuCard;
