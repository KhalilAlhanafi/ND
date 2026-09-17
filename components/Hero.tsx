"use client";

import { useRef } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import { useTranslations } from 'next-intl';

function DustParticles() {
  const ref = useRef<any>(null);
  // generate random points in a sphere
  const sphere = random.inSphere(new Float32Array(800 * 3), { radius: 2.5 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#B08D3E"
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative w-full h-screen overflow-hidden bg-ink flex flex-col justify-center">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero-bg.jpg" 
          alt="Macro shot of laurel leaves and golden oil" 
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        {/* Soft gradient overlay to blend into the brand colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/70" />
      </div>

      {/* 3D Dust Particles Background */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <DustParticles />
        </Canvas>
      </div>

      {/* Content - Asymmetrical Editorial Layout */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col">
        <div className="md:w-2/3">
          <h1 className="text-8xl md:text-[12rem] font-display text-cream-white tracking-tighter leading-none mb-2 ml-[-0.05em]">
            {t('title1')}
          </h1>
          <h2 className="text-3xl md:text-6xl font-display text-cream-white tracking-tight mb-8 ml-1">
            {t('title2')}
          </h2>
          <div className="pl-2 md:pl-4 border-l border-olive-gold/40">
            <p className="text-xl md:text-3xl font-body text-beige max-w-lg font-light leading-relaxed">
              {t('subtitle1')} <br />
              {t('subtitle2')}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="absolute bottom-12 right-12 md:right-24 z-20 flex flex-col items-end gap-4">
        <span className="eyebrow text-xs text-olive-gold tracking-widest">{t('scroll')}</span>
        <div className="w-[1px] h-24 bg-stone/20 relative overflow-hidden origin-top">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-olive-gold animate-[scroll_2.5s_ease-in-out_infinite]" />
        </div>
      </div>
      
    </section>
  );
}
