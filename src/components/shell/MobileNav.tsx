'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { primaryNav, footerNav } from '@/data/nav';
import { Icon } from '@/components/primitives/Icon';
import { Logo } from '@/components/brand/Logo';
import { cn } from '@/lib/utils';

type Props = { open: boolean; onClose: () => void };

export const MobileNav = ({ open, onClose }: Props) => {
  // Lock scroll while open, and honour Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-rp-charcoal/45 z-40 transition-opacity md:hidden',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-[86%] max-w-sm bg-rp-white z-50 flex flex-col md:hidden shadow-2xl',
          'transition-transform duration-300 ease-standard',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-hidden={!open}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-rp-hairline">
          <Logo variant="blue" size="sm" asLink={false} />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 -m-2 text-rp-charcoal"
          >
            <Icon name="close" className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <ul>
            {primaryNav.map((link) => (
              <li key={link.href} className="border-b border-rp-hairline">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-4 text-h2-brand uppercase tracking-headline"
                >
                  <span>{link.label}</span>
                  <Icon name="chevron-right" className="h-5 w-5 text-rp-slate" strokeWidth={1.5} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-5 py-6 border-t border-rp-hairline">
          <p className="text-eyebrow uppercase text-rp-slate mb-3">Support</p>
          <ul className="space-y-2">
            {footerNav.support.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={onClose} className="text-body text-rp-charcoal">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};
