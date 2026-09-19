"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from 'next-intl';

const faqsData = [
  { key: "1" },
  { key: "2" },
  { key: "3" },
  { key: "4" },
  { key: "5" },
  { key: "6" },
  { key: "7" }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations('FAQ');

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#C9BFA8] py-24 md:py-32 px-6 md:px-12 lg:px-24 flex justify-start lg:justify-center">
      <div className="max-w-4xl w-full">
        <div className="mb-10">
          <p className="text-olive-gold text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-4 font-body">
            {t('eyebrow')}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-ink">
            {t('heading')}
          </h2>
        </div>

        <div className="flex flex-col space-y-2.5">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-cream-white w-full cursor-pointer"
                onClick={() => toggleOpen(index)}
              >
                <div className="flex justify-between items-center p-5 md:py-6 md:px-7">
                  <h3 className="font-body font-medium text-ink text-sm md:text-base pr-8">
                    {t(`items.${faq.key}.question`)}
                  </h3>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-stone flex items-center justify-center text-stone">
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-lg font-light leading-none"
                      style={{ marginTop: "-2px" }}
                    >
                      +
                    </motion.span>
                  </div>
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-7 pb-6 pt-1 text-ink/80 text-sm md:text-base font-body leading-relaxed">
                        {t(`items.${faq.key}.answer`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
