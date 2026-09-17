import { Link } from "@/i18n/routing";
import Footer from "@/components/Footer";
import { useTranslations } from 'next-intl';

export default function Policies() {
  const t = useTranslations('Policies');
  return (
    <main className="w-full min-h-screen bg-beige text-ink selection:bg-olive-gold selection:text-cream-white font-body">
      
      {/* Simple Header for Legal Page */}
      <header className="w-full py-6 border-b border-stone/20 bg-beige/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link href="/" className="font-display text-xl tracking-tight hover:text-olive-gold transition-colors">
            ND Natural Products
          </Link>
          <Link href="/" className="text-xs uppercase tracking-widest font-bold hover:text-olive-gold transition-colors border-b border-transparent hover:border-olive-gold pb-0.5">
            {t('backHome')}
          </Link>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-32 flex flex-col lg:flex-row gap-16 md:gap-24 relative">
        
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-1/4">
          <div className="sticky top-32 flex flex-col gap-6">
            <h3 className="font-display text-2xl mb-2">{t('title')}</h3>
            <ul className="flex flex-col gap-4 text-sm font-light text-ink/70">
              <li><a href="#privacy" className="hover:text-olive-gold transition-colors block">{t('nav.privacy')}</a></li>
              <li><a href="#terms" className="hover:text-olive-gold transition-colors block">{t('nav.terms')}</a></li>
              <li><a href="#shipping" className="hover:text-olive-gold transition-colors block">{t('nav.shipping')}</a></li>
              <li><a href="#returns" className="hover:text-olive-gold transition-colors block">{t('nav.returns')}</a></li>
            </ul>
            <p className="text-xs mt-8 text-ink/50">{t('lastUpdated')}</p>
          </div>
        </aside>

        {/* Content */}
        <div className="w-full lg:w-3/4 flex flex-col gap-32">
          
          {/* Privacy Policy */}
          <section id="privacy" className="scroll-mt-32">
            <h2 className="text-3xl md:text-4xl font-display mb-10 pb-6 border-b border-stone/20">{t('privacy.title')}</h2>
            <div className="flex flex-col gap-8 text-sm md:text-base leading-relaxed text-ink/80 font-light">
              <p>{t('privacy.intro1')}</p>
              <p>{t('privacy.intro2')}</p>
              
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('privacy.sections.0.title')}</h3>
                <p>{t('privacy.sections.0.p1')}</p>
                <p>{t('privacy.sections.0.p2')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('privacy.sections.1.title')}</h3>
                <p>{t('privacy.sections.1.p1')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('privacy.sections.2.title')}</h3>
                <p>{t('privacy.sections.2.p1')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('privacy.sections.3.title')}</h3>
                <p>{t('privacy.sections.3.p1')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('privacy.sections.4.title')}</h3>
                <p>{t('privacy.sections.4.p1')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('privacy.sections.5.title')}</h3>
                <p>{t('privacy.sections.5.p1')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('privacy.sections.6.title')}</h3>
                <p>{t('privacy.sections.6.p1')}</p>
              </div>
            </div>
          </section>

          {/* Terms & Conditions */}
          <section id="terms" className="scroll-mt-32">
            <h2 className="text-3xl md:text-4xl font-display mb-10 pb-6 border-b border-stone/20">{t('terms.title')}</h2>
            <div className="flex flex-col gap-8 text-sm md:text-base leading-relaxed text-ink/80 font-light">
              <p>{t('terms.intro')}</p>
              
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('terms.sections.0.title')}</h3>
                <p>{t('terms.sections.0.p1')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('terms.sections.1.title')}</h3>
                <p>{t('terms.sections.1.p1')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('terms.sections.2.title')}</h3>
                <p>{t('terms.sections.2.p1')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('terms.sections.3.title')}</h3>
                <p>{t('terms.sections.3.p1')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('terms.sections.4.title')}</h3>
                <p>{t('terms.sections.4.p1')}</p>
              </div>
            </div>
          </section>

          {/* Shipping Policy */}
          <section id="shipping" className="scroll-mt-32">
            <h2 className="text-3xl md:text-4xl font-display mb-10 pb-6 border-b border-stone/20">{t('shipping.title')}</h2>
            <div className="flex flex-col gap-8 text-sm md:text-base leading-relaxed text-ink/80 font-light">
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('shipping.sections.0.title')}</h3>
                <p>{t('shipping.sections.0.p1')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('shipping.sections.1.title')}</h3>
                <p>{t('shipping.sections.1.p1')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('shipping.sections.2.title')}</h3>
                <p>{t('shipping.sections.2.p1')}</p>
              </div>
            </div>
          </section>

          {/* Return & Exchange Policy */}
          <section id="returns" className="scroll-mt-32">
            <h2 className="text-3xl md:text-4xl font-display mb-10 pb-6 border-b border-stone/20">{t('returns.title')}</h2>
            <div className="flex flex-col gap-8 text-sm md:text-base leading-relaxed text-ink/80 font-light">
              <p>{t('returns.intro')}</p>
              
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('returns.sections.0.title')}</h3>
                <p>{t('returns.sections.0.p1')}</p>
                <p>{t('returns.sections.0.p2')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('returns.sections.1.title')}</h3>
                <p>{t('returns.sections.1.p1')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('returns.sections.2.title')}</h3>
                <p>{t('returns.sections.2.p1')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl text-ink mt-4">{t('returns.sections.3.title')}</h3>
                <p>{t('returns.sections.3.p1')}</p>
              </div>
            </div>
          </section>

          {/* Unified Contact Footer */}
          <section id="contact" className="mt-16 pt-16 border-t border-ink/20">
            <h2 className="text-2xl font-display mb-8">{t('contact.title')}</h2>
            <div className="flex flex-col gap-4 text-sm font-light text-ink/80">
              <p>{t('contact.intro')}</p>
              <div className="mt-4">
                <strong>{t('contact.company')}</strong><br/>
                {t('contact.operatedBy')}<br/>
                {t('contact.ssm')}
              </div>
              <div className="mt-4 whitespace-pre-line">
                <strong>{t('contact.addressTitle')}</strong><br/>
                {t('contact.address')}
              </div>
              <div className="mt-4 flex flex-col gap-1">
                <span><strong>{t('contact.emailTitle')}</strong> <a href="mailto:ndnaturalproducts@gmail.com" className="hover:text-olive-gold transition-colors">ndnaturalproducts@gmail.com</a></span>
                <span><strong>{t('contact.phoneTitle')}</strong> <a href="tel:+60184058039" className="hover:text-olive-gold transition-colors">+60184058039</a></span>
              </div>
              <div className="mt-8 pt-8 text-xs text-ink/50 border-t border-stone/20">
                {t('contact.rights', { year: new Date().getFullYear() })}<br/>
                {t('contact.operatedBy')}
              </div>
            </div>
          </section>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
