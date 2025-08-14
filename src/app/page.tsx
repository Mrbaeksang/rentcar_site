import { Hero } from '@/components/sections/Hero';
import { FeaturedCars } from '@/components/sections/FeaturedCars';
import { Services } from '@/components/sections/Services';
import { MarqueeGallery } from '@/components/sections/MarqueeGallery';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />
      <FeaturedCars />
      <Services />
      <MarqueeGallery />
      <Contact />
    </main>
  );
}