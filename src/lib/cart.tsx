'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import { products, type Product } from '@/data/products';
import { trackEvent } from '@/lib/analytics';

export type CartLine = { slug: string; quantity: number };
type CartState = { lines: CartLine[] };

type CartAction =
  | { type: 'add'; slug: string; quantity: number }
  | { type: 'remove'; slug: string }
  | { type: 'setQty'; slug: string; quantity: number }
  | { type: 'clear' }
  | { type: 'hydrate'; state: CartState };

const STORAGE_KEY = 'rp-basket-v1';

const reducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'hydrate':
      return action.state;
    case 'add': {
      const existing = state.lines.find((l) => l.slug === action.slug);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.slug === action.slug ? { ...l, quantity: l.quantity + action.quantity } : l
          ),
        };
      }
      return { lines: [...state.lines, { slug: action.slug, quantity: action.quantity }] };
    }
    case 'remove':
      return { lines: state.lines.filter((l) => l.slug !== action.slug) };
    case 'setQty':
      if (action.quantity <= 0) return { lines: state.lines.filter((l) => l.slug !== action.slug) };
      return {
        lines: state.lines.map((l) =>
          l.slug === action.slug ? { ...l, quantity: action.quantity } : l
        ),
      };
    case 'clear':
      return { lines: [] };
    default:
      return state;
  }
};

type LineWithProduct = CartLine & { product: Product };

type CartContextValue = {
  lines: LineWithProduct[];
  itemCount: number;
  subtotalPence: number;
  subtotal: string;
  isOpen: boolean;
  hasHydrated: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (slug: string, quantity?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Rehydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (parsed?.lines) dispatch({ type: 'hydrate', state: parsed });
      }
    } catch {
      // corrupted state — ignore
    }
    setHasHydrated(true);
  }, []);

  // Persist on every change once hydrated.
  useEffect(() => {
    if (!hasHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage unavailable (private mode) — fail silently.
    }
  }, [state, hasHydrated]);

  const lines = useMemo<LineWithProduct[]>(
    () =>
      state.lines
        .map((line) => {
          const product = products.find((p) => p.slug === line.slug);
          return product ? { ...line, product } : null;
        })
        .filter((x): x is LineWithProduct => Boolean(x)),
    [state.lines]
  );

  const itemCount = useMemo(() => lines.reduce((n, l) => n + l.quantity, 0), [lines]);
  const subtotalPence = useMemo(
    () => lines.reduce((n, l) => n + l.product.price.amount * l.quantity, 0),
    [lines]
  );
  const subtotal = useMemo(
    () =>
      new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(
        subtotalPence / 100
      ),
    [subtotalPence]
  );

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const add = useCallback((slug: string, quantity = 1) => {
    const product = products.find((p) => p.slug === slug);
    if (!product) return;
    dispatch({ type: 'add', slug, quantity });
    trackEvent({
      name: 'add_to_cart',
      product_slug: slug,
      quantity,
      price_gbp: product.price.amount / 100,
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback(
    (slug: string) => {
      const line = state.lines.find((l) => l.slug === slug);
      dispatch({ type: 'remove', slug });
      if (line) trackEvent({ name: 'remove_from_cart', product_slug: slug, quantity: line.quantity });
    },
    [state.lines]
  );

  const setQty = useCallback((slug: string, quantity: number) => {
    dispatch({ type: 'setQty', slug, quantity });
  }, []);

  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const value: CartContextValue = {
    lines,
    itemCount,
    subtotalPence,
    subtotal,
    isOpen,
    hasHydrated,
    open,
    close,
    toggle,
    add,
    remove,
    setQty,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
