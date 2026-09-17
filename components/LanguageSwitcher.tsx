"use client";

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';

export default function LanguageSwitcher({ scrolled }: { scrolled: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = (nextLocale: string) => {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const t = useTranslations('LanguageSwitcher');

  return (
    <div className="flex items-center bg-stone/20 rounded-full p-1 backdrop-blur-sm border border-stone/30 shadow-sm relative z-50">
      <button
        onClick={() => toggleLocale('en')}
        disabled={isPending || locale === 'en'}
        className={`px-3 py-1.5 rounded-full font-body text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
          locale === 'en' 
            ? 'bg-olive-gold text-cream-white shadow-md' 
            : scrolled ? 'text-ink/60 hover:text-ink' : 'text-cream-white/60 hover:text-cream-white'
        } ${isPending ? 'opacity-50 cursor-wait' : ''}`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => toggleLocale('ms')}
        disabled={isPending || locale === 'ms'}
        className={`px-3 py-1.5 rounded-full font-body text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
          locale === 'ms' 
            ? 'bg-olive-gold text-cream-white shadow-md' 
            : scrolled ? 'text-ink/60 hover:text-ink' : 'text-cream-white/60 hover:text-cream-white'
        } ${isPending ? 'opacity-50 cursor-wait' : ''}`}
        aria-label="Tukar ke Bahasa Melayu"
      >
        MS
      </button>
    </div>
  );
}
