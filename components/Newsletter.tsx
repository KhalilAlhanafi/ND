"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const t = useTranslations('Newsletter');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <section id="journal" className="w-full bg-stone text-ink py-32 border-b border-ink">
      <div className="max-w-screen-md mx-auto px-6 md:px-12 text-center">
        
        <span className="eyebrow text-ink font-bold mb-6 block">{t('eyebrow')}</span>
        <h2 className="text-4xl md:text-5xl font-display text-ink font-bold mb-6">{t('heading')}</h2>
        <p className="font-body text-ink mb-12">
          {t('desc')}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input 
            type="email" 
            placeholder={t('placeholder')} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
            className="flex-1 bg-transparent border-b border-ink/40 px-4 py-3 font-body text-ink focus:outline-none focus:border-ink transition-colors disabled:opacity-50 placeholder:text-ink/50"
            required
          />
          <button 
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="bg-ink text-cream-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-olive-gold hover:text-ink transition-colors duration-300 disabled:opacity-50 sm:w-auto"
          >
            {status === "loading" ? t('btnSubscribing') : status === "success" ? t('btnSubscribed') : t('btnSubscribe')}
          </button>
        </form>

      </div>
    </section>
  );
}
