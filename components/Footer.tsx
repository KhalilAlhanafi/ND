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
              <li><a href="https://www.instagram.com/ndnatural_products?igsi=MXI4cHhweWNxaHRocQ==" target="_blank" rel="noopener noreferrer" className="hover:text-ink/70 transition-colors">Instagram</a></li>
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
