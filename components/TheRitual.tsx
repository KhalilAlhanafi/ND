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

const stepsData = [
  {
    num: "01",
    key: "1",
    img: "/ritual-harvest-v2.jpg",
  },
  {
    num: "02",
    key: "2",
    img: "/ritual-press-v2.jpg",
  },
  {
    num: "03",
    key: "3",
    img: "/ritual-cure-v2.jpg",
  },
  {
    num: "04",
    key: "4",
    img: "/ritual-finish-v2.jpg",
  },
];

export default function TheRitual() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('TheRitual');

  useGSAP(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const sections = gsap.utils.toArray(".ritual-step");

    // Horizontal scroll animation
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: "+=200%",
      },
    });
  }, { scope: containerRef });

  return (
    <section 
      id="ritual"
      ref={containerRef} 
      className="w-full h-screen bg-beige text-ink overflow-hidden flex flex-col justify-center relative"
    >
      {/* Header that stays pinned above the scrolling content */}
      <div className="absolute top-12 left-6 md:top-24 md:left-12 z-10">
        <span className="eyebrow text-olive-gold mb-4 block">{t('eyebrow')}</span>
        <h2 className="text-4xl md:text-5xl font-display">{t('heading')}</h2>
      </div>

      {/* Scrolling Container */}
      <div 
        ref={scrollRef} 
        className="flex w-[400vw] h-full pt-32 md:pt-48 pb-12 items-center"
      >
        {stepsData.map((step, index) => (
          <div 
            key={index} 
            className="ritual-step w-screen h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-24 gap-12"
          >
            {/* Image Box */}
            <div className="w-full md:w-1/2 h-[45vh] md:h-[65vh] relative overflow-hidden group">
              <Image 
                src={step.img}
                alt={t(`steps.${step.key}.title`)}
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Text Box */}
            <div className="w-full md:w-1/3 flex flex-col">
              <span className="text-6xl md:text-8xl font-display text-ink mb-4 tracking-tighter">
                {step.num}
              </span>
              <h3 className="text-3xl md:text-4xl font-display mb-6 pb-6 border-b border-stone/50 uppercase">
                {t(`steps.${step.key}.title`)}
              </h3>
              <p className="text-lg font-body font-light text-ink/80 leading-relaxed max-w-md">
                {t(`steps.${step.key}.desc`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
