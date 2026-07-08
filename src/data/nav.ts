export const primaryNav = [
  { href: '/shop', label: 'Shop' },
  { href: '/products/dreamlite-sleeping-mat', label: 'DreamLite Mat' },
  { href: '/products/camping-pillow', label: 'Pillow' },
  { href: '/about', label: 'Our Story' },
  { href: '/support', label: 'Support' },
] as const;

export const footerNav = {
  shop: [
    { href: '/products/dreamlite-sleeping-mat', label: 'DreamLite Sleeping Mat' },
    { href: '/products/camping-pillow', label: 'Camping Pillow' },
    { href: '/shop', label: 'All products' },
  ],
  support: [
    { href: '/support', label: 'FAQ & Care' },
    { href: '/shipping-returns', label: 'Shipping & Returns' },
    { href: '/contact', label: 'Contact' },
  ],
  company: [
    { href: '/about', label: 'Our Story' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
    { href: '/shipping-returns', label: 'Shipping & Returns' },
  ],
} as const;
