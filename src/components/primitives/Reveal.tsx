'use client';

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
} from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;      // ms
  once?: boolean;
};

// Wraps children in a fade-up-on-scroll container using IntersectionObserver.
// The .reveal / .is-visible classes are defined in globals.css so this respects
// prefers-reduced-motion via the CSS media query.
export const Reveal = ({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  once = true,
}: Props) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let timeoutId: number | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutId = window.setTimeout(() => setVisible(true), delay);
            if (once) io.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' },
    );

    io.observe(node);
    return () => {
      io.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [delay, once]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={cn('reveal', visible && 'is-visible', className)}
    >
      {children}
    </Tag>
  );
};
