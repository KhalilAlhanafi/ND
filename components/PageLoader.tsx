"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current || !textRef.current) return;

    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        if (loaderRef.current) loaderRef.current.style.display = "none";
      }
    });

    // Reveal text
    tl.fromTo(textRef.current.children, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    )
    // Hold for a moment
    .to({}, { duration: 0.5 })
    // Fade out text
    .to(textRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" })
    // Slide loader up to reveal page
    .to(loaderRef.current, { 
      yPercent: -100, 
      duration: 1, 
      ease: "power4.inOut" 
    });

  }, []);

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-[200] bg-[#F5F2EB] flex items-center justify-center overflow-hidden"
    >
      {/* Background organic shapes */}
      {/* Bottom Middle Sand Area */}
      <svg className="absolute bottom-0 left-[10%] md:left-[20%] w-[80vw] md:w-[900px] h-auto text-[#DFD6C8]" viewBox="0 0 400 150" fill="currentColor">
        <path d="M0,150 C120,20 280,50 400,150 Z" />
      </svg>
      
      {/* Bottom Right Olive Green Area */}
      <svg className="absolute bottom-0 right-0 w-[55vw] md:w-[650px] h-auto text-[#626A50] drop-shadow-2xl" viewBox="0 0 300 200" fill="currentColor">
        <path d="M300,200 L300,10 C200,100 80,150 0,200 Z" />
      </svg>
      
      {/* Bottom Left Terracotta Area */}
      <svg className="absolute bottom-0 left-0 w-[50vw] md:w-[500px] h-auto text-[#9E5135] drop-shadow-2xl" viewBox="0 0 250 200" fill="currentColor">
        <path d="M0,200 L0,0 C80,120 180,170 250,200 Z" />
      </svg>
      
      {/* Top Right Stone Area */}
      <svg className="absolute top-0 right-0 w-[40vw] md:w-[400px] h-auto text-[#C8C2B3] drop-shadow-md" viewBox="0 0 200 200" fill="currentColor">
        <path d="M200,0 L200,160 C120,140 50,70 10,0 Z" />
      </svg>

      <div ref={textRef} className="text-center flex flex-col items-center z-10">
        <div className="relative w-64 h-48 md:w-80 md:h-64 mb-2">
          <Image 
            src="/logo-v3.png" 
            alt="ND Logo" 
            fill
            sizes="(max-width: 768px) 256px, 320px"
            className="object-contain object-center"
            priority
          />
        </div>
        
        <p className="font-body text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#3A4931] mb-5 pl-2 font-medium">
          Natural <span className="text-[#A28250] mx-2 text-[8px]">•</span> Beauty <span className="text-[#A28250] mx-2 text-[8px]">•</span> House
        </p>
        
        <div className="flex items-center space-x-4">
          <div className="w-10 h-[1px] bg-[#A28250]"></div>
          <p className="font-body text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#3A4931]">
            ND Natural Products
          </p>
          <div className="w-10 h-[1px] bg-[#A28250]"></div>
        </div>
      </div>
    </div>
  );
}
