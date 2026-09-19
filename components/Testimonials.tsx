"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from 'next-intl';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonialsData = [
  { key: "1", countryCode: "my", rating: 5 },
  { key: "2", countryCode: "sg", rating: 5 },
  { key: "3", countryCode: "my", rating: 5 },
  { key: "4", countryCode: "bn", rating: 5 },
  { key: "5", countryCode: "my", rating: 5 }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations('Testimonials');

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? testimonialsData.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === testimonialsData.length - 1 ? 0 : current + 1));
  };

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="testimonials" ref={containerRef} className="relative w-full text-cream-white min-h-[70vh] flex flex-col justify-center py-20 md:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/social_proof_bg_green.jpg"
          alt="Social Proof Background"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
        {/* Dark olive overlay for readability */}
        <div className="absolute inset-0 bg-[#2C3322]/70"></div>
      </div>

      <div className="relative z-10 max-w-screen-lg mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        <span className="eyebrow text-olive-gold mb-12 block drop-shadow-sm">{t('eyebrow')}</span>
        
        {/* Quote Carousel */}
        <div className="relative w-full min-h-[40vh] md:min-h-[35vh] flex items-center justify-center">
          {testimonialsData.map((tData, idx) => (
            <div 
              key={idx}
              className={`absolute transition-all duration-1000 ease-in-out w-full ${
                idx === activeIndex ? "opacity-100 translate-y-0 relative" : "opacity-0 translate-y-8 absolute pointer-events-none"
              }`}
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(tData.rating)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-olive-gold">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-2xl md:text-4xl font-display leading-tight tracking-tight text-cream-white mb-8">
                &ldquo;{t(`reviews.${tData.key}.quote`)}&rdquo;
              </p>
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-3">
                  <img 
                    src={`https://flagcdn.com/w80/${tData.countryCode}.png`}
                    srcSet={`https://flagcdn.com/w160/${tData.countryCode}.png 2x`}
                    width="40"
                    alt={`${tData.countryCode} flag`}
                    className="rounded-sm shadow-sm"
                  />
                  <span className="font-body text-base md:text-lg tracking-widest uppercase text-cream-white/90">{t(`reviews.${tData.key}.author`)}</span>
                </div>
                <span className="font-body text-sm text-olive-gold italic mt-1">{t(`reviews.${tData.key}.product`)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center gap-8 mt-12">
          <button 
            onClick={prev}
            className="w-11 h-11 flex items-center justify-center border border-cream-white/30 rounded-full hover:bg-cream-white hover:text-[#5F6347] transition-colors group"
            aria-label="Previous testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:-translate-x-0.5 transition-transform">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="flex gap-3">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                  idx === activeIndex ? "bg-cream-white" : "bg-cream-white/30 hover:bg-cream-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={next}
            className="w-11 h-11 flex items-center justify-center border border-cream-white/30 rounded-full hover:bg-cream-white hover:text-[#5F6347] transition-colors group"
            aria-label="Next testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
