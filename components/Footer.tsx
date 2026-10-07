import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className="w-full bg-stone text-ink py-16">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col items-start">
            <div className="relative w-64 h-40 mb-4 -ml-4 rounded-xl overflow-hidden mix-blend-multiply">
              <Image 
                src="/logo-footer.jpg" 
                alt="ND Natural Products" 
                fill
                sizes="256px"
                className="object-contain object-left"
              />
            </div>
            <div className="font-body text-sm text-ink max-w-sm flex flex-col gap-2">
              <p className="font-bold">ND Natural Products</p>
              <p>{t('brandDesc1')}</p>
              <p>{t('brandDesc2')}</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-ink font-bold mb-6">{t('explore')}</h4>
            <ul className="flex flex-col gap-3 font-body text-sm text-ink">
              <li><a href="#collection" className="hover:text-ink/70 transition-colors">{t('links.collection')}</a></li>
              <li><a href="#philosophy" className="hover:text-ink/70 transition-colors">{t('links.philosophy')}</a></li>
              <li><a href="#ritual" className="hover:text-ink/70 transition-colors">{t('links.ritual')}</a></li>
              <li><a href="#" className="hover:text-ink/70 transition-colors">{t('links.ingredients')}</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-ink font-bold mb-6">{t('connect')}</h4>
            <ul className="flex flex-col gap-3 font-body text-sm text-ink">
              <li><a href="https://www.instagram.com/ndnaturalproducts?stkn=MTV6ZDFqMThwdjRzYw==" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold hover:text-ink/70 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
                Instagram
              </a></li>
              <li><a href="https://www.tiktok.com/@ndnaturalproducts?_r=1&_t=ZS-9AM482Q5ZHo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold hover:text-ink/70 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.6 6.7a5.4 5.4 0 0 1-3.3-1.1 5.4 5.4 0 0 1-2-3.1h-3.2v12.6a2.6 2.6 0 1 1-1.8-2.5V9.3a5.8 5.8 0 1 0 5 5.7V9.2a8.6 8.6 0 0 0 5.300 1.800z" /></svg>
                TikTok
              </a></li>
              <li><a href="https://wa.me/601168280790" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold hover:text-ink/70 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 21l1.65-4.8A8.5 8.5 0 1 1 8 19.4L3 21z" /><path d="M9 10c0 3 2 5 5 5l1.5-1.5-2-1-1 .8c-.8-.4-1.4-1-1.8-1.8l.8-1-1-2L9 10z" fill="currentColor" stroke="none" /></svg>
                WhatsApp: +60 11-6828 0790
              </a></li>
              <li><a href="#journal" className="hover:text-ink/70 transition-colors">{t('links.journal')}</a></li>
              <li><a href="mailto:Ndnaturalproducts@gmail.com" className="hover:text-ink/70 transition-colors break-all">Ndnaturalproducts@gmail.com</a></li>
              <li><a href="#" className="hover:text-ink/70 transition-colors">{t('links.stockists')}</a></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-ink pt-8 font-body text-xs text-ink">
          <div className="flex flex-col gap-1">
            <p>{t('copyright', { year: new Date().getFullYear() })}</p>
            <p className="text-ink/60">{t('operatedBy')}</p>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-0 justify-center">
            <Link href="/policies#shipping" className="hover:text-ink/70 transition-colors">{t('links.shipping')}</Link>
            <Link href="/policies#returns" className="hover:text-ink/70 transition-colors">{t('links.returns')}</Link>
            <Link href="/policies#privacy" className="hover:text-ink/70 transition-colors">{t('links.privacy')}</Link>
            <Link href="/policies#terms" className="hover:text-ink/70 transition-colors">{t('links.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
