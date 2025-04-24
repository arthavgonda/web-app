import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// Format large numbers with commas
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

// Generate an array of GPU manufacturers
export const gpuManufacturers = [
  "NVIDIA",
  "AMD",
  "Intel"
];

// Generate an array of popular GPU models
export const gpuModels = [
  "RTX 4090",
  "RTX 4080",
  "RTX 3090",
  "RTX 3080 Ti",
  "RTX 3080",
  "RTX 3070",
  "RTX 3060",
  "A100",
  "A6000",
  "A4000",
  "T4",
  "V100",
  "Radeon RX 7900 XTX",
  "Radeon RX 7900 XT",
  "Radeon RX 6900 XT",
  "Radeon RX 6800 XT",
  "Radeon Pro W6800",
  "Arc A770",
  "Arc A750"
];

// User role types
export type UserRole = "client" | "provider";

// GPU status type
export type GpuStatus = "online" | "offline" | "busy";

// Job status type
export type JobStatus = "pending" | "running" | "completed" | "failed";

// Ensure a value is always between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Convert bytes to a more readable format
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Generate a rating component based on a score
export function getRatingStars(rating: number): { full: number; half: number; empty: number } {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return {
    full: fullStars,
    half: hasHalfStar ? 1 : 0,
    empty: emptyStars
  };
}

// Generate a random URL-friendly string
export function generateRandomId(length = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

// Check if a value is defined
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

// Create a debounced function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}

// Group an array by a specific key
export function groupBy<T, K extends keyof any>(
  array: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return array.reduce((result, item) => {
    const key = getKey(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<K, T[]>);
}
