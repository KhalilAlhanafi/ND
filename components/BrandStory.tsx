"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useTranslations } from 'next-intl';

export default function BrandStory() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('BrandStory');

  useGSAP(() => {
    if (!textRef.current) return;

    // Split text effect manually for paragraphs
    const paragraphs = textRef.current.querySelectorAll("p");
    
    gsap.from(paragraphs, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom 80%",
        toggleActions: "play none none reverse"
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

  }, { scope: containerRef });

  return (
    <section 
      id="philosophy"
      ref={containerRef} 
      className="w-full min-h-0 md:min-h-screen bg-taupe text-ink py-24 md:py-32 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-24"
    >
      {/* Left: Video */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-[80vh] relative overflow-hidden">
        <video 
          src="/intro.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-1000"
        />
      </div>

      {/* Right: Text Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center" ref={textRef}>
        <span className="eyebrow text-sage-dark mb-8 block">{t('eyebrow')}</span>
        
        <h2 className="text-4xl md:text-6xl font-display mb-8 leading-tight">
          {t('heading')}
        </h2>
        
        <div className="space-y-6 text-base md:text-xl font-light font-body max-w-xl">
          <p>
            {t('p1')}
          </p>
          <p>
            {t('p2')}
          </p>
          <p>
            {t('p3')}
          </p>
          <p>
            {t('p4')}
          </p>
        </div>
      </div>
    </section>
  );
}
