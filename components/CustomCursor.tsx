"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device has a mouse/trackpad (fine pointer)
    const hasFinePointer = window.matchMedia("(any-pointer: fine)").matches;
    if (!hasFinePointer) return;
    
    setIsVisible(true);

    const cursor = cursorRef.current;
    const label = cursorLabelRef.current;
    if (!cursor || !label) return;
    
    // Hide native cursor only when this component is active
    document.body.style.cursor = "none";
    
    // Set initial position immediately to avoid jumping from top-left
    let isInitialized = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isInitialized) {
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        isInitialized = true;
      } else {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out"
        });
      }
    };

    // Handle hover states on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find closest interactive element
      const interactiveEl = target.closest('a, button, input, .cursor-pointer') as HTMLElement | null;
      
      if (interactiveEl) {
        // Expand cursor
        gsap.to(cursor, {
          scale: 3,
          backgroundColor: "rgba(176, 141, 62, 0.9)", // olive-gold
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Hide native pointer on interactive elements that might override the body cursor
        interactiveEl.style.cursor = "none";
        
        // Check for specific labels
        if (interactiveEl.tagName === 'A') {
          label.innerText = "Visit";
          gsap.to(label, { opacity: 1, duration: 0.2 });
        } else if (interactiveEl.tagName === 'BUTTON') {
          label.innerText = "Click";
          gsap.to(label, { opacity: 1, duration: 0.2 });
        } else {
          gsap.to(label, { opacity: 0, duration: 0.2 });
        }
        
      } else {
        // Shrink cursor
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "rgba(44, 42, 36, 0.8)", // ink
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(label, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 -mt-2 -ml-2 rounded-full pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
      style={{ backgroundColor: "rgba(44, 42, 36, 0.8)" }} // default ink
    >
      <span 
        ref={cursorLabelRef}
        className="opacity-0 text-[3px] font-body uppercase tracking-widest text-cream-white absolute whitespace-nowrap"
        style={{ transform: "scale(0.33)" }} // Counteract the parent scale of 3
      >
      </span>
    </div>
  );
}
