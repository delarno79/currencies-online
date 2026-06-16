import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateKeys(prefix: string, count: number): string[] {
  return Array.from({ length: count }, (_, idx) => `${prefix}-${idx}`)
}
