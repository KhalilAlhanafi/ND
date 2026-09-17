import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import TheRitual from "@/components/TheRitual";
import TheCollection from "@/components/TheCollection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Sustainability from "@/components/Sustainability";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-beige">
      <Header />
      <Hero />
      <BrandStory />
      <TheRitual />
      <TheCollection />
      <Testimonials />
      <FAQ />
      <Sustainability />
      <Newsletter />
      <Footer />
    </main>
  );
}

