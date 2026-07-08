import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { footerNav } from '@/data/nav';
import { site } from '@/lib/seo';
import { Icon } from '@/components/primitives/Icon';

const PAYMENTS = ['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay'] as const;

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-rp-charcoal text-rp-white pt-20 pb-8 mt-16">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo variant="white" size="lg" />
            <p className="mt-6 text-body text-rp-white/70 max-w-xs">
              Here to rekindle humankind’s connection with the natural world.
            </p>
            <p className="mt-6 text-eyebrow uppercase text-rp-white/60">
              Designed in the Peak District, UK
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <FooterCol title="Shop" links={footerNav.shop} />
            <FooterCol title="Support" links={footerNav.support} />
            <FooterCol title="Company" links={footerNav.company} />
            <FooterCol title="Legal" links={footerNav.legal} />
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <p className="text-caption text-rp-white/60">
            © {year} {site.legalEntityName}. Registered in {site.registeredIn}.
          </p>
          <div className="flex items-center gap-2 order-3 md:order-none">
            {PAYMENTS.map((name) => (
              <span
                key={name}
                className="inline-flex items-center justify-center h-6 px-2 rounded-sm bg-white/8 border border-white/15 text-[9px] uppercase tracking-eyebrow text-rp-white/75"
              >
                {name}
              </span>
            ))}
          </div>
          {(site.social.instagram || site.social.tiktok) && (
            <div className="flex items-center gap-3">
              {site.social.instagram && (
                <Link
                  href={`https://instagram.com/${site.social.instagram}`}
                  aria-label="Instagram"
                  className="text-rp-white/70 hover:text-rp-white"
                >
                  <Icon name="instagram" />
                </Link>
              )}
              {site.social.tiktok && (
                <Link
                  href={`https://tiktok.com/@${site.social.tiktok}`}
                  aria-label="TikTok"
                  className="text-rp-white/70 hover:text-rp-white"
                >
                  <Icon name="tiktok" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) => (
  <div>
    <h3 className="text-eyebrow uppercase text-rp-white/60 mb-4">{title}</h3>
    <ul className="space-y-2">
      {links.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className="text-body text-rp-white/85 hover:text-rp-white transition-colors"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
