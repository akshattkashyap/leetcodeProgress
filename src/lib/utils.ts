import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LEETCODE_TOTALS = {
  easy: 910,
  medium: 1944,
  hard: 881
} as const;