"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const upcomingProducts = [
  {
    id: "coffee-soap",
    name: "Coffee Espresso Soap",
    category: "Body",
    image: "/teaser-coffee.jpg",
  },
  {
    id: "frankincense-oil",
    name: "Frankincense Resin Oil",
    category: "Face",
    image: "/ritual-press.jpg",
  },
  {
    id: "senna-tea",
    name: "Wild Senna Leaf Tea",
    category: "Internal",
    image: "/ritual-cure.jpg",
  },
  {
    id: "essential-oils",
    name: "Single Note Essences",
    category: "Aromatherapy",
    image: "/ritual-harvest.jpg",
  },
  {
    id: "scrubs",
    name: "Botanical Body Scrubs",
    category: "Body",
    image: "/teaser-coffee.jpg",
  },
  {
    id: "skin-serum",
    name: "Overnight Repair Serum",
    category: "Face",
    image: "/ritual-press.jpg",
  },
];

export default function ComingSoon() {
  const [notified, setNotified] = useState<Record<string, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleNotifyClick = (id: string) => {
    setNotified(prev => ({ ...prev, [id]: true }));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? window.innerWidth * 0.3 : window.innerWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full bg-stone text-ink py-32 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-ink/20 pb-12">
          <div>
            <span className="eyebrow text-olive-gold mb-4 block">Future</span>
            <h2 className="text-4xl md:text-5xl font-display">Coming Soon</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 justify-between w-full md:w-auto">
            <p className="font-body font-light text-ink/70 max-w-sm text-sm md:text-base">
              Currently resting in our apothecary. Subscribe to be notified the moment these small-batch releases are ready.
            </p>
            
            <div className="flex gap-4 shrink-0">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 flex items-center justify-center border border-ink/30 rounded-full hover:bg-ink hover:text-stone transition-colors group"
                aria-label="Scroll left"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:-translate-x-1 transition-transform">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 flex items-center justify-center border border-ink/30 rounded-full hover:bg-ink hover:text-stone transition-colors group"
                aria-label="Scroll right"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Snap Gallery */}
      <div className="w-full pl-6 md:pl-12">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {upcomingProducts.map((product) => (
            <div 
              key={product.id} 
              className="snap-start shrink-0 w-[80vw] sm:w-[50vw] md:w-[30vw] lg:w-[22vw] flex flex-col group cursor-pointer"
            >
              <div className="w-full aspect-[3/4] relative overflow-hidden mb-6 bg-ink/20">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale-[20%]"
                  sizes="(max-width: 768px) 80vw, 30vw"
                />
                
                {/* Olive Gold Label overlay */}
                <div className="absolute top-4 left-4 bg-olive-gold text-ink text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                  In Production
                </div>
              </div>

              <span className="eyebrow text-olive-gold/80 mb-2 block text-xs">{product.category}</span>
              {/* Made font bold as requested */}
              <h3 className="text-2xl font-display font-bold mb-4">{product.name}</h3>
              
              <button 
                onClick={() => handleNotifyClick(product.id)}
                className={`text-left text-sm font-body uppercase tracking-wider border-b pb-1 w-max transition-colors duration-300 ${
                  notified[product.id] 
                    ? "border-transparent text-sage cursor-default" 
                    : "border-ink/30 hover:border-ink text-ink/80 hover:text-ink"
                }`}
              >
                {notified[product.id] ? "Added to list" : "Notify Me"}
              </button>
            </div>
          ))}
          {/* Empty spacer div to allow the last item to scroll fully into view */}
          <div className="shrink-0 w-6 md:w-12"></div>
        </div>
      </div>
    </section>
  );
}
