"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from 'next-intl';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const valuesData = [
  { key: "1" },
  { key: "2" },
  { key: "3" },
  { key: "4" }
];

export default function Sustainability() {
  const containerRef = useRef<HTMLElement>(null);
  const t = useTranslations('Sustainability');

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      ".value-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section id="values" ref={containerRef} className="relative w-full text-cream-white min-h-screen flex items-center justify-center py-20 md:py-48 border-t border-stone/10 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/craft_values_bg.jpg"
          alt="Craft Values Background"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#121E26]/60"></div>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 text-center">
        <span className="eyebrow text-olive-gold mb-4 block">{t('eyebrow')}</span>
        <h2 className="text-4xl md:text-5xl font-display mb-16 drop-shadow-lg">{t('heading')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-16 text-left">
          {valuesData.map((value, idx) => (
            <div key={idx} className="value-item flex flex-col border-t border-cream-white/20 pt-6">
              <h3 className="text-2xl font-display text-cream-white mb-4 drop-shadow-md">{t(`items.${value.key}.title`)}</h3>
              <p className="font-body text-cream-white/80 leading-relaxed font-light drop-shadow-sm">
                {t(`items.${value.key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
