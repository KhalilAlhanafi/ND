"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useTranslations } from 'next-intl';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navLinksData = [
  { key: "philosophy", href: "#philosophy" },
  { key: "ritual", href: "#ritual" },
  { key: "collection", href: "#collection" },
  { key: "values", href: "#values" },
  { key: "testimonials", href: "#testimonials" },
  { key: "journal", href: "#journal" },
];

export default function Header() {
  const t = useTranslations('Header.nav');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenis = useLenis();

  // Scroll detection & GSAP triggers
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const triggers: globalThis.ScrollTrigger[] = [];
    
    const timer = setTimeout(() => {
      navLinksData.forEach((link) => {
        const id = link.href.substring(1);
        const el = document.querySelector(link.href);
        if (el) {
          const st = ScrollTrigger.create({
            trigger: el,
            start: "top 40%",
            end: "bottom 40%",
            onEnter: () => setActiveSection(id),
            onEnterBack: () => setActiveSection(id),
          });
          triggers.push(st);
        }
      });
    }, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // Handle mobile menu scroll lock and escape key
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-beige/95 backdrop-blur-md border-b border-stone/30 py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={scrollToTop} className="relative block h-16 w-40 cursor-pointer z-50 transition-transform hover:scale-105">
            <Image 
              src="/logo-v3.png" 
              alt="ND Natural Products" 
              fill
              sizes="160px"
              className="object-contain object-left"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinksData.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a 
                  key={link.key} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-body text-xs uppercase tracking-widest transition-colors duration-300 hover:text-olive-gold ${
                    isActive ? "text-olive-gold font-bold border-b border-olive-gold pb-1" : 
                    scrolled ? "text-ink" : "text-cream-white"
                  }`}
                >
                  {t(link.key)}
                </a>
              );
            })}
          </nav>
          
          <div className="flex items-center gap-4 md:gap-6 z-50 relative">
            <LanguageSwitcher scrolled={scrolled} />
            
            {/* Mobile Hamburger Button */}
            <button
              className={`md:hidden p-2 -mr-2 transition-colors duration-300 ${
                scrolled ? "text-ink" : "text-cream-white"
              }`}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-ink/60 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-beige z-[70] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-24 px-8 shadow-2xl ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <button
          className="absolute top-6 right-6 p-2 text-ink hover:text-olive-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close mobile menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <nav className="flex flex-col gap-8 mt-8">
          {navLinksData.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a 
                key={link.key} 
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                  setIsMobileMenuOpen(false);
                }}
                className={`font-body text-lg uppercase tracking-widest transition-colors duration-300 border-b border-stone/20 pb-4 ${
                  isActive ? "text-olive-gold font-bold" : "text-ink hover:text-olive-gold"
                }`}
              >
                {t(link.key)}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}
