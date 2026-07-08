'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/primitives/Icon';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type Props = {
  src: string;
  poster: string;
  title: string;          // accessible name for the video
  location: string;       // analytics context, e.g. "homepage"
  className?: string;
};

// Click-to-play film block. Nothing downloads or moves until the visitor asks
// for it — in keeping with the restrained-motion rules. The play affordance
// reuses the brand's thick white ring.
export const VideoBlock = ({ src, poster, title, location, className }: Props) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-lg bg-rp-charcoal',
        className,
      )}
    >
      {playing ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="none"
          aria-label={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            trackEvent({ name: 'video_play', video: src, location });
          }}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
          />
          <span className="absolute inset-0 overlay-flat opacity-60 transition-opacity group-hover:opacity-40" />
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full ring-[5px] md:ring-[6px] ring-white bg-rp-charcoal/30 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-105"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-10 md:w-10 fill-white ml-1">
              <path d="M8 5.5v13l11-6.5-11-6.5z" />
            </svg>
          </span>
          <span className="absolute bottom-5 left-5 md:bottom-8 md:left-8 text-left">
            <span className="block text-eyebrow uppercase text-rp-white/80">Watch the film</span>
            <span className="mt-1 block text-h2-brand display-brand text-rp-white">{title}</span>
          </span>
        </button>
      )}
      <noscript>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video src={src} poster={poster} controls preload="none" className="absolute inset-0 h-full w-full" />
      </noscript>
    </div>
  );
};
