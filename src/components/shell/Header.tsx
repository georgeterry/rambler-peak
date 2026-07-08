'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { Icon } from '@/components/primitives/Icon';
import { MobileNav } from './MobileNav';
import { primaryNav } from '@/data/nav';
import { useCart } from '@/lib/cart';
import { cn } from '@/lib/utils';

const SCROLL_THRESHOLD = 40;

// Routes that open with a full-bleed hero. On these, the header starts
// transparent over the imagery and turns solid on scroll. Everywhere else it
// is solid and a spacer keeps content clear of the fixed bar.
const OVERLAY_ROUTES = new Set(['/']);

export const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, open: openCart, hasHydrated } = useCart();

  useEffect(() => {
    const checkScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const overlayEligible = OVERLAY_ROUTES.has(pathname);
  const isOverlay = overlayEligible && !scrolled;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-40 transition-colors duration-200',
          isOverlay
            ? 'bg-transparent text-rp-white'
            : 'bg-rp-white text-rp-charcoal border-b border-rp-hairline',
        )}
      >
        <div className="container-x flex items-center justify-between h-16 md:h-20">
          <Logo variant={isOverlay ? 'white' : 'blue'} size="md" priority />

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-eyebrow uppercase transition-colors',
                  isOverlay ? 'text-rp-white hover:text-rp-white/70' : 'hover:text-rp-blue',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-3">
            <button
              type="button"
              onClick={openCart}
              aria-label={
                hasHydrated
                  ? `Basket, ${itemCount} item${itemCount !== 1 ? 's' : ''}`
                  : 'Basket'
              }
              className="relative p-2 hover:opacity-80"
            >
              <Icon name="bag" className="h-6 w-6" strokeWidth={1.6} />
              {hasHydrated && itemCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 bg-rp-blue text-rp-white text-[10px] font-semibold rounded-full px-1 flex items-center justify-center"
                  style={{ height: 18, minWidth: 18 }}
                  aria-hidden
                >
                  {itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-2"
            >
              <Icon name="menu" className="h-6 w-6" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>
      {/* Spacer keeps content clear of the fixed bar on non-hero pages */}
      {!overlayEligible && <div className="h-16 md:h-20" aria-hidden />}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};
