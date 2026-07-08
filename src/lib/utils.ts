import { clsx, type ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const aspectRatioClass = (ratio: string): string => {
  switch (ratio) {
    case '1:1':  return 'aspect-square';
    case '4:5':  return 'aspect-[4/5]';
    case '16:9': return 'aspect-[16/9]';
    case '21:9': return 'aspect-[21/9]';
    case '3:4':  return 'aspect-[3/4]';
    case '3:2':  return 'aspect-[3/2]';
    default:     return 'aspect-square';
  }
};

export const formatPence = (pence: number): string =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(pence / 100);

export const slugify = (input: string): string =>
  input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
