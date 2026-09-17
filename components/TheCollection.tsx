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

const productsData = [
  {
    id: "laurel-soap",
    key: "soap",
    image: "/product_collection_soap_v2.jpg",
  },
  {
    id: "castor-oil",
    key: "oil",
    image: "/product_collection_oil_v3.jpg",
    secondaryImages: [
      {
        src: "/castor-results.jpg",
        alt: "Before and After Results",
        title: "Real Results" // Need to translate this? Let's assume yes, or just use hardcoded for now, or add to translation file if needed. But for simplicity, I can just use t() dynamically.
      },
      {
        src: "/castor-apply.jpg",
        alt: "Applying Castor Oil",
        title: "How to Apply"
      }
    ]
  },
];

export default function TheCollection() {
  const containerRef = useRef<HTMLElement>(null);
  const t = useTranslations('TheCollection');

  useGSAP(() => {
    if (!containerRef.current) return;

    const sections = gsap.utils.toArray(".product-section");

    sections.forEach((section: any) => {
      const image = section.querySelector(".product-image");
      const textElements = section.querySelectorAll(".product-text");

      // Image parallax reveal
      gsap.fromTo(
        image,
        { scale: 1.1, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );

      // Text stagger reveal
      gsap.fromTo(
        textElements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="collection" ref={containerRef} className="w-full bg-[#121E26] text-cream-white pt-32 pb-32">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="mb-24 md:mb-40 text-center">
          <span className="eyebrow text-olive-gold mb-4 block">{t('eyebrow')}</span>
          <h2 className="text-4xl md:text-6xl font-display">{t('heading')}</h2>
        </div>

        <div className="flex flex-col gap-32 md:gap-64">
          {productsData.map((product, index) => {
            const isEven = index % 2 === 0;
            
            // Explicitly cast or handle translation arrays
            // next-intl raw() returns the underlying value (e.g. array)
            const benefits = t.raw(`products.${product.key}.benefits`) as string[] | undefined;
            const ingredients = t.raw(`products.${product.key}.ingredients`) as string[] | undefined;
            
            // Some optional string fields
            const tagline = t.has(`products.${product.key}.tagline`) ? t(`products.${product.key}.tagline`) : null;
            const applicationNote = t.has(`products.${product.key}.applicationNote`) ? t(`products.${product.key}.applicationNote`) : null;
            const note = t.has(`products.${product.key}.note`) ? t(`products.${product.key}.note`) : null;

            return (
              <div
                key={product.id}
                className={`product-section flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-12 md:gap-24`}
              >
                {/* Image Column */}
                <div className="w-full md:w-3/5 flex flex-col gap-6">
                  {/* Main Image */}
                  <div className="w-full h-[60vh] md:h-[85vh] relative overflow-hidden group">
                    <Image
                      src={product.image}
                      alt={t(`products.${product.key}.name`)}
                      fill
                      className="product-image object-cover transition-transform duration-[3s] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </div>

                  {/* Secondary Images */}
                  {/* @ts-ignore */}
                  {product.secondaryImages && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                      {/* @ts-ignore */}
                      {product.secondaryImages.map((img, idx) => (
                        <div key={idx} className="flex flex-col gap-3">
                          <span className="eyebrow text-olive-gold block mb-1">{img.title}</span>
                          <div className="w-full relative overflow-hidden group">
                            <Image
                              src={img.src}
                              alt={img.alt}
                              width={800}
                              height={450}
                              className="w-full h-auto object-contain transition-transform duration-[3s]"
                              sizes="(max-width: 768px) 100vw, 30vw"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div className="w-full md:w-2/5 flex flex-col items-start">
                  <h3 className="product-text text-4xl md:text-5xl font-display mb-4 text-cream-white">
                    {t(`products.${product.key}.name`)}
                  </h3>
                  {tagline && (
                    <p className="product-text text-xl md:text-2xl font-display text-cream-white/80 mb-6 italic">
                      {tagline}
                    </p>
                  )}
                  <p className="product-text text-lg font-body font-light leading-relaxed mb-10 text-cream-white/70 whitespace-pre-line">
                    {t(`products.${product.key}.description`)}
                  </p>

                  {benefits && benefits.length > 0 && (
                    <div className="product-text w-full mb-6">
                      <span className="eyebrow text-olive-gold block mb-4">{t('keyBenefits')}</span>
                      <ul className="flex flex-col gap-2">
                        {benefits.map((benefit: string, i: number) => (
                          <li key={i} className="font-body text-sm tracking-wide text-cream-white/80 flex items-start gap-2">
                            <span className="text-olive-gold mt-0.5">*</span> {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {ingredients && ingredients.length > 0 && (
                    <div className="product-text w-full mb-6">
                      <span className="eyebrow text-olive-gold block mb-4">{t('ingredients')}</span>
                      <ul className="flex flex-col gap-2">
                        {ingredients.map((ingredient: string, i: number) => (
                          <li key={i} className="font-body text-sm tracking-wide text-cream-white/80">
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {applicationNote && (
                    <div className="product-text w-full mb-6">
                      <span className="eyebrow text-olive-gold block mb-4">{t('applicationNote')}</span>
                      <p className="font-body text-sm tracking-wide text-cream-white/80 leading-relaxed">
                        {applicationNote}
                      </p>
                    </div>
                  )}

                  {note && (
                    <p className="product-text text-sm font-body italic text-cream-white/60 mb-10 pb-10 border-b border-cream-white/20">
                      {note}
                    </p>
                  )}
                  {(!note) && <div className="w-full mb-10 pb-10 border-b border-cream-white/20" />}

                  <div className="product-text flex items-center justify-between w-full">
                    <button className="bg-sage text-cream-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-stone transition-colors duration-300 ml-auto">
                      {t('shopNow')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
