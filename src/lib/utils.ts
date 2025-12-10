import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LEETCODE_TOTALS = {
  easy: 916,
  medium: 1966,
  hard: 891
} as const;